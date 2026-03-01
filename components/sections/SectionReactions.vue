<template>
  <section id="reactions" ref="sectionRef" class="reactions-section">
    <div class="reactions-inner">

      <span class="reactions-label">Reactions</span>
      <p class="reactions-sub">One word. What did this feel like?</p>

      <!-- Word wall -->
      <div class="word-wall">
        <span
          v-for="(word, i) in words"
          :key="word.key"
          :ref="(el: any) => { if (el) wordEls[i] = el as HTMLElement }"
          class="reaction-word"
          :style="{
            fontSize: `${wordSize(word.key)}px`,
            opacity: '0',
            pointerEvents: hasVoted ? 'none' : 'auto',
            color: hasVoted && chosenWord === word.key ? 'var(--accent)' : 'var(--txt-primary)',
            textDecoration: hasVoted && chosenWord === word.key ? 'underline' : 'none',
            textUnderlineOffset: '4px',
            cursor: hasVoted ? 'default' : 'pointer',
          }"
          @click="castVote(word.key, i)"
          @mouseenter="onHover($event, true)"
          @mouseleave="onHover($event, false)"
        >{{ word.label }}</span>
      </div>

      <!-- Confirmation -->
      <Transition name="confirm-fade">
        <p v-if="showConfirm" class="reactions-confirm">
          Thanks. Your reaction has been recorded.
        </p>
      </Transition>

      <!-- Static mode indicator (dev only) -->
      <p v-if="isStaticMode && isDev" class="static-badge">
        ⚠ Static mode — configure Supabase env vars to enable live counts
      </p>

    </div>
  </section>
</template>

<script setup lang="ts">
/*
 ═══════════════════════════════════════════════════════════
 SUPABASE SETUP — Do this once before deploying:

 1. Go to supabase.com and create a free account
 2. Create a new project (name it "portfolio" or similar)
 3. Go to the SQL Editor and run this query:

    CREATE TABLE reactions (
      word TEXT PRIMARY KEY,
      count INTEGER DEFAULT 0
    );

    INSERT INTO reactions (word, count) VALUES
      ('Impressive', 0), ('Sharp', 0), ('Inspiring', 0),
      ('Unexpected', 0), ('Precise', 0), ('Bold', 0),
      ('Thoughtful', 0), ('Technical', 0), ('Creative', 0),
      ('Solid', 0);

    CREATE OR REPLACE FUNCTION increment_reaction(reaction_word TEXT)
    RETURNS void AS $$
    BEGIN
      UPDATE reactions SET count = count + 1 WHERE word = reaction_word;
    END;
    $$ LANGUAGE plpgsql;

 4. Go to Database → Replication → enable Realtime for the `reactions` table.

 5. Go to Project Settings → API and copy:
    - Project URL  →  add to .env as SUPABASE_URL
    - anon/public key  →  add to .env as SUPABASE_ANON_KEY

 6. In Vercel: Project Settings → Environment Variables — add the same two values.
 ═══════════════════════════════════════════════════════════
*/

import { ref, reactive, computed, onMounted, onUnmounted } from 'vue'
import { gsap } from 'gsap'
import { useSupabaseClient } from '~/composables/useSupabase'

const VOTED_KEY = 'hasVoted:reactions'
const isDev = process.env.NODE_ENV !== 'production'

const sectionRef  = ref<HTMLElement | null>(null)
const wordEls     = ref<HTMLElement[]>([])
const hasVoted    = ref(false)
const chosenWord  = ref<string | null>(null)
const showConfirm = ref(false)
const isStaticMode = ref(false)

const words = [
  { key: 'Impressive',  label: 'Impressive'  },
  { key: 'Sharp',       label: 'Sharp'        },
  { key: 'Inspiring',   label: 'Inspiring'    },
  { key: 'Unexpected',  label: 'Unexpected'   },
  { key: 'Precise',     label: 'Precise'      },
  { key: 'Bold',        label: 'Bold'         },
  { key: 'Thoughtful',  label: 'Thoughtful'   },
  { key: 'Technical',   label: 'Technical'    },
  { key: 'Creative',    label: 'Creative'     },
  { key: 'Solid',       label: 'Solid'        },
]

const counts = reactive<Record<string, number>>(
  Object.fromEntries(words.map((w) => [w.key, 0])),
)

const maxVotes = computed(() => Math.max(1, ...Object.values(counts)))

function wordSize(key: string): number {
  return 16 + ((counts[key] ?? 0) / maxVotes.value) * 56
}

// ── Storage helpers ──────────────────────────────────
function localGet(key: string): string | null {
  try { return localStorage.getItem(key) } catch { return null }
}
function localSet(key: string, val: string): void {
  try { localStorage.setItem(key, val) } catch { /* silent */ }
}

