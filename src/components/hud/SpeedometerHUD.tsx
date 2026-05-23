import { motion, useTransform } from 'framer-motion'
import { useF1Scroll } from '../../context/F1ScrollContext'
import { useMotionValueDisplay } from '../../hooks/useMotionValueDisplay'

const RADIUS = 42
const CIRCUMFERENCE = 2 * Math.PI * RADIUS

export function SpeedometerHUD() {
  const { speedKmh, gaugeProgress, gear, maxSpeed } = useF1Scroll()
  const speed = useMotionValueDisplay(speedKmh)
  const dashOffset = useTransform(gaugeProgress, (p) => CIRCUMFERENCE * (1 - p))

  return (
    <div
      className="fixed bottom-4 right-4 z-50 sm:bottom-6 sm:right-6"
      aria-live="polite"
      aria-label={`Speed ${speed} kilometers per hour, gear ${gear}`}
    >
      <div className="glass-hud relative rounded-2xl p-3 shadow-2xl f1-red-glow sm:p-4">
        <div className="racing-stripe absolute inset-x-0 top-0 rounded-t-2xl opacity-80" />

        <div className="flex items-center gap-3 pt-1">
          <div className="relative h-[5.5rem] w-[5.5rem] sm:h-24 sm:w-24">
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
              <span className="font-mono-data text-[10px] uppercase tracking-widest text-zinc-500">
                KM/H
              </span>
              <span className="font-display text-2xl font-bold tabular-nums text-white sm:text-3xl">
                {speed}
              </span>
            </div>
          </div>

          <div className="flex flex-col gap-2 border-l border-white/10 pl-3">
            <div>
              <p className="font-mono-data text-[9px] uppercase tracking-widest text-zinc-500">
                Gear
              </p>
              <motion.p
                key={gear}
                initial={{ scale: 1.4, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                className="font-display text-4xl font-black text-[#d4ff00] sm:text-5xl"
              >
                {gear}
              </motion.p>
            </div>
            <div>
              <p className="font-mono-data text-[9px] uppercase tracking-widest text-zinc-500">
                Max
              </p>
              <p className="font-mono-data text-sm tabular-nums text-zinc-300">{maxSpeed}</p>
            </div>
          </div>
        </div>

        <p className="mt-2 text-center font-mono-data text-[8px] uppercase tracking-[0.2em] text-zinc-600">
          Telemetry HUD
        </p>
      </div>
    </div>
  )
}
