<template>
  <Transition name="slide-up">
    <div 
      v-if="isLoading" 
      class="fixed inset-0 z-50 flex items-center justify-center bg-dark-bg overflow-hidden"
    >
      <!-- Floating particles background -->
      <div class="absolute inset-0">
        <div 
          v-for="i in 30" 
          :key="i"
          class="particle"
          :style="{
            left: `${Math.random() * 100}%`,
            top: `${Math.random() * 100}%`,
            animationDelay: `${Math.random() * 3}s`,
            animationDuration: `${3 + Math.random() * 2}s`
          }"
        ></div>
      </div>

      <!-- Main text -->
      <div class="relative z-10 text-center">
        <h1 class="text-6xl md:text-8xl font-display font-bold tracking-tight">
          <span 
            v-for="(letter, index) in nameLetters" 
            :key="index"
            :class="[
              'inline-block',
              letterStates[index] === 'locked' ? 'text-accent glow-accent' : 'text-white/30'
            ]"
            :style="{ 
              animation: letterStates[index] === 'glitching' ? 'glitch 0.3s infinite' : 'none'
            }"
          >
            {{ letterStates[index] === 'glitching' ? getRandomChar() : letter }}
          </span>
        </h1>
        
        <!-- Subtitle appears after name is complete -->
        <p 
          v-if="nameComplete"
          class="text-xl md:text-2xl text-white/60 mt-6 animate-fade-in"
        >
          Frontend Engineer
        </p>
      </div>
    </div>
  </Transition>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'

const isLoading = ref(true)
const nameLetters = 'AYODEJI'.split('')
const letterStates = ref<('waiting' | 'glitching' | 'locked')[]>(
  Array(nameLetters.length).fill('waiting')
)
const nameComplete = ref(false)

const randomChars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789@#$%&*'
const getRandomChar = () => randomChars[Math.floor(Math.random() * randomChars.length)]

// Animate each letter appearing
const animateLetters = async () => {
  for (let i = 0; i < nameLetters.length; i++) {
    // Start glitching
    letterStates.value[i] = 'glitching'
    
    // Glitch for 500ms
    await new Promise(resolve => setTimeout(resolve, 500))
    
    // Lock in the real letter
    letterStates.value[i] = 'locked'
    
    // Pause before next letter
    await new Promise(resolve => setTimeout(resolve, 200))
  }
  
  // Name complete
  nameComplete.value = true
  
  // Wait a bit to admire, then exit
  await new Promise(resolve => setTimeout(resolve, 1000))
  isLoading.value = false
}

onMounted(() => {
  animateLetters()
})
</script>

<style scoped>
/* Particle animation */
.particle {
  position: absolute;
  width: 4px;
  height: 4px;
  background: #EC4899;
  border-radius: 50%;
  opacity: 0.3;
  animation: float ease-in-out infinite;
}

@keyframes float {
  0%, 100% { transform: translateY(0) translateX(0); }
  50% { transform: translateY(-30px) translateX(10px); }
}

/* Glitch effect */
@keyframes glitch {
  0% { transform: translate(0); }
  20% { transform: translate(-2px, 2px); }
  40% { transform: translate(-2px, -2px); }
  60% { transform: translate(2px, 2px); }
  80% { transform: translate(2px, -2px); }
  100% { transform: translate(0); }
}

/* Fade in animation */
@keyframes fade-in {
  from { opacity: 0; transform: translateY(10px); }
  to { opacity: 1; transform: translateY(0); }
}

.animate-fade-in {
  animation: fade-in 0.6s ease-out;
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