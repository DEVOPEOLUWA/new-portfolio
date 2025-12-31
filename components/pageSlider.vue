<template>
  <div class="page-slider-container" @wheel="handleWheel">
    <!-- Pages container that slides horizontally -->
    <div 
      ref="pagesContainer"
      class="pages-wrapper"
      :style="{ transform: `translateX(-${currentPage * 100}vw)` }"
    >
      <slot />
    </div>
    
    <!-- Page indicators (dots on right side) -->
    <div class="fixed right-8 top-1/2 -translate-y-1/2 z-50 flex flex-col gap-3">
      <button
        v-for="(page, index) in pageCount"
        :key="index"
        @click="goToPage(index)"
        class="page-dot"
        :class="{ 'active': currentPage === index }"
        :aria-label="`Go to page ${index + 1}`"
      >
        <span class="dot-inner"></span>
      </button>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, onUnmounted } from 'vue'

const props = defineProps<{
  pageCount: number
}>()

const currentPage = ref(0)
const pagesContainer = ref<HTMLElement | null>(null)
const isAnimating = ref(false)

// Navigate to specific page
const goToPage = (index: number) => {
  if (index < 0 || index >= props.pageCount || isAnimating.value) return
  
  isAnimating.value = true
  currentPage.value = index
  
  setTimeout(() => {
    isAnimating.value = false
  }, 800)
}

// Go to next/previous page
const nextPage = () => {
  if (currentPage.value < props.pageCount - 1) {
    goToPage(currentPage.value + 1)
  }
}

const prevPage = () => {
  if (currentPage.value > 0) {
    goToPage(currentPage.value - 1)
  }
}

// Handle mouse wheel for horizontal navigation
const handleWheel = (e: WheelEvent) => {
  if (isAnimating.value) return
  
  // Horizontal scroll
  if (Math.abs(e.deltaX) > Math.abs(e.deltaY)) {
    if (e.deltaX > 0) {
      nextPage()
    } else {
      prevPage()
    }
  }
}

// Keyboard navigation
const handleKeyboard = (e: KeyboardEvent) => {
  if (e.key === 'ArrowRight') {
    nextPage()
  } else if (e.key === 'ArrowLeft') {
    prevPage()
  }
}

// Touch navigation
let touchStartX = 0
let touchEndX = 0

const handleTouchStart = (e: TouchEvent) => {
  touchStartX = e.changedTouches[0].screenX
}

const handleTouchEnd = (e: TouchEvent) => {
  touchEndX = e.changedTouches[0].screenX
  handleSwipe()
}

const handleSwipe = () => {
  if (touchStartX - touchEndX > 50) {
    // Swipe left - next page
    nextPage()
  } else if (touchEndX - touchStartX > 50) {
    // Swipe right - prev page
    prevPage()
  }
}

onMounted(() => {
  window.addEventListener('keydown', handleKeyboard)
  window.addEventListener('touchstart', handleTouchStart)
  window.addEventListener('touchend', handleTouchEnd)
})

onUnmounted(() => {
  window.removeEventListener('keydown', handleKeyboard)
  window.removeEventListener('touchstart', handleTouchStart)
  window.removeEventListener('touchend', handleTouchEnd)
})

// Expose methods to parent
defineExpose({
  nextPage,
  prevPage,
  goToPage
})
</script>

<style scoped>
.page-slider-container {
  width: 100vw;
  height: 100vh;
  overflow: hidden;
  position: relative;
}

.pages-wrapper {
  display: flex;
  height: 100vh;
  transition: transform 0.8s cubic-bezier(0.4, 0, 0.2, 1);
  will-change: transform;
}

/* Page dots indicator */
.page-dot {
  @apply w-3 h-3 rounded-full relative;
  @apply transition-all duration-300;
}

.dot-inner {
  @apply absolute inset-0 rounded-full bg-white/30;
  @apply transition-all duration-300;
}

.page-dot:hover .dot-inner {
  @apply bg-accent/50 scale-125;
}

.page-dot.active .dot-inner {
  @apply bg-accent scale-150;
}
</style>