import { useMotionValueEvent, type MotionValue } from 'framer-motion'
import { createContext, useContext, useState, type ReactNode } from 'react'
import { sectionIds } from '../data/navigation'
import { useActiveSection } from '../hooks/useActiveSection'
import { useF1ScrollMetrics } from '../hooks/useF1ScrollMetrics'

interface F1ScrollContextValue {
  scrollYProgress: MotionValue<number>
  speedKmh: MotionValue<number>
  gaugeProgress: MotionValue<number>
  rpmProgress: MotionValue<number>
  velocitySpring: MotionValue<number>
  maxSpeed: number
  gear: number
  activeSection: string
}

const F1ScrollContext = createContext<F1ScrollContextValue | null>(null)

export function F1ScrollProvider({ children }: { children: ReactNode }) {
  const metrics = useF1ScrollMetrics()
  const activeSection = useActiveSection(sectionIds)
  const [gear, setGear] = useState(1)

  useMotionValueEvent(metrics.scrollYProgress, 'change', (progress) => {
    const nextGear = Math.max(1, Math.min(8, Math.floor(progress * 8) + 1))
    setGear((prev) => (prev === nextGear ? prev : nextGear))
  })

  return (
    <F1ScrollContext.Provider value={{ ...metrics, gear, activeSection }}>
      {children}
    </F1ScrollContext.Provider>
  )
}

export function useF1Scroll() {
  const ctx = useContext(F1ScrollContext)
  if (!ctx) throw new Error('useF1Scroll must be used within F1ScrollProvider')
  return ctx
}
