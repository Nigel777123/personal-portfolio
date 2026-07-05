import { useState, type FormEvent } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { ShieldAlert, Radio } from 'lucide-react'

const ADMIN_PASSWORD = 'pitwall2025'

interface Props {
  onAuth: () => void
}

export function AdminLogin({ onAuth }: Props) {
  const [password, setPassword] = useState('')
  const [error, setError] = useState(false)
  const [shakeKey, setShakeKey] = useState(0)

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault()
    if (password === ADMIN_PASSWORD) {
      sessionStorage.setItem('admin_auth', '1')
      onAuth()
    } else {
      setError(true)
      setShakeKey((k) => k + 1)
      setPassword('')
      setTimeout(() => setError(false), 2000)
    }
  }

  return (
    <div className="flex min-h-screen items-center justify-center bg-zinc-950 px-4">
      {/* Ambient glow */}
      <div className="pointer-events-none fixed inset-0 overflow-hidden">
        <div className="absolute left-1/2 top-1/2 h-[500px] w-[500px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[#E10600]/5 blur-[120px]" />
      </div>

      <motion.div
        className="relative w-full max-w-sm overflow-hidden rounded border border-white/10 bg-zinc-900/80 p-8 backdrop-blur-xl"
        initial={{ opacity: 0, y: 24 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        {/* Top red racing stripe */}
        <div className="absolute inset-x-0 top-0 h-0.5 bg-gradient-to-r from-transparent via-[#E10600] to-transparent" />

        <div className="mb-8 flex flex-col items-center gap-3 text-center">
          <div className="flex h-14 w-14 items-center justify-center rounded-full border border-[#E10600]/30 bg-[#E10600]/10">
            <ShieldAlert className="h-7 w-7 text-[#E10600]" />
          </div>
          <div>
            <h1 className="font-mono text-xl font-bold uppercase tracking-[0.2em] text-white">
              Pit Wall
            </h1>
            <p className="mt-1 font-mono text-[10px] uppercase tracking-widest text-zinc-500">
              Admin Access — Authenticated Zone
            </p>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <motion.div
            key={shakeKey}
            animate={error ? { x: [-8, 8, -6, 6, -4, 4, 0] } : { x: 0 }}
            transition={{ duration: 0.4 }}
          >
            <label htmlFor="admin-password" className="mb-1.5 block font-mono text-[10px] uppercase tracking-widest text-zinc-500">
              Access Code
            </label>
            <input
              id="admin-password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="••••••••••••"
              autoFocus
              className={`w-full rounded border bg-zinc-950 px-4 py-3 font-mono text-sm text-white outline-none transition-all placeholder:text-zinc-700 focus:ring-1 ${
                error
                  ? 'border-[#E10600] ring-[#E10600]/30'
                  : 'border-white/10 focus:border-[#d4ff00]/50 focus:ring-[#d4ff00]/20'
              }`}
            />
            <AnimatePresence>
              {error && (
                <motion.p
                  initial={{ opacity: 0, y: -4 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0 }}
                  className="mt-2 font-mono text-[11px] text-[#E10600]"
                >
                  ✕ Invalid access code — try again
                </motion.p>
              )}
            </AnimatePresence>
          </motion.div>

          <button
            type="submit"
            className="flex w-full items-center justify-center gap-2 rounded bg-[#E10600] px-4 py-3 font-mono text-xs font-bold uppercase tracking-widest text-white transition-all hover:bg-[#c00500] active:scale-95"
          >
            <Radio className="h-4 w-4" />
            Authenticate
          </button>
        </form>

        <p className="mt-6 text-center font-mono text-[10px] text-zinc-700">
          CHANNEL 00 — RESTRICTED ACCESS
        </p>
      </motion.div>
    </div>
  )
}
