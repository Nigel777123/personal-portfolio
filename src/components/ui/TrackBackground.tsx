export function TrackBackground() {
  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden" aria-hidden>
      <svg
        className="absolute inset-0 h-full w-full opacity-[0.07]"
        xmlns="http://www.w3.org/2000/svg"
        preserveAspectRatio="none"
      >
        <defs>
          <pattern id="grid" width="40" height="40" patternUnits="userSpaceOnUse">
            <path d="M 40 0 L 0 0 0 40" fill="none" stroke="white" strokeWidth="0.5" />
          </pattern>
        </defs>
        <rect width="100%" height="100%" fill="url(#grid)" />
      </svg>
      <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[#E10600]/40 to-transparent" />
      <div className="absolute left-1/2 top-1/4 h-[60%] w-px -translate-x-1/2 bg-gradient-to-b from-transparent via-white/10 to-transparent" />
    </div>
  )
}
