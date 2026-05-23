import { AnimatePresence, motion } from 'framer-motion'
import { Code2, ExternalLink, Gauge } from 'lucide-react'
import { useMemo, useState } from 'react'
import { projectFilters, projects } from '../../data/projects'
import type { Project, ProjectCategory } from '../../types'
import { cn } from '../../utils/cn'
import { SectionHeading } from '../ui/SectionHeading'

function PitLaneCard({ project }: { project: Project }) {
  return (
    <article className="glass-pit group relative flex h-full flex-col overflow-hidden rounded-sm transition-all duration-300 hover:scale-[1.02] hover:f1-tire-glow">
      <div className="absolute left-0 top-0 z-10 flex gap-1 px-2 py-1">
        <span className="bg-[#E10600] px-2 py-0.5 font-mono-data text-[9px] font-bold uppercase text-white">
          Bay {project.id}
        </span>
      </div>

      <div
        className="relative h-44 w-full overflow-hidden border-b border-white/10"
        style={{ background: project.image }}
      >
        <div className="absolute inset-0 bg-neutral-950/20 transition-colors duration-300 group-hover:bg-neutral-950/75" />
        <div className="absolute inset-0 flex flex-col items-center justify-center gap-3 p-6 opacity-0 transition-opacity duration-300 group-hover:opacity-100">
          <p className="text-center text-sm leading-relaxed text-zinc-200">{project.description}</p>
          <div className="w-full max-w-[200px]">
            <div className="mb-1 flex justify-between font-mono-data text-[9px] uppercase text-zinc-500">
              <span>Perf</span>
              <span className="text-[#d4ff00]">{project.performance}%</span>
            </div>
            <div className="h-1.5 overflow-hidden rounded-sm bg-neutral-800">
              <motion.div
                className="h-full bg-gradient-to-r from-[#E10600] to-[#d4ff00]"
                initial={{ width: 0 }}
                whileInView={{ width: `${project.performance}%` }}
                viewport={{ once: true }}
                transition={{ duration: 0.8 }}
              />
            </div>
          </div>
        </div>
      </div>

      <div className="flex flex-1 flex-col p-5">
        <div className="flex items-start justify-between gap-2">
          <h3 className="font-display text-lg font-bold uppercase tracking-wide text-white">
            {project.title}
          </h3>
          <Gauge className="h-4 w-4 shrink-0 text-[#d4ff00] opacity-60" />
        </div>

        <div className="mt-3 flex flex-wrap gap-1.5">
          {project.tech.map((tag) => (
            <span
              key={tag}
              className="rounded-sm border border-white/10 bg-neutral-800/80 px-2 py-0.5 font-mono-data text-[10px] uppercase tracking-wide text-zinc-400"
            >
              {tag}
            </span>
          ))}
        </div>

        <div className="mt-auto flex gap-4 border-t border-white/5 pt-4">
          <a
            href={project.liveUrl}
            className="inline-flex items-center gap-1.5 font-mono-data text-xs uppercase tracking-wider text-[#d4ff00] hover:text-white"
            target="_blank"
            rel="noreferrer"
          >
            <ExternalLink size={14} />
            Live
          </a>
          <a
            href={project.githubUrl}
            className="inline-flex items-center gap-1.5 font-mono-data text-xs uppercase tracking-wider text-zinc-500 hover:text-white"
            target="_blank"
            rel="noreferrer"
          >
            <Code2 size={14} />
            Source
          </a>
        </div>
      </div>
    </article>
  )
}

export function Projects() {
  const [filter, setFilter] = useState<ProjectCategory>('all')

  const filtered = useMemo(
    () => (filter === 'all' ? projects : projects.filter((p) => p.category === filter)),
    [filter],
  )

  return (
    <section id="projects" className="section-padding mx-auto max-w-6xl">
      <SectionHeading
        eyebrow="Pit Lane"
        title="Project Garage"
        subtitle="Each build staged like a garage bay — specs on hover, performance telemetry included."
      />

      <div className="mb-10 flex flex-wrap gap-2">
        {projectFilters.map(({ label, value }) => (
          <button
            key={value}
            type="button"
            onClick={() => setFilter(value)}
            className={cn(
              'rounded-sm px-4 py-2 font-display text-xs font-bold uppercase tracking-wider transition-all',
              filter === value
                ? 'bg-[#E10600] text-white f1-red-glow'
                : 'border border-white/15 bg-neutral-900 text-zinc-500 hover:border-[#d4ff00]/40 hover:text-white',
            )}
          >
            {label}
          </button>
        ))}
      </div>

      <motion.ul layout className="grid gap-6 sm:grid-cols-2">
        <AnimatePresence mode="popLayout">
          {filtered.map((project) => (
            <motion.li
              key={project.id}
              layout
              initial={{ opacity: 0, scale: 0.96 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.96 }}
              transition={{ duration: 0.3 }}
            >
              <PitLaneCard project={project} />
            </motion.li>
          ))}
        </AnimatePresence>
      </motion.ul>
    </section>
  )
}
