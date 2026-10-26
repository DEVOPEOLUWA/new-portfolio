import Lenis from 'lenis'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

let lenisInstance: Lenis | null = null
let tickerFn: ((time: number) => void) | null = null

export function useLenis() {
  const initLenis = () => {
    if (typeof window === 'undefined' || lenisInstance) return
    gsap.registerPlugin(ScrollTrigger)

    lenisInstance = new Lenis({
      duration: 1.2,
      easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothWheel: !window.matchMedia('(prefers-reduced-motion: reduce)').matches,
    })
    lenisInstance.on('scroll', ScrollTrigger.update)

    tickerFn = (time: number) => lenisInstance?.raf(time * 1000)
    gsap.ticker.add(tickerFn)
    gsap.ticker.lagSmoothing(0)
  }

  const scrollTo = (target: string | number, options?: { offset?: number; duration?: number }) => {
    if (!lenisInstance) {
      if (typeof target === 'number') window.scrollTo({ top: target })
      else document.querySelector(target)?.scrollIntoView({ behavior: 'smooth' })
      return
    }
    // Resolve element targets against the real page position — Lenis' own
    // element lookup trusts its internal scroll value, which can drift.
    let y = typeof target === 'number' ? target : null
    if (y === null) {
      const el = document.querySelector(target as string)
      if (!el) return
      y = el.getBoundingClientRect().top + window.scrollY
    }
    lenisInstance.scrollTo(Math.max(0, y + (options?.offset ?? 0)), { duration: options?.duration ?? 1.5, force: true })
  }

  const stop = () => lenisInstance?.stop()
  const start = () => lenisInstance?.start()

  const destroy = () => {
    if (tickerFn) gsap.ticker.remove(tickerFn)
    tickerFn = null
    lenisInstance?.destroy()
    lenisInstance = null
  }

  return { initLenis, scrollTo, stop, start, destroy }
}
