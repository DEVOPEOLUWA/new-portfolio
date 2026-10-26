<template>
  <div>
    <IntroLoader v-if="intro" @finished="onIntroDone" />
    <TheNavigation />
    <main ref="wrapRef" class="hwrap">
      <div ref="trackRef" class="htrack">
        <SectionHero :revealed="revealed" />
        <SectionWelcome />
        <SectionWork />
        <SectionNobodyLeaves />
        <SectionToolkit />
        <SectionAbout />
        <SectionGuestbook />
        <SectionContact @replay="replay" />
      </div>
    </main>
    <ClientOnly>
      <TheRoad />
    </ClientOnly>
  </div>
</template>

<script setup lang="ts">
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { useLenis } from '~/composables/useLenis'
import { useHorizontal } from '~/composables/useHorizontal'

const { initLenis, destroy, stop, start, scrollTo } = useLenis()
const { setup, stops, active, progress } = useHorizontal()
const SEEN_KEY = 'rachy:intro-seen'

const intro = ref(false)
const revealed = ref(false)
const wrapRef = ref<HTMLElement | null>(null)
const trackRef = ref<HTMLElement | null>(null)
let mm: gsap.MatchMedia | null = null

function onIntroDone() {
  intro.value = false
  try { sessionStorage.setItem(SEEN_KEY, '1') } catch { /* private mode */ }
  start()
  revealed.value = true
}

function replay() {
  revealed.value = false
  scrollTo(0, { duration: 0.01 })
  stop()
  intro.value = true
}

// ← / → hop a whole panel at a time on the horizontal track
function onArrow(e: KeyboardEvent) {
  if (!active.value || intro.value || (e.key !== 'ArrowRight' && e.key !== 'ArrowLeft')) return
  if ((e.target as HTMLElement).closest('input, textarea, [contenteditable]')) return
  const list = stops()
  const p = progress.value
  const target = e.key === 'ArrowRight'
    ? list.find((s) => s.at > p + 0.005)
    : [...list].reverse().find((s) => s.at < p - 0.005)
  if (!target?.id) return
  e.preventDefault()
  scrollTo(`#${target.id}`, { duration: 1.1 })
}

onMounted(() => {
  history.scrollRestoration = 'manual'
  initLenis()
  if (wrapRef.value && trackRef.value) mm = setup(wrapRef.value, trackRef.value)

  let seen = false
  try { seen = !!sessionStorage.getItem(SEEN_KEY) } catch { /* private mode */ }
  const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches
  const hash = window.location.hash
  if (seen || reduced || hash) {
    revealed.value = true
  } else {
    stop()
    intro.value = true
  }

  if (hash) setTimeout(() => scrollTo(hash, { offset: -70 }), 600)
  window.addEventListener('keydown', onArrow)
  // Fonts/images shift layout after load — let ScrollTrigger re-measure
  window.addEventListener('load', () => ScrollTrigger.refresh(), { once: true })
  document.fonts?.ready.then(() => ScrollTrigger.refresh())
})

onUnmounted(() => {
  window.removeEventListener('keydown', onArrow)
  mm?.revert()
  destroy()
})
</script>
