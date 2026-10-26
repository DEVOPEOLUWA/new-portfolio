<template>
  <!-- Supabase tables + policies live in supabase/schema.sql -->
  <section id="notes" ref="sectionRef" class="gb section-pad">
    <div class="wrap gb__wrap">
      <div class="gb__left" data-fit>
        <span class="chip">Guestbook</span>
        <h2 class="gb__title t-display">Leave a<br /><em class="t-serif">note.</em></h2>
        <p class="gb__sub">Say hi, roast my CSS, tell me who the killer was. It goes straight on the wall.</p>

        <div v-if="status === 'offline'" class="gb__offline card">
          <strong>The wall is taking a nap 😴</strong>
          <p>Notes can't be saved right now. Try again a little later — or just <a href="mailto:ayodejiope13@gmail.com">email me</a>.</p>
        </div>

        <form v-else class="pad" @submit.prevent="submit">
          <div class="pad__spiral" aria-hidden="true"><i v-for="n in 9" :key="n" /></div>
          <label class="sr-only" for="gb-name">Your name</label>
          <input id="gb-name" v-model="form.name" class="pad__name t-hand" placeholder="your name" maxlength="80" :disabled="busy || rateLimited" />
          <label class="sr-only" for="gb-msg">Your note</label>
          <textarea id="gb-msg" v-model="form.message" class="pad__msg t-hand" placeholder="write something nice (or honest)…" maxlength="280" :disabled="busy || rateLimited" />
          <div class="pad__foot">
            <span class="t-mono pad__count">{{ form.message.length }}/280</span>
            <button type="submit" class="btn" :disabled="busy || rateLimited" data-cursor="stick">
              {{ busy ? 'Sticking…' : rateLimited ? 'Thanks! ✓' : 'Stick it' }}
            </button>
          </div>
          <p v-if="error" class="pad__err" role="alert">{{ error }}</p>
        </form>
      </div>

      <div ref="wallRef" class="wall">
        <div v-if="status === 'offline'" class="sticky sticky--solo" style="--c: #ffd23f; --r: -4deg">
          <span class="sticky__tape" />
          <p class="sticky__msg t-hand">The wall is resting. Notes will be back up here soon ✿</p>
          <p class="sticky__by t-mono">— Ope</p>
        </div>
        <p v-else-if="status === 'loading'" class="wall__empty t-hand">fetching notes…</p>
        <p v-else-if="!entries.length && status === 'ready'" class="wall__empty t-hand">No notes yet. Be the first!</p>
        <div
          v-for="(e, i) in entries"
          :key="e.id"
          :ref="(el) => registerNote(el as HTMLElement, e.id)"
          class="sticky"
          :style="{ '--c': noteColors[i % noteColors.length], '--r': `${rotation(e.id)}deg` }"
          data-cursor="drag"
        >
          <span class="sticky__tape" />
          <p class="sticky__msg t-hand">{{ e.message }}</p>
          <p class="sticky__by t-mono">— {{ e.name }} · {{ formatDate(e.created_at) }}</p>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import { gsap } from 'gsap'
import { Draggable } from 'gsap/Draggable'
import { InertiaPlugin } from 'gsap/InertiaPlugin'
import { track } from '@vercel/analytics'
import { useSupabaseClient } from '~/composables/useSupabase'

interface Entry { id: string; name: string; message: string; created_at: string }

const RATE_KEY = 'guestbook:lastSubmit'
const RATE_MS = 60_000
const noteColors = ['#ffd23f', '#ff8fcb', '#d6ff3d', '#a8e6ff', '#fff6ea', '#c9b8ff']

const sectionRef = ref<HTMLElement | null>(null)
const wallRef = ref<HTMLElement | null>(null)
const entries = ref<Entry[]>([])
const status = ref<'loading' | 'ready' | 'offline'>('loading')
const busy = ref(false)
const error = ref('')
const rateLimited = ref(false)
const form = reactive({ name: '', message: '' })
const { thock } = useSound()

let channel: any = null
const draggables = new Map<string, Draggable>()

// Stable "random" tilt per note so it doesn't jump around on re-render
function rotation(id: string) {
  let h = 0
  for (const ch of id) h = (h * 31 + ch.charCodeAt(0)) | 0
  return (Math.abs(h) % 11) - 5
}

function registerNote(el: HTMLElement | null, id: string) {
  if (!el || draggables.has(id) || !wallRef.value) return
  // Dragging notes is a mouse thing — on touch screens it would hijack page scrolling
  if (!window.matchMedia('(pointer: fine)').matches) return
  const [d] = Draggable.create(el, { type: 'x,y', bounds: wallRef.value, inertia: true, zIndexBoost: true, onPress: () => thock(1.1) })
  draggables.set(id, d)
}

