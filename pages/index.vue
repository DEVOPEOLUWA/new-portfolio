<template>
  <div>
    <IntroLoader v-if="intro" @finished="onIntroDone" />
    <TheNavigation />
    <main>
      <SectionHero :revealed="revealed" />
      <SectionWelcome />
      <SectionWork />
      <SectionNobodyLeaves />
      <SectionToolkit />
      <SectionAbout />
      <SectionGuestbook />
      <SectionContact @replay="replay" />
    </main>
  </div>
</template>

<script setup lang="ts">
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { useLenis } from '~/composables/useLenis'

const { initLenis, destroy, stop, start, scrollTo } = useLenis()
const SEEN_KEY = 'rachy:intro-seen'

const intro = ref(false)
const revealed = ref(false)

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

onMounted(() => {
  history.scrollRestoration = 'manual'
  initLenis()
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

  if (hash) setTimeout(() => scrollTo(hash, { offset: -70 }), 500)
  // Fonts/images shift layout after load — let ScrollTrigger re-measure
  window.addEventListener('load', () => ScrollTrigger.refresh(), { once: true })
})

onUnmounted(destroy)
</script>
