'use client'

import { useMemo, useState, useEffect } from 'react'
import Link from 'next/link'
import { useSearchParams } from 'next/navigation'
import {
  generateCourseEvents,
  COURSE_CATALOG,
  CITIES,
  type CourseEvent,
} from './courseEvents'

const MONTH_NAMES = [
  'Jaanuar', 'Veebruar', 'Märts', 'Aprill', 'Mai', 'Juuni',
  'Juuli', 'August', 'September', 'Oktoober', 'November', 'Detsember',
]

/** Format YYYY-MM-DD to dd/mm */
function formatDate(dateStr: string): string {
  const [y, m, d] = dateStr.split('-')
  return `${d}/${m}`
}

/** Split course name into title and level (e.g. "Valvetöötaja, tase 3" → ["Valvetöötaja", "Tase 3"]). */
function parseCourseName(name: string): { title: string; level: string | null } {
  const match = name.match(/^(.+),\s*tase\s+(\d)$/i)
  if (match) {
    return { title: match[1].trim(), level: `Tase ${match[2]}` }
  }
  return { title: name, level: null }
}

/** Order for sorting: Tase 3 → Tase 4 → Tase 5 → Täiendõpe (99). */
function courseLevelOrder(name: string): number {
  const match = name.match(/tase\s+(\d)$/i)
  if (match) return parseInt(match[1], 10)
  return 99
}

function getCurrentMonthKey(): string {
  const n = new Date()
  return `${n.getFullYear()}-${String(n.getMonth() + 1).padStart(2, '0')}`
}

function getNextMonthKey(key: string): string {
  const [y, m] = key.split('-').map(Number)
  if (m === 12) return `${y + 1}-01`
  return `${y}-${String(m + 1).padStart(2, '0')}`
}

function getPrevMonthKey(key: string): string {
  const [y, m] = key.split('-').map(Number)
  if (m === 1) return `${y - 1}-12`
  return `${y}-${String(m - 1).padStart(2, '0')}`
}

