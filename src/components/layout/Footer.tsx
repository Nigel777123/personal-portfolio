import { motion } from 'framer-motion'
import { ArrowUp, Mail } from 'lucide-react'
import { socialLinks } from '../../data/social'

const iconMap = {
  github: GithubLogo,
  instagram: InstagramLogo,
  linkedin: LinkedinLogo,
  mail: Mail,
} as const

function GithubLogo() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden className="h-5 w-5 fill-current">
      <path d="M12 2.5a9.5 9.5 0 0 0-3.01 18.51c.48.09.66-.21.66-.47 0-.23-.01-.84-.01-1.65-2.69.59-3.26-1.3-3.26-1.3-.44-1.12-1.07-1.42-1.07-1.42-.88-.6.07-.59.07-.59.97.07 1.48 1 1.48 1 .86 1.47 2.26 1.04 2.81.8.09-.63.34-1.04.62-1.28-2.15-.25-4.42-1.08-4.42-4.82 0-1.06.38-1.93 1-2.61-.1-.24-.43-1.23.09-2.56 0 0 .82-.26 2.68 1a9.2 9.2 0 0 1 4.88 0c1.86-1.26 2.68-1 2.68-1 .52 1.33.19 2.32.09 2.56.62.68 1 1.55 1 2.61 0 3.75-2.28 4.56-4.44 4.81.35.3.66.88.66 1.78 0 1.28-.01 2.31-.01 2.62 0 .26.18.56.67.46A9.5 9.5 0 0 0 12 2.5Z" />
    </svg>
  )
}

function InstagramLogo() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden className="h-5 w-5 fill-current">
      <path d="M7 2h10a5 5 0 0 1 5 5v10a5 5 0 0 1-5 5H7a5 5 0 0 1-5-5V7a5 5 0 0 1 5-5Zm0 2a3 3 0 0 0-3 3v10a3 3 0 0 0 3 3h10a3 3 0 0 0 3-3V7a3 3 0 0 0-3-3H7Zm5 2.7A5.3 5.3 0 1 1 6.7 12 5.3 5.3 0 0 1 12 6.7Zm0 2A3.3 3.3 0 1 0 15.3 12 3.3 3.3 0 0 0 12 8.7Zm5.2-1.35a1.2 1.2 0 1 1-1.2 1.2 1.2 1.2 0 0 1 1.2-1.2Z" />
    </svg>
  )
}

function LinkedinLogo() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden className="h-5 w-5 fill-current">
      <path d="M6.5 4.5A1.75 1.75 0 1 1 6.5 8a1.75 1.75 0 0 1 0-3.5ZM5 9h3v10H5V9Zm5 0h2.9v1.37h.04C13.35 9.53 14.36 9 15.8 9c3.02 0 3.2 1.98 3.2 4.55V19h-3v-4.1c0-.98-.02-2.24-1.36-2.24s-1.57 1.06-1.57 2.16V19H10V9Z" />
    </svg>
  )
}

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
