<template>
  <div id="featured-works">

    <!-- Left-edge indicator (desktop only) -->
    <div
      ref="sectionIndicatorRef"
      class="fixed z-30 pointer-events-none hidden md:block"
      style="left:24px;top:50%;transform:translateY(-50%) rotate(-90deg);transform-origin:center;opacity:0;transition:opacity 0.6s ease;"
    >
      <span style="font-family:'Space Mono',monospace;font-size:10px;letter-spacing:0.3em;text-transform:uppercase;white-space:nowrap;"
        :style="{ color: isDark ? 'rgba(255,255,255,0.4)' : 'rgba(0,0,0,0.4)' }"
      >Featured Works</span>
    </div>

    <!-- Vertical progress bar (desktop) -->
    <div class="fixed right-0 top-0 z-30 pointer-events-none hidden md:block progress-track" style="width:2px;height:100vh;">
      <div ref="progressBarRef" class="progress-fill" style="width:100%;transform:scaleY(0);transform-origin:top;will-change:transform;" />
    </div>

    <!-- Blink overlay (desktop) -->
    <div ref="blinkRef" class="fixed inset-0 z-[55] pointer-events-none blink-overlay hidden md:block" style="opacity:0;" />

    <!-- ══ MOBILE LAYOUT (≤768px) ══ -->
    <div class="block md:hidden" style="background:var(--bg-base);">

      <!-- Section header -->
      <div
        ref="mobileHeaderRef"
        class="mc-header"
      >
        <span class="mc-header-label">Featured Works</span>
        <span class="mc-header-label">03</span>
      </div>

      <!-- Cards -->
      <div
        v-for="(project, i) in projects"
        :key="`m-${i}`"
        :ref="(el: any) => { if (el) mobileCardRefs[i] = el as HTMLElement }"
        class="mobile-card"
      >
        <!-- Number watermark -->
        <div class="mc-num">{{ String(i+1).padStart(2,'0') }}</div>
        <!-- Name -->
        <h2 class="mc-name">{{ project.name }}</h2>
        <!-- Rule -->
        <div class="mc-rule" />
        <!-- Descriptor -->
        <p class="mc-desc">{{ project.descriptor }}</p>
        <!-- CTA -->
        <NuxtLink :to="`/projects/${project.slug}`" class="mc-cta">View Case Study ↗</NuxtLink>
        <!-- Image -->
        <img :src="project.image" :alt="project.name" class="mc-img" />
      </div>

      <!-- Dividers between mobile cards -->
      <template v-for="(_, i) in projects" :key="`mdiv-${i}`">
        <div v-if="i < projects.length-1" style="height:1px;background:var(--line);margin:0 24px;" />
      </template>

    </div>

    <!-- ══ DESKTOP LAYOUT (>768px) ══ -->
    <div ref="sectionFadeRef" class="hidden md:block section-bg" style="opacity:0;">
      <div
        v-for="(project, i) in projects"
        :key="i"
        :ref="(el: any) => { if (el) sceneRefs[i] = el as HTMLElement }"
        class="scene-bg relative w-full flex overflow-hidden"
        style="height:100vh;"
      >
        <!-- LEFT -->
        <div class="flex flex-col justify-center px-16 md:px-24 lg:px-32" style="width:50%;height:100%;flex-shrink:0;">
          <div :ref="(el: any) => { if (el) leftColRefs[i] = el as HTMLElement }" style="opacity:0;transform:translateY(40px);">
            <span class="number-watermark block" style="font-family:'Kalnia',serif;font-size:clamp(100px,12vw,160px);font-weight:200;line-height:1;">{{ String(i+1).padStart(2,'0') }}</span>
            <div class="rule my-6" style="width:40%;height:1px;" />
            <h2 class="project-name" style="font-family:'Kalnia',serif;font-size:clamp(28px,3.5vw,48px);font-weight:500;line-height:1.1;letter-spacing:-0.02em;">{{ project.name }}</h2>
            <p class="descriptor mt-8" style="font-family:'Manrope',sans-serif;font-size:clamp(14px,1.3vw,17px);font-weight:300;opacity:0.65;line-height:1.6;max-width:400px;color:var(--txt-secondary);">{{ project.descriptor }}</p>
            <NuxtLink
              :to="`/projects/${project.slug}`"
              style="display:inline-block;margin-top:32px;font-family:'Manrope',sans-serif;font-size:13px;font-weight:500;letter-spacing:0.08em;color:var(--txt-primary);text-decoration:none;opacity:1;transition:opacity 0.2s ease;"
              @mouseenter="(e: MouseEvent) => (e.currentTarget as HTMLElement).style.opacity='0.6'"
              @mouseleave="(e: MouseEvent) => (e.currentTarget as HTMLElement).style.opacity='1'"
            >View Case Study ↗</NuxtLink>
          </div>
        </div>
        <!-- RIGHT -->
        <div class="panel-bg relative flex items-center justify-center flex-shrink-0" style="width:50%;height:100%;">
          <img
            :ref="(el: any) => { if (el) rightImgRefs[i] = el as HTMLElement }"
            :src="project.image" :alt="project.name"
            style="width:80%;max-height:75%;object-fit:cover;object-position:top;border-radius:12px;box-shadow:0 32px 72px rgba(0,0,0,0.3);display:block;transform:translateX(80px) rotate(3deg);opacity:0;transition:transform 0.6s cubic-bezier(0.23,1,0.32,1);"
            @mouseenter="(e: MouseEvent) => (e.currentTarget as HTMLElement).style.transform='rotate(0deg) scale(1.03)'"
            @mouseleave="(e: MouseEvent) => (e.currentTarget as HTMLElement).style.transform='rotate(3deg) scale(1)'"
          />
        </div>
      </div>
    </div>

  </div>
