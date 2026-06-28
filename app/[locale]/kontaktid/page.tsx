'use client'

import { Suspense, useState, useMemo, useEffect } from 'react'
import { useSearchParams } from 'next/navigation'
import { useTranslations } from 'next-intl'

const locations = [
  {
    id: 'tallinn',
    name: 'Tallinn',
    lines: ['Väike pala 2', '11415', 'Eesti'],
    mapQuery: 'Turko+%C3%95ppekeskus+O%C3%9C,+V%C3%A4ike-Paala+tn+2,+Tallinn',
  },
  {
    id: 'tartu',
    name: 'Tartu',
    lines: ['Imatsalu tn 5', '50704', 'Eesti'],
    mapQuery: 'Imatsalu+tn+5,+Tartu,+Eesti',
  },
  {
    id: 'narva',
    name: 'Narva',
    lines: ['Paul Kerese tn 3', '20309', 'Eesti'],
    mapQuery: 'Paul+Kerese+tn+3,+Narva,+20309,+Eesti',
  },
] as const

const validCityIds = locations.map((l) => l.id)

function getInitialCityId(searchParams: URLSearchParams | null): (typeof locations)[number]['id'] {
  const city = searchParams?.get('city')?.toLowerCase()
  if (city && validCityIds.includes(city as (typeof locations)[number]['id'])) {
    return city as (typeof locations)[number]['id']
  }
  return 'tallinn'
}

function KontaktidContent() {
  const t = useTranslations('contacts')
  const searchParams = useSearchParams()
  const cityFromUrl = searchParams.get('city')?.toLowerCase() ?? ''
  const initialId = useMemo(() => getInitialCityId(searchParams), [cityFromUrl, searchParams])
  const [selectedId, setSelectedId] = useState<(typeof locations)[number]['id']>(initialId)

  useEffect(() => {
    if (validCityIds.includes(cityFromUrl as (typeof locations)[number]['id'])) {
      setSelectedId(cityFromUrl as (typeof locations)[number]['id'])
    }
  }, [cityFromUrl])

  const selected = locations.find((l) => l.id === selectedId) ?? locations[0]

  return (
    <div className="max-w-4xl mx-auto page-gutter-x py-12">
      <h1 className="text-4xl font-bold mb-8 text-gray-900">{t('title')}</h1>
      <div>
        <h2 className="text-2xl font-bold mb-4 text-gray-900">{t('contactInfo')}</h2>
        <div className="text-gray-600 space-y-2">
          <p>
            <strong>{t('phoneLabel')}</strong>{' '}
            <a href="tel:+3725290528" className="text-primary-600 hover:text-primary-800">
              +3725290528
            </a>
          </p>
          <p>
            <strong>{t('emailLabel')}</strong>{' '}
            <a href="mailto:info@turvakoolitus.eu" className="text-primary-600 hover:text-primary-800">
              info@turvakoolitus.eu
            </a>
          </p>
        </div>
      </div>

      <div className="mt-12">
        <h2 className="text-2xl font-bold mb-4 text-gray-900">{t('locationTitle')}</h2>
        <div className="flex flex-wrap gap-3 mb-6 max-[312px]:flex-col max-[312px]:flex-nowrap max-[312px]:items-stretch">
          {locations.map((loc) => (
            <button
              key={loc.id}
              type="button"
              onClick={() => setSelectedId(loc.id)}
              className={`px-5 py-2.5 rounded-lg font-medium transition cursor-pointer max-[312px]:w-full ${
                selectedId === loc.id
                  ? 'bg-primary-600 text-white'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              {loc.name}
            </button>
          ))}
        </div>
        <div className="w-full h-96 rounded-lg overflow-hidden shadow-lg border border-gray-200">
          <iframe
            key={selected.id}
            width="100%"
            height="100%"
            style={{ border: 0 }}
            loading="lazy"
            allowFullScreen
            referrerPolicy="no-referrer-when-downgrade"
            src={`https://www.google.com/maps?q=${selected.mapQuery}&output=embed`}
            title={`Kaart: ${selected.name}`}
          />
        </div>
      </div>
    </div>
  )
}

export default function Kontaktid() {
  return (
    <Suspense
      fallback={
        <div className="max-w-4xl mx-auto page-gutter-x py-12 text-gray-600">
          Laadimine...
        </div>
      }
    >
      <KontaktidContent />
    </Suspense>
  )
}

