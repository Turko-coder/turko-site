const withNextIntl = require('next-intl/plugin')()

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  async redirects() {
    // Old paths that map 1-to-1 with the new /et/ locale prefix
    const oldPaths = [
      'kursused',
      'kursused/taiendope',
      'kursused/koolituskalender',
      'koolituskalender',
      'kontaktid',
      'paring',
      'meiest/kontaktid',
      'keskusest',
      'koolitus',
    ]

    const pathRedirects = oldPaths.map((path) => ({
      source: `/${path}`,
      destination: `/et/${path}`,
      permanent: true,
    }))

    // Old paths whose destination changed in the new site
    const fixedRedirects = [
      // oppekavad and oppetoo pages were removed — redirect to training page
      { source: '/kursused/oppekavad', destination: '/et/kursused/koolitus' },
      { source: '/kursused/oppetoo',   destination: '/et/kursused/koolitus' },
      // meiest sub-pages that were removed — redirect to about page
      { source: '/meiest',             destination: '/et/keskusest' },
      { source: '/meiest/ajalugu',     destination: '/et/keskusest' },
      { source: '/meiest/tegevuse-alus', destination: '/et/keskusest' },
      { source: '/meiest/oppetoo',     destination: '/et/keskusest' },
      // meiest/koolitus → courses page
      { source: '/meiest/koolitus',    destination: '/et/kursused/koolitus' },
      // meiest/paring → registration
      { source: '/meiest/paring',      destination: '/et/registreerimine' },
      // other old meiest sub-pages
      { source: '/meiest/partnerid',   destination: '/et/keskusest' },
      { source: '/meiest/kontakt/paering', destination: '/et/registreerimine' },
    ].map((r) => ({ ...r, permanent: true }))

    // Old PHP site paths (/rus/index.php, /est/index.php, etc.)
    const phpRedirects = [
      { source: '/rus/:path*', destination: '/ru' },
      { source: '/est/:path*', destination: '/et' },
    ].map((r) => ({ ...r, permanent: true }))

    // Old site slugs that used "tase" suffix — new site uses shorter slugs
    const taseRedirects = [
      { source: '/kursused/valvetootaja-tase-3', destination: '/et/kursused/valvetootaja' },
      { source: '/kursused/turvatootaja-tase-4', destination: '/et/kursused/turvatootaja' },
      { source: '/kursused/turvajuht-tase-5', destination: '/et/kursused/turvajuht' },
    ].map((r) => ({ ...r, permanent: true }))

    return [...pathRedirects, ...fixedRedirects, ...taseRedirects, ...phpRedirects]
  },
}

module.exports = withNextIntl(nextConfig)
