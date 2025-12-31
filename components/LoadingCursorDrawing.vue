<template>
  <Transition name="slide-up">
    <div 
      v-if="isLoading" 
      class="fixed inset-0 z-50 flex items-center justify-center bg-dark-bg"
    >
      <div class="text-center">
        <!-- Typed name -->
        <h1 class="text-5xl md:text-7xl font-display mb-12">
          <span class="text-accent">{{ typedText }}</span>
          <span 
            v-if="showCursor" 
            class="inline-block w-1 h-16 md:h-20 bg-accent ml-2 animate-blink"
          ></span>
        </h1>

        <!-- SVG drawing area -->
        <svg 
          v-if="showDrawing"
          width="200" 
          height="200" 
          viewBox="0 0 200 200" 
          class="mx-auto"
        >
          <!-- Circle (head) -->
          <circle
            cx="100"
            cy="80"
            r="40"
            fill="none"
            :stroke="drawProgress > 0 ? '#EC4899' : 'transparent'"
            stroke-width="3"
            :stroke-dasharray="circleCircumference"
            :stroke-dashoffset="circleCircumference * (1 - Math.min(drawProgress / 25, 1))"
            class="glow-stroke"
          />
          
          <!-- Body (line) -->
          <line
            x1="100"
            y1="120"
            x2="100"
            :y2="120 + Math.min((drawProgress - 25) * 1.6, 40)"
            :stroke="drawProgress > 25 ? '#EC4899' : 'transparent'"
            stroke-width="3"
            stroke-linecap="round"
            class="glow-stroke"
          />
          
          <!-- Left arm -->
          <line
            x1="100"
            y1="140"
            :x2="100 - Math.min((drawProgress - 50) * 1.2, 30)"
            :y2="140 + Math.min((drawProgress - 50) * 0.8, 20)"
            :stroke="drawProgress > 50 ? '#EC4899' : 'transparent'"
            stroke-width="3"
            stroke-linecap="round"
            class="glow-stroke"
          />
          
          <!-- Right arm -->
          <line
            x1="100"
            y1="140"
            :x2="100 + Math.min((drawProgress - 65) * 1.2, 30)"
            :y2="140 + Math.min((drawProgress - 65) * 0.8, 20)"
            :stroke="drawProgress > 65 ? '#EC4899' : 'transparent'"
            stroke-width="3"
            stroke-linecap="round"
            class="glow-stroke"
          />
          
          <!-- Checkmark when complete -->
          <g v-if="drawProgress >= 100" class="animate-scale-in">
            <circle cx="100" cy="100" r="50" fill="#EC4899" opacity="0.2" />
            <path
              d="M 80 100 L 95 115 L 120 85"
              fill="none"
              stroke="#EC4899"
              stroke-width="4"
              stroke-linecap="round"
              stroke-linejoin="round"
            />
          </g>
        </svg>

        <!-- Status text -->
        <p 
          v-if="statusText" 
          class="text-lg text-white/60 mt-8 animate-fade-in"
        >
          {{ statusText }}
        </p>
      </div>
    </div>
  </Transition>
</template>

<script setup lang="ts">
import { ref, onMounted, computed } from 'vue'

const isLoading = ref(true)
const typedText = ref('')
const showCursor = ref(true)
const showDrawing = ref(false)
const drawProgress = ref(0)
const statusText = ref('')

const fullName = 'Ayodeji Opeoluwa'
const circleCircumference = 2 * Math.PI * 40 // 2πr for circle with radius 40

// Type out the name
const typeText = async () => {
  for (let i = 0; i <= fullName.length; i++) {
    typedText.value = fullName.slice(0, i)
    await new Promise(resolve => setTimeout(resolve, 100))
  }
  
  // Pause, then hide cursor and show drawing
  await new Promise(resolve => setTimeout(resolve, 500))
  showCursor.value = false
  showDrawing.value = true
  statusText.value = 'Crafting experience...'
  
  // Animate the drawing
  await animateDrawing()
}

// Animate the stick figure drawing
const animateDrawing = async () => {
  return new Promise<void>(resolve => {
    const duration = 2000 // 2 seconds total
    const startTime = Date.now()
    
    const animate = () => {
      const elapsed = Date.now() - startTime
      const progress = Math.min((elapsed / duration) * 100, 100)
      drawProgress.value = progress
      
      if (progress < 100) {
        requestAnimationFrame(animate)
      } else {
        statusText.value = 'Ready!'
        setTimeout(() => {
          isLoading.value = false
          resolve()
        }, 800)
      }
    }
    
    animate()
  })
}

onMounted(() => {
  typeText()
})
</script>

<style scoped>
/* Cursor blink */
@keyframes blink {
  0%, 50% { opacity: 1; }
  51%, 100% { opacity: 0; }
}

.animate-blink {
  animation: blink 1s infinite;
}

/* Glow effect on SVG strokes */
.glow-stroke {
  filter: drop-shadow(0 0 8px rgba(236, 72, 153, 0.8));
}

/* Scale in animation for checkmark */
@keyframes scale-in {
  from { transform: scale(0); opacity: 0; }
  to { transform: scale(1); opacity: 1; }
}

.animate-scale-in {
  animation: scale-in 0.4s cubic-bezier(0.34, 1.56, 0.64, 1);
}

/* Fade in */
@keyframes fade-in {
  from { opacity: 0; }
  to { opacity: 1; }
}

.animate-fade-in {
  animation: fade-in 0.5s ease-out;
}

/* Slide up exit */
.slide-up-leave-active {
  transition: all 0.8s cubic-bezier(0.4, 0, 0.2, 1);
}

.slide-up-leave-to {
  transform: translateY(-100%);
  opacity: 0;
}
</style>