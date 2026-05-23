import { motion } from 'framer-motion'
import { skills } from '../../data/skills'
import { SectionHeading } from '../ui/SectionHeading'
import { TelemetryGauge } from '../ui/TelemetryGauge'

export function About() {
  return (
    <section id="about" className="section-padding relative mx-auto max-w-6xl">
      <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-white/20 to-transparent" />

      <SectionHeading
        eyebrow="Telemetry"
        title="Engineering DNA"
        subtitle="Driver profile and live systems diagnostics — every skill rev-mapped to race-ready output."
      />

      <div className="grid items-start gap-12 lg:grid-cols-2 lg:gap-16">
        <motion.div
          className="relative mx-auto w-full max-w-sm lg:mx-0"
          initial={{ opacity: 0, x: -24 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.55 }}
        >
          <div className="absolute -inset-1 rounded-sm bg-gradient-to-br from-[#E10600] via-neutral-800 to-[#d4ff00] opacity-80" />
          <div className="relative overflow-hidden rounded-sm border-2 border-neutral-800 bg-neutral-950 p-1">
            <div className="relative flex aspect-square flex-col items-center justify-center overflow-hidden bg-neutral-900">
              <div className="absolute inset-0 bg-[repeating-linear-gradient(0deg,transparent,transparent_2px,rgba(255,255,255,0.03)_2px,rgba(255,255,255,0.03)_4px)]" />
              <span className="font-display text-7xl font-black text-white">77</span>
              <span className="mt-2 font-mono-data text-xs uppercase tracking-[0.25em] text-[#d4ff00]">
                Driver Photo
              </span>
              <div className="absolute bottom-0 left-0 right-0 flex justify-between bg-neutral-950/90 px-3 py-2 font-mono-data text-[10px] uppercase text-zinc-500">
                <span>Tire: Soft</span>
                <span>Fuel: 100%</span>
              </div>
            </div>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          <p className="text-lg leading-relaxed text-zinc-300">
            I&apos;m a frontend developer tuned for high-RPM delivery — shipping interfaces that
            feel as responsive as a race car on warm tires.
          </p>
          <p className="mt-4 leading-relaxed text-zinc-500">
            From pit-wall prototypes to production straight-line speed, I optimize every
            millisecond of interaction and every byte of bundle weight.
          </p>

          <h3 className="mt-10 mb-4 font-display text-sm font-bold uppercase tracking-[0.2em] text-[#E10600]">
            Systems Telemetry
          </h3>
          <ul className="grid gap-3 sm:grid-cols-2">
            {skills.map((skill, i) => (
              <TelemetryGauge key={skill.name} {...skill} index={i} />
            ))}
          </ul>
        </motion.div>
      </div>
    </section>
  )
}
