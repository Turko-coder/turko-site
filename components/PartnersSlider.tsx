'use client'

import Link from 'next/link'

interface Partner {
  name: string
  image: string
  url?: string
}

export default function PartnersSlider() {
  // Partners data with images from assets
  const partners: Partner[] = [
    {
      name: 'Eesti Politsei- ja Päästeamet',
      image: '/partners/politsei.png',
      // url: 'https://www.politsei.ee', // Add URL later
    },
    {
      name: 'Päästeamet',
      image: '/partners/paasteamet.png',
      // url: 'https://example.com',
    },
    {
      name: 'Tallinn',
      image: '/partners/tallinn.png',
      // url: 'https://www.tallinn.ee',
    },
    {
      name: 'TPSC',
      image: '/partners/tpsc.png',
      // url: 'https://example.com',
    },
    {
      name: 'Taifu',
      image: '/partners/taifu.png',
      // url: 'https://example.com',
    },
    {
      name: 'Autosoit',
      image: '/partners/autosoit.png',
      // url: 'https://example.com',
    },
    {
      name: 'Etel',
      image: '/partners/etel.png',
      // url: 'https://example.com',
    },
  ]

  // Create enough duplicates for seamless infinite scroll (at least 3 sets)
  const duplicatedPartners = [...partners, ...partners, ...partners, ...partners]

  const PartnerBlock = ({ partner, index }: { partner: Partner; index: number }) => {
    const content = (
      <div className="flex flex-col items-center justify-center min-w-[280px] h-[180px] bg-white rounded-xl shadow-sm border border-gray-200 hover:shadow-lg hover:border-primary-300 transition-all duration-300 p-6 group cursor-pointer flex-shrink-0">
        <div className="mb-4 h-20 w-full flex items-center justify-center">
          <img
            src={partner.image}
            alt={partner.name}
            className="max-h-20 max-w-[200px] object-contain group-hover:scale-105 transition-transform duration-300"
          />
        </div>
        <p className="text-sm font-semibold text-gray-700 text-center group-hover:text-primary-600 transition-colors line-clamp-2">
          {partner.name}
        </p>
      </div>
    )

    if (partner.url) {
      return (
        <Link href={partner.url} target="_blank" rel="noopener noreferrer">
          {content}
        </Link>
      )
    }

    return content
  }

  return (
    <div className="relative overflow-hidden bg-gray-50 py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-3xl md:text-4xl font-bold text-center mb-12 text-gray-900">
          Meie partnerid
        </h2>
        <div className="relative overflow-hidden">
          <div className="flex animate-scroll-infinite space-x-6">
            {duplicatedPartners.map((partner, index) => (
              <PartnerBlock key={`${partner.name}-${index}`} partner={partner} index={index} />
            ))}
          </div>
        </div>
      </div>
      <style jsx>{`
        @keyframes scroll-infinite {
          0% {
            transform: translateX(0);
          }
          100% {
            transform: translateX(-25%);
          }
        }
        .animate-scroll-infinite {
          animation: scroll-infinite 40s linear infinite;
          will-change: transform;
        }
        .animate-scroll-infinite:hover {
          animation-play-state: paused;
        }
      `}</style>
    </div>
  )
}
