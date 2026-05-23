import { useScroll, useTransform, useVelocity, useSpring } from 'framer-motion'

const MAX_SPEED = 340

export function useF1ScrollMetrics() {
  const { scrollYProgress, scrollY } = useScroll()

  const speedKmh = useTransform(scrollYProgress, [0, 1], [0, MAX_SPEED])
  const gaugeProgress = useTransform(scrollYProgress, [0, 1], [0, 1])

  const rawVelocity = useVelocity(scrollY)
  const velocitySpring = useSpring(rawVelocity, { stiffness: 400, damping: 40 })

  const rpmProgress = useTransform(scrollYProgress, [0, 0.5, 1], [0, 0.65, 1])

  return {
    scrollYProgress,
    speedKmh,
    gaugeProgress,
    rpmProgress,
    velocitySpring,
    maxSpeed: MAX_SPEED,
  }
}
