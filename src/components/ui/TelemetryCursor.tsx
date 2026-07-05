'use client'

import { useEffect, useState } from 'react'

type Point = {
  x: number
  y: number
}

function isInteractiveElement(target: EventTarget | null) {
  if (!(target instanceof Element)) {
    return false
  }

  return Boolean(
    target.closest(
      'button, a, input, textarea, select, summary, [role="button"], [role="link"], .cta, .cta-button, .magnetic-button',
    ),
  )
}

export function TelemetryCursor() {
  const [isClient, setIsClient] = useState(false)
  const [isTouchDevice, setIsTouchDevice] = useState(false)
  const [cursor, setCursor] = useState<Point>({ x: -100, y: -100 })
  const [ring, setRing] = useState<Point>({ x: -100, y: -100 })
  const [locked, setLocked] = useState(false)
  const [lockColor, setLockColor] = useState<'lime' | 'cyan' | 'red'>('lime')

  useEffect(() => {
    setIsClient(true)

    const coarsePointer =
      window.matchMedia('(pointer: coarse)').matches || window.matchMedia('(hover: none)').matches

    if (coarsePointer) {
      setIsTouchDevice(true)
      return
    }

    const handleMouseMove = (event: MouseEvent) => {
      const nextPoint = { x: event.clientX, y: event.clientY }

      setCursor(nextPoint)
      setRing(nextPoint)

      const nextLocked = isInteractiveElement(event.target)
      setLocked(nextLocked)

      if (nextLocked) {
        if (event.target instanceof HTMLElement && event.target.tagName === 'A') {
          setLockColor('cyan')
        } else {
          setLockColor('red')
        }
      } else {
        setLockColor('lime')
      }
    }

    const handleMouseLeave = () => {
      setCursor({ x: -100, y: -100 })
      setRing({ x: -100, y: -100 })
      setLocked(false)
      setLockColor('lime')
    }

    document.body.style.cursor = 'none'
    window.addEventListener('mousemove', handleMouseMove, { passive: true })
    window.addEventListener('mouseleave', handleMouseLeave)

    return () => {
      document.body.style.cursor = ''
      window.removeEventListener('mousemove', handleMouseMove)
      window.removeEventListener('mouseleave', handleMouseLeave)
    }
  }, [])

  if (!isClient || typeof window === 'undefined') {
    return null
  }

  if (isTouchDevice) {
    return null
  }

  const ringTone =
    lockColor === 'cyan'
      ? 'border-cyan-400/80 shadow-[0_0_18px_rgba(34,211,238,0.45)]'
      : lockColor === 'red'
        ? 'border-rose-400/80 shadow-[0_0_18px_rgba(251,113,133,0.45)]'
        : 'border-lime-500/40 shadow-[0_0_18px_rgba(132,204,22,0.24)]'

  const tickTone =
    lockColor === 'cyan'
      ? 'bg-cyan-300/80'
      : lockColor === 'red'
        ? 'bg-rose-300/80'
        : 'bg-lime-400/70'

  return (
    <>
      <div
        className="fixed left-0 top-0 z-[100] pointer-events-none"
        style={{
          transform: `translate3d(${cursor.x - 3}px, ${cursor.y - 3}px, 0)`,
          mixBlendMode: 'screen',
        }}
        aria-hidden
      >
        <div className="h-1.5 w-1.5 rounded-full bg-lime-500 shadow-[0_0_12px_rgba(163,230,53,0.9)]" />
      </div>

      <div
        className="fixed left-0 top-0 z-[100] flex h-8 w-8 items-center justify-center pointer-events-none transition-transform duration-150 ease-out"
        style={{
          transform: `translate3d(${ring.x - 16}px, ${ring.y - 16}px, 0) scale(${locked ? 1.25 : 1})`,
          mixBlendMode: 'screen',
        }}
        aria-hidden
      >
        <div
          className={`relative flex h-8 w-8 items-center justify-center rounded-full border ${ringTone} ${locked ? 'border-dashed' : 'border-solid'
            } transition-[border-color,transform,box-shadow] duration-150 ease-out`}
        >
          <span
            className={`absolute left-1/2 top-0 h-1.5 w-px -translate-x-1/2 ${tickTone}`}
          />
          <span
            className={`absolute bottom-0 left-1/2 h-1.5 w-px -translate-x-1/2 ${tickTone}`}
          />
          <span
            className={`absolute left-0 top-1/2 h-px w-1.5 -translate-y-1/2 ${tickTone}`}
          />
          <span
            className={`absolute right-0 top-1/2 h-px w-1.5 -translate-y-1/2 ${tickTone}`}
          />

          <span
            className={`h-1.5 w-1.5 rounded-full ${lockColor === 'cyan'
                ? 'bg-cyan-300 shadow-[0_0_10px_rgba(34,211,238,0.75)]'
                : lockColor === 'red'
                  ? 'bg-rose-300 shadow-[0_0_10px_rgba(251,113,133,0.75)]'
                  : 'bg-lime-400 shadow-[0_0_10px_rgba(163,230,53,0.7)]'
              }`}
          />
        </div>
      </div>
    </>
  )
}