</template>

<script setup lang="ts">
import { ref, watch, onMounted, onUnmounted } from 'vue'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { useTheme } from '~/composables/useTheme'

if (typeof window !== 'undefined') gsap.registerPlugin(ScrollTrigger)

const { isDark } = useTheme()
const sectionFadeRef    = ref<HTMLElement | null>(null)
const sectionIndicatorRef = ref<HTMLElement | null>(null)
const progressBarRef    = ref<HTMLElement | null>(null)
const blinkRef          = ref<HTMLElement | null>(null)
const sceneRefs         = ref<HTMLElement[]>([])
const leftColRefs       = ref<HTMLElement[]>([])
const rightImgRefs      = ref<HTMLElement[]>([])
const mobileCardRefs    = ref<HTMLElement[]>([])
const mobileHeaderRef   = ref<HTMLElement | null>(null)
const triggers: ScrollTrigger[] = []
const mobileObservers: IntersectionObserver[] = []

const projects = [
  { slug:'ndic',      name:'NDIC Bank Liquidation System',   image:'/images/ndic.png',      descriptor:"Transitioning NDIC's claims resolution from Excel-based workflows to a fully electronic data capture and verification system." },
  { slug:'nsia',      name:'NSIA Vendor Management',          image:'/images/nsia.png',      descriptor:"Streamlining vendor onboarding, procurement planning, and contract lifecycle management for Nigeria's sovereign wealth authority." },
  { slug:'ncc',       name:'NCC Licensing Platform',          image:'/images/licensing.png', descriptor:"Automating licence application, evaluation, payment, and issuance for Nigeria's national telecommunications regulator across two separate user portals." },
]

function triggerBlink() {
  if (!blinkRef.value) return
  gsap.timeline()
    .to(blinkRef.value, { opacity:0.3, duration:0.15, ease:'power2.out' })
    .to(blinkRef.value, { opacity:0,   duration:0.25, ease:'power2.in'  })
}

watch(isDark, () => {
  requestAnimationFrame(() => {
    const y = window.scrollY
    ScrollTrigger.refresh()
    requestAnimationFrame(() => window.scrollTo({ top:y, behavior:'instant' }))
  })
})