function formatDate(iso: string) {
  try { return new Date(iso).toLocaleDateString('en-GB', { day: 'numeric', month: 'short' }) } catch { return '' }
}

async function load() {
  const sb = useSupabaseClient()
  if (!sb) { status.value = 'offline'; return }
  const { data, error: err } = await sb
    .from('guestbook')
    .select('id, name, message, created_at')
    .order('created_at', { ascending: false })
    .limit(12)
  if (err) {
    console.warn('Guestbook unavailable:', err.message)
    status.value = 'offline'
    return
  }
  entries.value = (data ?? []) as Entry[]
  status.value = 'ready'
}

function subscribe() {
  const sb = useSupabaseClient()
  if (!sb || status.value !== 'ready') return
  channel = sb
    .channel('guestbook-channel')
    .on('postgres_changes', { event: 'INSERT', schema: 'public', table: 'guestbook' }, (payload: any) => {
      const e = payload.new as Entry
      if (entries.value.some((x) => x.id === e.id)) return
      entries.value = [e, ...entries.value].slice(0, 12)
      nextTick(() => dropIn(e.id))
    })
    .subscribe()
}

function dropIn(id: string) {
  const el = draggables.get(id)?.target as HTMLElement | undefined
  if (el) gsap.fromTo(el, { y: -200, scale: 1.3, opacity: 0 }, { y: 0, scale: 1, opacity: 1, duration: 0.8, ease: 'bounce.out' })
}

async function submit() {
  error.value = ''
  const name = form.name.trim()
  const message = form.message.trim()
  if (!name) { error.value = 'Who is this? Add your name.'; return }
  if (message.length < 3) { error.value = 'A little longer — at least 3 characters.'; return }

  const sb = useSupabaseClient()
  if (!sb) { status.value = 'offline'; return }
  busy.value = true
  const { data, error: err } = await sb.from('guestbook').insert([{ name, message }] as any).select('id, name, message, created_at').single()
  busy.value = false
  if (err) {
    error.value = "Couldn't stick that one — please try again in a moment."
    console.warn('Guestbook insert failed:', err.message)
    return
  }
  track('Guestbook note')
  const e = data as Entry
  if (!entries.value.some((x) => x.id === e.id)) {
    entries.value = [e, ...entries.value].slice(0, 12)
    nextTick(() => dropIn(e.id))
  }
  form.name = ''
  form.message = ''
  try { localStorage.setItem(RATE_KEY, String(Date.now())) } catch { /* private mode */ }
  rateLimited.value = true
  setTimeout(() => (rateLimited.value = false), RATE_MS)
}

onMounted(async () => {
  gsap.registerPlugin(Draggable, InertiaPlugin)
  try {
    const last = Number(localStorage.getItem(RATE_KEY))
    if (last && Date.now() - last < RATE_MS) {
      rateLimited.value = true
      setTimeout(() => (rateLimited.value = false), RATE_MS - (Date.now() - last))
    }
  } catch { /* private mode */ }
  try { await load() } catch { status.value = 'offline' }
  subscribe()
})

onUnmounted(() => {
  if (channel) useSupabaseClient()?.removeChannel(channel)
  draggables.forEach((d) => d.kill())
})
</script>

<style scoped>
.gb { background: var(--bg); border-top: 3px solid var(--ink); }
.gb__wrap { display: grid; grid-template-columns: 0.85fr 1.15fr; gap: clamp(32px, 5vw, 80px); align-items: start; }
.gb__title { font-size: clamp(64px, 9vw, 150px); color: var(--on-bg); margin-top: 24px; }
.gb__title em { color: var(--hi); }
.gb__sub { margin: 20px 0 32px; max-width: 400px; font-size: 18px; line-height: 1.5; color: var(--on-bg); }

.gb__offline { padding: 22px; transform: rotate(-1deg); }
.gb__offline strong { font-size: 20px; }
.gb__offline p { margin-top: 8px; line-height: 1.5; }
.gb__offline a { text-decoration: underline; font-weight: 700; }

