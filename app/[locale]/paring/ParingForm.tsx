'use client'

import { useState, useEffect, useMemo, useRef } from 'react'
import { useRouter } from '@/i18n/navigation'
import { useSearchParams } from 'next/navigation'
import {
  CourseFilterNavIcon,
  courseFilterButtonSelectedClass,
  courseFilterRowHoverClass,
} from '@/components/CourseNavIcons'
import { MonthSeasonPicker } from '@/components/MonthSeasonPicker'
import { CITIES, COURSE_CATALOG } from '../koolituskalender/courseEvents'
import { useLocale, useTranslations } from 'next-intl'
import {
  localizedCourseBaseTitle,
  localizedTaseLevelBadge,
} from '@/i18n/courseTitles'

/** Format YYYY-MM-DD as dd/mm (for date picker). */
function formatDateDDMMYYYY(dateStr: string): string {
  const [y, m, d] = dateStr.split('-')
  return `${d}/${m}`
}

/** Split course name into title and level (e.g. "Valvetöötaja, tase 3"). */
function parseCourseName(name: string): { title: string; level: string | null } {
  const match = name.match(/^(.+),\s*tase\s+(\d)$/i)
  if (match) {
    return { title: match[1].trim(), level: `Tase ${match[2]}` }
  }
  return { title: name, level: null }
}

/** Get all Mondays in a given month (month 1–12). */
function getMondaysInMonth(year: number, month: number): Date[] {
  const mondays: Date[] = []
  const first = new Date(year, month - 1, 1)
  let d = new Date(first)
  while (d.getDay() !== 1) {
    d.setDate(d.getDate() + 1)
  }
  while (d.getMonth() === month - 1) {
    mondays.push(new Date(d))
    d.setDate(d.getDate() + 7)
  }
  return mondays
}

