<template>
  <div ref="rootRef" class="intro" @click="skip">
    <div ref="wipeRef" class="intro__wipe" />

    <div class="intro__stage">
      <div class="intro__keys" aria-label="rachycodes">
        <div v-for="(row, r) in rows" :key="r" class="intro__row">
          <span
            v-for="(k, i) in row"
            :key="`${r}-${i}`"
            :ref="(el) => setKey(el as HTMLElement, r * rows[0].length + i)"
            class="key"
            :style="{ '--cap': colors[(r * rows[0].length + i) % colors.length] }"
          >
            <span class="key__top">{{ k }}</span>
          </span>
        </div>
      </div>
      <p class="intro__typed t-mono">
        <span>{{ typed }}</span><span class="intro__caret" />
      </p>
    </div>

    <div class="intro__hud t-mono">
      <span>rachy.os — booting</span>
      <span class="intro__count">{{ String(count).padStart(3, '0') }}%</span>
    </div>
    <div class="intro__skip t-mono">click / any key to skip</div>
  </div>
</template>

<script setup lang="ts">
import { gsap } from 'gsap'

const emit = defineEmits<{ finished: [] }>()
const { thock } = useSound()

const rows = [['R', 'A', 'C', 'H', 'Y'], ['C', 'O', 'D', 'E', 'S']]
const colors = ['#fff6ea', '#ff8fcb', '#d6ff3d', '#ffd23f', '#8f7bff']
const MESSAGE = 'hello, world. come on in →'

const rootRef = ref<HTMLElement | null>(null)
const wipeRef = ref<HTMLElement | null>(null)
const keys: HTMLElement[] = []
const count = ref(0)
const typed = ref('')
let tl: gsap.core.Timeline | null = null
let done = false

function setKey(el: HTMLElement | null, i: number) { if (el) keys[i] = el }

function finish() {
  if (done) return
  done = true
  emit('finished')
}

function exit() {
  const out = gsap.timeline({ onComplete: finish })
  out.to(keys, {
    x: () => gsap.utils.random(-window.innerWidth * 0.7, window.innerWidth * 0.7),
    y: () => gsap.utils.random(window.innerHeight * 0.6, window.innerHeight * 1.2),
    rotate: () => gsap.utils.random(-260, 260),
    duration: 1.1,
    ease: 'power2.in',
    stagger: { each: 0.025, from: 'center' },
  })
  out.to('.intro__typed, .intro__hud, .intro__skip', { opacity: 0, duration: 0.3 }, 0)
  out.fromTo(wipeRef.value, { clipPath: 'circle(0% at 50% 50%)' }, { clipPath: 'circle(75% at 50% 50%)', duration: 0.9, ease: 'expo.inOut' }, 0.35)
  out.to(rootRef.value, { opacity: 0, duration: 0.35 }, '>-0.05')
}

function skip() {
  if (done) return
  tl?.kill()
  gsap.to(rootRef.value, { opacity: 0, duration: 0.3, onComplete: finish })
}

onMounted(() => {
  window.addEventListener('keydown', skip, { once: true })
  const counter = { v: 0 }

  tl = gsap.timeline({ onComplete: exit })
  tl.from(keys, {
    y: () => -window.innerHeight,
    rotate: () => gsap.utils.random(-40, 40),
    duration: 0.9,
    ease: 'bounce.out',
    stagger: 0.05,
  })
  // Each key gets "pressed" as the counter ticks up
  tl.to(counter, {
    v: 100,
    duration: 1.6,
    ease: 'power1.inOut',
    onUpdate: () => (count.value = Math.round(counter.v)),
  }, 0.4)
  keys.forEach((k, i) => {
    tl!.to(k, {
      y: 7,
      duration: 0.07,
      ease: 'power2.in',
      yoyo: true,
      repeat: 1,
      onStart: () => { k.classList.add('is-lit'); thock(0.9 + i * 0.03) },
    }, 0.6 + i * 0.12)
  })
  const typing = { n: 0 }
  tl.to(typing, {
    n: MESSAGE.length,
    duration: 0.9,
    ease: 'none',
    onUpdate: () => (typed.value = MESSAGE.slice(0, Math.round(typing.n))),
  }, 1.3)
  tl.to({}, { duration: 0.35 })
})

onUnmounted(() => {
  window.removeEventListener('keydown', skip)
  tl?.kill()
})
</script>

<style scoped>
.intro {
  position: fixed; inset: 0; z-index: 200;
  background: #0b0818;
  color: #fff6ea;
  display: grid; place-items: center;
  overflow: hidden;
}
.intro__wipe { position: absolute; inset: 0; background: var(--bg); clip-path: circle(0% at 50% 50%); }

.intro__stage { position: relative; display: flex; flex-direction: column; align-items: center; gap: 40px; }
.intro__keys { display: flex; gap: clamp(8px, 1.2vw, 16px); }
.intro__row { display: flex; gap: clamp(8px, 1.2vw, 16px); }
@media (max-width: 700px) { .intro__keys { flex-direction: column; align-items: center; } }

.key {
  --size: clamp(54px, 8.4vw, 118px);
  position: relative;
  width: var(--size); height: var(--size);
  border-radius: 18%;
  background: #2a2540;
  border: 3px solid #000;
  box-shadow: 0 8px 0 #000;
  display: block;
}
.key__top {
  position: absolute; inset: 7% 9% 15%;
  border-radius: 14%;
  background: #3a3458;
  display: grid; place-items: center;
  font-weight: 800;
  font-size: calc(var(--size) * 0.46);
  color: #fff6ea;
  transition: background-color 0.2s, color 0.2s;
}
.key.is-lit { background: color-mix(in srgb, var(--cap) 70%, #000); }
.key.is-lit .key__top { background: var(--cap); color: #0b0818; }

.intro__typed { font-family: 'Martian Mono', monospace; font-stretch: 87%; font-size: clamp(12px, 1.4vw, 16px); min-height: 1.4em; text-transform: none; letter-spacing: 0.02em; }
.intro__caret { display: inline-block; width: 0.6em; height: 1.05em; margin-left: 3px; vertical-align: -2px; background: #d6ff3d; animation: blink 0.9s steps(1) infinite; }
@keyframes blink { 50% { opacity: 0; } }

.intro__hud {
  position: absolute; left: 32px; right: 32px; bottom: 28px;
  display: flex; justify-content: space-between; align-items: flex-end;
  font-size: 11px; color: rgba(255, 246, 234, 0.6);
}
.intro__count { font-size: clamp(40px, 7vw, 96px); font-weight: 800; color: #fff6ea; line-height: 0.8; letter-spacing: -0.04em; }
.intro__skip { position: absolute; top: 28px; right: 32px; font-size: 10px; color: rgba(255, 246, 234, 0.45); }
</style>
