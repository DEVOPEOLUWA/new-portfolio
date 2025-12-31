<template>
  <div class="h-screen w-screen overflow-hidden bg-[#F4F4F0] dark:bg-[#0a0a0a] text-[#1A1A1A] dark:text-[#E0E0E0] transition-colors duration-700">
    
    <Loading3D v-if="loading" @finished="onLoadingFinished" />
    
    <!-- Main content wrapper for a smoother slide-and-fade-in transition -->
    <div :class="['absolute', 'inset-0', 'transition-all', 'duration-[1500ms]', contentVisible ? 'translate-y-0 opacity-100' : 'translate-y-16 opacity-0']"
         style="transition-timing-function: cubic-bezier(0.4, 0, 0.2, 1);">
      <component :is="currentSectionComponent" :key="currentSectionIndex" />
    </div>

    <div class="fixed bottom-8 right-8 z-50 flex flex-col gap-2 mix-blend-difference">
       <button @click="nextSection" class="p-2 hover:opacity-50 transition">
          <span class="text-xs font-mono">NEXT</span>
       </button>
    </div>

  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted, onUnmounted, watch } from 'vue'
import { useTheme } from '~/composables/useTheme'

// Import Sections
import Hero from './../components/sections/hero.vue'
import About from './../components/sections/about.vue' // We will create this below

// State
const loading = ref(true)
const contentVisible = ref(false)
const currentSectionIndex = ref(0)
const isScrolling = ref(false)
const sections = [Hero, About]

const onLoadingFinished = () => {
  contentVisible.value = true
  setTimeout(() => {
    loading.value = false
  }, 1500) // Match the duration of the content's entry animation
}

// Force hide scrollbars on body when loader is active to prevent visual glitches
if (typeof document !== 'undefined') {
  watch(loading, (isLoading) => {
    document.body.style.overflow = isLoading ? 'hidden' : ''
  }, { immediate: true })

  // Ensure the style is removed when the component is unmounted
  onUnmounted(() => { document.body.style.overflow = '' })
}

// Computed component to render
const currentSectionComponent = computed(() => sections[currentSectionIndex.value])

// Theme Init
const { initTheme } = useTheme()

// Scroll Handler (Debounced to prevent double skips)
const handleScroll = (e: WheelEvent) => {
  if (isScrolling.value) return
  
  if (e.deltaY > 0) {
    nextSection()
  } else {
    prevSection()
  }
}

const nextSection = () => {
  if (currentSectionIndex.value < sections.length - 1) {
    changeSection(currentSectionIndex.value + 1)
  }
}

const prevSection = () => {
  if (currentSectionIndex.value > 0) {
    changeSection(currentSectionIndex.value - 1)
  }
}

const changeSection = (index: number) => {
  isScrolling.value = true
  currentSectionIndex.value = index
  setTimeout(() => { isScrolling.value = false }, 1000) // 1s cooldown for animation
}

// Keyboard Navigation
const handleKey = (e: KeyboardEvent) => {
  if (e.key === 'ArrowDown') nextSection()
  if (e.key === 'ArrowUp') prevSection()
}

onMounted(() => {
  initTheme()
  window.addEventListener('wheel', handleScroll)
  window.addEventListener('keydown', handleKey)
})

onUnmounted(() => {
  window.removeEventListener('wheel', handleScroll)
  window.removeEventListener('keydown', handleKey)
  if (typeof document !== 'undefined') { document.body.style.overflow = '' }
})
</script>