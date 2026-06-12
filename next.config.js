const withNextIntl = require('next-intl/plugin')()

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  async redirects() {
    // Old site paths that map 1-to-1 with the new /et/ locale prefix
    const oldPaths = [
      'kursused',
      'kursused/taiendope',
      'kursused/oppekavad',
      'kursused/oppetoo',
      'kursused/koolituskalender',
      'koolituskalender',
      'kontaktid',
      'paring',
      'meiest',
      'meiest/ajalugu',
      'meiest/tegevuse-alus',
      'meiest/koolitus',
      'meiest/oppetoo',
      'meiest/kontaktid',
      'meiest/paring',
      'keskusest',
      'koolitus',
    ]

    const pathRedirects = oldPaths.map((path) => ({
      source: `/${path}`,
      destination: `/et/${path}`,
      permanent: true,
    }))

    // Old site slugs that used "tase" suffix — new site uses shorter slugs
    const taseRedirects = [
      { source: '/kursused/valvetootaja-tase-3', destination: '/et/kursused/valvetootaja' },
      { source: '/kursused/turvatootaja-tase-4', destination: '/et/kursused/turvatootaja' },
      { source: '/kursused/turvajuht-tase-5', destination: '/et/kursused/turvajuht' },
    ].map((r) => ({ ...r, permanent: true }))

    return [...pathRedirects, ...taseRedirects]
  },
}

module.exports = withNextIntl(nextConfig)