// ── Supabase ─────────────────────────────────────────
async function fetchCounts() {
  const sb = useSupabaseClient()
  if (!sb) { isStaticMode.value = true; if (isDev) console.warn('Supabase not configured — reaction wall running in static mode'); return }

  try {
    const { data, error } = await sb.from('reactions').select('word, count')
    if (error) throw error
    data?.forEach((row: { word: string; count: number }) => {
      if (counts[row.word] !== undefined) counts[row.word] = row.count
    })
  } catch (err) {
    console.warn('Could not fetch reaction counts:', err)
  }
}

function subscribeToUpdates() {
  const sb = useSupabaseClient()
  if (!sb) return

  sb.channel('reactions-channel')
    .on(
      'postgres_changes',
      { event: 'UPDATE', schema: 'public', table: 'reactions' },
      (payload: any) => {
        const { word, count } = payload.new
        if (counts[word] !== undefined) counts[word] = count
      },
    )
    .subscribe()
}

async function castVote(key: string, index: number) {
  if (hasVoted.value) return

  // Optimistic local update
  counts[key] = (counts[key] ?? 0) + 1
  chosenWord.value = key
  hasVoted.value   = true
  localSet(VOTED_KEY, key)

  // Pulse animation
  const el = wordEls.value[index]
  if (el) {
    gsap.timeline()
      .to(el, { scale: 1.15, duration: 0.2, ease: 'power2.out' })
      .to(el, { scale: 1,    duration: 0.2, ease: 'power2.in'  })
  }

  // Update opacity of all words
  revealWords()

  // Show confirmation
  setTimeout(() => { showConfirm.value = true }, 300)

  // Persist to Supabase
  const sb = useSupabaseClient()
  if (!sb) return
  try {
    const { error } = await sb.rpc('increment_reaction', { reaction_word: key })
    if (error) throw error
  } catch (err) {
    console.warn('Could not save vote to Supabase:', err)
  }
}

function onHover(e: MouseEvent, entering: boolean) {
  if (hasVoted.value) return
  const el = e.currentTarget as HTMLElement
  el.style.opacity   = entering ? '1' : '0.5'
  el.style.transform = entering ? 'scale(1.05)' : 'scale(1)'
}

function revealWords() {
  wordEls.value.forEach((el, i) => {
    if (!el) return
    let target = hasVoted.value
      ? (chosenWord.value === words[i]?.key ? '1' : '0.3')
      : '0.5'
    el.style.opacity = target
  })
}

let reactionChannel: ReturnType<typeof setTimeout> | null = null

onMounted(async () => {
  // Check prior vote
  const prior = localGet(VOTED_KEY)
  if (prior) {
    chosenWord.value = prior
    hasVoted.value   = true
    showConfirm.value = true
  }

  await fetchCounts()
  subscribeToUpdates()

  // Staggered word entrance
  setTimeout(() => {
    wordEls.value.forEach((el, i) => {
      if (!el) return
      const targetOpacity = hasVoted.value
        ? (chosenWord.value === words[i]?.key ? 1 : 0.3)
        : 0.5
      gsap.to(el, {
        opacity: targetOpacity,
        duration: 0.4,
        delay: 0.3 + i * 0.05,
        ease: 'power2.out',
      })
    })
  }, 100)
})

onUnmounted(() => {
  const sb = useSupabaseClient()
  sb?.channel('reactions-channel').unsubscribe()
})
</script>

<style scoped>
.reactions-section {
  background: var(--bg-base);
  border-top: 1px solid var(--line);
  transition: background-color 0.4s ease;
}

.reactions-inner {
  max-width: 1600px;
  margin: 0 auto;
  padding: 80px 96px 96px;
}

@media (max-width: 768px) {
  .reactions-inner { padding: 64px 24px 80px; }
}

.reactions-label {
  font-family: 'Space Mono', monospace;
  font-size: 10px;
  letter-spacing: 0.3em;
  text-transform: uppercase;
  color: var(--txt-primary);
  opacity: 0.4;
  display: block;
  margin-bottom: 12px;
}

.reactions-sub {
  font-family: 'Manrope', sans-serif;
  font-size: 14px;
  font-weight: 300;
  color: var(--txt-primary);
  opacity: 0.6;
  margin-bottom: 48px;
}

.word-wall {
  display: flex;
  flex-wrap: wrap;
  align-items: baseline;
  gap: 4px 0;
  max-width: 960px;
}

.reaction-word {
  font-family: 'Kalnia', Georgia, serif;
  font-weight: 400;
  padding: 8px 16px;
  display: inline-block;
  transition: opacity 0.2s ease, transform 0.2s ease, color 0.2s ease, font-size 0.5s ease;
  line-height: 1.3;
}

.reactions-confirm {
  font-family: 'Manrope', sans-serif;
  font-size: 13px;
  font-style: italic;
  color: var(--txt-primary);
  opacity: 0.5;
  margin-top: 32px;
}

.confirm-fade-enter-active { transition: opacity 0.5s ease; }
.confirm-fade-enter-from   { opacity: 0; }

.static-badge {
  font-family: 'Space Mono', monospace;
  font-size: 10px;
  color: var(--txt-muted);
  opacity: 0.5;
  margin-top: 24px;
}
</style>
