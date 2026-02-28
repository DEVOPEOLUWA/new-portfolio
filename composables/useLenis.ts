import { ref, onMounted, onUnmounted } from 'vue'
import Lenis from 'lenis'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

let lenisInstance: Lenis | null = null

export function useLenis() {
    const isReady = ref(false)

    const initLenis = () => {
        if (typeof window === 'undefined') return

        gsap.registerPlugin(ScrollTrigger)

        lenisInstance = new Lenis({
            duration: 1.2,
            easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
            smoothWheel: true,
        })

        // Connect Lenis with GSAP ScrollTrigger
        lenisInstance.on('scroll', ScrollTrigger.update)

        gsap.ticker.add((time: number) => {
            lenisInstance?.raf(time * 1000)
        })
        gsap.ticker.lagSmoothing(0)

        isReady.value = true
    }

    const scrollTo = (target: string | number, options?: { offset?: number; duration?: number }) => {
        lenisInstance?.scrollTo(target, {
            offset: options?.offset ?? 0,
            duration: options?.duration ?? 1.5,
        })
    }

    const stop = () => lenisInstance?.stop()
    const start = () => lenisInstance?.start()

    const destroy = () => {
        lenisInstance?.destroy()
        lenisInstance = null
        isReady.value = false
    }

    return {
        initLenis,
        scrollTo,
        stop,
        start,
        destroy,
        isReady,
    }
}