function buildScrollTriggers() {
  triggers.forEach((t) => t.kill()); triggers.length = 0
  if (typeof window === 'undefined' || window.innerWidth <= 768) return

  if (sectionFadeRef.value) {
    triggers.push(ScrollTrigger.create({
      trigger: sectionFadeRef.value, start:'top 85%', once:true,
      onEnter: () => gsap.to(sectionFadeRef.value, { opacity:1, duration:0.8, ease:'power2.out' }),
    }))
  }

  sceneRefs.value.forEach((scene, i) => {
    const left  = leftColRefs.value[i]
    const right = rightImgRefs.value[i]
    if (!scene || !left || !right) return
    gsap.set(right, { x:80, opacity:0, willChange:'transform' })
    gsap.set(left,  { y:40, opacity:0 })
    triggers.push(ScrollTrigger.create({
      trigger:scene, start:'top top', end:'+=100%', pin:true, pinSpacing:true, anticipatePin:1,
      onEnter: () => {
        gsap.to(right, { x:0, opacity:1, duration:1.1, ease:'power4.out', onComplete: () => { (right as HTMLElement).style.willChange='auto' } })
        gsap.to(left,  { opacity:1, y:0, duration:0.9, ease:'power3.out', delay:0.2 })
        if (progressBarRef.value) gsap.to(progressBarRef.value, { scaleY:(i+1)/projects.length, duration:0.6, ease:'power2.out' })
        if (i > 0) triggerBlink()
      },
      onLeaveBack: () => {
        gsap.to(left,  { opacity:0, y:40, duration:0.5, ease:'power2.in' })
        gsap.to(right, { opacity:0, x:80, duration:0.5, ease:'power2.in' })
        if (progressBarRef.value) gsap.to(progressBarRef.value, { scaleY:i/projects.length, duration:0.4 })
      },
    }))
  })
}

function initMobileAnimations() {
  if (typeof window === 'undefined' || window.innerWidth > 768) return

  // ── Section header fade ──
  const header = mobileHeaderRef.value
  if (header) {
    const hObs = new IntersectionObserver((entries) => {
      if (entries[0].isIntersecting) {
        header.classList.add('mc-header-visible')
        hObs.disconnect()
      }
    }, { threshold: 0.1 })
    hObs.observe(header)
    mobileObservers.push(hObs)
  }

  // ── Card entry animations (one-shot at threshold 0.15) ──
  mobileCardRefs.value.forEach((card) => {
    if (!card) return
    // Set will-change before animation
    card.style.willChange = 'transform, opacity'

    const entryObs = new IntersectionObserver((entries) => {
      entries.forEach((e) => {
        if (e.isIntersecting) {
          card.classList.add('mc-visible')
          // Remove will-change after transition completes
          setTimeout(() => { card.style.willChange = 'auto' }, 800)
          entryObs.unobserve(card)
        }
      })
    }, { threshold: 0.15 })
    entryObs.observe(card)
    mobileObservers.push(entryObs)
  })

  // ── Active-block dimming (multi-threshold to track visibility) ──
  mobileCardRefs.value.forEach((card) => {
    if (!card) return
    const dimObs = new IntersectionObserver((entries) => {
      entries.forEach((e) => {
        // Only dim after the card has already animated in
        if (!card.classList.contains('mc-visible')) return
        if (e.intersectionRatio >= 0.5) {
          card.style.opacity = '1'
        } else if (e.intersectionRatio > 0 && e.intersectionRatio < 0.5) {
          card.style.opacity = '0.4'
        }
      })
    }, { threshold: [0, 0.5, 1] })
    dimObs.observe(card)
    mobileObservers.push(dimObs)
  })
}

onMounted(() => {
  setTimeout(() => {
    ScrollTrigger.refresh()
    buildScrollTriggers()
    initMobileAnimations()
  }, 600)

  const wrapper = document.getElementById('featured-works')
  if (wrapper && typeof IntersectionObserver !== 'undefined') {
    const obs = new IntersectionObserver((entries) => {
      entries.forEach((e) => {
        if (sectionIndicatorRef.value) sectionIndicatorRef.value.style.opacity = e.isIntersecting ? '0.4' : '0'
      })
    }, { threshold:0.05 })
    obs.observe(wrapper)
    onUnmounted(() => obs.disconnect())
  }
})

onUnmounted(() => {
  triggers.forEach((t) => t.kill())
  mobileObservers.forEach((o) => o.disconnect())
})
</script>

