<template>
  <div style="min-height: 100vh;" :style="{ background: isDark ? '#0a0a0a' : '#f5f5f0' }">

    <!-- ═══ Entry Animation Overlays ═══ -->
    <!-- Top half — slides upward -->
    <div
      ref="overlayTopRef"
      class="fixed left-0 top-0 w-full z-[200] pointer-events-none"
      style="height: 50vh;"
      :style="{ background: project.brandColor }"
    />
    <!-- Bottom half — slides downward -->
    <div
      ref="overlayBotRef"
      class="fixed left-0 bottom-0 w-full z-[200] pointer-events-none"
      style="height: 50vh;"
      :style="{ background: project.brandColor }"
    />

    <!-- ═══ Back navigation ═══ -->
    <div class="fixed top-6 left-8 z-50">
      <button
        class="flex items-center gap-2 group"
        style="background: none; border: none; cursor: pointer; padding: 0; font-family: 'Space Mono', monospace;"
        @click="goBack"
      >
        <span
          class="transition-transform duration-300 group-hover:-translate-x-1"
          style="font-size: 12px;"
          :style="{ color: isDark ? 'rgba(240,237,232,0.5)' : 'rgba(26,25,24,0.5)' }"
        >←</span>
        <span
          style="font-size: 11px; letter-spacing: 0.15em; text-transform: uppercase;"
          :style="{ color: isDark ? 'rgba(240,237,232,0.5)' : 'rgba(26,25,24,0.5)' }"
        >All Work</span>
      </button>
    </div>

    <!-- ═══ ZONE 1 — Hero (vertical stack: title → tags → image) ═══ -->
    <section
      class="w-full px-12 md:px-20 pt-28 pb-0"
      :style="{ background: project.brandColor }"
    >
      <!-- Project label + name -->
      <div ref="heroTextRef" style="opacity: 0; transform: translateY(100%); overflow: hidden;">
        <p
          style="font-family: 'Space Mono', monospace; font-size: 11px; letter-spacing: 0.25em; text-transform: uppercase; color: rgba(255,255,255,0.45); margin-bottom: 24px;"
        >{{ project.category }}</p>
        <h1
          style="
            font-family: 'Kalnia', Georgia, serif;
            font-size: clamp(40px, 6vw, 88px);
            font-weight: 700;
            color: #fff;
            line-height: 0.95;
            letter-spacing: -0.02em;
          "
        >{{ project.name }}</h1>
      </div>

      <!-- Tags (right-aligned, below title) -->
      <div ref="heroTagsRef" class="flex flex-wrap gap-2 mt-8 pb-12" style="opacity: 0;">
        <span
          v-for="tag in project.tags"
          :key="tag"
          style="
            font-family: 'Space Mono', monospace;
            font-size: 11px;
            letter-spacing: 0.15em;
            text-transform: uppercase;
            color: rgba(255,255,255,0.55);
            border: 1px solid rgba(255,255,255,0.2);
            border-radius: 4px;
            padding: 4px 12px;
          "
        >{{ tag }}</span>
      </div>

      <!-- Mockup image — in-flow, full width, sits at bottom of hero zone -->
      <div
        ref="heroImgRef"
        class="flex justify-center"
        style="opacity: 0; transform: translateY(-40px);"
      >
        <img
          :src="project.image"
          :alt="project.name"
          style="
            width: 80%;
            max-width: 900px;
            height: auto;
            object-fit: cover;
            object-position: top;
            border-radius: 16px 16px 0 0;
            box-shadow: 0 -20px 80px rgba(0,0,0,0.35);
            display: block;
          "
        />
      </div>
    </section>

    <!-- ═══ ZONE 2 — Stats bar ═══ -->
    <section style="background: #141414; width: 100%;">
      <div class="grid grid-cols-2 md:grid-cols-4">
        <div
          v-for="(stat, i) in project.stats"
          :key="i"
          :ref="(el: any) => { if (el) statRefs[i] = el as HTMLElement }"
          class="flex flex-col justify-center px-10 py-14 border-r last:border-r-0"
          style="border-color: rgba(255,255,255,0.05); opacity: 0; transform: translateY(20px);"
        >
          <span
            style="
              font-family: 'Kalnia', Georgia, serif;
              font-size: clamp(36px, 5vw, 64px);
              font-weight: 600;
              color: #f0ede8;
              line-height: 1;
              display: block;
            "
          >{{ stat.animValue }}</span>
          <span
            style="
              font-family: 'Space Mono', monospace;
              font-size: 10px;
              letter-spacing: 0.2em;
              text-transform: uppercase;
              color: rgba(255,255,255,0.3);
              margin-top: 8px;
              display: block;
            "
          >{{ stat.label }}</span>
        </div>
      </div>
    </section>

    <!-- ═══ ZONE 3 — Challenge & Role ═══ -->
    <section
      ref="zone3Ref"
      class="w-full grid grid-cols-1 md:grid-cols-2"
      :style="{ background: isDark ? '#111111' : '#ffffff', transition: 'background-color 0.4s ease' }"
      style="opacity: 0;"
    >
      <div
        class="px-12 md:px-20 py-20 md:py-28 border-r"
        :style="{ borderColor: isDark ? 'rgba(255,255,255,0.06)' : 'rgba(0,0,0,0.06)' }"
      >
        <p
          style="font-family: 'Space Mono', monospace; font-size: 10px; letter-spacing: 0.25em; text-transform: uppercase; margin-bottom: 32px;"
          :style="{ color: isDark ? 'rgba(240,237,232,0.35)' : 'rgba(26,25,24,0.35)' }"
        >The Challenge</p>
        <p
          style="font-family: 'Instrument Serif', Georgia, serif; font-size: clamp(18px, 1.8vw, 24px); line-height: 1.6;"
          :style="{ color: isDark ? '#f0ede8' : '#1a1918' }"
        >{{ project.challenge }}</p>
      </div>
      <div class="px-12 md:px-20 py-20 md:py-28">
        <p
          style="font-family: 'Space Mono', monospace; font-size: 10px; letter-spacing: 0.25em; text-transform: uppercase; margin-bottom: 32px;"
          :style="{ color: isDark ? 'rgba(240,237,232,0.35)' : 'rgba(26,25,24,0.35)' }"
        >My Role</p>
        <p
          style="font-family: 'Manrope', sans-serif; font-size: clamp(15px, 1.4vw, 18px); font-weight: 300; line-height: 1.7;"
          :style="{ color: isDark ? 'rgba(240,237,232,0.75)' : 'rgba(26,25,24,0.7)' }"
        >{{ project.role }}</p>
      </div>
    </section>

    <!-- ═══ ZONE 4 — Full mockup showcase ═══ -->
    <section class="w-full px-8 md:px-20 py-24 md:py-32 flex flex-col items-center" style="background: #141414;">
      <div class="w-full max-w-5xl">
        <img
          :src="project.image"
          :alt="project.name"
          class="w-full rounded-xl"
          style="box-shadow: 0 40px 100px rgba(0,0,0,0.5); display: block;"
        />
        <p
          class="mt-6 text-center"
          style="font-family: 'Space Mono', monospace; font-size: 10px; letter-spacing: 0.2em; text-transform: uppercase; color: rgba(255,255,255,0.25);"
        >{{ project.name }} — Application Interface</p>
      </div>
    </section>

    <!-- ═══ ZONE 5 — Project navigation footer ═══ -->
    <footer
      class="w-full grid grid-cols-3 items-center"
      :style="{
        background: isDark ? '#0a0a0a' : '#f5f5f0',
        borderTop: isDark ? '1px solid rgba(255,255,255,0.06)' : '1px solid rgba(0,0,0,0.06)',
      }"
    >
      <NuxtLink
        :to="`/projects/${prevProject.slug}`"
        class="flex items-center gap-3 px-10 py-10 group"
        style="text-decoration: none;"
      >
        <span
          class="font-mono text-sm group-hover:-translate-x-1 transition-transform duration-300"
          :style="{ color: isDark ? '#f0ede8' : '#1a1918' }"
        >←</span>
        <div class="flex flex-col">
          <span
            style="font-family: 'Space Mono', monospace; font-size: 10px; letter-spacing: 0.2em; text-transform: uppercase;"
            :style="{ color: isDark ? 'rgba(240,237,232,0.35)' : 'rgba(26,25,24,0.35)' }"
          >Previous</span>
          <span
            style="font-family: 'Kalnia', Georgia, serif; font-size: 14px; margin-top: 4px;"
            :style="{ color: isDark ? '#f0ede8' : '#1a1918' }"
          >{{ prevProject.name }}</span>
        </div>
      </NuxtLink>

      <NuxtLink
        to="/"
        class="flex justify-center items-center py-10"
        style="text-decoration: none;"
      >
        <span
          style="font-family: 'Space Mono', monospace; font-size: 10px; letter-spacing: 0.25em; text-transform: uppercase;"
          :style="{ color: isDark ? 'rgba(240,237,232,0.4)' : 'rgba(26,25,24,0.4)' }"
        >All Work</span>
      </NuxtLink>

      <NuxtLink
        :to="`/projects/${nextProject.slug}`"
        class="flex items-center justify-end gap-3 px-10 py-10 group"
        style="text-decoration: none;"
      >
        <div class="flex flex-col items-end">
          <span
            style="font-family: 'Space Mono', monospace; font-size: 10px; letter-spacing: 0.2em; text-transform: uppercase;"
            :style="{ color: isDark ? 'rgba(240,237,232,0.35)' : 'rgba(26,25,24,0.35)' }"
          >Next</span>
          <span
            style="font-family: 'Kalnia', Georgia, serif; font-size: 14px; margin-top: 4px;"
            :style="{ color: isDark ? '#f0ede8' : '#1a1918' }"
          >{{ nextProject.name }}</span>
        </div>
        <span
          class="font-mono text-sm group-hover:translate-x-1 transition-transform duration-300"
          :style="{ color: isDark ? '#f0ede8' : '#1a1918' }"
        >→</span>
      </NuxtLink>
    </footer>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { useTheme } from '~/composables/useTheme'

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger)
}

