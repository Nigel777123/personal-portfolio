import { motion } from 'framer-motion'

interface TelemetryGaugeProps {
  name: string
  level: number
  index: number
  unit?: string
}

export function TelemetryGauge({ name, level, index, unit = '%' }: TelemetryGaugeProps) {
  return (
    <motion.li
      className="glass-hud rounded-xl border border-white/5 p-4"
      initial={{ opacity: 0, y: 12 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-40px' }}
      transition={{ delay: index * 0.07, duration: 0.4 }}
    >
      <div className="mb-3 flex items-end justify-between gap-2">
        <span className="text-xs font-bold uppercase tracking-wider text-zinc-300">{name}</span>
        <span className="font-mono-data text-lg font-semibold tabular-nums text-[#d4ff00]">
          {level}
          <span className="text-xs text-zinc-500">{unit}</span>
        </span>
      </div>

      <div className="relative h-3 overflow-hidden rounded-sm bg-neutral-800">
        <div className="absolute inset-0 flex">
          {Array.from({ length: 10 }).map((_, i) => (
            <div key={i} className="flex-1 border-r border-neutral-950/80 last:border-0" />
          ))}
        </div>
        <motion.div
          className="relative h-full origin-left bg-gradient-to-r from-[#E10600] via-[#ff4444] to-[#d4ff00]"
          initial={{ scaleX: 0 }}
          whileInView={{ scaleX: level / 100 }}
          viewport={{ once: true }}
          transition={{ duration: 1.1, delay: 0.15 + index * 0.06, ease: [0.22, 1, 0.36, 1] }}
          style={{ width: '100%' }}
        />
      </div>

      <div className="mt-2 flex justify-between font-mono-data text-[9px] uppercase tracking-widest text-zinc-600">
        <span>Idle</span>
        <span>Optimal</span>
        <span>Max</span>
      </div>
    </motion.li>
  )
}
