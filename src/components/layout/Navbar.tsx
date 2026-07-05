import { AnimatePresence, motion, useScroll, useTransform, useMotionValueEvent } from 'framer-motion'
import { Menu, X } from 'lucide-react'
import { useEffect, useRef, useState } from 'react'
import { navLinks } from '../../data/navigation'
import { useActiveSection } from '../../hooks/useActiveSection'
import { cn } from '../../utils/cn'
import { TrackMapLogo } from '../ui/TrackMapLogo'

const sectionIds = navLinks.map((l) => l.id)

interface NavbarProps {
  isHudVisible: boolean
  onToggleHud: () => void
}

export function Navbar({ isHudVisible, onToggleHud }: NavbarProps) {
  const observedActiveId = useActiveSection(sectionIds)
  const [activeId, setActiveId] = useState(observedActiveId)
  const [mobileOpen, setMobileOpen] = useState(false)
  const [hasScrolled, setHasScrolled] = useState(false)
  const [isScrolling, setIsScrolling] = useState(false)
  const scrollDebounceRef = useRef<number | null>(null)

  // Framer Motion scroll values
  const { scrollYProgress } = useScroll()
  const ersRaw = useTransform(scrollYProgress, [0, 1], [100, 0])
  const ersRounded = useTransform(ersRaw, (v) => Math.round(v))

  useEffect(() => {
    setActiveId(observedActiveId)
  }, [observedActiveId])

  // useMotionValueEvent to track scroll progress and debounce "isScrolling" state
  useMotionValueEvent(scrollYProgress, 'change', (latest) => {
    // Toggle hasScrolled based on a small threshold (2% scroll)
    const scrolled = typeof latest === 'number' ? latest > 0.02 : false
    setHasScrolled(scrolled)

    // Handle DRS scrolling indicator with a short debounce
    setIsScrolling(true)
    if (scrollDebounceRef.current) {
      window.clearTimeout(scrollDebounceRef.current)
    }
    scrollDebounceRef.current = window.setTimeout(() => {
      setIsScrolling(false)
      scrollDebounceRef.current = null
    }, 150)
  })

  // clean up any outstanding timeout on unmount
  useEffect(() => {
    return () => {
      if (scrollDebounceRef.current) {
        window.clearTimeout(scrollDebounceRef.current)
      }
    }
  }, [])

  return (
    <header className="fixed inset-x-0 top-0 z-50 px-2 pt-[max(env(safe-area-inset-top),0.5rem)] sm:px-6 sm:pt-4">
      <motion.nav
        layout
        animate={{ width: hasScrolled ? 'min(42rem, calc(100vw - 1rem))' : '100%' }}
        transition={{ type: 'spring', stiffness: 160, damping: 28 }}
        className={cn(
          'glass-hud mx-auto flex w-full items-center justify-between gap-2 overflow-hidden border-2 min-h-[56px] transform-gpu will-change-transform',
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
            'group flex shrink-0 items-center gap-2 transform-gpu will-change-transform transition-all duration-700 ease-[cubic-bezier(0.4,0,0.2,1)]',
            hasScrolled ? 'translate-x-0 scale-95' : 'translate-x-0 scale-100',
          )}
        >
          <TrackMapLogo />
          <span className="whitespace-nowrap font-display text-[10px] font-bold uppercase tracking-[0.18em] text-white sm:text-sm">
            Race Control
          </span>
        </a>

        <motion.div
          layout
          transition={{ type: 'spring', stiffness: 200, damping: 25 }}
          className={cn(
            'flex min-w-0 shrink-0 items-center gap-2 overflow-hidden whitespace-nowrap font-mono text-[10px] uppercase tracking-wider leading-none sm:text-xs lg:gap-6',
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
            DRS: {isScrolling ? 'ENABLED' : 'AVAILABLE'}
          </span>
          <span className="text-cyan-400">
            ERS: <motion.span>{ersRounded}</motion.span>%
          </span>
          <button
            type="button"
            onClick={onToggleHud}
            className={cn(
              'cursor-pointer font-mono text-[10px] uppercase tracking-wider leading-none sm:text-xs',
              'transition-all duration-150',
              isHudVisible
                ? 'text-[#d4ff00] hover:text-white hover:drop-shadow-[0_0_6px_rgba(212,255,0,0.6)]'
                : 'text-zinc-600 hover:text-zinc-400',
            )}
            aria-pressed={isHudVisible}
            aria-label={isHudVisible ? 'Hide telemetry HUD' : 'Show telemetry HUD'}
          >
            HUD: {isHudVisible ? 'ON' : 'OFF'}
          </button>
        </motion.div>

        <AnimatePresence>
          {!hasScrolled && (
            <motion.ul
              key="nav-links"
              initial={{ opacity: 0, x: -8 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 20, scale: 0.95 }}
              transition={{ duration: 0.2 }}
              className={cn('relative hidden transform-gpu items-center gap-0.5 overflow-hidden lg:flex lg:px-2.5')}
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
                      <span className="ml-1 font-mono-data text-[9px] text-zinc-600">G{link.gear}</span>
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
            </motion.ul>
          )}
        </AnimatePresence>

        <button
          type="button"
          className="min-h-11 min-w-11 rounded-sm p-2 text-zinc-400 transition-colors hover:bg-white/10 hover:text-white lg:hidden touch-manipulation"
          onClick={() => setMobileOpen((o) => !o)}
          aria-expanded={mobileOpen}
          aria-label={mobileOpen ? 'Close menu' : 'Open menu'}
        >
          {mobileOpen ? <X size={22} /> : <Menu size={22} />}
        </button>
      </motion.nav>

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
