<template>
  <section id="hello" ref="sectionRef" class="welcome section-pad">
    <div class="wrap">
      <div class="welcome__hello" data-fit>
      <p class="welcome__kicker t-mono">
        <template v-if="place">Looks like you're visiting from {{ place }} — so let me welcome you properly:</template>
        <template v-else>I don't know where in the world you're reading this from, so I'm covering my bases:</template>
      </p>

      <div class="greet" @pointerenter="pause" @pointerleave="resume">
        <h2
          ref="wordRef"
          class="greet__word t-display"
          :dir="current.rtl ? 'rtl' : 'ltr'"
          :lang="current.code"
          aria-live="polite"
        >
          <span v-for="(ch, i) in chars" :key="`${index}-${i}`" class="greet__ch" :class="{ sp: ch === ' ' }">{{ ch }}</span>
        </h2>
        <div class="greet__meta">
          <span class="chip">{{ current.lang }}</span>
          <p class="greet__joke t-hand">{{ current.joke }}</p>
        </div>
      </div>

      <p v-if="place" class="welcome__also t-hand">…and since I'd love to greet you in other languages too:</p>
      <div class="passport" role="group" aria-label="Pick a language">
        <button
          v-for="(g, i) in greetings"
          :key="g.code"
          class="passport__stamp t-mono"
          :class="{ 'is-on': i === index, 'is-yours': i === detected }"
          data-cursor="say it"
          @click="jump(i)"
        >
          {{ g.lang }}<span v-if="i === detected" class="passport__you">you?</span>
        </button>
      </div>
      <p class="welcome__detect t-mono">{{ detectNote }} · greetings attempted: {{ attempts }}</p>
      </div>

      <div class="welcome__body" data-fit>
        <p class="welcome__lede">
          Anyway — you've found my corner of the internet. I'm <strong>Opeoluwa Ayodeji</strong>,
          <em class="t-serif">rachycodes</em> online, a software developer in Lagos who cares a lot about how software
          <em class="t-serif">feels</em>. I take messy, high-stakes enterprise problems and turn them into interfaces
          people actually enjoy using. Frontend is home, and these days I work across the full stack too.
          Also — almost everything on this page does something when you poke it.
        </p>

        <ul class="stats">
          <li v-for="s in stats" :key="s.label" class="stat card">
            <span class="stat__value t-display">{{ s.value }}</span>
            <span class="stat__label t-mono">{{ s.label }}</span>
          </li>
        </ul>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import { gsap } from 'gsap'
import { onVisible, watchVisible } from '~/composables/useReveal'

const { blip } = useSound()

interface Greeting { word: string; lang: string; code: string; joke: string; rtl?: boolean }

const greetings: Greeting[] = [
  { word: 'Hello!', lang: 'English', code: 'en', joke: 'The classic. Works in most airports.' },
  { word: 'Ẹ káàbọ̀!', lang: 'Yorùbá', code: 'yo', joke: 'Welcome! Pull up a chair, the jollof is almost ready.' },
  { word: 'Sannu!', lang: 'Hausa', code: 'ha', joke: "Hello! (And “Nagode” means thank you — I'll say it when you hire me.)" },
  { word: 'Nnọọ!', lang: 'Igbo', code: 'ig', joke: 'Welcome. Yes, the little dots matter.' },
  { word: 'How far?', lang: 'Pidgin', code: 'pcm', joke: 'The correct answer is always “I dey”.' },
  { word: '¡Hola!', lang: 'Spanish', code: 'es', joke: 'Duolingo owl, are you proud of me now?' },
  { word: 'Bonjour!', lang: 'French', code: 'fr', joke: 'Said with a tiny croissant in hand.' },
  { word: '안녕하세요!', lang: 'Korean', code: 'ko', joke: 'Learned from variety shows. Accuracy: emotionally 100%.' },
  { word: 'こんにちは!', lang: 'Japanese', code: 'ja', joke: 'Bowing slightly through your screen right now.' },
  { word: '你好!', lang: 'Mandarin', code: 'zh', joke: 'Nǐ hǎo. Tones sold separately.' },
  { word: 'Jambo!', lang: 'Swahili', code: 'sw', joke: 'Hakuna matata — we only just met.' },
  { word: 'Olá!', lang: 'Portuguese', code: 'pt', joke: 'Same energy as hola, different passport.' },
  { word: 'مرحبا!', lang: 'Arabic', code: 'ar', joke: 'Marhaba. Right-to-left handled, I promise.', rtl: true },
  { word: 'नमस्ते!', lang: 'Hindi', code: 'hi', joke: 'Namaste, with full respect.' },
  { word: 'Ciao!', lang: 'Italian', code: 'it', joke: 'Means hello AND goodbye. Very efficient language.' },
  { word: 'Hallo!', lang: 'German', code: 'de', joke: 'One letter off English. Engineered for efficiency.' },
]

const stats = [
  { value: '5+', label: 'Years shipping' },
  { value: '20M+', label: 'Records handled' },
  { value: '3+', label: 'National platforms' },
  { value: '1', label: 'Murder mystery shipped' },
]

