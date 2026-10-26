<template>
  <div class="cs" :style="{ '--brand': project.brandColor }">
    <div ref="wipeRef" class="cs__wipe" aria-hidden="true" />
    <TheNavigation />

    <header class="cs__hero">
      <NuxtLink to="/#work" class="cs__back t-mono" data-cursor="back">← All work</NuxtLink>
      <div class="wrap">
        <span class="chip cs__reveal">{{ project.category }}</span>
        <h1 class="cs__title t-display">
          <span v-for="(w, i) in project.name.split(' ')" :key="i" class="cs__word"><span class="cs__word-in">{{ w }}</span></span>
        </h1>
        <ul class="cs__strip cs__reveal">
          <li v-for="s in project.strip" :key="s" class="chip chip--dark">{{ s }}</li>
          <li v-for="t in project.tags" :key="t" class="chip">{{ t }}</li>
        </ul>
        <div ref="shotRef" class="cs__shot">
          <div class="browser">
            <div class="browser__bar"><i /><i /><i /></div>
            <img :src="project.image" :alt="`${project.name} interface`" />
          </div>
        </div>
      </div>
    </header>

    <section class="cs__stats">
      <div v-for="(s, i) in project.stats" :key="s.label" class="stat" :style="{ '--tilt': `${i % 2 ? 1.5 : -1.5}deg` }">
        <span class="stat__v t-display">{{ s.value }}</span>
        <span class="stat__l t-mono">{{ s.label }}</span>
      </div>
    </section>

    <section class="cs__story section-pad">
      <div class="wrap cs__cols">
        <div>
          <h2 class="cs__h t-mono"><span>01</span> The challenge</h2>
          <p class="cs__challenge t-serif">{{ project.challenge }}</p>
        </div>
        <div>
          <h2 class="cs__h t-mono"><span>02</span> My role</h2>
          <p class="cs__role">{{ project.role }}</p>
        </div>
      </div>
    </section>

    <nav class="cs__next" aria-label="Other projects">
      <NuxtLink :to="`/projects/${prev.slug}`" class="cs__nav" data-cursor="prev">
        <span class="t-mono">← Previous</span>
        <strong class="t-display">{{ prev.short }}</strong>
      </NuxtLink>
      <NuxtLink :to="`/projects/${next.slug}`" class="cs__nav cs__nav--next" data-cursor="next" :style="{ '--brand': next.brandColor }">
        <span class="t-mono">Next case →</span>
        <strong class="t-display">{{ next.name }}</strong>
      </NuxtLink>
    </nav>
  </div>
</template>

<script setup lang="ts">
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { projects } from '~/data/projects'
import { useLenis } from '~/composables/useLenis'

definePageMeta({ pageTransition: false })

const route = useRoute()
const { initLenis, destroy } = useLenis()

const index = computed(() => Math.max(0, projects.findIndex((p) => p.slug === route.params.slug)))
const project = computed(() => projects[index.value])
const prev = computed(() => projects[(index.value - 1 + projects.length) % projects.length])
const next = computed(() => projects[(index.value + 1) % projects.length])

useHead(() => ({
  title: `${project.value.name} — Opeoluwa Ayodeji`,
  meta: [{ name: 'description', content: project.value.descriptor }],
}))

const wipeRef = ref<HTMLElement | null>(null)
const shotRef = ref<HTMLElement | null>(null)
let ctx: gsap.Context | null = null

function animateIn() {
  ctx?.revert()
  ctx = gsap.context(() => {
    const tl = gsap.timeline()
    tl.fromTo(wipeRef.value, { clipPath: 'circle(150% at 50% 50%)' }, { clipPath: 'circle(0% at 50% 50%)', duration: 1, ease: 'expo.inOut' })
    tl.from('.cs__word-in', { yPercent: 110, rotate: 6, duration: 1, ease: 'expo.out', stagger: 0.06 }, 0.45)
    tl.from('.cs__reveal', { y: 20, opacity: 0, duration: 0.6, stagger: 0.1 }, 0.7)
    tl.from(shotRef.value, { y: 160, rotate: 6, duration: 1.2, ease: 'expo.out' }, 0.75)
    gsap.utils.toArray<HTMLElement>('.cs__stats .stat').forEach((el, i) => {
      gsap.from(el, { y: 60, opacity: 0, duration: 0.8, delay: i * 0.08, ease: 'back.out(1.6)', scrollTrigger: { trigger: el, start: 'top 90%', once: true } })
    })
  })
}

watch(() => route.params.slug, () => nextTick(() => { window.scrollTo(0, 0); animateIn() }))

onMounted(() => {
  gsap.registerPlugin(ScrollTrigger)
  window.scrollTo(0, 0)
  initLenis()
  animateIn()
})

