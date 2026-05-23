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
    'bg-[#E10600] text-white uppercase tracking-widest font-bold shadow-lg shadow-[#E10600]/40 hover:shadow-[#E10600]/60 border border-[#ff3333]/50',
  secondary:
    'border-2 border-white/30 bg-neutral-900/80 text-white uppercase tracking-wider hover:checkered-active hover:border-[#d4ff00]/60',
  ghost: 'text-zinc-400 hover:text-[#d4ff00] uppercase tracking-wider',
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
  const { ref, onMouseMove, onMouseLeave } = useMagnetic(0.22)
  const classes = cn(
    'inline-flex items-center justify-center gap-2 rounded-sm px-6 py-3 text-sm transition-shadow duration-300 font-display',
    variants[variant],
    disabled && 'pointer-events-none opacity-50',
    className,
  )

  const motionProps = {
    whileHover: { scale: 1.04 },
    whileTap: { scale: 0.97 },
    transition: { type: 'spring' as const, stiffness: 500, damping: 22 },
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
