import { motion } from 'framer-motion'
import { skills } from '../../data/skills'
import { SectionHeading } from '../ui/SectionHeading'

function SkillBar({ name, level, index }: { name: string; level: number; index: number }) {
  return (
    <motion.li
      className="space-y-2"
      initial={{ opacity: 0, x: -16 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true, margin: '-40px' }}
      transition={{ delay: index * 0.08, duration: 0.45 }}
    >
      <div className="flex justify-between text-sm">
        <span className="font-medium text-zinc-200">{name}</span>
        <span className="text-zinc-500">{level}%</span>
      </div>
      <div className="h-2 overflow-hidden rounded-full bg-zinc-800">
        <motion.div
          className="h-full rounded-full bg-gradient-to-r from-violet-500 to-cyan-400"
          initial={{ width: 0 }}
          whileInView={{ width: `${level}%` }}
          viewport={{ once: true }}
          transition={{ duration: 1, delay: 0.2 + index * 0.06, ease: [0.22, 1, 0.36, 1] }}
        />
      </div>
    </motion.li>
  )
}

export function About() {
  return (
    <section id="about" className="section-padding mx-auto max-w-6xl">
      <SectionHeading
        eyebrow="About"
        title="Story, craft, and curiosity"
        subtitle="A designer-minded engineer who cares about the details users feel — not just the ones they see."
      />

      <div className="grid items-center gap-12 lg:grid-cols-2 lg:gap-16">
        <motion.div
          className="relative mx-auto w-full max-w-sm lg:mx-0"
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <div className="absolute -inset-1 animate-pulse rounded-3xl bg-gradient-to-br from-violet-500 via-fuchsia-500 to-cyan-400 opacity-70 blur-sm" />
          <div className="gradient-border relative overflow-hidden rounded-3xl p-1">
            <div className="relative flex aspect-square items-center justify-center overflow-hidden rounded-[1.35rem] bg-zinc-900">
              <div className="absolute inset-0 bg-gradient-to-br from-violet-600/30 via-transparent to-cyan-500/20" />
              <motion.div
                className="text-center"
                whileHover={{ scale: 1.05 }}
                transition={{ type: 'spring', stiffness: 300 }}
              >
                <span className="text-6xl font-bold gradient-text">YN</span>
                <p className="mt-2 text-sm text-zinc-500">Your photo here</p>
              </motion.div>
            </div>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.55 }}
        >
          <p className="text-lg leading-relaxed text-zinc-300">
            I&apos;m a frontend developer with a passion for interfaces that feel alive. Over the
            past five years I&apos;ve helped startups and agencies ship products that balance
            performance, accessibility, and brand personality.
          </p>
          <p className="mt-4 leading-relaxed text-zinc-400">
            When I&apos;m not coding, you&apos;ll find me exploring motion design, contributing to
            open source, or refining side projects that push my craft forward.
          </p>

          <h3 className="mt-10 mb-6 text-sm font-semibold uppercase tracking-widest text-zinc-500">
            Core skills
          </h3>
          <ul className="space-y-4">
            {skills.map((skill, i) => (
              <SkillBar key={skill.name} {...skill} index={i} />
            ))}
          </ul>
        </motion.div>
      </div>
    </section>
  )
}
