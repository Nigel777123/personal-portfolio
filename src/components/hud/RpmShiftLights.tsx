import { motion, useTransform } from 'framer-motion'
import { useF1Scroll } from '../../context/F1ScrollContext'
import { cn } from '../../utils/cn'

const LIGHT_COUNT = 12

export function RpmShiftLights() {
  const { rpmProgress } = useF1Scroll()

  return (
    <div
      className="pointer-events-none fixed inset-x-0 top-[4.25rem] z-40 hidden justify-center gap-1 px-4 md:flex sm:top-[4.5rem]"
      aria-hidden
    >
      <div className="flex gap-0.5 rounded-sm border border-white/10 bg-neutral-950/80 px-2 py-1 backdrop-blur-md">
        {Array.from({ length: LIGHT_COUNT }).map((_, i) => (
          <RpmLight key={i} index={i} total={LIGHT_COUNT} progress={rpmProgress} />
        ))}
      </div>
    </div>
  )
}

function RpmLight({
  index,
  total,
  progress,
}: {
  index: number
  total: number
  progress: ReturnType<typeof useF1Scroll>['rpmProgress']
}) {
  const threshold = (index + 1) / total
  const opacity = useTransform(progress, (p) => (p >= threshold - 1 / total ? 1 : 0.15))

  const colorClass =
    index < total * 0.5
      ? 'bg-[#00ff57] shadow-[0_0_8px_#00ff57]'
      : index < total * 0.85
        ? 'bg-[#ffee00] shadow-[0_0_8px_#ffee00]'
        : 'bg-[#ff0000] shadow-[0_0_10px_#ff0000]'

  return (
    <motion.div
      className={cn('h-2.5 w-2 rounded-sm transition-colors sm:h-3 sm:w-2.5', colorClass)}
      style={{ opacity }}
    />
  )
}
