import { AnimatePresence, motion } from 'framer-motion'
import { useEffect, useState } from 'react'

interface LightsOutProps {
  onComplete: () => void
}

const LIGHT_DELAY_MS = 550
const HOLD_MS = 700
const LIGHT_COUNT = 5

export function LightsOut({ onComplete }: LightsOutProps) {
  const [activeCount, setActiveCount] = useState(0)
  const [allOff, setAllOff] = useState(false)
  const [done, setDone] = useState(false)

  useEffect(() => {
    if (activeCount < LIGHT_COUNT) {
      const t = setTimeout(() => setActiveCount((c) => c + 1), LIGHT_DELAY_MS)
      return () => clearTimeout(t)
    }

    const hold = setTimeout(() => setAllOff(true), HOLD_MS)
    return () => clearTimeout(hold)
  }, [activeCount])

  useEffect(() => {
    if (!allOff) return
    const t = setTimeout(() => {
      setDone(true)
      onComplete()
    }, 400)
    return () => clearTimeout(t)
  }, [allOff, onComplete])

  if (done) return null

  return (
    <AnimatePresence>
      <motion.div
        className="fixed inset-0 z-[100] flex flex-col items-center justify-center bg-neutral-950"
        exit={{ opacity: 0 }}
        transition={{ duration: 0.5 }}
      >
        <p className="mb-10 font-display text-xs uppercase tracking-[0.35em] text-zinc-500 sm:text-sm">
          Formation Lap
        </p>
        <div className="flex gap-3 sm:gap-4">
          {Array.from({ length: LIGHT_COUNT }).map((_, i) => {
            const isOn = !allOff && i < activeCount
            return (
              <motion.div
                key={i}
                className="h-12 w-12 rounded-full border-2 border-zinc-800 sm:h-16 sm:w-16"
                animate={{
                  backgroundColor: isOn ? '#E10600' : '#1a1a1a',
                  boxShadow: isOn
                    ? '0 0 32px rgba(225, 6, 0, 0.85), 0 0 64px rgba(225, 6, 0, 0.35)'
                    : '0 0 0 rgba(0,0,0,0)',
                  scale: isOn ? 1 : 0.92,
                }}
                transition={{ duration: 0.2 }}
              />
            )
          })}
        </div>
        <motion.p
          className="mt-12 font-display text-sm font-bold uppercase tracking-widest text-[#E10600] sm:text-base"
          animate={{ opacity: allOff ? 1 : 0 }}
        >
          Lights Out — Away We Go!
        </motion.p>
      </motion.div>
    </AnimatePresence>
  )
}
