<template>
  <!--
   ═══════════════════════════════════════════════════════════
   SUPABASE SETUP — guestbook table — run in SQL Editor:

   CREATE TABLE guestbook (
     id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
     name TEXT NOT NULL,
     message TEXT NOT NULL,
     created_at TIMESTAMPTZ DEFAULT now()
   );

   Then enable Realtime for the `guestbook` table in
   Database → Replication.
   ═══════════════════════════════════════════════════════════
  -->
  <section id="guestbook" class="guestbook-section">
    <div class="guestbook-inner">

      <!-- Label -->
      <span class="gb-label">Guestbook</span>
      <p class="gb-sub">Leave a note. Say anything.</p>

      <!-- Rate limit notice -->
      <p v-if="rateLimited" class="gb-rate-notice">You just left a note — come back in a moment.</p>

      <!-- Form -->
      <form v-else class="gb-form" @submit.prevent="submitNote">
        <div class="gb-field-wrap">
          <input
            v-model="form.name"
            type="text"
            placeholder="Your name"
            class="gb-input"
            maxlength="80"
            :disabled="submitting"
          />
          <p v-if="errors.name" class="gb-error">{{ errors.name }}</p>
        </div>

        <div class="gb-field-wrap" style="margin-top:16px;">
          <textarea
            v-model="form.message"
            placeholder="What's on your mind?"
            class="gb-input gb-textarea"
            maxlength="280"
            :disabled="submitting"
          />
          <p v-if="errors.message" class="gb-error">{{ errors.message }}</p>
        </div>

        <button type="submit" class="gb-submit" :disabled="submitting">
          {{ submitting ? 'Sending…' : 'Leave a note ↗' }}
        </button>

        <!-- Success confirmation -->
        <Transition name="confirm">
          <p v-if="showConfirm" class="gb-confirm">Note left. Thanks.</p>
        </Transition>
      </form>

      <!-- Entries feed -->
      <div class="gb-feed">

        <!-- Empty state -->
        <div v-if="entries.length === 0" class="gb-empty-card">
          <p class="gb-empty-text">No notes yet. Be the first.</p>
        </div>

        <!-- Cards -->
        <TransitionGroup name="card-list" tag="div" class="gb-cards">
          <div
            v-for="(entry, i) in entries"
            :key="entry.id"
            class="gb-card"
            :class="{ 'gb-card--drop': newEntryIds.has(entry.id), 'gb-card--fade': !newEntryIds.has(entry.id) }"
            :style="!newEntryIds.has(entry.id) ? { animationDelay: `${i * 0.08}s` } : {}"
          >
            <div class="gb-card-inner">
              <!-- Accent dot + name -->
              <div class="gb-card-header">
                <span class="gb-card-dot" />
                <span class="gb-card-name">{{ entry.name }}</span>
              </div>
              <p class="gb-card-msg">{{ entry.message }}</p>
              <p class="gb-card-ts">{{ formatDate(entry.created_at) }}</p>
            </div>
          </div>
        </TransitionGroup>

        <!-- More than 10 label -->
        <p v-if="hasMore" class="gb-more">Showing 10 most recent notes</p>

      </div>

    </div>
  </section>
</template>

<script setup lang="ts">
import { ref, reactive, onMounted, onUnmounted } from 'vue'
import { useSupabaseClient } from '~/composables/useSupabase'

const RATE_KEY = 'guestbook:lastSubmit'
const RATE_MS  = 60_000

interface GuestEntry { id: string; name: string; message: string; created_at: string }

const entries    = ref<GuestEntry[]>([])
const submitting = ref(false)
const showConfirm = ref(false)
const rateLimited = ref(false)
const hasMore     = ref(false)
// Track which IDs are brand-new (drop animation) vs loaded (stagger fade)
const newEntryIds = ref(new Set<string>())

const form = reactive({ name: '', message: '' })
const errors = reactive({ name: '', message: '' })

// ── Rate limit check on mount ──────────────────────────
function checkRateLimit() {
  try {
    const last = localStorage.getItem(RATE_KEY)
    if (last && Date.now() - parseInt(last, 10) < RATE_MS) {
      rateLimited.value = true
      // Clear flag after remaining time
      const remaining = RATE_MS - (Date.now() - parseInt(last, 10))
      setTimeout(() => { rateLimited.value = false }, remaining)
    }
  } catch { /* silent */ }
}

// ── Fetch entries ──────────────────────────────────────
async function fetchEntries() {
  const sb = useSupabaseClient()
  if (!sb) return
  try {
    const { data, error } = await sb
      .from('guestbook')
      .select('id, name, message, created_at')
      .order('created_at', { ascending: false })
      .limit(11)
    if (error) throw error
    const rows = (data ?? []) as GuestEntry[]
    hasMore.value = rows.length > 10
    entries.value = rows.slice(0, 10)
  } catch (err) {
    console.warn('Guestbook fetch failed:', err)
  }
}

