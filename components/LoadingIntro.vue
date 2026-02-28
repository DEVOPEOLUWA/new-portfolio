<template>
  <div
    v-if="visible"
    ref="containerRef"
    class="fixed inset-0 z-[100] flex items-center justify-center overflow-hidden"
    :class="isDark ? 'bg-[#0A0A0A]' : 'bg-[#F5F5F0]'"
  >
    <!-- Subtle grid -->
    <div class="absolute inset-0 pointer-events-none opacity-[0.04]" style="
      background-image: linear-gradient(var(--txt-primary) 1px, transparent 1px),
                         linear-gradient(90deg, var(--txt-primary) 1px, transparent 1px);
      background-size: 60px 60px;
    " />

    <!-- Geometric circles -->
    <div class="absolute pointer-events-none" style="width: 700px; height: 700px;">
      <svg ref="radarSvg" class="absolute inset-0 w-full h-full opacity-[0.12]" viewBox="0 0 700 700">
        <circle cx="350" cy="350" r="300" fill="none" stroke="var(--txt-primary)" stroke-width="0.5" stroke-dasharray="6 10" />
        <circle cx="350" cy="350" r="200" fill="none" stroke="var(--txt-primary)" stroke-width="0.4" stroke-dasharray="3 12" />
        <circle cx="350" cy="350" r="100" fill="none" stroke="var(--txt-primary)" stroke-width="0.4" />
        <!-- Tick marks -->
        <g v-for="n in 72" :key="n" :transform="`rotate(${n * 5}, 350, 350)`">
          <line x1="350" y1="55" x2="350" :y2="n % 9 === 0 ? 68 : 61" stroke="var(--txt-primary)" :stroke-width="n % 9 === 0 ? 0.8 : 0.3" />
        </g>
      </svg>

      <!-- Sweep glow — rotating clock hand -->
      <div
        ref="sweepRef"
        class="absolute inset-0 rounded-full"
        :style="`background: conic-gradient(from 0deg, transparent 0deg, var(--accent) 8deg, ${isDark ? 'rgba(255,255,255,0.06)' : 'rgba(0,0,0,0.06)'} 30deg, transparent 50deg);`"
      />
    </div>

    <!-- Name text — O.A dramatic reveal -->
    <div class="relative z-10 text-center px-6">
      <div ref="nameBlockRef" class="relative flex items-center justify-center">
        <!-- Ghost O.A -->
        <div class="flex items-end gap-1 select-none">
          <span class="font-display text-[28vw] sm:text-[22vw] md:text-[16vw] leading-[0.85] tracking-tight" style="color: var(--txt-primary); opacity: 0.04;">O</span>
          <span class="w-3 h-3 sm:w-4 sm:h-4 md:w-5 md:h-5 rounded-full mb-[3vw] sm:mb-[2.5vw] md:mb-[1.8vw]" style="background: var(--txt-primary); opacity: 0.04;" />
          <span class="font-display text-[28vw] sm:text-[22vw] md:text-[16vw] leading-[0.85] tracking-tight italic" style="color: var(--txt-primary); opacity: 0.04;">A</span>
        </div>
        <!-- Foreground O.A — clip revealed -->
        <div
          ref="revealNameRef"
          class="absolute inset-0 flex items-end justify-center gap-1 select-none"
        >
          <span ref="loadO" class="font-display text-[28vw] sm:text-[22vw] md:text-[16vw] leading-[0.85] tracking-tight" style="color: var(--txt-primary); opacity: 0.9;">O</span>
          <span ref="loadDot" class="w-3 h-3 sm:w-4 sm:h-4 md:w-5 md:h-5 rounded-full mb-[3vw] sm:mb-[2.5vw] md:mb-[1.8vw]" style="background: var(--accent);" />
          <span ref="loadA" class="font-display text-[28vw] sm:text-[22vw] md:text-[16vw] leading-[0.85] tracking-tight italic" style="color: var(--accent);">A</span>
        </div>
      </div>
      <!-- Subtitle under the logo -->
      <div ref="loadSubRef" class="mt-4 font-mono text-[10px] sm:text-xs tracking-[0.4em] uppercase opacity-0" style="color: var(--txt-muted);">
        OPEOLUWA AYODEJI
      </div>
    </div>

    <!-- HUD metadata — top -->
    <div class="absolute top-6 left-6 md:top-8 md:left-10 font-mono text-[10px] tracking-[0.2em] space-y-1" style="color: var(--txt-muted);">
      <div ref="hudTL1" class="opacity-0">FRONTEND ENGINEER</div>
      <div ref="hudTL2" class="opacity-0">PORTFOLIO v2.0</div>
    </div>

    <div class="absolute top-6 right-6 md:top-8 md:right-10 font-mono text-[10px] tracking-[0.2em] text-right space-y-1" style="color: var(--txt-muted);">
      <div ref="hudTR1" class="opacity-0">{{ currentYear }}</div>
      <div ref="hudTR2" class="opacity-0">&lt;/&gt;</div>
    </div>

    <!-- Bottom center: status + progress -->
    <div class="absolute bottom-8 md:bottom-12 flex flex-col items-center gap-3">
      <div
        ref="statusRef"
        class="font-mono text-[10px] tracking-[0.3em] opacity-0 uppercase"
        style="color: var(--txt-muted);"
      >
        ... initializing ...
      </div>
      <div
        ref="counterRef"
        class="font-mono text-[11px] tracking-[0.5em] opacity-0"
        style="color: var(--txt-secondary);"
      >
        { <span ref="percentRef">000</span> }
      </div>
      <div
        ref="barWrapRef"
        class="w-40 h-[1px] opacity-0 overflow-hidden"
        style="background: var(--line);"
      >
        <div ref="barRef" class="h-full w-0" style="background: var(--accent);" />
      </div>
    </div>

    <!-- Bottom corners -->
    <div class="absolute bottom-6 left-6 md:bottom-8 md:left-10 font-mono text-[10px] tracking-[0.15em]" style="color: var(--txt-muted); opacity: 0.6;">
      <div ref="hudBL" class="opacity-0">SYS: READY</div>
    </div>
    <div class="absolute bottom-6 right-6 md:bottom-8 md:right-10 font-mono text-[10px] tracking-[0.15em] text-right" style="color: var(--txt-muted); opacity: 0.6;">
      <div ref="hudBR" class="opacity-0">LOADING ASSETS</div>
    </div>
  </div>

  <!-- Pillar columns overlay -->
  <Teleport to="body">
    <div
      v-if="showBlinds"
      ref="blindsWrapRef"
      class="fixed inset-0 z-[99] flex flex-row pointer-events-none"
    >
      <div
        v-for="n in blindCount"
        :key="n"
        class="flex-1 h-full origin-bottom"
        :class="isDark ? 'bg-[#F0EDE8]' : 'bg-[#1A1918]'"
        :ref="el => { if (el) blindSlats[n - 1] = el as HTMLElement }"
      />
    </div>
  </Teleport>
