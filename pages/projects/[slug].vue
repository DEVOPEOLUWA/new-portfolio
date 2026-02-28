<template>
  <div>
    <!-- Page transition overlay -->
    <div
      ref="transitionOverlayRef"
      class="fixed inset-0 z-[200] pointer-events-none"
      :style="{ background: project.brandColor, opacity: 0 }"
    />

    <div
      ref="pageRef"
      :style="{ background: isDark ? '#0a0a0a' : '#f5f5f0', transition: 'background-color 0.4s ease', minHeight: '100vh' }"
    >
      <!-- Back navigation -->
      <div class="fixed top-6 left-8 z-50">
        <button
          class="flex items-center gap-2 group"
          style="background: none; border: none; cursor: pointer; padding: 0;"
          @click="goBack"
        >
          <span
            class="inline-block transition-transform duration-300 group-hover:-translate-x-1 font-mono text-xs"
            :style="{ color: isDark ? 'rgba(255,255,255,0.5)' : 'rgba(0,0,0,0.5)' }"
          >←</span>
          <span
            class="font-mono text-xs tracking-widest uppercase"
            :style="{ color: isDark ? 'rgba(255,255,255,0.5)' : 'rgba(0,0,0,0.5)' }"
          >All Work</span>
        </button>
      </div>

      <!-- ═══════════════════════════════════════════════
           ZONE 1 — Full viewport hero
      ════════════════════════════════════════════════ -->
      <section
        class="relative w-full flex flex-col justify-between overflow-hidden"
        style="height: 100vh; min-height: 600px;"
        :style="{ background: project.brandColor }"
      >
        <!-- Top left — name + tags -->
        <div class="flex-1 grid grid-cols-2 gap-8 px-12 md:px-20 pt-24 md:pt-32">
          <!-- Left: project name -->
          <div class="flex flex-col justify-end pb-8">
            <p class="font-mono text-xs tracking-widest uppercase mb-6" style="color: rgba(255,255,255,0.45);">
              {{ project.category }}
            </p>
            <h1
              class="font-display leading-[0.9] tracking-tight"
              style="font-size: clamp(40px, 6vw, 88px); font-weight: 700; color: #fff;"
            >
              {{ project.name }}
            </h1>
          </div>

          <!-- Right: tech & role tags aligned to bottom -->
          <div class="flex flex-col justify-end items-end pb-8">
            <div class="flex flex-col items-end gap-2">
              <span
                v-for="tag in project.tags"
                :key="tag"
                style="
                  font-family: monospace;
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
          </div>
        </div>

        <!-- Mockup image — bottom overlapping into zone 2 -->
        <div class="relative flex justify-center" style="margin-top: -40px; padding: 0 10%;">
          <img
            :src="project.image"
            :alt="project.name"
            class="w-full object-cover rounded-t-xl"
            style="
              max-height: 55vh;
              object-position: top;
              box-shadow: 0 -20px 80px rgba(0,0,0,0.4);
              position: relative;
              z-index: 2;
            "
          />
          <!-- Overlap gradient -->
          <div
            class="absolute bottom-0 left-0 right-0"
            style="height: 120px; background: linear-gradient(to bottom, transparent, #141414); z-index: 3;"
          />
        </div>
      </section>

      <!-- ═══════════════════════════════════════════════
           ZONE 2 — Stats bar
      ════════════════════════════════════════════════ -->
      <section
        class="w-full grid grid-cols-2 md:grid-cols-4"
        style="background: #141414;"
      >
        <div
          v-for="(stat, i) in project.stats"
          :key="i"
          ref="statRefs"
          class="stat-item flex flex-col justify-center px-10 py-12 border-r border-white/5 last:border-r-0"
          style="opacity: 0; transform: translateY(20px);"
        >
          <span
            class="font-display block leading-none"
            style="font-size: clamp(36px, 5vw, 64px); font-weight: 600; color: #f0ede8;"
          >{{ stat.value }}</span>
          <span
            class="font-mono block mt-2"
            style="font-size: 10px; letter-spacing: 0.2em; text-transform: uppercase; color: rgba(255,255,255,0.3);"
          >{{ stat.label }}</span>
        </div>
      </section>

      <!-- ═══════════════════════════════════════════════
           ZONE 3 — Challenge & Role
      ════════════════════════════════════════════════ -->
      <section
        class="w-full grid grid-cols-1 md:grid-cols-2 gap-0"
        :style="{ background: isDark ? '#111111' : '#ffffff', transition: 'background-color 0.4s ease' }"
      >
        <div
          class="px-12 md:px-20 py-20 md:py-28 border-r"
          :style="{ borderColor: isDark ? 'rgba(255,255,255,0.06)' : 'rgba(0,0,0,0.06)' }"
        >
          <p
            class="font-mono text-xs tracking-widest uppercase mb-8"
            :style="{ color: isDark ? 'rgba(255,255,255,0.35)' : 'rgba(0,0,0,0.35)' }"
          >The Challenge</p>
          <p
            class="font-display leading-relaxed"
            style="font-size: clamp(18px, 1.8vw, 24px);"
            :style="{ color: isDark ? '#f0ede8' : '#1a1918' }"
          >{{ project.challenge }}</p>
        </div>
        <div class="px-12 md:px-20 py-20 md:py-28">
          <p
            class="font-mono text-xs tracking-widest uppercase mb-8"
            :style="{ color: isDark ? 'rgba(255,255,255,0.35)' : 'rgba(0,0,0,0.35)' }"
          >My Role</p>
          <p
            class="leading-relaxed"
            style="font-size: clamp(15px, 1.4vw, 18px); font-weight: 300;"
            :style="{ color: isDark ? 'rgba(240,237,232,0.75)' : 'rgba(26,25,24,0.7)' }"
          >{{ project.role }}</p>
        </div>
      </section>

      <!-- ═══════════════════════════════════════════════
           ZONE 4 — Large mockup showcase
      ════════════════════════════════════════════════ -->
      <section
        class="w-full px-8 md:px-20 py-24 md:py-32 flex flex-col items-center"
        style="background: #141414;"
      >
        <div class="w-full max-w-5xl">
          <img
            :src="project.image"
            :alt="project.name"
            class="w-full rounded-xl"
            style="box-shadow: 0 40px 100px rgba(0,0,0,0.5); display: block;"
          />
          <p
            class="mt-6 text-center font-mono text-xs tracking-widest"
            style="color: rgba(255,255,255,0.25); text-transform: uppercase; letter-spacing: 0.2em;"
          >{{ project.name }} — Application Interface</p>
        </div>
      </section>

      <!-- ═══════════════════════════════════════════════
           ZONE 5 — Project navigation footer
      ════════════════════════════════════════════════ -->
      <footer
        class="w-full grid grid-cols-3 items-center"
        :style="{
          background: isDark ? '#0a0a0a' : '#f5f5f0',
          borderTop: isDark ? '1px solid rgba(255,255,255,0.06)' : '1px solid rgba(0,0,0,0.06)',
          transition: 'background-color 0.4s ease',
        }"
      >
        <!-- Previous -->
        <NuxtLink
          :to="prevProject ? `/projects/${prevProject.slug}` : '/'"
          class="flex items-center gap-3 px-10 py-10 group transition-opacity duration-300"
          :class="{ 'opacity-30 pointer-events-none': !prevProject }"
          style="text-decoration: none;"
        >
          <span
            class="font-mono text-sm group-hover:-translate-x-1 transition-transform duration-300"
            :style="{ color: isDark ? '#f0ede8' : '#1a1918' }"
          >←</span>
          <div class="flex flex-col">
            <span class="font-mono text-xs tracking-widest uppercase" :style="{ color: isDark ? 'rgba(255,255,255,0.35)' : 'rgba(0,0,0,0.35)' }">Previous</span>
            <span class="font-display text-sm mt-1" :style="{ color: isDark ? '#f0ede8' : '#1a1918' }">{{ prevProject?.name }}</span>
          </div>
        </NuxtLink>

        <!-- All Work -->
        <NuxtLink
          to="/#projects"
          class="flex justify-center items-center py-10 group"
          style="text-decoration: none;"
        >
          <span
            class="font-mono text-xs tracking-widest uppercase"
            :style="{ color: isDark ? 'rgba(255,255,255,0.4)' : 'rgba(0,0,0,0.4)', transition: 'color 0.3s ease' }"
          >All Work</span>
        </NuxtLink>

        <!-- Next -->
        <NuxtLink
          :to="nextProject ? `/projects/${nextProject.slug}` : '/'"
          class="flex items-center justify-end gap-3 px-10 py-10 group transition-opacity duration-300"
          :class="{ 'opacity-30 pointer-events-none': !nextProject }"
          style="text-decoration: none;"
        >
          <div class="flex flex-col items-end">
            <span class="font-mono text-xs tracking-widest uppercase" :style="{ color: isDark ? 'rgba(255,255,255,0.35)' : 'rgba(0,0,0,0.35)' }">Next</span>
            <span class="font-display text-sm mt-1" :style="{ color: isDark ? '#f0ede8' : '#1a1918' }">{{ nextProject?.name }}</span>
          </div>
          <span
            class="font-mono text-sm group-hover:translate-x-1 transition-transform duration-300"
            :style="{ color: isDark ? '#f0ede8' : '#1a1918' }"
          >→</span>
        </NuxtLink>
      </footer>
    </div>
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

