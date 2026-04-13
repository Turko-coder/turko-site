'use client'

import {
  forwardRef,
  useEffect,
  useMemo,
  useState,
} from 'react'
import { useTranslations } from 'next-intl'

/**
 * Talv: dets (Y−1) + jaan–veebr (Y); kevad–suvi–sügis ühe aasta Y kuud.
 */
const NON_WINTER_SEASON_MONTHS = [
  [3, 4, 5],
  [6, 7, 8],
  [9, 10, 11],
] as const

const SEASON_LABEL_KEYS = [
  'seasonWinter',
  'seasonSpring',
  'seasonSummer',
  'seasonAutumn',
] as const

function seasonIndexFromMonthKey(key: string): 0 | 1 | 2 | 3 | null {
  const parts = key.split('-')
  if (parts.length < 2) return null
  const m = parseInt(parts[1], 10)
  if (Number.isNaN(m) || m < 1 || m > 12) return null
  if (m === 12 || m === 1 || m === 2) return 0
  if (m <= 5) return 1
  if (m <= 8) return 2
  return 3
}

function winterAnchorYear(calendarYear: number, month: number): number {
  return month === 12 ? calendarYear + 1 : calendarYear
}

type MonthPickerRow = { year: number; monthMap: Map<number, string> }

function seasonHasEvents(
  rows: MonthPickerRow[],
  yi: number,
  season: number
): boolean {
  if (yi < 0 || yi >= rows.length) return false
  const anchorYear = rows[yi].year
  const mapByYear = new Map(rows.map((r) => [r.year, r.monthMap]))

  if (season === 0) {
    return (
      (mapByYear.get(anchorYear - 1)?.has(12) ?? false) ||
      (mapByYear.get(anchorYear)?.has(1) ?? false) ||
      (mapByYear.get(anchorYear)?.has(2) ?? false)
    )
  }
  const months = NON_WINTER_SEASON_MONTHS[season - 1]
  return months.some((mo) => rows[yi].monthMap.has(mo))
}

function getPopulatedSeasonSteps(rows: MonthPickerRow[]): {
  yi: number
  season: number
}[] {
  const steps: { yi: number; season: number }[] = []
  for (let yi = 0; yi < rows.length; yi++) {
    for (let season = 0; season < 4; season++) {
      if (seasonHasEvents(rows, yi, season)) steps.push({ yi, season })
    }
  }
  return steps
}

export type MonthSeasonPickerOption = { value: string; label: string }

export type MonthSeasonPickerProps = {
  monthOptions: MonthSeasonPickerOption[]
  value: string
  onChange: (yyyyMm: string) => void
  onClear: () => void
  isOpen: boolean
  onOpenChange: (open: boolean) => void
  /** Tekst, kui kuud pole valitud (filter: „kõik kuud“, vorm: „vali kuu“). */
  emptyLabel: string
  /** Paneeli ülemine nupp (tühjendab valiku). */
  allMonthsButtonLabel: string
  /** `filter` — nagu kalendri filter; `form` — täislaius nagu registreerimine. */
  layout?: 'filter' | 'form'
}

export const MonthSeasonPicker = forwardRef<
  HTMLDivElement,
  MonthSeasonPickerProps
