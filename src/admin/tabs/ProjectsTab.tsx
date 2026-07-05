import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Plus, Pencil, Trash2, X, Check } from 'lucide-react'
import { getProjects, projects as seedProjects, PROJECTS_KEY } from '../../data/projects'
import type { Project, ProjectCategory } from '../../types'

const CATEGORIES: Exclude<ProjectCategory, 'all'>[] = ['web', 'mobile', 'design']

const emptyProject = (): Project => ({
  id: Date.now().toString(),
  title: '',
  description: '',
  category: 'web',
  image: 'linear-gradient(135deg, #1a0000 0%, #E10600 40%, #0a0a0a 100%)',
  tech: [],
  liveUrl: '#',
  githubUrl: '#',
  performance: 80,
})

interface ModalProps {
  project: Project
  onSave: (p: Project) => void
  onClose: () => void
}

function ProjectModal({ project, onSave, onClose }: ModalProps) {
  const [form, setForm] = useState<Project>(project)
  const [techInput, setTechInput] = useState(project.tech.join(', '))

  const handle = <K extends keyof Project>(key: K, value: Project[K]) =>
    setForm((f) => ({ ...f, [key]: value }))

  const handleSave = () => {
    onSave({
      ...form,
      tech: techInput
        .split(',')
        .map((t) => t.trim())
        .filter(Boolean),
    })
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 p-4 backdrop-blur-sm">
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.95 }}
        className="relative w-full max-w-lg overflow-hidden rounded border border-white/10 bg-zinc-900"
      >
        <div className="absolute inset-x-0 top-0 h-0.5 bg-gradient-to-r from-transparent via-[#E10600] to-transparent" />
        <div className="flex items-center justify-between border-b border-white/10 px-6 py-4">
          <h2 className="font-mono text-sm font-bold uppercase tracking-widest text-white">
            {project.id === '' ? 'New Project' : 'Edit Project'}
          </h2>
          <button onClick={onClose} className="text-zinc-500 hover:text-white transition-colors">
            <X size={18} />
          </button>
        </div>

        <div className="space-y-4 p-6">
          {(
            [
              { key: 'title', label: 'Title', type: 'text' },
              { key: 'liveUrl', label: 'Live URL', type: 'text' },
              { key: 'githubUrl', label: 'GitHub URL', type: 'text' },
            ] as { key: keyof Project; label: string; type: string }[]
          ).map(({ key, label, type }) => (
            <div key={key}>
              <label className="mb-1 block font-mono text-[10px] uppercase tracking-widest text-zinc-500">
                {label}
              </label>
              <input
                type={type}
                value={form[key] as string}
                onChange={(e) => handle(key, e.target.value as never)}
                className="w-full rounded border border-white/10 bg-zinc-950 px-3 py-2 font-mono text-sm text-white outline-none focus:border-[#d4ff00]/50 transition-colors"
              />
            </div>
          ))}

          <div>
            <label className="mb-1 block font-mono text-[10px] uppercase tracking-widest text-zinc-500">
              Description
            </label>
            <textarea
              rows={3}
              value={form.description}
              onChange={(e) => handle('description', e.target.value)}
              className="w-full resize-none rounded border border-white/10 bg-zinc-950 px-3 py-2 font-mono text-sm text-white outline-none focus:border-[#d4ff00]/50 transition-colors"
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="mb-1 block font-mono text-[10px] uppercase tracking-widest text-zinc-500">
                Category
              </label>
              <select
                value={form.category}
                onChange={(e) => handle('category', e.target.value as Exclude<ProjectCategory, 'all'>)}
                className="w-full rounded border border-white/10 bg-zinc-950 px-3 py-2 font-mono text-sm text-white outline-none focus:border-[#d4ff00]/50 transition-colors"
              >
                {CATEGORIES.map((c) => (
                  <option key={c} value={c}>
                    {c}
                  </option>
                ))}
              </select>
            </div>
            <div>
              <label className="mb-1 block font-mono text-[10px] uppercase tracking-widest text-zinc-500">
                Performance (0–100)
              </label>
              <input
                type="number"
                min={0}
                max={100}
                value={form.performance}
                onChange={(e) => handle('performance', Number(e.target.value))}
                className="w-full rounded border border-white/10 bg-zinc-950 px-3 py-2 font-mono text-sm text-white outline-none focus:border-[#d4ff00]/50 transition-colors"
              />
            </div>
          </div>

          <div>
            <label className="mb-1 block font-mono text-[10px] uppercase tracking-widest text-zinc-500">
              Tech Stack (comma-separated)
            </label>
            <input
              type="text"
              value={techInput}
              onChange={(e) => setTechInput(e.target.value)}
              placeholder="React, TypeScript, Tailwind"
              className="w-full rounded border border-white/10 bg-zinc-950 px-3 py-2 font-mono text-sm text-white outline-none focus:border-[#d4ff00]/50 transition-colors"
            />
          </div>

          <div>
            <label className="mb-1 block font-mono text-[10px] uppercase tracking-widest text-zinc-500">
              Image Gradient (CSS)
            </label>
            <div className="flex gap-2">
              <input
                type="text"
                value={form.image}
                onChange={(e) => handle('image', e.target.value)}
                className="flex-1 rounded border border-white/10 bg-zinc-950 px-3 py-2 font-mono text-xs text-white outline-none focus:border-[#d4ff00]/50 transition-colors"
              />
              <div
                className="h-10 w-14 shrink-0 rounded border border-white/10"
                style={{ background: form.image }}
              />
            </div>
          </div>
        </div>

        <div className="flex justify-end gap-3 border-t border-white/10 px-6 py-4">
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
            Save Project
          </button>
        </div>
      </motion.div>
    </div>
  )
}

