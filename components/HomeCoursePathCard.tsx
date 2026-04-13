'use client'

import { useRef, useState, type ReactNode } from 'react'
import { Link } from '@/i18n/navigation'

export type HomeCoursePathKind = 'guard' | 'security' | 'lead'

const kindDesktopLinkClass: Record<HomeCoursePathKind, string> = {
  guard:
    'group relative flex flex-col items-center justify-center text-center p-8 md:p-10 rounded-2xl border border-transparent bg-gradient-to-b from-course-guard-600 to-course-guard-700 shadow-md hover:shadow-xl transition-all duration-300 hover:bg-white hover:[background-image:none] hover:border-course-guard-300 hover:-translate-y-1 cursor-pointer min-w-0 min-h-[280px] btn-press w-full',
  security:
    'group relative flex flex-col items-center justify-center text-center p-8 md:p-10 rounded-2xl border border-transparent bg-gradient-to-b from-course-security-600 to-course-security-700 shadow-md hover:shadow-xl transition-all duration-300 hover:bg-white hover:[background-image:none] hover:border-course-security-300 hover:-translate-y-1 cursor-pointer min-w-0 min-h-[280px] btn-press w-full',
  lead:
    'group relative flex flex-col items-center justify-center text-center p-8 md:p-10 rounded-2xl border border-transparent bg-gradient-to-b from-course-lead-600 to-course-lead-800 shadow-md hover:shadow-xl transition-all duration-300 hover:bg-white hover:[background-image:none] hover:border-course-lead-300 hover:-translate-y-1 cursor-pointer min-w-0 min-h-[280px] btn-press w-full',
}

const kindMobileSlideClass: Record<HomeCoursePathKind, string> = {
  guard: 'bg-gradient-to-b from-course-guard-600 to-course-guard-700',
  security: 'bg-gradient-to-b from-course-security-600 to-course-security-700',
  lead: 'bg-gradient-to-b from-course-lead-600 to-course-lead-800',
}

const kindMobileBackBorder: Record<HomeCoursePathKind, string> = {
  guard: 'border-course-guard-300',
  security: 'border-course-security-300',
  lead: 'border-course-lead-300',
}

const kindDotActive: Record<HomeCoursePathKind, string> = {
  guard: 'w-7 bg-course-guard-500',
  security: 'w-7 bg-course-security-500',
  lead: 'w-7 bg-course-lead-500',
}

const kindDotInactive: Record<HomeCoursePathKind, string> = {
  guard: 'w-2.5 bg-course-guard-200/90 hover:bg-course-guard-300',
  security: 'w-2.5 bg-course-security-200/90 hover:bg-course-security-300',
  lead: 'w-2.5 bg-course-lead-200/90 hover:bg-course-lead-300',
}

/** On gradient slide: active = light (prominent), inactive = dark — swapped vs second slide */
const kindDotActiveOnGradient: Record<HomeCoursePathKind, string> = {
  guard: 'w-7 bg-course-guard-100',
  security: 'w-7 bg-course-security-100',
  lead: 'w-7 bg-course-lead-100',
}

const kindDotInactiveOnGradient: Record<HomeCoursePathKind, string> = {
  guard: 'w-2.5 bg-course-guard-600/75 hover:bg-course-guard-600',
  security: 'w-2.5 bg-course-security-600/75 hover:bg-course-security-600',
  lead: 'w-2.5 bg-course-lead-600/75 hover:bg-course-lead-600',
}

const carouselClass =
  'relative z-0 flex min-h-[280px] w-full overflow-x-auto snap-x snap-mandatory scroll-smooth [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden'

type Props = {
  href: string
  kind: HomeCoursePathKind
  onHoverEnter: () => void
  carouselLabel: string
  dotLabel: (slideIndex: number) => string
  front: ReactNode
  back: ReactNode
}

export default function HomeCoursePathCard({
  href,
  kind,
  onHoverEnter,
  carouselLabel,
  dotLabel,
  front,
  back,
}: Props) {
  const carouselRef = useRef<HTMLDivElement | null>(null)
  const [slideIndex, setSlideIndex] = useState(0)

  const scrollToSlide = (index: number) => {
    const el = carouselRef.current
    if (!el) return
    const w = el.clientWidth
    if (!w) return
    el.scrollTo({ left: index * w, behavior: 'smooth' })
    setSlideIndex(index)
  }

  return (
    <div className="relative w-full min-w-0">
      <div className="relative overflow-hidden rounded-2xl shadow-md md:hidden">
        <div
          ref={carouselRef}
          className={carouselClass}
          onScroll={(event) => {
            const container = event.currentTarget
            const w = container.clientWidth
            if (!w) return
            const next = Math.round(container.scrollLeft / w)
            if (next !== slideIndex) setSlideIndex(next)
          }}
          aria-label={carouselLabel}
        >
          <Link
            href={href}
            className={`flex min-h-[280px] w-full min-w-0 shrink-0 snap-center flex-col items-center justify-center rounded-2xl p-8 pb-12 text-center ${kindMobileSlideClass[kind]}`}
          >
            {front}
          </Link>
          <Link
            href={href}
            className={`flex min-h-[280px] w-full min-w-0 shrink-0 snap-center flex-col items-center justify-center rounded-2xl border-2 bg-white p-8 pb-12 text-center ${kindMobileBackBorder[kind]}`}
          >
            {back}
          </Link>
        </div>
        <div
          className="pointer-events-none absolute inset-x-0 bottom-3 z-20 flex items-center justify-center gap-2"
          role="tablist"
          aria-label={carouselLabel}
        >
          {[0, 1].map((i) => {
            const isCurrent = slideIndex === i
            const onGradientSlide = slideIndex === 0
            const dotClass = onGradientSlide
              ? isCurrent
                ? kindDotActiveOnGradient[kind]
                : kindDotInactiveOnGradient[kind]
              : isCurrent
                ? kindDotActive[kind]
                : kindDotInactive[kind]
            return (
              <button
                key={i}
                type="button"
                onClick={() => scrollToSlide(i)}
                aria-label={dotLabel(i)}
                {...(isCurrent ? { 'aria-current': 'true' as const } : {})}
                className={`pointer-events-auto h-2.5 shrink-0 rounded-full transition-all ${dotClass}`}
              />
            )
          })}
        </div>
      </div>

      <Link
        href={href}
        className={`${kindDesktopLinkClass[kind]} hidden md:flex`}
        onMouseEnter={onHoverEnter}
      >
        <div className="pointer-events-none absolute inset-0 flex flex-col items-center justify-center p-8 opacity-100 transition-opacity duration-300 group-hover:opacity-0 md:p-10">
          {front}
        </div>
        <div className="relative z-10 flex min-h-0 w-full flex-1 flex-col items-center justify-center opacity-0 transition-opacity duration-300 group-hover:opacity-100">
          {back}
        </div>
      </Link>
    </div>
  )
}
