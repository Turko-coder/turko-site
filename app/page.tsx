'use client'

import { useState, useEffect, useRef } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import PartnersSlider from '@/components/PartnersSlider'
import EstoniaMap from '@/components/EstoniaMap'

const CITY_LABEL_FADEOUT_MS = 500

type CityHoverSource = 'hover' | 'auto'

type CityHoverPayload = {
  name: string
  source: CityHoverSource
} | null

export default function Home() {
  const router = useRouter()
  const [mapHoveredCity, setMapHoveredCity] = useState<CityHoverPayload>(null)
  const [displayedCity, setDisplayedCity] = useState<string | null>(null)
  const [isCityLabelExiting, setIsCityLabelExiting] = useState(false)
  const [cityLabelSource, setCityLabelSource] = useState<CityHoverSource | null>(null)
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
          color: '#177AE5',
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
        <div className="max-w-[48rem] mx-auto px-4 sm:px-6 lg:px-8 pt-16 pb-24">
          <div className="text-center max-w-4xl mx-auto">
            <h1
              className="font-bold text-gray-900 text-center mb-8"
              style={{ fontSize: '3.6rem', lineHeight: '3.9rem', letterSpacing: '-0.02em' }}
            >
              <span className="md:hidden">
                Tee järgmine
                <br />
                samm turva-
                <br />
                valdkonnas
              </span>
              <span className="hidden md:inline">Tee järgmine samm turvavaldkonnas</span>
            </h1>
            <p className="text-xl md:text-2xl text-gray-600 mb-8 leading-relaxed">
              Pakume riiklikult tunnustatud väljaõpet — nii alustajale kui kogenud spetsialistile. Valmistame ette mitte ainult kutseeksamiks, vaid ka reaalseks tööks turvavaldkonnas.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                href="/kursused/koolitus"
                className="inline-flex items-center justify-center px-8 py-4 bg-white border border-gray-200 shadow-sm hover:shadow-lg text-gray-700 rounded-lg font-semibold transition-all duration-300 cursor-pointer text-center"
                style={{ color: '#177AE5' }}
              >
                Vaata koolitusi
              </Link>
              <Link
                href="/registreerimine"
                className="inline-flex items-center justify-center px-8 py-4 bg-primary-600 text-white rounded-lg font-semibold shadow-sm hover:bg-primary-700 transition-all duration-300 hover:shadow-lg cursor-pointer text-center"
                style={{ backgroundColor: '#177AE5' }}
              >
                Registreeru
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Õppeastmed (level cards) */}
      <section className="bg-white">
        <div className="max-w-[48rem] mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <h2
            className="font-bold text-gray-900 text-center mb-10"
            style={{ fontSize: '2.5rem', lineHeight: '3rem' }}
          >
            Vali endale <br className="hidden max-[429px]:block" />sobiv tee
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <Link
              href="/kursused/valvetootaja"
              className="group relative flex flex-col items-center justify-center text-center p-6 rounded-2xl border border-gray-200 bg-white shadow-md hover:shadow-xl transition-all duration-300 hover:border-primary-300 hover:-translate-y-1 cursor-pointer min-w-0 min-h-[280px]"
            >
              <div className="absolute inset-0 flex flex-col p-6 opacity-100 group-hover:opacity-0 transition-opacity duration-300 pointer-events-none">
                <div className="flex-1 flex items-center justify-center">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    fill="currentColor"
                    className="size-[10rem] text-primary-600"
                    aria-hidden
                    style={{ color: '#177AE5' }}
                  >
                    <path d="M12 15a3 3 0 1 0 0-6 3 3 0 0 0 0 6Z" />
                    <path fillRule="evenodd" d="M1.323 11.447C2.811 6.976 7.028 3.75 12.001 3.75c4.97 0 9.185 3.223 10.675 7.69.12.362.12.752 0 1.113-1.487 4.471-5.705 7.697-10.677 7.697-4.97 0-9.186-3.223-10.675-7.69a1.762 1.762 0 0 1 0-1.113ZM17.25 12a5.25 5.25 0 1 1-10.5 0 5.25 5.25 0 0 1 10.5 0Z" clipRule="evenodd" />
                  </svg>
                </div>
                <h3
                  className="text-2xl font-bold text-primary-600 text-center mb-0"
                  style={{ transform: 'translateY(-20px)', color: '#177AE5' }}
                >
                  Valvetöötaja
                </h3>
              </div>
              <div className="opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-1 flex-col items-center w-full min-h-0 relative z-10">
                <div
                  className="flex flex-col items-center gap-4 font-semibold text-sm w-max shrink-0 my-[30px]"
                  style={{ fontFamily: 'var(--font-inter), Inter, sans-serif' }}
                >
                  {/* Roll */}
                  <span
                    className="w-full inline-flex items-center justify-center gap-[0.2rem] py-1.5 pl-3 pr-4 rounded-lg"
                    style={{ backgroundColor: '#E7F1FF', color: '#2F6BDE' }}
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 24 24"
                      fill="currentColor"
                      className="size-4 shrink-0"
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
                    <span>Jälgimine</span>
                  </span>

                  {/* Tase */}
                  <span
                    className="w-full inline-flex items-center justify-center gap-[0.2rem] py-1.5 pl-3 pr-4 rounded-lg"
                    style={{ backgroundColor: '#E7F1FF', color: '#2F6BDE' }}
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 24 24"
                      fill="currentColor"
                      className="size-4 shrink-0"
                      aria-hidden
                    >
                      <path d="M18.375 2.25c-1.035 0-1.875.84-1.875 1.875v15.75c0 1.035.84 1.875 1.875 1.875h.75c1.035 0 1.875-.84 1.875-1.875V4.125c0-1.036-.84-1.875-1.875-1.875h-.75ZM9.75 8.625c0-1.036.84-1.875 1.875-1.875h.75c1.036 0 1.875.84 1.875 1.875v11.25c0 1.035-.84 1.875-1.875 1.875h-.75a1.875 1.875 0 0 1-1.875-1.875V8.625ZM3 13.125c0-1.036.84-1.875 1.875-1.875h.75c1.036 0 1.875.84 1.875 1.875v6.75c0 1.035-.84 1.875-1.875 1.875h-.75A1.875 1.875 0 0 1 3 19.875v-6.75Z" />
                    </svg>
                    <span>Tase 3</span>
                  </span>

                  {/* Keel */}
                  <span
                    className="w-full inline-flex items-center justify-center gap-[0.2rem] py-1.5 pl-3 pr-4 rounded-lg"
                    style={{ backgroundColor: '#E7F1FF', color: '#2F6BDE' }}
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="size-4 shrink-0" aria-hidden>
                      <path strokeLinecap="round" strokeLinejoin="round" d="m10.5 21 5.25-11.25L21 21m-9-3h7.5M3 5.621a48.474 48.474 0 0 1 6-.371m0 0c1.12 0 2.233.038 3.334.114M9 5.25V3m3.334 2.364C11.176 10.658 7.69 15.08 3 17.502m9.334-12.138c.896.061 1.785.147 2.666.257m-4.589 8.495a18.023 18.023 0 0 1-3.827-5.802" />
                    </svg>
                    <span>A2</span>
                  </span>

                  {/* Aeg */}
                  <span
                    className="w-full inline-flex items-center justify-center gap-[0.2rem] py-1.5 pl-3 pr-4 rounded-lg"
                    style={{ backgroundColor: '#E7F1FF', color: '#2F6BDE' }}
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 24 24"
                      fill="currentColor"
                      className="size-4 shrink-0"
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
                    className="size-[2.4rem] shrink-0"
                    style={{ color: '#177AE5' }}
                    aria-hidden
                  >
                    <path d="M12 15a3 3 0 1 0 0-6 3 3 0 0 0 0 6Z" />
                    <path fillRule="evenodd" d="M1.323 11.447C2.811 6.976 7.028 3.75 12.001 3.75c4.97 0 9.185 3.223 10.675 7.69.12.362.12.752 0 1.113-1.487 4.471-5.705 7.697-10.677 7.697-4.97 0-9.186-3.223-10.675-7.69a1.762 1.762 0 0 1 0-1.113ZM17.25 12a5.25 5.25 0 1 1-10.5 0 5.25 5.25 0 0 1 10.5 0Z" clipRule="evenodd" />
                  </svg>
                  <h3
                    className="font-bold text-gray-900 group-hover:text-primary-600 transition-colors duration-300 mb-0 text-[1.2rem] leading-none"
                    style={{ color: '#177AE5' }}
                  >
                    Valvetöötaja
                  </h3>
                </div>
              </div>
            </Link>
            <Link
              href="/kursused/turvatootaja"
              className="group relative flex flex-col items-center justify-center text-center p-6 rounded-2xl border border-gray-200 bg-white shadow-md hover:shadow-xl transition-all duration-300 hover:border-primary-300 hover:-translate-y-1 cursor-pointer min-w-0 min-h-[280px]"
            >
              <div className="absolute inset-0 flex flex-col p-6 opacity-100 group-hover:opacity-0 transition-opacity duration-300 pointer-events-none">
                <div className="flex-1 flex items-center justify-center">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    fill="currentColor"
                    className="size-[10rem] text-primary-600"
                    aria-hidden
                    style={{ color: '#177AE5' }}
                  >
                    <path fillRule="evenodd" d="M11.484 2.17a.75.75 0 0 1 1.032 0 11.209 11.209 0 0 0 7.877 3.08.75.75 0 0 1 .722.515 12.74 12.74 0 0 1 .635 3.985c0 5.942-4.064 10.933-9.563 12.348a.749.749 0 0 1-.374 0C6.314 20.683 2.25 15.692 2.25 9.75c0-1.39.223-2.73.635-3.985a.75.75 0 0 1 .722-.516l.143.001c2.996 0 5.718-1.17 7.734-3.08ZM12 8.25a.75.75 0 0 1 .75.75v3.75a.75.75 0 0 1-1.5 0V9a.75.75 0 0 1 .75-.75ZM12 15a.75.75 0 0 0-.75.75v.008c0 .414.336.75.75.75h.008a.75.75 0 0 0 .75-.75v-.008a.75.75 0 0 0-.75-.75H12Z" clipRule="evenodd" />
                  </svg>
                </div>
                <h3
                  className="text-2xl font-bold text-primary-600 text-center mb-0"
                  style={{ transform: 'translateY(-20px)', color: '#177AE5' }}
                >
                  Turvatöötaja
                </h3>
              </div>
              <div className="opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col items-center w-full relative z-10">
                <div
                  className="flex flex-col items-center gap-4 font-semibold text-sm w-max shrink-0 my-[30px]"
                  style={{ fontFamily: 'var(--font-inter), Inter, sans-serif' }}
                >
                  <span
                    className="w-full inline-flex items-center justify-center gap-[0.2rem] py-1.5 pl-3 pr-4 rounded-lg"
                    style={{ backgroundColor: '#E7F1FF', color: '#2F6BDE' }}
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 24 24"
                      fill="currentColor"
                      className="size-4 shrink-0"
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
                    <span>Reageerimine</span>
                  </span>

                  <span
                    className="w-full inline-flex items-center justify-center gap-[0.2rem] py-1.5 pl-3 pr-4 rounded-lg"
                    style={{ backgroundColor: '#E7F1FF', color: '#2F6BDE' }}
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 24 24"
                      fill="currentColor"
                      className="size-4 shrink-0"
                      aria-hidden
                    >
                      <path d="M18.375 2.25c-1.035 0-1.875.84-1.875 1.875v15.75c0 1.035.84 1.875 1.875 1.875h.75c1.035 0 1.875-.84 1.875-1.875V4.125c0-1.036-.84-1.875-1.875-1.875h-.75ZM9.75 8.625c0-1.036.84-1.875 1.875-1.875h.75c1.036 0 1.875.84 1.875 1.875v11.25c0 1.035-.84 1.875-1.875 1.875h-.75a1.875 1.875 0 0 1-1.875-1.875V8.625ZM3 13.125c0-1.036.84-1.875 1.875-1.875h.75c1.036 0 1.875.84 1.875 1.875v6.75c0 1.035-.84 1.875-1.875 1.875h-.75A1.875 1.875 0 0 1 3 19.875v-6.75Z" />
                    </svg>
                    <span>Tase 4</span>
                  </span>

                  <span
                    className="w-full inline-flex items-center justify-center gap-[0.2rem] py-1.5 pl-3 pr-4 rounded-lg"
                    style={{ backgroundColor: '#E7F1FF', color: '#2F6BDE' }}
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="size-4 shrink-0" aria-hidden>
                      <path strokeLinecap="round" strokeLinejoin="round" d="m10.5 21 5.25-11.25L21 21m-9-3h7.5M3 5.621a48.474 48.474 0 0 1 6-.371m0 0c1.12 0 2.233.038 3.334.114M9 5.25V3m3.334 2.364C11.176 10.658 7.69 15.08 3 17.502m9.334-12.138c.896.061 1.785.147 2.666.257m-4.589 8.495a18.023 18.023 0 0 1-3.827-5.802" />
                    </svg>
                    <span>B2</span>
                  </span>

                  <span
                    className="w-full inline-flex items-center justify-center gap-[0.2rem] py-1.5 pl-3 pr-4 rounded-lg"
                    style={{ backgroundColor: '#E7F1FF', color: '#2F6BDE' }}
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 24 24"
                      fill="currentColor"
                      className="size-4 shrink-0"
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
                    className="size-[2.4rem] shrink-0"
                    style={{ color: '#177AE5' }}
                    aria-hidden
                  >
                    <path fillRule="evenodd" d="M11.484 2.17a.75.75 0 0 1 1.032 0 11.209 11.209 0 0 0 7.877 3.08.75.75 0 0 1 .722.515 12.74 12.74 0 0 1 .635 3.985c0 5.942-4.064 10.933-9.563 12.348a.749.749 0 0 1-.374 0C6.314 20.683 2.25 15.692 2.25 9.75c0-1.39.223-2.73.635-3.985a.75.75 0 0 1 .722-.516l.143.001c2.996 0 5.718-1.17 7.734-3.08ZM12 8.25a.75.75 0 0 1 .75.75v3.75a.75.75 0 0 1-1.5 0V9a.75.75 0 0 1 .75-.75ZM12 15a.75.75 0 0 0-.75.75v.008c0 .414.336.75.75.75h.008a.75.75 0 0 0 .75-.75v-.008a.75.75 0 0 0-.75-.75H12Z" clipRule="evenodd" />
                  </svg>
                  <h3
                    className="font-bold text-gray-900 group-hover:text-primary-600 transition-colors duration-300 mb-0 text-[1.2rem] leading-none"
                    style={{ color: '#177AE5' }}
                  >
                    Turvatöötaja
                  </h3>
                </div>
              </div>
            </Link>
            <Link
              href="/kursused/turvajuht"
              className="group relative flex flex-col items-center justify-center text-center p-6 rounded-2xl border border-gray-200 bg-white shadow-md hover:shadow-xl transition-all duration-300 hover:border-primary-300 hover:-translate-y-1 cursor-pointer min-w-0 min-h-[280px]"
            >
              <div className="absolute inset-0 flex flex-col p-6 opacity-100 group-hover:opacity-0 transition-opacity duration-300 pointer-events-none">
                <div className="flex-1 flex items-center justify-center">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    fill="currentColor"
                    className="size-[10rem] text-primary-600"
                    aria-hidden
                    style={{ color: '#177AE5' }}
                  >
                    <path fillRule="evenodd" d="M12 2.25a.75.75 0 0 1 .75.75v.756a49.106 49.106 0 0 1 9.152 1 .75.75 0 0 1-.152 1.485h-1.918l2.474 10.124a.75.75 0 0 1-.375.84A6.723 6.723 0 0 1 18.75 18a6.723 6.723 0 0 1-3.181-.795.75.75 0 0 1-.375-.84l2.474-10.124H12.75v13.28c1.293.076 2.534.343 3.697.776a.75.75 0 0 1-.262 1.453h-8.37a.75.75 0 0 1-.262-1.453c1.162-.433 2.404-.7 3.697-.775V6.24H6.332l2.474 10.124a.75.75 0 0 1-.375.84A6.723 6.723 0 0 1 5.25 18a6.723 6.723 0 0 1-3.181-.795.75.75 0 0 1-.375-.84L4.168 6.241H2.25a.75.75 0 0 1-.152-1.485 49.105 49.105 0 0 1 9.152-1V3a.75.75 0 0 1 .75-.75Zm4.878 13.543 1.872-7.662 1.872 7.662h-3.744Zm-9.756 0L5.25 8.131l-1.872 7.662h3.744Z" clipRule="evenodd" />
                  </svg>
                </div>
                <h3
                  className="text-2xl font-bold text-primary-600 text-center mb-0"
                  style={{ transform: 'translateY(-20px)', color: '#177AE5' }}
                >
                  Turvajuht
                </h3>
              </div>
              <div className="opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col items-center w-full relative z-10">
                <div
                  className="flex flex-col items-center gap-4 font-semibold text-sm w-max shrink-0 my-[30px]"
                  style={{ fontFamily: 'var(--font-inter), Inter, sans-serif' }}
                >
                  <span
                    className="w-full inline-flex items-center justify-center gap-[0.2rem] py-1.5 pl-3 pr-4 rounded-lg"
                    style={{ backgroundColor: '#E7F1FF', color: '#2F6BDE' }}
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 24 24"
                      fill="currentColor"
                      className="size-4 shrink-0"
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
                    <span>Korraldus</span>
                  </span>

                  <span
                    className="w-full inline-flex items-center justify-center gap-[0.2rem] py-1.5 pl-3 pr-4 rounded-lg"
                    style={{ backgroundColor: '#E7F1FF', color: '#2F6BDE' }}
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 24 24"
                      fill="currentColor"
                      className="size-4 shrink-0"
                      aria-hidden
                    >
                      <path d="M18.375 2.25c-1.035 0-1.875.84-1.875 1.875v15.75c0 1.035.84 1.875 1.875 1.875h.75c1.035 0 1.875-.84 1.875-1.875V4.125c0-1.036-.84-1.875-1.875-1.875h-.75ZM9.75 8.625c0-1.036.84-1.875 1.875-1.875h.75c1.036 0 1.875.84 1.875 1.875v11.25c0 1.035-.84 1.875-1.875 1.875h-.75a1.875 1.875 0 0 1-1.875-1.875V8.625ZM3 13.125c0-1.036.84-1.875 1.875-1.875h.75c1.036 0 1.875.84 1.875 1.875v6.75c0 1.035-.84 1.875-1.875 1.875h-.75A1.875 1.875 0 0 1 3 19.875v-6.75Z" />
                    </svg>
                    <span>Tase 5</span>
                  </span>

                  <span
                    className="w-full inline-flex items-center justify-center gap-[0.2rem] py-1.5 pl-3 pr-4 rounded-lg"
                    style={{ backgroundColor: '#E7F1FF', color: '#2F6BDE' }}
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="size-4 shrink-0" aria-hidden>
                      <path strokeLinecap="round" strokeLinejoin="round" d="m10.5 21 5.25-11.25L21 21m-9-3h7.5M3 5.621a48.474 48.474 0 0 1 6-.371m0 0c1.12 0 2.233.038 3.334.114M9 5.25V3m3.334 2.364C11.176 10.658 7.69 15.08 3 17.502m9.334-12.138c.896.061 1.785.147 2.666.257m-4.589 8.495a18.023 18.023 0 0 1-3.827-5.802" />
                    </svg>
                    <span>B2</span>
                  </span>

                  <span
                    className="w-full inline-flex items-center justify-center gap-[0.2rem] py-1.5 pl-3 pr-4 rounded-lg"
                    style={{ backgroundColor: '#E7F1FF', color: '#2F6BDE' }}
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 24 24"
                      fill="currentColor"
                      className="size-4 shrink-0"
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
                    className="size-[2.4rem] shrink-0"
                    style={{ color: '#177AE5' }}
                    aria-hidden
                  >
                    <path fillRule="evenodd" d="M12 2.25a.75.75 0 0 1 .75.75v.756a49.106 49.106 0 0 1 9.152 1 .75.75 0 0 1-.152 1.485h-1.918l2.474 10.124a.75.75 0 0 1-.375.84A6.723 6.723 0 0 1 18.75 18a6.723 6.723 0 0 1-3.181-.795.75.75 0 0 1-.375-.84l2.474-10.124H12.75v13.28c1.293.076 2.534.343 3.697.776a.75.75 0 0 1-.262 1.453h-8.37a.75.75 0 0 1-.262-1.453c1.162-.433 2.404-.7 3.697-.775V6.24H6.332l2.474 10.124a.75.75 0 0 1-.375.84A6.723 6.723 0 0 1 5.25 18a6.723 6.723 0 0 1-3.181-.795.75.75 0 0 1-.375-.84L4.168 6.241H2.25a.75.75 0 0 1-.152-1.485 49.105 49.105 0 0 1 9.152-1V3a.75.75 0 0 1 .75-.75Zm4.878 13.543 1.872-7.662 1.872 7.662h-3.744Zm-9.756 0L5.25 8.131l-1.872 7.662h3.744Z" clipRule="evenodd" />
                  </svg>
                  <h3
                    className="font-bold text-gray-900 group-hover:text-primary-600 transition-colors duration-300 mb-0 text-[1.2rem] leading-none"
                    style={{ color: '#177AE5' }}
                  >
                    Turvajuht
                  </h3>
                </div>
              </div>
            </Link>
          </div>
        </div>
      </section>

      {/* Kuidas õpe toimub — same as /kursused, titles only */}
      <section className="bg-white">
        <div className="max-w-[48rem] mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <div className="flex flex-col sm:flex-row sm:items-center gap-8 sm:gap-10">
            <h2 className="font-bold text-gray-900 flex-shrink-0 text-center sm:text-right" style={{ fontSize: '2.5rem', lineHeight: '3rem' }}>
              Selgete<br />sammudega<br />tunnistuseni
            </h2>
            <div className="relative flex-1 min-w-0 flex justify-center sm:justify-start">
              <div className="max-w-md w-full rounded-2xl border border-gray-200 bg-white shadow-sm p-5 sm:p-6">
                <ul className="space-y-6">
                {[
                  'Avalduse esitamine',
                  'Personaalne konsultatsioon',
                  'Õpe',
                  'Ettevalmistus eksamiks',
                  'Eksami sooritamine',
                  'Tunnistuse saamine ja töö alustamine',
                ].map((title, index) => (
                  <li key={index} className="flex items-center gap-3">
                    <div
                      className="flex-shrink-0 w-8 h-8 rounded-full bg-primary-600 flex items-center justify-center text-white font-bold text-sm"
                      style={{ fontFamily: 'var(--font-manrope), sans-serif', backgroundColor: '#177AE5' }}
                    >
                      {index + 1}
                    </div>
                    <h3 className="flex-1 min-w-0 text-base sm:text-lg font-bold text-gray-900 leading-tight">{title}</h3>
                  </li>
                ))}
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Mugavad tingimused */}
      <section className="bg-white">
        <div className="max-w-[48rem] mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <div className="flex flex-col gap-6">
            <h2 className="font-bold text-gray-900 text-center w-full mb-2" style={{ fontSize: '2.5rem', lineHeight: '3rem' }}>
              Mugavad tingimused
            </h2>
            {/* Cards in one row */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 justify-items-center sm:justify-items-stretch">
              <Link href="/kursused/koolitus" className="w-full max-w-[21rem] sm:max-w-none bg-white rounded-xl shadow-sm border border-gray-200 p-6 flex items-center justify-center gap-4 transition-all duration-300 hover:shadow-xl hover:-translate-y-1 cursor-pointer">
                <div className="flex-shrink-0 w-[3.85rem] h-[3.85rem] text-primary-600" style={{ color: '#177AE5' }}>
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-full h-full">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M6.75 3v2.25M17.25 3v2.25M3 18.75V7.5a2.25 2.25 0 0 1 2.25-2.25h13.5A2.25 2.25 0 0 1 21 7.5v11.25m-18 0A2.25 2.25 0 0 0 5.25 21h13.5A2.25 2.25 0 0 0 21 18.75m-18 0v-7.5A2.25 2.25 0 0 1 5.25 9h13.5A2.25 2.25 0 0 1 21 11.25v7.5m-9-6h.008v.008H12v-.008ZM12 15h.008v.008H12V15Zm0 2.25h.008v.008H12v-.008ZM9.75 15h.008v.008H9.75V15Zm0 2.25h.008v.008H9.75v-.008ZM7.5 15h.008v.008H7.5V15Zm0 2.25h.008v.008H7.5v-.008Zm6.75-4.5h.008v.008h-.008v-.008Zm0 2.25h.008v.008h-.008V15Zm0 2.25h.008v.008h-.008v-.008Zm2.25-4.5h.008v.008H16.5v-.008Zm0 2.25h.008v.008H16.5V15Z" />
                  </svg>
                </div>
                <div className="text-left min-w-0">
                  <p className="text-gray-900 text-xl mb-0" style={{ fontFamily: 'var(--font-manrope), sans-serif', fontWeight: 700, lineHeight: '1.6rem' }}>Paindlik ajakava</p>
                </div>
              </Link>
              <Link href="/kursused/koolitus" className="w-full max-w-[21rem] sm:max-w-none bg-white rounded-xl shadow-sm border border-gray-200 p-6 flex items-center justify-center gap-4 transition-all duration-300 hover:shadow-xl hover:-translate-y-1 cursor-pointer">
                <div className="flex-shrink-0 w-[3.85rem] h-[3.85rem] text-primary-600" style={{ color: '#177AE5' }}>
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-full h-full">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M9 17.25v1.007a3 3 0 0 1-.879 2.122L7.5 21h9l-.621-.621A3 3 0 0 1 15 18.257V17.25m6-12V15a2.25 2.25 0 0 1-2.25 2.25H5.25A2.25 2.25 0 0 1 3 15V5.25m18 0A2.25 2.25 0 0 0 18.75 3H5.25A2.25 2.25 0 0 0 3 5.25m18 0V12a2.25 2.25 0 0 1-2.25 2.25H5.25A2.25 2.25 0 0 1 3 12V5.25" />
                  </svg>
                </div>
                <div className="text-left min-w-0 flex flex-col justify-center">
                  <p className="text-gray-900 text-xl mb-0" style={{ fontFamily: 'var(--font-manrope), sans-serif', fontWeight: 700, lineHeight: '1.6rem' }}>Õpe online&apos;is</p>
                  <p className="text-gray-600 mt-[5px]" style={{ lineHeight: '1rem', fontSize: '0.7rem' }}>(osa teemasid ainult kohapeal)</p>
                </div>
              </Link>
              <Link href="/kursused/koolitus" className="w-full max-w-[21rem] sm:max-w-none bg-white rounded-xl shadow-sm border border-gray-200 p-6 flex items-center justify-center gap-4 transition-all duration-300 hover:shadow-xl hover:-translate-y-1 cursor-pointer">
                <div className="flex-shrink-0 w-[3.85rem] h-[3.85rem] text-primary-600" style={{ color: '#177AE5' }}>
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-full h-full">
                    <path fillRule="evenodd" d="M9 2.25a.75.75 0 0 1 .75.75v1.506a49.384 49.384 0 0 1 5.343.371.75.75 0 1 1-.186 1.489c-.66-.083-1.323-.151-1.99-.206a18.67 18.67 0 0 1-2.97 6.323c.318.384.65.753 1 1.107a.75.75 0 0 1-1.07 1.052A18.902 18.902 0 0 1 9 13.687a18.823 18.823 0 0 1-5.656 4.482.75.75 0 0 1-.688-1.333 17.323 17.323 0 0 0 5.396-4.353A18.72 18.72 0 0 1 5.89 8.598a.75.75 0 0 1 1.388-.568A17.21 17.21 0 0 0 9 11.224a17.168 17.168 0 0 0 2.391-5.165 48.04 48.04 0 0 0-8.298.307.75.75 0 0 1-.186-1.489 49.159 49.159 0 0 1 5.343-.371V3A.75.75 0 0 1 9 2.25ZM15.75 9a.75.75 0 0 1 .68.433l5.25 11.25a.75.75 0 1 1-1.36.634l-1.198-2.567h-6.744l-1.198 2.567a.75.75 0 0 1-1.36-.634l5.25-11.25A.75.75 0 0 1 15.75 9Zm-2.672 8.25h5.344l-2.672-5.726-2.672 5.726Z" clipRule="evenodd" />
                  </svg>
                </div>
                <div className="text-left min-w-0">
                  <p className="text-gray-900 text-xl mb-0" style={{ fontFamily: 'var(--font-manrope), sans-serif', fontWeight: 700, lineHeight: '1.6rem' }}>Õpe eesti<br />või vene keeles</p>
                </div>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Estonia map */}
      <section className="bg-white">
        <div className="max-w-[48rem] mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <div className="flex flex-col sm:flex-row items-center justify-center gap-8 sm:gap-12">
            <div className="flex-shrink-0 w-full sm:w-[16.5rem] flex flex-col justify-center relative min-h-[7rem] sm:items-start">
              <h2
                className="font-bold text-gray-900 text-center sm:text-left w-full sm:w-[16.5rem]"
                style={{ fontSize: '2.5rem', lineHeight: '3rem', fontFamily: 'var(--font-manrope), Manrope, sans-serif' }}
              >
                <span className="sm:hidden">
                  Õpe
                  <br />
                  kolmes linnas:
                  <br />
                  {cityHeadingLabel}
                </span>
                <span className="hidden sm:block">
                  Õpe kolmes
                  <br />
                  linnas: {cityHeadingLabel}
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
        <div className="max-w-[48rem] mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <div className="flex flex-col items-center gap-6 min-[800px]:flex-row min-[800px]:items-center min-[800px]:justify-between min-[800px]:gap-0">
            <h2
              className="w-full text-center font-bold text-gray-900 min-[800px]:hidden"
              style={{ fontSize: '2.5rem', lineHeight: '3rem' }}
            >
              Kes teid koolitab?
            </h2>

            <div className="w-full min-[800px]:w-auto flex justify-center min-[800px]:justify-end shrink-0 min-[800px]:order-2">
              <div className="relative w-[260px] max-w-full aspect-[3/4] bg-gray-100 rounded-2xl border border-gray-200 overflow-hidden">
                <img
                  src="/Eduard/Eduard.jpg"
                  alt="Eduard Rodtšenkov"
                  className="absolute inset-0 w-full h-full object-cover"
                />
              </div>
            </div>

            <div className="w-full min-[800px]:max-w-[24rem] min-[800px]:flex-1 min-[800px]:order-1">
              <h2
                className="hidden min-[800px]:block font-bold text-gray-900 text-left mb-6"
                style={{ fontSize: '2.5rem', lineHeight: '3rem' }}
              >
                Kes teid<br />koolitab?
              </h2>
              <p className="text-gray-600 leading-relaxed">
                Põhiline inimene, kellega teie teed siin keskuses ristuvad, on <span className="font-semibold">Eduard Rodtšenkov</span> – juht ja peamine koolitaja. Ta on selle keskuse nägu: üle <span className="font-semibold">30 aasta</span> kogemust valve- ja turvavaldkonnas ning ette valmistatud rohkem kui <span className="font-semibold">3500 õppijat</span>. Suure osa loengutest annab tema; kitsamate teemade (laskmine, enesekaitse, esmaabi) jaoks kaasatakse valdkonna spetsialistid.
              </p>
            </div>
          </div>

        </div>
      </section>

      {/* 8. Inquiry + final CTA */}
      <section className="bg-white">
        <div className="max-w-[48rem] mx-auto px-4 sm:px-6 lg:px-8 pt-16 pb-24">
          <h2
            className="font-bold text-gray-900 text-center mb-8"
            style={{ fontSize: '2.5rem', lineHeight: '3rem' }}
          >
            Valmis alustama?
          </h2>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/kursused/koolitus"
              className="inline-flex items-center justify-center px-8 py-4 bg-white border border-gray-200 shadow-sm hover:shadow-lg text-gray-700 rounded-lg font-semibold transition-all duration-300 cursor-pointer text-center"
              style={{ color: '#177AE5' }}
            >
              Vaata koolitusi
            </Link>
            <Link
              href="/registreerimine"
              className="inline-flex items-center justify-center px-8 py-4 bg-primary-600 text-white rounded-lg font-semibold shadow-sm hover:bg-primary-700 transition-all duration-300 hover:shadow-lg cursor-pointer text-center"
              style={{ backgroundColor: '#177AE5' }}
            >
              Registreeru
            </Link>
          </div>
        </div>
      </section>
    </div>
  )
}
