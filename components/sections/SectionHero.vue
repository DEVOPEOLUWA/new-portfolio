<template>
  <section id="top" ref="heroRef" class="hero dot-grid" @pointermove="onTilt" @pointerleave="resetTilt">
    <div class="hero__grid wrap" data-fit>
      <!-- Copy -->
      <div class="hero__copy">
        <div class="hero__status reveal-pop">
          <span class="chip"><span class="live-dot" /> Open to interesting work</span>
          <span class="chip chip--ghost">Lagos, NG · {{ time }}</span>
        </div>

        <h1 class="hero__title t-display" aria-label="I make complex feel easy.">
          <span class="line"><span class="line__in">I make</span></span>
          <span class="line"><span class="line__in">complex</span></span>
          <span class="line">
            <span class="line__in">feel <em class="hero__easy t-serif">easy.</em></span>
          </span>
        </h1>

        <p class="hero__lede reveal-up">
          Hi, I'm <strong>Opeoluwa</strong> — I make the web feel like a dream. Hand me a complex design and I'll
          build it from scratch, pixel for pixel, into enterprise platforms that solve real problems and feel
          effortless to use. Frontend at heart, full stack in practice.
        </p>

        <div class="hero__ctas reveal-up">
          <a href="#work" class="btn" data-cursor="go" @click.prevent="scrollTo('#work', { offset: -70 })">
            Explore my work <span aria-hidden="true">→</span>
          </a>
        </div>
      </div>

      <!-- Sticker portrait -->
      <div class="hero__portrait">
        <div ref="stickerRef" class="sticker" data-cursor="hi!" @pointerenter="wave">
          <img src="/images/profile.jpg" alt="Opeoluwa Ayodeji smiling, in a pink top against a purple backdrop" width="1120" height="1400" />
          <div ref="bubbleRef" class="bubble t-hand">hi, I'm Ope! <span ref="handRef" class="bubble__hand">👋</span></div>
        </div>

        <svg class="badge" viewBox="0 0 200 200" aria-hidden="true">
          <defs>
            <path id="badge-circle" d="M100,100 m-74,0 a74,74 0 1,1 148,0 a74,74 0 1,1 -148,0" />
          </defs>
          <circle cx="100" cy="100" r="98" fill="var(--pop2)" stroke="var(--ink)" stroke-width="4" />
          <text font-family="Unbounded" font-size="12" font-weight="700" letter-spacing="1" fill="var(--ink)">
            <textPath href="#badge-circle">FRONTEND-FIRST ✦ FULL-STACK ✦ RACHYCODES ✦</textPath>
          </text>
          <text x="100" y="117" text-anchor="middle" font-size="48" fill="var(--ink)">✦</text>
        </svg>
      </div>
    </div>

    <!-- Draggable keycaps -->
    <div
      v-for="(k, i) in keycaps"
      :key="k.label"
      :ref="(el) => { if (el) capRefs[i] = el as HTMLElement }"
      class="cap"
      :class="k.cls"
      :style="{ left: k.x, top: k.y, '--c': k.color, '--r': `${k.r}deg` }"
      data-cursor="drag"
    >
      <span class="cap__top">{{ k.label }}</span>
    </div>
    <div class="hint t-hand" aria-hidden="true">
      psst… these move
      <svg viewBox="0 0 80 50" width="70" height="44"><path d="M5 8 C 30 0, 60 10, 70 40" stroke="currentColor" stroke-width="3" fill="none" stroke-linecap="round"/><path d="M60 34 L70 42 L74 30" stroke="currentColor" stroke-width="3" fill="none" stroke-linecap="round" stroke-linejoin="round"/></svg>
    </div>

    <div class="hero__marquee marquee" style="--marquee-speed: 26s" aria-hidden="true">
      <div v-for="n in 2" :key="n" class="marquee__track">
        <span v-for="w in ticker" :key="`${n}-${w}`" class="tick t-display">{{ w }} <i>✦</i></span>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import { gsap } from 'gsap'