.pad {
  position: relative;
  background: #ffd23f;
  color: #160a1d;
  border: 3px solid var(--ink);
  border-radius: 6px 6px 18px 18px;
  box-shadow: var(--shadow-lg);
  padding: 34px 22px 20px;
  transform: rotate(-1.5deg);
  background-image: repeating-linear-gradient(transparent 0 33px, rgba(22, 10, 29, 0.14) 33px 35px);
  background-position: 0 56px;
}
.pad__spiral { position: absolute; top: -14px; left: 18px; right: 18px; display: flex; justify-content: space-between; }
.pad__spiral i { width: 12px; height: 26px; border: 3px solid var(--ink); border-radius: 8px; background: var(--paper); }
.pad__name, .pad__msg { display: block; width: 100%; background: transparent; border: none; outline: none; color: inherit; font-size: 26px; line-height: 35px; }
.pad__name { border-bottom: 3px solid var(--ink); margin-bottom: 8px; }
.pad__msg { min-height: 140px; resize: none; }
.pad__name::placeholder, .pad__msg::placeholder { color: rgba(22, 10, 29, 0.45); }
.pad__foot { display: flex; justify-content: space-between; align-items: center; margin-top: 10px; }
.pad__count { font-size: 10px; opacity: 0.6; }
.pad .btn { --ink: #160a1d; background: var(--paper); padding: 12px 20px; }
.pad .btn:disabled { opacity: 0.6; pointer-events: none; }
.pad__err { margin-top: 12px; font-weight: 700; font-size: 14px; color: #a1001f; }

.wall {
  position: relative;
  min-height: 560px;
  display: flex; flex-wrap: wrap; align-content: flex-start; gap: 16px;
  padding: 24px;
  border: 3px dashed color-mix(in srgb, var(--on-bg) 45%, transparent);
  border-radius: 24px;
}
.wall__empty { width: 100%; text-align: center; padding-top: 200px; font-size: 30px; color: var(--on-bg); opacity: 0.7; }
.sticky {
  position: relative;
  width: calc(33.33% - 11px); min-width: 160px; min-height: 150px;
  padding: 26px 16px 14px;
  background: var(--c); color: #160a1d;
  box-shadow: 0 10px 18px rgba(0, 0, 0, 0.22), inset 0 -18px 30px -24px rgba(0, 0, 0, 0.3);
  rotate: var(--r);
  display: flex; flex-direction: column; justify-content: space-between;
}
@media (pointer: fine) { .sticky { touch-action: none; } }
.sticky--solo { margin: 120px auto 0; width: 260px; }
.sticky__tape { position: absolute; top: -12px; left: 50%; width: 70px; height: 24px; margin-left: -35px; background: rgba(255, 255, 255, 0.55); border: 1px solid rgba(0, 0, 0, 0.08); rotate: -4deg; }
.sticky__msg { font-size: 23px; line-height: 1.05; word-break: break-word; }
.sticky__by { font-size: 9px; opacity: 0.6; margin-top: 12px; text-transform: none; }

@media (min-width: 900px) and (min-height: 560px) {
  .gb { width: max-content; }
  .gb__wrap { height: 100%; grid-template-columns: 36vw max-content; align-items: center; }
  .gb__title { font-size: min(9vw, 14vh); margin-top: 2vh; }
  .gb__sub { margin: 2vh 0 3vh; }
  .pad__msg { min-height: 12vh; }
  /* Two rows of notes that grow sideways as more people sign the wall */
  .wall {
    height: calc(100vh - var(--nav-h) - 150px); min-height: 0; overflow: hidden;
    display: grid; grid-auto-flow: column; grid-template-rows: repeat(2, minmax(0, 1fr)); grid-auto-columns: 290px;
    gap: 22px 20px; padding: 26px; align-content: stretch;
  }
  .sticky { width: auto; min-width: 0; min-height: 0; padding: 22px 16px 12px; }
  .sticky__msg { font-size: min(19px, 2.7vh); line-height: 1.08; overflow: hidden; }
  .sticky--solo { margin: 0; grid-row: span 2; align-self: center; height: 60%; }
  .wall__empty { grid-row: span 2; padding: 0 40px; align-self: center; }
}

@media (max-width: 900px) {
  .gb__wrap { grid-template-columns: 1fr; }
  /* Phones: one note after another, zig-zagging down the wall */
  .wall { min-height: 0; padding: 22px 14px; flex-direction: column; flex-wrap: nowrap; gap: 22px; }
  .sticky { width: 86%; min-width: 0; min-height: 0; }
  .sticky:nth-child(odd) { align-self: flex-start; }
  .sticky:nth-child(even) { align-self: flex-end; }
  .sticky__msg { font-size: 21px; }
  .sticky--solo { margin: 40px auto; align-self: center !important; }
  .wall__empty { padding-top: 120px; }
}
</style>
