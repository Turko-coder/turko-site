const withNextIntl = require('next-intl/plugin')()

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  async redirects() {
    const oldPaths = [
      'kursused',
      'kursused/valvetootaja-tase-3',
      'kursused/turvatootaja-tase-4',
      'kursused/turvajuht-tase-5',
      'kursused/taiendope',
      'kursused/oppekavad',
      'kursused/oppetoo',
      'kursused/koolituskalender',
      'koolituskalender',
      'treeningud',
      'kontaktid',
      'paring',
      'meiest',
      'meiest/ajalugu',
      'meiest/tegevuse-alus',
      'meiest/noustamine',
      'meiest/partnerid',
      'meiest/koolitus',
      'meiest/oppetoo',
      'meiest/kontaktid',
      'meiest/paring',
      'keskusest',
      'koolitus',
    ]

    return oldPaths.map((path) => ({
      source: `/${path}`,
      destination: `/et/${path}`,
      permanent: true,
    }))
  },
}

module.exports = withNextIntl(nextConfig)
