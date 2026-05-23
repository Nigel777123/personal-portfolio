import { AnimatePresence, motion, useScroll, useTransform, type MotionValue } from 'framer-motion'
import { useRef, useState } from 'react'
import { experience } from '../../data/experience'
import type { ExperienceItem } from '../../types'
import { cn } from '../../utils/cn'
import { SectionHeading } from '../ui/SectionHeading'

const TRACK_PATH =
  'M 80 0 C 200 80, 0 160, 80 240 S 200 400, 80 480 S 0 640, 80 720 S 200 880, 80 960'

export function Experience() {
  const sectionRef = useRef<HTMLElement>(null)
  const [expandedId, setExpandedId] = useState<string | null>(experience[0]?.id ?? null)

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start 0.75', 'end 0.35'],
  })

  const carOffset = useTransform(scrollYProgress, [0, 1], ['0%', '100%'])
  const trackDraw = useTransform(scrollYProgress, [0, 1], [0, 1])

  return (
    <section
      id="experience"
      ref={sectionRef}
      className="section-padding relative mx-auto max-w-6xl overflow-hidden"
    >
      <SectionHeading
        eyebrow="Race Circuit"
        title="Career Grand Prix"
        subtitle="Follow the racing line — the car activates each pit stop and milestone as you scroll."
      />

      <div className="relative min-h-[600px]">
        <svg
          className="pointer-events-none absolute left-0 top-0 hidden h-full w-40 lg:block"
          viewBox="0 0 160 960"
          preserveAspectRatio="none"
          aria-hidden
        >
          <path
            d={TRACK_PATH}
            fill="none"
            stroke="rgba(255,255,255,0.1)"
            strokeWidth="4"
            strokeDasharray="6 10"
          />
          <motion.path
            d={TRACK_PATH}
            fill="none"
            stroke="#E10600"
            strokeWidth="4"
            strokeLinecap="round"
            style={{ pathLength: trackDraw }}
          />
        </svg>

        <motion.div
          className="pointer-events-none absolute left-4 top-0 z-20 hidden h-9 w-9 lg:block"
          style={{
            offsetPath: `path("${TRACK_PATH}")`,
            offsetDistance: carOffset,
            offsetRotate: 'auto',
          }}
          aria-hidden
        >
          <div className="flex h-9 w-9 items-center justify-center rounded-sm bg-[#E10600] font-display text-[10px] font-black text-white shadow-[0_0_20px_#E10600]">
            ▶
          </div>
        </motion.div>

        <div className="relative space-y-6 lg:ml-44">
          {experience.map((item, index) => (
            <CircuitStop
              key={item.id}
              item={item}
              index={index}
              scrollYProgress={scrollYProgress}
              total={experience.length}
              isOpen={expandedId === item.id}
              onToggle={() => setExpandedId(expandedId === item.id ? null : item.id)}
            />
          ))}
        </div>

        <div className="mt-8 h-1 overflow-hidden rounded-sm bg-neutral-800 lg:hidden">
          <motion.div
            className="h-full w-full origin-left bg-gradient-to-r from-[#E10600] to-[#d4ff00]"
            style={{ scaleX: scrollYProgress }}
          />
        </div>
      </div>
    </section>
  )
}

function CircuitStop({
  item,
  index,
  scrollYProgress,
  total,
  isOpen,
  onToggle,
}: {
  item: ExperienceItem
  index: number
  scrollYProgress: MotionValue<number>
  total: number
  isOpen: boolean
  onToggle: () => void
}) {
  const threshold = (index + 0.5) / total
  const borderColor = useTransform(scrollYProgress, (p) =>
    p >= threshold - 0.12 ? 'rgba(212, 255, 0, 0.55)' : 'rgba(255, 255, 255, 0.12)',
  )
  const glowOpacity = useTransform(scrollYProgress, (p) =>
    p >= threshold - 0.12 ? 1 : 0,
  )

  return (
    <motion.div
      initial={{ opacity: 0, x: 24 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true, margin: '-40px' }}
      transition={{ delay: index * 0.08 }}
    >
      <motion.div
        className="glass-pit relative cursor-pointer rounded-sm border-2 p-5"
        style={{ borderColor }}
        onClick={onToggle}
        role="button"
        tabIndex={0}
        onKeyDown={(e) => {
          if (e.key === 'Enter' || e.key === ' ') {
            e.preventDefault()
            onToggle()
          }
        }}
        aria-expanded={isOpen}
      >
        <motion.div
          className="pointer-events-none absolute inset-0 rounded-sm bg-[#d4ff00]/5"
          style={{ opacity: glowOpacity }}
        />

        <div className="relative flex flex-wrap items-start justify-between gap-3">
          <div>
            <div className="flex items-center gap-3">
              <span className="rounded-sm bg-[#E10600] px-2 py-0.5 font-mono-data text-[10px] font-bold uppercase text-white">
                {item.lap}
              </span>
              <span className="font-mono-data text-xs uppercase tracking-widest text-zinc-500">
                {item.period}
              </span>
            </div>
            <h3 className="mt-2 font-display text-xl font-bold uppercase tracking-wide text-white">
              {item.role}
            </h3>
            <p className="font-mono-data text-sm text-[#d4ff00]">{item.company}</p>
          </div>
          <span className="font-display text-3xl font-black text-white/10">
            {String(index + 1).padStart(2, '0')}
          </span>
        </div>

        <p className="relative mt-3 text-sm leading-relaxed text-zinc-400">{item.summary}</p>

        <AnimatePresence initial={false}>
          {isOpen && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: 'auto', opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="relative overflow-hidden"
            >
              <ul className={cn('mt-4 space-y-2 border-t border-dashed border-white/10 pt-4')}>
                {item.details.map((detail) => (
                  <li
                    key={detail}
                    className="flex gap-2 font-mono-data text-xs leading-relaxed text-zinc-300"
                  >
                    <span className="text-[#E10600]">▸</span>
                    {detail}
                  </li>
                ))}
              </ul>
            </motion.div>
          )}
        </AnimatePresence>

        <p className="relative mt-3 font-mono-data text-[10px] uppercase tracking-widest text-zinc-600">
          {isOpen ? '▼ Pit Stop Open' : '▶ Tap for telemetry'}
        </p>
      </motion.div>
    </motion.div>
  )
}
