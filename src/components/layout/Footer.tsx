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
    <footer className="border-t border-white/10 px-4 py-12 sm:px-6">
      <div className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-8 sm:flex-row">
        <div className="text-center sm:text-left">
          <p className="gradient-text text-lg font-bold">Your Name</p>
          <p className="mt-1 text-sm text-zinc-500">
            © {year} All rights reserved. Crafted with React & motion.
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
                  className="flex h-11 w-11 items-center justify-center rounded-xl border border-white/10 bg-white/5 text-zinc-400 transition-colors hover:border-cyan-400/40 hover:text-cyan-400"
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
          className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-2 text-sm font-medium text-zinc-300 transition-colors hover:border-violet-500/40 hover:text-white"
          whileHover={{ y: -2 }}
        >
          <ArrowUp size={16} />
          Back to top
        </motion.a>
      </div>
    </footer>
  )
}
