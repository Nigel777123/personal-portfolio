import {
  motion,
  useScroll,
  useSpring,
  useTransform,
  useVelocity,
} from 'framer-motion'
import { useF1Scroll } from '../../context/F1ScrollContext'

type SectionKey = 'home' | 'about' | 'projects' | 'experience' | 'contact'

type GlowLayer = {
  color: string
  x: number
  y: number
  opacity: number
  scale: number
  size: number
}

type AtmospherePreset = {
  primary: GlowLayer
  secondary: GlowLayer
}

const atmospherePresets: Record<SectionKey, AtmospherePreset> = {
  home: {
    primary: {
      color: 'rgba(225, 6, 0, 1)',
      x: -52,
      y: -44,
      opacity: 0.045,
      scale: 1.04,
      size: 520,
    },
    secondary: {
      color: 'rgba(255, 255, 255, 1)',
      x: 82,
      y: 96,
      opacity: 0.018,
      scale: 0.88,
      size: 300,
    },
  },
  about: {
    primary: {
      color: 'rgba(212, 255, 0, 1)',
      x: 58,
      y: -46,
      opacity: 0.042,
      scale: 1.03,
      size: 500,
    },
    secondary: {
      color: 'rgba(163, 230, 53, 1)',
      x: -84,
      y: 88,
      opacity: 0.018,
      scale: 0.88,
      size: 280,
    },
  },
  projects: {
    primary: {
      color: 'rgba(168, 85, 247, 1)',
      x: -62,
      y: 68,
      opacity: 0.044,
      scale: 1.05,
      size: 540,
    },
    secondary: {
      color: 'rgba(236, 72, 153, 1)',
      x: 78,
      y: -74,
      opacity: 0.02,
      scale: 0.84,
      size: 260,
    },
  },
  experience: {
    primary: {
      color: 'rgba(161, 161, 170, 1)',
      x: 72,
      y: 56,
      opacity: 0.026,
      scale: 1.02,
      size: 460,
    },
    secondary: {
      color: 'rgba(59, 130, 246, 1)',
      x: -84,
      y: -68,
      opacity: 0.014,
      scale: 0.8,
      size: 260,
    },
  },
  contact: {
    primary: {
      color: 'rgba(245, 158, 11, 1)',
      x: 66,
      y: 64,
      opacity: 0.042,
      scale: 1.04,
      size: 500,
    },
    secondary: {
      color: 'rgba(225, 6, 0, 1)',
      x: -82,
      y: -74,
      opacity: 0.016,
      scale: 0.84,
      size: 280,
    },
  },
}

export function RaceAtmosphereBackdrop() {
  const { activeSection } = useF1Scroll()
  const { scrollY } = useScroll()
  const scrollVelocity = useVelocity(scrollY)
  const velocitySpring = useSpring(scrollVelocity, {
    stiffness: 130,
    damping: 26,
    mass: 0.18,
  })

  const meshY = useTransform(scrollY, (value) => -value * 0.3)
  const velocityMagnitude = useTransform(velocitySpring, (value) => Math.min(Math.abs(value), 2400))
  const vignetteOpacity = useTransform(velocityMagnitude, [0, 2400], [0.22, 0.38])
  const vignetteScale = useTransform(velocityMagnitude, [0, 2400], [1, 0.985])
  const borderOpacity = useTransform(velocityMagnitude, [0, 2400], [0.26, 0.44])

  const preset = atmospherePresets[(activeSection as SectionKey) || 'experience'] ?? atmospherePresets.experience

  return (
    <div className="fixed inset-0 -z-20 overflow-hidden bg-zinc-950" aria-hidden>
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(225,6,0,0.08),transparent_35%),radial-gradient(circle_at_bottom_right,rgba(255,255,255,0.03),transparent_28%)] opacity-90" />

      <motion.div
        className="absolute inset-0 hidden will-change-transform md:block"
        style={{ y: meshY }}
      >
        <svg
          className="absolute inset-0 h-[120%] w-[120%] opacity-80"
          viewBox="0 0 1000 1000"
          preserveAspectRatio="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <defs>
            <pattern id="carbon-weave" width="26" height="26" patternUnits="userSpaceOnUse">
              <path d="M0 13H26" stroke="rgba(255,255,255,0.02)" strokeWidth="1" />
              <path d="M13 0V26" stroke="rgba(255,255,255,0.015)" strokeWidth="1" />
              <path d="M0 0L26 26" stroke="rgba(255,255,255,0.012)" strokeWidth="0.8" />
              <path d="M26 0L0 26" stroke="rgba(255,255,255,0.012)" strokeWidth="0.8" />
            </pattern>
            <pattern id="technical-grid" width="64" height="64" patternUnits="userSpaceOnUse">
              <path d="M64 0H0V64" fill="none" stroke="rgba(113,113,122,0.4)" strokeWidth="0.85" />
              <path d="M32 0V64M0 32H64" fill="none" stroke="rgba(63,63,70,0.35)" strokeWidth="0.65" />
            </pattern>
          </defs>

          <rect width="100%" height="100%" fill="url(#carbon-weave)" />
          <rect width="100%" height="100%" fill="url(#technical-grid)" opacity="0.92" />
          <rect width="100%" height="100%" fill="none" stroke="rgba(63,63,70,0.4)" strokeWidth="1" />
        </svg>
      </motion.div>

      <motion.div
        className="absolute left-[-18%] top-[-20%] rounded-full blur-3xl mix-blend-screen will-change-transform"
        style={{
          width: preset.primary.size,
          height: preset.primary.size,
          background: `radial-gradient(circle, ${preset.primary.color} 0%, rgba(255,255,255,0.08) 38%, transparent 72%)`,
        }}
        animate={{
          x: preset.primary.x,
          y: preset.primary.y,
          opacity: preset.primary.opacity,
          scale: preset.primary.scale,
        }}
        transition={{ type: 'spring', stiffness: 55, damping: 18, mass: 0.6 }}
      />

      <motion.div
        className="absolute right-[-16%] bottom-[-18%] rounded-full blur-3xl mix-blend-screen will-change-transform"
        style={{
          width: preset.secondary.size,
          height: preset.secondary.size,
          background: `radial-gradient(circle, ${preset.secondary.color} 0%, rgba(255,255,255,0.05) 42%, transparent 74%)`,
        }}
        animate={{
          x: preset.secondary.x,
          y: preset.secondary.y,
          opacity: preset.secondary.opacity,
          scale: preset.secondary.scale,
        }}
        transition={{ type: 'spring', stiffness: 52, damping: 20, mass: 0.6 }}
      />

      <motion.div
        className="absolute inset-0 will-change-transform"
        style={{ opacity: vignetteOpacity, scale: vignetteScale }}
      >
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_42%,rgba(10,10,10,0.66)_100%)]" />
        <motion.div
          className="absolute inset-0 border border-zinc-900/40"
          style={{ opacity: borderOpacity }}
        />
      </motion.div>
    </div>
  )
}
