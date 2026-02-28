<template>
  <div id="projects-wrapper">
    <!-- Section wrapper — fades in as hero scrolls away -->
    <div
      ref="sectionFadeRef"
      :style="{
        background: isDark ? '#0a0a0a' : '#f5f5f0',
        transition: 'background-color 0.4s ease',
      }"
    >
      <!-- ── "FEATURED WORKS" top label ── -->
      <div
        ref="topLabelRef"
        class="fixed top-6 left-1/2 -translate-x-1/2 z-30 pointer-events-none"
        style="opacity: 0;"
      >
        <span
          style="
            font-family: monospace;
            font-size: 11px;
            letter-spacing: 0.3em;
            text-transform: uppercase;
            font-variant: small-caps;
          "
          :style="{ color: isDark ? 'rgba(255,255,255,0.4)' : 'rgba(0,0,0,0.4)' }"
        >Featured Works</span>
      </div>

      <!-- ── Section Entry Indicator ── -->
      <!-- Animated banner that sweeps in from left when section enters viewport -->
      <div
        ref="entryBannerRef"
        class="fixed z-40 pointer-events-none flex items-center"
        style="
          top: 50%;
          left: 0;
          transform: translate(-100%, -50%);
          padding: 20px 48px;
          gap: 16px;
          white-space: nowrap;
        "
        :style="{
          background: isDark ? 'rgba(240,237,232,0.96)' : 'rgba(26,25,24,0.94)',
          backdropFilter: 'blur(8px)',
        }"
      >
        <span
          class="block"
          style="font-size: 11px; font-family: monospace; letter-spacing: 0.3em; text-transform: uppercase;"
          :style="{ color: isDark ? '#1a1918' : '#f0ede8' }"
        >01 — Featured Works</span>
        <div style="width: 32px; height: 1px;" :style="{ background: isDark ? '#1a1918' : '#f0ede8', opacity: '0.4' }" />
        <span style="font-size: 11px; font-family: monospace; letter-spacing: 0.1em;"
          :style="{ color: isDark ? 'rgba(26,25,24,0.5)' : 'rgba(240,237,232,0.5)' }"
        >3 Projects</span>
      </div>

      <!-- ── Vertical progress bar — right edge ── -->
      <div
        class="fixed right-0 top-0 z-30 pointer-events-none"
        style="width: 2px; height: 100vh;"
        :style="{ background: isDark ? 'rgba(255,255,255,0.08)' : 'rgba(0,0,0,0.08)' }"
      >
        <div
          ref="progressBarRef"
          style="width: 100%; transform: scaleY(0); transform-origin: top; will-change: transform;"
          :style="{ background: isDark ? '#ffffff' : '#111111' }"
        />
      </div>

      <!-- ── Scene number indicator — bottom left ── -->
      <div
        ref="sceneNumRef"
        class="fixed bottom-8 left-8 z-30 pointer-events-none flex items-end gap-3"
        style="opacity: 0;"
      >
        <span
          ref="sceneCurrentRef"
          class="font-mono leading-none"
          style="font-size: clamp(48px, 6vw, 72px); font-weight: 200; line-height: 1; transition: opacity 0.3s ease;"
          :style="{ color: isDark ? 'rgba(255,255,255,0.85)' : 'rgba(0,0,0,0.75)' }"
        >01</span>
        <span class="font-mono mb-2" style="font-size: 14px;"
          :style="{ color: isDark ? 'rgba(255,255,255,0.2)' : 'rgba(0,0,0,0.2)' }"
        >/ 03</span>
      </div>

      <!-- ── Blink overlay (between scenes) ── -->
      <div
        ref="blinkRef"
        class="fixed inset-0 z-[55] pointer-events-none"
        :style="{ background: isDark ? '#000' : '#fff', opacity: 0 }"
      />

      <!-- ── Project Scenes ── -->
      <div
        v-for="(project, i) in projects"
        :key="i"
        :id="`scene-${i}`"
        :ref="(el: any) => { if (el) sceneRefs[i] = el as HTMLElement }"
        class="relative w-full flex overflow-hidden"
        style="height: 100vh;"
        :style="{ background: isDark ? '#0a0a0a' : '#f5f5f0', transition: 'background-color 0.4s ease' }"
      >
        <!-- LEFT COLUMN — Typography -->
        <div
          class="flex flex-col justify-center px-16 md:px-24 lg:px-32 relative z-10"
          style="width: 50%; height: 100%; flex-shrink: 0;"
        >
          <div
            :ref="(el: any) => { if (el) leftColRefs[i] = el as HTMLElement }"
            style="opacity: 0; transform: translateY(40px);"
          >
            <!-- Large project number -->
            <span
              class="block select-none pointer-events-none leading-none"
              style="font-size: clamp(100px, 12vw, 160px); font-weight: 200; line-height: 1;"
              :style="{ color: isDark ? 'rgba(255,255,255,0.06)' : 'rgba(0,0,0,0.08)' }"
            >{{ String(i + 1).padStart(2, '0') }}</span>

            <!-- Thin rule -->
            <div
              class="my-6"
              style="width: 40%; height: 1px;"
              :style="{ background: isDark ? 'rgba(255,255,255,0.15)' : 'rgba(0,0,0,0.15)' }"
            />

            <!-- Project name -->
            <h2
              class="font-display tracking-tight leading-tight"
              style="font-size: clamp(28px, 3.5vw, 48px); font-weight: 500;"
              :style="{ color: isDark ? '#f0ede8' : '#1a1918' }"
            >{{ project.name }}</h2>

            <!-- Tags — separated by middot -->
            <p
              class="mt-4 font-mono"
              style="font-size: 11px; letter-spacing: 0.2em; opacity: 0.5; text-transform: uppercase;"
              :style="{ color: isDark ? '#f0ede8' : '#1a1918' }"
            >{{ project.tags.join(' · ') }}</p>

            <!-- Descriptor -->
            <p
              class="mt-8 italic font-light leading-relaxed"
              style="font-size: clamp(14px, 1.2vw, 16px); max-width: 420px;"
              :style="{ color: isDark ? 'rgba(240,237,232,0.6)' : 'rgba(26,25,24,0.55)' }"
            >{{ project.descriptor }}</p>

            <!-- CTA -->
            <NuxtLink
              :to="`/projects/${project.slug}`"
              class="inline-flex items-center gap-3 mt-10 group"
              style="text-decoration: none;"
            >
              <span
                class="font-mono text-xs tracking-widest uppercase"
                :style="{ color: isDark ? 'rgba(255,255,255,0.5)' : 'rgba(0,0,0,0.5)' }"
                style="transition: color 0.3s ease;"
              >View Case Study</span>
              <span
                class="inline-block transition-transform duration-300 group-hover:translate-x-2"
                :style="{ color: isDark ? 'rgba(255,255,255,0.5)' : 'rgba(0,0,0,0.5)' }"
              >→</span>
            </NuxtLink>
          </div>
        </div>

        <!-- RIGHT COLUMN — Mockup panel -->
        <div
          class="relative flex items-center justify-center flex-shrink-0"
          style="width: 50%; height: 100%;"
          :style="{ background: isDark ? '#141414' : '#efefea', transition: 'background-color 0.4s ease' }"
        >
          <div
            :ref="(el: any) => { if (el) rightImgRefs[i] = el as HTMLElement }"
            style="opacity: 0; transform: translateX(60px) rotate(8deg); width: 80%;"
          >
            <NuxtLink
              :to="`/projects/${project.slug}`"
              style="display: block; text-decoration: none;"
            >

            <img
              :src="project.image"
              :alt="project.name"
              class="w-full h-auto object-cover rounded-lg"
              style="
                box-shadow: 0 40px 80px rgba(0,0,0,0.35);
                transition: transform 0.6s cubic-bezier(0.23, 1, 0.32, 1);
                display: block;
                max-height: 75vh;
                object-fit: cover;
              "
              @mouseenter="(e) => { (e.currentTarget as HTMLImageElement).style.transform = 'rotate(0deg) scale(1.03)' }"
              @mouseleave="(e) => { (e.currentTarget as HTMLImageElement).style.transform = 'rotate(0deg) scale(1)' }"
            />
          </NuxtLink>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, onUnmounted } from 'vue'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { useTheme } from '~/composables/useTheme'

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger)
}

