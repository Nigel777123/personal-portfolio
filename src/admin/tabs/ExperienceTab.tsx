import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Plus, Pencil, Trash2, X, Check, GripVertical } from 'lucide-react'
import { getExperience, experience as seedExperience, EXPERIENCE_KEY } from '../../data/experience'
import type { ExperienceItem } from '../../types'

const emptyItem = (): ExperienceItem => ({
  id: Date.now().toString(),
  role: '',
  company: '',
  period: '',
  lap: 'Lap 00',
  summary: '',
  details: [],
})

interface ModalProps {
  item: ExperienceItem
  onSave: (item: ExperienceItem) => void
  onClose: () => void
}

function ExperienceModal({ item, onSave, onClose }: ModalProps) {
  const [form, setForm] = useState<ExperienceItem>(item)
  const [detailsInput, setDetailsInput] = useState(item.details.join('\n'))

  const handle = <K extends keyof ExperienceItem>(key: K, value: ExperienceItem[K]) =>
    setForm((f) => ({ ...f, [key]: value }))

  const handleSave = () => {
    onSave({
      ...form,
      details: detailsInput
        .split('\n')
        .map((d) => d.trim())
        .filter(Boolean),
    })
  }

  const fields: { key: keyof ExperienceItem; label: string }[] = [
    { key: 'role', label: 'Role / Title' },
    { key: 'company', label: 'Company / Team' },
    { key: 'period', label: 'Period (e.g. 2024 — Present)' },
    { key: 'lap', label: 'Lap Label (e.g. Lap 42)' },
  ]

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 p-4 backdrop-blur-sm">
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.95 }}
        className="relative w-full max-w-lg overflow-hidden rounded border border-white/10 bg-zinc-900 max-h-[90vh] flex flex-col"
      >
        <div className="absolute inset-x-0 top-0 h-0.5 bg-gradient-to-r from-transparent via-[#d4ff00] to-transparent" />

        <div className="flex items-center justify-between border-b border-white/10 px-6 py-4 shrink-0">
          <h2 className="font-mono text-sm font-bold uppercase tracking-widest text-white">
            {item.id === '' ? 'New Experience' : 'Edit Experience'}
          </h2>
          <button onClick={onClose} className="text-zinc-500 hover:text-white transition-colors">
            <X size={18} />
          </button>
        </div>

        <div className="space-y-4 overflow-y-auto p-6">
          {fields.map(({ key, label }) => (
            <div key={key}>
              <label className="mb-1 block font-mono text-[10px] uppercase tracking-widest text-zinc-500">
                {label}
              </label>
              <input
                type="text"
                value={form[key] as string}
                onChange={(e) => handle(key, e.target.value as never)}
                className="w-full rounded border border-white/10 bg-zinc-950 px-3 py-2 font-mono text-sm text-white outline-none focus:border-[#d4ff00]/50 transition-colors"
              />
            </div>
          ))}

          <div>
            <label className="mb-1 block font-mono text-[10px] uppercase tracking-widest text-zinc-500">
              Summary
            </label>
            <textarea
              rows={2}
              value={form.summary}
              onChange={(e) => handle('summary', e.target.value)}
              className="w-full resize-none rounded border border-white/10 bg-zinc-950 px-3 py-2 font-mono text-sm text-white outline-none focus:border-[#d4ff00]/50 transition-colors"
            />
          </div>

          <div>
            <label className="mb-1 block font-mono text-[10px] uppercase tracking-widest text-zinc-500">
              Details (one bullet per line)
            </label>
            <textarea
              rows={5}
              value={detailsInput}
              onChange={(e) => setDetailsInput(e.target.value)}
              placeholder="Built X using Y resulting in Z..."
              className="w-full resize-none rounded border border-white/10 bg-zinc-950 px-3 py-2 font-mono text-xs text-white outline-none focus:border-[#d4ff00]/50 transition-colors"
            />
          </div>
        </div>

        <div className="flex justify-end gap-3 border-t border-white/10 px-6 py-4 shrink-0">
          <button
            onClick={onClose}
            className="rounded border border-white/10 px-4 py-2 font-mono text-xs uppercase tracking-widest text-zinc-400 hover:text-white transition-colors"
          >
            Cancel
          </button>
          <button
            onClick={handleSave}
            className="flex items-center gap-2 rounded bg-[#d4ff00] px-4 py-2 font-mono text-xs font-bold uppercase tracking-widest text-black hover:bg-[#c5ef00] transition-colors"
          >
            <Check size={14} />
            Save
          </button>
        </div>
      </motion.div>
    </div>
  )
}

