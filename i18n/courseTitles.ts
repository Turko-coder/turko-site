/**
 * Estonian course base names from data (Valvetöötaja, …) → localized nav-style labels for UI.
 * Internal keys and CourseFilterNavIcon still use Estonian titles.
 */
export function localizedCourseBaseTitle(
  estonianBaseTitle: string,
  locale: string | undefined,
  tNav: (key: 'guard' | 'security' | 'securityLead') => string,
  /** When passed (e.g. from `courses`), Russian guard/security use two-line titles. */
  tCourses?: (key: 'guard.title' | 'security.title') => string,
): string {
  if (locale !== 'ru') return estonianBaseTitle
  switch (estonianBaseTitle) {
    case 'Valvetöötaja':
      return tCourses ? tCourses('guard.title') : tNav('guard')
    case 'Turvatöötaja':
      return tCourses ? tCourses('security.title') : tNav('security')
    case 'Turvajuht':
      return tNav('securityLead')
    default:
      return estonianBaseTitle
  }
}

/** Level badge: Arabic digit(s) from "Tase N" (same for all locales). */
export function localizedTaseLevelBadge(
  level: string | null,
  _locale: string | undefined,
): string | null {
  if (!level) return null
  return level.replace(/^Tase\s+/i, '').trim()
}