// Nigeria gets a greeting per state (ISO 3166-2:NG); anywhere else not listed is Pidgin.
const NG_STATES: Record<string, string> = {
  LA: 'yo', OG: 'yo', OY: 'yo', OS: 'yo', ON: 'yo', EK: 'yo', KW: 'yo',
  AN: 'ig', EN: 'ig', IM: 'ig', AB: 'ig', EB: 'ig',
  KN: 'ha', KD: 'ha', KT: 'ha', SO: 'ha', ZA: 'ha', KE: 'ha', JI: 'ha', BA: 'ha', GO: 'ha', YO: 'ha', BO: 'ha', NI: 'ha',
}
const COUNTRY_LANGS: Record<string, string[]> = {
  es: ['ES', 'MX', 'AR', 'CO', 'CL', 'PE', 'VE', 'EC', 'GT', 'CU', 'BO', 'DO', 'HN', 'PY', 'SV', 'NI', 'CR', 'PA', 'UY', 'PR', 'GQ'],
  fr: ['FR', 'BE', 'LU', 'MC', 'SN', 'CI', 'ML', 'BF', 'NE', 'TG', 'BJ', 'GN', 'CM', 'GA', 'CG', 'CD', 'MG', 'HT', 'TD', 'CF'],
  pt: ['PT', 'BR', 'AO', 'MZ', 'CV', 'GW', 'ST', 'TL'],
  de: ['DE', 'AT', 'CH', 'LI'],
  it: ['IT', 'SM', 'VA'],
  ko: ['KR'],
  ja: ['JP'],
  zh: ['CN', 'TW', 'HK', 'MO'],
  sw: ['KE', 'TZ', 'UG'],
  ar: ['SA', 'AE', 'EG', 'MA', 'DZ', 'TN', 'LY', 'JO', 'LB', 'SY', 'IQ', 'KW', 'QA', 'BH', 'OM', 'YE', 'PS', 'SD', 'MR'],
  hi: ['IN'],
}

function langForPlace(country: string, region: string | null): string {
  if (country === 'NG') return NG_STATES[region ?? ''] ?? 'pcm'
  return Object.keys(COUNTRY_LANGS).find((code) => COUNTRY_LANGS[code].includes(country)) ?? 'en'
}

const sectionRef = ref<HTMLElement | null>(null)
const wordRef = ref<HTMLElement | null>(null)
const index = ref(0)
const detected = ref(-1)
const attempts = ref(1)
const place = ref('')
const detectNote = ref('Starting with English, like a coward')
const current = computed(() => greetings[index.value])
// Split by grapheme so tone marks and scripts stay intact
const chars = computed(() => [...new Intl.Segmenter(undefined, { granularity: 'grapheme' }).segment(current.value.word)].map((s) => s.segment))

let timer: ReturnType<typeof setInterval> | null = null
let visible = false
let paused = false
// Ticks to linger on a location-based greeting before touring the others
let hold = 0
let busy = false
const cleanups: (() => void)[] = []

async function show(next: number) {
  if (busy || next === index.value) return
  busy = true
  const old = wordRef.value?.querySelectorAll('.greet__ch')
  if (old?.length) await gsap.to(old, { yPercent: -110, rotate: -8, opacity: 0, duration: 0.28, stagger: 0.02, ease: 'power2.in' })
  index.value = next
  attempts.value++
  await nextTick()
  const fresh = wordRef.value?.querySelectorAll('.greet__ch')
  if (fresh?.length) gsap.fromTo(fresh, { yPercent: 110, rotate: 10, opacity: 0 }, { yPercent: 0, rotate: 0, opacity: 1, duration: 0.6, stagger: 0.03, ease: 'back.out(2)' })
  blip(500 + next * 30, 0.07, 'sine', 0.04)
  busy = false
}

function jump(i: number) {
  paused = true
  show(i)
}
function pause() { paused = true }
function resume() { paused = false }

function greet(i: number) {
  detected.value = i
  if (attempts.value > 1) show(i)
  else index.value = i
}

/** Greet in the local language of wherever the visitor's IP says they are. */
async function detectPlace(): Promise<boolean> {
  try {
    const geo = await $fetch<{ country: string | null; region: string | null; city: string | null }>('/api/geo')
    if (!geo.country) return false
    const countryName = new Intl.DisplayNames(['en'], { type: 'region' }).of(geo.country) ?? geo.country
    place.value = geo.city ? `${geo.city}, ${countryName}` : countryName
    const i = Math.max(0, greetings.findIndex((g) => g.code === langForPlace(geo.country!, geo.region)))
    greet(i)
    hold = 2
    detectNote.value = `Spotted you in ${place.value}, so ${greetings[i].lang} goes first`
    return true
  } catch {
    return false
  }
}

function detect() {
  const langs = navigator.languages?.length ? navigator.languages : [navigator.language]
  for (const l of langs) {
    const code = l.toLowerCase().split('-')[0]
    const i = greetings.findIndex((g) => g.code === code)
    if (i !== -1) {
      detected.value = i
      index.value = i
      detectNote.value = i === 0
        ? 'Your browser says English. Safe choice'
        : `Your browser says ${greetings[i].lang}. Look at me, being considerate`
      return
    }
  }
}

