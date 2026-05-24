import { motion } from 'framer-motion'
import { useState } from 'react'
import { skills } from '../../data/skills'
import { SectionHeading } from '../ui/SectionHeading'
import { TelemetryGauge } from '../ui/TelemetryGauge'

export function About() {
  const [radioFeedActive, setRadioFeedActive] = useState(false)

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
          className="relative mx-auto w-full max-w-md lg:mx-0"
          initial={{ opacity: 0, x: -24 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.55 }}
        >
          <div className="absolute -inset-1 rounded-sm bg-gradient-to-br from-[#E10600] via-neutral-800 to-[#d4ff00] opacity-80" />
          <div className="relative overflow-hidden rounded-sm border-2 border-neutral-800 bg-neutral-950 p-1">
            {/* Outer gradient/border is preserved above */}
            <div
              className="group relative flex aspect-square items-center justify-center overflow-hidden bg-neutral-900 touch-manipulation"
              onTouchStart={() => setRadioFeedActive(true)}
              onTouchEnd={() => setRadioFeedActive(false)}
              onTouchCancel={() => setRadioFeedActive(false)}
            >
              {/* Image layer - fills the square. Replace '/pfp.jpg' with your chosen filename if needed. */}
              {/* If migrating to Next.js, swap this <img> for `import Image from 'next/image'` and use layout/ fill props. */}
              <img
                src="/pfp.jpg"
                alt="Driver profile"
                className="absolute inset-0 h-full w-full object-cover opacity-80 grayscale transition-all duration-300 group-hover:opacity-100 group-hover:grayscale-0"
              />

              <div
                className={
                  radioFeedActive
                    ? 'absolute top-4 left-4 right-4 z-[5] flex items-center justify-between pointer-events-none opacity-100 translate-y-0 transition-all duration-300 ease-out'
                    : 'absolute top-4 left-4 right-4 z-[5] flex items-center justify-between pointer-events-none opacity-0 -translate-y-1 transition-all duration-300 ease-out group-hover:opacity-100 group-hover:translate-y-0'
                }
              >
                <div className="flex items-center gap-2 rounded-sm border border-lime-400/30 bg-neutral-950/70 px-2.5 py-1 backdrop-blur-sm">
                  <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-lime-400 shadow-[0_0_10px_rgba(163,230,53,0.9)]" />
                  <span className="font-mono text-[10px] tracking-wider text-lime-400">
                    LIVE FEED // MV1: Simply Lovely!!
                  </span>
                </div>

                <div className="flex h-3 items-end gap-[2px]">
                  <div className="w-[2px] rounded-full bg-lime-400 animate-bounce [animation-delay:-0.4s] [animation-duration:1.1s] [height:0.55rem]" />
                  <div className="w-[2px] rounded-full bg-lime-400 animate-bounce [animation-delay:-0.2s] [animation-duration:0.9s] [height:0.85rem]" />
                  <div className="w-[2px] rounded-full bg-lime-400 animate-bounce [animation-delay:-0.35s] [animation-duration:1.05s] [height:0.65rem]" />
                  <div className="w-[2px] rounded-full bg-lime-400 animate-bounce [animation-delay:-0.15s] [animation-duration:0.95s] [height:1rem]" />
                </div>
              </div>

              {/* Scanline / matrix overlay - sits on top of the image */}
              <div className="absolute inset-0 z-10 bg-[repeating-linear-gradient(0deg,transparent,transparent_2px,rgba(255,255,255,0.03)_2px,rgba(255,255,255,0.03)_4px)] pointer-events-none" />

              {/* Footer telemetry badges (preserve exact text) */}
              <div className="absolute bottom-0 left-0 right-0 z-20 flex justify-between bg-neutral-950/90 px-3 py-2 font-mono-data text-[10px] uppercase text-zinc-500">
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
            I&apos;m a Dynamic, tech-driven engineer specializing in end-to-end event operations and high-performance frontend development. 
            Adept at leveraging modern React ecosystems alongside AI to prototype and deploy digital solutions at lightning speed.
          </p>
          <p className="mt-4 leading-relaxed text-zinc-500">
            Versatile with a proven track record of managing logistics, complex AV setups, and PR strategies. 
            Combining an analytical engineering mindset with multi-domain productivity
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
