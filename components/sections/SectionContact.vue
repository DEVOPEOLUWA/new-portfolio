<template>
  <section id="contact" ref="sectionRef" class="ct">
    <div class="ct__inner wrap" data-fit>
      <p class="ct__kicker t-mono">Have a project in mind, or just want to talk engineering?</p>
      <h2 class="ct__title t-display" aria-label="Let's talk">
        <span class="ct__row"><span v-for="(c, i) in 'LET’S'" :key="`a${i}`" class="ct__ch">{{ c }}</span></span>
        <span class="ct__row ct__row--2">
          <span v-for="(c, i) in 'TALK'" :key="`b${i}`" class="ct__ch">{{ c }}</span>
          <span class="ct__smile" aria-hidden="true">☺</span>
        </span>
      </h2>

      <div class="ct__actions">
        <button
          ref="magnetRef"
          class="ct__email"
          data-cursor="copy"
          @pointermove="magnet"
          @pointerleave="release"
          @click="copy"
        >
          <span class="ct__email-label t-mono">{{ copied ? 'Copied to clipboard ✓' : 'Click to copy' }}</span>
          <span class="ct__email-addr">{{ EMAIL }}</span>
        </button>

        <ul class="ct__links">
          <li v-for="l in links" :key="l.label">
            <a :href="l.href" target="_blank" rel="noopener" class="ct__link" :data-cursor="l.cursor" @click="track('Contact link', { to: l.label })">
              <span class="t-display">{{ l.label }}</span>
              <span class="ct__arrow" aria-hidden="true">↗</span>
            </a>
          </li>
        </ul>
      </div>
    </div>

    <footer class="foot">
      <span class="t-mono">© {{ year }} Opeoluwa Ayodeji · rachycodes</span>
      <span class="t-mono">Lagos · {{ time }} WAT</span>
      <span class="foot__right">
        <button class="foot__btn t-mono" @click="emit('replay')">↺ Replay intro</button>
        <button class="foot__btn t-mono" @click="scrollTo(0, { duration: 2 })">Back to top ↑</button>
      </span>
    </footer>
  </section>
</template>

<script setup lang="ts">
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { track } from '@vercel/analytics'
import { useLenis } from '~/composables/useLenis'
import { onVisible } from '~/composables/useReveal'

const emit = defineEmits<{ replay: [] }>()
const { scrollTo } = useLenis()
const { blip } = useSound()

const EMAIL = 'ayodejiope13@gmail.com'
const links = [
  { label: 'LinkedIn', href: 'https://www.linkedin.com/in/ayodeji-opeoluwa/', cursor: 'connect' },
  { label: 'GitHub', href: 'https://github.com/DEVOPEOLUWA/', cursor: 'code' },
  { label: 'Résumé', href: '/Opeoluwa_Ayodeji_Frontend_Engineer_Resume.pdf', cursor: 'cv' },
]

const sectionRef = ref<HTMLElement | null>(null)
const magnetRef = ref<HTMLElement | null>(null)
const copied = ref(false)
const time = ref('')
const year = new Date().getFullYear()
let clock: ReturnType<typeof setInterval> | null = null
let stopReveal: (() => void) | null = null

function magnet(e: PointerEvent) {
  if (e.pointerType !== 'mouse') return
  const r = magnetRef.value!.getBoundingClientRect()
  gsap.to(magnetRef.value, { x: (e.clientX - r.left - r.width / 2) * 0.25, y: (e.clientY - r.top - r.height / 2) * 0.35, rotate: (e.clientX - r.left - r.width / 2) * 0.02, duration: 0.5, ease: 'power3.out' })
}
function release() {
  gsap.to(magnetRef.value, { x: 0, y: 0, rotate: 0, duration: 0.9, ease: 'elastic.out(1, 0.4)' })
}

async function copy() {
  try {
    await navigator.clipboard.writeText(EMAIL)
    copied.value = true
    blip(990, 0.1, 'sine', 0.05)
    track('Email copied')
    setTimeout(() => (copied.value = false), 2200)
  } catch {
    window.location.href = `mailto:${EMAIL}`
  }
}

function tick() {
  time.value = new Date().toLocaleTimeString('en-GB', { timeZone: 'Africa/Lagos', hour: '2-digit', minute: '2-digit', second: '2-digit' })
}

onMounted(() => {
  gsap.registerPlugin(ScrollTrigger)
  tick()
  clock = setInterval(tick, 1000)
  stopReveal = onVisible(sectionRef.value?.querySelector('.ct__title'), () => {
    gsap.fromTo('.ct__ch', { yPercent: 120, rotate: () => gsap.utils.random(-25, 25) }, { yPercent: 0, rotate: 0, duration: 1, ease: 'back.out(1.6)', stagger: 0.05 })
    gsap.fromTo('.ct__smile', { scale: 0, rotate: -180 }, { scale: 1, rotate: 0, duration: 1, ease: 'elastic.out(1, 0.5)', delay: 0.5 })
  }, 0.3)
})

