import { AnimatePresence, motion } from 'framer-motion'
import { Menu, X } from 'lucide-react'
import { useEffect, useRef, useState } from 'react'
import { navLinks } from '../../data/navigation'
import { useActiveSection } from '../../hooks/useActiveSection'
import { cn } from '../../utils/cn'
import { TrackMapLogo } from '../ui/TrackMapLogo'

const sectionIds = navLinks.map((l) => l.id)

export function Navbar() {
  const observedActiveId = useActiveSection(sectionIds)
  const [activeId, setActiveId] = useState(observedActiveId)
  const [mobileOpen, setMobileOpen] = useState(false)
  const [hasScrolled, setHasScrolled] = useState(false)
  const [ersPercent, setErsPercent] = useState(100)
  const scrollFrameRef = useRef<number | null>(null)

  useEffect(() => {
    setActiveId(observedActiveId)
  }, [observedActiveId])

  useEffect(() => {
    const updateScrollMetrics = () => {
      setHasScrolled(window.scrollY > 20)

      const maxScroll = Math.max(document.documentElement.scrollHeight - window.innerHeight, 1)
      const currentScroll = Math.min(Math.max(window.scrollY, 0), maxScroll)
      const progress = (currentScroll / maxScroll) * 100

      setErsPercent(Math.round(100 - progress))
    }

    const handleScroll = () => {
      if (scrollFrameRef.current !== null) {
        return
      }

      scrollFrameRef.current = window.requestAnimationFrame(() => {
        scrollFrameRef.current = null
        updateScrollMetrics()
      })
    }

    window.addEventListener('scroll', handleScroll, { passive: true })
    updateScrollMetrics()

    return () => {
      window.removeEventListener('scroll', handleScroll)

      if (scrollFrameRef.current !== null) {
        window.cancelAnimationFrame(scrollFrameRef.current)
      }
    }
  }, [])

  return (
    <header className="fixed inset-x-0 top-0 z-50 px-2 pt-[max(env(safe-area-inset-top),0.5rem)] sm:px-6 sm:pt-4">
      <nav
        className={cn(
          'glass-hud mx-auto flex items-center transform-gpu overflow-hidden border-2 transition-all duration-500 ease-in-out',
          hasScrolled
            ? 'lg:max-w-2xl lg:justify-center lg:gap-8 lg:rounded-full lg:border-lime-500/30 lg:px-4 lg:py-2 lg:shadow-[0_0_30px_rgba(132,204,22,0.12)]'
            : 'lg:max-w-6xl lg:justify-between lg:rounded-sm lg:border-white/10 lg:px-2.5 lg:py-2',
          'px-2.5 py-2 sm:px-5 sm:py-3',
        )}
        aria-label="Main navigation"
      >
        <a
          href="#home"
          className={cn(
            'group flex shrink-0 items-center gap-2 transform-gpu transition-all duration-500 ease-in-out',
            hasScrolled ? 'translate-x-0 scale-95' : 'translate-x-0 scale-100',
          )}
        >
          <TrackMapLogo />
          <span className="whitespace-nowrap font-display text-[10px] font-bold uppercase tracking-[0.18em] text-white sm:text-sm">
            Race Control
          </span>
        </a>

        <div
          className={cn(
            'hidden transform-gpu items-center gap-4 overflow-hidden font-mono text-xs uppercase tracking-wider transition-all duration-500 ease-in-out lg:flex lg:gap-6',
            hasScrolled
              ? 'lg:w-auto lg:justify-center lg:opacity-100 lg:scale-100'
              : 'lg:justify-center lg:opacity-100 lg:scale-100',
          )}
        >
          <span
            className={cn(
              'transition-colors duration-150',
              hasScrolled
                ? 'text-emerald-400 font-bold drop-shadow-[0_0_8px_rgba(52,211,153,0.5)]'
                : 'text-emerald-500/70',
            )}
          >
            DRS: {hasScrolled ? 'ENABLED' : 'AVAILABLE'}
          </span>
          <span className="text-cyan-400">ERS: {ersPercent}%</span>
        </div>

        <ul
          className={cn(
            'relative hidden transform-gpu items-center gap-0.5 overflow-hidden transition-all duration-500 ease-in-out lg:flex',
            hasScrolled
              ? 'lg:w-0 lg:scale-95 lg:opacity-0 lg:pointer-events-none lg:overflow-hidden'
              : 'lg:w-auto lg:scale-100 lg:opacity-100',
          )}
        >
          {navLinks.map((link) => {
            const isActive = activeId === link.id
            return (
              <li key={link.id} className="relative">
                <a
                  href={link.href}
                  onClick={() => setActiveId(link.id)}
                  className={cn(
                    'relative z-10 px-3 py-2 font-display text-xs font-bold uppercase tracking-wider transition-colors',
                    isActive ? 'text-white' : 'text-zinc-500 hover:text-zinc-200',
                  )}
                >
                  {link.label}
                  <span className="ml-1 font-mono-data text-[9px] text-zinc-600">
                    G{link.gear}
                  </span>
                </a>
                {isActive && (
                  <motion.span
                    layoutId="nav-pill"
                    className="absolute inset-0 rounded-sm border border-[#d4ff00]/40 bg-[#d4ff00]/10 checkered-active"
                    transition={{ type: 'spring', stiffness: 380, damping: 30 }}
                  />
                )}
              </li>
            )
          })}
        </ul>

        <button
          type="button"
          className="rounded-sm p-2 text-zinc-400 transition-colors hover:bg-white/10 hover:text-white lg:hidden"
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
            className="glass-hud mx-auto mt-2 max-w-6xl rounded-sm border border-white/10 p-4 lg:hidden"
          >
            <ul className="flex flex-col gap-1">
              {navLinks.map((link) => (
                <li key={link.id}>
                  <a
                    href={link.href}
                    onClick={() => {
                      setActiveId(link.id)
                      setMobileOpen(false)
                    }}
                    className={cn(
                      'block rounded-sm px-4 py-3 font-display text-sm font-bold uppercase tracking-wider',
                      activeId === link.id
                        ? 'border border-[#E10600]/50 bg-[#E10600]/15 text-white'
                        : 'text-zinc-500 hover:bg-white/5 hover:text-white',
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
