<template>
  <section
    ref="sectionRef"
    class="relative min-h-screen w-full flex flex-col justify-center overflow-hidden px-6 md:px-24 pt-24 pb-16"
    @mousemove="onMouseMove"
  >


    <!-- Architectural Grid -->
    <div class="architectural-grid" />

    <!-- Three.js Canvas Container -->
    <div
      ref="canvasWrap"
      class="absolute inset-0 pointer-events-none"
      :class="{ 'opacity-0': !sceneReady }"
      style="transition: opacity 1.2s ease;"
    />

    <!-- Decorative accent shapes -->
    <div ref="decorRef" class="absolute inset-0 pointer-events-none overflow-hidden opacity-0">
      <div class="absolute -top-40 -right-40 w-80 h-80 md:w-[500px] md:h-[500px] rounded-full border border-line opacity-[0.08]" />
      <div class="absolute -bottom-24 -left-24 w-60 h-60 md:w-96 md:h-96 rounded-full border border-accent opacity-[0.06]" />
    </div>

    <!-- Main Content -->
    <div class="relative z-10 max-w-site mx-auto w-full">
      <div class="space-y-6 md:space-y-8">
        <!-- Role Tag with scramble animation -->
        <div ref="tagRef" class="overflow-hidden">
          <span ref="roleTextRef" class="mono-tag block translate-y-full">{ <span ref="roleInnerRef">FRONTEND ENGINEER</span> }</span>
        </div>
        <!-- rachycodes handle -->
        <p
          ref="handleRef"
          style="font-family:'Space Mono',monospace;font-size:11px;letter-spacing:0.2em;color:var(--txt-primary);opacity:0;margin-top:-4px;"
        >@rachycodes</p>

        <!-- Main Heading -->
        <h1 class="font-display text-[clamp(2.5rem,8vw,8rem)] leading-[0.9] tracking-tight">
          <span v-for="(word, wi) in headingWords" :key="wi" class="inline-block overflow-hidden mr-[0.25em]">
            <span
              :ref="el => { if (el) headingWordRefs[wi] = el as HTMLElement }"
              class="inline-block translate-y-full"
              :class="word.class"
            >{{ word.text }}</span>
          </span>
        </h1>

        <!-- Accent Divider -->
        <div ref="dividerRef" class="h-px bg-accent origin-left scale-x-0 w-24 md:w-32" />

        <!-- Subtitle -->
        <p ref="subtitleRef" class="font-sans text-base md:text-lg lg:text-xl max-w-xl leading-relaxed opacity-0 translate-y-6" style="color: var(--txt-primary); opacity: 0.75;">
          I build enterprise-grade systems that handle real complexity — then make them feel effortless to use.
        </p>

        <!-- CTA -->
        <div ref="ctaRef" class="flex items-center gap-6 pt-4 opacity-0 translate-y-6">
          <a
            href="#featured-works"
            class="font-sans text-sm font-medium hover:text-accent transition-smooth flex items-center gap-2"
            style="color: var(--txt-primary);"
            @click.prevent="scrollToProjects"
          >
            View Projects
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
              <line x1="7" y1="17" x2="17" y2="7"/>
              <polyline points="7 7 17 7 17 17"/>
            </svg>
          </a>
          <a
            href="mailto:ayodejiope13@gmail.com"
            class="font-sans text-sm font-medium hover:text-accent transition-smooth flex items-center gap-2"
            style="color: var(--txt-primary); opacity: 0.75;"
          >
            Get in touch
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
              <line x1="7" y1="17" x2="17" y2="7"/>
              <polyline points="7 7 17 7 17 17"/>
            </svg>
          </a>
        </div>
      </div>
    </div>

    <!-- Live metrics bar — bottom -->
    <div ref="metricsRef" class="absolute bottom-6 left-6 right-6 md:bottom-10 md:left-24 md:right-24 flex items-end justify-between opacity-0">
      <div class="flex items-center gap-8 md:gap-12">
        <!-- FPS -->
        <div class="font-mono text-[10px] tracking-[0.2em] text-txt-muted">
          <span class="text-accent font-medium">{{ fps }}</span> FPS
        </div>
        <!-- Viewport -->
        <div class="hidden md:block font-mono text-[10px] tracking-[0.2em] text-txt-muted">
          {{ viewW }} × {{ viewH }}
        </div>
        <!-- Local time -->
        <div class="font-mono text-[10px] tracking-[0.2em] text-txt-muted">
          {{ localTime }}
        </div>
      </div>
      <!-- Scroll indicator -->
      <button
        class="flex flex-col items-center gap-2 text-txt-muted cursor-pointer group"
        @click="scrollToProjects"
      >
        <span class="mono-tag group-hover:text-accent transition-smooth" style="writing-mode: vertical-rl">SCROLL</span>
        <div class="w-px h-12 bg-line relative overflow-hidden">
          <div class="w-full h-4 bg-accent scroll-pulse absolute top-0" />
        </div>
      </button>
    </div>
  </section>
