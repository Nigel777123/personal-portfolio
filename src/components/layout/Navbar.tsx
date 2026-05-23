import { AnimatePresence, motion } from 'framer-motion'
import { Menu, X } from 'lucide-react'
import { useState } from 'react'
import { navLinks } from '../../data/navigation'
import { useActiveSection } from '../../hooks/useActiveSection'
import { cn } from '../../utils/cn'

const sectionIds = navLinks.map((l) => l.id)

export function Navbar() {
  const activeId = useActiveSection(sectionIds)
  const [mobileOpen, setMobileOpen] = useState(false)

  return (
    <header className="fixed inset-x-0 top-0 z-50 px-4 pt-4 sm:px-6">
      <nav
        className="glass mx-auto flex max-w-6xl items-center justify-between rounded-2xl px-4 py-3 sm:px-6"
        aria-label="Main navigation"
      >
        <a
          href="#home"
          className="group flex items-center gap-2 text-lg font-bold tracking-tight"
        >
          <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-gradient-to-br from-violet-500 to-cyan-400 text-sm text-white shadow-lg shadow-violet-500/30 transition-transform group-hover:scale-105">
            YN
          </span>
          <span className="hidden gradient-text sm:inline">Portfolio</span>
        </a>

        <ul className="relative hidden items-center gap-1 md:flex">
          {navLinks.map((link) => {
            const isActive = activeId === link.id
            return (
              <li key={link.id} className="relative">
                <a
                  href={link.href}
                  className={cn(
                    'relative z-10 rounded-full px-4 py-2 text-sm font-medium transition-colors',
                    isActive ? 'text-white' : 'text-zinc-400 hover:text-zinc-200',
                  )}
                >
                  {link.label}
                </a>
                {isActive && (
                  <motion.span
                    layoutId="nav-pill"
                    className="absolute inset-0 rounded-full bg-white/10 ring-1 ring-white/10"
                    transition={{ type: 'spring', stiffness: 380, damping: 30 }}
                  />
                )}
              </li>
            )
          })}
        </ul>

        <button
          type="button"
          className="rounded-xl p-2 text-zinc-300 transition-colors hover:bg-white/10 hover:text-white md:hidden"
          onClick={() => setMobileOpen((o) => !o)}
          aria-expanded={mobileOpen}
          aria-label={mobileOpen ? 'Close menu' : 'Open menu'}
        >
          {mobileOpen ? <X size={22} /> : <Menu size={22} />}
        </button>
      </nav>

      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            className="glass mx-auto mt-2 max-w-6xl overflow-hidden rounded-2xl p-4 md:hidden"
          >
            <ul className="flex flex-col gap-1">
              {navLinks.map((link) => (
                <li key={link.id}>
                  <a
                    href={link.href}
                    onClick={() => setMobileOpen(false)}
                    className={cn(
                      'block rounded-xl px-4 py-3 text-sm font-medium',
                      activeId === link.id
                        ? 'bg-gradient-to-r from-violet-500/20 to-cyan-500/20 text-white'
                        : 'text-zinc-400 hover:bg-white/5 hover:text-white',
                    )}
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  )
}
