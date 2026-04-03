'use client'

import Link from 'next/link'

interface Partner {
  name: string
  image: string
}

const PARTNERS: Partner[] = [
  { name: 'Politsei- ja Piirivalveamet', image: '/partners/politsei.png' },
  { name: 'Päästeamet', image: '/partners/paasteamet.png' },
  { name: 'ETEL', image: '/partners/etel.png' },
  { name: 'Sotsiaal-Humanitaar Infokool', image: '/partners/shi.png' },
  { name: 'TPSC', image: '/partners/tpsc.png' },
  { name: 'Taifu', image: '/partners/taifu.png' },
]

export default function PartnersSlider() {
  return (
    <section className="bg-white py-16">
      <div className="max-w-[48rem] mx-auto px-2 sm:px-3">
        <h2
          className="font-bold text-gray-900 text-center mb-8"
          style={{ fontSize: '2.5rem', lineHeight: '3rem' }}
        >
          Meie partnerid
        </h2>
        <div
          className="flex flex-nowrap items-stretch w-full"
          style={{ gap: 'clamp(0.5rem, 2vw, 1.25rem)' }}
        >
          {PARTNERS.map((partner) => (
            <div key={partner.name} className="group flex flex-1 min-w-0 flex-col items-center">
              <Link
                href="/keskusest#partnerid"
                className="flex w-full aspect-square min-h-0 items-center justify-center rounded-xl border border-gray-200 bg-white shadow-md p-2 cursor-pointer transition-all duration-300 hover:shadow-lg hover:border-gray-300"
                aria-label={partner.name}
              >
                <img
                  src={partner.image}
                  alt={partner.name}
                  className="max-h-full max-w-full w-auto h-auto object-contain group-hover:opacity-80 transition-opacity duration-300"
                />
              </Link>
              <span className="mt-2 text-center text-xs text-gray-600 opacity-0 transition-opacity duration-200 group-hover:opacity-100">
                {partner.name}
              </span>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
