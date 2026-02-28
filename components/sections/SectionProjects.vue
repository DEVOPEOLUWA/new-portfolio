<template>
  <section
    id="projects"
    ref="sectionRef"
    class="relative w-full px-8 md:px-16 lg:px-24 py-24 md:py-32"
    :style="{ background: isDark ? '#0a0a0a' : '#f5f5f0', transition: 'background-color 0.4s ease' }"
    @mousemove="onMouseMove"
    @mouseleave="onSectionLeave"
  >
    <!-- ─── Right-side preview panel ─── -->
    <div
      ref="previewPanelRef"
      class="fixed top-0 right-0 z-[100] pointer-events-none flex items-center justify-center"
      style="
        width: 400px;
        height: 100vh;
        transform: translateX(100%);
        transition: transform 0.5s cubic-bezier(0.23, 1, 0.32, 1);
        padding: 40px 32px;
      "
      :style="{ background: isDark ? '#0a0a0a' : '#f5f5f0' }"
    >
      <img
        ref="previewImgRef"
        src=""
        alt=""
        style="
          width: 100%;
          max-height: 80vh;
          object-fit: cover;
          border-radius: 12px;
          box-shadow: 0 24px 48px rgba(0,0,0,0.2);
          display: block;
        "
      />
    </div>

    <!-- ─── Section header row ─── -->
    <div
      ref="headerRowRef"
      class="flex items-center justify-between"
      style="opacity: 0;"
    >
      <span
        class="font-mono uppercase"
        style="font-size: 11px; letter-spacing: 0.3em; opacity: 0.4;"
        :style="{ color: isDark ? '#f0ede8' : '#1a1918' }"
      >Featured Works</span>
      <span
        class="font-mono"
        style="font-size: 11px; letter-spacing: 0.3em; opacity: 0.4;"
        :style="{ color: isDark ? '#f0ede8' : '#1a1918' }"
      >03</span>
    </div>

    <!-- ─── Top divider ─── -->
    <div
      ref="topDividerRef"
      class="w-full mt-6"
      style="height: 1px; transform: scaleX(0); transform-origin: left;"
      :style="{ background: isDark ? 'rgba(255,255,255,0.12)' : 'rgba(0,0,0,0.12)' }"
    />

    <!-- ─── Project rows ─── -->
    <div>
      <template v-for="(project, i) in projects" :key="i">
        <div
          :ref="(el: any) => { if (el) rowRefs[i] = el as HTMLElement }"
          class="project-row relative flex items-center w-full gap-6"
          style="
            opacity: 0;
            cursor: pointer;
            height: clamp(72px, 10vh, 110px);
            transition: background-color 0.3s ease;
          "
          @mouseenter="onRowEnter(i, project)"
          @mouseleave="onRowLeave(i)"
        >
          <!-- Index number -->
          <span
            class="font-mono flex-shrink-0"
            style="width: 48px; font-size: 12px; opacity: 0.35; font-weight: 300;"
            :style="{ color: isDark ? '#f0ede8' : '#1a1918' }"
          >{{ String(i + 1).padStart(2, '0') }}</span>

          <!-- Project name -->
          <h2
            :ref="(el: any) => { if (el) nameRefs[i] = el as HTMLElement }"
            class="flex-1 font-display"
            style="
              font-size: clamp(28px, 4.5vw, 64px);
              font-weight: 400;
              line-height: 1;
              transform-origin: left center;
              will-change: transform;
            "
            :style="{ color: isDark ? '#f0ede8' : '#1a1918' }"
          >{{ project.name }}</h2>

          <!-- CTA button — only visible on hover -->
          <NuxtLink
            :ref="(el: any) => { if (el) ctaRefs[i] = (el as any).$el || el }"
            :to="`/projects/${project.slug}`"
            class="flex-shrink-0 font-mono hidden md:flex items-center"
            style="
              font-size: 11px;
              letter-spacing: 0.15em;
              text-transform: uppercase;
              text-decoration: none;
              padding: 6px 16px;
              border-radius: 4px;
              opacity: 0;
              border: 1px solid;
              white-space: nowrap;
              transition: opacity 0.3s ease, color 0.3s ease, border-color 0.3s ease;
            "
            :style="{
              color: isDark ? '#f0ede8' : '#1a1918',
              borderColor: isDark ? 'rgba(255,255,255,0.25)' : 'rgba(0,0,0,0.25)',
            }"
            @click.stop
          >View Case Study&nbsp;→</NuxtLink>

          <!-- Role/tech descriptor -->
          <span
            class="font-mono text-right flex-shrink-0 hidden lg:block"
            style="font-size: 12px; letter-spacing: 0.15em; opacity: 0.5; text-transform: uppercase; min-width: 180px;"
            :style="{ color: isDark ? '#f0ede8' : '#1a1918' }"
          >{{ project.descriptor }}</span>
        </div>

        <!-- Divider below this row -->
        <div
          class="w-full"
          style="height: 1px;"
          :style="{ background: isDark ? 'rgba(255,255,255,0.08)' : 'rgba(0,0,0,0.08)' }"
        />
      </template>
    </div>
  </section>
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
const sectionRef = ref<HTMLElement | null>(null)
const headerRowRef = ref<HTMLElement | null>(null)
const topDividerRef = ref<HTMLElement | null>(null)
const rowRefs = ref<HTMLElement[]>([])
const nameRefs = ref<HTMLElement[]>([])
const ctaRefs = ref<HTMLElement[]>([])
const previewPanelRef = ref<HTMLElement | null>(null)
const previewImgRef = ref<HTMLImageElement | null>(null)

