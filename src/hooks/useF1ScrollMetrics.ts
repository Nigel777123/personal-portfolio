import {
  useMotionValue,
  useScroll,
  useSpring,
  useTransform,
  useVelocity,
} from 'framer-motion'
import { useLenis } from 'lenis/react'
import { useEffect } from 'react'

const MAX_SPEED = 340

/**
 * F1 HUD scroll metrics — Framer Motion values synced with Lenis via the shared frame loop.
 * Lenis callback keeps progress aligned during smooth/inertial scroll.
 */
export function useF1ScrollMetrics() {
  const { scrollYProgress, scrollY } = useScroll()

  const lenisProgress = useMotionValue(0)
  const lenisScroll = useMotionValue(0)

  useLenis((lenis) => {
    lenisProgress.set(lenis.progress)
    lenisScroll.set(lenis.scroll)
  })

  const mergedProgress = useTransform([scrollYProgress, lenisProgress], ([fm, lenis]) => {
    const a = typeof fm === 'number' ? fm : 0
    const b = typeof lenis === 'number' ? lenis : 0
    return Math.abs(a - b) > 0.001 ? b : a
  })

  const mergedScrollY = useTransform([scrollY, lenisScroll], ([fm, lenis]) => {
    const a = typeof fm === 'number' ? fm : 0
    const b = typeof lenis === 'number' ? lenis : 0
    return Math.abs(a - b) > 0.5 ? b : a
  })

  const speedKmh = useTransform(mergedProgress, [0, 1], [0, MAX_SPEED])
  const gaugeProgress = useTransform(mergedProgress, (p) => p)
  const rpmProgress = useTransform(mergedProgress, [0, 0.5, 1], [0, 0.65, 1])

  const rawVelocity = useVelocity(mergedScrollY)
  const velocitySpring = useSpring(rawVelocity, { stiffness: 400, damping: 40 })

  useEffect(() => {
    document.documentElement.classList.add('lenis')
    return () => document.documentElement.classList.remove('lenis')
  }, [])

  return {
    scrollYProgress: mergedProgress,
    speedKmh,
    gaugeProgress,
    rpmProgress,
    velocitySpring,
    maxSpeed: MAX_SPEED,
  }
}
