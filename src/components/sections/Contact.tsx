import { AnimatePresence, motion } from 'framer-motion'
import { CheckCircle2, Radio, Send } from 'lucide-react'
import {
  useState,
  type FormEvent,
  type InputHTMLAttributes,
  type TextareaHTMLAttributes,
} from 'react'
import { MagneticButton } from '../ui/MagneticButton'
import { SectionHeading } from '../ui/SectionHeading'

interface FormState {
  name: string
  email: string
  message: string
}

interface FormErrors {
  name?: string
  email?: string
  message?: string
}

function validate({ name, email, message }: FormState): FormErrors {
  const errors: FormErrors = {}
  if (!name.trim()) errors.name = 'Call sign required'
  if (!email.trim()) {
    errors.email = 'Radio frequency (email) required'
  } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    errors.email = 'Invalid frequency'
  }
  if (!message.trim()) errors.message = 'Message required'
  else if (message.trim().length < 10) errors.message = 'Minimum 10 characters'
  return errors
}

function FloatingInput({
  id,
  label,
  error,
  ...props
}: {
  id: string
  label: string
  error?: string
} & InputHTMLAttributes<HTMLInputElement>) {
  return (
    <div className="relative">
      <input
        id={id}
        placeholder=" "
        className="peer w-full rounded-sm border border-white/15 bg-neutral-900 px-4 pb-3 pt-6 font-mono-data text-sm text-white outline-none transition-colors focus:border-[#d4ff00]/60 focus:ring-1 focus:ring-[#d4ff00]/30"
        {...props}
      />
      <label
        htmlFor={id}
        className="pointer-events-none absolute left-4 top-4 text-sm uppercase tracking-wider text-zinc-500 transition-all peer-placeholder-shown:top-4 peer-placeholder-shown:text-sm peer-focus:top-2 peer-focus:text-[10px] peer-focus:text-[#d4ff00] peer-[:not(:placeholder-shown)]:top-2 peer-[:not(:placeholder-shown)]:text-[10px]"
      >
        {label}
      </label>
      {error && <p className="mt-1.5 font-mono-data text-xs text-[#E10600]">{error}</p>}
    </div>
  )
}

function FloatingTextarea({
  id,
  label,
  error,
  ...props
}: {
  id: string
  label: string
  error?: string
} & TextareaHTMLAttributes<HTMLTextAreaElement>) {
  return (
    <div className="relative">
      <textarea
        id={id}
        placeholder=" "
        rows={5}
        className="peer w-full resize-none rounded-sm border border-white/15 bg-neutral-900 px-4 pb-3 pt-6 font-mono-data text-sm text-white outline-none transition-colors focus:border-[#d4ff00]/60 focus:ring-1 focus:ring-[#d4ff00]/30"
        {...props}
      />
      <label
        htmlFor={id}
        className="pointer-events-none absolute left-4 top-4 text-sm uppercase tracking-wider text-zinc-500 transition-all peer-placeholder-shown:top-4 peer-placeholder-shown:text-sm peer-focus:top-2 peer-focus:text-[10px] peer-focus:text-[#d4ff00] peer-[:not(:placeholder-shown)]:top-2 peer-[:not(:placeholder-shown)]:text-[10px]"
      >
        {label}
      </label>
      {error && <p className="mt-1.5 font-mono-data text-xs text-[#E10600]">{error}</p>}
    </div>
  )
}

export function Contact() {
  const [form, setForm] = useState<FormState>({ name: '', email: '', message: '' })
  const [errors, setErrors] = useState<FormErrors>({})
  const [sent, setSent] = useState(false)
  const [submitting, setSubmitting] = useState(false)

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault()
    const nextErrors = validate(form)
    setErrors(nextErrors)
    if (Object.keys(nextErrors).length > 0) return

    setSubmitting(true)
    await new Promise((r) => setTimeout(r, 900))
    setSubmitting(false)
    setSent(true)
    setForm({ name: '', email: '', message: '' })
  }

  return (
    <section id="contact" className="section-padding mx-auto max-w-6xl">
      <SectionHeading
        eyebrow="Radio"
        title="Team Radio"
        subtitle="Transmit a message to the pit wall — all fields validated before green light."
      />

      <motion.div
        className="glass-hud relative mx-auto max-w-xl overflow-hidden rounded-sm border-2 border-white/10 p-6 sm:p-8"
        initial={{ opacity: 0, y: 24 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5 }}
      >
        <div className="racing-stripe absolute inset-x-0 top-0" />
        <div className="mb-6 flex items-center gap-2 pt-2 font-mono-data text-xs uppercase tracking-widest text-zinc-500">
          <Radio className="h-4 w-4 text-[#E10600]" />
          Channel 77 — Encrypted
        </div>

        <AnimatePresence mode="wait">
          {sent ? (
            <motion.div
              key="success"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="flex flex-col items-center py-12 text-center"
            >
              <motion.div
                initial={{ scale: 0, rotate: -180 }}
                animate={{ scale: 1, rotate: 0 }}
                transition={{ type: 'spring', stiffness: 260, damping: 18 }}
              >
                <CheckCircle2 className="h-16 w-16 text-[#d4ff00]" strokeWidth={1.5} />
              </motion.div>
              <h3 className="mt-6 font-display text-2xl font-bold uppercase tracking-wider text-white">
                Message Received!
              </h3>
              <p className="mt-2 max-w-sm font-mono-data text-sm text-zinc-500">
                Pit crew confirms transmission. Standing by on race radio.
              </p>
              <button
                type="button"
                onClick={() => setSent(false)}
                className="mt-8 font-mono-data text-xs uppercase tracking-widest text-[#d4ff00] hover:text-white"
              >
                Send another
              </button>
            </motion.div>
          ) : (
            <motion.form
              key="form"
              onSubmit={handleSubmit}
              className="space-y-5"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            >
              <FloatingInput
                id="name"
                label="Call Sign"
                value={form.name}
                onChange={(e) => setForm((f) => ({ ...f, name: e.target.value }))}
                error={errors.name}
                autoComplete="name"
              />
              <FloatingInput
                id="email"
                label="Radio Frequency"
                type="email"
                value={form.email}
                onChange={(e) => setForm((f) => ({ ...f, email: e.target.value }))}
                error={errors.email}
                autoComplete="email"
              />
              <FloatingTextarea
                id="message"
                label="Transmission"
                value={form.message}
                onChange={(e) => setForm((f) => ({ ...f, message: e.target.value }))}
                error={errors.message}
              />
              <MagneticButton type="submit" variant="primary" className="w-full" disabled={submitting}>
                {submitting ? 'Transmitting…' : (
                  <>
                    <Send size={18} />
                    Send Transmission
                  </>
                )}
              </MagneticButton>
            </motion.form>
          )}
        </AnimatePresence>
      </motion.div>
    </section>
  )
}