const { isDark } = useTheme()

// ── Refs ──
const sectionFadeRef = ref<HTMLElement | null>(null)
const topLabelRef = ref<HTMLElement | null>(null)
const progressBarRef = ref<HTMLElement | null>(null)
const blinkRef = ref<HTMLElement | null>(null)
const entryBannerRef = ref<HTMLElement | null>(null)
const sceneNumRef = ref<HTMLElement | null>(null)
const sceneCurrentRef = ref<HTMLElement | null>(null)
const sceneRefs = ref<HTMLElement[]>([])
const leftColRefs = ref<HTMLElement[]>([])
const rightImgRefs = ref<HTMLElement[]>([])

const triggers: ScrollTrigger[] = []

// ── Project data ──
const projects = [
  {
    slug: 'ndic',
    name: 'NDIC Bank Liquidation System',
    image: '/images/ndic.png',
    tags: ['Angular 18', 'Enterprise', 'WebSockets'],
    descriptor: 'Enterprise liquidation platform managing 20M+ depositor records across Nigeria.',
  },
  {
    slug: 'nsia',
    name: 'NSIA Vendor Management',
    image: '/images/nsia.png',
    tags: ['Vue.js', 'Government', 'Frontend Lead'],
    descriptor: 'Government procurement system handling the full vendor lifecycle for Nigeria\'s sovereign wealth authority.',
  },
  {
    slug: 'ncc',
    name: 'NCC Licensing Platform',
    image: '/images/licensing.png',
    tags: ['Angular', 'Regulatory', 'UX Engineering'],
    descriptor: 'Digital licensing platform for Nigeria\'s national telecommunications regulator.',
  },
]

