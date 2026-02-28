<template>
  <div>
    <!-- Loading Intro -->
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
      </main>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onUnmounted, nextTick } from 'vue'
import { useLenis } from '~/composables/useLenis'

const { initLenis, destroy } = useLenis()

const loading = ref(true)
const contentVisible = ref(false)
const navVisible = ref(false)
const heroRevealed = ref(false)

const onLoadingFinished = () => {
  loading.value = false
  contentVisible.value = true

  nextTick(() => {
    initLenis()

    // Nav and hero reveal almost immediately — content animations handle the visual entrance
    setTimeout(() => {
      navVisible.value = true
    }, 50)

    setTimeout(() => {
      heroRevealed.value = true
    }, 100)
  })
}

onUnmounted(() => {
  destroy()
})
</script>