const transitionOverlayRef = ref<HTMLElement | null>(null)
const pageRef = ref<HTMLElement | null>(null)
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
    descriptor: 'Enterprise liquidation platform managing 20M+ depositor records across Nigeria.',
    stats: [
      { value: '20M+', label: 'Depositor Records' },
      { value: '6', label: 'Core Modules Built' },
      { value: '60%', label: 'Coordination Time Reduced' },
      { value: '99.9%', label: 'Upload Success Rate' },
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
    descriptor: 'Government procurement system handling the full vendor lifecycle for Nigeria\'s sovereign wealth authority.',
    stats: [
      { value: '100+', label: 'Staff Users' },
      { value: 'Full', label: 'Procurement Lifecycle' },
      { value: '2', label: 'User Role Types' },
      { value: '7+', label: 'Regulatory Systems' },
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
    descriptor: 'Digital licensing platform for Nigeria\'s national telecommunications regulator.',
    stats: [
      { value: '6', label: 'Step Licensing Flow' },
      { value: '3+', label: 'Licence Categories' },
      { value: '100–1000', label: 'Active Users' },
      { value: '40%', label: 'Data Processing Improvement' },
    ],
    challenge: 'NCC needed a digital licensing platform to replace manual processes for telecom operators applying for, renewing, and surrendering licences — with complex multi-step form flows and document verification.',
    role: 'I built the multi-step licensing application flows, implemented the document upload and verification interfaces, and delivered the contractor-facing dashboard used by licensed operators across Nigeria.',
  },
]

