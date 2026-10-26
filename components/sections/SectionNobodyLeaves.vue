<template>
  <section id="side-quest" ref="sectionRef" class="nl">
    <!-- Crime scene tape -->
    <div class="tape tape--a marquee" style="--marquee-speed: 22s" aria-hidden="true">
      <div v-for="n in 2" :key="n" class="marquee__track">
        <span v-for="i in 16" :key="i" class="tape__txt">CRIME SCENE · DO NOT CROSS ·&nbsp;</span>
      </div>
    </div>
    <div class="tape tape--b marquee marquee--reverse" style="--marquee-speed: 28s" aria-hidden="true">
      <div v-for="n in 2" :key="n" class="marquee__track">
        <span v-for="i in 16" :key="i" class="tape__txt">SIDE QUEST · PERSONAL PROJECT ·&nbsp;</span>
      </div>
    </div>

    <div class="nl__inner wrap">
      <header class="nl__head" data-fit>
        <span class="chip chip--yellow">Side quest · Personal project</span>
        <h2 class="nl__title t-display">
          Nobody<br />Leaves<span class="nl__dot">.</span>
        </h2>
        <span class="stamp t-mono" aria-hidden="true">Case files · Confidential</span>
      </header>

      <div class="nl__grid">
        <!-- Evidence board, lit only by your torch -->
        <div
          ref="boardRef"
          class="board"
          data-cursor="torch"
          @pointermove="aim"
          @pointerenter="hovering = true"
          @pointerleave="hovering = false"
        >
          <svg class="board__strings" viewBox="0 0 600 460" preserveAspectRatio="none" aria-hidden="true">
            <path d="M110 120 Q 300 220 300 110" />
            <path d="M300 110 Q 400 260 490 140" />
            <path d="M110 120 Q 230 360 300 360" />
            <path d="M490 140 Q 420 330 300 360" />
          </svg>

          <div v-for="s in suspects" :key="s.name" class="polaroid" :style="{ left: s.x, top: s.y, '--r': s.r }">
            <span class="pin" />
            <div class="polaroid__img">
              <svg viewBox="0 0 100 100" aria-hidden="true"><circle cx="50" cy="38" r="18" /><path d="M14 100 C 14 66, 86 66, 86 100 Z" /></svg>
              <span class="polaroid__q">?</span>
            </div>
            <p class="polaroid__name t-hand">{{ s.name }}</p>
            <p class="polaroid__role t-mono">{{ s.role }}</p>
          </div>

          <div class="note t-hand" style="left: 40%; top: 66%; --r: -5deg">who had the key to the gate?</div>
          <div class="note note--pink t-hand" style="left: 64%; top: 4%; --r: 6deg">somebody is lying.</div>
          <div class="tag t-mono" style="left: 6%; top: 74%; --r: 4deg">Exhibit A</div>
          <div class="tag t-mono" style="left: 80%; top: 76%; --r: -7deg">Exhibit B</div>

          <div class="board__dark" :style="{ '--mx': `${mx}px`, '--my': `${my}px` }" />
          <p class="board__hint t-mono"><span>🔦</span> move your torch to search the scene</p>
        </div>

        <!-- The pitch -->
        <div class="nl__copy" data-fit>
          <p class="nl__lede">
            A free murder mystery you play in the browser. A body, a locked gate, and a room full of suspects
            who all have something to hide. <strong>Search the scene, question everyone, catch the lie, name the
            killer.</strong> The gates stay shut until you do.
          </p>

          <ul class="nl__features">
            <li><span>01</span> Interrogate suspects by typing, tapping a question or sending a voice note</li>
            <li><span>02</span> Show evidence to catch them out — three accusations per case</li>
            <li><span>03</span> Server-checked leaderboard for the fastest detectives</li>
            <li><span>04</span> Set in Nigeria: Oshodi Market, Lagos and a mansion in Maitama, Abuja</li>
          </ul>

          <div class="cases">
            <div class="case"><span class="t-mono">Case 01 · Medium</span><strong class="t-display">The Hollow Corner</strong></div>
            <div class="case"><span class="t-mono">Case 02 · Hard</span><strong class="t-display">The Abuja Mansion</strong></div>
            <div class="case case--sealed"><span class="t-mono">Case 03 · Sealed</span><strong class="t-display">Close your eyes</strong></div>
          </div>

          <div class="nl__ctas">
            <a
              href="https://www.nobodyleaves.site"
              target="_blank"
              rel="noopener"
              class="btn btn--yellow"
              data-cursor="play"
              @click="track('Nobody Leaves opened', { from: 'portfolio' })"
            >Open the case file <span aria-hidden="true">↗</span></a>
            <span class="nl__free t-mono">Free · No download · Works on phones</span>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { H_QUERY } from '~/composables/useHorizontal'
