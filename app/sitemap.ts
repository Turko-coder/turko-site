import { MetadataRoute } from 'next'

const baseUrl = 'https://turvakoolitus.eu'
const locales = ['et', 'ru']

const pages = [
  '',
  '/kursused',
  '/kursused/valvetootaja-tase-3',
  '/kursused/turvatootaja-tase-4',
  '/kursused/turvajuht-tase-5',
  '/kursused/taiendope',
  '/kursused/oppekavad',
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
  '/keskusest',
  '/koolitus',
]

export default function sitemap(): MetadataRoute.Sitemap {
  const entries: MetadataRoute.Sitemap = []

  for (const page of pages) {
    for (const locale of locales) {
      entries.push({
        url: `${baseUrl}/${locale}${page}`,
        lastModified: new Date(),
        changeFrequency: page === '' ? 'weekly' : 'monthly',
        priority: page === '' ? 1 : 0.8,
      })
    }
  }

  return entries
}
