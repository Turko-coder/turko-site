'use client'

import * as React from 'react'

const CITIES = [
  { cx: 271, cy: 56, r: 16, name: 'Tallinn' },
  { cx: 444.5, cy: 231.5, r: 12.5, name: 'Tartu' },
  { cx: 559, cy: 54.285, r: 7, name: 'Narva' },
] as const

const MAP_STROKE_WIDTH = 8
/** 1.5s ping × 3 = 4.5s per city */
const PING_CYCLE_MS = 4500
const RESUME_PING_AFTER_HOVER_MS = 1000

type CityHoverSource = 'hover' | 'auto'

type CityHoverPayload = {
  name: string
  source: CityHoverSource
}

type EstoniaMapProps = React.SVGProps<SVGSVGElement> & {
  onCityHover?: (payload: CityHoverPayload | null) => void
  onCityClick?: (city: string) => void
  externalHoveredCity?: string | null
}

export default function EstoniaMap({ onCityHover, onCityClick, externalHoveredCity = null, ...props }: EstoniaMapProps) {
  const [hoveredCity, setHoveredCity] = React.useState<string | null>(null)
  const [pingIndex, setPingIndex] = React.useState(0)
  const [pauseAfterHover, setPauseAfterHover] = React.useState(false)
  const resumeTimeoutRef = React.useRef<ReturnType<typeof setTimeout> | null>(null)
  const prevExternalHoveredCityRef = React.useRef<string | null>(null)

  // Интервал тикает только когда нет наведения и нет паузы после наведения.
  // Так после снятия курсора текущий город всегда получает полные 4,5 с.
  React.useEffect(() => {
    if (hoveredCity || externalHoveredCity || pauseAfterHover) return
    const t = setInterval(() => {
      setPingIndex((i) => (i + 1) % CITIES.length)
    }, PING_CYCLE_MS)
    return () => clearInterval(t)
  }, [hoveredCity, externalHoveredCity, pauseAfterHover])

  React.useEffect(() => {
    if (!onCityHover) return
    if (hoveredCity) return
    if (externalHoveredCity) return
    if (pauseAfterHover) return
    const city = CITIES[pingIndex]?.name
    if (city) {
      onCityHover({ name: city, source: 'auto' })
    }
  }, [pingIndex, hoveredCity, externalHoveredCity, pauseAfterHover, onCityHover])

  React.useEffect(() => {
    const prevExternal = prevExternalHoveredCityRef.current
    if (prevExternal === externalHoveredCity) return

    if (externalHoveredCity) {
      if (resumeTimeoutRef.current) {
        clearTimeout(resumeTimeoutRef.current)
        resumeTimeoutRef.current = null
      }
      setPauseAfterHover(false)
    } else if (prevExternal) {
      const idx = CITIES.findIndex((c) => c.name === prevExternal)
      if (idx >= 0) {
        setPingIndex((idx + 1) % CITIES.length)
      }
      setPauseAfterHover(true)
      resumeTimeoutRef.current = setTimeout(() => {
        resumeTimeoutRef.current = null
        setPauseAfterHover(false)
      }, RESUME_PING_AFTER_HOVER_MS)
    }

    prevExternalHoveredCityRef.current = externalHoveredCity
  }, [externalHoveredCity])

  const handleEnter = (name: string) => {
    if (resumeTimeoutRef.current) {
      clearTimeout(resumeTimeoutRef.current)
      resumeTimeoutRef.current = null
    }
    setPauseAfterHover(false)
    setHoveredCity(name)
    onCityHover?.({ name, source: 'hover' })
  }

  const handleLeave = () => {
    const wasHovered = hoveredCity
    setHoveredCity(null)
    onCityHover?.(null)
    // Следующий город в порядке Tallinn → Tartu → Narva → Tallinn
    const idx = CITIES.findIndex((c) => c.name === wasHovered)
    if (idx >= 0) {
      setPingIndex((idx + 1) % CITIES.length)
    }
    setPauseAfterHover(true)
    resumeTimeoutRef.current = setTimeout(() => {
      resumeTimeoutRef.current = null
      setPauseAfterHover(false)
    }, RESUME_PING_AFTER_HOVER_MS)
  }

  React.useEffect(() => () => {
    if (resumeTimeoutRef.current) clearTimeout(resumeTimeoutRef.current)
  }, [])

  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="578"
      height="377"
      fill="none"
      viewBox="0 0 578 377"
      {...props}
    >
      <path
        stroke="#177AE5"
        strokeWidth="8"
        d="m516.989 278.731 3.023 1.569a6.267 6.267 0 0 1 2.751 8.296 6.27 6.27 0 0 0 .067 5.603l7.843 15.233c1.739 3.378-.713 7.399-4.513 7.399a5.08 5.08 0 0 0-4.448 2.631l-16.075 29.248a10 10 0 0 0-.912 2.288l-2.615 10.008c-1.519 5.812-7.783 8.982-13.366 6.765l-19.95-7.921a10 10 0 0 0-7.514.054l-28.779 11.909a10 10 0 0 1-7.885-.102l-13.011-5.783a10 10 0 0 1-5.028-4.968l-6.968-15.188a10 10 0 0 0-3.87-4.359l-9.481-5.802a10 10 0 0 1-4.781-8.53v-2.302a10 10 0 0 0-7.742-9.742l-11.347-2.629a10 10 0 0 1-2.906-1.178l-45.409-27.379a10 10 0 0 0-9.4-.495l-53.709 25.119a10 10 0 0 1-12.454-3.36l-3.631-5.235a10 10 0 0 1-1.612-7.539l7.6-40.604a10 10 0 0 1 1.893-4.245l4.54-5.921a10 10 0 0 0-1.194-13.469l-.358-.327a10 10 0 0 0-10.106-2.032l-4.087 1.459a10 10 0 0 0-5.982 5.858l-2.862 7.512a10 10 0 0 1-5.527 5.683l-2.542 1.05a10 10 0 0 1-9.525-1.031l-23.722-16.485a10 10 0 0 1-2.524-2.531l-21.266-30.815a10 10 0 0 1-1.6-7.516l2.841-15.208a6.4 6.4 0 0 1 4.132-4.843c3.439-1.235 5.152-5.114 3.723-8.477a6.36 6.36 0 0 0-5.851-3.871h-.95a7.794 7.794 0 0 1-7.65-6.301l-1.995-10.224a5.97 5.97 0 0 1 2.789-6.265c3.305-1.983 3.893-6.531 1.202-9.29l-2.051-2.102a8.3 8.3 0 0 1-2.305-6.713l2.985-26.683a10 10 0 0 1 5.466-7.832l14.826-7.413a10 10 0 0 1 3.058-.955l22.093-3.156a9.33 9.33 0 0 0 8.009-9.234 9.33 9.33 0 0 1 7.039-9.042l8.908-2.254a10 10 0 0 0 6.832-5.98l1.56-3.899a8 8 0 0 1 3.634-4.072l2.117-1.14a5.665 5.665 0 0 1 7.753 2.455c1.543 3.086 5.463 4.088 8.297 2.12l12.965-8.998a7.1 7.1 0 0 0 3.053-5.837v-3.148a3.956 3.956 0 0 1 6.682-2.867l9.543 9.074a10 10 0 0 0 10.629 2.029L336.037 12.4a6.32 6.32 0 0 1 6.878 1.45c3.432 3.512 9.406 1.932 10.61-2.827 1.211-4.792 7.225-6.374 10.637-2.799l5.781 6.056a10 10 0 0 0 5.388 2.923l50.882 9.555a9.82 9.82 0 0 0 6.735-1.153 9.824 9.824 0 0 1 11.741 1.43l12.902 12.441a10 10 0 0 0 6.941 2.802h41.765l35.116 3.696a10 10 0 0 0 5.893-1.198l8.991-4.98a10 10 0 0 1 12.2 1.97l2.607 2.83a10 10 0 0 1 2.205 9.717l-2.837 9.218a10 10 0 0 1-6.395 6.546l-6.296 2.099a10 10 0 0 0-6.288 6.217l-11.405 32.967a10 10 0 0 1-12.18 6.35l-8.193-2.325a10 10 0 0 0-2.73-.38h-14.043a10 10 0 0 0-5.008 1.345l-27.916 16.151a10 10 0 0 0-4.992 8.656v7.53a10 10 0 0 0 6.368 9.317l3.824 1.491a10 10 0 0 1 5.999 6.628l14.34 51.367a10 10 0 0 0 5.073 6.212l1.613.826a10 10 0 0 1 5.385 7.835l4.15 38.74a9.77 9.77 0 0 0 5.211 7.628ZM38.295 282.977l-9.018 14.93c-2.61 4.321-8.397 5.413-12.402 2.34a8.47 8.47 0 0 1-3.312-6.717v-12.096a10 10 0 0 1 1.269-4.876l5.57-9.975a10 10 0 0 0-2.208-12.456l-2.67-2.297a6.98 6.98 0 0 0-4.549-1.688A6.974 6.974 0 0 1 4 243.167v-4.052a10 10 0 0 1 4.751-8.512l2.103-1.296c4.52-2.788 5.858-8.752 2.961-13.204l-.612-.941a8.304 8.304 0 0 1 6.96-12.834h19.985a7.99 7.99 0 0 0 7.262-4.655 7.99 7.99 0 0 1 7.263-4.656H83.66c1.724 0 3.42-.446 4.92-1.294l3.972-2.245a10 10 0 0 1 10.415.351l18.18 11.957c6.374 4.193 5.895 13.692-.869 17.221l-6.628 3.458a10 10 0 0 0-2.567 1.918l-18.364 19.012a10 10 0 0 1-4.533 2.693l-41.11 11.341a10 10 0 0 0-7.341 9.639v10.739c0 1.822-.498 3.61-1.44 5.17ZM78.421 163.96l-.376 1.58a8.577 8.577 0 0 1-16.92-1.987v-7.786a10 10 0 0 0-3.087-7.226l-3.744-3.581a8.674 8.674 0 0 0-10.4-1.203 8.67 8.67 0 0 1-8.435.211l-9.424-4.942a8.469 8.469 0 0 1 3.933-15.968h23.066a10 10 0 0 0 9.78-7.914l.929-4.356a8.346 8.346 0 0 1 8.162-6.604h2.094a6.25 6.25 0 0 1 6.252 6.251 6.25 6.25 0 0 0 5.256 6.172l6.483 1.046a10 10 0 0 1 6.278 3.704l14.215 18.136c2.137 2.726.194 6.717-3.27 6.717a4.15 4.15 0 0 0-3.012 1.293l-5.378 5.66a10 10 0 0 1-7.25 3.113H88.15a10 10 0 0 0-9.729 7.684ZM122.529 184.237v-1.113c0-5.545 5.262-9.58 10.617-8.142a8.43 8.43 0 0 1 6.243 8.142v7.145a7.026 7.026 0 0 1-13.282 3.2l-2.559-5.003a9.3 9.3 0 0 1-1.019-4.229ZM136.343 123.909l-6.93.668a6.31 6.31 0 0 1-6.637-4.426c-1.248-4.058 1.786-8.166 6.032-8.166h6.962a5.98 5.98 0 0 1 5.296 3.207c1.965 3.759-.502 8.31-4.723 8.717Z"
      />
      {CITIES.map(({ cx, cy, r, name }, index) => {
        const isHovered = hoveredCity === name || externalHoveredCity === name
        const isPinging = !hoveredCity && !externalHoveredCity && !pauseAfterHover && pingIndex === index
        return (
          <g
            key={name}
            style={{ cursor: 'pointer' }}
            onMouseEnter={() => handleEnter(name)}
            onMouseLeave={handleLeave}
            onClick={() => onCityClick?.(name)}
          >
            {isPinging && (
              <g transform={`translate(${cx}, ${cy})`}>
                <g className="city-ping-ring" style={{ transformOrigin: '0 0' }}>
                  <circle cx={0} cy={0} r={r} fill="#177AE5" opacity={0.75} />
                </g>
              </g>
            )}
            <circle
              cx={cx}
              cy={cy}
              r={r}
              fill={isHovered ? '#fff' : '#177AE5'}
              stroke="#177AE5"
              strokeWidth={isHovered ? MAP_STROKE_WIDTH : 0}
            />
          </g>
        )
      })}
    </svg>
  )
}