onUnmounted(() => {
  if (clock) clearInterval(clock)
  stopReveal?.()
})
</script>

<style scoped>
.ct {
  position: relative;
  background: var(--pop2);
  color: var(--ink);
  border-top: 3px solid var(--ink);
  padding: clamp(90px, 12vw, 160px) clamp(20px, 5vw, 72px) 0;
  min-height: 100svh;
  display: flex; flex-direction: column;
}
.ct__inner { flex: 1; width: 100%; }
.ct__kicker { font-size: 12px; font-weight: 800; }
.ct__title { font-size: clamp(110px, 24vw, 420px); line-height: 0.8; margin-top: 18px; }
.ct__row { display: flex; overflow: hidden; padding-top: 0.04em; }
.ct__row--2 { align-items: center; gap: 0.06em; }
.ct__ch { display: inline-block; }
.ct__smile { display: inline-grid; place-items: center; width: 0.7em; height: 0.7em; border-radius: 50%; background: var(--pop); border: 0.03em solid var(--ink); font-size: 0.55em; line-height: 1; margin-left: 0.1em; }

.ct__actions { display: grid; grid-template-columns: 1.1fr 1fr; gap: 32px; align-items: end; margin-top: clamp(40px, 6vw, 72px); }
.ct__email {
  display: flex; flex-direction: column; align-items: flex-start; gap: 10px;
  padding: clamp(22px, 3vw, 34px) clamp(24px, 3vw, 40px);
  background: var(--ink); color: var(--paper);
  border: 3px solid var(--ink); border-radius: 999px;
  box-shadow: 8px 8px 0 var(--pop);
  text-align: left;
  max-width: 100%;
}
.ct__email-label { font-size: 10px; color: var(--pop2); }
.ct__email-addr { font-weight: 800; font-size: clamp(20px, 2.6vw, 40px); letter-spacing: -0.02em; word-break: break-all; }

.ct__links { list-style: none; padding: 0; margin: 0; border-top: 3px solid var(--ink); }
.ct__link { display: flex; justify-content: space-between; align-items: center; padding: 14px 4px; border-bottom: 3px solid var(--ink); color: var(--ink); text-decoration: none; transition: padding 0.35s var(--ease-out), background-color 0.35s; }
.ct__link .t-display { font-size: clamp(36px, 4vw, 60px); }
.ct__arrow { font-size: 34px; font-weight: 800; transition: transform 0.35s var(--ease-out); }
.ct__link:hover { padding-left: 18px; background: var(--paper); }
.ct__link:hover .ct__arrow { transform: rotate(45deg); }

.foot {
  display: flex; justify-content: space-between; align-items: center; flex-wrap: wrap; gap: 12px;
  margin: clamp(56px, 8vw, 100px) calc(-1 * clamp(20px, 5vw, 72px)) 0;
  padding: 22px clamp(20px, 5vw, 72px) calc(22px + var(--frame) + 40px);
  border-top: 3px solid var(--ink);
  font-size: 11px;
}
.foot .t-mono { font-size: 11px; font-weight: 800; }
.foot__right { display: flex; gap: 10px; }
.foot__btn { background: var(--paper); border: 2px solid var(--ink); border-radius: 999px; padding: 8px 14px; color: var(--ink); }
.foot__btn:hover { background: var(--ink); color: var(--paper); }

@media (min-width: 900px) and (min-height: 560px) {
  .ct { width: 100vw; padding-top: calc(var(--nav-h) + 30px); }
  /* Title on the left, ways to reach me on the right */
  .ct__inner { display: grid; grid-template-columns: auto 1fr; grid-template-rows: auto 1fr; column-gap: 5vw; align-items: end; }
  .ct__kicker { grid-column: 1 / -1; }
  .ct__title { font-size: min(17vw, 33vh); margin-top: 1vh; }
  .ct__actions { grid-template-columns: 1fr; gap: 3vh; margin-top: 0; padding-bottom: 2vh; }
  .ct__link .t-display { font-size: min(4vw, 6vh); }
  .ct__link { padding: 1vh 4px; }
  .foot { margin-top: 2vh; padding-top: 16px; padding-bottom: 80px; }
}

@media (max-width: 900px) {
  .ct__actions { grid-template-columns: 1fr; }
  .ct__email { border-radius: 28px; width: 100%; }
}
</style>