export function ParingForm({ courseSelectStyled = false }: { courseSelectStyled?: boolean }) {
  const locale = useLocale()
  const t = useTranslations('registration')
  const tNav = useTranslations('nav')
  const tCommon = useTranslations('common')
  const searchParams = useSearchParams()
  const router = useRouter()
  const [focusedField, setFocusedField] = useState<string | null>(null)
  const [submitting, setSubmitting] = useState(false)
  const [submitError, setSubmitError] = useState<string | null>(null)

  type DropdownKey = 'course' | 'city' | 'month' | 'date' | 'language' | 'mode' | null
  const [openDropdown, setOpenDropdown] = useState<DropdownKey>(null)
  const courseDdRef = useRef<HTMLDivElement>(null)
  const cityDdRef = useRef<HTMLDivElement>(null)
  const monthDdRef = useRef<HTMLDivElement>(null)
  const dateDdRef = useRef<HTMLDivElement>(null)
  const languageDdRef = useRef<HTMLDivElement>(null)
  const modeDdRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const handleDown = (e: MouseEvent) => {
      const t = e.target as Node
      if (courseDdRef.current?.contains(t)) return
      if (cityDdRef.current?.contains(t)) return
      if (monthDdRef.current?.contains(t)) return
      if (dateDdRef.current?.contains(t)) return
      if (languageDdRef.current?.contains(t)) return
      if (modeDdRef.current?.contains(t)) return
      setOpenDropdown(null)
    }
    document.addEventListener('mousedown', handleDown)
    return () => document.removeEventListener('mousedown', handleDown)
  }, [])

  const [formData, setFormData] = useState({
    city: '',
    course: '',
    courseMonth: '',
    courseDate: '',
    learningLanguage: '' as '' | 'estonian' | 'russian',
    learningType: '' as '' | 'onplace' | 'online',
    name: '',
    email: '',
    phone: '',
    message: '',
  })

  const isTextFieldFilled = (fieldName: string) => {
    const value = formData[fieldName as keyof typeof formData]
    return typeof value === 'string' && value.trim() !== '' && focusedField !== fieldName
  }

  const today = useMemo(() => {
    const d = new Date()
    d.setHours(0, 0, 0, 0)
    return d
  }, [])

  const monthOptions = useMemo(() => {
    const options: { value: string; label: string }[] = []
    const now = new Date()
    for (let i = 0; i < 12; i++) {
      const d = new Date(now.getFullYear(), now.getMonth() + i, 1)
      const y = d.getFullYear()
      const m = d.getMonth() + 1
      options.push({
        value: `${y}-${String(m).padStart(2, '0')}`,
        label: `${tCommon('months.' + m)} ${y}`,
      })
    }
    return options
  }, [tCommon])

  const dateOptions = useMemo(() => {
    if (!formData.courseMonth) return []
    const [y, m] = formData.courseMonth.split('-').map(Number)
    const mondays = getMondaysInMonth(y, m)
    return mondays
      .filter((d) => {
        const copy = new Date(d)
        copy.setHours(0, 0, 0, 0)
        return copy >= today
      })
      .map((d) => {
        const yyyy = d.getFullYear()
        const mm = String(d.getMonth() + 1).padStart(2, '0')
        const dd = String(d.getDate()).padStart(2, '0')
        const value = `${yyyy}-${mm}-${dd}`
        return { value, label: formatDateDDMMYYYY(value) }
      })
  }, [formData.courseMonth, today])

  useEffect(() => {
    if (formData.courseDate && dateOptions.length > 0 && !dateOptions.some((o) => o.value === formData.courseDate)) {
      setFormData((prev) => ({ ...prev, courseDate: '' }))
    }
  }, [dateOptions, formData.courseDate])

  useEffect(() => {
    const type = searchParams.get('type') || ''
    const name = searchParams.get('name') || ''
    const location = searchParams.get('location') || ''
    const date = searchParams.get('date') || ''

    if (type && name) {
      setFormData(prev => {
        const next = { ...prev }
        if (location && (CITIES as readonly string[]).includes(location)) next.city = location
        if (name && COURSE_CATALOG.some(c => c.name === name)) next.course = name
        if (date && /^\d{4}-\d{2}-\d{2}$/.test(date)) {
          next.courseMonth = date.slice(0, 7)
          next.courseDate = date
        }
        return next
      })
    }
  }, [searchParams])

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const name = e.target.name
    const value = e.target.value
    setFormData(prev => {
      const next = { ...prev, [name]: value }
      if (name === 'learningLanguage') next.learningLanguage = value as '' | 'estonian' | 'russian'
      else if (name === 'learningType') next.learningType = value as '' | 'onplace' | 'online'
      if (name === 'courseMonth') next.courseDate = ''
      return next
    })
  }

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setSubmitting(true)
    setSubmitError(null)

    try {
      const res = await fetch('/api/send-email', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      })

      if (!res.ok) {
        const body = await res.json().catch(() => null)
        throw new Error(body?.error || 'Midagi läks valesti.')
      }

      router.push('/tanan')
    } catch (err) {
      setSubmitError(
        err instanceof Error ? err.message : 'E-posti saatmine ebaõnnestus.'
      )
    } finally {
      setSubmitting(false)
    }
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-2xl mx-auto page-gutter-x py-16">
        <h1 className="text-4xl font-bold mb-4 text-gray-900">{t('title')}</h1>
        <p className="text-gray-600 mb-8">
          {t('subtitle')}
        </p>

        <form onSubmit={handleSubmit} className="space-y-8">
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 md:p-8 mb-8">
              <h2 className="text-2xl font-bold mb-6 text-gray-900">{t('courseSection')}</h2>
              <div className="space-y-6">
                {/* Koolitus */}
                <div className="relative">
                  <span className="block text-sm font-medium text-gray-700 mb-1">
                    {t('course')}
                  </span>
                  <div ref={courseDdRef} className="relative inline-block w-full">
                    <button
                      type="button"
                      className={`inline-flex min-w-0 items-center gap-2 px-4 py-2 h-10 rounded-lg border text-sm font-medium shadow-sm cursor-pointer transition-colors duration-200 w-full justify-between ${
                        formData.course
                          ? courseSelectStyled
                            ? courseFilterButtonSelectedClass(parseCourseName(formData.course).title)
                            : 'bg-primary-50 border-primary-200 text-primary-700'
                          : 'bg-white border-gray-300 text-gray-600 hover:bg-gray-50'
                      }`}
                      onClick={() => setOpenDropdown((d) => (d === 'course' ? null : 'course'))}
                      aria-expanded={openDropdown === 'course'}
                    >
                      {formData.course ? (
                        (() => {
                          const { title, level } = parseCourseName(formData.course)
                          const titleLabel = localizedCourseBaseTitle(title, locale, tNav)
                          const levelLabel = localizedTaseLevelBadge(level, locale)
                          if (courseSelectStyled) {
                            return (
                              <span className="flex min-w-0 flex-1 items-center gap-2.5">
                                <CourseFilterNavIcon courseTitle={title} />
                                <span className="truncate">{titleLabel}</span>
                              </span>
                            )
                          }
                          return (
                            <>
                              <span>{titleLabel}</span>
                              {level && (
                                <span
                                  className="ml-1 inline-flex items-center justify-center gap-[0.15rem] py-0.5 pl-2 pr-2.5 rounded-lg text-[0.65rem] font-semibold bg-white text-accent-text"
                                  style={{ fontFamily: 'var(--font-inter), Inter, sans-serif' }}
                                >
                                  <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    viewBox="0 0 24 24"
                                    fill="currentColor"
                                    className="w-3 h-3 shrink-0"
                                    aria-hidden
                                  >
                                    <path d="M18.375 2.25c-1.035 0-1.875.84-1.875 1.875v15.75c0 1.035.84 1.875 1.875 1.875h.75c1.035 0 1.875-.84 1.875-1.875V4.125c0-1.036-.84-1.875-1.875-1.875h-.75ZM9.75 8.625c0-1.036.84-1.875 1.875-1.875h.75c1.036 0 1.875.84 1.875 1.875v11.25c0 1.035-.84 1.875-1.875 1.875h-.75a1.875 1.875 0 0 1-1.875-1.875V8.625ZM3 13.125c0-1.036.84-1.875 1.875-1.875h.75c1.036 0 1.875.84 1.875 1.875v6.75c0 1.035-.84 1.875-1.875 1.875h-.75A1.875 1.875 0 0 1 3 19.875v-6.75Z" />
                                  </svg>
                                  <span>{levelLabel}</span>
                                </span>
                              )}
                            </>
                          )
                        })()
                      ) : (
                        <span className={courseSelectStyled ? 'flex-1 text-left' : undefined}>{t('selectCourse')}</span>
                      )}
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth={1.5}
                        className="w-4 h-4 flex-shrink-0"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M6 9l6 6 6-6"
                        />
                      </svg>
                    </button>
                    <div
                      className={`absolute left-0 mt-2 min-w-full w-max max-w-[calc(100vw-2rem)] bg-white rounded-xl shadow-xl border border-gray-100 p-1.5 space-y-0.5 z-20 transition-all duration-200 ${
                        openDropdown === 'course'
                          ? 'opacity-100 visible translate-y-0'
                          : 'pointer-events-none invisible opacity-0 -translate-y-1'
                      }`}
                    >
                      <button
                        type="button"
                        onClick={() => {
                          setFormData((prev) => ({ ...prev, course: '' }))
                          setOpenDropdown(null)
                        }}
                        className="block w-full text-left rounded-lg px-3 py-2.5 text-sm text-gray-700 hover:bg-primary-50 hover:text-primary-600 transition-colors"
                      >
                        {t('allCourses')}
                      </button>
                      {COURSE_CATALOG.map((c) => {
                        const { title, level } = parseCourseName(c.name)
                        const titleLabel = localizedCourseBaseTitle(title, locale, tNav)
                        const levelLabel = localizedTaseLevelBadge(level, locale)
                        if (courseSelectStyled) {
                          return (
                            <button
                              key={c.name}
                              type="button"
                              onClick={() => {
                                setFormData((prev) => ({ ...prev, course: c.name }))
                                setOpenDropdown(null)
                              }}
                              className={`flex w-full items-center gap-2.5 rounded-lg px-3 py-2.5 text-left text-sm text-gray-700 transition-colors duration-200 ${courseFilterRowHoverClass(title)}`}
                            >
                              <CourseFilterNavIcon courseTitle={title} />
                              <span>{titleLabel}</span>
                            </button>
                          )
                        }
                        return (
                          <button
                            key={c.name}
                            type="button"
                            onClick={() => {
                              setFormData((prev) => ({ ...prev, course: c.name }))
                              setOpenDropdown(null)
                            }}
                            className="flex w-full items-center justify-between rounded-lg px-3 py-2.5 text-sm text-gray-700 hover:bg-primary-50 hover:text-primary-600 transition-colors"
                          >
                            <span>{titleLabel}</span>
                            {level && (
                              <span
                                className="ml-3 inline-flex items-center justify-center gap-[0.2rem] py-1 pl-2.5 pr-3 rounded-lg text-xs font-semibold w-[3rem] bg-accent-bg text-accent-text"
                                style={{ fontFamily: 'var(--font-inter), Inter, sans-serif' }}
                              >
                                <svg
                                  xmlns="http://www.w3.org/2000/svg"
                                  viewBox="0 0 24 24"
                                  fill="currentColor"
                                  className="size-3.5 shrink-0"
                                  aria-hidden
                                >
                                  <path d="M18.375 2.25c-1.035 0-1.875.84-1.875 1.875v15.75c0 1.035.84 1.875 1.875 1.875h.75c1.035 0 1.875-.84 1.875-1.875V4.125c0-1.036-.84-1.875-1.875-1.875h-.75ZM9.75 8.625c0-1.036.84-1.875 1.875-1.875h.75c1.036 0 1.875.84 1.875 1.875v11.25c0 1.035-.84 1.875-1.875 1.875h-.75a1.875 1.875 0 0 1-1.875-1.875V8.625ZM3 13.125c0-1.036.84-1.875 1.875-1.875h.75c1.036 0 1.875.84 1.875 1.875v6.75c0 1.035-.84 1.875-1.875 1.875h-.75A1.875 1.875 0 0 1 3 19.875v-6.75Z" />
                                </svg>
                                <span>{levelLabel}</span>
                              </span>
                            )}
                          </button>
                        )
                      })}
                    </div>
                  </div>
                </div>

                {/* Linn */}
                <div className="relative">
                  <span className="block text-sm font-medium text-gray-700 mb-1">
                    {t('city')}
                  </span>
                  <div ref={cityDdRef} className="relative inline-block w-full">
                    <button
                      type="button"
                      className={`inline-flex items-center gap-2 px-4 py-2 h-10 rounded-lg border text-sm font-medium shadow-sm cursor-pointer transition-colors duration-200 w-full justify-between ${
                        formData.city
                          ? 'bg-primary-50 border-primary-200 text-primary-700'
                          : 'bg-white border-gray-300 text-gray-600 hover:bg-gray-50'
                      }`}
                      onClick={() => setOpenDropdown((d) => (d === 'city' ? null : 'city'))}
                      aria-expanded={openDropdown === 'city'}
                    >
                      <span>{formData.city || t('selectCity')}</span>
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth={1.5}
                        className="w-4 h-4"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M6 9l6 6 6-6"
                        />
                      </svg>
                    </button>
                    <div
                      className={`absolute left-0 mt-2 min-w-full w-max max-w-[calc(100vw-2rem)] bg-white rounded-xl shadow-xl border border-gray-100 p-1.5 space-y-0.5 z-20 transition-all duration-200 ${
                        openDropdown === 'city'
                          ? 'opacity-100 visible translate-y-0'
                          : 'pointer-events-none invisible opacity-0 -translate-y-1'
                      }`}
                    >
                      <button
                        type="button"
                        onClick={() => {
                          setFormData((prev) => ({ ...prev, city: '' }))
                          setOpenDropdown(null)
                        }}
                        className="block w-full text-left rounded-lg px-3 py-2.5 text-sm text-gray-700 hover:bg-primary-50 hover:text-primary-600 transition-colors"
                      >
                        {t('allCities')}
                      </button>
                      {CITIES.map((city) => (
                        <button
                          key={city}
                          type="button"
                          onClick={() => {
                            setFormData((prev) => ({ ...prev, city }))
                            setOpenDropdown(null)
                          }}
                          className="block w-full text-left rounded-lg px-3 py-2.5 text-sm text-gray-700 hover:bg-primary-50 hover:text-primary-600 transition-colors"
                        >
                          {city}
                        </button>
                      ))}
                    </div>
                  </div>
                </div>
                {/* Kursuse algus */}
                <div>
                  <span className="block text-sm font-medium text-gray-700 mb-1">
                    {t('startDate')}
                  </span>
                  <div className="flex flex-wrap gap-4 items-end">
                    {/* Kuu */}
                    <div className="relative w-full min-w-0 sm:flex-1 sm:min-w-[160px]">
                      <MonthSeasonPicker
                        ref={monthDdRef}
                        layout="form"
                        monthOptions={monthOptions}
                        value={formData.courseMonth}
                        onChange={(yyyyMm) => {
                          setFormData((prev) => ({
                            ...prev,
                            courseMonth: yyyyMm,
                            courseDate: '',
                          }))
                        }}
                        onClear={() => {
                          setFormData((prev) => ({
                            ...prev,
                            courseMonth: '',
                            courseDate: '',
                          }))
                        }}
                        isOpen={openDropdown === 'month'}
                        onOpenChange={(open) =>
                          setOpenDropdown(open ? 'month' : null)
                        }
                        emptyLabel={t('selectMonth')}
                        allMonthsButtonLabel={t('allMonths')}
                      />
                    </div>
                    {/* Kuupäev */}
                    <div className="flex-1 min-w-[120px] relative">
                      <div ref={dateDdRef} className="relative inline-block w-full">
                        <button
                          type="button"
                          disabled={!formData.courseMonth}
                          className={`inline-flex items-center gap-2 px-4 py-2 h-10 rounded-lg border text-sm font-medium shadow-sm cursor-pointer transition-colors duration-200 w-full justify-between ${
                            !formData.courseMonth
                              ? 'bg-gray-100 border-gray-300 text-gray-400 cursor-not-allowed'
                              : formData.courseDate
                                ? 'bg-primary-50 border-primary-200 text-primary-700'
                                : 'bg-white border-gray-300 text-gray-600 hover:bg-gray-50'
                          }`}
                          onClick={() => {
                            if (!formData.courseMonth) return
                            setOpenDropdown((d) => (d === 'date' ? null : 'date'))
                          }}
                          aria-expanded={openDropdown === 'date'}
                        >
                          <span>
                            {formData.courseDate
                              ? formatDateDDMMYYYY(formData.courseDate)
                              : t('selectDate')}
                          </span>
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth={1.5}
                            className="w-4 h-4"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              d="M6 9l6 6 6-6"
                            />
                          </svg>
                        </button>
                        {formData.courseMonth && (
                          <div
                            className={`absolute left-0 mt-2 min-w-full w-max max-w-[calc(100vw-2rem)] bg-white rounded-xl shadow-xl border border-gray-100 p-1.5 space-y-0.5 z-20 transition-all duration-200 ${
                              openDropdown === 'date'
                                ? 'opacity-100 visible translate-y-0'
                                : 'pointer-events-none invisible opacity-0 -translate-y-1'
                            }`}
                          >
                            <button
                              type="button"
                              onClick={() => {
                                setFormData((prev) => ({ ...prev, courseDate: '' }))
                                setOpenDropdown(null)
                              }}
                              className="block w-full text-left rounded-lg px-3 py-2.5 text-sm text-gray-700 hover:bg-primary-50 hover:text-primary-600 transition-colors"
                            >
                              {t('allDates')}
                            </button>
                            {dateOptions.map(({ value, label }) => (
                              <button
                                key={value}
                                type="button"
                                onClick={() => {
                                  setFormData((prev) => ({ ...prev, courseDate: value }))
                                  setOpenDropdown(null)
                                }}
                                className="block w-full text-left rounded-lg px-3 py-2.5 text-sm text-gray-700 hover:bg-primary-50 hover:text-primary-600 transition-colors whitespace-nowrap"
                              >
                                {label}
                              </button>
                            ))}
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                </div>

                {/* Õppekeel ja õppeviis ühel real (desktop) */}
                <div className="flex flex-col md:flex-row gap-6">
                  {/* Õppekeel */}
                  <div className="relative flex-1">
                    <span className="block text-sm font-medium text-gray-700 mb-1">
                      {t('language')}
                    </span>
                    <div ref={languageDdRef} className="relative inline-block w-full">
                      <button
                        type="button"
                        className={`inline-flex items-center gap-2 px-4 py-2 h-10 rounded-lg border text-sm font-medium shadow-sm cursor-pointer transition-colors duration-200 w-full justify-between ${
                          formData.learningLanguage
                            ? 'bg-primary-50 border-primary-200 text-primary-700'
                            : 'bg-white border-gray-300 text-gray-600 hover:bg-gray-50'
                        }`}
                        onClick={() => setOpenDropdown((d) => (d === 'language' ? null : 'language'))}
                        aria-expanded={openDropdown === 'language'}
                      >
                        <span>
                          {formData.learningLanguage === 'estonian'
                            ? t('estonian')
                            : formData.learningLanguage === 'russian'
                              ? t('russian')
                              : t('selectLanguage')}
                        </span>
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth={1.5}
                          className="w-4 h-4"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="M6 9l6 6 6-6"
                          />
                        </svg>
                      </button>
                      <div
                        className={`absolute left-0 mt-2 min-w-full w-max max-w-[calc(100vw-2rem)] bg-white rounded-xl shadow-xl border border-gray-100 p-1.5 space-y-0.5 z-20 transition-all duration-200 ${
                          openDropdown === 'language'
                            ? 'opacity-100 visible translate-y-0'
                            : 'pointer-events-none invisible opacity-0 -translate-y-1'
                        }`}
                      >
                        <button
                          type="button"
                          onClick={() => {
                            setFormData((prev) => ({ ...prev, learningLanguage: '' }))
                            setOpenDropdown(null)
                          }}
                          className="block w-full text-left rounded-lg px-3 py-2.5 text-sm text-gray-700 hover:bg-primary-50 hover:text-primary-600 transition-colors"
                        >
                          {t('allLanguages')}
                        </button>
                        <button
                          type="button"
                          onClick={() => {
                            setFormData((prev) => ({ ...prev, learningLanguage: 'estonian' }))
                            setOpenDropdown(null)
                          }}
                          className="block w-full text-left rounded-lg px-3 py-2.5 text-sm text-gray-700 hover:bg-primary-50 hover:text-primary-600 transition-colors"
                        >
                          {t('estonian')}
                        </button>
                        <button
                          type="button"
                          onClick={() => {
                            setFormData((prev) => ({ ...prev, learningLanguage: 'russian' }))
                            setOpenDropdown(null)
                          }}
                          className="block w-full text-left rounded-lg px-3 py-2.5 text-sm text-gray-700 hover:bg-primary-50 hover:text-primary-600 transition-colors"
                        >
                          {t('russian')}
                        </button>
                      </div>
                    </div>
                  </div>

                  {/* Õppeviis */}
                  <div className="relative flex-1">
                    <span className="block text-sm font-medium text-gray-700 mb-1">
                      {t('studyMode')}
                    </span>
                    <div ref={modeDdRef} className="relative inline-block w-full">
                      <button
                        type="button"
                        className={`inline-flex items-center gap-2 px-4 py-2 h-10 rounded-lg border text-sm font-medium shadow-sm cursor-pointer transition-colors duration-200 w-full justify-between ${
                          formData.learningType
                            ? 'bg-primary-50 border-primary-200 text-primary-700'
                            : 'bg-white border-gray-300 text-gray-600 hover:bg-gray-50'
                        }`}
                        onClick={() => setOpenDropdown((d) => (d === 'mode' ? null : 'mode'))}
                        aria-expanded={openDropdown === 'mode'}
                      >
                        <span>
                          {formData.learningType === 'onplace'
                            ? t('onsite')
                            : formData.learningType === 'online'
                              ? t('online')
                              : t('selectMode')}
                        </span>
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth={1.5}
                          className="w-4 h-4"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="M6 9l6 6 6-6"
                          />
                        </svg>
                      </button>
                      <div
                        className={`absolute left-0 mt-2 min-w-full w-max max-w-[calc(100vw-2rem)] bg-white rounded-xl shadow-xl border border-gray-100 p-1.5 space-y-0.5 z-20 transition-all duration-200 ${
                          openDropdown === 'mode'
                            ? 'opacity-100 visible translate-y-0'
                            : 'pointer-events-none invisible opacity-0 -translate-y-1'
                        }`}
                      >
                        <button
                          type="button"
                          onClick={() => {
                            setFormData((prev) => ({ ...prev, learningType: '' }))
                            setOpenDropdown(null)
                          }}
                          className="block w-full text-left rounded-lg px-3 py-2.5 text-sm text-gray-700 hover:bg-primary-50 hover:text-primary-600 transition-colors"
                        >
                          {t('allModes')}
                        </button>
                        <button
                          type="button"
                          onClick={() => {
                            setFormData((prev) => ({ ...prev, learningType: 'onplace' }))
                            setOpenDropdown(null)
                          }}
                          className="block w-full text-left rounded-lg px-3 py-2.5 text-sm text-gray-700 hover:bg-primary-50 hover:text-primary-600 transition-colors"
                        >
                          {t('onsite')}
                        </button>
                        <button
                          type="button"
                          onClick={() => {
                            setFormData((prev) => ({ ...prev, learningType: 'online' }))
                            setOpenDropdown(null)
                          }}
                          className="block w-full text-left rounded-lg px-3 py-2.5 text-sm text-gray-700 hover:bg-primary-50 hover:text-primary-600 transition-colors"
                        >
                          {t('online')}
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 md:p-8 mb-8">
              <h2 className="text-2xl font-bold mb-6 text-gray-900">{t('contactSection')}</h2>
              <div className="space-y-6">
                <div>
                  <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-2">
                    {t('name')} *
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    required
                    value={formData.name}
                    onChange={handleChange}
                    onFocus={() => setFocusedField('name')}
                    onBlur={() => setFocusedField(null)}
                    className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500 ${isTextFieldFilled('name') ? 'bg-primary-50 border-primary-200 text-primary-700' : 'border-gray-300'}`}
                  />
                </div>
                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
                    {t('email')} *
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    required
                    value={formData.email}
                    onChange={handleChange}
                    onFocus={() => setFocusedField('email')}
                    onBlur={() => setFocusedField(null)}
                    className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500 ${isTextFieldFilled('email') ? 'bg-primary-50 border-primary-200 text-primary-700' : 'border-gray-300'}`}
                  />
                </div>
                <div>
                  <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-2">
                    {t('phone')} *
                  </label>
                  <input
                    type="tel"
                    id="phone"
                    name="phone"
                    required
                    value={formData.phone}
                    onChange={handleChange}
                    onFocus={() => setFocusedField('phone')}
                    onBlur={() => setFocusedField(null)}
                    className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500 ${isTextFieldFilled('phone') ? 'bg-primary-50 border-primary-200 text-primary-700' : 'border-gray-300'}`}
                  />
                </div>
                <div>
                  <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-2">
                    {t('message')}
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    rows={6}
                    value={formData.message}
                    onChange={handleChange}
                    onFocus={() => setFocusedField('message')}
                    onBlur={() => setFocusedField(null)}
                    className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500 ${isTextFieldFilled('message') ? 'bg-primary-50 border-primary-200 text-primary-700' : 'border-gray-300'}`}
                  />
                </div>
              </div>
            </div>

            {submitError && (
              <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg text-sm">
                {submitError}
              </div>
            )}

            <button
              type="submit"
              disabled={submitting}
              className="w-full bg-primary-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-primary-700 transition cursor-pointer disabled:opacity-60 disabled:cursor-not-allowed btn-press"
            >
              {submitting ? t('submitting') : t('submit')}
            </button>
        </form>
      </div>
    </div>
  )
}
