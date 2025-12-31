<template>
  <Transition name="fade">
    <div 
      v-if="isLoading" 
      class="fixed inset-0 z-50 flex items-center justify-center bg-dark-bg overflow-hidden"
    >
      <!-- Orbiting particles -->
      <div class="absolute inset-0 flex items-center justify-center">
        <div 
          v-for="i in 8" 
          :key="i"
          class="orbit-particle"
          :style="{
            transform: `rotate(${i * 45}deg) translateX(150px)`,
            animationDelay: `${i * 0.2}s`
          }"
        ></div>
      </div>

      <!-- 3D Letter "A" -->
      <div 
        class="logo-container"
        :class="{ 'explode': isExploding }"
      >
        <div class="logo-3d">
          <div class="letter-a">A</div>
          <div class="letter-a-shadow">A</div>
        </div>
      </div>

      <!-- Loading text -->
      <div class="absolute bottom-20 text-center">
        <p class="text-xl text-white/60 font-display animate-pulse">
          {{ loadingText }}
        </p>
      </div>
    </div>
  </Transition>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'

const isLoading = ref(true)
const isExploding = ref(false)
const loadingText = ref('Initializing')

const texts = ['Initializing', 'Loading', 'Preparing', 'Almost ready']
let textIndex = 0

// Cycle loading text
const cycleText = setInterval(() => {
  textIndex = (textIndex + 1) % texts.length
  loadingText.value = texts[textIndex]
}, 600)

onMounted(async () => {
  // Let the logo spin for 3 seconds
  await new Promise(resolve => setTimeout(resolve, 3000))
  
  // Trigger explosion
  isExploding.value = true
  
  // Wait for explosion animation
  await new Promise(resolve => setTimeout(resolve, 600))
  
  // Clear interval and hide
  clearInterval(cycleText)
  isLoading.value = false
})
</script>

<style scoped>
/* 3D perspective container */
.logo-container {
  perspective: 1000px;
  position: relative;
}

/* 3D letter styling */
.logo-3d {
  position: relative;
  transform-style: preserve-3d;
  animation: rotate3d 3s ease-in-out;
}

.letter-a {
  font-size: 12rem;
  font-family: 'Cormorant', serif;
  font-weight: 700;
  color: #EC4899;
  text-shadow: 
    0 0 40px rgba(236, 72, 153, 0.8),
    0 0 80px rgba(236, 72, 153, 0.4);
  position: relative;
  z-index: 2;
}

.letter-a-shadow {
  font-size: 12rem;
  font-family: 'Cormorant', serif;
  font-weight: 700;
  color: rgba(236, 72, 153, 0.3);
  position: absolute;
  top: 0;
  left: 0;
  transform: translateZ(-30px);
  z-index: 1;
}

/* 3D rotation animation */
@keyframes rotate3d {
  0% { 
    transform: rotateY(0deg) rotateX(0deg); 
    opacity: 0;
  }
  20% {
    opacity: 1;
  }
  100% { 
    transform: rotateY(720deg) rotateX(360deg);
    opacity: 1;
  }
}

/* Orbiting particles */
.orbit-particle {
  position: absolute;
  width: 8px;
  height: 8px;
  background: #EC4899;
  border-radius: 50%;
  box-shadow: 0 0 20px rgba(236, 72, 153, 0.8);
  animation: orbit 3s linear infinite;
}

@keyframes orbit {
  0% { transform: rotate(0deg) translateX(150px); }
  100% { transform: rotate(360deg) translateX(150px); }
}

/* Explosion effect */
.explode .logo-3d {
  animation: explode 0.6s ease-out forwards;
}

@keyframes explode {
  0% { 
    transform: scale(1) rotateY(720deg); 
    opacity: 1;
  }
  100% { 
    transform: scale(3) rotateY(900deg); 
    opacity: 0;
  }
}

/* Fade out transition */
.fade-leave-active {
  transition: opacity 0.3s ease;
}

.fade-leave-to {
  opacity: 0;
}
</style>