</template>

<script setup lang="ts">
import { ref, onMounted, nextTick, computed } from 'vue'
import { gsap } from 'gsap'
import { useTheme } from '~/composables/useTheme'

const emit = defineEmits<{
  (e: 'finished'): void
}>()

const { isDark } = useTheme()

const visible = ref(true)
const showBlinds = ref(false)

// Refs
const containerRef = ref<HTMLElement | null>(null)
const sweepRef = ref<HTMLElement | null>(null)
const revealNameRef = ref<HTMLElement | null>(null)
const nameBlockRef = ref<HTMLElement | null>(null)
const loadO = ref<HTMLElement | null>(null)
const loadDot = ref<HTMLElement | null>(null)
const loadA = ref<HTMLElement | null>(null)
const loadSubRef = ref<HTMLElement | null>(null)
const counterRef = ref<HTMLElement | null>(null)
const percentRef = ref<HTMLElement | null>(null)
const barWrapRef = ref<HTMLElement | null>(null)
const barRef = ref<HTMLElement | null>(null)
const statusRef = ref<HTMLElement | null>(null)
const hudTL1 = ref<HTMLElement | null>(null)
const hudTL2 = ref<HTMLElement | null>(null)
const hudTR1 = ref<HTMLElement | null>(null)
const hudTR2 = ref<HTMLElement | null>(null)
const hudBL = ref<HTMLElement | null>(null)
const hudBR = ref<HTMLElement | null>(null)
const radarSvg = ref<SVGElement | null>(null)
const blindsWrapRef = ref<HTMLElement | null>(null)
const blindSlats = ref<HTMLElement[]>([])

