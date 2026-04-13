'use client'

import { useState, useEffect, useRef } from 'react'
import { Link } from '@/i18n/navigation'
import { useRouter } from '@/i18n/navigation'
import { useLocale, useTranslations } from 'next-intl'
import HomeCoursePathCard from '@/components/HomeCoursePathCard'
import HomeScrollLiftComfortCards from '@/components/HomeScrollLiftComfortCards'
import HomeScrollLiftSteps from '@/components/HomeScrollLiftSteps'
import PartnersSlider from '@/components/PartnersSlider'
import SectionOverlineHeading from '@/components/SectionOverlineHeading'
import EstoniaMap from '@/components/EstoniaMap'

const CITY_LABEL_FADEOUT_MS = 500

type CityHoverSource = 'hover' | 'auto'

type CityHoverPayload = {
  name: string
  source: CityHoverSource
} | null

type CoursePathHover = 'guard' | 'security' | 'lead' | null

function coursePathGradientFrom(hover: CoursePathHover): string {
  switch (hover) {
    case 'guard':
      return 'from-course-guard-100'
    case 'security':
      return 'from-course-security-100'
    case 'lead':
      return 'from-course-lead-100'
    default:
      return 'from-primary-50'
  }
}

export default function Home() {
  const locale = useLocale()
  const isRu = locale === 'ru'
  const t = useTranslations('home')
  const router = useRouter()
  const [mapHoveredCity, setMapHoveredCity] = useState<CityHoverPayload>(null)
  const [displayedCity, setDisplayedCity] = useState<string | null>(null)
  const [isCityLabelExiting, setIsCityLabelExiting] = useState(false)
  const [cityLabelSource, setCityLabelSource] = useState<CityHoverSource | null>(null)
  const [coursePathHover, setCoursePathHover] = useState<CoursePathHover>(null)
  const exitTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null)

  useEffect(() => {
    const nextName = mapHoveredCity?.name ?? null

    if (nextName === displayedCity && !isCityLabelExiting) return
    if (exitTimeoutRef.current) {
      clearTimeout(exitTimeoutRef.current)
      exitTimeoutRef.current = null
    }

    // Если уже был текст и приходит новый
    if (displayedCity != null && nextName !== displayedCity) {
      // При наведении не анимируем fadeOut/fadeIn, просто меняем текст
      if (mapHoveredCity?.source === 'hover') {
        setDisplayedCity(nextName)
        setCityLabelSource('hover')
        setIsCityLabelExiting(false)
      } else {
        // Автоматическое мерцание — делаем fadeOut старого и fadeIn нового
        setIsCityLabelExiting(true)
        exitTimeoutRef.current = setTimeout(() => {
          exitTimeoutRef.current = null
          setDisplayedCity(nextName)
          setCityLabelSource(nextName ? 'auto' : null)
          setIsCityLabelExiting(false)
        }, CITY_LABEL_FADEOUT_MS)
      }
    } else {
      // Первое появление или возвращаемся к тому же названию
      setDisplayedCity(nextName)
      setCityLabelSource(nextName ? mapHoveredCity?.source ?? null : null)
      setIsCityLabelExiting(false)
    }

    return () => {
      if (exitTimeoutRef.current) clearTimeout(exitTimeoutRef.current)
    }
  }, [mapHoveredCity, displayedCity, isCityLabelExiting])

  const handleMapCityClick = (cityName: string) => {
    const cityId = cityName.toLowerCase()
    router.push(`/kontaktid?city=${cityId}`)
  }

  const handleCityLabelEnter = () => {
    if (!displayedCity) return
    setMapHoveredCity({ name: displayedCity, source: 'hover' })
  }

  const handleCityLabelLeave = () => {
    setMapHoveredCity(null)
  }

  const handleCityLabelClick = () => {
    if (!displayedCity) return
    handleMapCityClick(displayedCity)
  }

  const cityHeadingLabel =
    displayedCity != null || isCityLabelExiting ? (
      <span
        key={isCityLabelExiting ? 'exiting' : displayedCity ?? ''}
        className={`font-bold text-primary-600 ${
          isCityLabelExiting
            ? 'animate-fade-out'
            : cityLabelSource === 'hover'
              ? ''
              : 'animate-fade-in'
        } cursor-pointer`}
        style={{
          fontFamily: 'var(--font-manrope), Manrope, sans-serif',
          animationDuration: '0.5s',
        }}
        onMouseEnter={handleCityLabelEnter}
        onMouseLeave={handleCityLabelLeave}
        onClick={handleCityLabelClick}
      >
        {displayedCity}
      </span>
    ) : null

  return (
    <div className="min-h-screen bg-white">
      {/* 1. Hero */}
      <section className="bg-white">
        <div className="relative z-10 max-w-[48rem] mx-auto page-gutter-x pt-16 pb-24">
          <div className="text-center max-w-4xl mx-auto">
            <h1
              className="font-bold text-gray-900 text-center mb-8"
              style={{ fontSize: '3.6rem', lineHeight: '3.9rem', letterSpacing: '-0.02em' }}
            >
              {isRu ? (
                <>
                  <span className="block min-[551px]:hidden">
                    {t('heroTitleXs1')}
                    <br />
                    {t('heroTitleXs2')}
                    <br />
                    {t('heroTitleXs3')}
                    <br />
                    {t('heroTitleXs4')}
                  </span>
                  <span className="hidden min-[551px]:block">
                    {t('heroTitleMobile1')}
                    <br />
                    {t('heroTitleMobile2')}
                    {t('heroTitleMobile3') ? (
                      <>
                        <br />
                        {t('heroTitleMobile3')}
                      </>
                    ) : null}
                  </span>
                </>
              ) : (
                <>
                  <span className="block min-[500px]:hidden md:hidden">
                    {t('heroTitleXs1')}
                    <br />
                    {t('heroTitleXs2')}
                    <br />
                    {t('heroTitleXs3')}
                    <br />
                    {t('heroTitleXs4')}
                  </span>
                  <span className="hidden min-[500px]:block md:hidden">
                    {t('heroTitleMobile1')}
                    <br />
                    {t('heroTitleMobile2')}
                    {t('heroTitleMobile3') ? (
                      <>
                        <br />
                        {t('heroTitleMobile3')}
                      </>
                    ) : null}
                  </span>
                  <span className="hidden md:inline">{t('heroTitle')}</span>
                </>
              )}
            </h1>
            <p className="text-xl md:text-2xl text-gray-600 mb-8 leading-relaxed">
              {t('heroSubtitle')}
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                href="/kursused/koolitus"
                className="btn-press inline-flex items-center justify-center px-8 py-4 bg-white border border-gray-200 shadow-sm hover:shadow-lg text-gray-700 rounded-lg font-semibold transition-all duration-300 cursor-pointer text-center text-primary-600"
              >
                {t('viewCourses')}
              </Link>
              <Link
                href="/registreerimine"
                className="btn-press inline-flex items-center justify-center px-8 py-4 bg-primary-600 text-white rounded-lg font-semibold shadow-sm hover:bg-primary-700 transition-all duration-300 hover:shadow-lg cursor-pointer text-center"
              >
                {t('register')}
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Õppeastmed (level cards) — Vali endale sobiv tee */}
      <section className="relative overflow-hidden bg-white">
        <div
          className={`pointer-events-none absolute inset-x-0 top-0 z-0 h-[min(50%,18rem)] bg-gradient-to-b to-transparent transition-colors duration-300 ease-out ${coursePathGradientFrom(coursePathHover)}`}
          aria-hidden
        />
        <div
          className={`pointer-events-none absolute inset-x-0 bottom-0 z-0 h-[min(50%,18rem)] bg-gradient-to-t to-transparent transition-colors duration-300 ease-out ${coursePathGradientFrom(coursePathHover)}`}
          aria-hidden
        />
        <div className="relative z-10 max-w-[48rem] mx-auto page-gutter-x py-16">
          <h2
            className="font-semibold text-gray-900 text-center mb-10"
            style={{ fontSize: '2.5rem', lineHeight: '3rem' }}
          >
            {t('chooseYourPath')}
          </h2>
          <div
            className="grid grid-cols-1 md:grid-cols-3 gap-4"
            onMouseLeave={() => setCoursePathHover(null)}
          >
            <HomeCoursePathCard
              href="/kursused/valvetootaja"
              kind="guard"
              onHoverEnter={() => setCoursePathHover('guard')}
              carouselLabel={t('coursePathCardSwipe')}
              dotLabel={(i) => t('coursePathCardGoSlide', { n: i + 1 })}
              front={
                <>
                  <div className="mb-4 flex h-[10rem] w-[10rem] items-center justify-center rounded-full bg-white">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 24 24"
                      fill="currentColor"
                      className="size-[6.5rem] text-course-guard-600"
                      aria-hidden
                    >
                      <path d="M12 15a3 3 0 1 0 0-6 3 3 0 0 0 0 6Z" />
                      <path fillRule="evenodd" d="M1.323 11.447C2.811 6.976 7.028 3.75 12.001 3.75c4.97 0 9.185 3.223 10.675 7.69.12.362.12.752 0 1.113-1.487 4.471-5.705 7.697-10.677 7.697-4.97 0-9.186-3.223-10.675-7.69a1.762 1.762 0 0 1 0-1.113ZM17.25 12a5.25 5.25 0 1 1-10.5 0 5.25 5.25 0 0 1 10.5 0Z" clipRule="evenodd" />
                    </svg>
                  </div>
                  <h3 className="mb-0 whitespace-pre-line text-center text-2xl font-bold leading-snug text-white">
                    {t('guard')}
                  </h3>
                </>
              }
              back={
                <>
                  <div
                    className="my-[30px] flex w-max shrink-0 flex-col items-center gap-4 text-sm font-semibold"
                    style={{ fontFamily: 'var(--font-inter), Inter, sans-serif' }}
                  >
                    <span className="inline-flex w-full items-center justify-center gap-[0.2rem] rounded-lg bg-course-guard-100 py-1.5 pl-3 pr-4 text-course-guard-600">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 24 24"
                        fill="currentColor"
                        className="size-4 shrink-0 text-course-guard-600"
                        aria-hidden
                      >
                        <path
                          fillRule="evenodd"
                          d="M7.502 6h7.128A3.375 3.375 0 0 1 18 9.375v9.375a3 3 0 0 0 3-3V6.108c0-1.505-1.125-2.811-2.664-2.94a48.972 48.972 0 0 0-.673-.05A3 3 0 0 0 15 1.5h-1.5a3 3 0 0 0-2.663 1.618c-.225.015-.45.032-.673.05C8.662 3.295 7.554 4.542 7.502 6ZM13.5 3A1.5 1.5 0 0 0 12 4.5h4.5A1.5 1.5 0 0 0 15 3h-1.5Z"
                          clipRule="evenodd"
                        />
                        <path
                          fillRule="evenodd"
                          d="M3 9.375C3 8.339 3.84 7.5 4.875 7.5h9.75c1.036 0 1.875.84 1.875 1.875v11.25c0 1.035-.84 1.875-1.875 1.875h-9.75A1.875 1.875 0 0 1 3 20.625V9.375Zm9.586 4.594a.75.75 0 0 0-1.172-.938l-2.476 3.096-.908-.907a.75.75 0 1 0-1.06 1.06l1.5 1.5a.75.75 0 0 0 1.116-.062l3-3.75Z"
                          clipRule="evenodd"
                        />
                      </svg>
                      <span>{t('monitoring')}</span>
                    </span>
                    <span className="inline-flex w-full items-center justify-center gap-[0.2rem] rounded-lg bg-course-guard-100 py-1.5 pl-3 pr-4 text-course-guard-600">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 24 24"
                        fill="currentColor"
                        className="size-4 shrink-0 text-course-guard-600"
                        aria-hidden
                      >
                        <path d="M18.375 2.25c-1.035 0-1.875.84-1.875 1.875v15.75c0 1.035.84 1.875 1.875 1.875h.75c1.035 0 1.875-.84 1.875-1.875V4.125c0-1.036-.84-1.875-1.875-1.875h-.75ZM9.75 8.625c0-1.036.84-1.875 1.875-1.875h.75c1.036 0 1.875.84 1.875 1.875v11.25c0 1.035-.84 1.875-1.875 1.875h-.75a1.875 1.875 0 0 1-1.875-1.875V8.625ZM3 13.125c0-1.036.84-1.875 1.875-1.875h.75c1.036 0 1.875.84 1.875 1.875v6.75c0 1.035-.84 1.875-1.875 1.875h-.75A1.875 1.875 0 0 1 3 19.875v-6.75Z" />
                      </svg>
                      <span>Tase 3</span>
                    </span>
                    <span className="inline-flex w-full items-center justify-center gap-[0.2rem] rounded-lg bg-course-guard-100 py-1.5 pl-3 pr-4 text-course-guard-600">
                      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="size-4 shrink-0 text-course-guard-600" aria-hidden>
                        <path strokeLinecap="round" strokeLinejoin="round" d="m10.5 21 5.25-11.25L21 21m-9-3h7.5M3 5.621a48.474 48.474 0 0 1 6-.371m0 0c1.12 0 2.233.038 3.334.114M9 5.25V3m3.334 2.364C11.176 10.658 7.69 15.08 3 17.502m9.334-12.138c.896.061 1.785.147 2.666.257m-4.589 8.495a18.023 18.023 0 0 1-3.827-5.802" />
                      </svg>
                      <span>A2</span>
                    </span>
                    <span className="inline-flex w-full items-center justify-center gap-[0.2rem] rounded-lg bg-course-guard-100 py-1.5 pl-3 pr-4 text-course-guard-600">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 24 24"
                        fill="currentColor"
                        className="size-4 shrink-0 text-course-guard-600"
                        aria-hidden
                      >
                        <path
                          fillRule="evenodd"
                          d="M12 2.25a9.75 9.75 0 1 0 9.75 9.75A9.76 9.76 0 0 0 12 2.25Zm.75 4.5a.75.75 0 0 0-1.5 0v4.38c0 .298.177.568.45.687l3.5 1.556a.75.75 0 1 0 .6-1.374l-3.05-1.357Z"
                          clipRule="evenodd"
                        />
                      </svg>
                      <span>84h</span>
                    </span>
                  </div>
                  <div className="flex items-center justify-center gap-2">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 24 24"
                      fill="currentColor"
                      className="size-[2.4rem] shrink-0 text-course-guard-600"
                      aria-hidden
                    >
                      <path d="M12 15a3 3 0 1 0 0-6 3 3 0 0 0 0 6Z" />
                      <path fillRule="evenodd" d="M1.323 11.447C2.811 6.976 7.028 3.75 12.001 3.75c4.97 0 9.185 3.223 10.675 7.69.12.362.12.752 0 1.113-1.487 4.471-5.705 7.697-10.677 7.697-4.97 0-9.186-3.223-10.675-7.69a1.762 1.762 0 0 1 0-1.113ZM17.25 12a5.25 5.25 0 1 1-10.5 0 5.25 5.25 0 0 1 10.5 0Z" clipRule="evenodd" />
                    </svg>
                    <h3 className="mb-0 whitespace-pre-line text-[1.2rem] font-bold leading-snug text-course-guard-600 md:transition-colors md:duration-300 md:group-hover:text-course-guard-600">
                      {t('guard')}
                    </h3>
                  </div>
                </>
              }
            />
            <HomeCoursePathCard
              href="/kursused/turvatootaja"
              kind="security"
              onHoverEnter={() => setCoursePathHover('security')}
              carouselLabel={t('coursePathCardSwipe')}
              dotLabel={(i) => t('coursePathCardGoSlide', { n: i + 1 })}
              front={
                <>
                  <div className="mb-4 flex h-[10rem] w-[10rem] items-center justify-center rounded-full bg-white">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 24 24"
                      fill="currentColor"
                      className="size-[6.5rem] text-course-security-600"
                      aria-hidden
                    >
                      <path fillRule="evenodd" d="M11.484 2.17a.75.75 0 0 1 1.032 0 11.209 11.209 0 0 0 7.877 3.08.75.75 0 0 1 .722.515 12.74 12.74 0 0 1 .635 3.985c0 5.942-4.064 10.933-9.563 12.348a.749.749 0 0 1-.374 0C6.314 20.683 2.25 15.692 2.25 9.75c0-1.39.223-2.73.635-3.985a.75.75 0 0 1 .722-.516l.143.001c2.996 0 5.718-1.17 7.734-3.08ZM12 8.25a.75.75 0 0 1 .75.75v3.75a.75.75 0 0 1-1.5 0V9a.75.75 0 0 1 .75-.75ZM12 15a.75.75 0 0 0-.75.75v.008c0 .414.336.75.75.75h.008a.75.75 0 0 0 .75-.75v-.008a.75.75 0 0 0-.75-.75H12Z" clipRule="evenodd" />
                    </svg>
                  </div>
                  <h3 className="mb-0 whitespace-pre-line text-center text-2xl font-bold leading-snug text-white">
                    {t('security')}
                  </h3>
                </>
              }
              back={
                <>
                  <div
                    className="relative z-10 my-[30px] flex w-max shrink-0 flex-col items-center gap-4 text-sm font-semibold"
                    style={{ fontFamily: 'var(--font-inter), Inter, sans-serif' }}
                  >
                    <span className="inline-flex w-full items-center justify-center gap-[0.2rem] rounded-lg bg-course-security-100 py-1.5 pl-3 pr-4 text-course-security-600">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 24 24"
                        fill="currentColor"
                        className="size-4 shrink-0 text-course-security-600"
                        aria-hidden
                      >
                        <path
                          fillRule="evenodd"
                          d="M7.502 6h7.128A3.375 3.375 0 0 1 18 9.375v9.375a3 3 0 0 0 3-3V6.108c0-1.505-1.125-2.811-2.664-2.94a48.972 48.972 0 0 0-.673-.05A3 3 0 0 0 15 1.5h-1.5a3 3 0 0 0-2.663 1.618c-.225.015-.45.032-.673.05C8.662 3.295 7.554 4.542 7.502 6ZM13.5 3A1.5 1.5 0 0 0 12 4.5h4.5A1.5 1.5 0 0 0 15 3h-1.5Z"
                          clipRule="evenodd"
                        />
                        <path
                          fillRule="evenodd"
                          d="M3 9.375C3 8.339 3.84 7.5 4.875 7.5h9.75c1.036 0 1.875.84 1.875 1.875v11.25c0 1.035-.84 1.875-1.875 1.875h-9.75A1.875 1.875 0 0 1 3 20.625V9.375Zm9.586 4.594a.75.75 0 0 0-1.172-.938l-2.476 3.096-.908-.907a.75.75 0 1 0-1.06 1.06l1.5 1.5a.75.75 0 0 0 1.116-.062l3-3.75Z"
                          clipRule="evenodd"
                        />
                      </svg>
                      <span>{t('response')}</span>
                    </span>
                    <span className="inline-flex w-full items-center justify-center gap-[0.2rem] rounded-lg bg-course-security-100 py-1.5 pl-3 pr-4 text-course-security-600">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 24 24"
                        fill="currentColor"
                        className="size-4 shrink-0 text-course-security-600"
                        aria-hidden
                      >
                        <path d="M18.375 2.25c-1.035 0-1.875.84-1.875 1.875v15.75c0 1.035.84 1.875 1.875 1.875h.75c1.035 0 1.875-.84 1.875-1.875V4.125c0-1.036-.84-1.875-1.875-1.875h-.75ZM9.75 8.625c0-1.036.84-1.875 1.875-1.875h.75c1.036 0 1.875.84 1.875 1.875v11.25c0 1.035-.84 1.875-1.875 1.875h-.75a1.875 1.875 0 0 1-1.875-1.875V8.625ZM3 13.125c0-1.036.84-1.875 1.875-1.875h.75c1.036 0 1.875.84 1.875 1.875v6.75c0 1.035-.84 1.875-1.875 1.875h-.75A1.875 1.875 0 0 1 3 19.875v-6.75Z" />
                      </svg>
                      <span>Tase 4</span>
                    </span>
                    <span className="inline-flex w-full items-center justify-center gap-[0.2rem] rounded-lg bg-course-security-100 py-1.5 pl-3 pr-4 text-course-security-600">
                      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="size-4 shrink-0 text-course-security-600" aria-hidden>
                        <path strokeLinecap="round" strokeLinejoin="round" d="m10.5 21 5.25-11.25L21 21m-9-3h7.5M3 5.621a48.474 48.474 0 0 1 6-.371m0 0c1.12 0 2.233.038 3.334.114M9 5.25V3m3.334 2.364C11.176 10.658 7.69 15.08 3 17.502m9.334-12.138c.896.061 1.785.147 2.666.257m-4.589 8.495a18.023 18.023 0 0 1-3.827-5.802" />
                      </svg>
                      <span>B2</span>
                    </span>
                    <span className="inline-flex w-full items-center justify-center gap-[0.2rem] rounded-lg bg-course-security-100 py-1.5 pl-3 pr-4 text-course-security-600">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 24 24"
                        fill="currentColor"
                        className="size-4 shrink-0 text-course-security-600"
                        aria-hidden
                      >
                        <path
                          fillRule="evenodd"
                          d="M12 2.25a9.75 9.75 0 1 0 9.75 9.75A9.76 9.76 0 0 0 12 2.25Zm.75 4.5a.75.75 0 0 0-1.5 0v4.38c0 .298.177.568.45.687l3.5 1.556a.75.75 0 1 0 .6-1.374l-3.05-1.357Z"
                          clipRule="evenodd"
                        />
                      </svg>
                      <span>84h</span>
                    </span>
                  </div>
                  <div className="flex items-center justify-center gap-2">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 24 24"
                      fill="currentColor"
                      className="size-[2.4rem] shrink-0 text-course-security-600"
                      aria-hidden
                    >
                      <path fillRule="evenodd" d="M11.484 2.17a.75.75 0 0 1 1.032 0 11.209 11.209 0 0 0 7.877 3.08.75.75 0 0 1 .722.515 12.74 12.74 0 0 1 .635 3.985c0 5.942-4.064 10.933-9.563 12.348a.749.749 0 0 1-.374 0C6.314 20.683 2.25 15.692 2.25 9.75c0-1.39.223-2.73.635-3.985a.75.75 0 0 1 .722-.516l.143.001c2.996 0 5.718-1.17 7.734-3.08ZM12 8.25a.75.75 0 0 1 .75.75v3.75a.75.75 0 0 1-1.5 0V9a.75.75 0 0 1 .75-.75ZM12 15a.75.75 0 0 0-.75.75v.008c0 .414.336.75.75.75h.008a.75.75 0 0 0 .75-.75v-.008a.75.75 0 0 0-.75-.75H12Z" clipRule="evenodd" />
                    </svg>
                    <h3 className="mb-0 whitespace-pre-line text-[1.2rem] font-bold leading-snug text-course-security-600 md:transition-colors md:duration-300 md:group-hover:text-course-security-600">
                      {t('security')}
                    </h3>
                  </div>
                </>
              }
            />
            <HomeCoursePathCard
              href="/kursused/turvajuht"
              kind="lead"
              onHoverEnter={() => setCoursePathHover('lead')}
              carouselLabel={t('coursePathCardSwipe')}
              dotLabel={(i) => t('coursePathCardGoSlide', { n: i + 1 })}
              front={
                <>
                  <div className="mb-4 flex h-[10rem] w-[10rem] items-center justify-center rounded-full bg-white">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 24 24"
                      fill="currentColor"
                      className="size-[6.5rem] text-course-lead-600"
                      aria-hidden
                    >
                      <path fillRule="evenodd" d="M12 2.25a.75.75 0 0 1 .75.75v.756a49.106 49.106 0 0 1 9.152 1 .75.75 0 0 1-.152 1.485h-1.918l2.474 10.124a.75.75 0 0 1-.375.84A6.723 6.723 0 0 1 18.75 18a6.723 6.723 0 0 1-3.181-.795.75.75 0 0 1-.375-.84l2.474-10.124H12.75v13.28c1.293.076 2.534.343 3.697.776a.75.75 0 0 1-.262 1.453h-8.37a.75.75 0 0 1-.262-1.453c1.162-.433 2.404-.7 3.697-.775V6.24H6.332l2.474 10.124a.75.75 0 0 1-.375.84A6.723 6.723 0 0 1 5.25 18a6.723 6.723 0 0 1-3.181-.795.75.75 0 0 1-.375-.84L4.168 6.241H2.25a.75.75 0 0 1-.152-1.485 49.105 49.105 0 0 1 9.152-1V3a.75.75 0 0 1 .75-.75Zm4.878 13.543 1.872-7.662 1.872 7.662h-3.744Zm-9.756 0L5.25 8.131l-1.872 7.662h3.744Z" clipRule="evenodd" />
                    </svg>
                  </div>
                  <h3 className="mb-0 text-center text-2xl font-bold text-white">
                    {t('securityLead')}
                  </h3>
                </>
              }
              back={
                <>
                  <div
                    className="relative z-10 my-[30px] flex w-max shrink-0 flex-col items-center gap-4 text-sm font-semibold"
                    style={{ fontFamily: 'var(--font-inter), Inter, sans-serif' }}
                  >
                    <span className="inline-flex w-full items-center justify-center gap-[0.2rem] rounded-lg bg-course-lead-100 py-1.5 pl-3 pr-4 text-course-lead-600">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 24 24"
                        fill="currentColor"
                        className="size-4 shrink-0 text-course-lead-600"
                        aria-hidden
                      >
                        <path
                          fillRule="evenodd"
                          d="M7.502 6h7.128A3.375 3.375 0 0 1 18 9.375v9.375a3 3 0 0 0 3-3V6.108c0-1.505-1.125-2.811-2.664-2.94a48.972 48.972 0 0 0-.673-.05A3 3 0 0 0 15 1.5h-1.5a3 3 0 0 0-2.663 1.618c-.225.015-.45.032-.673.05C8.662 3.295 7.554 4.542 7.502 6ZM13.5 3A1.5 1.5 0 0 0 12 4.5h4.5A1.5 1.5 0 0 0 15 3h-1.5Z"
                          clipRule="evenodd"
                        />
                        <path
                          fillRule="evenodd"
                          d="M3 9.375C3 8.339 3.84 7.5 4.875 7.5h9.75c1.036 0 1.875.84 1.875 1.875v11.25c0 1.035-.84 1.875-1.875 1.875h-9.75A1.875 1.875 0 0 1 3 20.625V9.375Zm9.586 4.594a.75.75 0 0 0-1.172-.938l-2.476 3.096-.908-.907a.75.75 0 1 0-1.06 1.06l1.5 1.5a.75.75 0 0 0 1.116-.062l3-3.75Z"
                          clipRule="evenodd"
                        />
                      </svg>
                      <span>{t('management')}</span>
                    </span>
                    <span className="inline-flex w-full items-center justify-center gap-[0.2rem] rounded-lg bg-course-lead-100 py-1.5 pl-3 pr-4 text-course-lead-600">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 24 24"
                        fill="currentColor"
                        className="size-4 shrink-0 text-course-lead-600"
                        aria-hidden
                      >
                        <path d="M18.375 2.25c-1.035 0-1.875.84-1.875 1.875v15.75c0 1.035.84 1.875 1.875 1.875h.75c1.035 0 1.875-.84 1.875-1.875V4.125c0-1.036-.84-1.875-1.875-1.875h-.75ZM9.75 8.625c0-1.036.84-1.875 1.875-1.875h.75c1.036 0 1.875.84 1.875 1.875v11.25c0 1.035-.84 1.875-1.875 1.875h-.75a1.875 1.875 0 0 1-1.875-1.875V8.625ZM3 13.125c0-1.036.84-1.875 1.875-1.875h.75c1.036 0 1.875.84 1.875 1.875v6.75c0 1.035-.84 1.875-1.875 1.875h-.75A1.875 1.875 0 0 1 3 19.875v-6.75Z" />
                      </svg>
                      <span>Tase 5</span>
                    </span>
                    <span className="inline-flex w-full items-center justify-center gap-[0.2rem] rounded-lg bg-course-lead-100 py-1.5 pl-3 pr-4 text-course-lead-600">
                      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="size-4 shrink-0 text-course-lead-600" aria-hidden>
                        <path strokeLinecap="round" strokeLinejoin="round" d="m10.5 21 5.25-11.25L21 21m-9-3h7.5M3 5.621a48.474 48.474 0 0 1 6-.371m0 0c1.12 0 2.233.038 3.334.114M9 5.25V3m3.334 2.364C11.176 10.658 7.69 15.08 3 17.502m9.334-12.138c.896.061 1.785.147 2.666.257m-4.589 8.495a18.023 18.023 0 0 1-3.827-5.802" />
                      </svg>
                      <span>B2</span>
                    </span>
                    <span className="inline-flex w-full items-center justify-center gap-[0.2rem] rounded-lg bg-course-lead-100 py-1.5 pl-3 pr-4 text-course-lead-600">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 24 24"
                        fill="currentColor"
                        className="size-4 shrink-0 text-course-lead-600"
                        aria-hidden
                      >
                        <path
                          fillRule="evenodd"
                          d="M12 2.25a9.75 9.75 0 1 0 9.75 9.75A9.76 9.76 0 0 0 12 2.25Zm.75 4.5a.75.75 0 0 0-1.5 0v4.38c0 .298.177.568.45.687l3.5 1.556a.75.75 0 1 0 .6-1.374l-3.05-1.357Z"
                          clipRule="evenodd"
                        />
                      </svg>
                      <span>106h</span>
                    </span>
                  </div>
                  <div className="flex items-center justify-center gap-2">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 24 24"
                      fill="currentColor"
                      className="size-[2.4rem] shrink-0 text-course-lead-600"
                      aria-hidden
                    >
                      <path fillRule="evenodd" d="M12 2.25a.75.75 0 0 1 .75.75v.756a49.106 49.106 0 0 1 9.152 1 .75.75 0 0 1-.152 1.485h-1.918l2.474 10.124a.75.75 0 0 1-.375.84A6.723 6.723 0 0 1 18.75 18a6.723 6.723 0 0 1-3.181-.795.75.75 0 0 1-.375-.84l2.474-10.124H12.75v13.28c1.293.076 2.534.343 3.697.776a.75.75 0 0 1-.262 1.453h-8.37a.75.75 0 0 1-.262-1.453c1.162-.433 2.404-.7 3.697-.775V6.24H6.332l2.474 10.124a.75.75 0 0 1-.375.84A6.723 6.723 0 0 1 5.25 18a6.723 6.723 0 0 1-3.181-.795.75.75 0 0 1-.375-.84L4.168 6.241H2.25a.75.75 0 0 1-.152-1.485 49.105 49.105 0 0 1 9.152-1V3a.75.75 0 0 1 .75-.75Zm4.878 13.543 1.872-7.662 1.872 7.662h-3.744Zm-9.756 0L5.25 8.131l-1.872 7.662h3.744Z" clipRule="evenodd" />
                    </svg>
                    <h3 className="mb-0 text-[1.2rem] font-bold leading-none text-course-lead-600 md:transition-colors md:duration-300 md:group-hover:text-course-lead-600">
                      {t('securityLead')}
                    </h3>
                  </div>
                </>
              }
            />
          </div>
        </div>
      </section>

      {/* Kuidas õpe toimub — same as /kursused, titles only */}
      <section className="bg-white">
        <div className="max-w-[48rem] mx-auto page-gutter-x pt-24 pb-10">
          <div className="flex flex-col gap-6 sm:gap-8 w-full max-w-md mx-auto">
            <h2
              className="font-semibold text-gray-900 text-left w-full"
              style={{ fontSize: '2.5rem', lineHeight: '3rem' }}
            >
              <span className="block min-[420px]:hidden">
                {t('stepsTitleXs1')}
                <br />
                {t('stepsTitleXs2')}
                <br />
                {t('stepsTitleXs3')}
              </span>
              <span className="hidden min-[420px]:block">
                <span className="block">{t('stepsTitleLine1')}</span>
                <span className="block">{t('stepsTitleLine2')}</span>
              </span>
            </h2>
            <HomeScrollLiftSteps
              steps={[t('step1'), t('step2'), t('step3'), t('step4'), t('step5'), t('step6')]}
            />
          </div>
        </div>
      </section>

      {/* Mugavad tingimused */}
      <section className="bg-white">
        <div className="max-w-[48rem] mx-auto page-gutter-x py-16">
          <div className="flex flex-col gap-6">
            <SectionOverlineHeading className="mb-6">{t('comfortTitle')}</SectionOverlineHeading>
            <HomeScrollLiftComfortCards />
          </div>
        </div>
      </section>

      {/* Estonia map */}
      <section className="bg-white">
        <div className="max-w-[48rem] mx-auto page-gutter-x py-16">
          <div className="flex flex-col sm:flex-row items-center justify-center gap-8 sm:gap-12">
            <div className="flex-shrink-0 w-full sm:w-[16.5rem] flex flex-col justify-center relative min-h-[7rem] sm:items-start">
              <h2
                className="font-semibold text-gray-900 text-center sm:text-left w-full sm:w-[16.5rem]"
                style={{ fontSize: '2.5rem', lineHeight: '3rem', fontFamily: 'var(--font-manrope), Manrope, sans-serif' }}
              >
                <span className="sm:hidden">
                  {t('mapTitleMobile1')}
                  <br />
                  {t('mapTitleMobile2')}
                  <br />
                  {cityHeadingLabel}
                </span>
                <span className="hidden sm:block">
                  {t('mapTitle1')}
                  {cityHeadingLabel != null ? '\u00A0' : null}
                  {cityHeadingLabel}
                </span>
              </h2>
            </div>
            <div className="w-full sm:w-[70%] max-w-[22rem] sm:max-w-[70%] flex justify-center overflow-hidden">
              <EstoniaMap
                className="w-full h-auto"
                onCityHover={setMapHoveredCity}
                onCityClick={handleMapCityClick}
                externalHoveredCity={mapHoveredCity?.source === 'hover' ? mapHoveredCity.name : null}
              />
            </div>
          </div>
        </div>
      </section>

      {/* Meie partnerid */}
      <PartnersSlider />

      {/* Kes teid koolitab? */}
      <section className="bg-white">
        <div className="max-w-[48rem] mx-auto page-gutter-x py-16">
          <div className="flex flex-col items-center gap-6 min-[800px]:flex-row min-[800px]:items-center min-[800px]:justify-between min-[800px]:gap-0">
            <h2
              className="w-full text-center font-semibold text-gray-900 min-[800px]:hidden"
              style={{ fontSize: '2.5rem', lineHeight: '3rem' }}
            >
              {t('trainerTitle')}
            </h2>

            <div className="w-full min-[800px]:w-auto flex justify-center min-[800px]:justify-end shrink-0 min-[800px]:order-2">
              <div className="relative my-4 w-[260px] max-w-full aspect-[3/4] bg-gray-100 rounded-2xl border border-gray-200 overflow-hidden">
                <img
                  src="/Eduard/Eduard.jpg"
                  alt="Eduard Rodtšenkov"
                  className="absolute inset-0 w-full h-full object-cover"
                />
              </div>
            </div>

            <div className="w-full min-[800px]:max-w-[24rem] min-[800px]:flex-1 min-[800px]:order-1">
              <h2
                className="hidden min-[800px]:block font-semibold text-gray-900 text-left mb-6"
                style={{ fontSize: '2.5rem', lineHeight: '3rem' }}
              >
                {t('trainerTitle')}
              </h2>
              <p className="text-gray-600 leading-relaxed">
                {t.rich('trainerText', {
                  name: (chunks) => <span className="font-semibold">{chunks}</span>,
                  years: (chunks) => <span className="font-semibold">{chunks}</span>,
                })}
              </p>
            </div>
          </div>

        </div>
      </section>

      {/* 8. Inquiry + final CTA */}
      <section className="bg-white">
        <div className="max-w-[48rem] mx-auto page-gutter-x pt-16 pb-24">
          <h2
            className="font-semibold text-gray-900 text-center mb-8 whitespace-pre-line"
            style={{ fontSize: '2.5rem', lineHeight: '3rem' }}
          >
            {t('readyTitle')}
          </h2>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/kursused/koolitus"
              className="btn-press inline-flex items-center justify-center px-8 py-4 bg-white border border-gray-200 shadow-sm hover:shadow-lg text-gray-700 rounded-lg font-semibold transition-all duration-300 cursor-pointer text-center text-primary-600"
            >
              {t('viewCourses')}
            </Link>
            <Link
              href="/registreerimine"
              className="btn-press inline-flex items-center justify-center px-8 py-4 bg-primary-600 text-white rounded-lg font-semibold shadow-sm hover:bg-primary-700 transition-all duration-300 hover:shadow-lg cursor-pointer text-center"
            >
              {t('register')}
            </Link>
          </div>
        </div>
      </section>
    </div>
  )
}
