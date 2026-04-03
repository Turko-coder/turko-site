'use client'

import { useState, useEffect, Suspense, useMemo } from 'react'
import { useSearchParams } from 'next/navigation'
import { CITIES, COURSE_CATALOG } from '../koolituskalender/courseEvents'

const MONTH_NAMES = [
  'Jaanuar', 'Veebruar', 'Märts', 'Aprill', 'Mai', 'Juuni',
  'Juuli', 'August', 'September', 'Oktoober', 'November', 'Detsember',
]

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

type RegistrationPayload = {
  city?: string
  course?: string
  courseMonth?: string
  courseDate?: string
  learningLanguage?: '' | 'estonian' | 'russian'
  learningType?: '' | 'onplace' | 'online'
  name?: string
  email?: string
  phone?: string
  message?: string
}

function formatPayload(payload: RegistrationPayload) {
  const learningLanguage =
    payload.learningLanguage === 'estonian'
      ? 'Eesti keel'
      : payload.learningLanguage === 'russian'
        ? 'Vene keel'
        : '-'

  const learningType =
    payload.learningType === 'onplace'
      ? 'Kohapeal'
      : payload.learningType === 'online'
        ? 'Online'
        : '-'

  return [
    `Nimi: ${payload.name || '-'}`,
    `E-post: ${payload.email || '-'}`,
    `Telefon: ${payload.phone || '-'}`,
    `Linn: ${payload.city || '-'}`,
    `Koolitus: ${payload.course || '-'}`,
    `Algus (kuupäev): ${payload.courseDate || '-'}`,
    `Õppekeel: ${learningLanguage}`,
    `Õppeviis: ${learningType}`,
    `Sõnum: ${payload.message || '-'}`,
  ].join('\n')
}

