import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

// Keep in sync with the `@media` blocks that lay sections out side by side.
export const H_QUERY = '(min-width: 900px) and (min-height: 560px)'

let st: ScrollTrigger | null = null
let trackEl: HTMLElement | null = null
const active = ref(false)
const progress = ref(0)

/**
 * Vertical scrolling drives a horizontal track of panels on desktop.
 * On phones the panels simply stack and scroll normally.
 */
export function useHorizontal() {
  function setup(wrap: HTMLElement, track: HTMLElement) {
    gsap.registerPlugin(ScrollTrigger)
    const mm = gsap.matchMedia()

    mm.add(H_QUERY, () => {
      trackEl = track
      const distance = () => track.scrollWidth - window.innerWidth
      const skew = gsap.quickTo(track, 'skewX', { duration: 0.5, ease: 'power3.out' })
      let settle: ReturnType<typeof setTimeout> | null = null

      st = ScrollTrigger.create({
        trigger: wrap,
        start: 'top top',
        end: () => `+=${distance()}`,
        pin: true,
        scrub: 0.6,
        invalidateOnRefresh: true,
        animation: gsap.to(track, { x: () => -distance(), ease: 'none' }),
        onUpdate: (self) => {
          progress.value = self.progress
          // The strip leans into the direction of travel, then straightens up
          skew(gsap.utils.clamp(-6, 6, self.getVelocity() / -350))
          if (settle) clearTimeout(settle)
          settle = setTimeout(() => skew(0), 120)
        },
      })
      active.value = true

      const refit = () => fit(track)
      ScrollTrigger.addEventListener('refresh', refit)
      refit()

      return () => {
        ScrollTrigger.removeEventListener('refresh', refit)
        track.querySelectorAll<HTMLElement>('[data-fit]').forEach((el) => gsap.set(el, { clearProps: 'scale' }))
        st = null
        trackEl = null
        active.value = false
        progress.value = 0
        gsap.set(track, { clearProps: 'transform' })
      }
    })

    return mm
  }

  /** Vertical scroll position that brings `el` to the left edge, or null when not horizontal. */
  function scrollFor(el: Element): number | null {
    if (!st || !trackEl || !trackEl.contains(el)) return null
    // Panels are direct children of the track; measure from layout, not from the
    // (skewed, moving) on-screen box
    let panel = el as HTMLElement
    while (panel.parentElement && panel.parentElement !== trackEl) panel = panel.parentElement
    return st.start + Math.min(Math.max(0, panel.offsetLeft), st.end - st.start)
  }

  /**
   * Short laptop screens: shrink any [data-fit] block that would otherwise run
   * under the floating nav pill (top) or the travel road (bottom).
   */
  function fit(track: HTMLElement) {
    // Use the pill's layout size — on first load it's still sliding in from above
    const pill = document.querySelector<HTMLElement>('.pill')
    const top = 14 + (pill?.offsetHeight ?? 60) + 14
    const bottom = window.innerHeight - 84
    track.querySelectorAll<HTMLElement>('[data-fit]').forEach((el) => {
      gsap.set(el, { scale: 1, transformOrigin: '50% 50%' })
      const r = el.getBoundingClientRect()
      const c = (r.top + r.bottom) / 2
      const s = Math.min(1, (2 * (c - top)) / r.height, (2 * (bottom - c)) / r.height)
      if (s < 1) gsap.set(el, { scale: Math.max(0.6, s) })
    })
  }

  /** Each panel's position along the track, 0–1. */
  function stops(): { id: string; at: number }[] {
    if (!st || !trackEl) return []
    const total = st.end - st.start
    return [...trackEl.children].map((p) => ({
      id: (p as HTMLElement).id,
      at: Math.min(1, (p as HTMLElement).offsetLeft / total),
    }))
  }

  return { setup, scrollFor, stops, active, progress }
}
