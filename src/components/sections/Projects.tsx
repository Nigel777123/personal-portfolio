import { AnimatePresence, motion } from 'framer-motion'
import { Code2, ExternalLink } from 'lucide-react'
import { useMemo, useState } from 'react'
import { projectFilters, projects } from '../../data/projects'
import type { ProjectCategory } from '../../types'
import { cn } from '../../utils/cn'
import { SectionHeading } from '../ui/SectionHeading'

export function Projects() {
  const [filter, setFilter] = useState<ProjectCategory>('all')

  const filtered = useMemo(
    () => (filter === 'all' ? projects : projects.filter((p) => p.category === filter)),
    [filter],
  )

  return (
    <section id="projects" className="section-padding mx-auto max-w-6xl">
      <SectionHeading
        eyebrow="Work"
        title="Selected projects"
        subtitle="A snapshot of recent builds — from dashboards to design systems."
      />

      <div className="mb-10 flex flex-wrap gap-2">
        {projectFilters.map(({ label, value }) => (
          <button
            key={value}
            type="button"
            onClick={() => setFilter(value)}
            className={cn(
              'rounded-full px-4 py-2 text-sm font-medium transition-all',
              filter === value
                ? 'bg-gradient-to-r from-violet-600 to-cyan-500 text-white shadow-md shadow-violet-500/20'
                : 'border border-white/10 bg-white/5 text-zinc-400 hover:border-white/20 hover:text-white',
            )}
          >
            {label}
          </button>
        ))}
      </div>

      <motion.ul layout className="grid gap-6 sm:grid-cols-2 lg:grid-cols-2 xl:grid-cols-2">
        <AnimatePresence mode="popLayout">
          {filtered.map((project) => (
            <motion.li
              key={project.id}
              layout
              initial={{ opacity: 0, scale: 0.96 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.96 }}
              transition={{ duration: 0.35 }}
              className="group"
            >
              <article className="glass relative flex h-full flex-col overflow-hidden rounded-2xl transition-shadow duration-300 hover:shadow-xl hover:shadow-violet-500/10">
                <div
                  className="relative h-48 w-full overflow-hidden"
                  style={{ background: project.image }}
                >
                  <div className="absolute inset-0 bg-zinc-950/0 transition-colors duration-300 group-hover:bg-zinc-950/60" />
                  <motion.p
                    className="absolute inset-0 flex items-center justify-center p-6 text-center text-sm leading-relaxed text-zinc-200 opacity-0 transition-opacity duration-300 group-hover:opacity-100"
                    initial={false}
                  >
                    {project.description}
                  </motion.p>
                </div>

                <div className="flex flex-1 flex-col p-5">
                  <h3 className="text-lg font-semibold text-white">{project.title}</h3>
                  <div className="mt-3 flex flex-wrap gap-2">
                    {project.tech.map((tag) => (
                      <span
                        key={tag}
                        className="rounded-md bg-white/5 px-2.5 py-1 text-xs text-zinc-400 ring-1 ring-white/10"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>

                  <div className="mt-auto flex gap-3 pt-5">
                    <a
                      href={project.liveUrl}
                      className="inline-flex items-center gap-1.5 text-sm font-medium text-cyan-400 transition-colors hover:text-cyan-300"
                      target="_blank"
                      rel="noreferrer"
                    >
                      <ExternalLink size={16} />
                      Live Demo
                    </a>
                    <a
                      href={project.githubUrl}
                      className="inline-flex items-center gap-1.5 text-sm font-medium text-zinc-400 transition-colors hover:text-white"
                      target="_blank"
                      rel="noreferrer"
                    >
                      <Code2 size={16} />
                      GitHub
                    </a>
                  </div>
                </div>
              </article>
            </motion.li>
          ))}
        </AnimatePresence>
      </motion.ul>
    </section>
  )
}
