'use client'

import { useCallback, useEffect, useRef, useState } from 'react'
import { Link } from '@/i18n/navigation'

/** С бургер-меню в Navigation (`min-[870px]` для полного меню) */
const MOBILE_STEPS_MQ = '(max-width: 869px)'

type Props = {
  steps: string[]
}

export default function HomeScrollLiftSteps({ steps }: Props) {
  const itemRefs = useRef<(HTMLLIElement | null)[]>([])
  const [liftThrough, setLiftThrough] = useState(-1)

  const updateLift = useCallback(() => {
    if (typeof window === 'undefined') return
    if (!window.matchMedia(MOBILE_STEPS_MQ).matches) {
      setLiftThrough(-1)
      return
    }
    const triggerY = window.innerHeight * 0.8
    let k = -1
    for (let i = 0; i < steps.length; i++) {
      const el = itemRefs.current[i]
      if (!el) break
      const rect = el.getBoundingClientRect()
      const itemCenterY = rect.top + rect.height / 2
      if (itemCenterY <= triggerY) k = i
      else break
    }
    setLiftThrough((prev) => (prev === k ? prev : k))
  }, [steps.length])

  useEffect(() => {
    const mm = window.matchMedia(MOBILE_STEPS_MQ)
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

  return (
    <div className="relative w-full">
      <ul className="space-y-4 md:space-y-5">
        {steps.map((title, index, arr) => {
          const isLast = index === arr.length - 1
          const isLifted = liftThrough >= 0 && index <= liftThrough
          return (
            <li
              key={index}
              ref={(el) => {
                itemRefs.current[index] = el
              }}
              className="flex w-full gap-3"
            >
              <Link
                href="/kursused/koolitus#kuidas-ope-heading"
                className="group flex min-w-0 flex-1 gap-3 text-left btn-press cursor-pointer rounded-lg focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary-600"
              >
                <div className="relative flex w-8 shrink-0 flex-col items-center justify-center self-stretch">
                  <div
                    className={`relative z-10 flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-primary-600 text-sm font-bold text-white shadow-sm transition-colors duration-300 min-[870px]:group-hover:bg-primary-700 ${
                      isLifted ? 'max-[869px]:bg-primary-700' : ''
                    }`}
                    style={{ fontFamily: 'var(--font-manrope), sans-serif' }}
                    aria-hidden
                  >
                    {index + 1}
                  </div>
                  {!isLast && (
                    <div
                      className="pointer-events-none absolute bottom-[-1.75rem] left-1/2 top-[calc(50%+1rem)] z-0 flex w-px -translate-x-1/2 justify-center md:bottom-[-2.25rem]"
                      aria-hidden
                    >
                      <svg width={1} height="100%" className="block min-h-[1rem] text-gray-200">
                        <line
                          x1={0.5}
                          y1={0}
                          x2={0.5}
                          y2="100%"
                          stroke="currentColor"
                          strokeWidth={1}
                          strokeDasharray="6 8"
                          strokeLinecap="round"
                          vectorEffect="nonScalingStroke"
                        />
                      </svg>
                    </div>
                  )}
                </div>
                <div
                  className={`min-w-0 flex-1 rounded-lg border bg-white px-4 py-3 shadow-sm transition-all duration-300 md:px-5 md:py-3.5 min-[870px]:group-hover:shadow-xl min-[870px]:group-hover:-translate-y-1 min-[870px]:group-hover:border-primary-300 ${
                    isLifted
                      ? 'max-[869px]:-translate-y-1 max-[869px]:border-primary-300 max-[869px]:shadow-xl'
                      : 'border-gray-200'
                  }`}
                >
                  <h3 className="text-base font-bold leading-tight text-gray-900 sm:text-lg">{title}</h3>
                </div>
              </Link>
            </li>
          )
        })}
      </ul>
    </div>
  )
}
