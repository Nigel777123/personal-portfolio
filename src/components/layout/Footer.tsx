import { motion } from 'framer-motion'
import { ArrowUp, Bird, Code2, Mail, Network } from 'lucide-react'
import { socialLinks } from '../../data/social'

const iconMap = {
  code: Code2,
  network: Network,
  bird: Bird,
  mail: Mail,
} as const

export function Footer() {
  const year = new Date().getFullYear()

  return (
    <footer className="border-t-2 border-[#E10600]/30 px-4 py-12 sm:px-6">
      <div className="racing-stripe mb-10 max-w-6xl mx-auto" />
      <div className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-8 sm:flex-row">
        <div className="text-center sm:text-left">
          <p className="font-display text-lg font-bold uppercase tracking-widest text-white">
            Nigel Fernandes
          </p>
          <p className="mt-1 font-mono-data text-xs uppercase tracking-widest text-zinc-600">
            © {year} — Race Engineer Division
          </p>
        </div>

        <ul className="flex gap-3">
          {socialLinks.map((link) => {
            const Icon = iconMap[link.icon]
            return (
              <li key={link.name}>
                <motion.a
                  href={link.href}
                  target="_blank"
                  rel="noreferrer"
                  className="flex h-11 w-11 items-center justify-center rounded-sm border border-white/15 bg-neutral-900 text-zinc-500 transition-colors hover:border-[#d4ff00]/50 hover:text-[#d4ff00]"
                  whileHover={{ y: -3, scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  aria-label={link.name}
                >
                  <Icon size={20} />
                </motion.a>
              </li>
            )
          })}
        </ul>

        <motion.a
          href="#home"
          className="inline-flex items-center gap-2 rounded-sm border-2 border-white/20 bg-neutral-900 px-4 py-2 font-display text-xs font-bold uppercase tracking-wider text-white hover:border-[#E10600] hover:text-[#E10600]"
          whileHover={{ y: -2 }}
        >
          <ArrowUp size={16} />
          Pit Exit
        </motion.a>
      </div>
    </footer>
  )
}
