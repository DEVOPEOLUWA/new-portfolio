<template>
  <div v-if="isLoading" class="fixed inset-0 z-50">
    <!-- Left curtain -->
    <div 
      ref="leftCurtain"
      class="curtain curtain-left"
    >
      <div class="curtain-pattern"></div>
    </div>

    <!-- Right curtain -->
    <div 
      ref="rightCurtain"
      class="curtain curtain-right"
    >
      <div class="curtain-pattern"></div>
    </div>

    <!-- Counter - bottom right -->
    <div 
      v-show="!isRevealing"
      class="absolute bottom-8 right-8 md:bottom-16 md:right-16"
    >
      <div 
        ref="counterEl"
        class="text-right"
      >
        <span class="text-[8rem] md:text-[12rem] font-mono font-black text-accent leading-none tracking-tighter block-text">
          {{ counter }}
        </span>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { gsap } from 'gsap'

const isLoading = ref(true)
const isRevealing = ref(false)
const counter = ref(0)

// Refs for GSAP animation
const leftCurtain = ref<HTMLElement | null>(null)
const rightCurtain = ref<HTMLElement | null>(null)
const counterEl = ref<HTMLElement | null>(null)

// Animate counter from 0 to 100 (slower - 4 seconds)
const animateCounter = () => {
  return gsap.to(counter, {
    value: 100,
    duration: 4,
    ease: 'power2.inOut',
    onUpdate: function() {
      counter.value = Math.floor(this.targets()[0].value)
    }
  })
}

// Curtain reveal animation - opens from center
const curtainReveal = async () => {
  isRevealing.value = true
  
  // Fade out counter first
  if (counterEl.value) {
    await gsap.to(counterEl.value, {
      opacity: 0,
      scale: 0.95,
      duration: 0.5,
      ease: 'power2.in'
    })
  }
  
  // Open curtains (slide left and right)
  await gsap.to([leftCurtain.value, rightCurtain.value], {
    x: (index) => index === 0 ? '-100%' : '100%',
    duration: 1.2,
    ease: 'power3.inOut'
  })
  
  // Hide loader completely
  isLoading.value = false
}

// Main loading sequence
const startLoading = async () => {
  // Wait a tiny bit for DOM to be ready
  await new Promise(resolve => setTimeout(resolve, 100))
  
  // Fade in counter
  if (counterEl.value) {
    gsap.fromTo(counterEl.value,
      { opacity: 0, scale: 0.9 },
      { 
        opacity: 1, 
        scale: 1, 
        duration: 0.8,
        ease: 'power2.out'
      }
    )
  }
  
  // Animate counter to 100
  await animateCounter()
  
  // Small pause at 100%
  await new Promise(resolve => setTimeout(resolve, 600))
  
  // Start curtain reveal
  await curtainReveal()
}

onMounted(() => {
  startLoading()
})
</script>

<style scoped>
/* Curtain panels with solid color and texture */
.curtain {
  position: absolute;
  top: 0;
  width: 50%;
  height: 100%;
  will-change: transform;
  background: #0a0a0a;
  overflow: hidden;
  box-shadow: inset 0 0 60px rgba(0, 0, 0, 0.8);
}

.curtain-left {
  left: 0;
  border-right: 2px solid rgba(255, 255, 255, 0.1);
}

.curtain-right {
  right: 0;
  border-left: 2px solid rgba(255, 255, 255, 0.1);
}

/* Curtain pattern/texture */
.curtain-pattern {
  position: absolute;
  inset: 0;
  background: 
    repeating-linear-gradient(
      90deg,
      transparent,
      transparent 2px,
      rgba(255, 255, 255, 0.02) 2px,
      rgba(255, 255, 255, 0.02) 4px
    ),
    repeating-linear-gradient(
      0deg,
      transparent,
      transparent 2px,
      rgba(255, 255, 255, 0.02) 2px,
      rgba(255, 255, 255, 0.02) 4px
    );
  opacity: 0.5;
}

/* Block-style text */
.block-text {
  text-shadow: 
    4px 4px 0px rgba(0, 0, 0, 0.8),
    -1px -1px 0px rgba(255, 255, 255, 0.1);
  letter-spacing: -0.05em;
  font-weight: 900;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  /* font-family: 'Courier New', 'Courier', monospace, system-ui, -apple-system; */
  text-rendering: geometricPrecision;
}

/* Smooth text rendering */
span {
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}
</style>