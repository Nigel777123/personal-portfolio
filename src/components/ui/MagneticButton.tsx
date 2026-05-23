import { motion } from 'framer-motion'
import type { ReactNode, RefObject } from 'react'
import { useMagnetic } from '../../hooks/useMagnetic'
import { cn } from '../../utils/cn'

interface MagneticButtonProps {
  children: ReactNode
  href?: string
  onClick?: () => void
  variant?: 'primary' | 'secondary' | 'ghost'
  className?: string
  type?: 'button' | 'submit'
  disabled?: boolean
}

const variants = {
  primary:
    'bg-gradient-to-r from-violet-600 to-cyan-500 text-white shadow-lg shadow-violet-500/25 hover:shadow-violet-500/40',
  secondary:
    'border border-white/20 bg-white/5 text-white hover:border-cyan-400/50 hover:bg-white/10',
  ghost: 'text-zinc-300 hover:text-white hover:bg-white/5',
}

export function MagneticButton({
  children,
  href,
  onClick,
  variant = 'primary',
  className,
  type = 'button',
  disabled,
}: MagneticButtonProps) {
  const { ref, onMouseMove, onMouseLeave } = useMagnetic(0.28)
  const classes = cn(
    'inline-flex items-center justify-center gap-2 rounded-full px-6 py-3 text-sm font-semibold transition-shadow duration-300',
    variants[variant],
    disabled && 'pointer-events-none opacity-50',
    className,
  )

  const motionProps = {
    whileHover: { scale: 1.03 },
    whileTap: { scale: 0.98 },
    transition: { type: 'spring' as const, stiffness: 400, damping: 20 },
  }

  if (href) {
    return (
      <motion.a
        ref={ref as RefObject<HTMLAnchorElement>}
        href={href}
        className={classes}
        onMouseMove={onMouseMove}
        onMouseLeave={onMouseLeave}
        {...motionProps}
      >
        {children}
      </motion.a>
    )
  }

  return (
    <motion.button
      ref={ref as RefObject<HTMLButtonElement>}
      type={type}
      onClick={onClick}
      disabled={disabled}
      className={classes}
      onMouseMove={onMouseMove}
      onMouseLeave={onMouseLeave}
      {...motionProps}
    >
      {children}
    </motion.button>
  )
}
