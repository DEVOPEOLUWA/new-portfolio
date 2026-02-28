<template>
  <div v-if="!isMobile" class="pointer-events-none fixed inset-0 z-[9998]">
    <!-- Dash — a single thin line that rotates toward movement direction -->
    <div
      class="cursor-dash"
      :style="{
        transform: `translate3d(${dashX - 1}px, ${dashY - dashLen / 2}px, 0) rotate(${dashAngle}deg)`,
        height: dashLen + 'px',
        opacity: cursorOpacity,
      }"
    />

    <!-- Ring — lazy-follow, expands into a clean circle on hover -->
    <div
      class="cursor-ring"
      :class="{ 'is-hovering': isHovering, 'is-clicking': isClicking }"
      :style="{
        width: ringSize + 'px',
        height: ringSize + 'px',
        transform: `translate3d(${ringX - ringSize / 2}px, ${ringY - ringSize / 2}px, 0)`,
        opacity: cursorOpacity,
      }"
    />
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, onUnmounted } from 'vue'

// ── Positions ──
const dashX = ref(-100)
const dashY = ref(-100)
const ringX = ref(-100)
const ringY = ref(-100)
const mouseX = ref(-100)
const mouseY = ref(-100)
const prevMouseX = ref(-100)
const prevMouseY = ref(-100)

// ── State ──
const cursorOpacity = ref(0)
const isHovering = ref(false)
const isClicking = ref(false)
const isMobile = ref(true)
const hoveredEl = ref<Element | null>(null)

// ── Dash shape ──
const dashAngle = ref(0)
const dashLen = ref(20)

// ── Ring ──
const ringSize = ref(36)

// ── Helpers ──
const lerp = (a: number, b: number, t: number) => a + (b - a) * t

// Shortest-path angle lerp (avoid 360° spins)
const angleLerp = (a: number, b: number, t: number) => {
  let diff = b - a
  while (diff > 180) diff -= 360
  while (diff < -180) diff += 360
  return a + diff * t
}

let rafId: number | null = null
let idleTime = 0

const update = () => {
  const vx = mouseX.value - prevMouseX.value
  const vy = mouseY.value - prevMouseY.value
  prevMouseX.value = mouseX.value
  prevMouseY.value = mouseY.value
  const speed = Math.sqrt(vx * vx + vy * vy)

  // ── Dash (tight follow) ──
  dashX.value = lerp(dashX.value, mouseX.value, 0.4)
  dashY.value = lerp(dashY.value, mouseY.value, 0.4)

  // Rotate toward movement direction; when idle, slowly spin
  if (speed > 1.5) {
    idleTime = 0
    const target = Math.atan2(vy, vx) * (180 / Math.PI) + 90
    dashAngle.value = angleLerp(dashAngle.value, target, 0.12)
  } else {
    idleTime += 1
    if (idleTime > 60) {
      dashAngle.value += 0.3 // gentle idle spin
    }
  }

  // Dash stretches with speed, contracts on click, becomes a small dot on hover
  const targetLen = isHovering.value ? 0 : isClicking.value ? 8 : Math.min(20 + speed * 1.2, 36)
  dashLen.value = lerp(dashLen.value, targetLen, 0.15)

  // ── Ring (lazy follow) — sticks to element on hover ──
  if (isHovering.value && hoveredEl.value) {
    const r = hoveredEl.value.getBoundingClientRect()
    const cx = r.left + r.width / 2
    const cy = r.top + r.height / 2
    ringX.value = lerp(ringX.value, cx, 0.1)
    ringY.value = lerp(ringY.value, cy, 0.1)
    ringSize.value = lerp(ringSize.value, Math.max(r.width, r.height) + 20, 0.1)
  } else {
    ringX.value = lerp(ringX.value, mouseX.value, 0.08)
    ringY.value = lerp(ringY.value, mouseY.value, 0.08)
    ringSize.value = lerp(ringSize.value, isClicking.value ? 24 : 36, 0.12)
  }

  rafId = requestAnimationFrame(update)
}

// ── Events ──
const onMouseMove = (e: MouseEvent) => {
  mouseX.value = e.clientX
  mouseY.value = e.clientY
  if (cursorOpacity.value === 0) cursorOpacity.value = 1
}
const onMouseDown = () => { isClicking.value = true }
const onMouseUp = () => { isClicking.value = false }
const onEnter = (e: Event) => {
  isHovering.value = true
  hoveredEl.value = e.currentTarget as Element
}
const onLeave = () => {
  isHovering.value = false
  hoveredEl.value = null
}
const onDocLeave = () => { cursorOpacity.value = 0 }
const onDocEnter = () => { cursorOpacity.value = 1 }

let observer: MutationObserver | null = null
let styleTag: HTMLStyleElement | null = null

const bindListeners = () => {
  document.querySelectorAll('a, button, [role="button"], input, textarea, select, [data-cursor]').forEach(el => {
    el.removeEventListener('mouseenter', onEnter as EventListener)
    el.removeEventListener('mouseleave', onLeave)
    el.addEventListener('mouseenter', onEnter as EventListener)
    el.addEventListener('mouseleave', onLeave)
  })
}

onMounted(() => {
  if (typeof window === 'undefined') return
  isMobile.value = 'ontouchstart' in window || navigator.maxTouchPoints > 0
  if (isMobile.value) return

  styleTag = document.createElement('style')
  styleTag.id = 'hide-cursor'
  styleTag.textContent = '* { cursor: none !important; }'
  document.head.appendChild(styleTag)

  window.addEventListener('mousemove', onMouseMove, { passive: true })
  window.addEventListener('mousedown', onMouseDown)
  window.addEventListener('mouseup', onMouseUp)
  document.documentElement.addEventListener('mouseleave', onDocLeave)
  document.documentElement.addEventListener('mouseenter', onDocEnter)

  bindListeners()
  observer = new MutationObserver(bindListeners)
  observer.observe(document.body, { childList: true, subtree: true })

  rafId = requestAnimationFrame(update)
})

onUnmounted(() => {
  if (rafId) cancelAnimationFrame(rafId)
  window.removeEventListener('mousemove', onMouseMove)
  window.removeEventListener('mousedown', onMouseDown)
  window.removeEventListener('mouseup', onMouseUp)
  document.documentElement.removeEventListener('mouseleave', onDocLeave)
  document.documentElement.removeEventListener('mouseenter', onDocEnter)
  observer?.disconnect()
  if (styleTag) styleTag.remove()
})
</script>

<style scoped>
/* ── The Dash ── a minimal 2px-wide line */
.cursor-dash {
  position: absolute;
  width: 2px;
  background: var(--txt-primary);
  border-radius: 1px;
  transform-origin: center center;
  will-change: transform, height, opacity;
  mix-blend-mode: difference;
  transition: opacity 0.3s ease;
}

/* ── The Ring ── a thin circle with subtle dashed stroke */
.cursor-ring {
  position: absolute;
  border-radius: 50%;
  border: 1px solid var(--txt-primary);
  opacity: 0.35;
  will-change: transform, width, height;
  transition: border-color 0.4s ease, opacity 0.4s ease;
  mix-blend-mode: difference;
}

.cursor-ring.is-hovering {
  border-style: dashed;
  opacity: 0.6;
}

.cursor-ring.is-clicking {
  opacity: 0.15;
}
</style>
