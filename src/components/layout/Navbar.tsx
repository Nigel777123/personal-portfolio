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
  const [isScrolling, setIsScrolling] = useState(false)
  const [ersPercent, setErsPercent] = useState(100)
  const scrollFrameRef = useRef<number | null>(null)
  const scrollTimeoutRef = useRef<number | null>(null)

  useEffect(() => {
    setActiveId(observedActiveId)
  }, [observedActiveId])

  useEffect(() => {
    const updateScrollMetrics = () => {
      const maxScroll = Math.max(document.documentElement.scrollHeight - window.innerHeight, 1)
      const currentScroll = Math.min(Math.max(window.scrollY, 0), maxScroll)
      const progress = (currentScroll / maxScroll) * 100

      setErsPercent(Math.round(100 - progress))
    }

    const handleScroll = () => {
      setIsScrolling(true)

      if (scrollTimeoutRef.current) {
        window.clearTimeout(scrollTimeoutRef.current)
      }

      if (scrollFrameRef.current !== null) {
        return
      }

      scrollFrameRef.current = window.requestAnimationFrame(() => {
        scrollFrameRef.current = null
        updateScrollMetrics()
      })

      scrollTimeoutRef.current = window.setTimeout(() => {
        setIsScrolling(false)
      }, 180)
    }

    const handleResize = () => {
      if (scrollFrameRef.current !== null) {
        window.cancelAnimationFrame(scrollFrameRef.current)
      }

      scrollFrameRef.current = window.requestAnimationFrame(() => {
        scrollFrameRef.current = null
        updateScrollMetrics()
      })
    }

    window.addEventListener('scroll', handleScroll, { passive: true })
    window.addEventListener('resize', handleResize, { passive: true })
    updateScrollMetrics()

    return () => {
      window.removeEventListener('scroll', handleScroll)
      window.removeEventListener('resize', handleResize)

      if (scrollTimeoutRef.current) {
        window.clearTimeout(scrollTimeoutRef.current)
      }

      if (scrollFrameRef.current !== null) {
        window.cancelAnimationFrame(scrollFrameRef.current)
      }
    }
  }, [])

  return (
    <header className="fixed inset-x-0 top-0 z-50 px-2 pt-[max(env(safe-area-inset-top),0.5rem)] sm:px-6 sm:pt-4">
      <nav
        className="glass-hud mx-auto flex max-w-6xl items-center justify-between rounded-sm border-2 border-white/10 px-2.5 py-2 sm:px-5 sm:py-3"
        aria-label="Main navigation"
      >
        <a href="#home" className="group flex shrink-0 items-center gap-2">
          <TrackMapLogo />
          <span className="whitespace-nowrap font-display text-[10px] font-bold uppercase tracking-[0.18em] text-white sm:text-sm">
            Race Control
          </span>
        </a>

        <div className="hidden items-center justify-center gap-6 font-mono text-xs uppercase tracking-wider lg:flex lg:gap-8">
          <span
            className={cn(
              'transition-colors duration-150',
              isScrolling
                ? 'text-emerald-400 font-bold drop-shadow-[0_0_8px_rgba(52,211,153,0.5)]'
                : 'text-emerald-500/70',
            )}
          >
            DRS: {isScrolling ? 'ENABLED' : 'AVAILABLE'}
          </span>
          <span className="text-cyan-400">ERS: {ersPercent}%</span>
        </div>

        <ul className="relative hidden items-center gap-0.5 lg:flex">
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
