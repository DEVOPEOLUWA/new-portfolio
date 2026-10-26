<template>
  <Transition name="road">
    <div
      v-if="active"
      class="road"
      :class="{ 'is-scrubbing': scrubbing }"
      aria-label="Where you are on the page — drag to travel"
      data-cursor="drag"
      @pointerdown="startScrub"
      @pointermove="onScrub"
      @pointerup="endScrub"
      @pointercancel="scrubbing = false"
    >
      <p class="road__hint t-hand" :class="{ gone: progress > 0.01 }" aria-hidden="true">
        scroll to travel <span class="road__arrow">→</span>
      </p>

      <div ref="railRef" class="road__rail">
        <span class="road__done" :style="{ width: `${progress * 100}%` }" />
        <button
          v-for="s in list"
          :key="s.id"
          class="road__stop"
          :class="{ passed: progress >= s.at - 0.002 }"
          :style="{ left: `${s.at * 100}%` }"
          :data-cursor="labels[s.id] ?? s.id"
          :aria-label="`Go to ${labels[s.id] ?? s.id}`"
          @click="scrollTo(`#${s.id}`, { duration: 1.4 })"
        />
        <!-- The sticker actually rolls: rotation follows distance travelled -->
        <span class="road__ball" :style="{ left: `${progress * 100}%`, transform: `translate(-50%, -50%) rotate(${roll}deg)` }">r.</span>
      </div>
    </div>
  </Transition>
</template>

<script setup lang="ts">
import { useHorizontal } from '~/composables/useHorizontal'
import { useLenis } from '~/composables/useLenis'

const { active, progress, stops, scrollAt } = useHorizontal()
const { scrollTo } = useLenis()

const labels: Record<string, string> = {
  top: 'Hello', hello: 'Hi!', work: 'Work', 'side-quest': 'Mystery', toolkit: 'Keys', about: 'About', notes: 'Notes', contact: 'Talk',
}
const railRef = ref<HTMLElement | null>(null)
const list = ref<{ id: string; at: number }[]>([])
const BALL = 34

const roll = computed(() => {
  const w = railRef.value?.clientWidth ?? 400
  return ((progress.value * w) / (Math.PI * BALL)) * 360
})

function refresh() { list.value = stops().filter((s) => s.id) }

// Press anywhere on the road (or grab the ball) and slide to scrub through the page.
// A press without a drag jumps straight to that point.
const scrubbing = ref(false)
let moved = false
let downX = 0

function travelTo(clientX: number, duration: number) {
  const rail = railRef.value?.getBoundingClientRect()
  if (!rail) return
  const y = scrollAt((clientX - rail.left) / rail.width)
  if (y !== null) scrollTo(y, { duration })
}
function startScrub(e: PointerEvent) {
  if (e.button !== 0) return
  scrubbing.value = true
  moved = false
  downX = e.clientX
  try { (e.currentTarget as HTMLElement).setPointerCapture(e.pointerId) } catch { /* synthetic pointer */ }
}
function onScrub(e: PointerEvent) {
  if (!scrubbing.value) return
  if (Math.abs(e.clientX - downX) > 3) moved = true
  if (moved) travelTo(e.clientX, 0.35)
}
function endScrub(e: PointerEvent) {
  if (!scrubbing.value) return
  scrubbing.value = false
  if (!moved) travelTo(e.clientX, 1.1)
}

watch(active, (on) => { if (on) nextTick(refresh) }, { immediate: true })
onMounted(() => {
  window.addEventListener('resize', refresh)
  setTimeout(refresh, 800)
})
onUnmounted(() => window.removeEventListener('resize', refresh))
</script>

<style scoped>
.road {
  position: fixed;
  left: 50%; bottom: 16px;
  transform: translateX(-50%);
  z-index: 70;
  width: min(480px, 40vw);
  padding: 12px 24px;
  background: var(--paper);
  border: 3px solid var(--ink);
  border-radius: 999px;
  box-shadow: 4px 4px 0 var(--ink);
  touch-action: none;
  user-select: none;
}
.road.is-scrubbing .road__ball { scale: 1.2; background: var(--pop2); }
.road__rail { position: relative; height: 4px; border-radius: 4px; background: repeating-linear-gradient(90deg, color-mix(in srgb, var(--ink) 35%, transparent) 0 8px, transparent 8px 14px); }
.road__done { position: absolute; left: 0; top: 0; bottom: 0; border-radius: 4px; background: var(--ink); }
.road__stop {
  position: absolute; top: 50%;
  width: 14px; height: 14px; margin: -7px 0 0 -7px;
  border-radius: 50%;
  border: 3px solid var(--ink);
  background: var(--paper);
  padding: 0;
  transition: background-color 0.3s, transform 0.25s var(--ease-bounce);
}
.road__stop:hover { transform: scale(1.4); }
.road__stop.passed { background: var(--pop2); }
.road__ball {
  position: absolute; top: 50%;
  width: 34px; height: 34px;
  display: grid; place-items: center;
  border-radius: 50%;
  background: var(--pop);
  border: 3px solid var(--ink);
  color: var(--ink);
  font-weight: 800; font-size: 14px;
  pointer-events: none;
  transition: scale 0.2s var(--ease-bounce), background-color 0.2s;
}
.road__hint {
  position: absolute; bottom: calc(100% + 18px); left: 50%;
  transform: translateX(-50%);
  white-space: nowrap;
  font-size: 24px;
  color: var(--on-bg);
  transition: opacity 0.4s;
}
.road__hint.gone { opacity: 0; }
.road__arrow { display: inline-block; animation: nudge 1s ease-in-out infinite; }
@keyframes nudge { 50% { transform: translateX(8px); } }
.road-enter-active, .road-leave-active { transition: opacity 0.4s, transform 0.4s var(--ease-out); }
.road-enter-from, .road-leave-to { opacity: 0; transform: translate(-50%, 30px); }
</style>