<style scoped>
.section-bg  { background:var(--bg-base);    transition:background-color 0.4s ease; }
.scene-bg    { background:var(--bg-base);    transition:background-color 0.4s ease; }
.panel-bg    { background:var(--bg-surface); transition:background-color 0.4s ease; }
.number-watermark { color:var(--txt-primary); opacity:0.06; }
.rule        { background:var(--line); }
.project-name { color:var(--txt-primary); }
.progress-track { background:var(--line); opacity:0.5; }
.progress-fill  { background:var(--txt-primary); }
.blink-overlay  { background:var(--bg-base); }

/* ── Mobile card: starts hidden, .mc-visible triggers reveal ── */
.mobile-card {
  padding: 48px 24px;
  opacity: 0;
  transform: translateY(40px);
  transition: opacity 0.7s ease, transform 0.7s cubic-bezier(0.23, 1, 0.32, 1);
}
.mobile-card.mc-visible {
  opacity: 1;
  transform: translateY(0);
}
/* Active-block dimming transition */
.mobile-card { transition: opacity 0.7s ease, transform 0.7s cubic-bezier(0.23, 1, 0.32, 1); }

/* ── Child elements: base state (hidden) ── */
.mc-num, .mc-name, .mc-rule, .mc-desc, .mc-cta, .mc-img {
  opacity: 0;
  transition: opacity 0.7s ease, transform 0.7s cubic-bezier(0.23, 1, 0.32, 1);
}
/* Stagger delays — applied before .mc-visible parent triggers */
.mc-num  { transition-delay: 0s;    transform: translateY(0); }
.mc-name { transition-delay: 0.1s;  transform: translateY(0); }
.mc-rule {
  transition-delay: 0.15s;
  transform: scaleX(0);
  transform-origin: left;
  height: 1px;
  background: var(--line);
  margin: 14px 0;
}
.mc-desc { transition-delay: 0.2s;  transform: translateY(0); }
.mc-cta  { transition-delay: 0.25s; transform: translateY(0); display: inline-block; margin-top: 18px; }
.mc-img  {
  transition-delay: 0.35s;
  transform: translateY(20px);
  clip-path: inset(0 0 100% 0);
  transition: opacity 0.8s cubic-bezier(0.23, 1, 0.32, 1),
              transform 0.8s cubic-bezier(0.23, 1, 0.32, 1),
              clip-path 0.8s cubic-bezier(0.23, 1, 0.32, 1);
  transition-delay: 0.35s;
  width: 100%;
  height: auto;
  border-radius: 10px;
  margin-top: 28px;
  display: block;
}

/* When parent card is visible, reveal all children */
.mc-visible .mc-num,
.mc-visible .mc-name,
.mc-visible .mc-desc,
.mc-visible .mc-cta  { opacity: 1; }
.mc-visible .mc-rule { opacity: 1; transform: scaleX(1); }
.mc-visible .mc-img  { opacity: 1; transform: translateY(0); clip-path: inset(0 0 0% 0); }

/* Child typography */
.mc-num  { font-family:'Kalnia',serif; font-size:64px; font-weight:200; color:var(--txt-primary); line-height:1; margin-bottom:-8px; }
.mc-name { font-family:'Kalnia',serif; font-size:clamp(28px,7vw,40px); font-weight:500; color:var(--txt-primary); line-height:1.1; }
.mc-desc { font-family:'Manrope',sans-serif; font-weight:300; font-size:15px; color:var(--txt-secondary); line-height:1.65; }
.mc-cta  { font-family:'Manrope',sans-serif; font-size:13px; font-weight:500; color:var(--txt-primary); text-decoration:none; }

/* ── Section header ── */
.mc-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 32px 24px 0;
  opacity: 0;
  transition: opacity 0.5s ease;
}
.mc-header.mc-header-visible { opacity: 1; }
.mc-header-label {
  font-family: 'Space Mono', monospace;
  font-size: 10px;
  letter-spacing: 0.3em;
  text-transform: uppercase;
  color: var(--txt-primary);
  opacity: 0.4;
}
</style>
