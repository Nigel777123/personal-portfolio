import { useState, useCallback } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Trash2, MailOpen, Mail, Radio, Inbox } from 'lucide-react'
import { TRANSMISSIONS_KEY } from '../../components/sections/Contact'
import type { Transmission } from '../../types'

function readTransmissions(): Transmission[] {
  try {
    const raw = localStorage.getItem(TRANSMISSIONS_KEY)
    if (raw) return JSON.parse(raw) as Transmission[]
  } catch {
    // ignore
  }
  return []
}

function saveTransmissions(list: Transmission[]) {
  localStorage.setItem(TRANSMISSIONS_KEY, JSON.stringify(list))
}

function formatDate(iso: string) {
  return new Date(iso).toLocaleString(undefined, {
    dateStyle: 'medium',
    timeStyle: 'short',
  })
}

export function TransmissionsTab() {
  const [msgs, setMsgs] = useState<Transmission[]>(() => readTransmissions())
  const [deleteId, setDeleteId] = useState<string | null>(null)
  const [clearAll, setClearAll] = useState(false)

  const unread = msgs.filter((m) => !m.read).length

  const commit = useCallback((list: Transmission[]) => {
    saveTransmissions(list)
    setMsgs(list)
  }, [])

  const markRead = (id: string) => {
    commit(msgs.map((m) => (m.id === id ? { ...m, read: true } : m)))
  }

  const handleDelete = (id: string) => {
    commit(msgs.filter((m) => m.id !== id))
    setDeleteId(null)
  }

  const handleClearAll = () => {
    localStorage.removeItem(TRANSMISSIONS_KEY)
    setMsgs([])
    setClearAll(false)
  }

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Radio className="h-4 w-4 text-[#E10600]" />
          <p className="font-mono text-xs text-zinc-500">
            {msgs.length} transmissions
            {unread > 0 && (
              <span className="ml-2 rounded bg-[#E10600] px-1.5 py-0.5 font-mono text-[9px] font-bold text-white">
                {unread} new
              </span>
            )}
          </p>
        </div>
        {msgs.length > 0 && (
          <button
            onClick={() => setClearAll(true)}
            className="rounded border border-white/10 px-3 py-1.5 font-mono text-[10px] uppercase tracking-widest text-zinc-500 hover:border-[#E10600]/50 hover:text-[#E10600] transition-colors"
          >
            Clear All
          </button>
        )}
      </div>

      {msgs.length === 0 ? (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="flex flex-col items-center justify-center gap-3 py-20 text-center"
        >
          <Inbox className="h-12 w-12 text-zinc-700" />
          <p className="font-mono text-sm text-zinc-600">No transmissions received yet.</p>
          <p className="font-mono text-xs text-zinc-700">
            Fill the contact form on the portfolio to test.
          </p>
        </motion.div>
      ) : (
        <div className="space-y-3">
          <AnimatePresence>
            {msgs.map((msg) => (
              <motion.div
                key={msg.id}
                layout
                initial={{ opacity: 0, y: -8 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, x: 20 }}
                className={`rounded border bg-zinc-900/60 p-5 transition-colors ${
                  msg.read ? 'border-white/8' : 'border-[#E10600]/30 bg-[#E10600]/3'
                }`}
              >
                <div className="flex items-start justify-between gap-4">
                  <div className="flex items-center gap-2">
                    {msg.read ? (
                      <MailOpen className="h-4 w-4 shrink-0 text-zinc-600" />
                    ) : (
                      <Mail className="h-4 w-4 shrink-0 text-[#E10600]" />
                    )}
                    <div>
                      <span className="font-mono text-sm font-bold text-white">{msg.name}</span>
                      <a
                        href={`mailto:${msg.email}`}
                        className="ml-2 font-mono text-xs text-[#d4ff00] hover:underline"
                      >
                        {msg.email}
                      </a>
                    </div>
                  </div>
                  <div className="flex items-center gap-2 shrink-0">
                    {!msg.read && (
                      <button
                        onClick={() => markRead(msg.id)}
                        className="rounded border border-white/10 px-2 py-1 font-mono text-[9px] uppercase tracking-widest text-zinc-400 hover:text-white transition-colors"
                      >
                        Mark read
                      </button>
                    )}
                    <button
                      onClick={() => setDeleteId(msg.id)}
                      className="rounded p-1.5 text-zinc-500 hover:bg-[#E10600]/10 hover:text-[#E10600] transition-colors"
                    >
                      <Trash2 size={14} />
                    </button>
                  </div>
                </div>

                <p className="mt-3 font-mono text-sm leading-relaxed text-zinc-300 whitespace-pre-wrap">
                  {msg.message}
                </p>

                <p className="mt-3 font-mono text-[10px] uppercase tracking-widest text-zinc-600">
                  {formatDate(msg.timestamp)}
                </p>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>
      )}

      {/* Delete single */}
      <AnimatePresence>
        {deleteId && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-sm p-4">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="rounded border border-[#E10600]/30 bg-zinc-900 p-6 max-w-sm w-full"
            >
              <p className="font-mono text-sm text-white">Delete this transmission?</p>
              <div className="mt-5 flex gap-3">
                <button
                  onClick={() => setDeleteId(null)}
                  className="flex-1 rounded border border-white/10 py-2 font-mono text-xs uppercase tracking-widest text-zinc-400 hover:text-white transition-colors"
                >
                  Cancel
                </button>
                <button
                  onClick={() => handleDelete(deleteId)}
                  className="flex-1 rounded bg-[#E10600] py-2 font-mono text-xs font-bold uppercase tracking-widest text-white hover:bg-[#c00500] transition-colors"
                >
                  Delete
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* Clear all */}
      <AnimatePresence>
        {clearAll && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-sm p-4">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="rounded border border-[#E10600]/30 bg-zinc-900 p-6 max-w-sm w-full"
            >
              <p className="font-mono text-sm text-white">Clear all transmissions?</p>
              <p className="mt-1 font-mono text-xs text-zinc-500">This will permanently delete all {msgs.length} messages.</p>
              <div className="mt-5 flex gap-3">
                <button
                  onClick={() => setClearAll(false)}
                  className="flex-1 rounded border border-white/10 py-2 font-mono text-xs uppercase tracking-widest text-zinc-400 hover:text-white transition-colors"
                >
                  Cancel
                </button>
                <button
                  onClick={handleClearAll}
                  className="flex-1 rounded bg-[#E10600] py-2 font-mono text-xs font-bold uppercase tracking-widest text-white hover:bg-[#c00500] transition-colors"
                >
                  Clear All
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  )
}
