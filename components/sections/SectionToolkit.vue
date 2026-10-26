<template>
  <section id="toolkit" ref="sectionRef" class="tk section-pad">
    <div class="wrap tk__wrap">
      <header class="tk__head">
        <span class="chip">The toolkit</span>
        <h2 class="tk__title t-display">Press<br />any <em class="t-serif">key.</em></h2>
        <p class="tk__sub">
          Everything I reach for, as a keyboard. Frontend is home; the backend keys are new and still a little shiny. Click them — or use your real keyboard, I'm listening.
        </p>
      </header>

      <div class="kb" role="group" aria-label="Skills keyboard">
        <div class="kb__screen" aria-live="polite">
          <span class="kb__screen-label t-mono">{{ active ? active.label : 'rachy.os' }}</span>
          <p class="kb__screen-text">{{ shown }}<span class="kb__caret" /></p>
        </div>

        <div class="kb__keys">
          <button
            v-for="(k, i) in keys"
            :key="k.label"
            :ref="(el) => { if (el) keyRefs[i] = el as HTMLElement }"
            class="k"
            :class="[k.size, { 'is-on': active?.label === k.label }]"
            :style="{ '--c': k.color }"
            data-cursor="press"
            @click="press(i)"
          >
            <span class="k__top">
              <span class="k__label">{{ k.label }}</span>
              <span v-if="k.learning" class="k__learning t-mono">learning</span>
              <span class="k__hint t-mono">{{ k.hotkey }}</span>
            </span>
          </button>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import { gsap } from 'gsap'
import { useLenis } from '~/composables/useLenis'

const { thock } = useSound()
const { scrollTo } = useLenis()

interface Key { label: string; hotkey: string; blurb: string; color: string; size?: string; learning?: boolean; action?: () => void }

const keys: Key[] = [
  { label: 'Angular', hotkey: 'A', color: 'var(--pop)', blurb: 'My daily driver. NDIC and NCC are both Angular — guards, resolvers, dynamic forms, the works.' },
  { label: 'Vue', hotkey: 'V', color: 'var(--pop2)', blurb: "NSIA's entire client side — and this very site, built on Nuxt." },
  { label: 'React', hotkey: 'R', color: 'var(--paper)', blurb: 'Comfortable here too. Hooks, context, and knowing when not to install another library.' },
  { label: 'TypeScript', hotkey: 'T', color: 'var(--pop3)', size: 'w2', blurb: 'Everything I ship is typed. Future-me says thank you.' },
  { label: 'Motion', hotkey: 'M', color: '#8f7bff', blurb: 'GSAP and CSS animation — the difference between an interface that works and one that feels alive.' },
  { label: 'Realtime', hotkey: 'W', color: 'var(--pop)', size: 'w2', blurb: 'WebSockets and SSE — live notifications and task tracking, with polling fallbacks for the browsers that misbehave.' },
  { label: 'Auth', hotkey: 'O', color: 'var(--paper)', blurb: 'Role-based routing and action-level permission guards — so every user sees exactly what they should.' },
  { label: 'CI/CD', hotkey: 'C', color: 'var(--pop2)', blurb: 'Built the pipeline that cut NSIA deployment time by 70%.' },
  { label: 'APIs', hotkey: 'I', color: 'var(--pop3)', blurb: 'REST and GraphQL from the consuming side for years — now learning to build them too.' },
  { label: 'Node.js', hotkey: 'N', color: 'var(--paper)', learning: true, blurb: 'Currently learning. Small services, lots of console.log, growing confidence.' },
  { label: 'Java', hotkey: 'J', color: '#8f7bff', learning: true, blurb: 'Currently learning. Strongly typed, slightly dramatic — we are getting along.' },
  { label: 'Spring Boot', hotkey: 'B', color: 'var(--pop)', size: 'w2', learning: true, blurb: 'Currently learning. Understanding the other side of the API makes me a better frontend engineer.' },
  { label: 'Hire me', hotkey: 'space', color: 'var(--pop2)', size: 'space', blurb: "Good choice. Taking you to my inbox…", action: () => setTimeout(() => scrollTo('#contact', { offset: -70 }), 900) },
]

const keyRefs = ref<HTMLElement[]>([])
const active = ref<Key | null>(null)
const shown = ref('Hi! Press a key to hear what I do with it.')
let typer: gsap.core.Tween | null = null

function press(i: number) {
  const k = keys[i]
  const el = keyRefs.value[i]
  active.value = k
  thock(0.8 + (i % 5) * 0.08)
  if (el) gsap.fromTo(el, { y: 0 }, { y: 6, duration: 0.07, yoyo: true, repeat: 1, ease: 'power2.in' })

  typer?.kill()
  const t = { n: 0 }
  typer = gsap.to(t, {
    n: k.blurb.length,
    duration: Math.min(1.2, k.blurb.length * 0.018),
    ease: 'none',
    onUpdate: () => (shown.value = k.blurb.slice(0, Math.round(t.n))),
  })
  k.action?.()
}

