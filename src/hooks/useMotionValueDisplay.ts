import { useMotionValueEvent, type MotionValue } from 'framer-motion'
import { useState } from 'react'

export function useMotionValueDisplay(value: MotionValue<number>, round = true) {
  const [display, setDisplay] = useState(0)

  useMotionValueEvent(value, 'change', (v) => {
    setDisplay(round ? Math.round(v) : v)
  })

  return display
}
