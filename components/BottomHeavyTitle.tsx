'use client'

import type { CSSProperties } from 'react'
import { useCallback, useLayoutEffect, useRef, useState } from 'react'

type Props = {
  text: string
  className?: string
  style?: CSSProperties
}

/**
 * If the string needs wrapping, prefers a break so the first line has as few words as possible
 * (both lines must fit the container width). Falls back to normal wrapping if no two-line split works.
 */
export default function BottomHeavyTitle({ text, className, style }: Props) {
  const wrapRef = useRef<HTMLDivElement>(null)
  const lineRef = useRef<HTMLParagraphElement>(null)
  const [splitAt, setSplitAt] = useState<number | null>(null)

  const recompute = useCallback(() => {
    const wrap = wrapRef.current
    const lineEl = lineRef.current
    if (!wrap || !lineEl || typeof document === 'undefined') return

    const maxW = wrap.clientWidth
    if (maxW <= 0) return

    const trimmed = text.trim()
    const words = trimmed.split(/\s+/).filter(Boolean)
    if (words.length < 2) {
      setSplitAt((prev) => (prev === null ? prev : null))
      return
    }

    const m = document.createElement('span')
    m.setAttribute('aria-hidden', 'true')
    const cs = getComputedStyle(lineEl)
    m.style.font = cs.font
    m.style.fontSize = cs.fontSize
    m.style.fontFamily = cs.fontFamily
    m.style.fontWeight = cs.fontWeight
    m.style.letterSpacing = cs.letterSpacing
    m.style.whiteSpace = 'nowrap'
    m.style.position = 'absolute'
    m.style.left = '-9999px'
    m.style.top = '0'
    document.body.appendChild(m)

    const widthOf = (s: string) => {
      m.textContent = s
      return m.getBoundingClientRect().width
    }

    let next: number | null = null
    try {
      if (widthOf(trimmed) <= maxW) {
        next = null
      } else {
        for (let k = 1; k < words.length; k++) {
          const l1 = words.slice(0, k).join(' ')
          const l2 = words.slice(k).join(' ')
          if (widthOf(l1) <= maxW && widthOf(l2) <= maxW) {
            next = k
            break
          }
        }
      }
    } finally {
      document.body.removeChild(m)
    }

    setSplitAt((prev) => (prev === next ? prev : next))
  }, [text])

  useLayoutEffect(() => {
    recompute()
    const wrap = wrapRef.current
    if (!wrap) return
    const ro = new ResizeObserver(() => recompute())
    ro.observe(wrap)
    return () => ro.disconnect()
  }, [recompute])

  const words = text.trim().split(/\s+/).filter(Boolean)

  return (
    <div ref={wrapRef} className="min-w-0 w-full text-left">
      <p ref={lineRef} className={className} style={style}>
        {splitAt != null ? (
          <>
            {words.slice(0, splitAt).join(' ')}
            <br />
            {words.slice(splitAt).join(' ')}
          </>
        ) : (
          text
        )}
      </p>
    </div>
  )
}
