import { motion } from 'framer-motion'
import { ArrowDown, Flag } from 'lucide-react'
import { useCallback, useState } from 'react'
import { typingRoles } from '../../data/skills'
import { useTypingEffect } from '../../hooks/useTypingEffect'
import { MagneticButton } from '../ui/MagneticButton'
import { LightsOut } from '../ui/LightsOut'
import { TrackBackground } from '../ui/TrackBackground'

export function Hero() {
  const [raceStarted, setRaceStarted] = useState(false)
  const typedRole = useTypingEffect(typingRoles, 70, 2200)

  const handleLightsComplete = useCallback(() => setRaceStarted(true), [])

  return (
    <section
      id="home"
      className="relative flex min-h-screen items-center overflow-hidden pt-28"
    >
      {!raceStarted && <LightsOut onComplete={handleLightsComplete} />}
      <TrackBackground />

      <div className="section-padding relative z-10 mx-auto w-full max-w-6xl">
        <motion.div
          initial={{ opacity: 0, x: -80 }}
          animate={raceStarted ? { opacity: 1, x: 0 } : { opacity: 0, x: -80 }}
          transition={{ duration: 0.55, ease: [0.16, 1, 0.3, 1] }}
          className="max-w-3xl"
        >
          <motion.p
            className="mb-6 inline-flex items-center gap-2 border border-[#E10600]/40 bg-[#E10600]/10 px-4 py-1.5 font-mono-data text-xs uppercase tracking-widest text-[#ff6b6b]"
            initial={{ opacity: 0 }}
            animate={raceStarted ? { opacity: 1 } : {}}
            transition={{ delay: 0.1 }}
          >
            <Flag className="h-4 w-4 text-[#d4ff00]" />
            P1 — On the Grid
          </motion.p>

          <h1 className="font-display text-4xl font-black uppercase leading-[1.05] tracking-wider text-white sm:text-5xl lg:text-7xl">
            <span className="block text-zinc-500">Driver</span>
            <span className="f1-gradient-text">Your Name</span>
            <span className="mt-3 block text-2xl text-zinc-300 sm:text-3xl lg:text-4xl">
              <span className="text-[#E10600]">#</span>77 —{' '}
              <span className="inline-block min-w-[14ch] border-r-2 border-[#d4ff00] pr-1 text-[#d4ff00]">
                {typedRole}
              </span>
            </span>
          </h1>

          <p className="mt-6 max-w-xl text-lg leading-relaxed text-zinc-400 sm:text-xl">
            Engineering interfaces at qualifying pace — precision telemetry, ruthless performance,
            and podium-worthy motion design.
          </p>

          <motion.div
            className="mt-10 flex flex-wrap gap-4"
            initial={{ opacity: 0, y: 20 }}
            animate={raceStarted ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.25, duration: 0.45 }}
          >
            <MagneticButton href="#projects" variant="primary">
              View Garage
            </MagneticButton>
            <MagneticButton href="#contact" variant="secondary">
              Radio Check
            </MagneticButton>
          </motion.div>
        </motion.div>

        <motion.a
          href="#about"
          className="absolute bottom-8 left-1/2 flex -translate-x-1/2 flex-col items-center gap-2 font-mono-data text-xs uppercase tracking-widest text-zinc-600 transition-colors hover:text-[#d4ff00]"
          initial={{ opacity: 0 }}
          animate={raceStarted ? { opacity: 1 } : {}}
          transition={{ delay: 0.6 }}
          aria-label="Scroll to about section"
        >
          <span>Pit Entry</span>
          <motion.span animate={{ y: [0, 6, 0] }} transition={{ repeat: Infinity, duration: 1.4 }}>
            <ArrowDown size={20} />
          </motion.span>
        </motion.a>
      </div>

      <div
        className="pointer-events-none absolute -right-20 top-1/4 h-72 w-72 rounded-full bg-[#E10600]/20 blur-3xl"
        aria-hidden
      />
    </section>
  )
}