function triggerBlink() {
  if (!blinkRef.value) return
  gsap.timeline()
    .to(blinkRef.value, { opacity: 0.25, duration: 0.15, ease: 'power2.out' })
    .to(blinkRef.value, { opacity: 0, duration: 0.25, ease: 'power2.in' })
}

onMounted(() => {
  setTimeout(() => {
    ScrollTrigger.refresh()

    const totalScenes = projects.length

    // ── Section fade-in + entry banner ──
    if (sectionFadeRef.value) {
      gsap.set(sectionFadeRef.value, { opacity: 0 })
      ScrollTrigger.create({
        trigger: sectionFadeRef.value,
        start: 'top 85%',
        once: true,
        onEnter: () => {
          // Fade in section
          gsap.to(sectionFadeRef.value, { opacity: 1, duration: 0.8, ease: 'power2.out' })

          // Show top label
          if (topLabelRef.value) {
            gsap.to(topLabelRef.value, { opacity: 1, duration: 0.6, ease: 'power2.out', delay: 0.3 })
          }

          // Entry banner sweeps in from left, lingers, then exits
          if (entryBannerRef.value) {
            gsap.timeline({ delay: 0.2 })
              .to(entryBannerRef.value, {
                x: 0,
                duration: 0.7,
                ease: 'power3.out',
              })
              .to(entryBannerRef.value, {
                x: '-100%',
                duration: 0.6,
                ease: 'power3.in',
                delay: 1.6,
              })
          }

          // Scene number indicator fades in
          if (sceneNumRef.value) {
            gsap.to(sceneNumRef.value, { opacity: 1, duration: 0.6, delay: 0.5, ease: 'power2.out' })
          }
        },
      })
    }

    // ── Per-scene ScrollTrigger pins ──
    sceneRefs.value.forEach((scene, i) => {
      const left = leftColRefs.value[i]
      const right = rightImgRefs.value[i]
      if (!scene || !left || !right) return

      const st = ScrollTrigger.create({
        trigger: scene,
        start: 'top top',
        end: '+=100%',
        pin: true,
        pinSpacing: true,
        anticipatePin: 1,
        onEnter: () => {
          // Animate left col in
          gsap.to(left, {
            opacity: 1,
            y: 0,
            duration: 0.9,
            ease: 'power3.out',
          })
          // Animate right image in
          gsap.to(right, {
            opacity: 1,
            x: 0,
            rotate: 3,
            duration: 1.0,
            ease: 'power3.out',
            delay: 0.15,
          })

          // Scene number counter
          if (sceneCurrentRef.value) {
            gsap.to(sceneCurrentRef.value, { opacity: 0, duration: 0.2, onComplete: () => {
              if (sceneCurrentRef.value) sceneCurrentRef.value.textContent = String(i + 1).padStart(2, '0')
              gsap.to(sceneCurrentRef.value, { opacity: 1, duration: 0.3 })
            }})
          }

          // Progress bar
          const progress = (i + 1) / totalScenes
          if (progressBarRef.value) {
            gsap.to(progressBarRef.value, { scaleY: progress, duration: 0.6, ease: 'power2.out' })
          }

          // Blink between scenes
          if (i > 0) triggerBlink()
        },
        onLeaveBack: () => {
          gsap.to(left, { opacity: 0, y: 40, duration: 0.5, ease: 'power2.in' })
          gsap.to(right, { opacity: 0, x: 60, rotate: 8, duration: 0.5, ease: 'power2.in' })

          // Scene number counter
          if (sceneCurrentRef.value) {
            gsap.to(sceneCurrentRef.value, { opacity: 0, duration: 0.2, onComplete: () => {
              if (sceneCurrentRef.value) sceneCurrentRef.value.textContent = String(Math.max(i, 1)).padStart(2, '0')
              gsap.to(sceneCurrentRef.value, { opacity: 1, duration: 0.3 })
            }})
          }

          // Rewind progress bar
          if (progressBarRef.value) {
            gsap.to(progressBarRef.value, { scaleY: i / totalScenes, duration: 0.4, ease: 'power2.out' })
          }
        },
      })
      triggers.push(st)
    })
  }, 600)
})

onUnmounted(() => {
  triggers.forEach((t) => t.kill())
})
</script>

<style scoped>
.font-display {
  font-family: var(--font-display, 'Georgia', serif);
}
</style>
