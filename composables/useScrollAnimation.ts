import { onMounted, onUnmounted, type Ref } from 'vue'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

// Ensure ScrollTrigger is registered
if (typeof window !== 'undefined') {
    gsap.registerPlugin(ScrollTrigger)
}

type AnimationPreset = 'fadeUp' | 'fadeIn' | 'staggerUp' | 'slideInLeft' | 'slideInRight' | 'reveal'

interface ScrollAnimationOptions {
    trigger: string | HTMLElement
    preset?: AnimationPreset
    delay?: number
    duration?: number
    staggerAmount?: number
    start?: string
    end?: string
    markers?: boolean
}

export function useScrollAnimation() {
    const triggers: ScrollTrigger[] = []

    const presets: Record<AnimationPreset, gsap.TweenVars> = {
        fadeUp: {
            y: 40,
            opacity: 0,
            duration: 0.9,
            ease: 'power3.out',
        },
        fadeIn: {
            opacity: 0,
            duration: 0.8,
            ease: 'power2.out',
        },
        staggerUp: {
            y: 30,
            opacity: 0,
            duration: 0.7,
            ease: 'power3.out',
        },
        slideInLeft: {
            x: -40,
            opacity: 0,
            duration: 0.8,
            ease: 'power3.out',
        },
        slideInRight: {
            x: 40,
            opacity: 0,
            duration: 0.8,
            ease: 'power3.out',
        },
        reveal: {
            clipPath: 'inset(100% 0% 0% 0%)',
            duration: 1,
            ease: 'power4.out',
        },
    }

    const animate = (options: ScrollAnimationOptions) => {
        if (typeof window === 'undefined') return

        const {
            trigger,
            preset = 'fadeUp',
            delay = 0,
            duration,
            staggerAmount = 0.15,
            start = 'top 85%',
            end = 'bottom 20%',
            markers = false,
        } = options

        const fromVars = { ...presets[preset] }
        if (duration) fromVars.duration = duration

        const element = typeof trigger === 'string' ? document.querySelector(trigger) : trigger
        if (!element) return

        // For stagger, animate children
        if (preset === 'staggerUp') {
            const children = element.children
            if (children.length === 0) return

            gsap.set(children, { y: fromVars.y, opacity: 0 })

            const tween = gsap.to(children, {
                y: 0,
                opacity: 1,
                duration: fromVars.duration,
                ease: fromVars.ease,
                stagger: staggerAmount,
                delay,
                scrollTrigger: {
                    trigger: element,
                    start,
                    end,
                    toggleActions: 'play none none none',
                    markers,
                },
            })

            if (tween.scrollTrigger) triggers.push(tween.scrollTrigger)
        } else {
            gsap.set(element, preset === 'reveal'
                ? { clipPath: 'inset(100% 0% 0% 0%)' }
                : { opacity: 0, ...(fromVars.y ? { y: fromVars.y } : {}), ...(fromVars.x ? { x: fromVars.x } : {}) }
            )

            const toVars: gsap.TweenVars = {
                ...(preset === 'reveal'
                    ? { clipPath: 'inset(0% 0% 0% 0%)' }
                    : { opacity: 1, y: 0, x: 0 }
                ),
                duration: fromVars.duration,
                ease: fromVars.ease,
                delay,
                scrollTrigger: {
                    trigger: element,
                    start,
                    end,
                    toggleActions: 'play none none none',
                    markers,
                },
            }

            const tween = gsap.to(element, toVars)
            if (tween.scrollTrigger) triggers.push(tween.scrollTrigger)
        }
    }

    const cleanup = () => {
        triggers.forEach(t => t.kill())
        triggers.length = 0
    }

    onUnmounted(cleanup)

    return {
        animate,
        cleanup,
    }
}