>(function MonthSeasonPicker(
  {
    monthOptions,
    value,
    onChange,
    onClear,
    isOpen,
    onOpenChange,
    emptyLabel,
    allMonthsButtonLabel,
    layout = 'filter',
  },
  ref
) {
  const tCal = useTranslations('calendar')
  const tCommon = useTranslations('common')

  const [monthPickerYearIdx, setMonthPickerYearIdx] = useState(0)
  const [monthPickerSeason, setMonthPickerSeason] = useState(0)

  const monthsByYear = useMemo(() => {
    const map = new Map<number, Map<number, string>>()
    for (const opt of monthOptions) {
      const [y, mo] = opt.value.split('-').map(Number)
      if (!map.has(y)) map.set(y, new Map())
      map.get(y)!.set(mo, opt.value)
    }
    return [...map.entries()]
      .sort((a, b) => a[0] - b[0])
      .map(([year, monthMap]) => ({ year, monthMap }))
  }, [monthOptions])

  const monthPickerRows = useMemo(() => {
    const rowByYear = new Map<number, Map<number, string>>()
    for (const { year, monthMap } of monthsByYear) {
      rowByYear.set(year, monthMap)
    }
    const years = new Set<number>(rowByYear.keys())
    for (const opt of monthOptions) {
      const [y, m] = opt.value.split('-').map(Number)
      if (m === 12) years.add(y + 1)
    }
    return [...years]
      .sort((a, b) => a - b)
      .map((year) => ({
        year,
        monthMap: rowByYear.get(year) ?? new Map<number, string>(),
      }))
  }, [monthsByYear, monthOptions])

  const populatedSeasonSteps = useMemo(
    () => getPopulatedSeasonSteps(monthPickerRows),
    [monthPickerRows]
  )

  useEffect(() => {
    if (!isOpen || monthPickerRows.length === 0) return
    if (populatedSeasonSteps.length === 0) return

    let nextYi: number
    let nextSeason: number

    if (value) {
      const [y, mo] = value.split('-').map(Number)
      const si = seasonIndexFromMonthKey(value)
      const anchorYear = si === 0 ? winterAnchorYear(y, mo) : y
      const yi = monthPickerRows.findIndex((row) => row.year === anchorYear)
      nextYi = yi >= 0 ? yi : 0
      nextSeason = si !== null ? si : 0
    } else {
      nextYi = 0
      const first = monthPickerRows[0]
      let s = 0
      for (; s < 4; s++) {
        if (s === 0) {
          const decMap = monthPickerRows.find((r) => r.year === first.year - 1)
            ?.monthMap
          if (
            decMap?.has(12) ||
            first.monthMap.has(1) ||
            first.monthMap.has(2)
          )
            break
        } else if (
          NON_WINTER_SEASON_MONTHS[s - 1].some((m) =>
            first.monthMap.has(m)
          )
        )
          break
      }
      nextSeason = s >= 4 ? 0 : s
    }

    const ok = populatedSeasonSteps.some(
      (st) => st.yi === nextYi && st.season === nextSeason
    )
    if (!ok) {
      const f = populatedSeasonSteps[0]
      nextYi = f.yi
      nextSeason = f.season
    }
    setMonthPickerYearIdx(nextYi)
    setMonthPickerSeason(nextSeason)
  }, [isOpen, value, monthPickerRows, populatedSeasonSteps])

  const triggerText = value
    ? monthOptions.find((m) => m.value === value)?.label ?? emptyLabel
    : emptyLabel

  const wrapClass =
    layout === 'form'
      ? 'relative block w-full min-w-0'
      : 'relative block w-full min-w-0 sm:inline-block sm:w-auto'

  const triggerClass =
    layout === 'form'
      ? 'inline-flex w-full justify-between items-center gap-2 px-4 py-2 h-10 rounded-lg border text-sm font-medium shadow-sm cursor-pointer transition-colors duration-200'
      : 'inline-flex w-full sm:w-auto justify-between items-center gap-2 px-4 py-2 h-10 rounded-lg border text-sm font-medium shadow-sm cursor-pointer transition-colors duration-200 whitespace-nowrap'

  const triggerPalette = value
    ? 'bg-primary-50 border-primary-200 text-primary-700 hover:bg-primary-100/80'
    : 'bg-white border-gray-300 text-gray-600 hover:bg-gray-50'

  return (
    <div ref={ref} className={wrapClass}>
      <button
        type="button"
        className={`${triggerClass} ${triggerPalette}`}
        onClick={() => onOpenChange(!isOpen)}
        aria-expanded={isOpen}
      >
        <span className={layout === 'filter' ? 'whitespace-nowrap' : ''}>
          {triggerText}
        </span>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth={1.5}
          className="h-4 w-4 shrink-0"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M6 9l6 6 6-6"
          />
        </svg>
      </button>
      <div
        className={`absolute left-0 right-0 z-20 mt-2 w-full rounded-xl border border-gray-100 bg-white py-2 shadow-xl transition-all duration-200 sm:right-auto sm:w-[min(100vw-2rem,17.5rem)] ${
          isOpen
            ? 'visible translate-y-0 opacity-100'
            : 'pointer-events-none invisible -translate-y-1 opacity-0'
        }`}
      >
        <button
          type="button"
          onClick={() => {
            onClear()
            onOpenChange(false)
          }}
          className="mx-2 mb-2 block w-[calc(100%-1rem)] rounded-lg px-3 py-2 text-left text-sm font-medium text-gray-700 transition-colors hover:bg-primary-50 hover:text-primary-600"
        >
          {allMonthsButtonLabel}
        </button>
        {monthPickerRows.length > 0 && populatedSeasonSteps.length > 0 && (
          <>
            <div className="mx-2 mb-1 border-t border-gray-100" />
            <div className="px-2 pb-2 pt-1">
              {(() => {
                const safeYi = Math.min(
                  Math.max(0, monthPickerYearIdx),
                  monthPickerRows.length - 1
                )
                const row = monthPickerRows[safeYi]
                const year = row.year
                const mapByYear = new Map(
                  monthPickerRows.map((r) => [r.year, r.monthMap])
                )
                const seasonCells =
                  monthPickerSeason === 0
                    ? [
                        { cellYear: year - 1, m: 12 },
                        { cellYear: year, m: 1 },
                        { cellYear: year, m: 2 },
                      ]
                    : NON_WINTER_SEASON_MONTHS[monthPickerSeason - 1].map(
                        (m) => ({ cellYear: year, m })
                      )
                const curStepIdx = populatedSeasonSteps.findIndex(
                  (st) =>
                    st.yi === safeYi && st.season === monthPickerSeason
                )
                const atStart = curStepIdx <= 0
                const atEnd =
                  curStepIdx < 0 ||
                  curStepIdx >= populatedSeasonSteps.length - 1
                const seasonLabel = tCal(SEASON_LABEL_KEYS[monthPickerSeason])
                const yearHeading =
                  monthPickerSeason === 0
                    ? `${year - 1}/${year}`
                    : String(year)

                const goPrev = () => {
                  if (curStepIdx <= 0) return
                  const prev = populatedSeasonSteps[curStepIdx - 1]
                  setMonthPickerYearIdx(prev.yi)
                  setMonthPickerSeason(prev.season)
                }
                const goNext = () => {
                  if (
                    curStepIdx < 0 ||
                    curStepIdx >= populatedSeasonSteps.length - 1
                  )
                    return
                  const next = populatedSeasonSteps[curStepIdx + 1]
                  setMonthPickerYearIdx(next.yi)
                  setMonthPickerSeason(next.season)
                }

                return (
                  <>
                    <div className="mb-2 flex items-stretch gap-1">
                      <button
                        type="button"
                        disabled={atStart}
                        aria-label={tCal('prevSeasonRange')}
                        onClick={goPrev}
                        className="flex h-12 w-8 shrink-0 items-center justify-center rounded-md border border-gray-200 bg-white text-gray-700 transition-colors hover:bg-gray-50 disabled:cursor-not-allowed disabled:opacity-40"
                      >
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          fill="none"
                          viewBox="0 0 24 24"
                          strokeWidth={1.5}
                          stroke="currentColor"
                          className="h-4 w-4"
                          aria-hidden
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="M15.75 19.5 8.25 12l7.5-7.5"
                          />
                        </svg>
                      </button>
                      <div
                        className="flex min-h-12 min-w-0 flex-1 flex-col items-center justify-center rounded-md border border-gray-200 bg-gray-50 px-1.5 py-1.5"
                        role="status"
                        aria-live="polite"
                      >
                        <span className="text-xs font-semibold tabular-nums text-gray-900">
                          {yearHeading}
                        </span>
                        <span className="text-center text-[11px] font-semibold leading-tight text-gray-800 sm:text-xs">
                          {seasonLabel}
                        </span>
                      </div>
                      <button
                        type="button"
                        disabled={atEnd}
                        aria-label={tCal('nextSeasonRange')}
                        onClick={goNext}
                        className="flex h-12 w-8 shrink-0 items-center justify-center rounded-md border border-gray-200 bg-white text-gray-700 transition-colors hover:bg-gray-50 disabled:cursor-not-allowed disabled:opacity-40"
                      >
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          fill="none"
                          viewBox="0 0 24 24"
                          strokeWidth={1.5}
                          stroke="currentColor"
                          className="h-4 w-4"
                          aria-hidden
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="m8.25 4.5 7.5 7.5-7.5 7.5"
                          />
                        </svg>
                      </button>
                    </div>
                    <div className="grid grid-cols-3 gap-1">
                      {seasonCells.map(({ cellYear, m }) => {
                        const cellValue = `${cellYear}-${String(m).padStart(2, '0')}`
                        const available =
                          mapByYear.get(cellYear)?.has(m) ?? false
                        const monthLabel = tCommon(`months.${m}`)
                        if (!available) {
                          return (
                            <div
                              key={cellValue}
                              className="min-h-[2.75rem] rounded-md bg-gray-50/60"
                              aria-hidden
                            />
                          )
                        }
                        const selected = value === cellValue
                        return (
                          <button
                            key={cellValue}
                            type="button"
                            title={monthLabel}
                            onClick={() => {
                              onChange(cellValue)
                              onOpenChange(false)
                            }}
                            className={`flex min-h-[2.75rem] items-center justify-center rounded-md px-0.5 py-1 text-center text-[11px] font-medium leading-tight transition-colors sm:text-xs ${
                              selected
                                ? 'bg-primary-100 text-primary-700 ring-1 ring-inset ring-primary-200'
                                : 'text-gray-800 hover:bg-primary-50 hover:text-primary-600'
                            }`}
                          >
                            <span className="line-clamp-2 max-w-full break-words">
                              {monthLabel}
                            </span>
                          </button>
                        )
                      })}
                    </div>
                  </>
                )
              })()}
            </div>
          </>
        )}
      </div>
    </div>
  )
})
