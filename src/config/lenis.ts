import type { LenisOptions } from 'lenis'

/** Ease-out cubic glide — smooth launch, graceful stop (racetrack deceleration). */
export const racetrackEasing = (t: number) => 1 - (1 - t) ** 3

/** Fixed nav + RPM strip clearance (matches `scroll-padding-top` in CSS). */
export const SCROLL_ANCHOR_OFFSET = 88

export const LENIS_OPTIONS: LenisOptions = {
  duration: 1.35,
  easing: racetrackEasing,
  orientation: 'vertical',
  smoothWheel: true,
  autoRaf: false,
  anchors: {
    offset: SCROLL_ANCHOR_OFFSET,
    duration: 1.35,
    easing: racetrackEasing,
  },
}