import { Draggable } from 'gsap/Draggable'
import { InertiaPlugin } from 'gsap/InertiaPlugin'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { useLenis } from '~/composables/useLenis'
import { H_QUERY } from '~/composables/useHorizontal'

const props = defineProps<{ revealed: boolean }>()
const { scrollTo } = useLenis()
const { thock } = useSound()

const keycaps = [
  { label: 'TS', x: '47%', y: '18%', r: -12, color: 'var(--pop3)', cls: 'hide-sm' },
  { label: 'VUE', x: '88%', y: '14%', r: 10, color: 'var(--pop2)', cls: '' },
  { label: 'NG', x: '50%', y: '76%', r: 8, color: 'var(--pop)', cls: 'hide-sm' },
  { label: '⌘', x: '91%', y: '62%', r: -8, color: 'var(--paper)', cls: '' },
  { label: '{ }', x: '55%', y: '46%', r: 14, color: '#8f7bff', cls: 'hide-sm' },
  { label: '♥', x: '66%', y: '82%', r: -16, color: 'var(--pop)', cls: '' },
]
const ticker = ['Angular', 'Vue', 'React', 'TypeScript', 'Pixel-perfect builds', 'Enterprise UX', 'Realtime UIs', 'Motion', 'Full stack', 'Real problems']

const heroRef = ref<HTMLElement | null>(null)
const stickerRef = ref<HTMLElement | null>(null)
const bubbleRef = ref<HTMLElement | null>(null)
const handRef = ref<HTMLElement | null>(null)
const capRefs = ref<HTMLElement[]>([])
const time = ref('')

let rx: gsap.QuickToFunc | null = null
let ry: gsap.QuickToFunc | null = null
let draggables: Draggable[] = []
let st: ScrollTrigger | null = null
let clock: ReturnType<typeof setInterval> | null = null

function tick() {
  time.value = new Date().toLocaleTimeString('en-GB', { timeZone: 'Africa/Lagos', hour: '2-digit', minute: '2-digit' })
}

function onTilt(e: PointerEvent) {
  if (e.pointerType !== 'mouse' || !heroRef.value) return
  const r = heroRef.value.getBoundingClientRect()
  const nx = (e.clientX - r.left) / r.width - 0.5
  const ny = (e.clientY - r.top) / r.height - 0.5
  ry?.(nx * 18)
  rx?.(-ny * 14)
}
function resetTilt() { ry?.(0); rx?.(0) }

function wave() {
  gsap.fromTo(handRef.value, { rotate: 0 }, { keyframes: { rotate: [0, 22, -10, 22, 0] }, duration: 0.9, ease: 'none', transformOrigin: '70% 80%' })
}

function intro() {
  const tl = gsap.timeline()
  tl.to('.hero .line__in', { yPercent: 0, rotate: 0, duration: 1.1, ease: 'expo.out', stagger: 0.09 })
  tl.to('.hero .reveal-pop', { opacity: 1, y: 0, duration: 0.6, ease: 'back.out(2)' }, 0.1)
  tl.to('.hero .reveal-up', { opacity: 1, y: 0, duration: 0.8, ease: 'expo.out', stagger: 0.08 }, 0.35)
  tl.fromTo(stickerRef.value, { scale: 0.4, rotate: -30, opacity: 0 }, { scale: 1, rotate: -4, opacity: 1, duration: 1.1, ease: 'elastic.out(1, 0.6)' }, 0.2)
  tl.fromTo('.hero .badge', { scale: 0, rotate: -120, opacity: 0 }, { scale: 1, rotate: 0, opacity: 1, duration: 0.9, ease: 'back.out(1.8)' }, 0.55)
  tl.fromTo(bubbleRef.value, { scale: 0, opacity: 0 }, { scale: 1, opacity: 1, duration: 0.6, ease: 'back.out(3)', onComplete: wave }, 0.9)
  tl.fromTo(capRefs.value, { scale: 0, rotate: 0 }, { scale: 1, rotate: (i: number) => keycaps[i].r, duration: 0.7, ease: 'back.out(2.5)', stagger: 0.06 }, 0.6)
  tl.fromTo('.hero .hint', { opacity: 0, y: 10 }, { opacity: 1, y: 0, duration: 0.5 }, 1.4)
}

