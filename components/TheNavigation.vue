<template>
  <div ref="rootRef" class="island" :class="{ 'is-open': open }">
    <div ref="pillRef" class="pill">
      <a href="/" class="pill__logo" data-cursor="home" aria-label="rachycodes — back to top" @click.prevent="go('top')" @mouseenter="spinLogo">
        <span ref="logoRef">r.</span>
      </a>

      <div class="pill__now" aria-live="polite">
        <span class="pill__roll">
          <Transition name="roll" mode="out-in">
            <span :key="current.id" class="pill__label"><span class="pill__emoji">{{ current.emoji }}</span>{{ current.label }}</span>
          </Transition>
        </span>
      </div>

      <button class="pill__theme" :style="{ background: currentSwatch }" data-cursor="theme" :aria-label="`Theme: ${currentLabel}. Switch theme`" @click="cycleFlavour">
        <span class="pill__theme-tip t-mono">{{ currentLabel }}</span>
      </button>

      <a href="/#contact" class="pill__cta t-mono" data-cursor="hi!" @click.prevent="go('contact')">Let's talk</a>

      <button class="pill__menu t-mono" :aria-expanded="open" aria-controls="island-panel" data-cursor="menu" @click="toggle">
        <span class="pill__dots" :class="{ x: open }"><i /><i /></span>
        <span class="pill__menu-txt">{{ open ? 'Close' : 'Menu' }}</span>
      </button>
    </div>

    <Transition :css="false" @enter="panelIn" @leave="panelOut">
      <div v-if="open" id="island-panel" class="panel">
        <nav class="panel__grid" aria-label="Sections">
          <a
            v-for="(s, i) in sections.slice(1)"
            :key="s.id"
            :href="`/#${s.id}`"
            class="sticker-link"
            :style="{ '--c': s.color, '--r': `${i % 2 ? 3 : -3}deg` }"
            :class="{ 'is-here': current.id === s.id }"
            @click.prevent="go(s.id)"
            @mouseenter="thock(1.2 + i * 0.05)"
          >
            <span class="sticker-link__emoji">{{ s.emoji }}</span>
            <span class="sticker-link__label t-display">{{ s.label }}</span>
            <span class="sticker-link__sub">{{ s.sub }}</span>
          </a>
        </nav>

        <div class="panel__foot">
          <div class="panel__flavours" role="group" aria-label="Site theme">
            <span class="t-mono">Theme</span>
            <button
              v-for="f in FLAVOURS"
              :key="f.id"
              class="swatch"
              :class="{ 'is-on': flavour === f.id }"
              :style="{ background: f.swatch }"
              :aria-label="`${f.label} flavour`"
              :aria-pressed="flavour === f.id"
              :data-cursor="f.label"
              @click="pickFlavour(f.id)"
            />
          </div>
          <button class="panel__sound t-mono" :aria-pressed="enabled" @click="toggleSound">
            {{ enabled ? '🔊 Sound on' : '🔇 Sound off' }}
          </button>
          <span class="panel__time t-mono">Lagos · {{ time }}</span>
        </div>
      </div>
    </Transition>
  </div>
</template>

<script setup lang="ts">
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { track } from '@vercel/analytics'
import { useLenis } from '~/composables/useLenis'
import { FLAVOURS, type Flavour } from '~/composables/useFlavour'

const { scrollTo } = useLenis()
const { thock, blip, enabled, toggle: toggleSound } = useSound()
const { flavour, setFlavour } = useFlavour()
const route = useRoute()

const sections = [
  { id: 'top', label: 'Hello', emoji: '👋', sub: '', color: 'var(--paper)' },
  { id: 'work', label: 'Work', emoji: '💼', sub: 'Big systems, small friction', color: 'var(--pop2)' },
  { id: 'side-quest', label: 'Side quest', emoji: '🔍', sub: 'Solve a murder. Seriously.', color: 'var(--pop3)' },
  { id: 'toolkit', label: 'Toolkit', emoji: '⌨️', sub: 'Press any key', color: '#8f7bff' },
  { id: 'about', label: 'About', emoji: '🙋🏾‍♀️', sub: 'The human bit', color: 'var(--pop)' },
  { id: 'notes', label: 'Notes', emoji: '📝', sub: 'Sign the wall', color: 'var(--paper)' },
  { id: 'contact', label: 'Contact', emoji: '☎️', sub: "Let's build something", color: 'var(--pop2)' },
]
const caseStudy = { id: 'case', label: 'Case study', emoji: '📂', sub: '', color: '' }

const open = ref(false)
const currentId = ref('top')
const current = computed(() => (route.path === '/' ? sections.find((s) => s.id === currentId.value) ?? sections[0] : caseStudy))
const time = ref('')

const rootRef = ref<HTMLElement | null>(null)
const pillRef = ref<HTMLElement | null>(null)
const logoRef = ref<HTMLElement | null>(null)
let clock: ReturnType<typeof setInterval> | null = null

function toggle() {
  open.value = !open.value
  blip(open.value ? 620 : 420, 0.08, 'triangle', 0.05)
}