function onKeydown(e: KeyboardEvent) {
  const target = e.target as HTMLElement
  if (e.metaKey || e.ctrlKey || e.altKey || target.closest('input, textarea, [contenteditable]')) return
  // Only react while the keyboard is on screen
  const r = sectionRef.value?.getBoundingClientRect()
  if (!r || r.bottom < 0 || r.top > window.innerHeight) return
  const key = e.key === ' ' ? 'space' : e.key.toUpperCase()
  const i = keys.findIndex((k) => k.hotkey.toUpperCase() === key.toUpperCase())
  if (i === -1) return
  e.preventDefault()
  press(i)
}

const sectionRef = ref<HTMLElement | null>(null)
onMounted(() => window.addEventListener('keydown', onKeydown))
onUnmounted(() => { window.removeEventListener('keydown', onKeydown); typer?.kill() })
</script>

<style scoped>
.tk { background: var(--bg); border-top: 3px solid var(--ink); }
.tk__wrap { display: grid; grid-template-columns: 0.8fr 1.2fr; gap: clamp(32px, 5vw, 80px); align-items: center; }
.tk__title { font-size: clamp(64px, 9vw, 150px); color: var(--on-bg); margin-top: 24px; }
.tk__title em { color: var(--hi); }
.tk__sub { margin-top: 22px; max-width: 380px; font-size: 18px; line-height: 1.5; color: var(--on-bg); }

.kb {
  background: var(--ink);
  border: 3px solid var(--ink);
  border-radius: 28px;
  padding: clamp(14px, 2vw, 24px);
  box-shadow: 12px 12px 0 color-mix(in srgb, var(--ink) 40%, transparent);
  transform: rotate(1.2deg);
}
.kb__screen {
  background: #b8d98c;
  background-image: repeating-linear-gradient(0deg, rgba(0, 0, 0, 0.05) 0 1px, transparent 1px 3px);
  color: #1c2a12;
  border: 3px solid #000;
  border-radius: 14px;
  padding: 14px 18px;
  min-height: 108px;
  margin-bottom: 18px;
  box-shadow: inset 0 0 18px rgba(0, 0, 0, 0.25);
}
.kb__screen-label { font-size: 10px; font-weight: 800; opacity: 0.6; }
.kb__screen-text { font-family: 'JetBrains Mono', monospace; font-size: clamp(13px, 1.15vw, 16px); line-height: 1.5; margin-top: 6px; }
.kb__caret { display: inline-block; width: 0.55em; height: 1em; margin-left: 2px; vertical-align: -2px; background: #1c2a12; animation: blink 0.9s steps(1) infinite; }
@keyframes blink { 50% { opacity: 0; } }

.kb__keys { display: grid; grid-template-columns: repeat(5, 1fr); gap: 10px; }
.k {
  position: relative;
  height: clamp(66px, 6.4vw, 92px);
  border-radius: 14px;
  background: color-mix(in srgb, var(--c) 62%, #000);
  border: 3px solid #000;
  box-shadow: 0 6px 0 #000;
  padding: 0;
  text-align: left;
}
.k.w2 { grid-column: span 2; }
.k.space { grid-column: span 5; height: 58px; }
.k__top {
  position: absolute; inset: 4px 6px 12px;
  border-radius: 10px;
  background: var(--c); color: var(--ink);
  display: flex; flex-direction: column; justify-content: space-between;
  padding: 8px 10px;
  transition: filter 0.2s;
}
.k:hover .k__top { filter: brightness(1.08); }
.k.is-on .k__top { outline: 3px solid #fff; outline-offset: -6px; }
.k__label { font-weight: 800; font-size: clamp(13px, 1.15vw, 17px); line-height: 1; }
.k__hint { font-size: 9px; opacity: 0.55; align-self: flex-end; }
.k__learning { position: absolute; top: -12px; right: -6px; padding: 2px 6px; border-radius: 6px; background: var(--ink); color: var(--pop2); font-size: 8px; font-weight: 800; transform: rotate(6deg); }
.k.space .k__top { flex-direction: row; align-items: center; justify-content: center; gap: 12px; }

@media (max-width: 900px) {
  .tk__wrap { grid-template-columns: 1fr; }
  .kb { transform: none; }
  .kb__keys { grid-template-columns: repeat(3, 1fr); }
  .k.w2 { grid-column: span 1; }
  .k.space { grid-column: span 3; }
  .k__hint { display: none; }
}
</style>
