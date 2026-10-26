<template>
  <div v-if="active" class="cursor" aria-hidden="true">
    <div ref="dotRef" class="cursor__dot" />
    <div ref="ringRef" class="cursor__ring" :class="{ 'is-big': label, 'is-down': down }">
      <span v-if="label" class="cursor__label">{{ label }}</span>
    </div>
  </div>
</template>

<script setup lang="ts">
import { gsap } from 'gsap'

// Any element with data-cursor="view" (etc.) makes the ring grow and show that word.
const active = ref(false)
const label = ref('')
const down = ref(false)
const dotRef = ref<HTMLElement | null>(null)
const ringRef = ref<HTMLElement | null>(null)

let xDot: gsap.QuickToFunc, yDot: gsap.QuickToFunc, xRing: gsap.QuickToFunc, yRing: gsap.QuickToFunc

function onMove(e: PointerEvent) {
  xDot?.(e.clientX); yDot?.(e.clientY)
  xRing?.(e.clientX); yRing?.(e.clientY)
  const target = (e.target as HTMLElement)?.closest?.('[data-cursor]') as HTMLElement | null
  label.value = target?.dataset.cursor ?? ''
}
const onDown = () => (down.value = true)
const onUp = () => (down.value = false)

onMounted(async () => {
  if (!window.matchMedia('(pointer: fine)').matches) return
  active.value = true
  document.documentElement.classList.add('has-cursor')
  await nextTick()
  gsap.set([dotRef.value, ringRef.value], { xPercent: -50, yPercent: -50, x: -100, y: -100 })
  xDot = gsap.quickTo(dotRef.value, 'x', { duration: 0.08 })
  yDot = gsap.quickTo(dotRef.value, 'y', { duration: 0.08 })
  xRing = gsap.quickTo(ringRef.value, 'x', { duration: 0.45, ease: 'power3.out' })
  yRing = gsap.quickTo(ringRef.value, 'y', { duration: 0.45, ease: 'power3.out' })
  window.addEventListener('pointermove', onMove, { passive: true })
  window.addEventListener('pointerdown', onDown)
  window.addEventListener('pointerup', onUp)
})

onUnmounted(() => {
  document.documentElement.classList.remove('has-cursor')
  window.removeEventListener('pointermove', onMove)
  window.removeEventListener('pointerdown', onDown)
  window.removeEventListener('pointerup', onUp)
})
</script>

<style scoped>
.cursor { position: fixed; inset: 0; pointer-events: none; z-index: 9999; }
.cursor__dot {
  position: fixed; top: 0; left: 0;
  width: 8px; height: 8px; border-radius: 50%;
  background: var(--pop2);
  box-shadow: 0 0 0 2px var(--ink);
}
.cursor__ring {
  position: fixed; top: 0; left: 0;
  width: 38px; height: 38px; border-radius: 50%;
  border: 2px solid var(--on-bg);
  mix-blend-mode: normal;
  display: grid; place-items: center;
  transition: width 0.35s var(--ease-out), height 0.35s var(--ease-out), background-color 0.3s, border-color 0.3s, scale 0.2s;
}
.cursor__ring.is-big {
  width: 92px; height: 92px;
  background: var(--pop2);
  border: 3px solid var(--ink);
}
.cursor__ring.is-down { scale: 0.8; }
.cursor__label {
  font-family: 'Unbounded', monospace;
  font-size: 11px; font-weight: 800; letter-spacing: 0.08em; text-transform: uppercase;
  color: var(--ink);
}
</style>