function go(id: string) {
  open.value = false
  if (route.path !== '/') return navigateTo(id === 'top' ? '/' : `/#${id}`)
  if (id === 'top') scrollTo(0, { duration: 1.4 })
  else scrollTo(`#${id}`, { offset: -20, duration: 1.4 })
}

function pickFlavour(id: Flavour) {
  setFlavour(id)
  blip({ midnight: 340, ube: 520, bubblegum: 700, daydream: 880 }[id], 0.12, 'sine', 0.05)
  track('Flavour changed', { flavour: id })
}

const currentFlavour = computed(() => FLAVOURS.find((f) => f.id === flavour.value) ?? FLAVOURS[0])
const currentSwatch = computed(() => currentFlavour.value.swatch)
const currentLabel = computed(() => currentFlavour.value.label)
function cycleFlavour() {
  const i = FLAVOURS.findIndex((f) => f.id === flavour.value)
  pickFlavour(FLAVOURS[(i + 1) % FLAVOURS.length].id)
}

function spinLogo() {
  gsap.fromTo(logoRef.value, { rotate: 0 }, { rotate: 360, duration: 0.7, ease: 'back.out(2)' })
}

function panelIn(el: Element, done: () => void) {
  const tl = gsap.timeline({ onComplete: done })
  tl.fromTo(el, { clipPath: 'inset(0 0 100% 0 round 24px)', y: -10 }, { clipPath: 'inset(0 0 0% 0 round 24px)', y: 0, duration: 0.5, ease: 'expo.out' })
  tl.fromTo(el.querySelectorAll('.sticker-link'), { scale: 0, rotate: -25 }, { scale: 1, rotate: 0, duration: 0.6, stagger: 0.04, ease: 'back.out(2.2)' }, 0.08)
  tl.fromTo(el.querySelector('.panel__foot'), { opacity: 0, y: 10 }, { opacity: 1, y: 0, duration: 0.3 }, 0.25)
}
function panelOut(el: Element, done: () => void) {
  gsap.to(el, { clipPath: 'inset(0 0 100% 0 round 24px)', duration: 0.3, ease: 'power2.in', onComplete: done })
}

function onKey(e: KeyboardEvent) { if (e.key === 'Escape') open.value = false }
function onOutside(e: PointerEvent) {
  if (open.value && rootRef.value && !rootRef.value.contains(e.target as Node)) open.value = false
}

function tick() {
  time.value = new Date().toLocaleTimeString('en-GB', { timeZone: 'Africa/Lagos', hour: '2-digit', minute: '2-digit' })
}

// Whichever section covers the middle of the screen is "current" — works for
// both the vertical (phone) and horizontal (desktop) layouts
let sectionObserver: IntersectionObserver | null = null
function watchSections() {
  sectionObserver?.disconnect()
  if (route.path !== '/') return
  sectionObserver = new IntersectionObserver((entries) => {
    entries.forEach((e) => { if (e.isIntersecting) currentId.value = e.target.id })
  }, { rootMargin: '-49% -49% -49% -49%' })
  sections.forEach((s) => {
    const el = document.getElementById(s.id)
    if (el) sectionObserver!.observe(el)
  })
}

onMounted(() => {
  gsap.registerPlugin(ScrollTrigger)
  tick()
  clock = setInterval(tick, 15_000)
  gsap.from(pillRef.value, { y: -90, scale: 0.6, duration: 1, ease: 'elastic.out(1, 0.6)', delay: 0.2 })
  // Page scroll progress drives the little bar inside the pill
  nextTick(watchSections)
  window.addEventListener('keydown', onKey)
  window.addEventListener('pointerdown', onOutside)
})

onUnmounted(() => {
  sectionObserver?.disconnect()
  if (clock) clearInterval(clock)
  window.removeEventListener('keydown', onKey)
  window.removeEventListener('pointerdown', onOutside)
})
</script>

<style scoped>
.island {
  position: fixed;
  top: 14px; left: 50%;
  transform: translateX(-50%);
  z-index: 80;
  width: max-content;
  max-width: calc(100vw - 24px);
}
.pill {
  display: flex; align-items: center; gap: 6px;
  padding: 6px;
  background: var(--paper); color: var(--ink);
  border: 3px solid var(--ink);
  border-radius: 999px;
  box-shadow: 5px 5px 0 var(--ink);
  font-family: 'Bricolage Grotesque', sans-serif;
}
.pill__logo {
  flex-shrink: 0;
  display: grid; place-items: center;
  width: 42px; height: 42px; border-radius: 50%;
  background: var(--ink); color: var(--pop2);
  font-weight: 800; font-size: 19px; text-decoration: none;
}
.pill__logo span { display: inline-block; }

.pill__now { display: flex; flex-direction: column; justify-content: center; gap: 4px; min-width: 150px; padding: 0 10px 0 6px; }
.pill__roll { display: block; height: 20px; overflow: hidden; }
.pill__label { display: flex; align-items: center; gap: 7px; font-weight: 800; font-size: 16px; line-height: 20px; white-space: nowrap; }
.pill__emoji { font-size: 15px; }
.roll-enter-active, .roll-leave-active { transition: transform 0.35s var(--ease-out), opacity 0.35s; }
.roll-enter-from { transform: translateY(100%); opacity: 0; }
.roll-leave-to { transform: translateY(-100%); opacity: 0; }