import { onVisible } from '~/composables/useReveal'
import { track } from '@vercel/analytics'

const suspects = [
  { name: 'Mummy Chima', role: 'Food seller, 52', x: '8%', y: '10%', r: '-6deg' },
  { name: 'Kelvin', role: 'POS operator, 25', x: '40%', y: '6%', r: '4deg' },
  { name: 'Nike', role: 'Errand girl, 20', x: '70%', y: '22%', r: '-3deg' },
]

const sectionRef = ref<HTMLElement | null>(null)
const boardRef = ref<HTMLElement | null>(null)
const mx = ref(160)
const my = ref(160)
const hovering = ref(false)
let wander: gsap.core.Tween | null = null
let triggers: ScrollTrigger[] = []
const cleanups: (() => void)[] = []

function aim(e: PointerEvent) {
  const r = boardRef.value!.getBoundingClientRect()
  wander?.pause()
  mx.value = e.clientX - r.left
  my.value = e.clientY - r.top
}

// When nobody's holding the torch, it drifts around the board on its own
function startWander() {
  const b = boardRef.value
  if (!b) return
  const pos = { x: mx.value, y: my.value }
  wander = gsap.to(pos, {
    x: () => gsap.utils.random(60, b.clientWidth - 60),
    y: () => gsap.utils.random(60, b.clientHeight - 60),
    duration: 2.4,
    ease: 'sine.inOut',
    repeat: -1,
    repeatRefresh: true,
    onUpdate: () => { mx.value = pos.x; my.value = pos.y },
  })
}

watch(hovering, (h) => {
  if (h) return
  wander?.kill()
  startWander()
})

onMounted(() => {
  gsap.registerPlugin(ScrollTrigger)
  startWander()
  cleanups.push(onVisible(sectionRef.value?.querySelector('.nl__title'), () => {
    gsap.fromTo('.nl .stamp', { scale: 3, opacity: 0, rotate: -30 }, { scale: 1, opacity: 1, rotate: -12, duration: 0.5, ease: 'power4.in', delay: 0.4 })
  }, 0.4))
  cleanups.push(onVisible(boardRef.value, () => {
    gsap.fromTo('.nl .polaroid', { y: -80, opacity: 0 }, { y: 0, opacity: 1, duration: 0.8, stagger: 0.12, ease: 'bounce.out', delay: 0.2 })
  }, 0.3))
  // Tapes swing as you scroll past — vertical layout only
  if (!window.matchMedia(H_QUERY).matches) triggers.push(ScrollTrigger.create({
    trigger: sectionRef.value,
    start: 'top bottom',
    end: 'bottom top',
    scrub: true,
    animation: gsap.timeline()
      .fromTo('.nl .tape--a', { rotate: -2 }, { rotate: -6, ease: 'none' }, 0)
      .fromTo('.nl .tape--b', { rotate: 3 }, { rotate: 7, ease: 'none' }, 0),
  }))
})

onUnmounted(() => {
  wander?.kill()
  triggers.forEach((t) => t.kill())
  cleanups.forEach((c) => c())
})
</script>