</template>

<script setup lang="ts">
import { ref, watch, onMounted, onUnmounted } from 'vue'
import { gsap } from 'gsap'
import { useLenis } from '~/composables/useLenis'
import { useHero3D } from '~/composables/useHero3D'
import { useTheme } from '~/composables/useTheme'

const props = defineProps<{
  revealed?: boolean
}>()

const { scrollTo } = useLenis()
const { isDark } = useTheme()
const hero3D = useHero3D()

// ── Refs ──
const sectionRef = ref<HTMLElement | null>(null)
const canvasWrap = ref<HTMLElement | null>(null)
const tagRef = ref<HTMLElement | null>(null)
const headingWordRefs = ref<HTMLElement[]>([])
const dividerRef = ref<HTMLElement | null>(null)
const subtitleRef = ref<HTMLElement | null>(null)
const ctaRef = ref<HTMLElement | null>(null)
const decorRef = ref<HTMLElement | null>(null)
const metricsRef = ref<HTMLElement | null>(null)


// ── Role tag refs ──
const roleTextRef = ref<HTMLElement | null>(null)
const roleInnerRef = ref<HTMLElement | null>(null)
const handleRef = ref<HTMLElement | null>(null)

// ── State ──
const sceneReady = ref(false)

// ── Live metrics ──
const fps = ref(60)
const viewW = ref(1440)
const viewH = ref(900)
const localTime = ref('00:00:00')
let fpsFrames = 0
let fpsLast = performance.now()
let metricsRaf: number | null = null

const updateMetrics = () => {
  fpsFrames++
  const now = performance.now()
  if (now - fpsLast >= 1000) {
    fps.value = fpsFrames
    fpsFrames = 0
    fpsLast = now
    const d = new Date()
    localTime.value = d.toLocaleTimeString('en-US', { hour12: false })
  }
  metricsRaf = requestAnimationFrame(updateMetrics)
}

// ── Mouse ──
const onMouseMove = (e: MouseEvent) => {
  if (!sectionRef.value) return
  const rect = sectionRef.value.getBoundingClientRect()
  const nx = (e.clientX - rect.left) / rect.width - 0.5
  const ny = (e.clientY - rect.top) / rect.height - 0.5
  hero3D.onMouseMove(nx, ny)
}

// ── Resize ──
const onResize = () => {
  viewW.value = window.innerWidth
  viewH.value = window.innerHeight
  hero3D.onResize()
}

const headingWords = [
  { text: 'I', class: '' },
  { text: 'craft', class: '' },
  { text: 'digital', class: '' },
  { text: 'experiences', class: 'italic text-accent' },
  { text: 'that', class: '' },
  { text: 'feel', class: '' },
  { text: 'alive.', class: 'italic' },
]

const scrollToProjects = () => scrollTo('#projects', { offset: -80 })
const scrollToContact = () => scrollTo('#contact', { offset: -80 })

// ── Scramble text animation ──
const CHARS = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789!@#$%&*'
const roleTexts = ['FRONTEND ENGINEER', 'ENTERPRISE SYSTEM SPECIALIST']
let roleIndex = 0
let scrambleTimer: ReturnType<typeof setTimeout> | null = null
let scrambleInterval: ReturnType<typeof setInterval> | null = null

