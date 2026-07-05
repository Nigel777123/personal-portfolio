import { motion, useTransform } from 'framer-motion'
import { useF1Scroll } from '../../context/F1ScrollContext'
import { useMotionValueDisplay } from '../../hooks/useMotionValueDisplay'

const RADIUS = 34
const CIRCUMFERENCE = 2 * Math.PI * RADIUS

export function SpeedometerHUD() {
  const { speedKmh, gaugeProgress, gear, maxSpeed, scrollYProgress } = useF1Scroll()
  const speed = useMotionValueDisplay(speedKmh)
  const dashOffset = useTransform(gaugeProgress, (p) => CIRCUMFERENCE * (1 - p))

  // Fade in once the driver leaves the grid (hero) and fade out at the pit exit (footer)
  // so the HUD never covers hero CTAs on mobile or the footer actions on desktop.
  const hudOpacity = useTransform(
    scrollYProgress,
    [0, 0.03, 0.07, 0.92, 0.97],
    [0, 0, 1, 1, 0],
  )
  const hudY = useTransform(scrollYProgress, [0, 0.07], [24, 0])

  return (
    <motion.div
      className="pointer-events-none fixed bottom-3 right-3 z-50 sm:bottom-4 sm:right-4"
      style={{ opacity: hudOpacity, y: hudY }}
      aria-live="polite"
      aria-label={`Speed ${speed} kilometers per hour, gear ${gear}`}
    >
      <div className="glass-hud relative rounded-xl p-2 shadow-2xl f1-red-glow sm:p-3">
        <div className="racing-stripe absolute inset-x-0 top-0 rounded-t-2xl opacity-80" />

        <div className="flex items-center gap-2 pt-0.5">
          <div className="relative h-20 w-20 sm:h-20 sm:w-20">
            <svg className="-rotate-90" viewBox="0 0 100 100" aria-hidden>
              <circle
                cx="50"
                cy="50"
                r={RADIUS}
                fill="none"
                stroke="rgb(255 255 255 / 0.08)"
                strokeWidth="6"
              />
              <motion.circle
                cx="50"
                cy="50"
                r={RADIUS}
                fill="none"
                stroke="#E10600"
                strokeWidth="6"
                strokeLinecap="round"
                strokeDasharray={CIRCUMFERENCE}
                style={{ strokeDashoffset: dashOffset }}
              />
              <circle
                cx="50"
                cy="50"
                r={RADIUS}
                fill="none"
                stroke="#d4ff00"
                strokeWidth="1"
                strokeOpacity="0.25"
                strokeDasharray="4 8"
              />
            </svg>
            <div className="absolute inset-0 flex flex-col items-center justify-center">
              <span className="font-mono-data text-[8px] uppercase tracking-widest text-zinc-500">
                KM/H
              </span>
              <span className="font-display text-xl font-bold tabular-nums text-white sm:text-2xl">
                {speed}
              </span>
            </div>
          </div>

          <div className="flex flex-col gap-1.5 border-l border-white/10 pl-2.5">
            <div>
              <p className="font-mono-data text-[8px] uppercase tracking-widest text-zinc-500">
                Gear
              </p>
              <motion.p
                key={gear}
                initial={{ scale: 1.4, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                className="font-display text-3xl font-black text-[#d4ff00] sm:text-4xl"
              >
                {gear}
              </motion.p>
            </div>
            <div>
              <p className="font-mono-data text-[8px] uppercase tracking-widest text-zinc-500">
                Max
              </p>
              <p className="font-mono-data text-xs tabular-nums text-zinc-300">{maxSpeed}</p>
            </div>
          </div>
        </div>

        <p className="mt-1 text-center font-mono-data text-[7px] uppercase tracking-[0.18em] text-zinc-600">
          Telemetry HUD
        </p>
      </div>
    </motion.div>
  )
}
