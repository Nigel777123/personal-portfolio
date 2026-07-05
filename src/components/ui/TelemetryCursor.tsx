'use client'

import { useEffect, useRef } from 'react'

function isInteractiveElement(target: EventTarget | null) {
  if (!(target instanceof Element)) return false
  return Boolean(
    target.closest(
      'button, a, input, textarea, select, summary, [role="button"], [role="link"], .cta, .cta-button, .magnetic-button',
    ),
  )
}

export function TelemetryCursor() {
  const dotRef = useRef<HTMLDivElement>(null)
  const ringRef = useRef<HTMLDivElement>(null)
  const innerRingRef = useRef<HTMLDivElement>(null)
  const isMounted = useRef(false)

  useEffect(() => {
    // Don't render on touch devices
    const coarsePointer =
      window.matchMedia('(pointer: coarse)').matches ||
      window.matchMedia('(hover: none)').matches
    if (coarsePointer) return

    isMounted.current = true
    const dot = dotRef.current
    const ring = ringRef.current
    const innerRing = innerRingRef.current
    if (!dot || !ring || !innerRing) return

    // Make elements visible now that we know it's a pointer device
    dot.style.opacity = '1'
    ring.style.opacity = '1'

    let rafId = 0
    let mx = -100
    let my = -100

    // Color state — avoid className thrashing, use data attrs
    const applyColor = (locked: boolean, isLink: boolean) => {
      if (locked && isLink) {
        innerRing.dataset.tone = 'cyan'
      } else if (locked) {
        innerRing.dataset.tone = 'red'
      } else {
        innerRing.dataset.tone = 'lime'
      }
    }

    const onMouseMove = (e: MouseEvent) => {
      mx = e.clientX
      my = e.clientY

      const locked = isInteractiveElement(e.target)
      const isLink =
        e.target instanceof HTMLElement && e.target.tagName === 'A'
      applyColor(locked, isLink)

      if (locked) {
        ring.dataset.locked = 'true'
      } else {
        delete ring.dataset.locked
      }

      cancelAnimationFrame(rafId)
      rafId = requestAnimationFrame(() => {
        dot.style.transform = `translate3d(${mx - 3}px,${my - 3}px,0)`
        ring.style.transform = `translate3d(${mx - 16}px,${my - 16}px,0) scale(${locked ? 1.25 : 1})`
      })
    }

    const onMouseLeave = () => {
      mx = -100
      my = -100
      cancelAnimationFrame(rafId)
      rafId = requestAnimationFrame(() => {
        dot.style.transform = `translate3d(-100px,-100px,0)`
        ring.style.transform = `translate3d(-116px,-116px,0)`
      })
    }

    document.body.style.cursor = 'none'
    window.addEventListener('mousemove', onMouseMove, { passive: true })
    window.addEventListener('mouseleave', onMouseLeave)

    return () => {
      cancelAnimationFrame(rafId)
      document.body.style.cursor = ''
      window.removeEventListener('mousemove', onMouseMove)
      window.removeEventListener('mouseleave', onMouseLeave)
    }
  }, [])

  // Always render the DOM nodes (hidden by default), reveal on pointer device
  return (
    <>
      {/* Dot */}
      <div
        ref={dotRef}
        aria-hidden
        style={{
          position: 'fixed',
          left: 0,
          top: 0,
          zIndex: 9999,
          pointerEvents: 'none',
          mixBlendMode: 'screen',
          opacity: 0,
          willChange: 'transform',
          transform: 'translate3d(-100px,-100px,0)',
        }}
      >
        <div
          style={{
            width: 6,
            height: 6,
            borderRadius: '50%',
            background: 'rgb(163 230 53)',
            boxShadow: '0 0 12px rgba(163,230,53,0.9)',
          }}
        />
      </div>

      {/* Ring */}
      <div
        ref={ringRef}
        aria-hidden
        style={{
          position: 'fixed',
          left: 0,
          top: 0,
          zIndex: 9999,
          pointerEvents: 'none',
          mixBlendMode: 'screen',
          opacity: 0,
          willChange: 'transform',
          transform: 'translate3d(-116px,-116px,0)',
          width: 32,
          height: 32,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          transition: 'transform 120ms ease-out',
        }}
      >
        <div
          ref={innerRingRef}
          data-tone="lime"
          aria-hidden
          style={{
            position: 'relative',
            width: 32,
            height: 32,
            borderRadius: '50%',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}
          className="telemetry-ring"
        >
          {/* tick marks */}
          <span className="telemetry-tick telemetry-tick-top" />
          <span className="telemetry-tick telemetry-tick-bottom" />
          <span className="telemetry-tick telemetry-tick-left" />
          <span className="telemetry-tick telemetry-tick-right" />
          <span className="telemetry-center-dot" />
        </div>
      </div>

      <style>{`
        /* Ring tones driven by data-tone attribute — no JS className writes */
        .telemetry-ring {
          border: 1px solid;
          transition: border-color 150ms, box-shadow 150ms;
        }
        .telemetry-ring[data-tone="lime"] {
          border-color: rgba(132,204,22,0.4);
          box-shadow: 0 0 18px rgba(132,204,22,0.24);
          border-style: solid;
        }
        .telemetry-ring[data-tone="cyan"] {
          border-color: rgba(34,211,238,0.8);
          box-shadow: 0 0 18px rgba(34,211,238,0.45);
          border-style: dashed;
        }
        .telemetry-ring[data-tone="red"] {
          border-color: rgba(251,113,133,0.8);
          box-shadow: 0 0 18px rgba(251,113,133,0.45);
          border-style: dashed;
        }

        /* Tick marks */
        .telemetry-tick {
          position: absolute;
        }
        .telemetry-tick-top    { top: 0;    left: 50%; width: 1px; height: 6px; transform: translateX(-50%); }
        .telemetry-tick-bottom { bottom: 0; left: 50%; width: 1px; height: 6px; transform: translateX(-50%); }
        .telemetry-tick-left   { left: 0;   top: 50%;  width: 6px; height: 1px; transform: translateY(-50%); }
        .telemetry-tick-right  { right: 0;  top: 50%;  width: 6px; height: 1px; transform: translateY(-50%); }

        .telemetry-ring[data-tone="lime"] .telemetry-tick   { background: rgba(163,230,53,0.7); }
        .telemetry-ring[data-tone="cyan"] .telemetry-tick   { background: rgba(34,211,238,0.8); }
        .telemetry-ring[data-tone="red"]  .telemetry-tick   { background: rgba(251,113,133,0.8); }

        /* Center dot */
        .telemetry-center-dot {
          width: 6px;
          height: 6px;
          border-radius: 50%;
          transition: background 150ms, box-shadow 150ms;
        }
        .telemetry-ring[data-tone="lime"] .telemetry-center-dot {
          background: rgba(163,230,53,1);
          box-shadow: 0 0 10px rgba(163,230,53,0.7);
        }
        .telemetry-ring[data-tone="cyan"] .telemetry-center-dot {
          background: rgba(34,211,238,1);
          box-shadow: 0 0 10px rgba(34,211,238,0.75);
        }
        .telemetry-ring[data-tone="red"] .telemetry-center-dot {
          background: rgba(251,113,133,1);
          box-shadow: 0 0 10px rgba(251,113,133,0.75);
        }
      `}</style>
    </>
  )
}