export function ProjectsTab() {
  const [projects, setProjectsList] = useState<Project[]>(() => getProjects())
  const [editing, setEditing] = useState<Project | null>(null)
  const [isNew, setIsNew] = useState(false)
  const [deleteId, setDeleteId] = useState<string | null>(null)

  const commit = (list: Project[]) => {
    localStorage.setItem(PROJECTS_KEY, JSON.stringify(list))
    setProjectsList(list)
  }

  const handleSave = (p: Project) => {
    if (isNew) {
      commit([...projects, p])
    } else {
      commit(projects.map((x) => (x.id === p.id ? p : x)))
    }
    setEditing(null)
    setIsNew(false)
  }

  const handleDelete = (id: string) => {
    commit(projects.filter((p) => p.id !== id))
    setDeleteId(null)
  }

  const handleReset = () => {
    localStorage.removeItem(PROJECTS_KEY)
    setProjectsList(seedProjects)
  }

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <p className="font-mono text-xs text-zinc-500">{projects.length} projects in garage</p>
        <div className="flex gap-2">
          <button
            onClick={handleReset}
            className="rounded border border-white/10 px-3 py-1.5 font-mono text-[10px] uppercase tracking-widest text-zinc-500 hover:border-[#E10600]/50 hover:text-[#E10600] transition-colors"
          >
            Reset to defaults
          </button>
          <button
            onClick={() => {
              setIsNew(true)
              setEditing(emptyProject())
            }}
            className="flex items-center gap-1.5 rounded bg-[#d4ff00] px-3 py-1.5 font-mono text-[10px] font-bold uppercase tracking-widest text-black hover:bg-[#c5ef00] transition-colors"
          >
            <Plus size={13} />
            Add Project
          </button>
        </div>
      </div>

      <div className="space-y-2">
        {projects.map((p) => (
          <motion.div
            key={p.id}
            layout
            initial={{ opacity: 0, x: -8 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -8 }}
            className="flex items-center gap-4 rounded border border-white/8 bg-zinc-900/60 p-4"
          >
            <div
              className="h-10 w-16 shrink-0 rounded"
              style={{ background: p.image }}
            />
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-2">
                <span className="font-mono text-sm font-bold text-white truncate">{p.title}</span>
                <span className="shrink-0 rounded bg-zinc-800 px-1.5 py-0.5 font-mono text-[9px] uppercase text-zinc-400">
                  {p.category}
                </span>
              </div>
              <p className="mt-0.5 font-mono text-xs text-zinc-500 truncate">{p.tech.join(' · ')}</p>
            </div>
            <div className="flex items-center gap-2 shrink-0">
              <span className="font-mono text-xs text-[#d4ff00]">{p.performance}%</span>
              <button
                onClick={() => { setIsNew(false); setEditing(p) }}
                className="rounded p-1.5 text-zinc-500 hover:bg-zinc-800 hover:text-white transition-colors"
              >
                <Pencil size={14} />
              </button>
              <button
                onClick={() => setDeleteId(p.id)}
                className="rounded p-1.5 text-zinc-500 hover:bg-[#E10600]/10 hover:text-[#E10600] transition-colors"
              >
                <Trash2 size={14} />
              </button>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Edit / New Modal */}
      <AnimatePresence>
        {editing && (
          <ProjectModal
            project={editing}
            onSave={handleSave}
            onClose={() => { setEditing(null); setIsNew(false) }}
          />
        )}
      </AnimatePresence>

      {/* Delete confirmation */}
      <AnimatePresence>
        {deleteId && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-sm p-4">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="rounded border border-[#E10600]/30 bg-zinc-900 p-6 max-w-sm w-full"
            >
              <p className="font-mono text-sm text-white">Remove this project from the garage?</p>
              <p className="mt-1 font-mono text-xs text-zinc-500">This cannot be undone unless you reset to defaults.</p>
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
