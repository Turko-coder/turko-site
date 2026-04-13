/**
 * Course catalog and event generator.
 * Every Monday of every week: one event per (course, city). So e.g. if a month
 * has 4 Mondays, there are 4 events per course per city in that month.
 */

export const COURSE_CATALOG = [
  {
    name: 'Valvetöötaja, tase 3',
    link: '/kursused/valvetootaja',
    price: '2480€',
    durationHours: '84h',
  },
  {
    name: 'Turvatöötaja, tase 4',
    link: '/kursused/turvatootaja',
    price: '2480€',
    durationHours: '84h',
  },
  {
    name: 'Turvajuht, tase 5',
    link: '/kursused/turvajuht',
    price: '2480€',
    durationHours: '106h',
  },
] as const

export const CITIES = ['Tallinn', 'Narva', 'Tartu'] as const

export interface CourseEvent {
  date: string // YYYY-MM-DD
  name: string
  location: string
  price: string
  durationHours: string
  link: string
}

/** Get the Monday of the week containing the given date (or the date if it is Monday). */
function getMonday(d: Date): Date {
  const day = d.getDay()
  const diff = d.getDate() - day + (day === 0 ? -6 : 1)
  return new Date(d.getFullYear(), d.getMonth(), diff)
}

/** Add weeks to a date. */
function addWeeks(d: Date, weeks: number): Date {
  const out = new Date(d)
  out.setDate(out.getDate() + weeks * 7)
  return out
}

/**
 * Generate course events: every Monday we create one event for each (course, city).
 * So if a month has 4 Mondays, there are 4 events per course per city that month.
 * @param fromDate - start generating from this date (first Monday is that week or next)
 * @param weeks - number of weeks to generate (default 52)
 */
export function generateCourseEvents(fromDate: Date = new Date(), weeks: number = 52): CourseEvent[] {
  const startMonday = getMonday(fromDate)
  const today = new Date()
  today.setHours(0, 0, 0, 0)

  let monday = new Date(startMonday)
  monday.setHours(0, 0, 0, 0)
  if (monday < today) {
    monday = addWeeks(monday, 1)
  }

  /** Format local date as YYYY-MM-DD (avoid UTC shift so Monday stays Monday in all timezones). */
  function toLocalDateStr(d: Date): string {
    const y = d.getFullYear()
    const m = String(d.getMonth() + 1).padStart(2, '0')
    const day = String(d.getDate()).padStart(2, '0')
    return `${y}-${m}-${day}`
  }

  const events: CourseEvent[] = []

  for (let i = 0; i < weeks; i++) {
    const dateStr = toLocalDateStr(monday)

    for (const course of COURSE_CATALOG) {
      for (const city of CITIES) {
        events.push({
          date: dateStr,
          name: course.name,
          location: city,
          price: course.price,
          durationHours: course.durationHours,
          link: course.link,
        })
      }
    }

    monday = addWeeks(monday, 1)
  }

  return events
}

