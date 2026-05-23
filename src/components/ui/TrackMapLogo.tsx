import { motion, useMotionValue, useMotionValueEvent, useScroll, useSpring } from 'framer-motion'
import { useEffect, useRef } from 'react'

const TRACK_PATH =
  'M10 34C10 20 22 10 38 10H76C92 10 102 18 106 30C109 39 115 43 124 43C134 43 141 50 141 60C141 71 132 78 121 78H70C59 78 52 72 48 63C44 54 38 50 30 50C21 50 15 56 15 64C15 72 21 78 29 78H46C56 78 63 73 67 65C72 53 81 45 94 45H116C122 45 126 41 126 36C126 30 122 27 116 27H96C86 27 80 23 76 17C72 11 66 8 58 8H38C23 8 10 20 10 34Z'

export function TrackMapLogo() {
  const pathRef = useRef<SVGPathElement>(null)
  const { scrollYProgress } = useScroll()
  const smoothProgress = useSpring(scrollYProgress, {
    stiffness: 180,
    damping: 30,
    mass: 0.2,
  })

  const dotX = useMotionValue(10)
  const dotY = useMotionValue(34)

  const updateDotPosition = (progress: number) => {
    const path = pathRef.current
    if (!path) return

    const length = path.getTotalLength()
    const point = path.getPointAtLength(Math.max(0, Math.min(1, progress)) * length)
    dotX.set(point.x)
    dotY.set(point.y)
  }

  useEffect(() => {
    updateDotPosition(smoothProgress.get())
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  useMotionValueEvent(smoothProgress, 'change', updateDotPosition)

  return (
    <motion.div
      className="group relative h-10 w-[72px] overflow-hidden rounded-sm border border-white/10 bg-neutral-950/75 p-1.5"
      whileHover={{ scale: 1.03 }}
      transition={{ duration: 0.2, ease: 'easeOut' }}
      aria-label="Track progress"
      role="img"
    >
      <svg viewBox="0 0 152 88" className="h-full w-full" aria-hidden>
        <defs>
          <filter id="track-dot-glow" x="-100%" y="-100%" width="300%" height="300%">
            <feGaussianBlur stdDeviation="2.4" result="blur" />
            <feMerge>
              <feMergeNode in="blur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
        </defs>

        <path
          ref={pathRef}
          d={TRACK_PATH}
          fill="none"
          stroke="rgba(82, 82, 91, 0.9)"
          strokeWidth="4"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="transition-all duration-300 group-hover:stroke-[rgba(161,161,170,0.95)]"
        />

        <motion.path
          d={TRACK_PATH}
          fill="none"
          stroke="#E10600"
          strokeWidth="2.3"
          strokeLinecap="round"
          strokeLinejoin="round"
          style={{ pathLength: smoothProgress }}
          className="opacity-80"
        />

        <motion.circle
          cx={dotX}
          cy={dotY}
          r="4"
          fill="#E10600"
          filter="url(#track-dot-glow)"
          className="drop-shadow-[0_0_8px_#E10600]"
        />
      </svg>

      <div className="pointer-events-none absolute inset-0 rounded-sm ring-1 ring-inset ring-white/5 transition-colors duration-300 group-hover:ring-[#E10600]/30" />
    </motion.div>
  )
}
