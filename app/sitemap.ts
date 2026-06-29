import { MetadataRoute } from 'next'

const BASE_URL = 'https://www.turvakoolitus.eu'
const LOCALES = ['et', 'ru'] as const

type ChangeFreq = 'weekly' | 'monthly'

interface PageConfig {
  path: string
  changeFrequency: ChangeFreq
  priority: number
}

// Only real content pages — redirect stubs (kursused, koolitus, kursused/koolituskalender,
// meiest/keskusest, meiest/kontaktid) are intentionally excluded.
const pages: PageConfig[] = [
  { path: '', changeFrequency: 'weekly', priority: 1.0 },
  { path: '/kursused/koolitus', changeFrequency: 'monthly', priority: 0.9 },
  { path: '/kursused/valvetootaja', changeFrequency: 'monthly', priority: 0.8 },
  { path: '/kursused/turvatootaja', changeFrequency: 'monthly', priority: 0.8 },
  { path: '/kursused/turvajuht', changeFrequency: 'monthly', priority: 0.8 },
  { path: '/kursused/taiendope', changeFrequency: 'monthly', priority: 0.8 },
  { path: '/kursused/oppekavad-oppetoo', changeFrequency: 'monthly', priority: 0.7 },
  { path: '/koolituskalender', changeFrequency: 'weekly', priority: 0.8 },
  { path: '/kontaktid', changeFrequency: 'monthly', priority: 0.7 },
  { path: '/paring', changeFrequency: 'monthly', priority: 0.7 },
  { path: '/meiest/tegevuse-alus', changeFrequency: 'monthly', priority: 0.6 },
  { path: '/meiest/oppetoo', changeFrequency: 'monthly', priority: 0.6 },
  { path: '/keskusest', changeFrequency: 'monthly', priority: 0.7 },
]

export default function sitemap(): MetadataRoute.Sitemap {
  return pages.flatMap(({ path, changeFrequency, priority }) =>
    LOCALES.map((locale) => ({
      url: `${BASE_URL}/${locale}${path}`,
      changeFrequency,
      priority,
    }))
  )
}
