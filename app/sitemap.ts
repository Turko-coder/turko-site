import { MetadataRoute } from 'next'

const BASE_URL = 'https://turvakoolitus.eu'
const LOCALES = ['et', 'ru'] as const

type ChangeFreq = 'weekly' | 'monthly'

interface PageConfig {
  path: string
  changeFrequency: ChangeFreq
  priority: number
}

const pages: PageConfig[] = [
  { path: '', changeFrequency: 'weekly', priority: 1.0 },
  { path: '/kursused', changeFrequency: 'monthly', priority: 0.9 },
  { path: '/kursused/valvetootaja-tase-3', changeFrequency: 'monthly', priority: 0.8 },
  { path: '/kursused/turvatootaja-tase-4', changeFrequency: 'monthly', priority: 0.8 },
  { path: '/kursused/turvajuht-tase-5', changeFrequency: 'monthly', priority: 0.8 },
  { path: '/kursused/taiendope', changeFrequency: 'monthly', priority: 0.8 },
  { path: '/kursused/koolituskalender', changeFrequency: 'weekly', priority: 0.8 },
  { path: '/koolituskalender', changeFrequency: 'weekly', priority: 0.8 },
  { path: '/kontaktid', changeFrequency: 'monthly', priority: 0.7 },
  { path: '/paring', changeFrequency: 'monthly', priority: 0.7 },
  { path: '/meiest', changeFrequency: 'monthly', priority: 0.7 },
  { path: '/meiest/tegevuse-alus', changeFrequency: 'monthly', priority: 0.6 },
  { path: '/meiest/noustamine', changeFrequency: 'monthly', priority: 0.6 },
  { path: '/meiest/partnerid', changeFrequency: 'monthly', priority: 0.6 },
  { path: '/meiest/oppetoo', changeFrequency: 'monthly', priority: 0.6 },
  { path: '/treeningud', changeFrequency: 'monthly', priority: 0.7 },
  { path: '/koolitus', changeFrequency: 'monthly', priority: 0.7 },
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