const scrambleTo = (target: string) => {
  if (!roleInnerRef.value) return
  const el = roleInnerRef.value
  const current = el.textContent || ''
  const maxLen = Math.max(current.length, target.length)
  let frame = 0
  const totalFrames = 20

  if (scrambleInterval) clearInterval(scrambleInterval)
  scrambleInterval = setInterval(() => {
    frame++
    let result = ''
    for (let i = 0; i < maxLen; i++) {
      // Characters resolve left-to-right over time
      const resolveAt = Math.floor((i / maxLen) * totalFrames)
      if (frame >= resolveAt + 4) {
        // Resolved — show target char (or nothing if past target length)
        result += i < target.length ? target[i] : ''
      } else {
        // Still scrambling — show random char
        result += CHARS[Math.floor(Math.random() * CHARS.length)]
      }
    }
    el.textContent = result

    if (frame >= totalFrames + 4) {
      if (scrambleInterval) clearInterval(scrambleInterval)
      el.textContent = target
    }
  }, 40)
}

const startRoleCycle = () => {
  const cycle = () => {
    roleIndex = (roleIndex + 1) % roleTexts.length
    scrambleTo(roleTexts[roleIndex])
    scrambleTimer = setTimeout(cycle, 4000)
  }
  // First switch after 3s
  scrambleTimer = setTimeout(cycle, 3000)
}

const runReveal = () => {
  const tl = gsap.timeline()

  // Decorative elements fade in
  tl.to(decorRef.value, { opacity: 1, duration: 1.2, ease: 'power2.out' }, 0)

  // Start 3D terrain reveal
  sceneReady.value = true
  hero3D.assembleIn(200)

  // Tag slides up
  if (tagRef.value) {
    tl.to(tagRef.value.querySelector('span'), {
      y: 0, duration: 0.6, ease: 'power3.out',
    }, 0.1)
  }

  // Heading words stagger in
  headingWordRefs.value.forEach((wordEl, i) => {
    tl.to(wordEl, { y: 0, duration: 0.7, ease: 'power3.out' }, 0.15 + i * 0.07)
  })

  // Divider
  tl.to(dividerRef.value, { scaleX: 1, duration: 0.7, ease: 'power3.out' }, 0.6)

  // Subtitle
  tl.to(subtitleRef.value, { opacity: 1, y: 0, duration: 0.7, ease: 'power3.out' }, 0.75)

  // Handle (@rachycodes)
  tl.to(handleRef.value, { opacity: 0.45, duration: 0.5, ease: 'power2.out' }, 0.55)

  // CTA
  tl.to(ctaRef.value, { opacity: 1, y: 0, duration: 0.6, ease: 'power3.out' }, 0.9)

  // Metrics bar
  tl.to(metricsRef.value, { opacity: 1, duration: 0.5, ease: 'power2.out' }, 0.85)

  // Start role text cycling after reveal
  setTimeout(startRoleCycle, 2500)
}

// Dark mode reactivity
watch(isDark, (val) => {
  hero3D.updateForDarkMode(val)
})

watch(() => props.revealed, (val) => {
  if (val) setTimeout(runReveal, 50)
})

onMounted(() => {
  if (typeof window === 'undefined') return

  onResize()
  window.addEventListener('resize', onResize)

  // Read accent color from CSS
  const styles = getComputedStyle(document.documentElement)
  const accent = styles.getPropertyValue('--accent').trim() || '#6B5D52'

  // Init Three.js scene
  if (canvasWrap.value) {
    hero3D.init({ container: canvasWrap.value, accentColor: accent })
    hero3D.updateForDarkMode(isDark.value)
  }

  // Start metrics loop
  const d = new Date()
  localTime.value = d.toLocaleTimeString('en-US', { hour12: false })
  metricsRaf = requestAnimationFrame(updateMetrics)

  if (props.revealed) setTimeout(runReveal, 50)
})

onUnmounted(() => {
  hero3D.destroy()
  if (metricsRaf) cancelAnimationFrame(metricsRaf)
  if (scrambleTimer) clearTimeout(scrambleTimer)
  if (scrambleInterval) clearInterval(scrambleInterval)
  window.removeEventListener('resize', onResize)
})
</script>

<style scoped>
.scroll-pulse {
  animation: scrollPulse 2s ease-in-out infinite;
}
@keyframes scrollPulse {
  0%, 100% { transform: translateY(0); opacity: 1; }
  50% { transform: translateY(32px); opacity: 0.3; }
}
</style>