export default function Koolituskalender() {
  const events = useMemo(
    () => generateCourseEvents(new Date(), 52),
    []
  )

  const currentMonthKey = useMemo(() => getCurrentMonthKey(), [])
  const defaultFilterMonth = useMemo(() => {
    const key = getCurrentMonthKey()
    const hasEventsInCurrentMonth = events.some((e) => e.date.startsWith(key))
    return hasEventsInCurrentMonth ? key : ''
  }, [events])
  const searchParams = useSearchParams()

  const [filterCity, setFilterCity] = useState<string>('')
  const [filterCourse, setFilterCourse] = useState<string>('')
  const [filterMonth, setFilterMonth] = useState<string>(defaultFilterMonth)

  useEffect(() => {
    const courseFromUrl = searchParams.get('course')
    if (courseFromUrl && COURSE_CATALOG.some((c) => c.name === courseFromUrl)) {
      setFilterCourse(courseFromUrl)
    }
  }, [searchParams])

  const monthsOptions = useMemo(() => {
    const set = new Set<string>()
    events.forEach((e) => {
      const [y, m] = e.date.split('-').map(Number)
      set.add(`${y}-${String(m).padStart(2, '0')}`)
    })
    return Array.from(set).sort().map((key) => {
      const [y, m] = key.split('-').map(Number)
      return { value: key, label: `${MONTH_NAMES[m - 1]} ${y}` }
    })
  }, [events])

  const filteredEvents = useMemo(() => {
    const list = events.filter((e) => {
      if (filterCity && e.location !== filterCity) return false
      if (filterCourse && e.name !== filterCourse) return false
      if (filterMonth) {
        const [y, m] = e.date.split('-')
        const eventKey = `${y}-${m}`
        if (eventKey !== filterMonth) return false
      }
      return true
    })
    return [...list].sort((a, b) => courseLevelOrder(a.name) - courseLevelOrder(b.name))
  }, [events, filterCity, filterCourse, filterMonth])

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold mb-4 text-gray-900">Koolituskalender</h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Vaata kõiki tulevasi koolitusi ja registreeru kohe
          </p>
        </div>

        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 mb-8">
          <h2 className="text-lg font-semibold text-gray-900 mb-4">Filtreeri</h2>
          <div className="flex flex-col min-[532px]:flex-row min-[532px]:flex-wrap gap-4 items-stretch min-[532px]:items-end">
            {/* Linn – dropdown nagu navis */}
            <div className="relative w-full min-[532px]:w-auto">
              <span className="block text-sm font-medium text-gray-700 mb-1">
                Linn
              </span>
              <div className="relative inline-block w-full min-[532px]:w-auto group">
                <button
                  type="button"
                  className={`inline-flex w-full min-[532px]:w-auto justify-between items-center gap-2 px-4 py-2 h-10 rounded-lg border text-sm font-medium shadow-sm cursor-pointer transition-colors duration-200 ${
                    filterCity
                      ? 'bg-primary-50 border-primary-200 text-primary-700'
                      : 'bg-white border-gray-300 text-gray-600 hover:bg-gray-50'
                  }`}
                  onClick={() => {
                    // Простое раскрытие по фокусу: браузер сам покажет меню ниже
                  }}
                >
                  <span>{filterCity || 'Kõik linnad'}</span>
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
                    onClick={() => setFilterCity('')}
                    className="block w-full text-left px-4 py-2.5 text-sm text-gray-700 hover:bg-primary-50 hover:text-primary-600 transition-colors"
                  >
                    Kõik linnad
                  </button>
                  {CITIES.map((city) => (
                    <button
                      key={city}
                      type="button"
                      onClick={() => setFilterCity(city)}
                      className="block w-full text-left px-4 py-2.5 text-sm text-gray-700 hover:bg-primary-50 hover:text-primary-600 transition-colors"
                    >
                      {city}
                    </button>
                  ))}
                </div>
              </div>
            </div>
            {/* Koolitus – dropdown */}
            <div className="relative w-full min-[532px]:w-auto">
              <span className="block text-sm font-medium text-gray-700 mb-1">
                Koolitus
              </span>
              <div className="relative inline-block w-full min-[532px]:w-auto group">
                <button
                  type="button"
                  className={`inline-flex w-full min-[532px]:w-auto justify-between items-center gap-2 px-4 py-2 h-10 rounded-lg border text-sm font-medium shadow-sm cursor-pointer transition-colors duration-200 ${
                    filterCourse
                      ? 'bg-primary-50 border-primary-200 text-primary-700'
                      : 'bg-white border-gray-300 text-gray-600 hover:bg-gray-50'
                  }`}
                >
                  {filterCourse ? (
                    (() => {
                      const { title, level } = parseCourseName(filterCourse)
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
                    <span>Kõik koolitused</span>
                  )}
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
                  className="absolute left-0 mt-2 bg-white rounded-xl shadow-xl border border-gray-100 py-2 z-20 opacity-0 invisible -translate-y-1 transition-all duration-200 group-hover:opacity-100 group-hover:visible group-hover:translate-y-0 min-w-[12rem]"
                >
                  <button
                    type="button"
                    onClick={() => setFilterCourse('')}
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
                        onClick={() => setFilterCourse(c.name)}
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
            {/* Kuu – dropdown */}
            <div className="relative w-full min-[532px]:w-auto">
              <span className="block text-sm font-medium text-gray-700 mb-1">
                Kuu
              </span>
              <div className="relative inline-block w-full min-[532px]:w-auto group">
                <button
                  type="button"
                  className={`inline-flex w-full min-[532px]:w-auto justify-between items-center gap-2 px-4 py-2 h-10 rounded-lg border text-sm font-medium shadow-sm cursor-pointer transition-colors duration-200 whitespace-nowrap ${
                    filterMonth
                      ? 'bg-primary-50 border-primary-200 text-primary-700'
                      : 'bg-white border-gray-300 text-gray-600 hover:bg-gray-50'
                  }`}
                >
                  <span className="whitespace-nowrap">
                    {filterMonth
                      ? monthsOptions.find((m) => m.value === filterMonth)?.label || 'Kõik kuud'
                      : 'Kõik kuud'}
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
                    onClick={() => setFilterMonth('')}
                    className="block w-full text-left px-4 py-2.5 text-sm text-gray-700 hover:bg-primary-50 hover:text-primary-600 transition-colors"
                  >
                    Kõik kuud
                  </button>
                  {monthsOptions.map(({ value, label }, index) => {
                    const [yearStr] = value.split('-')
                    const year = parseInt(yearStr, 10)
                    const prevYear =
                      index > 0 ? parseInt(monthsOptions[index - 1].value.split('-')[0], 10) : year
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
                          onClick={() => setFilterMonth(value)}
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
            <button
              type="button"
              onClick={() => {
                setFilterCity('')
                setFilterCourse('')
                setFilterMonth('')
              }}
              className="inline-flex h-10 w-full min-[532px]:w-auto mt-2 min-[532px]:mt-0 items-center justify-center px-4 text-sm font-medium text-gray-700 bg-gray-100 rounded-lg hover:bg-gray-200 transition cursor-pointer"
            >
              Tühjenda filtrid
            </button>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredEvents.map((course: CourseEvent, index: number) => (
            <div
              key={`${course.date}-${course.name}-${course.location}-${index}`}
            >
              {(() => {
                const { title, level } = parseCourseName(course.name)
                return (
                  <div className="bg-white rounded-3xl shadow-sm border border-gray-200 p-6 sm:p-8 w-full flex flex-col gap-6">
                    <div className="flex items-center justify-center gap-3">
                      <div
                        className="flex items-center justify-center"
                        style={{ color: '#1B51A8', width: '3rem', height: '3rem' }}
                      >
                        {title === 'Turvatöötaja' ? (
                          // Щит – как на странице Turvatöötaja / kursused
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            viewBox="0 0 24 24"
                            fill="currentColor"
                            className="w-full h-full"
                            aria-hidden
                          >
                            <path
                              fillRule="evenodd"
                              d="M11.484 2.17a.75.75 0 0 1 1.032 0 11.209 11.209 0 0 0 7.877 3.08.75.75 0 0 1 .722.515 12.74 12.74 0 0 1 .635 3.985c0 5.942-4.064 10.933-9.563 12.348a.749.749 0 0 1-.374 0C6.314 20.683 2.25 15.692 2.25 9.75c0-1.39.223-2.73.635-3.985a.75.75 0 0 1 .722-.516l.143.001c2.996 0 5.718-1.17 7.734-3.08ZM12 8.25a.75.75 0 0 1 .75.75v3.75a.75.75 0 0 1-1.5 0V9a.75.75 0 0 1 .75-.75ZM12 15a.75.75 0 0 0-.75.75v.008c0 .414.336.75.75.75h.008a.75.75 0 0 0 .75-.75v-.008a.75.75 0 0 0-.75-.75H12Z"
                              clipRule="evenodd"
                            />
                          </svg>
                        ) : title === 'Turvajuht' ? (
                          // Весы – как на странице Turvajuht / kursused
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            viewBox="0 0 24 24"
                            fill="currentColor"
                            className="w-full h-full"
                            aria-hidden
                          >
                            <path
                              fillRule="evenodd"
                              d="M12 2.25a.75.75 0 0 1 .75.75v.756a49.106 49.106 0 0 1 9.152 1 .75.75 0 0 1-.152 1.485h-1.918l2.474 10.124a.75.75 0 0 1-.375.84A6.723 6.723 0 0 1 18.75 18a6.723 6.723 0 0 1-3.181-.795.75.75 0 0 1-.375-.84l2.474-10.124H12.75v13.28c1.293.076 2.534.343 3.697.776a.75.75 0 0 1-.262 1.453h-8.37a.75.75 0 0 1-.262-1.453c1.162-.433 2.404-.7 3.697-.775V6.24H6.332l2.474 10.124a.75.75 0 0 1-.375.84A6.723 6.723 0 0 1 5.25 18a6.723 6.723 0 0 1-3.181-.795.75.75 0 0 1-.375-.84L4.168 6.241H2.25a.75.75 0 0 1-.152-1.485 49.105 49.105 0 0 1 9.152-1V3a.75.75 0 0 1 .75-.75Zm4.878 13.543 1.872-7.662 1.872 7.662h-3.744Zm-9.756 0L5.25 8.131l-1.872 7.662h3.744Z"
                              clipRule="evenodd"
                            />
                          </svg>
                        ) : (
                          // Базовая “глаз”‑иконка для остальных курсов
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            viewBox="0 0 24 24"
                            fill="currentColor"
                            className="w-full h-full"
                            aria-hidden
                          >
                            <path d="M12 15a3 3 0 1 0 0-6 3 3 0 0 0 0 6Z" />
                            <path
                              fillRule="evenodd"
                              d="M1.323 11.447C2.811 6.976 7.028 3.75 12.001 3.75c4.97 0 9.185 3.223 10.675 7.69.12.362.12.752 0 1.113-1.487 4.471-5.705 7.697-10.677 7.697-4.97 0-9.186-3.223-10.675-7.69a1.762 1.762 0 0 1 0-1.113ZM17.25 12a5.25 5.25 0 1 1-10.5 0 5.25 5.25 0 0 1 10.5 0Z"
                              clipRule="evenodd"
                            />
                          </svg>
                        )}
                      </div>
                      <div className="flex flex-col">
                        <span
                          className="font-bold"
                          style={{
                            color: '#1B51A8',
                            fontSize: '1.6rem',
                            lineHeight: '2rem',
                            fontFamily: 'var(--font-manrope), Manrope, sans-serif',
                            fontWeight: 700,
                          }}
                        >
                          {title}
                        </span>
                      </div>
                    </div>

                    <div className="flex items-start gap-4">
                      {/* Kuupäevablokk */}
                      <div
                        className="flex-1 flex flex-col items-center justify-between rounded-2xl px-6 py-5"
                        style={{ backgroundColor: '#BFD8FF', color: '#1B51A8', paddingTop: '1rem' }}
                      >
                        <div
                          className="mb-0"
                          style={{ width: '5.5rem', height: '5.5rem' }}
                        >
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            viewBox="0 0 24 24"
                            fill="currentColor"
                            className="w-full h-full"
                          >
                            <path d="M12.75 12.75a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0ZM7.5 15.75a.75.75 0 1 0 0-1.5.75.75 0 0 0 0 1.5ZM8.25 17.25a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0ZM9.75 15.75a.75.75 0 1 0 0-1.5.75.75 0 0 0 0 1.5ZM10.5 17.25a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0ZM12 15.75a.75.75 0 1 0 0-1.5.75.75 0 0 0 0 1.5ZM12.75 17.25a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0ZM14.25 15.75a.75.75 0 1 0 0-1.5.75.75 0 0 0 0 1.5ZM15 17.25a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0ZM16.5 15.75a.75.75 0 1 0 0-1.5.75.75 0 0 0 0 1.5ZM15 12.75a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0ZM16.5 13.5a.75.75 0 1 0 0-1.5.75.75 0 0 0 0 1.5Z" />
                            <path
                              fillRule="evenodd"
                              d="M6.75 2.25A.75.75 0 0 1 7.5 3v1.5h9V3A.75.75 0 0 1 18 3v1.5h.75a3 3 0 0 1 3 3v11.25a3 3 0 0 1-3 3H5.25a3 3 0 0 1-3-3V7.5a3 3 0 0 1 3-3H6V3a.75.75 0 0 1 .75-.75Zm13.5 9a1.5 1.5 0 0 0-1.5-1.5H5.25a1.5 1.5 0 0 0-1.5 1.5v7.5a1.5 1.5 0 0 0 1.5 1.5h13.5a1.5 1.5 0 0 0 1.5-1.5v-7.5Z"
                              clipRule="evenodd"
                            />
                          </svg>
                        </div>
                        <div
                          className="text-3xl font-bold leading-none"
                          style={{
                            fontFamily: 'var(--font-inter), Inter, -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif',
                            fontWeight: 600,
                            letterSpacing: '-0.01em',
                            color: '#1B51A8',
                          }}
                        >
                          {formatDate(course.date)}
                        </div>
                      </div>

                      {/* Kursuse metaandmed */}
                      <div className="inline-flex flex-col gap-2 items-start">
                        <span
                          className="inline-flex items-center justify-start py-1.5 px-3 text-sm font-semibold"
                          style={{
                            backgroundColor: '#E6EFFF',
                            color: '#336AC3',
                            borderRadius: '0.6rem',
                            gap: '0.2rem',
                            paddingLeft: '0.75rem',
                            paddingRight: '1rem',
                          }}
                        >
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            viewBox="0 0 24 24"
                            fill="currentColor"
                            className="w-4 h-4 flex-shrink-0"
                            aria-hidden
                          >
                            <path
                              fillRule="evenodd"
                              d="m11.54 22.351.07.04.028.016a.76.76 0 0 0 .723 0l.028-.015.071-.041a16.975 16.975 0 0 0 1.144-.742 19.58 19.58 0 0 0 2.683-2.282c1.944-1.99 3.963-4.98 3.963-8.827a8.25 8.25 0 0 0-16.5 0c0 3.846 2.02 6.837 3.963 8.827a19.58 19.58 0 0 0 2.682 2.282 16.975 16.975 0 0 0 1.145.742ZM12 13.5a3 3 0 1 0 0-6 3 3 0 0 0 0 6Z"
                              clipRule="evenodd"
                            />
                          </svg>
                          <span>{course.location}</span>
                        </span>
                        <span
                          className="inline-flex items-center justify-start py-1.5 px-3 text-sm font-semibold"
                          style={{
                            backgroundColor: '#E6EFFF',
                            color: '#336AC3',
                            borderRadius: '0.6rem',
                            gap: '0.2rem',
                            paddingLeft: '0.75rem',
                            paddingRight: '1rem',
                          }}
                        >
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            viewBox="0 0 24 24"
                            fill="currentColor"
                            className="w-4 h-4 flex-shrink-0"
                            aria-hidden
                          >
                            <path d="M18.375 2.25c-1.035 0-1.875.84-1.875 1.875v15.75c0 1.035.84 1.875 1.875 1.875h.75c1.035 0 1.875-.84 1.875-1.875V4.125c0-1.036-.84-1.875-1.875-1.875h-.75ZM9.75 8.625c0-1.036.84-1.875 1.875-1.875h.75c1.036 0 1.875.84 1.875 1.875v11.25c0 1.035-.84 1.875-1.875 1.875h-.75a1.875 1.875 0 0 1-1.875-1.875V8.625ZM3 13.125c0-1.036.84-1.875 1.875-1.875h.75c1.036 0 1.875.84 1.875 1.875v6.75c0 1.035-.84 1.875-1.875 1.875h-.75A1.875 1.875 0 0 1 3 19.875v-6.75Z" />
                          </svg>
                          {level && <span>{level.replace('Tase ', '')}</span>}
                        </span>
                        <span
                          className="inline-flex items-center justify-start py-1.5 px-3 text-sm font-semibold"
                          style={{
                            backgroundColor: '#E6EFFF',
                            color: '#336AC3',
                            borderRadius: '0.6rem',
                            gap: '0.2rem',
                            paddingLeft: '0.75rem',
                            paddingRight: '1rem',
                          }}
                        >
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            viewBox="0 0 24 24"
                            fill="currentColor"
                            className="w-4 h-4 flex-shrink-0"
                            aria-hidden
                          >
                            <path
                              fillRule="evenodd"
                              d="M12 2.25a9.75 9.75 0 1 0 9.75 9.75A9.76 9.76 0 0 0 12 2.25Zm.75 4.5a.75.75 0 0 0-1.5 0v4.38c0 .298.177.568.45.687l3.5 1.556a.75.75 0 1 0 .6-1.374l-3.05-1.357Z"
                              clipRule="evenodd"
                            />
                          </svg>
                          <span>{course.durationHours}</span>
                        </span>
                        <span
                          className="inline-flex items-center justify-start py-1.5 px-3 text-sm font-semibold"
                          style={{
                            backgroundColor: '#E6EFFF',
                            color: '#336AC3',
                            borderRadius: '0.6rem',
                            gap: '0.2rem',
                            paddingLeft: '0.75rem',
                            paddingRight: '1rem',
                          }}
                        >
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            viewBox="0 0 24 24"
                            fill="currentColor"
                            className="w-4 h-4 flex-shrink-0"
                            aria-hidden
                          >
                            <path
                              fillRule="evenodd"
                              d="M12 2.25c-5.385 0-9.75 4.365-9.75 9.75s4.365 9.75 9.75 9.75 9.75-4.365 9.75-9.75S17.385 2.25 12 2.25Zm-1.902 7.098a3.75 3.75 0 0 1 3.903-.884.75.75 0 1 0 .498-1.415A5.25 5.25 0 0 0 8.005 9.75H7.5a.75.75 0 0 0 0 1.5h.054a5.281 5.281 0 0 0 0 1.5H7.5a.75.75 0 0 0 0 1.5h.505a5.25 5.25 0 0 0 6.494 2.701.75.75 0 1 0-.498-1.415 3.75 3.75 0 0 1-4.252-1.286h3.001a.75.75 0 0 0 0-1.5H9.075a3.77 3.77 0 0 1 0-1.5h3.675a.75.75 0 0 0 0-1.5h-3c.105-.14.221-.274.348-.402Z"
                              clipRule="evenodd"
                            />
                          </svg>
                          <span>{course.price}</span>
                        </span>
                      </div>
                    </div>

                    <div className="flex flex-col gap-3">
                      <Link
                        href={course.link}
                        className="w-full inline-flex items-center justify-center px-6 py-3 rounded-xl border border-primary-200 bg-white text-primary-700 font-semibold hover:bg-primary-50 transition-colors cursor-pointer"
                      >
                        Loe lähemalt
                      </Link>
                      <Link
                        href={`/registreerimine?type=course&name=${encodeURIComponent(course.name)}&price=${encodeURIComponent(course.price)}&location=${encodeURIComponent(course.location)}&date=${encodeURIComponent(course.date)}`}
                        className="w-full inline-flex items-center justify-center px-6 py-3 rounded-xl font-semibold text-white shadow-sm hover:bg-primary-700 transition-colors cursor-pointer"
                        style={{ backgroundColor: '#177AE5' }}
                      >
                        Registreeru
                      </Link>
                    </div>
                  </div>
                )
              })()}
            </div>
          ))}
        </div>

        {filteredEvents.length === 0 && (
          <p className="text-center text-gray-600 py-12">
            Valitud filtritega koolitusi ei leitud.
          </p>
        )}

        <div className="flex flex-wrap items-center justify-center gap-4 mt-12">
          {filterMonth && filterMonth !== currentMonthKey && (
            <button
              type="button"
              onClick={() => {
                setFilterMonth(getPrevMonthKey(filterMonth))
                window.scrollTo({ top: 0, behavior: 'smooth' })
              }}
              className="inline-flex items-center gap-2 px-4 py-2 text-sm font-medium text-gray-700 bg-gray-100 rounded-lg hover:bg-gray-200 transition cursor-pointer"
            >
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5">
                <path strokeLinecap="round" strokeLinejoin="round" d="M10.5 19.5 3 12m0 0 7.5-7.5M3 12h18" />
              </svg>
              Eelmine kuu
            </button>
          )}
          <button
            type="button"
            onClick={() => {
              const next = filterMonth ? getNextMonthKey(filterMonth) : getNextMonthKey(currentMonthKey)
              setFilterMonth(next)
              window.scrollTo({ top: 0, behavior: 'smooth' })
            }}
            className="inline-flex items-center gap-2 px-4 py-2 text-sm font-medium text-gray-700 bg-gray-100 rounded-lg hover:bg-gray-200 transition cursor-pointer"
          >
            Järgmine kuu
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5">
              <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5 21 12m0 0-7.5 7.5M21 12H3" />
            </svg>
          </button>
        </div>
      </div>
    </div>
  )
}
