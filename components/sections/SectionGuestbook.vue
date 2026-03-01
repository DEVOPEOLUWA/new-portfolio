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
      <div class="gb-entries" style="margin-top:56px;">

        <p v-if="entries.length === 0" class="gb-empty">No notes yet. Be the first.</p>

        <div v-for="entry in entries" :key="entry.id" class="gb-entry">
          <p class="gb-entry-name">{{ entry.name }}</p>
          <p class="gb-entry-msg">{{ entry.message }}</p>
          <p class="gb-entry-ts">{{ formatDate(entry.created_at) }}</p>
          <div class="gb-entry-divider" />
        </div>

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
  if (!sb) {
    // Static mode — no entries
    return
  }
  try {
    const { data, error } = await sb
      .from('guestbook')
      .select('id, name, message, created_at')
      .order('created_at', { ascending: false })
      .limit(10)
    if (error) throw error
    entries.value = data ?? []
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
      entries.value = [payload.new as GuestEntry, ...entries.value].slice(0, 10)
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
      const { error } = await sb.from('guestbook').insert([{ name: form.name.trim(), message: form.message.trim() }])
      if (error) throw error
    } catch (err) {
      console.warn('Guestbook submit failed:', err)
    }
  } else {
    // Static mode: show optimistic entry
    entries.value = [
      { id: crypto.randomUUID(), name: form.name.trim(), message: form.message.trim(), created_at: new Date().toISOString() },
      ...entries.value,
    ].slice(0, 10)
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

/* Entries */
.gb-empty {
  font-family: 'Manrope', sans-serif;
  font-size: 13px;
  color: var(--txt-primary);
  opacity: 0.4;
  font-style: italic;
}
.gb-entry        { padding: 20px 0; }
.gb-entry-name   { font-family:'Manrope',sans-serif; font-weight:500; font-size:14px; color:var(--txt-primary); }
.gb-entry-msg    { font-family:'Manrope',sans-serif; font-weight:300; font-size:14px; color:var(--txt-primary); opacity:0.75; margin-top:4px; }
.gb-entry-ts     { font-family:'Space Mono',monospace; font-size:10px; color:var(--txt-primary); opacity:0.35; margin-top:6px; }
.gb-entry-divider{ height:1px; background:var(--line); margin-top:20px; }

/* Transitions */
.confirm-enter-active { transition: opacity 0.4s ease; }
.confirm-leave-active { transition: opacity 0.4s ease; }
.confirm-enter-from, .confirm-leave-to { opacity: 0; }
</style>