// ── Realtime subscription ──────────────────────────────
let channel: any = null
function subscribeToEntries() {
  const sb = useSupabaseClient()
  if (!sb) return
  channel = sb
    .channel('guestbook-channel')
    .on('postgres_changes', { event: 'INSERT', schema: 'public', table: 'guestbook' }, (payload: any) => {
      const newEntry = payload.new as GuestEntry
      newEntryIds.value.add(newEntry.id)
      const updated = [newEntry, ...entries.value]
      if (updated.length > 10) updated.splice(10)
      entries.value = updated
      hasMore.value = entries.value.length >= 10
    })
    .subscribe()
}

// ── Validate ───────────────────────────────────────────
function validate(): boolean {
  errors.name    = ''
  errors.message = ''
  let ok = true
  if (!form.name.trim()) { errors.name = 'Name is required.'; ok = false }
  if (form.message.trim().length < 3)   { errors.message = 'Message must be at least 3 characters.'; ok = false }
  if (form.message.trim().length > 280) { errors.message = 'Message must be 280 characters or fewer.'; ok = false }
  return ok
}

// ── Submit ─────────────────────────────────────────────
async function submitNote() {
  if (!validate() || submitting.value) return
  submitting.value = true

  const sb = useSupabaseClient()
  if (sb) {
    try {
      const { error } = await sb.from('guestbook').insert([{ name: form.name.trim(), message: form.message.trim() }] as any)
      if (error) throw error
    } catch (err) {
      console.warn('Guestbook submit failed:', err)
    }
  } else {
    // Static mode: optimistic entry with drop animation
    const optimisticEntry: GuestEntry = {
      id: crypto.randomUUID(),
      name: form.name.trim(),
      message: form.message.trim(),
      created_at: new Date().toISOString(),
    }
    newEntryIds.value.add(optimisticEntry.id)
    const updated = [optimisticEntry, ...entries.value]
    if (updated.length > 10) updated.splice(10)
    entries.value = updated
    hasMore.value = updated.length >= 10
  }

  // Rate limit
  try { localStorage.setItem(RATE_KEY, String(Date.now())) } catch { /* silent */ }
  rateLimited.value = true
  setTimeout(() => { rateLimited.value = false }, RATE_MS)

  form.name    = ''
  form.message = ''
  submitting.value = false

  // Brief confirmation
  showConfirm.value = true
  setTimeout(() => { showConfirm.value = false }, 2000)

  // Refresh entries
  await fetchEntries()
}

// ── Format date ────────────────────────────────────────
function formatDate(iso: string): string {
  try {
    return new Date(iso).toLocaleDateString('en-GB', { day:'numeric', month:'short', year:'numeric' })
  } catch { return '' }
}

onMounted(async () => {
  checkRateLimit()
  await fetchEntries()
  subscribeToEntries()
})

onUnmounted(() => {
  const sb = useSupabaseClient()
  if (sb && channel) sb.channel('guestbook-channel').unsubscribe()
})
</script>

<style scoped>
.guestbook-section {
  background: var(--bg-base);
  border-top: 1px solid var(--line);
  transition: background-color 0.4s ease;
}
.guestbook-inner {
  max-width: 1600px;
  margin: 0 auto;
  padding: 80px 96px 96px;
}
@media (max-width: 768px) {
  .guestbook-inner { padding: 64px 24px 80px; }
}

.gb-label {
  font-family: 'Space Mono', monospace;
  font-size: 10px;
  letter-spacing: 0.3em;
  text-transform: uppercase;
  color: var(--txt-primary);
  opacity: 0.4;
  display: block;
  margin-bottom: 12px;
}
.gb-sub {
  font-family: 'Manrope', sans-serif;
  font-size: 14px;
  font-weight: 300;
  color: var(--txt-primary);
  opacity: 0.6;
  margin-bottom: 36px;
}

/* Form */
.gb-form { max-width: 480px; }
.gb-field-wrap { display: flex; flex-direction: column; }
.gb-input {
  font-family: 'Manrope', sans-serif;
  font-size: 14px;
  padding: 12px 0;
  border: none;
  border-bottom: 1px solid var(--line);
  background: transparent;
  color: var(--txt-primary);
  width: 100%;
  outline: none;
  transition: border-color 0.2s ease;
}
.gb-input::placeholder { color: var(--txt-muted); opacity: 0.5; }
.gb-input:focus { border-bottom-color: var(--accent); }
.gb-input:disabled { opacity: 0.5; cursor: not-allowed; }
.gb-textarea { min-height: 80px; resize: none; }