const slug = computed(() => route.params.slug as string)
const project = computed(() => allProjects.find((p) => p.slug === slug.value) ?? allProjects[0])

const currentIndex = computed(() => allProjects.findIndex((p) => p.slug === slug.value))
const prevProject = computed(() => currentIndex.value > 0 ? allProjects[currentIndex.value - 1] : allProjects[allProjects.length - 1])
const nextProject = computed(() => currentIndex.value < allProjects.length - 1 ? allProjects[currentIndex.value + 1] : allProjects[0])

function goBack() {
  router.push('/')
}

// Page entry — slide in
definePageMeta({
  pageTransition: {
    name: 'project-page',
    mode: 'out-in',
    onEnter(el, done) {
      gsap.fromTo(el, { opacity: 0, y: 30 }, { opacity: 1, y: 0, duration: 0.7, ease: 'power3.out', onComplete: done })
    },
    onLeave(el, done) {
      gsap.to(el, { opacity: 0, y: -20, duration: 0.4, ease: 'power2.in', onComplete: done })
    },
  },
})

// SEO
useHead(() => ({
  title: `${project.value.name} — Opeoluwa Ayodeji`,
  meta: [
    { name: 'description', content: project.value.descriptor },
  ],
}))

onMounted(() => {
  // Animate stats bar items in on scroll
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
          toggleActions: 'play none none none',
        },
      })
    })
  }, 300)
})
</script>

<style scoped>
.font-display {
  font-family: var(--font-display, 'Kalnia', Georgia, serif);
}
.font-mono {
  font-family: 'Space Mono', monospace;
}
</style>
