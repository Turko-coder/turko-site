import { MetadataRoute } from 'next'

const baseUrl = 'https://turvakoolitus.eu'

const pages = [
  '',
  '/kursused',
  '/kursused/valvetootaja-tase-3',
  '/kursused/turvatootaja-tase-4',
  '/kursused/turvajuht-tase-5',
  '/kursused/taiendope',
  '/kursused/koolituskalender',
  '/kontaktid',
  '/paring',
  '/meiest',
  '/meiest/tegevuse-alus',
  '/meiest/noustamine',
  '/meiest/partnerid',
  '/meiest/oppetoo',
  '/koolituskalender',
  '/treeningud',
  '/koolitus',
]

export default function sitemap(): MetadataRoute.Sitemap {
  const entries: MetadataRoute.Sitemap = []

  for (const page of pages) {
    for (const locale of ['et', 'ru']) {
      entries.push({
        url: `${baseUrl}/${locale}${page}`,
        lastModified: '2026-06-08',
        changeFrequency: page === '' ? 'weekly' : 'monthly',
        priority: page === '' ? 1 : 0.8,
      })
    }
  }

  return entries
}
