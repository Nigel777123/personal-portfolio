import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Layers, Clock, Radio, LogOut, ExternalLink } from 'lucide-react'
import { AdminLogin } from './AdminLogin'
import { ProjectsTab } from './tabs/ProjectsTab'
import { ExperienceTab } from './tabs/ExperienceTab'
import { TransmissionsTab } from './tabs/TransmissionsTab'
import { TRANSMISSIONS_KEY } from '../components/sections/Contact'
import type { Transmission } from '../types'

type Tab = 'projects' | 'experience' | 'transmissions'

function getUnreadCount(): number {
  try {
    const raw = localStorage.getItem(TRANSMISSIONS_KEY)
    if (raw) {
      const msgs = JSON.parse(raw) as Transmission[]
      return msgs.filter((m) => !m.read).length
    }
  } catch {
    // ignore
  }
  return 0
}

const TABS: { id: Tab; label: string; icon: React.ReactNode }[] = [
  { id: 'projects', label: 'Projects', icon: <Layers size={15} /> },
  { id: 'experience', label: 'Experience', icon: <Clock size={15} /> },
  { id: 'transmissions', label: 'Transmissions', icon: <Radio size={15} /> },
]

export function AdminApp() {
  const [authed, setAuthed] = useState(() => sessionStorage.getItem('admin_auth') === '1')
  const [tab, setTab] = useState<Tab>('projects')
  const [unread, setUnread] = useState(() => getUnreadCount())

  const handleTabChange = (t: Tab) => {
    setTab(t)
    if (t === 'transmissions') {
      // Refresh unread count when switching to transmissions
      setTimeout(() => setUnread(getUnreadCount()), 300)
    }
  }

  const handleLogout = () => {
    sessionStorage.removeItem('admin_auth')
    setAuthed(false)
  }

  if (!authed) {
    return <AdminLogin onAuth={() => setAuthed(true)} />
  }

  return (
    <div className="min-h-screen bg-zinc-950 text-white">
      {/* Ambient background */}
      <div className="pointer-events-none fixed inset-0 overflow-hidden">
        <div className="absolute left-1/4 top-0 h-[400px] w-[600px] -translate-x-1/2 rounded-full bg-[#E10600]/4 blur-[120px]" />
        <div className="absolute bottom-0 right-1/4 h-[300px] w-[400px] rounded-full bg-[#d4ff00]/3 blur-[100px]" />
      </div>

      {/* Header */}
      <header className="sticky top-0 z-40 border-b border-white/8 bg-zinc-950/80 backdrop-blur-xl">
        <div className="mx-auto flex max-w-5xl items-center justify-between px-6 py-4">
          <div className="flex items-center gap-3">
            <div className="flex h-8 w-8 items-center justify-center rounded bg-[#E10600]">
              <span className="font-mono text-[10px] font-black text-white">PW</span>
            </div>
            <div>
              <p className="font-mono text-sm font-bold uppercase tracking-[0.15em] text-white">
                Pit Wall
              </p>
              <p className="font-mono text-[9px] uppercase tracking-widest text-zinc-600">
                Admin Command Centre
              </p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <a
              href="/"
              className="flex items-center gap-1.5 rounded border border-white/10 px-3 py-1.5 font-mono text-[10px] uppercase tracking-widest text-zinc-400 hover:text-white transition-colors"
            >
              <ExternalLink size={12} />
              View Site
            </a>
            <button
              onClick={handleLogout}
              className="flex items-center gap-1.5 rounded border border-white/10 px-3 py-1.5 font-mono text-[10px] uppercase tracking-widest text-zinc-400 hover:border-[#E10600]/50 hover:text-[#E10600] transition-colors"
            >
              <LogOut size={12} />
              Logout
            </button>
          </div>
        </div>

        {/* Tab bar */}
        <div className="mx-auto flex max-w-5xl gap-1 px-6 pb-0">
          {TABS.map(({ id, label, icon }) => (
            <button
              key={id}
              onClick={() => handleTabChange(id)}
              className={`relative flex items-center gap-2 px-4 py-3 font-mono text-xs uppercase tracking-widest transition-colors ${
                tab === id
                  ? 'text-white'
                  : 'text-zinc-500 hover:text-zinc-300'
              }`}
            >
              {icon}
              {label}
              {id === 'transmissions' && unread > 0 && (
                <span className="rounded-full bg-[#E10600] px-1.5 py-0.5 font-mono text-[8px] font-bold text-white leading-none">
                  {unread}
                </span>
              )}
              {tab === id && (
                <motion.div
                  layoutId="tab-underline"
                  className="absolute bottom-0 inset-x-0 h-0.5 bg-[#d4ff00]"
                />
              )}
            </button>
          ))}
        </div>
      </header>

      {/* Content */}
      <main className="mx-auto max-w-5xl px-6 py-8">
        <AnimatePresence mode="wait">
          <motion.div
            key={tab}
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.2 }}
          >
            {tab === 'projects' && <ProjectsTab />}
            {tab === 'experience' && <ExperienceTab />}
            {tab === 'transmissions' && (
              <TransmissionsTab />
            )}
          </motion.div>
        </AnimatePresence>
      </main>

      {/* Footer stripe */}
      <div className="fixed bottom-0 inset-x-0 h-0.5 bg-gradient-to-r from-transparent via-[#E10600]/40 to-transparent" />
    </div>
  )
}
