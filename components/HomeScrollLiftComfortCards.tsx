'use client'

import type { CSSProperties } from 'react'
import { useCallback, useEffect, useRef, useState } from 'react'
import { useTranslations } from 'next-intl'
import BottomHeavyTitle from '@/components/BottomHeavyTitle'
import { Link } from '@/i18n/navigation'

const COMFORT_SCROLL_MQ = '(max-width: 639px)'

export default function HomeScrollLiftComfortCards() {
  const t = useTranslations('home')
  const itemRefs = useRef<(HTMLDivElement | null)[]>([])
  const [liftThrough, setLiftThrough] = useState(-1)

  const updateLift = useCallback(() => {
    if (typeof window === 'undefined') return
    if (!window.matchMedia(COMFORT_SCROLL_MQ).matches) {
      setLiftThrough(-1)
      return
    }
    const triggerY = window.innerHeight * 0.8
    const n = 3
    let k = -1
    for (let i = 0; i < n; i++) {
      const el = itemRefs.current[i]
      if (!el) break
      const rect = el.getBoundingClientRect()
      const itemCenterY = rect.top + rect.height / 2
      if (itemCenterY <= triggerY) k = i
      else break
    }
    setLiftThrough((prev) => (prev === k ? prev : k))
  }, [])

  useEffect(() => {
    const mm = window.matchMedia(COMFORT_SCROLL_MQ)
    const run = () => updateLift()
    mm.addEventListener('change', run)
    window.addEventListener('scroll', run, { passive: true })
    window.addEventListener('resize', run)
    run()
    return () => {
      mm.removeEventListener('change', run)
      window.removeEventListener('scroll', run)
      window.removeEventListener('resize', run)
    }
  }, [updateLift])

  const iconWrap = 'mb-4 flex h-14 w-14 shrink-0 items-center justify-center rounded-full bg-primary-100 text-primary-600'

  const titleClass = 'mb-0 text-xl text-gray-900'
  const titleStyle: CSSProperties = {
    fontFamily: 'var(--font-manrope), sans-serif',
    fontWeight: 700,
    lineHeight: '1.6rem',
  }

  const linkBase =
    'group flex h-full w-full max-w-[21rem] flex-col items-start rounded-xl border bg-white p-6 transition-all duration-300 sm:max-w-none sm:justify-between btn-press cursor-pointer'

  return (
    <div className="grid grid-cols-1 items-stretch gap-4 justify-items-center sm:grid-cols-3 sm:justify-items-stretch">
      {[
        {
          body: (
            <>
              <div className={iconWrap} aria-hidden>
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="h-7 w-7">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M6.75 3v2.25M17.25 3v2.25M3 18.75V7.5a2.25 2.25 0 0 1 2.25-2.25h13.5A2.25 2.25 0 0 1 21 7.5v11.25m-18 0A2.25 2.25 0 0 0 5.25 21h13.5A2.25 2.25 0 0 0 21 18.75m-18 0v-7.5A2.25 2.25 0 0 1 5.25 9h13.5A2.25 2.25 0 0 1 21 11.25v7.5m-9-6h.008v.008H12v-.008ZM12 15h.008v.008H12V15Zm0 2.25h.008v.008H12v-.008ZM9.75 15h.008v.008H9.75V15Zm0 2.25h.008v.008H9.75v-.008ZM7.5 15h.008v.008H7.5V15Zm0 2.25h.008v.008H7.5v-.008Zm6.75-4.5h.008v.008h-.008v-.008Zm0 2.25h.008v.008h-.008V15Zm0 2.25h.008v.008h-.008v-.008Zm2.25-4.5h.008v.008H16.5v-.008Zm0 2.25h.008v.008H16.5V15Z" />
                </svg>
              </div>
              <BottomHeavyTitle text={t('flexSchedule')} className={titleClass} style={titleStyle} />
            </>
          ),
        },
        {
          body: (
            <>
              <div className={iconWrap} aria-hidden>
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="h-7 w-7">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M9 17.25v1.007a3 3 0 0 1-.879 2.122L7.5 21h9l-.621-.621A3 3 0 0 1 15 18.257V17.25m6-12V15a2.25 2.25 0 0 1-2.25 2.25H5.25A2.25 2.25 0 0 1 3 15V5.25m18 0A2.25 2.25 0 0 0 18.75 3H5.25A2.25 2.25 0 0 0 3 5.25m18 0V12a2.25 2.25 0 0 1-2.25 2.25H5.25A2.25 2.25 0 0 1 3 12V5.25" />
                </svg>
              </div>
              <BottomHeavyTitle text={t('onlineStudy')} className={titleClass} style={titleStyle} />
            </>
          ),
        },
        {
          body: (
            <>
              <div className={iconWrap} aria-hidden>
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="h-7 w-7">
                  <path fillRule="evenodd" d="M9 2.25a.75.75 0 0 1 .75.75v1.506a49.384 49.384 0 0 1 5.343.371.75.75 0 1 1-.186 1.489c-.66-.083-1.323-.151-1.99-.206a18.67 18.67 0 0 1-2.97 6.323c.318.384.65.753 1 1.107a.75.75 0 0 1-1.07 1.052A18.902 18.902 0 0 1 9 13.687a18.823 18.823 0 0 1-5.656 4.482.75.75 0 0 1-.688-1.333 17.323 17.323 0 0 0 5.396-4.353A18.72 18.72 0 0 1 5.89 8.598a.75.75 0 0 1 1.388-.568A17.21 17.21 0 0 0 9 11.224a17.168 17.168 0 0 0 2.391-5.165 48.04 48.04 0 0 0-8.298.307.75.75 0 0 1-.186-1.489 49.159 49.159 0 0 1 5.343-.371V3A.75.75 0 0 1 9 2.25ZM15.75 9a.75.75 0 0 1 .68.433l5.25 11.25a.75.75 0 1 1-1.36.634l-1.198-2.567h-6.744l-1.198 2.567a.75.75 0 0 1-1.36-.634l5.25-11.25A.75.75 0 0 1 15.75 9Zm-2.672 8.25h5.344l-2.672-5.726-2.672 5.726Z" clipRule="evenodd" />
                </svg>
              </div>
              <BottomHeavyTitle text={t('bilingual')} className={titleClass} style={titleStyle} />
            </>
          ),
        },
      ].map((card, index) => {
        const isLifted = liftThrough >= 0 && index <= liftThrough
        return (
          <div
            key={index}
            ref={(el) => {
              itemRefs.current[index] = el
            }}
            className="flex w-full max-w-[21rem] sm:h-full sm:max-w-none"
          >
            <Link
              href="/kursused/koolitus"
              className={`${linkBase} border-gray-200 shadow-sm min-[640px]:hover:-translate-y-1 min-[640px]:hover:border-primary-300 min-[640px]:hover:shadow-xl ${
                isLifted ? 'max-[639px]:-translate-y-1 max-[639px]:border-primary-300 max-[639px]:shadow-xl' : ''
              }`}
            >
              {card.body}
            </Link>
          </div>
        )
      })}
    </div>
  )
}