<style scoped>
.nl {
  --nl-bg: #0d0b10;
  --tape: #ffd23f;
  position: relative;
  background: var(--nl-bg);
  color: #f3ead8;
  border-top: 3px solid var(--ink);
  padding: clamp(150px, 16vw, 220px) clamp(20px, 5vw, 72px) clamp(100px, 12vw, 160px);
  overflow: hidden;
  background-image:
    linear-gradient(rgba(255, 255, 255, 0.035) 1px, transparent 1px),
    linear-gradient(90deg, rgba(255, 255, 255, 0.035) 1px, transparent 1px);
  background-size: 44px 44px;
}

.tape { position: absolute; left: -5%; right: -5%; background: var(--tape); color: #0d0b10; border-block: 3px solid #0d0b10; padding: 10px 0; z-index: 2; }
.tape--a { top: 40px; transform: rotate(-3deg); }
.tape--b { top: 84px; transform: rotate(3deg); background: #f3ead8; }
.tape__txt { font-family: 'Unbounded', monospace; font-weight: 800; font-size: 15px; letter-spacing: 0.12em; }

.nl__head { position: relative; }
.chip--yellow { background: var(--tape); }
.nl__title { font-size: clamp(80px, 14vw, 240px); color: #f3ead8; margin-top: 24px; }
.nl__dot { color: #e5383b; }
.stamp {
  position: absolute; right: 2%; top: 40%;
  padding: 10px 18px;
  border: 4px solid #e5383b; border-radius: 6px;
  color: #e5383b; font-size: clamp(12px, 1.3vw, 18px); font-weight: 800;
  transform: rotate(-12deg);
  mix-blend-mode: screen;
  opacity: 0;
}

.nl__grid { display: grid; grid-template-columns: 1.15fr 1fr; gap: clamp(32px, 5vw, 80px); margin-top: clamp(40px, 6vw, 72px); align-items: start; }

/* ── Evidence board ── */
.board {
  position: relative;
  aspect-ratio: 6 / 4.6;
  border: 3px solid #f3ead8;
  border-radius: 20px;
  overflow: hidden;
  background: #3a2a1d;
  background-image:
    radial-gradient(rgba(0, 0, 0, 0.25) 1px, transparent 1.4px),
    radial-gradient(rgba(255, 255, 255, 0.06) 1px, transparent 1.4px);
  background-size: 7px 7px, 11px 11px;
  touch-action: pan-y;
}
.board__strings { position: absolute; inset: 0; width: 100%; height: 100%; }
.board__strings path { fill: none; stroke: #e5383b; stroke-width: 2.5; }

.polaroid {
  position: absolute; width: 22%;
  padding: 7px 7px 10px;
  background: #f3ead8; color: #0d0b10;
  box-shadow: 0 10px 20px rgba(0, 0, 0, 0.45);
  rotate: var(--r);
}
.polaroid__img { position: relative; aspect-ratio: 1; background: #2b2531; overflow: hidden; }
.polaroid__img svg { position: absolute; inset: 12% 0 0; width: 100%; height: 88%; fill: #0d0b10; }
.polaroid__q { position: absolute; inset: 0; display: grid; place-items: center; font-weight: 800; font-size: clamp(22px, 3vw, 40px); color: var(--tape); }
.polaroid__name { font-size: clamp(16px, 1.6vw, 24px); line-height: 1; margin-top: 6px; }
.polaroid__role { font-size: clamp(7px, 0.65vw, 9px); opacity: 0.7; margin-top: 2px; }
.pin { position: absolute; top: -7px; left: 50%; width: 14px; height: 14px; margin-left: -7px; border-radius: 50%; background: #e5383b; box-shadow: inset -2px -2px 0 rgba(0, 0, 0, 0.3), 0 3px 4px rgba(0, 0, 0, 0.4); z-index: 1; }

.note { position: absolute; padding: 12px 14px; width: 28%; background: var(--tape); color: #0d0b10; font-size: clamp(14px, 1.5vw, 22px); line-height: 1.05; rotate: var(--r); box-shadow: 0 8px 14px rgba(0, 0, 0, 0.4); }
.note--pink { background: #ff8fcb; width: 26%; }
.tag { position: absolute; padding: 6px 10px; background: #f3ead8; color: #0d0b10; font-size: 10px; font-weight: 800; border-radius: 4px; rotate: var(--r); border-left: 8px solid #e5383b; }

.board__dark {
  position: absolute; inset: 0; pointer-events: none;
  background: radial-gradient(circle at var(--mx) var(--my), rgba(5, 4, 10, 0) 0, rgba(5, 4, 10, 0) 90px, rgba(5, 4, 10, 0.75) 150px, rgba(5, 4, 10, 0.96) 230px);
}
.board__hint { position: absolute; left: 16px; bottom: 14px; font-size: 10px; color: rgba(243, 234, 216, 0.75); pointer-events: none; }

/* ── Copy ── */
.nl__lede { font-size: clamp(18px, 1.6vw, 23px); line-height: 1.5; }
.nl__lede strong { color: var(--tape); font-weight: 700; }
.nl__features { list-style: none; padding: 0; margin: 28px 0 0; display: grid; gap: 2px; }
.nl__features li { display: flex; gap: 16px; padding: 14px 0; border-bottom: 1px dashed rgba(243, 234, 216, 0.25); font-size: 15px; line-height: 1.45; }
.nl__features span { font-family: 'Unbounded', monospace; font-size: 11px; font-weight: 800; color: #e5383b; padding-top: 3px; }

.cases { display: grid; grid-template-columns: repeat(3, 1fr); gap: 10px; margin-top: 28px; }
.case { display: flex; flex-direction: column; gap: 8px; padding: 14px; border: 2px solid rgba(243, 234, 216, 0.6); border-radius: 12px; }
.case .t-mono { font-size: 9px; color: var(--tape); }
.case strong { font-size: clamp(20px, 1.9vw, 28px); line-height: 0.9; }
.case--sealed { border-style: dashed; opacity: 0.55; }

.nl__ctas { display: flex; flex-wrap: wrap; align-items: center; gap: 18px; margin-top: 32px; }
.btn--yellow { background: var(--tape); --ink: #0d0b10; box-shadow: 5px 5px 0 #f3ead8; border-color: #f3ead8; }
.btn--yellow:hover { box-shadow: 7px 7px 0 #f3ead8; }
.nl__free { font-size: 10px; opacity: 0.6; }

@media (min-width: 900px) and (min-height: 560px) {
  .nl { width: max-content; padding: 226px 6vw 104px 5vw; }
  /* Across a panel this wide even a small tilt climbs a long way, so keep the
     tape nearly flat and below the floating nav pill */
  .tape--a { top: 108px; transform: rotate(-0.35deg); }
  .tape--b { top: 158px; transform: rotate(0.35deg); }
  .nl__inner { height: 100%; display: flex; align-items: center; gap: 5vw; }
  .nl__head { width: 34vw; flex-shrink: 0; }
  .nl__title { font-size: min(12vw, 21vh); margin-top: 2vh; }
  .stamp { top: auto; bottom: -50px; right: 0; }
  .nl__grid { display: flex; align-items: center; gap: 4vw; margin-top: 0; }
  .board { height: calc(100vh - 370px); width: auto; flex-shrink: 0; }
  .nl__copy { width: 46vw; flex-shrink: 0; }
  .nl__lede { font-size: min(1.4vw, 2.4vh); }
  .nl__features { margin-top: 1.6vh; grid-template-columns: 1fr 1fr; column-gap: 2vw; }
  .nl__features li { padding: 0.9vh 0; font-size: min(14px, 2vh); }
  .case { padding: 1.2vh 12px; }
  .cases { margin-top: 2vh; }
  .nl__ctas { margin-top: 2.2vh; }
}

@media (max-width: 900px) {
  .nl__grid { grid-template-columns: 1fr; }
  .stamp { top: auto; bottom: -12px; right: 0; }
  .cases { grid-template-columns: 1fr; }
}
</style>