const triggers: ScrollTrigger[] = []

// ── Projects ──
const projects = [
  {
    slug: 'ndic',
    name: 'NDIC Bank Liquidation System',
    image: '/images/ndic.png',
    descriptor: 'Angular · Enterprise',
  },
  {
    slug: 'nsia',
    name: 'NSIA Vendor Management',
    image: '/images/nsia.png',
    descriptor: 'Vue.js · Government',
  },
  {
    slug: 'ncc',
    name: 'NCC Licensing Platform',
    image: '/images/licensing.png',
    descriptor: 'Angular · Regulatory',
  },
]

// ── Row hover ──
let activeRow = -1

function onRowEnter(i: number, project: (typeof projects)[0]) {
  if (activeRow === i) return
  activeRow = i

  // Row background
  if (rowRefs.value[i]) {
    rowRefs.value[i].style.backgroundColor = isDark.value
      ? 'rgba(255,255,255,0.03)'
      : 'rgba(0,0,0,0.03)'
  }

  // Name nudge
  if (nameRefs.value[i]) {
    gsap.to(nameRefs.value[i], { x: 16, scale: 1.02, duration: 0.5, ease: 'power3.out' })
  }

  // Show CTA button
  if (ctaRefs.value[i]) {
    gsap.to(ctaRefs.value[i], { opacity: 1, duration: 0.3, ease: 'power2.out' })
  }

  // Update and slide in preview panel
  if (previewImgRef.value && previewPanelRef.value) {
    previewImgRef.value.src = project.image
    previewImgRef.value.alt = project.name
    previewPanelRef.value.style.transform = 'translateX(0)'
  }
}

function onRowLeave(i: number) {
  activeRow = -1

  // Reset row background
  if (rowRefs.value[i]) {
    rowRefs.value[i].style.backgroundColor = 'transparent'
  }

  // Reset name
  if (nameRefs.value[i]) {
    gsap.to(nameRefs.value[i], { x: 0, scale: 1, duration: 0.5, ease: 'power3.out' })
  }

  // Hide CTA
  if (ctaRefs.value[i]) {
    gsap.to(ctaRefs.value[i], { opacity: 0, duration: 0.2 })
  }
}

function onMouseMove() {
  // Nothing needed — panel is fixed, no cursor tracking
}

function onSectionLeave() {
  // Slide panel back out when leaving section
  if (previewPanelRef.value) {
    previewPanelRef.value.style.transform = 'translateX(100%)'
  }
  // Reset any active row
  if (activeRow !== -1) {
    onRowLeave(activeRow)
    activeRow = -1
  }
}

// ── Scroll entry animation ──
onMounted(() => {
  setTimeout(() => {
    ScrollTrigger.refresh()
    if (!sectionRef.value) return

    // Set initial state
    rowRefs.value.forEach((row) => gsap.set(row, { y: 30 }))

    const st = ScrollTrigger.create({
      trigger: sectionRef.value,
      start: 'top 75%',
      once: true,
      onEnter: () => {
        const tl = gsap.timeline()

        tl.to(headerRowRef.value, { opacity: 1, duration: 0.6, ease: 'power2.out' })

        tl.to(topDividerRef.value, { scaleX: 1, duration: 0.7, ease: 'power3.out' }, '-=0.2')

        rowRefs.value.forEach((row, i) => {
          tl.to(row, {
            opacity: 1,
            y: 0,
            duration: 0.6,
            ease: 'power3.out',
          }, i === 0 ? '-=0.3' : '-=0.48')
        })
      },
    })
    triggers.push(st)
  }, 400)
})

onUnmounted(() => {
  triggers.forEach((t) => t.kill())
})
</script>

<style scoped>
.font-display {
  font-family: 'Kalnia', Georgia, serif;
}
.font-mono {
  font-family: 'Space Mono', monospace;
}
</style>
