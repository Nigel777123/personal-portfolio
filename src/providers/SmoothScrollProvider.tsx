import { cancelFrame, frame } from 'framer-motion'
import { ReactLenis, type LenisRef } from 'lenis/react'
import { useEffect, useRef, type ReactNode } from 'react'
import { LENIS_OPTIONS } from '../config/lenis'

/**
 * Global Lenis smooth scroll (successor to @studio-freight/react-lenis).
 * RAF is driven by Framer Motion's frame loop so useScroll / useTransform stay in sync.
 */
export function SmoothScrollProvider({ children }: { children: ReactNode }) {
  const lenisRef = useRef<LenisRef>(null)

  useEffect(() => {
    function update(data: { timestamp: number }) {
      lenisRef.current?.lenis?.raf(data.timestamp)
    }

    frame.update(update, true)
    return () => cancelFrame(update)
  }, [])

  return (
    <ReactLenis root options={LENIS_OPTIONS} ref={lenisRef}>
      {children}
    </ReactLenis>
  )
}
