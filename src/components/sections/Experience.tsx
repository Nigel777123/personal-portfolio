import { AnimatePresence, motion } from 'framer-motion'
import { ChevronDown } from 'lucide-react'
import { useState } from 'react'
import { experience } from '../../data/experience'
import { cn } from '../../utils/cn'
import { SectionHeading } from '../ui/SectionHeading'

export function Experience() {
  const [expandedId, setExpandedId] = useState<string | null>(experience[0]?.id ?? null)

  return (
    <section id="experience" className="section-padding mx-auto max-w-6xl">
      <SectionHeading
        eyebrow="Experience"
        title="Where I've grown"
        subtitle="Tap a milestone to explore impact, responsibilities, and wins."
      />

      <div className="relative ml-3 border-l border-gradient-to-b from-violet-500/50 to-cyan-500/30 pl-8 sm:ml-6">
        {experience.map((item, index) => {
          const isOpen = expandedId === item.id
          return (
            <motion.div
              key={item.id}
              className="relative pb-10 last:pb-0"
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: '-60px' }}
              transition={{ delay: index * 0.1, duration: 0.45 }}
            >
              <span className="absolute -left-[2.4rem] top-1.5 flex h-4 w-4 items-center justify-center rounded-full bg-zinc-950 ring-2 ring-violet-500 sm:-left-[2.65rem]">
                <span className="h-2 w-2 rounded-full bg-gradient-to-br from-violet-400 to-cyan-400" />
              </span>

              <button
                type="button"
                onClick={() => setExpandedId(isOpen ? null : item.id)}
                className="w-full text-left"
                aria-expanded={isOpen}
              >
                <div className="glass group rounded-2xl p-5 transition-colors hover:border-cyan-500/30">
                  <div className="flex items-start justify-between gap-4">
                    <div>
                      <p className="text-xs font-semibold uppercase tracking-wider text-cyan-400/90">
                        {item.period}
                      </p>
                      <h3 className="mt-1 text-lg font-semibold text-white group-hover:gradient-text">
                        {item.role}
                      </h3>
                      <p className="text-sm text-zinc-400">{item.company}</p>
                    </div>
                    <motion.span
                      animate={{ rotate: isOpen ? 180 : 0 }}
                      transition={{ duration: 0.25 }}
                      className="mt-1 shrink-0 text-zinc-500"
                    >
                      <ChevronDown size={20} />
                    </motion.span>
                  </div>
                  <p className="mt-3 text-sm leading-relaxed text-zinc-400">{item.summary}</p>

                  <AnimatePresence initial={false}>
                    {isOpen && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: 'auto', opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.3 }}
                        className="overflow-hidden"
                      >
                        <ul className={cn('mt-4 space-y-2 border-t border-white/10 pt-4')}>
                          {item.details.map((detail) => (
                            <li
                              key={detail}
                              className="flex gap-2 text-sm leading-relaxed text-zinc-300"
                            >
                              <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-gradient-to-r from-violet-400 to-cyan-400" />
                              {detail}
                            </li>
                          ))}
                        </ul>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              </button>
            </motion.div>
          )
        })}
      </div>
    </section>
  )
}