function buildGmailComposeUrl(to: string, subject: string, body: string) {
  // Gmail "compose" URL. The user will just review and click send.
  // Docs: unofficial but stable; uses `view=cm`.
  const params = new URLSearchParams({
    view: 'cm',
    fs: '1',
    to,
    su: subject,
    body,
    tf: '1',
  })
  return `https://mail.google.com/mail/?${params.toString()}`
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

function ParingForm() {
  const searchParams = useSearchParams()
  const [focusedField, setFocusedField] = useState<string | null>(null)

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
    const t = new Date()
    t.setHours(0, 0, 0, 0)
    return t
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
        label: `${MONTH_NAMES[m - 1]} ${y}`,
      })
    }
    return options
  }, [])

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

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    // HTML5 `required` fields will already block submission when form is invalid.
    e.preventDefault()

    const payload: RegistrationPayload = { ...formData }
    const subjectBase = payload.course ? `Registreerimine: ${payload.course}` : 'Registreerimine'
    const textBody = `Uus registreerimise päring:\n\n${formatPayload(payload)}`

    // Keep the old fallback recipient (previously env-driven on the server).
    const toEmail = 'filipprochenkov@gmail.com'

    const url = buildGmailComposeUrl(toEmail, subjectBase, textBody)
    window.location.href = url
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <h1 className="text-4xl font-bold mb-4 text-gray-900">Registreerimine</h1>
        <p className="text-gray-600 mb-8">
          Täitke allolev vorm ja me võtame teiega ühendust lähiajal.
        </p>

        <form onSubmit={handleSubmit} className="space-y-8">
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-8 mb-8">
              <h2 className="text-2xl font-bold mb-6 text-gray-900">Koolituse ja õppevormi valik</h2>
              <div className="space-y-6">
                {/* Koolitus */}
                <div className="relative">
                  <span className="block text-sm font-medium text-gray-700 mb-1">
                    Koolitus
                  </span>
                  <div className="relative inline-block group w-full">
                    <button
                      type="button"
                      className={`inline-flex items-center gap-2 px-4 py-2 h-10 rounded-lg border text-sm font-medium shadow-sm cursor-pointer transition-colors duration-200 w-full justify-between ${
                        formData.course
                          ? 'bg-primary-50 border-primary-200 text-primary-700'
                          : 'bg-white border-gray-300 text-gray-600 hover:bg-gray-50'
                      }`}
                    >
                      {formData.course ? (
                        (() => {
                          const { title, level } = parseCourseName(formData.course)
                          return (
                            <>
                              <span>{title}</span>
                              {level && (
                                <span
                                  className="ml-1 inline-flex items-center justify-center gap-[0.15rem] py-0.5 pl-2 pr-2.5 rounded-lg text-[0.65rem] font-semibold"
                                  style={{ backgroundColor: '#ffffff', color: '#2F6BDE', fontFamily: 'var(--font-inter), Inter, sans-serif' }}
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
                                  <span>{level.replace('Tase ', '')}</span>
                                </span>
                              )}
                            </>
                          )
                        })()
                      ) : (
                        <span>Vali koolitus</span>
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
                      className="absolute left-0 mt-2 bg-white rounded-xl shadow-xl border border-gray-100 py-2 z-20 opacity-0 invisible -translate-y-1 transition-all duration-200 group-hover:opacity-100 group-hover:visible group-hover:translate-y-0 min-w-[12rem]"
                    >
                      <button
                        type="button"
                        onClick={() => setFormData(prev => ({ ...prev, course: '' }))}
                        className="block w-full text-left px-4 py-2.5 text-sm text-gray-700 hover:bg-primary-50 hover:text-primary-600 transition-colors"
                      >
                        Kõik koolitused
                      </button>
                      {COURSE_CATALOG.map((c) => {
                        const { title, level } = parseCourseName(c.name)
                        return (
                          <button
                            key={c.name}
                            type="button"
                            onClick={() => setFormData(prev => ({ ...prev, course: c.name }))}
                            className="flex w-full items-center justify-between px-4 py-2.5 text-sm text-gray-700 hover:bg-primary-50 hover:text-primary-600 transition-colors"
                          >
                            <span>{title}</span>
                            {level && (
                              <span
                                className="ml-3 inline-flex items-center justify-center gap-[0.2rem] py-1 pl-2.5 pr-3 rounded-lg text-xs font-semibold w-[3rem]"
                                style={{ backgroundColor: '#E7F1FF', color: '#2F6BDE', fontFamily: 'var(--font-inter), Inter, sans-serif' }}
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
                                <span>{level.replace('Tase ', '')}</span>
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
                    Linn
                  </span>
                  <div className="relative inline-block group w-full">
                    <button
                      type="button"
                      className={`inline-flex items-center gap-2 px-4 py-2 h-10 rounded-lg border text-sm font-medium shadow-sm cursor-pointer transition-colors duration-200 w-full justify-between ${
                        formData.city
                          ? 'bg-primary-50 border-primary-200 text-primary-700'
                          : 'bg-white border-gray-300 text-gray-600 hover:bg-gray-50'
                      }`}
                    >
                      <span>{formData.city || 'Vali linn'}</span>
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
                      className="absolute left-0 mt-2 bg-white rounded-xl shadow-xl border border-gray-100 py-2 z-20 opacity-0 invisible -translate-y-1 transition-all duration-200 group-hover:opacity-100 group-hover:visible group-hover:translate-y-0 min-w-[9rem]"
                    >
                      <button
                        type="button"
                        onClick={() => setFormData(prev => ({ ...prev, city: '' }))}
                        className="block w-full text-left px-4 py-2.5 text-sm text-gray-700 hover:bg-primary-50 hover:text-primary-600 transition-colors"
                      >
                        Kõik linnad
                      </button>
                      {CITIES.map((city) => (
                        <button
                          key={city}
                          type="button"
                          onClick={() => setFormData(prev => ({ ...prev, city }))}
                          className="block w-full text-left px-4 py-2.5 text-sm text-gray-700 hover:bg-primary-50 hover:text-primary-600 transition-colors"
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
                    Kursuse algus
                  </span>
                  <div className="flex flex-wrap gap-4 items-end">
                    {/* Kuu */}
                    <div className="flex-1 min-w-[160px] relative">
                      <div className="relative inline-block group w-full">
                        <button
                          type="button"
                          className={`inline-flex items-center gap-2 px-4 py-2 h-10 rounded-lg border text-sm font-medium shadow-sm cursor-pointer transition-colors duration-200 w-full justify-between ${
                            formData.courseMonth
                              ? 'bg-primary-50 border-primary-200 text-primary-700'
                              : 'bg-white border-gray-300 text-gray-600 hover:bg-gray-50'
                          }`}
                        >
                          <span className="whitespace-nowrap">
                            {formData.courseMonth
                              ? monthOptions.find((m) => m.value === formData.courseMonth)?.label || 'Vali kuu'
                              : 'Vali kuu'}
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
                          className="absolute left-0 mt-2 bg-white rounded-xl shadow-xl border border-gray-100 py-2 z-20 opacity-0 invisible -translate-y-1 transition-all duration-200 group-hover:opacity-100 group-hover:visible group-hover:translate-y-0 min-w-[10rem]"
                        >
                          <button
                            type="button"
                            onClick={() =>
                              setFormData(prev => ({ ...prev, courseMonth: '', courseDate: '' }))
                            }
                            className="block w-full text-left px-4 py-2.5 text-sm text-gray-700 hover:bg-primary-50 hover:text-primary-600 transition-colors"
                          >
                            Kõik kuud
                          </button>
                          {monthOptions.map(({ value, label }, index) => {
                            const [yearStr] = value.split('-')
                            const year = parseInt(yearStr, 10)
                            const prevYear =
                              index > 0
                                ? parseInt(monthOptions[index - 1].value.split('-')[0], 10)
                                : year
                            const isNewYearGroup = index === 0 || year > prevYear
                            const monthLabel = label.replace(/\s+\d{4}$/, '')

                            return (
                              <div key={value}>
                                {isNewYearGroup && (
                                  <div className="px-4 pt-2 pb-1 text-[0.7rem] font-semibold text-gray-400 flex items-center gap-2 uppercase tracking-wide">
                                    <span>{year}</span>
                                    <div
                                      className="flex-1 border-t border-gray-100"
                                      style={{ borderTopWidth: '3px' }}
                                    />
                                  </div>
                                )}
                                <button
                                  type="button"
                                  onClick={() =>
                                    setFormData(prev => ({
                                      ...prev,
                                      courseMonth: value,
                                      courseDate: '',
                                    }))
                                  }
                                  className="block w-full text-left px-4 py-2.5 text-sm text-gray-700 hover:bg-primary-50 hover:text-primary-600 transition-colors whitespace-nowrap"
                                >
                                  {monthLabel}
                                </button>
                              </div>
                            )
                          })}
                        </div>
                      </div>
                    </div>
                    {/* Kuupäev */}
                    <div className="flex-1 min-w-[120px] relative">
                      <div className="relative inline-block group w-full">
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
                        >
                          <span>
                            {formData.courseDate
                              ? formatDateDDMMYYYY(formData.courseDate)
                              : 'Vali kuupäev'}
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
                            className="absolute left-0 mt-2 bg-white rounded-xl shadow-xl border border-gray-100 py-2 z-20 opacity-0 invisible -translate-y-1 transition-all duration-200 group-hover:opacity-100 group-hover:visible group-hover:translate-y-0 min-w-[9rem]"
                          >
                            <button
                              type="button"
                              onClick={() =>
                                setFormData(prev => ({ ...prev, courseDate: '' }))
                              }
                              className="block w-full text-left px-4 py-2.5 text-sm text-gray-700 hover:bg-primary-50 hover:text-primary-600 transition-colors"
                            >
                              Kõik kuupäevad
                            </button>
                            {dateOptions.map(({ value, label }) => (
                              <button
                                key={value}
                                type="button"
                                onClick={() =>
                                  setFormData(prev => ({ ...prev, courseDate: value }))
                                }
                                className="block w-full text-left px-4 py-2.5 text-sm text-gray-700 hover:bg-primary-50 hover:text-primary-600 transition-colors whitespace-nowrap"
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
                      Õppekeel
                    </span>
                    <div className="relative inline-block group w-full">
                      <button
                        type="button"
                        className={`inline-flex items-center gap-2 px-4 py-2 h-10 rounded-lg border text-sm font-medium shadow-sm cursor-pointer transition-colors duration-200 w-full justify-between ${
                          formData.learningLanguage
                            ? 'bg-primary-50 border-primary-200 text-primary-700'
                            : 'bg-white border-gray-300 text-gray-600 hover:bg-gray-50'
                        }`}
                      >
                        <span>
                          {formData.learningLanguage === 'estonian'
                            ? 'Eesti keel'
                            : formData.learningLanguage === 'russian'
                              ? 'Vene keel'
                              : 'Vali õppekeel'}
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
                        className="absolute left-0 mt-2 bg-white rounded-xl shadow-xl border border-gray-100 py-2 z-20 opacity-0 invisible -translate-y-1 transition-all duration-200 group-hover:opacity-100 group-hover:visible group-hover:translate-y-0 min-w-[10rem]"
                      >
                        <button
                          type="button"
                          onClick={() =>
                            setFormData(prev => ({ ...prev, learningLanguage: '' }))
                          }
                          className="block w-full text-left px-4 py-2.5 text-sm text-gray-700 hover:bg-primary-50 hover:text-primary-600 transition-colors"
                        >
                          Kõik keeled
                        </button>
                        <button
                          type="button"
                          onClick={() =>
                            setFormData(prev => ({ ...prev, learningLanguage: 'estonian' }))
                          }
                          className="block w-full text-left px-4 py-2.5 text-sm text-gray-700 hover:bg-primary-50 hover:text-primary-600 transition-colors"
                        >
                          Eesti keel
                        </button>
                        <button
                          type="button"
                          onClick={() =>
                            setFormData(prev => ({ ...prev, learningLanguage: 'russian' }))
                          }
                          className="block w-full text-left px-4 py-2.5 text-sm text-gray-700 hover:bg-primary-50 hover:text-primary-600 transition-colors"
                        >
                          Vene keel
                        </button>
                      </div>
                    </div>
                  </div>

                  {/* Õppeviis */}
                  <div className="relative flex-1">
                    <span className="block text-sm font-medium text-gray-700 mb-1">
                      Õppeviis
                    </span>
                    <div className="relative inline-block group w-full">
                      <button
                        type="button"
                        className={`inline-flex items-center gap-2 px-4 py-2 h-10 rounded-lg border text-sm font-medium shadow-sm cursor-pointer transition-colors duration-200 w-full justify-between ${
                          formData.learningType
                            ? 'bg-primary-50 border-primary-200 text-primary-700'
                            : 'bg-white border-gray-300 text-gray-600 hover:bg-gray-50'
                        }`}
                      >
                        <span>
                          {formData.learningType === 'onplace'
                            ? 'Kohapeal'
                            : formData.learningType === 'online'
                              ? 'Online'
                              : 'Vali õppeviis'}
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
                        className="absolute left-0 mt-2 bg-white rounded-xl shadow-xl border border-gray-100 py-2 z-20 opacity-0 invisible -translate-y-1 transition-all duration-200 group-hover:opacity-100 group-hover:visible group-hover:translate-y-0 min-w-[10rem]"
                      >
                        <button
                          type="button"
                          onClick={() =>
                            setFormData(prev => ({ ...prev, learningType: '' }))
                          }
                          className="block w-full text-left px-4 py-2.5 text-sm text-gray-700 hover:bg-primary-50 hover:text-primary-600 transition-colors"
                        >
                          Kõik õppeviisid
                        </button>
                        <button
                          type="button"
                          onClick={() =>
                            setFormData(prev => ({ ...prev, learningType: 'onplace' }))
                          }
                          className="block w-full text-left px-4 py-2.5 text-sm text-gray-700 hover:bg-primary-50 hover:text-primary-600 transition-colors"
                        >
                          Kohapeal
                        </button>
                        <button
                          type="button"
                          onClick={() =>
                            setFormData(prev => ({ ...prev, learningType: 'online' }))
                          }
                          className="block w-full text-left px-4 py-2.5 text-sm text-gray-700 hover:bg-primary-50 hover:text-primary-600 transition-colors"
                        >
                          Online
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-8 mb-8">
              <h2 className="text-2xl font-bold mb-6 text-gray-900">Kontaktandmed</h2>
              <div className="space-y-6">
                <div>
                  <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-2">
                    Nimi *
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
                    E-post *
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
                    Telefon *
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
                    Sõnum
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

            <button
              type="submit"
              className="w-full bg-primary-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-primary-700 transition cursor-pointer disabled:opacity-60 disabled:cursor-not-allowed"
            >
              Saada päring
            </button>
        </form>
      </div>
    </div>
  )
}

export default function Paring() {
  return (
    <Suspense fallback={
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-gray-600">Laadimine...</div>
      </div>
    }>
      <ParingForm />
    </Suspense>
  )
}
