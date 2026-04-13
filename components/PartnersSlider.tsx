'use client'

import { Link } from '@/i18n/navigation'
import { useTranslations } from 'next-intl'
import SectionOverlineHeading from '@/components/SectionOverlineHeading'

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

/** Muted grayscale; lg+ hover — same grayscale, brighter & higher contrast (contrast ≤ 1). */
const partnerLogoClass =
  'w-auto max-w-full object-contain opacity-[0.72] [filter:grayscale(1)_brightness(0.88)_contrast(0.95)] lg:transition-[opacity,filter] lg:duration-300 lg:ease-out lg:group-hover:opacity-100 lg:group-hover:[filter:grayscale(1)_brightness(1)_contrast(1)]'

export default function PartnersSlider() {
  const t = useTranslations('home')
  return (
    <section className="bg-white pt-16 pb-4">
      <div className="mx-auto max-w-[48rem] page-gutter-x">
        <SectionOverlineHeading className="mb-8">{t('partnersTitle')}</SectionOverlineHeading>

        <div
          className="flex flex-wrap justify-center gap-x-4 gap-y-4 sm:flex-nowrap sm:items-center sm:justify-center sm:gap-x-2 md:gap-x-3 lg:gap-x-4"
          aria-label={t('partnersTitle')}
        >
          {PARTNERS.map((partner) => (
            <Link
              key={partner.name}
              href="/keskusest#partnerid"
              className="group flex shrink-0 items-center justify-center px-1 py-0.5 transition-opacity active:opacity-60 sm:min-w-0 sm:flex-1 sm:basis-0"
              aria-label={partner.name}
            >
              <img
                src={partner.image}
                alt=""
                className={`${partnerLogoClass} max-h-14 max-w-[10.5rem] sm:max-h-[4rem] sm:max-w-none md:max-h-[4.5rem] lg:max-h-20 xl:max-h-[5.25rem]`}
              />
            </Link>
          ))}
        </div>
      </div>
    </section>
  )
}
