import { motion } from 'framer-motion'
import { ArrowDown, Sparkles } from 'lucide-react'
import { typingRoles } from '../../data/skills'
import { useTypingEffect } from '../../hooks/useTypingEffect'
import { MagneticButton } from '../ui/MagneticButton'
import { ParticleBackground } from '../ui/ParticleBackground'

export function Hero() {
  const typedRole = useTypingEffect(typingRoles)

  return (
    <section
      id="home"
      className="relative flex min-h-screen items-center overflow-hidden pt-24"
    >
      <ParticleBackground />

      <div className="section-padding relative z-10 mx-auto w-full max-w-6xl">
        <motion.div
          initial={{ opacity: 0, y: 32 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
          className="max-w-3xl"
        >
          <motion.p
            className="mb-6 inline-flex items-center gap-2 rounded-full border border-violet-500/30 bg-violet-500/10 px-4 py-1.5 text-sm text-violet-200"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.15 }}
          >
            <Sparkles className="h-4 w-4 text-cyan-400" />
            Available for freelance & full-time roles
          </motion.p>

          <h1 className="text-4xl font-extrabold leading-[1.1] tracking-tight text-white sm:text-5xl lg:text-7xl">
            Hi, I&apos;m{' '}
            <span className="gradient-text">Your Name</span>
            <span className="mt-2 block text-3xl font-bold text-zinc-300 sm:text-4xl lg:text-5xl">
              I craft{' '}
              <span className="gradient-text inline-block min-w-[12ch] border-r-2 border-cyan-400 pr-1">
                {typedRole}
              </span>
            </span>
          </h1>

          <p className="mt-6 max-w-xl text-lg leading-relaxed text-zinc-400 sm:text-xl">
            I build fast, accessible, and delightful digital experiences — blending
            sharp engineering with thoughtful motion design.
          </p>

          <div className="mt-10 flex flex-wrap gap-4">
            <MagneticButton href="#projects" variant="primary">
              View Work
            </MagneticButton>
            <MagneticButton href="#contact" variant="secondary">
              Contact Me
            </MagneticButton>
          </div>
        </motion.div>

        <motion.a
          href="#about"
          className="absolute bottom-8 left-1/2 flex -translate-x-1/2 flex-col items-center gap-2 text-zinc-500 transition-colors hover:text-cyan-400"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1 }}
          aria-label="Scroll to about section"
        >
          <span className="text-xs uppercase tracking-widest">Scroll</span>
          <motion.span animate={{ y: [0, 6, 0] }} transition={{ repeat: Infinity, duration: 1.6 }}>
            <ArrowDown size={20} />
          </motion.span>
        </motion.a>
      </div>

      <div
        className="pointer-events-none absolute -right-32 top-1/3 h-96 w-96 rounded-full bg-violet-600/20 blur-3xl"
        aria-hidden
      />
      <div
        className="pointer-events-none absolute -left-24 bottom-1/4 h-80 w-80 rounded-full bg-cyan-500/15 blur-3xl"
        aria-hidden
      />
    </section>
  )
}