const { isDark } = useTheme()
const route = useRoute()
const router = useRouter()

// Refs
const overlayTopRef = ref<HTMLElement | null>(null)
const overlayBotRef = ref<HTMLElement | null>(null)
const heroTextRef = ref<HTMLElement | null>(null)
const heroTagsRef = ref<HTMLElement | null>(null)
const heroImgRef = ref<HTMLElement | null>(null)
const zone3Ref = ref<HTMLElement | null>(null)
const statRefs = ref<HTMLElement[]>([])

// ── All project data ──
const allProjects = [
  {
    slug: 'ndic',
    name: 'NDIC Bank Liquidation System',
    category: 'Enterprise · Fintech',
    image: '/images/ndic.png',
    tags: ['Angular 18', 'Enterprise', 'WebSockets'],
    brandColor: '#1a1f6e',
    stats: [
      { value: '20M+', label: 'Depositor Records', animValue: ref('20M+') },
      { value: '6', label: 'Core Modules Built', animValue: ref('6') },
      { value: '60%', label: 'Coordination Time Reduced', animValue: ref('60%') },
      { value: '99.9%', label: 'Upload Success Rate', animValue: ref('99.9%') },
    ],
    challenge: 'NDIC needed to replace entirely paper-based bank liquidation workflows with a digital system capable of managing depositor records at scale across multiple closed banks and branches simultaneously.',
    role: 'I led frontend delivery across 6 major modules in Angular 18, built the real-time WebSockets collaboration layer, implemented resumable 2GB+ multipart uploads to AWS S3, and conducted the frontend security audit.',
  },
  {
    slug: 'nsia',
    name: 'NSIA Vendor Management',
    category: 'Government · Procurement',
    image: '/images/nsia.png',
    tags: ['Vue.js', 'Government', 'Frontend Lead'],
    brandColor: '#1a4a2e',
    stats: [
      { value: '100+', label: 'Staff Users', animValue: ref('100+') },
      { value: 'Full', label: 'Procurement Lifecycle', animValue: ref('Full') },
      { value: '2', label: 'User Role Types', animValue: ref('2') },
      { value: '7+', label: 'Regulatory Systems', animValue: ref('7+') },
    ],
    challenge: 'NSIA required a vendor management platform to handle the full government procurement lifecycle — from planning through bid evaluation, contract award, and performance tracking — across multiple departments.',
    role: 'I delivered the frontend procurement and vendor-facing interfaces, implemented server-side pagination that improved data processing speed by 40%, and set up CI/CD pipelines that cut deployment time by 70%.',
  },
  {
    slug: 'ncc',
    name: 'NCC Licensing Platform',
    category: 'Regulatory · Government',
    image: '/images/licensing.png',
    tags: ['Angular', 'Regulatory', 'UX Engineering'],
    brandColor: '#2d2d8f',
    stats: [
      { value: '6', label: 'Step Licensing Flow', animValue: ref('6') },
      { value: '3+', label: 'Licence Categories', animValue: ref('3+') },
      { value: '1000', label: 'Active Users', animValue: ref('1000') },
      { value: '40%', label: 'Data Processing Improvement', animValue: ref('40%') },
    ],
    challenge: 'NCC needed a digital licensing platform to replace manual processes for telecom operators applying for, renewing, and surrendering licences — with complex multi-step form flows and document verification.',
    role: 'I built the multi-step licensing application flows, implemented the document upload and verification interfaces, and delivered the contractor-facing dashboard used by licensed operators across Nigeria.',
  },
]

