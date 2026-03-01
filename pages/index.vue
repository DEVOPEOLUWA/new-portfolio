<template>
  <div>
    <!-- Loading Intro — only on first visit per session -->
    <LoadingIntro v-if="loading" @finished="onLoadingFinished" />

    <!-- Main Content -->
    <div
      :class="[
        'transition-opacity duration-200',
        contentVisible ? 'opacity-100' : 'opacity-0',
      ]"
    >
      <TheNavigation v-if="navVisible" />

      <main>
        <SectionHero :revealed="heroRevealed" />
        <SectionProjects />
        <SectionAbout />
        <SectionContact />
        <SectionGuestbook />
      </main>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, onUnmounted, nextTick } from 'vue'
import { useLenis } from '~/composables/useLenis'

const { initLenis, destroy } = useLenis()

const LOADER_KEY = 'portfolio_intro_shown'

const loading = ref(false)
const contentVisible = ref(false)
const navVisible = ref(false)
const heroRevealed = ref(false)

const scrollToHash = () => {
  if (typeof window === 'undefined') return
  const hash = window.location.hash
  if (!hash) return
  setTimeout(() => {
    const el = document.querySelector(hash)
    if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' })
  }, 300)
}

const skipLoader = () => {
  loading.value = false
  contentVisible.value = true
  nextTick(() => {
    initLenis()
    setTimeout(() => { navVisible.value = true }, 50)
    setTimeout(() => { heroRevealed.value = true }, 100)
    setTimeout(scrollToHash, 400)
  })
}

onMounted(() => {
  if (typeof sessionStorage !== 'undefined' && sessionStorage.getItem(LOADER_KEY)) {
    // Already seen this session — skip loader
    skipLoader()
  } else {
    // First visit — show loader
    loading.value = true
  }
})

const onLoadingFinished = () => {
  if (typeof sessionStorage !== 'undefined') {
    sessionStorage.setItem(LOADER_KEY, '1')
  }
  loading.value = false
  contentVisible.value = true
  nextTick(() => {
    initLenis()
    setTimeout(() => { navVisible.value = true }, 50)
    setTimeout(() => { heroRevealed.value = true }, 100)
  })
}

onUnmounted(() => {
  destroy()
})
</script>