export function ExperienceTab() {
  const [items, setItems] = useState<ExperienceItem[]>(() => getExperience())
  const [editing, setEditing] = useState<ExperienceItem | null>(null)
  const [isNew, setIsNew] = useState(false)
  const [deleteId, setDeleteId] = useState<string | null>(null)
  const [dragIndex, setDragIndex] = useState<number | null>(null)
  const [overIndex, setOverIndex] = useState<number | null>(null)

  const commit = (list: ExperienceItem[]) => {
    localStorage.setItem(EXPERIENCE_KEY, JSON.stringify(list))
    setItems(list)
  }

  const handleSave = (item: ExperienceItem) => {
    if (isNew) {
      commit([...items, item])
    } else {
      commit(items.map((x) => (x.id === item.id ? item : x)))
    }
    setEditing(null)
    setIsNew(false)
  }

  const handleDelete = (id: string) => {
    commit(items.filter((i) => i.id !== id))
    setDeleteId(null)
  }

  const handleReset = () => {
    localStorage.removeItem(EXPERIENCE_KEY)
    setItems(seedExperience)
  }

  // Drag-to-reorder
  const handleDragEnd = () => {
    if (dragIndex !== null && overIndex !== null && dragIndex !== overIndex) {
      const next = [...items]
      const [moved] = next.splice(dragIndex, 1)
      next.splice(overIndex, 0, moved)
      commit(next)
    }
    setDragIndex(null)
    setOverIndex(null)
  }

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <p className="font-mono text-xs text-zinc-500">{items.length} laps logged</p>
        <div className="flex gap-2">
          <button
            onClick={handleReset}
            className="rounded border border-white/10 px-3 py-1.5 font-mono text-[10px] uppercase tracking-widest text-zinc-500 hover:border-[#E10600]/50 hover:text-[#E10600] transition-colors"
          >
            Reset to defaults
          </button>
          <button
            onClick={() => { setIsNew(true); setEditing(emptyItem()) }}
            className="flex items-center gap-1.5 rounded bg-[#d4ff00] px-3 py-1.5 font-mono text-[10px] font-bold uppercase tracking-widest text-black hover:bg-[#c5ef00] transition-colors"
          >
            <Plus size={13} />
            Add Entry
          </button>
        </div>
      </div>

      <p className="font-mono text-[10px] text-zinc-600 uppercase tracking-widest">
        ↕ Drag rows to reorder
      </p>

      <div className="space-y-2">
        {items.map((item, index) => (
          <motion.div
            key={item.id}
            layout
            draggable
            onDragStart={() => setDragIndex(index)}
            onDragOver={(e) => { e.preventDefault(); setOverIndex(index) }}
            onDragEnd={handleDragEnd}
            className={`flex items-center gap-4 rounded border bg-zinc-900/60 p-4 cursor-grab active:cursor-grabbing transition-all ${
              overIndex === index && dragIndex !== index
                ? 'border-[#d4ff00]/50 bg-[#d4ff00]/5'
                : 'border-white/8'
            }`}
          >
            <GripVertical size={16} className="shrink-0 text-zinc-600" />
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-2">
                <span className="rounded bg-[#E10600] px-1.5 py-0.5 font-mono text-[9px] font-bold uppercase text-white">
                  {item.lap}
                </span>
                <span className="font-mono text-sm font-bold text-white truncate">{item.role}</span>
              </div>
              <p className="mt-0.5 font-mono text-xs text-[#d4ff00]">{item.company}</p>
              <p className="mt-0.5 font-mono text-[10px] text-zinc-500">{item.period}</p>
            </div>
            <div className="flex items-center gap-2 shrink-0">
              <button
                onClick={() => { setIsNew(false); setEditing(item) }}
                className="rounded p-1.5 text-zinc-500 hover:bg-zinc-800 hover:text-white transition-colors"
              >
                <Pencil size={14} />
              </button>
              <button
                onClick={() => setDeleteId(item.id)}
                className="rounded p-1.5 text-zinc-500 hover:bg-[#E10600]/10 hover:text-[#E10600] transition-colors"
              >
                <Trash2 size={14} />
              </button>
            </div>
          </motion.div>
        ))}
      </div>

      <AnimatePresence>
        {editing && (
          <ExperienceModal
            item={editing}
            onSave={handleSave}
            onClose={() => { setEditing(null); setIsNew(false) }}
          />
        )}
      </AnimatePresence>

      <AnimatePresence>
        {deleteId && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-sm p-4">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="rounded border border-[#E10600]/30 bg-zinc-900 p-6 max-w-sm w-full"
            >
              <p className="font-mono text-sm text-white">Remove this lap entry?</p>
              <p className="mt-1 font-mono text-xs text-zinc-500">Reset to defaults to restore all original entries.</p>
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
    </div>
  )
}