const slug = computed(() => route.params.slug as string)
const project = computed(() => allProjects.find((p) => p.slug === slug.value) ?? allProjects[0])
const currentIndex = computed(() => allProjects.findIndex((p) => p.slug === slug.value))
const prevProject = computed(() => allProjects[(currentIndex.value - 1 + allProjects.length) % allProjects.length])
const nextProject = computed(() => allProjects[(currentIndex.value + 1) % allProjects.length])

function goBack() {
  router.push('/')
}

// SEO
useHead(() => ({
  title: `${project.value.name} — Opeoluwa Ayodeji`,
  meta: [{ name: 'description', content: project.value.challenge }],
}))

// Page transition: no Nuxt page transition — we handle it manually
definePageMeta({ pageTransition: false })

onMounted(() => {
  const tl = gsap.timeline()

  // — Split overlay opens —
  tl.to([overlayTopRef.value, overlayBotRef.value], {
    yPercent: (i) => (i === 0 ? -100 : 100),
    duration: 0.8,
    ease: 'power3.inOut',
    stagger: 0,
  })

  // — Hero text clips in —
  tl.to(heroTextRef.value, {
    opacity: 1,
    y: 0,
    duration: 0.7,
    ease: 'power3.out',
  }, '-=0.3')

  // — Tags fade in —
  tl.to(heroTagsRef.value, {
    opacity: 1,
    duration: 0.5,
    ease: 'power2.out',
  }, '-=0.4')

  // — Mockup image drops in —
  tl.to(heroImgRef.value, {
    opacity: 1,
    y: 0,
    duration: 0.6,
    ease: 'power3.out',
  }, '-=0.3')

  // — Stats animate in on scroll, with count-up for numeric values —
  setTimeout(() => {
    ScrollTrigger.refresh()
    statRefs.value.forEach((stat, i) => {
      if (!stat) return
      gsap.to(stat, {
        opacity: 1,
        y: 0,
        duration: 0.7,
        ease: 'power3.out',
        delay: i * 0.1,
        scrollTrigger: {
          trigger: stat,
          start: 'top 85%',
          once: true,
        },
      })
    })

    // Zone 3 fades in on scroll
    if (zone3Ref.value) {
      gsap.to(zone3Ref.value, {
        opacity: 1,
        duration: 0.8,
        ease: 'power2.out',
        delay: 0.2,
        scrollTrigger: {
          trigger: zone3Ref.value,
          start: 'top 80%',
          once: true,
        },
      })
    }
  }, 400)
})
</script>
