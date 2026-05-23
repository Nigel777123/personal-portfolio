import { motion } from 'framer-motion'

export function F1Logo3D() {
  return (
    <motion.div
      className="relative isolate flex h-10 w-32 items-center justify-center overflow-hidden rounded-sm border border-white/5 bg-transparent px-1 py-0.5 sm:h-11 sm:w-36"
      initial={{ rotateX: 8, rotateY: -10, y: 0 }}
      animate={{ rotateX: [8, 5, 8], rotateY: [-10, -6, -10], y: [0, -1, 0] }}
      transition={{ duration: 6, repeat: Infinity, ease: 'easeInOut' }}
      whileHover={{ rotateX: 0, rotateY: 0, scale: 1.03 }}
      style={{ transformStyle: 'preserve-3d', perspective: 900 }}
      aria-label="Formula 1 logo"
    >
      <img
        src="/F1-logo-red-on-white.avif"
        alt="Formula 1"
        className="relative h-full w-full object-contain mix-blend-multiply saturate-150 contrast-125 brightness-110 drop-shadow-[0_8px_14px_rgba(225,6,0,0.35)]"
        loading="eager"
        decoding="async"
      />
    </motion.div>
  )
}