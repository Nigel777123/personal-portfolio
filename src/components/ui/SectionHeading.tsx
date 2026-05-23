import { motion } from 'framer-motion'

interface SectionHeadingProps {
  eyebrow: string
  title: string
  subtitle?: string
}

export function SectionHeading({ eyebrow, title, subtitle }: SectionHeadingProps) {
  return (
    <motion.div
      className="mb-12 max-w-2xl md:mb-16"
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-80px' }}
      transition={{ duration: 0.5 }}
    >
      <p className="mb-3 font-mono-data text-xs font-semibold uppercase tracking-[0.3em] text-[#d4ff00]">
        // {eyebrow}
      </p>
      <h2 className="font-display text-3xl font-extrabold uppercase tracking-wider text-white sm:text-4xl lg:text-5xl">
        {title}
      </h2>
      <div className="mt-4 h-1 w-24 bg-gradient-to-r from-[#E10600] to-[#d4ff00]" />
      {subtitle && (
        <p className="mt-4 text-base leading-relaxed text-zinc-400 sm:text-lg">{subtitle}</p>
      )}
    </motion.div>
  )
}
