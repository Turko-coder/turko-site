'use client'

import { useEffect, useRef, useState } from 'react'
import Image from 'next/image'
import { useTranslations } from 'next-intl'
import { Link } from '@/i18n/navigation'
import { ValvetootajaIllustration } from '@/components/illustrations/ValvetootajaIllustration'
import { TurvatootajaIllustration } from '@/components/illustrations/TurvatootajaIllustration'
import { TurvajuhtIllustration } from '@/components/illustrations/TurvajuhtIllustration'

const OPPEKLASSID_IMAGES = [
  '/Õppeklassid/11.jpg',
  '/Õppeklassid/3931-1024x768.jpg',
  '/Õppeklassid/22.jpg',
  '/Õppeklassid/33.jpg',
]

export default function Koolitus() {
  const t = useTranslations('training')
  const tNav = useTranslations('nav')
  const tCourses = useTranslations('courses')
  const [carouselIndex, setCarouselIndex] = useState(0)
  const carouselRef = useRef<HTMLDivElement | null>(null)
  const totalSlides = OPPEKLASSID_IMAGES.length

  const scrollToSlide = (index: number) => {
    const container = carouselRef.current
    if (!container) return
    container.scrollTo({
      left: index * container.clientWidth,
      behavior: 'smooth',
    })
    setCarouselIndex(index)
  }

  useEffect(() => {
    if (typeof window === 'undefined') return
    if (window.location.hash !== '#kuidas-ope-heading') return
    const id = 'kuidas-ope-heading'
    const run = () => document.getElementById(id)?.scrollIntoView({ behavior: 'smooth', block: 'start' })
    requestAnimationFrame(() => requestAnimationFrame(run))
  }, [])

  return (
  <div className="min-h-screen bg-white">
      <div className="mx-auto max-w-[44rem] page-gutter-x py-16">
        {/* 1. Вводный блок */}
        <div className="mb-9 text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-4 text-gray-900">{t('title')}</h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto leading-relaxed">
            {t('subtitle')}
          </p>
        </div>

        {/* 2. Õppeastmed */}
        <section className="mb-9 md:mb-12" aria-labelledby="oppeastmed-heading">
          <div className="mb-8">
            <h2 id="oppeastmed-heading" className="text-2xl font-bold mb-4 text-gray-900">{t('levelsTitle')}</h2>
            <p className="text-gray-600 leading-relaxed mb-0">
              {t('levelsIntro')}
            </p>
          </div>

          {/* Valvetöötaja */}
          <div className="rounded-xl bg-gradient-to-b from-course-guard-600 to-course-guard-700 shadow-sm p-6 md:p-8 mb-6">
            <div className="flex flex-wrap items-center gap-3 mb-3">
              <div className="flex-shrink-0 w-10 h-10 text-white" aria-hidden>
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-full h-full">
                  <path d="M12 15a3 3 0 1 0 0-6 3 3 0 0 0 0 6Z" />
                  <path fillRule="evenodd" d="M1.323 11.447C2.811 6.976 7.028 3.75 12.001 3.75c4.97 0 9.185 3.223 10.675 7.69.12.362.12.752 0 1.113-1.487 4.471-5.705 7.697-10.677 7.697-4.97 0-9.186-3.223-10.675-7.69a1.762 1.762 0 0 1 0-1.113ZM17.25 12a5.25 5.25 0 1 1-10.5 0 5.25 5.25 0 0 1 10.5 0Z" clipRule="evenodd" />
                </svg>
              </div>
              <h3 className="text-xl font-bold text-white">{tNav('guard')}</h3>
            </div>
            <div className="text-white/80 leading-relaxed">
              <p className="mb-0">{t('guardP1')}</p>
              <div className="my-5 flex w-full justify-center rounded-xl bg-white p-4 shadow-sm sm:my-6">
                <ValvetootajaIllustration />
              </div>
              <p className="mb-0">{t('guardP2')}</p>
            </div>
            <Link
              href="/kursused/valvetootaja"
              className="btn-press mt-4 inline-flex w-full items-center justify-center rounded-lg bg-white px-6 py-3 text-center font-semibold text-course-guard-600 shadow-sm transition-colors hover:bg-gray-100 sm:w-fit"
            >
              {tCourses('readMore')}
            </Link>
          </div>

          {/* Turvatöötaja */}
          <div className="rounded-xl bg-gradient-to-b from-course-security-600 to-course-security-700 shadow-sm p-6 md:p-8 mb-6">
            <div className="flex flex-wrap items-center gap-3 mb-3">
              <div className="flex-shrink-0 w-10 h-10 text-white" aria-hidden>
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-full h-full">
                  <path fillRule="evenodd" d="M11.484 2.17a.75.75 0 0 1 1.032 0 11.209 11.209 0 0 0 7.877 3.08.75.75 0 0 1 .722.515 12.74 12.74 0 0 1 .635 3.985c0 5.942-4.064 10.933-9.563 12.348a.749.749 0 0 1-.374 0C6.314 20.683 2.25 15.692 2.25 9.75c0-1.39.223-2.73.635-3.985a.75.75 0 0 1 .722-.516l.143.001c2.996 0 5.718-1.17 7.734-3.08ZM12 8.25a.75.75 0 0 1 .75.75v3.75a.75.75 0 0 1-1.5 0V9a.75.75 0 0 1 .75-.75ZM12 15a.75.75 0 0 0-.75.75v.008c0 .414.336.75.75.75h.008a.75.75 0 0 0 .75-.75v-.008a.75.75 0 0 0-.75-.75H12Z" clipRule="evenodd" />
                </svg>
              </div>
              <h3 className="text-xl font-bold text-white">{tNav('security')}</h3>
            </div>
            <div className="text-white/80 leading-relaxed">
              <p className="mb-0">{t('securityP1')}</p>
              <div className="my-5 flex w-full justify-center rounded-xl bg-white p-4 shadow-sm sm:my-6">
                <TurvatootajaIllustration />
              </div>
              <p className="mb-0">{t('securityP2')}</p>
            </div>
            <Link
              href="/kursused/turvatootaja"
              className="btn-press mt-4 inline-flex w-full items-center justify-center rounded-lg bg-white px-6 py-3 text-center font-semibold text-course-security-600 shadow-sm transition-colors hover:bg-gray-100 sm:w-fit"
            >
              {tCourses('readMore')}
            </Link>
          </div>

          {/* Turvajuht */}
          <div className="rounded-xl bg-gradient-to-b from-course-lead-600 to-course-lead-800 shadow-sm p-6 md:p-8">
            <div className="flex flex-wrap items-center gap-3 mb-3">
              <div className="flex-shrink-0 w-10 h-10 text-white" aria-hidden>
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-full h-full">
                  <path fillRule="evenodd" d="M12 2.25a.75.75 0 0 1 .75.75v.756a49.106 49.106 0 0 1 9.152 1 .75.75 0 0 1-.152 1.485h-1.918l2.474 10.124a.75.75 0 0 1-.375.84A6.723 6.723 0 0 1 18.75 18a6.723 6.723 0 0 1-3.181-.795.75.75 0 0 1-.375-.84l2.474-10.124H12.75v13.28c1.293.076 2.534.343 3.697.776a.75.75 0 0 1-.262 1.453h-8.37a.75.75 0 0 1-.262-1.453c1.162-.433 2.404-.7 3.697-.775V6.24H6.332l2.474 10.124a.75.75 0 0 1-.375.84A6.723 6.723 0 0 1 5.25 18a6.723 6.723 0 0 1-3.181-.795.75.75 0 0 1-.375-.84L4.168 6.241H2.25a.75.75 0 0 1-.152-1.485 49.105 49.105 0 0 1 9.152-1V3a.75.75 0 0 1 .75-.75Zm4.878 13.543 1.872-7.662 1.872 7.662h-3.744Zm-9.756 0L5.25 8.131l-1.872 7.662h3.744Z" clipRule="evenodd" />
                </svg>
              </div>
              <h3 className="text-xl font-bold text-white">{tCourses('securityLead.title')}</h3>
            </div>
            <div className="text-white/80 leading-relaxed">
              <p className="mb-0">{t('leadP1')}</p>
              <div className="my-5 flex w-full justify-center rounded-xl bg-white p-4 shadow-sm sm:my-6">
                <TurvajuhtIllustration />
              </div>
              <p className="mb-0">{t('leadP2')}</p>
            </div>
            <Link
              href="/kursused/turvajuht"
              className="btn-press mt-4 inline-flex w-full items-center justify-center rounded-lg bg-white px-6 py-3 text-center font-semibold text-course-lead-600 shadow-sm transition-colors hover:bg-gray-100 sm:w-fit"
            >
              {tCourses('readMore')}
            </Link>
          </div>
        </section>

        {/* 3. Kuidas õpe toimub */}
        <section className="mb-9 md:mb-12" aria-labelledby="kuidas-ope-heading">
          <h2
            id="kuidas-ope-heading"
            className="scroll-mt-24 text-2xl font-bold mb-9 text-gray-900 md:mb-10 md:scroll-mt-28"
          >
            {t('howItWorks')}
          </h2>
          <ul className="space-y-6 md:space-y-8">
            {[
              { title: t('step1Title'), description: t('step1Desc') },
              { title: t('step2Title'), description: t('step2Desc') },
              { title: t('step3Title'), description: t('step3Desc') },
              { title: t('step4Title'), description: t('step4Desc') },
              { title: t('step5Title'), description: t('step5Desc') },
              { title: t('step6Title'), description: t('step6Desc') },
            ].map((step, index, arr) => {
              const isLast = index === arr.length - 1
              return (
              <li key={index} className="flex items-start gap-[1rem]">
                <div className="relative mt-4 flex w-12 shrink-0 flex-col items-center self-stretch sm:w-14">
                  <div
                    className="relative z-10 flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-primary-600 text-base font-bold text-white shadow-sm sm:h-14 sm:w-14 sm:text-lg"
                    style={{ fontFamily: 'var(--font-manrope), sans-serif' }}
                    aria-hidden
                  >
                    {index + 1}
                  </div>
                  {!isLast && (
                    <div
                      className="pointer-events-none absolute bottom-[-2.5rem] left-1/2 top-12 z-0 flex w-[2px] -translate-x-1/2 justify-center sm:top-14 md:bottom-[-3rem]"
                      aria-hidden
                    >
                      <svg
                        width={2}
                        height="100%"
                        className="block min-h-[1rem] text-gray-200"
                      >
                        <line
                          x1={1}
                          y1={0}
                          x2={1}
                          y2="100%"
                          stroke="currentColor"
                          strokeWidth={1.5}
                          strokeDasharray="10 14"
                          strokeLinecap="round"
                          vectorEffect="nonScalingStroke"
                        />
                      </svg>
                    </div>
                  )}
                </div>
                <div className="min-w-0 flex-1 rounded-xl border border-gray-200 bg-white p-6 shadow-sm md:p-8">
                  <h3 className="mb-1.5 text-lg font-bold text-gray-900">{step.title}</h3>
                  <p className="leading-relaxed text-gray-600">{step.description}</p>
                </div>
              </li>
              )
            })}
          </ul>
        </section>

        {/* 4. Õppekeskkond */}
        <section className="mb-9 md:mb-12" aria-labelledby="oppekeskkond-heading">
          <h2 id="oppekeskkond-heading" className="text-2xl font-bold mb-8 text-gray-900">
            {t('environmentTitle')}
          </h2>

          {/* Block 1: Õppeklassid / Учебные помещения */}
          <h3 className="text-lg font-bold mb-3 text-gray-900">{t('envPremisesTitle')}</h3>
          <p className="mb-3 leading-relaxed text-gray-600">
            {t.rich('envPremisesP1', {
              addressLink: (chunks) => (
                <Link
                  href="/kontaktid?city=tallinn"
                  className="font-medium text-primary-600 hover:underline"
                >
                  {chunks}
                </Link>
              ),
            })}
          </p>
          <p className="mb-6 leading-relaxed text-gray-600">{t('envPremisesP2')}</p>

          {/* Photo carousel */}
          <div className="w-full min-w-0 mb-6">
            <div
              ref={carouselRef}
              className="flex overflow-x-auto snap-x snap-mandatory scroll-smooth [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
              onScroll={(event) => {
                const container = event.currentTarget
                const slideWidth = container.clientWidth
                if (!slideWidth) return
                const index = Math.round(container.scrollLeft / slideWidth)
                if (index !== carouselIndex) setCarouselIndex(index)
              }}
              aria-label={t('galleryLabel')}
            >
              {OPPEKLASSID_IMAGES.map((imageSrc, index) => (
                <div key={imageSrc} className="w-full shrink-0 snap-center">
                  <div className="flex h-[280px] w-full items-center justify-center overflow-hidden rounded-lg bg-white sm:h-[340px] md:h-[420px]">
                    <img
                      src={imageSrc}
                      alt={t('classroomAlt', { n: index + 1 })}
                      className="h-auto max-h-full w-auto max-w-full rounded-xl"
                    />
                  </div>
                </div>
              ))}
            </div>
            <div className="mt-6 flex items-center justify-center gap-2" role="tablist" aria-label={t('photoLabel')}>
              {Array.from({ length: totalSlides }).map((_, index) => (
                <button
                  key={index}
                  type="button"
                  onClick={() => scrollToSlide(index)}
                  aria-label={t('goToPhoto', { n: index + 1 })}
                  aria-current={carouselIndex === index}
                  className={`h-2.5 rounded-full transition-all ${
                    carouselIndex === index ? 'w-7 bg-primary-600' : 'w-2.5 bg-gray-300 hover:bg-gray-400'
                  }`}
                />
              ))}
            </div>
          </div>

          <p className="mb-4 leading-relaxed text-gray-600">{t('envEquipmentP1')}</p>
          <p className="mb-4 leading-relaxed text-gray-600">{t('envCateringP1')}</p>
          <p className="mb-5 leading-relaxed text-gray-600">{t('envTransportP1')}</p>
          <div className="mb-10 overflow-hidden rounded-xl border border-gray-200 shadow-sm">
            <Image
              src="/Illustarations/Turko_map.jpg"
              alt="Turko õppekeskuse kaart / Карта учебного центра Turko"
              width={1200}
              height={800}
              className="w-full h-auto"
              quality={75}
            />
          </div>

          {/* Block 2: Õppevorm / Формат обучения */}
          <h3 className="text-lg font-bold mb-3 text-gray-900">{t('envFormatTitle')}</h3>
          <p className="mb-4 leading-relaxed text-gray-600">{t('envGroupsP1')}</p>
          <p className="leading-relaxed text-gray-600">{t('envOnlineP1')}</p>
        </section>

      </div>
    </div>
  )
}