.gb-error {
  font-family: 'Manrope', sans-serif;
  font-size: 12px;
  color: #e05;
  margin-top: 4px;
}
.gb-submit {
  font-family: 'Space Mono', monospace;
  font-size: 11px;
  letter-spacing: 0.15em;
  text-transform: uppercase;
  color: var(--accent);
  background: none;
  border: none;
  cursor: pointer;
  margin-top: 16px;
  padding: 0;
  transition: opacity 0.2s ease;
}
.gb-submit:hover       { opacity: 0.6; }
.gb-submit:disabled    { opacity: 0.4; cursor: not-allowed; }
.gb-confirm {
  font-family: 'Manrope', sans-serif;
  font-size: 13px;
  color: var(--txt-primary);
  opacity: 0.55;
  margin-top: 12px;
  font-style: italic;
}
.gb-rate-notice {
  font-family: 'Manrope', sans-serif;
  font-size: 13px;
  color: var(--txt-primary);
  opacity: 0.5;
  font-style: italic;
  max-width: 480px;
  line-height: 1.6;
}

/* Entries feed */
.gb-feed { margin-top: 56px; }

.gb-cards {
  display: flex;
  flex-direction: column;
  gap: 12px;
  max-width: 540px;
}
@media (max-width: 768px) {
  .gb-cards { gap: 8px; }
}

/* ── Card ── */
.gb-card {
  width: 100%;
  max-width: 480px;
  border-radius: 12px;
  border: 1px solid var(--line);
  background: var(--bg-surface);
  cursor: default;
  transition: transform 0.2s ease, box-shadow 0.2s ease;
}
.gb-card:hover {
  transform: translateY(-2px);
  box-shadow: 0 8px 24px rgba(0,0,0,0.10);
}
/* Light mode card */
:root:not(.dark) .gb-card {
  background: #ffffff;
  border-color: rgba(0,0,0,0.08);
  box-shadow: 0 2px 12px rgba(0,0,0,0.06);
}

.gb-card-inner {
  padding: 20px 24px;
}
@media (max-width: 768px) {
  .gb-card-inner { padding: 16px 20px; }
}

.gb-card-header {
  display: flex;
  align-items: center;
  gap: 8px;
}
.gb-card-dot {
  width: 6px;
  height: 6px;
  border-radius: 50%;
  background: var(--accent);
  flex-shrink: 0;
}
.gb-card-name {
  font-family: 'Manrope', sans-serif;
  font-weight: 600;
  font-size: 14px;
  color: var(--txt-primary);
}
.gb-card-msg {
  font-family: 'Manrope', sans-serif;
  font-weight: 300;
  font-size: 14px;
  color: var(--txt-primary);
  opacity: 0.8;
  margin-top: 6px;
  line-height: 1.6;
}
.gb-card-ts {
  font-family: 'Space Mono', monospace;
  font-size: 10px;
  color: var(--txt-primary);
  opacity: 0.35;
  margin-top: 10px;
}

/* ── Drop animation (new / realtime cards) ── */
@keyframes cardDrop {
  0%   { opacity: 0; transform: translateY(-40px) scale(0.95); }
  60%  {             transform: translateY(6px)   scale(1.01); }
  80%  {             transform: translateY(-3px)  scale(0.99); }
  100% { opacity: 1; transform: translateY(0)     scale(1);    }
}
.gb-card--drop {
  animation: cardDrop 0.6s cubic-bezier(0.23, 1, 0.32, 1) forwards;
}

/* ── Stagger fade (on-load cards) ── */
@keyframes cardFade {
  from { opacity: 0; transform: translateY(20px); }
  to   { opacity: 1; transform: translateY(0);    }
}
.gb-card--fade {
  animation: cardFade 0.4s ease forwards;
}

/* ── TransitionGroup for realtime pushes ── */
.card-list-enter-active { animation: cardDrop 0.6s cubic-bezier(0.23, 1, 0.32, 1) forwards; }
.card-list-leave-active { transition: opacity 0.3s ease, transform 0.3s ease; }
.card-list-leave-to    { opacity: 0; transform: translateY(10px); }

/* ── Empty state ── */
.gb-empty-card {
  max-width: 480px;
  width: 100%;
  border: 1px dashed var(--line);
  border-radius: 12px;
  padding: 20px 24px;
  opacity: 0.5;
  display: flex;
  align-items: center;
  justify-content: center;
}
.gb-empty-text {
  font-family: 'Manrope', sans-serif;
  font-size: 14px;
  font-style: italic;
  color: var(--txt-primary);
  opacity: 0.5;
  text-align: center;
}

/* ── More label ── */
.gb-more {
  font-family: 'Space Mono', monospace;
  font-size: 10px;
  color: var(--txt-primary);
  opacity: 0.35;
  margin-top: 8px;
}

/* Transitions */
.confirm-enter-active { transition: opacity 0.4s ease; }
.confirm-leave-active { transition: opacity 0.4s ease; }
.confirm-enter-from, .confirm-leave-to { opacity: 0; }
</style>