watch(() => props.revealed, (v) => { if (v) intro() })

onMounted(() => {
  gsap.registerPlugin(Draggable, InertiaPlugin, ScrollTrigger)
  tick()
  clock = setInterval(tick, 15_000)

  gsap.set('.hero .line__in', { yPercent: 110, rotate: 4 })
  gsap.set('.hero .reveal-pop, .hero .reveal-up', { opacity: 0, y: 24 })
  gsap.set([stickerRef.value, bubbleRef.value, '.hero .badge', '.hero .hint', ...capRefs.value], { opacity: 0 })
  gsap.set(capRefs.value, { opacity: 1, scale: 0 })

  rx = gsap.quickTo(stickerRef.value, 'rotationX', { duration: 0.6, ease: 'power3.out' })
  ry = gsap.quickTo(stickerRef.value, 'rotationY', { duration: 0.6, ease: 'power3.out' })

  draggables = Draggable.create(capRefs.value, {
    type: 'x,y',
    bounds: heroRef.value,
    inertia: true,
    edgeResistance: 0.75,
    zIndexBoost: true,
    onPress() { thock(1.2); gsap.to(this.target, { scale: 1.15, duration: 0.2 }) },
    onRelease() { gsap.to(this.target, { scale: 1, duration: 0.4, ease: 'back.out(3)' }) },
    onDragStart() { gsap.to('.hero .hint', { opacity: 0, duration: 0.3 }) },
  })

  // Vertical parallax only makes sense when the page scrolls vertically (phones)
  if (!window.matchMedia(H_QUERY).matches) st = ScrollTrigger.create({
    trigger: heroRef.value,
    start: 'top top',
    end: 'bottom top',
    scrub: true,
    animation: gsap.timeline()
      .to('.hero__portrait', { yPercent: -18, rotate: -6, ease: 'none' }, 0)
      .to('.hero__title', { yPercent: 12, ease: 'none' }, 0),
  })

  if (props.revealed) intro()
})

onUnmounted(() => {
  draggables.forEach((d) => d.kill())
  st?.kill()
  if (clock) clearInterval(clock)
})
</script>

