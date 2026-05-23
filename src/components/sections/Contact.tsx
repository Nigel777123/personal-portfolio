import { AnimatePresence, motion } from 'framer-motion'
import { CheckCircle2, Send } from 'lucide-react'
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
  if (!name.trim()) errors.name = 'Name is required'
  if (!email.trim()) {
    errors.email = 'Email is required'
  } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    errors.email = 'Enter a valid email'
  }
  if (!message.trim()) errors.message = 'Message is required'
  else if (message.trim().length < 10) errors.message = 'Message should be at least 10 characters'
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
        className="peer w-full rounded-xl border border-white/10 bg-zinc-900/80 px-4 pb-3 pt-6 text-white outline-none transition-colors focus:border-cyan-400/50 focus:ring-2 focus:ring-cyan-400/20"
        {...props}
      />
      <label
        htmlFor={id}
        className="pointer-events-none absolute left-4 top-4 text-sm text-zinc-500 transition-all peer-placeholder-shown:top-4 peer-placeholder-shown:text-base peer-focus:top-2 peer-focus:text-xs peer-focus:text-cyan-400 peer-[:not(:placeholder-shown)]:top-2 peer-[:not(:placeholder-shown)]:text-xs"
      >
        {label}
      </label>
      {error && <p className="mt-1.5 text-xs text-rose-400">{error}</p>}
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
        className="peer w-full resize-none rounded-xl border border-white/10 bg-zinc-900/80 px-4 pb-3 pt-6 text-white outline-none transition-colors focus:border-cyan-400/50 focus:ring-2 focus:ring-cyan-400/20"
        {...props}
      />
      <label
        htmlFor={id}
        className="pointer-events-none absolute left-4 top-4 text-sm text-zinc-500 transition-all peer-placeholder-shown:top-4 peer-placeholder-shown:text-base peer-focus:top-2 peer-focus:text-xs peer-focus:text-cyan-400 peer-[:not(:placeholder-shown)]:top-2 peer-[:not(:placeholder-shown)]:text-xs"
      >
        {label}
      </label>
      {error && <p className="mt-1.5 text-xs text-rose-400">{error}</p>}
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
        eyebrow="Contact"
        title="Let's build something great"
        subtitle="Have a project in mind or just want to say hi? Drop a message — I typically reply within 48 hours."
      />

      <motion.div
        className="glass relative mx-auto max-w-xl overflow-hidden rounded-3xl p-6 sm:p-8"
        initial={{ opacity: 0, y: 24 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5 }}
      >
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
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ type: 'spring', stiffness: 260, damping: 18, delay: 0.1 }}
              >
                <CheckCircle2 className="h-16 w-16 text-emerald-400" strokeWidth={1.5} />
              </motion.div>
              <h3 className="mt-6 text-2xl font-bold text-white">Message sent!</h3>
              <p className="mt-2 max-w-sm text-zinc-400">
                Thanks for reaching out. I&apos;ll get back to you soon.
              </p>
              <button
                type="button"
                onClick={() => setSent(false)}
                className="mt-8 text-sm font-medium text-cyan-400 hover:text-cyan-300"
              >
                Send another message
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
                label="Your name"
                value={form.name}
                onChange={(e) => setForm((f) => ({ ...f, name: e.target.value }))}
                error={errors.name}
                autoComplete="name"
              />
              <FloatingInput
                id="email"
                label="Email address"
                type="email"
                value={form.email}
                onChange={(e) => setForm((f) => ({ ...f, email: e.target.value }))}
                error={errors.email}
                autoComplete="email"
              />
              <FloatingTextarea
                id="message"
                label="Your message"
                value={form.message}
                onChange={(e) => setForm((f) => ({ ...f, message: e.target.value }))}
                error={errors.message}
              />
              <MagneticButton type="submit" variant="primary" className="w-full" disabled={submitting}>
                {submitting ? 'Sending…' : (
                  <>
                    <Send size={18} />
                    Send message
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