.pill__theme {
  position: relative; flex-shrink: 0;
  width: 42px; height: 42px; border-radius: 50%;
  border: 3px solid var(--ink);
  box-shadow: inset 0 0 0 3px var(--paper);
  transition: transform 0.35s var(--ease-bounce);
}
.pill__theme:hover { transform: rotate(180deg) scale(1.08); }
.pill__theme-tip {
  position: absolute; top: calc(100% + 10px); left: 50%; transform: translateX(-50%) rotate(180deg);
  padding: 4px 8px; border-radius: 6px; background: var(--ink); color: var(--paper);
  font-size: 9px; font-weight: 800; white-space: nowrap; opacity: 0; pointer-events: none; transition: opacity 0.2s;
}
.pill__theme:hover .pill__theme-tip { opacity: 1; }
.pill__cta, .pill__menu {
  display: flex; align-items: center; gap: 8px;
  height: 42px; padding: 0 16px;
  border-radius: 999px; border: 2px solid var(--ink);
  font-size: 11px; font-weight: 800;
  text-decoration: none; color: var(--ink);
  transition: transform 0.2s var(--ease-bounce), background-color 0.2s;
}
.pill__cta { background: var(--pop2); }
.pill__menu { background: var(--pop); }
.pill__cta:hover, .pill__menu:hover { transform: rotate(-4deg) scale(1.05); }
.pill__dots { position: relative; width: 14px; height: 14px; }
.pill__dots i { position: absolute; left: 0; width: 14px; height: 3px; border-radius: 2px; background: var(--ink); transition: transform 0.3s var(--ease-out), top 0.3s var(--ease-out); }
.pill__dots i:first-child { top: 3px; }
.pill__dots i:last-child { top: 8px; }
.pill__dots.x i:first-child { top: 5.5px; transform: rotate(45deg); }
.pill__dots.x i:last-child { top: 5.5px; transform: rotate(-45deg); }

.panel {
  margin-top: 10px;
  padding: 16px;
  width: min(600px, calc(100vw - 24px));
  margin-left: 50%; transform: translateX(-50%);
  background: var(--ink); color: var(--paper);
  border: 3px solid var(--ink);
  border-radius: 24px;
  box-shadow: 0 24px 60px rgba(0, 0, 0, 0.45);
}
.panel__grid { display: grid; grid-template-columns: repeat(3, 1fr); gap: 10px; }
.sticker-link {
  display: flex; flex-direction: column; gap: 6px;
  padding: 14px;
  min-height: 116px;
  background: var(--c); color: #0b0818;
  border: 3px solid #000; border-radius: 18px;
  box-shadow: 4px 4px 0 rgba(255, 255, 255, 0.18);
  text-decoration: none;
  rotate: var(--r);
  transition: rotate 0.3s var(--ease-bounce), translate 0.3s var(--ease-bounce);
}
.sticker-link:hover { rotate: 0deg; translate: 0 -4px; }
.sticker-link.is-here { outline: 3px dashed var(--paper); outline-offset: 3px; }
.sticker-link__emoji { font-size: 24px; }
.sticker-link__label { font-size: 30px; margin-top: auto; }
.sticker-link__sub { font-size: 12px; font-weight: 600; opacity: 0.75; }

.panel__foot { display: flex; align-items: center; justify-content: space-between; flex-wrap: wrap; gap: 12px; margin-top: 16px; padding-top: 14px; border-top: 2px dashed rgba(255, 255, 255, 0.2); font-size: 10px; }
.panel__flavours { display: flex; align-items: center; gap: 8px; }
.panel__flavours .t-mono { font-size: 10px; font-weight: 800; opacity: 0.7; }
.swatch { width: 24px; height: 24px; border-radius: 50%; border: 2px solid var(--paper); transition: transform 0.25s var(--ease-bounce); }
.swatch:hover { transform: scale(1.15); }
.swatch.is-on { box-shadow: 0 0 0 3px var(--ink), 0 0 0 5px var(--pop2); }
.panel__sound { padding: 7px 12px; border-radius: 999px; border: 2px solid rgba(255, 255, 255, 0.35); background: transparent; color: var(--paper); font-size: 10px; font-weight: 800; }
.panel__sound[aria-pressed="true"] { background: var(--pop2); color: var(--ink); border-color: var(--pop2); }
.panel__time { font-size: 10px; opacity: 0.6; }

@media (max-width: 640px) {
  .pill__cta { display: none; }
  .pill__now { min-width: 0; flex: 1; }
  .pill__menu-txt { display: none; }
  .pill__menu { width: 42px; padding: 0; justify-content: center; }
  .island { width: calc(100vw - 24px); }
  .panel__grid { grid-template-columns: 1fr 1fr; }
  .sticker-link { min-height: 96px; }
  .sticker-link__label { font-size: 24px; }
}
</style>