<style scoped>
.hero {
  position: relative;
  min-height: 100svh;
  padding: calc(var(--nav-h) + var(--frame) + 48px) clamp(20px, 5vw, 72px) 120px;
  overflow: hidden;
  display: flex; align-items: center;
}
.hero__grid {
  width: 100%;
  display: grid;
  grid-template-columns: 1.25fr 0.75fr;
  align-items: center;
  gap: clamp(24px, 4vw, 64px);
}
.hero__status { display: flex; flex-wrap: wrap; gap: 8px; margin-bottom: 28px; }
.chip--ghost { background: transparent; color: var(--on-bg); border-color: var(--on-bg); }
.chip--pink { background: var(--pop); }
.live-dot { width: 9px; height: 9px; border-radius: 50%; background: #18c964; box-shadow: 0 0 0 2px var(--ink); animation: pulse 1.6s infinite; }
@keyframes pulse { 50% { transform: scale(1.3); } }

.hero__title { font-size: clamp(76px, 12.5vw, 220px); color: var(--on-bg); }
.line { display: block; overflow: hidden; padding: 0.04em 0 0.02em; margin-bottom: -0.06em; }
.line__in { display: inline-block; transform-origin: left bottom; }
.hero__easy {
  display: inline-block;
  padding: 0 0.12em 0.02em;
  font-size: 0.92em;
  line-height: 1;
  background: var(--pop);
  color: var(--ink);
  border: 0.035em solid var(--ink);
  border-radius: 0.2em;
  box-shadow: 0.05em 0.05em 0 var(--ink);
  transform: rotate(-3deg) translateY(-0.04em);
}

.hero__lede { max-width: 520px; margin-top: 30px; font-size: clamp(17px, 1.5vw, 21px); line-height: 1.5; font-weight: 400; }
.hero__lede strong { font-weight: 800; }
.hero__ctas { display: flex; flex-wrap: wrap; gap: 14px; margin-top: 30px; }

.hero__portrait { position: relative; perspective: 900px; justify-self: center; width: min(100%, 420px); }
.sticker {
  position: relative;
  padding: 10px;
  background: var(--paper);
  border: 3px solid var(--ink);
  border-radius: 28px;
  box-shadow: var(--shadow-lg);
  transform: rotate(-4deg);
  transform-style: preserve-3d;
}
.sticker img { display: block; width: 100%; aspect-ratio: 4 / 5; object-fit: cover; object-position: 50% 20%; border-radius: 20px; border: 3px solid var(--ink); }
.bubble {
  position: absolute; top: -26px; left: -36px;
  padding: 8px 18px;
  background: var(--paper); color: var(--ink);
  border: 3px solid var(--ink); border-radius: 22px 22px 22px 4px;
  box-shadow: 4px 4px 0 var(--ink);
  font-size: 28px; line-height: 1;
  transform: translateZ(40px) rotate(-6deg);
  white-space: nowrap;
}
.bubble__hand { display: inline-block; }
.badge { position: absolute; width: clamp(96px, 10vw, 140px); bottom: -34px; right: -30px; animation: spin 14s linear infinite; }
@keyframes spin { to { transform: rotate(360deg); } }

.cap {
  --s: clamp(54px, 5.6vw, 76px);
  position: absolute; z-index: 5;
  width: var(--s); height: var(--s);
  border-radius: 18%;
  background: color-mix(in srgb, var(--c) 65%, #000);
  border: 3px solid var(--ink);
  box-shadow: 0 6px 0 var(--ink);
  rotate: var(--r);
  touch-action: none;
}
.cap__top {
  position: absolute; inset: 6% 9% 16%;
  display: grid; place-items: center;
  border-radius: 14%;
  background: var(--c); color: var(--ink);
  font-family: 'Unbounded', monospace; font-weight: 800;
  font-size: calc(var(--s) * 0.26);
}
.hint { position: absolute; left: 36%; top: max(9%, calc(var(--nav-h) + 20px)); z-index: 4; color: var(--on-bg); font-size: 24px; display: flex; align-items: flex-start; gap: 2px; transform: rotate(-4deg); pointer-events: none; }

.hero__marquee {
  position: absolute; left: 0; right: 0; bottom: 0;
  background: var(--ink); color: var(--paper);
  padding: 14px 0 calc(14px + var(--frame));
  border-top: 3px solid var(--ink);
}
.tick { font-size: clamp(22px, 2.4vw, 34px); padding-right: 28px; }
.tick i { font-style: normal; color: var(--pop2); margin-left: 24px; }

@media (min-width: 900px) and (min-height: 560px) {
  .hero { width: 100vw; padding-top: calc(var(--nav-h) + 20px); padding-bottom: 82px; }
  .hero__title { font-size: min(12vw, 13vh); }
  .hero__lede { margin-top: 2.6vh; font-size: min(1.5vw, 2.3vh, 21px); }
  .hero__ctas { margin-top: 2.6vh; }
  .hero__status { margin-bottom: 2.4vh; }
  .hero__portrait { width: min(100%, 420px, 45vh); }
  /* Lift the ticker clear of the travel road at the bottom of the screen */
  .hero { padding-bottom: 140px; }
  .hero__status { gap: 6px; }
  .hero__marquee { bottom: 74px; padding-bottom: 14px; border-bottom: 3px solid var(--ink); }
}

@media (max-width: 900px) {
  .hero { padding-top: calc(var(--nav-h) + var(--frame) + 28px); padding-bottom: 110px; align-items: flex-start; }
  .hero__grid { grid-template-columns: 1fr; }
  .hero__portrait { width: min(78%, 340px); margin-top: 32px; }
  .hide-sm, .hint { display: none; }
  .bubble { font-size: 22px; left: -16px; }
}
</style>
