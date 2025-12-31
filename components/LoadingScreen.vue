<template>
  <Transition name="curtain">
    <div 
      v-if="isActive" 
      class="fixed inset-0 z-[9999] flex items-center justify-center bg-[#0a0a0a] text-[#E0E0E0]"
    >
      <div class="relative flex flex-col items-center">
        
        <!-- Counter / Text Container -->
        <div class="overflow-hidden h-24 md:h-32 flex items-center justify-center">
          <Transition name="slide-text" mode="out-in">
            <h1 
              v-if="progress < 100" 
              key="count"
              class="text-6xl md:text-8xl font-serif font-light tabular-nums"
            >
              {{ progress }}%
            </h1>
            <h1 
              v-else 
              key="welcome"
              class="text-6xl md:text-8xl font-serif italic text-accent"
            >
              Hello.
            </h1>
          </Transition>
        </div>

        <!-- Progress Line -->
        <div class="w-48 h-px bg-white/20 mt-8 relative overflow-hidden">
          <div 
            class="absolute inset-0 bg-accent transition-transform duration-100 ease-linear"
            :style="{ transform: `translateX(${progress - 100}%)` }"
          ></div>
        </div>

      </div>
    </div>
  </Transition>
</template>

<script setup lang="ts">
import { ref, onMounted, watch } from 'vue'

const emit = defineEmits(['finished'])

const isActive = ref(true)
const progress = ref(0)

onMounted(() => {
  const duration = 2000 // 2s loading time
  const interval = 20
  const step = 100 / (duration / interval)

  const timer = setInterval(() => {
    if (progress.value < 100) {
      progress.value = Math.min(100, Math.round(progress.value + step))
    } else {
      clearInterval(timer)
      // Hold the "Hello" for a moment
      setTimeout(() => {
        isActive.value = false
      }, 800)
    }
  }, interval)
})

watch(isActive, (newVal) => {
  if (!newVal) {
    // Wait for transition to finish before emitting
    setTimeout(() => {
      emit('finished')
    }, 1200)
  }
})
</script>

<style scoped>
.text-accent {
  color: #EEE4B1;
}

.bg-accent {
  background-color: #EEE4B1;
}

/* Curtain Reveal Effect */
.curtain-leave-active {
  transition: transform 1.2s cubic-bezier(0.76, 0, 0.24, 1);
}

.curtain-leave-to {
  transform: translateY(-100%);
}

/* Text Slide Effect */
.slide-text-enter-active,
.slide-text-leave-active {
  transition: all 0.4s ease;
}

.slide-text-enter-from {
  opacity: 0;
  transform: translateY(20px);
}

.slide-text-leave-to {
  opacity: 0;
  transform: translateY(-20px);
}
</style>