onMounted(() => {
  detectPlace().then((found) => { if (!found) detect() })
  timer = setInterval(() => {
    if (!visible || paused) return
    if (hold > 0) hold--
    else show((index.value + 1) % greetings.length)
  }, 2600)
  cleanups.push(watchVisible(wordRef.value, (v) => (visible = v)))
  gsap.utils.toArray<HTMLElement>('.welcome .stat').forEach((el, i) => {
    cleanups.push(onVisible(el, () => gsap.fromTo(el, { y: 60, rotate: i % 2 ? 6 : -6, opacity: 0 }, { y: 0, rotate: i % 2 ? 1.5 : -1.5, opacity: 1, duration: 0.9, delay: i * 0.08, ease: 'back.out(1.6)' })))
  })
})

onUnmounted(() => {
  if (timer) clearInterval(timer)
  cleanups.forEach((c) => c())
})
</script>

<style scoped>
.welcome { position: relative; background: var(--bg); border-top: 3px solid var(--ink); }
.welcome__kicker { text-align: center; font-size: 12px; font-weight: 800; color: var(--on-bg); opacity: 0.8; max-width: 640px; margin: 0 auto; line-height: 1.6; }

.greet { text-align: center; margin-top: 18px; }
.greet__word {
  font-size: clamp(80px, 17vw, 300px);
  color: var(--on-bg);
  line-height: 1;
  min-height: 1.1em;
  white-space: nowrap;
  overflow: hidden;
  padding: 0.04em 0;
  font-family: 'Bricolage Grotesque', 'Apple SD Gothic Neo', 'Hiragino Sans', 'PingFang SC', 'Noto Sans', system-ui, sans-serif;
}
.greet__ch { display: inline-block; }
.greet__ch.sp { width: 0.25em; }
.greet__meta { display: flex; justify-content: center; align-items: center; gap: 14px; flex-wrap: wrap; margin-top: 10px; min-height: 44px; }
.greet__joke { font-size: clamp(22px, 2.2vw, 30px); color: var(--hi); }

.welcome__also { text-align: center; margin-top: 26px; font-size: clamp(22px, 2vw, 28px); color: var(--on-bg); }
.welcome__also + .passport { margin-top: 12px; }
.passport { display: flex; flex-wrap: wrap; justify-content: center; gap: 8px; max-width: 980px; margin: 36px auto 0; }
.passport__stamp {
  position: relative;
  padding: 7px 12px;
  border: 2px dashed color-mix(in srgb, var(--on-bg) 55%, transparent);
  border-radius: 8px;
  background: transparent; color: var(--on-bg);
  font-size: 10px; font-weight: 800;
  transition: transform 0.25s var(--ease-bounce), background-color 0.2s, color 0.2s;
}
.passport__stamp:hover { transform: rotate(-4deg) scale(1.08); }
.passport__stamp.is-on { background: var(--pop2); color: var(--ink); border: 2px solid var(--ink); transform: rotate(-3deg); }
.passport__you { position: absolute; top: -10px; right: -8px; padding: 1px 5px; border-radius: 6px; background: var(--pop); color: var(--ink); font-size: 8px; transform: rotate(8deg); }
.welcome__detect { text-align: center; margin-top: 16px; font-size: 10px; color: var(--on-bg); opacity: 0.6; text-transform: none; }

.welcome__body { display: grid; grid-template-columns: 1.1fr 1fr; gap: clamp(32px, 6vw, 96px); margin-top: clamp(56px, 9vw, 120px); align-items: start; }
.welcome__lede { font-size: clamp(19px, 1.8vw, 26px); line-height: 1.5; color: var(--on-bg); }
.welcome__lede strong { font-weight: 800; }
.welcome__lede em { font-size: 1.15em; }

.stats { display: grid; grid-template-columns: 1fr 1fr; gap: 16px; list-style: none; padding: 0; margin: 0; }
.stat { padding: 22px 22px 18px; display: flex; flex-direction: column; gap: 10px; }
.stat:nth-child(2) { background: var(--pop2); }
.stat:nth-child(3) { background: var(--pop); }
.stat__value { font-size: clamp(54px, 6vw, 88px); }
.stat__label { font-size: 11px; font-weight: 800; }

@media (min-width: 900px) and (min-height: 560px) {
  .welcome .wrap { height: 100%; display: flex; align-items: center; gap: 6vw; }
  .welcome__hello { width: 92vw; flex-shrink: 0; }
  .greet__word { font-size: min(16vw, 24vh); }
  .passport { margin-top: 3vh; }
  .welcome__body { width: 78vw; flex-shrink: 0; margin-top: 0; align-items: center; }
  .welcome__lede { font-size: min(1.8vw, 3vh); }
  .stat__value { font-size: min(6vw, 10vh); }
}

@media (max-width: 900px) {
  .welcome__body { grid-template-columns: 1fr; }
  .greet__word { font-size: clamp(56px, 16vw, 120px); }
}
</style>
