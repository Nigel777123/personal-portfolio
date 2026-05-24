import { motion } from 'framer-motion'
import { ArrowDown, Flag } from 'lucide-react'
import { useCallback, useEffect, useRef, useState } from 'react'
import { typingRoles } from '../../data/skills'
import { useTypingEffect } from '../../hooks/useTypingEffect'
import { MagneticButton } from '../ui/MagneticButton'
import { LightsOut } from '../ui/LightsOut'
import { TrackBackground } from '../ui/TrackBackground'

type BadgeState = 'green' | 'radio' | 'pit'

export function Hero({ onRaceStart }: { onRaceStart?: () => void }) {
  const [raceStarted, setRaceStarted] = useState(false)
  const [badgeState, setBadgeState] = useState<BadgeState>('green')
  const badgeResetTimerRef = useRef<number | null>(null)
  const typedRole = useTypingEffect(typingRoles, 70, 2200)

  const handleLightsComplete = useCallback(() => {
    setRaceStarted(true)
    onRaceStart?.()
  }, [onRaceStart])

  const triggerPitLaneBadge = useCallback(() => {
    if (badgeResetTimerRef.current) {
      window.clearTimeout(badgeResetTimerRef.current)
      badgeResetTimerRef.current = null
    }
    setBadgeState('pit')
  }, [])

  const resetPitLaneBadge = useCallback(() => {
    setBadgeState((prev) => (prev === 'pit' ? 'green' : prev))
  }, [])

  const triggerRadioCheckBadge = useCallback(() => {
    setBadgeState('radio')

    if (badgeResetTimerRef.current) {
      window.clearTimeout(badgeResetTimerRef.current)
    }

    badgeResetTimerRef.current = window.setTimeout(() => {
      setBadgeState('green')
    }, 3000)
  }, [])

  useEffect(() => {
    return () => {
      if (badgeResetTimerRef.current) {
        window.clearTimeout(badgeResetTimerRef.current)
      }
    }
  }, [])

  return (
    <section
      id="home"
      className="relative flex min-h-screen items-center overflow-hidden pt-24 sm:pt-28 lg:pt-32"
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
            className={
              badgeState === 'radio'
                ? 'mb-6 inline-flex min-h-9 items-center gap-2 border border-[#E10600]/65 bg-[#E10600]/15 px-4 py-1.5 font-mono-data text-xs uppercase tracking-widest text-[#ff8a80]'
                : badgeState === 'pit'
                  ? 'mb-6 inline-flex min-h-9 items-center gap-2 border border-[#ffbf00]/70 bg-[#ffbf00]/16 px-4 py-1.5 font-mono-data text-xs uppercase tracking-widest text-[#ffd86a]'
                  : 'mb-6 inline-flex min-h-9 items-center gap-2 border border-[#d4ff00]/55 bg-[#d4ff00]/10 px-4 py-1.5 font-mono-data text-xs uppercase tracking-widest text-[#d4ff00]'
            }
            initial={{ opacity: 0 }}
            animate={
              raceStarted
                ? badgeState === 'radio'
                  ? {
                      opacity: [1, 0.28, 1, 0.35, 1],
                      scale: [1, 1.03, 1, 1.025, 1],
                    }
                  : badgeState === 'pit'
                    ? {
                        opacity: [1, 0.3, 1, 0.35, 1],
                        scale: [1, 1.04, 1, 1.03, 1],
                      }
                  : { opacity: 1, scale: 1 }
                : {}
            }
            transition={
              badgeState === 'radio'
                ? { delay: 0.1, duration: 0.7, ease: 'easeInOut' }
                : badgeState === 'pit'
                  ? { delay: 0.1, duration: 0.6, ease: 'easeInOut' }
                : { delay: 0.1, duration: 0.25 }
            }
          >
            <motion.span
              className={
                badgeState === 'radio'
                  ? 'h-2.5 w-2.5 rounded-full bg-[#E10600] shadow-[0_0_10px_#E10600]'
                  : badgeState === 'pit'
                    ? 'h-2.5 w-2.5 rounded-full bg-[#ffbf00] shadow-[0_0_10px_#ffbf00]'
                  : 'h-2.5 w-2.5 rounded-full bg-[#d4ff00] shadow-[0_0_10px_#d4ff00]'
              }
              animate={
                badgeState === 'radio'
                  ? { opacity: [1, 0.25, 1, 0.25, 1], scale: [1, 1.35, 1, 1.3, 1] }
                  : badgeState === 'pit'
                    ? { opacity: [1, 0.25, 1, 0.3, 1], scale: [1, 1.3, 1, 1.25, 1] }
                  : { opacity: 1, scale: 1 }
              }
              transition={
                badgeState === 'radio' || badgeState === 'pit'
                  ? { duration: 0.65, ease: 'easeInOut' }
                  : {}
              }
            />
            <Flag
              className={
                badgeState === 'radio'
                  ? 'h-4 w-4 text-[#E10600]'
                  : badgeState === 'pit'
                    ? 'h-4 w-4 text-[#ffbf00]'
                    : 'h-4 w-4 text-[#d4ff00]'
              }
            />
            {badgeState === 'radio'
              ? '📻 RADIO CHECK // BOX BOX BOX'
              : badgeState === 'pit'
                ? '🏎️ IN THE PIT LANE // ENTRANCE'
                : '🟢 GREEN LIGHT'}
          </motion.p>

          <h1 className="font-display text-4xl font-black uppercase leading-[1.05] tracking-wider text-white sm:text-5xl lg:text-7xl">
            <span className="block text-zinc-500">Driver</span>
            <span className="f1-gradient-text">Nigel Fernandes</span>
            <span className="mt-3 block text-2xl text-zinc-300 sm:text-3xl lg:text-4xl">
              <span className="text-[#E10600]">#</span>19 —{' '}
              <span className="inline-block min-w-[14ch] border-r-2 border-[#d4ff00] pr-1 text-[#d4ff00]">
                {typedRole}
              </span>
            </span>
          </h1>

          <p className="mt-6 max-w-xl text-lg leading-relaxed text-zinc-400 sm:text-xl">
            Building high performance interfaces engineered for maximum velocity.
            Turning complex telemetry into seamless, reactive digital machinery.
          </p>

          <motion.div
            className="mt-10 flex flex-wrap gap-4"
            initial={{ opacity: 0, y: 20 }}
            animate={raceStarted ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.25, duration: 0.45 }}
          >
            <MagneticButton
              href="#projects"
              variant="primary"
              onMouseEnter={triggerPitLaneBadge}
              onMouseLeave={resetPitLaneBadge}
            >
              View Garage
            </MagneticButton>
            <MagneticButton
              href="#contact"
              variant="secondary"
              onClick={triggerRadioCheckBadge}
              onMouseEnter={triggerRadioCheckBadge}
            >
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