onUnmounted(() => {
  ctx?.revert()
  destroy()
})
</script>

<style scoped>
.cs { background: var(--bg); color: var(--on-bg); min-height: 100vh; }
.cs__wipe { position: fixed; inset: 0; z-index: 150; background: var(--brand); pointer-events: none; }

.cs__hero {
  position: relative;
  background: var(--brand);
  color: #fff6ea;
  padding: calc(var(--nav-h) + var(--frame) + 70px) clamp(20px, 5vw, 72px) 0;
  overflow: hidden;
  border-bottom: 3px solid var(--ink);
}
.cs__back { position: absolute; top: calc(var(--nav-h) + var(--frame) + 20px); left: clamp(20px, 5vw, 72px); font-size: 11px; font-weight: 800; color: #fff6ea; text-decoration: none; opacity: 0.8; }
.cs__back:hover { opacity: 1; color: var(--pop2); }
.cs__title { font-size: clamp(60px, 10vw, 180px); margin-top: 22px; display: flex; flex-wrap: wrap; column-gap: 0.22em; }
.cs__word { display: inline-block; overflow: hidden; padding-top: 0.04em; }
.cs__word-in { display: inline-block; }
.cs__strip { display: flex; flex-wrap: wrap; gap: 8px; list-style: none; padding: 0; margin: 28px 0 0; }
.chip--dark { background: rgba(0, 0, 0, 0.25); color: #fff6ea; border-color: rgba(255, 246, 234, 0.5); }

.cs__shot { display: flex; justify-content: center; margin-top: clamp(40px, 6vw, 72px); }
.browser { width: min(100%, 1080px); background: var(--paper); border: 3px solid var(--ink); border-bottom: none; border-radius: 18px 18px 0 0; overflow: hidden; box-shadow: 12px 0 0 var(--ink); transform: rotate(-1deg) translateY(6px); }
.browser__bar { display: flex; gap: 6px; padding: 12px 16px; border-bottom: 3px solid var(--ink); }
.browser__bar i { width: 13px; height: 13px; border-radius: 50%; border: 2px solid var(--ink); background: var(--pop); }
.browser__bar i:nth-child(2) { background: var(--pop3); }
.browser__bar i:nth-child(3) { background: var(--pop2); }
.browser img { display: block; width: 100%; height: auto; }

.cs__stats { display: grid; grid-template-columns: repeat(4, 1fr); gap: 16px; padding: clamp(40px, 6vw, 80px) clamp(20px, 5vw, 72px) 0; max-width: 1440px; margin: 0 auto; }
.stat { background: var(--paper); color: var(--ink); border: 3px solid var(--ink); border-radius: 20px; box-shadow: var(--shadow); padding: 24px; display: flex; flex-direction: column; gap: 10px; rotate: var(--tilt); }
.stat:nth-child(2) { background: var(--pop2); }
.stat:nth-child(3) { background: var(--pop); }
.stat__v { font-size: clamp(54px, 6vw, 96px); }
.stat__l { font-size: 11px; font-weight: 800; }

.cs__cols { display: grid; grid-template-columns: 1fr 1fr; gap: clamp(40px, 6vw, 100px); }
.cs__h { display: flex; align-items: center; gap: 12px; font-size: 12px; font-weight: 800; margin-bottom: 26px; }
.cs__h span { display: grid; place-items: center; width: 34px; height: 34px; border-radius: 50%; background: var(--pop2); color: var(--ink); border: 3px solid var(--ink); font-size: 11px; }
.cs__challenge { font-size: clamp(24px, 2.3vw, 34px); line-height: 1.25; }
.cs__role { font-size: clamp(16px, 1.3vw, 19px); line-height: 1.7; }

.cs__next { display: grid; grid-template-columns: 1fr 2fr; border-top: 3px solid var(--ink); }
.cs__nav { display: flex; flex-direction: column; gap: 12px; padding: clamp(32px, 5vw, 64px) clamp(20px, 5vw, 72px) calc(clamp(32px, 5vw, 64px) + var(--frame)); text-decoration: none; color: var(--on-bg); transition: background-color 0.4s; }
.cs__nav .t-mono { font-size: 11px; font-weight: 800; }
.cs__nav strong { font-size: clamp(40px, 5vw, 80px); }
.cs__nav:hover { background: var(--ink); color: var(--paper); }
.cs__nav--next { background: var(--brand); color: #fff6ea; border-left: 3px solid var(--ink); }
.cs__nav--next:hover { background: var(--pop2); color: var(--ink); }

@media (max-width: 900px) {
  .cs__stats { grid-template-columns: 1fr 1fr; }
  .cs__cols { grid-template-columns: 1fr; }
  .cs__next { grid-template-columns: 1fr; }
  .cs__nav--next { border-left: none; border-top: 3px solid var(--ink); }
}
</style>
