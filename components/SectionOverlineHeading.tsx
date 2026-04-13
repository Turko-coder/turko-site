import type { ReactNode } from 'react'

type Props = {
  children: ReactNode
  className?: string
}

export default function SectionOverlineHeading({ children, className }: Props) {
  return (
    <div className={`flex w-full items-center justify-center gap-3 sm:gap-4 md:gap-5 ${className ?? ''}`}>
      <span
        className="h-px w-14 shrink-0 rounded-full bg-gray-200 sm:w-20 md:w-28"
        aria-hidden
      />
      <h2
        className="shrink-0 max-w-[min(100%,28rem)] text-center text-[0.65rem] font-medium leading-snug text-gray-600 sm:text-[0.7rem] md:text-sm"
        style={{ fontFamily: 'var(--font-inter)' }}
      >
        {children}
      </h2>
      <span
        className="h-px w-14 shrink-0 rounded-full bg-gray-200 sm:w-20 md:w-28"
        aria-hidden
      />
    </div>
  )
}