const blindCount = 8
const currentYear = computed(() => new Date().getFullYear())

onMounted(async () => {
  await nextTick()

  // Initially hide the O.A letters
  gsap.set([loadO.value, loadDot.value, loadA.value], {
    opacity: 0, y: 40, scale: 0.7, filter: 'blur(8px)',
  })
  gsap.set(revealNameRef.value, { opacity: 1 })

  const tl = gsap.timeline()

  // 1. Fade in HUD elements
  const hudEls = [hudTL1, hudTL2, hudTR1, hudTR2, hudBL, hudBR].map(r => r.value).filter(Boolean)
  tl.to(hudEls, {
    opacity: 1,
    duration: 0.5,
    stagger: 0.06,
    ease: 'power2.out',
  }, 0)

  // 2. Show status + counter
  tl.to(statusRef.value, { opacity: 1, duration: 0.4 }, 0.2)
  tl.to(counterRef.value, { opacity: 1, duration: 0.4 }, 0.3)
  tl.to(barWrapRef.value, { opacity: 1, duration: 0.3 }, 0.35)

  // 3. Sweep rotation (clock hand) + subtle radar circle spin
  gsap.to(sweepRef.value, {
    rotation: 360,
    duration: 3,
    ease: 'none',
    repeat: 0,
    transformOrigin: 'center center',
  })

  gsap.to(radarSvg.value, {
    rotation: -15,
    duration: 4,
    ease: 'power1.inOut',
  })

  // 4. Reveal O — dramatic slam in
  tl.to(loadO.value, {
    opacity: 0.9, y: 0, scale: 1, filter: 'blur(0px)',
    duration: 0.5, ease: 'back.out(1.8)',
  }, 0.5)

  // Dot punches in with bounce
  tl.to(loadDot.value, {
    opacity: 1, y: 0, scale: 1.5, filter: 'blur(0px)',
    duration: 0.3, ease: 'back.out(4)',
  }, 0.9)
  tl.to(loadDot.value, {
    scale: 1, duration: 0.3, ease: 'elastic.out(1, 0.5)',
  }, 1.2)

  // A slams in
  tl.to(loadA.value, {
    opacity: 1, y: 0, scale: 1, filter: 'blur(0px)',
    duration: 0.5, ease: 'back.out(1.8)',
  }, 1.1)

  // Subtitle fades in
  tl.to(loadSubRef.value, {
    opacity: 1, duration: 0.6, ease: 'power2.out',
  }, 1.6)

  // 5. Counter 000 → 100
  const counter = { val: 0 }
  tl.to(counter, {
    val: 100,
    duration: 2.2,
    ease: 'power2.inOut',
    onUpdate: () => {
      if (percentRef.value) {
        percentRef.value.textContent = Math.round(counter.val).toString().padStart(3, '0')
      }
    },
  }, 0.4)

  // Progress bar
  tl.to(barRef.value, {
    width: '100%',
    duration: 2.2,
    ease: 'power2.inOut',
  }, 0.4)

  // 6. Update status text mid-way
  tl.add(() => {
    if (statusRef.value) {
      statusRef.value.textContent = '... system ready ...'
    }
  }, 2.0)

  // 7. Hold for a beat
  tl.to({}, { duration: 0.4 }, 3.0)

  // 8. Exit — everything fades
  tl.to(containerRef.value, {
    opacity: 0,
    duration: 0.5,
    ease: 'power2.in',
    onComplete: () => {
      visible.value = false
    },
  }, 3.4)

  // 9. Show blinds and animate them out
  tl.add(() => {
    showBlinds.value = true
  }, 3.4)

  tl.to({}, { duration: 0.05 }, 3.45)

  tl.add(() => {
    // Set all pillars to full height
    gsap.set(blindSlats.value, { scaleY: 1 })
    // Stagger from edges, each column shrinks down at different speeds — pillar/staircase effect
    gsap.to(blindSlats.value, {
      scaleY: 0,
      duration: 0.8,
      ease: 'power3.inOut',
      stagger: {
        each: 0.06,
        from: 'edges',
      },
      onComplete: () => {
        showBlinds.value = false
        emit('finished')
      },
    })
  }, 3.5)
})
</script>

<style scoped>
</style>
