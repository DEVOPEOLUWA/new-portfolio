<template>
  <section
    id="contact"
    ref="sectionRef"
    class="contact-section"
  >
    <!-- ══════════════════════════════════════════
         MAIN BODY — two column (desktop) / stack (mobile)
    ══════════════════════════════════════════ -->
    <div class="contact-body">

      <!-- LEFT — typographic word + opener -->
      <div class="contact-left">

        <!-- Italic opener -->
        <p
          ref="openerRef"
          class="contact-opener"
          style="opacity: 0; transform: translateY(16px);"
        >
          "Have a project in mind, or just want to talk engineering?"
        </p>

        <!-- Large typographic word -->
        <div class="contact-word-wrap">
          <span
            ref="wordRef"
            class="contact-word"
            style="opacity: 0; transform: translateY(40px);"
          >Contact</span>
        </div>

      </div>

      <!-- RIGHT — contact rows -->
      <div class="contact-right">
        <div
          v-for="(row, i) in rows"
          :key="i"
          :ref="(el: any) => { if (el) rowRefs[i] = el as HTMLElement }"
          class="contact-row"
          style="opacity: 0; transform: translateX(20px);"
        >
          <div class="row-divider" />
          <div class="row-inner">
            <span class="row-label">{{ row.label }}</span>
            <component
              :is="row.href ? 'a' : 'span'"
              :href="row.href || undefined"
              :target="row.external ? '_blank' : undefined"
              :rel="row.external ? 'noopener noreferrer' : undefined"
              class="row-value"
            >{{ row.value }}</component>
          </div>
        </div>
        <!-- Bottom divider -->
        <div class="row-divider" style="opacity: 0;" ref="lastDivRef" />
      </div>

    </div>

    <!-- ══════════════════════════════════════════
         FOOTER BAR
    ══════════════════════════════════════════ -->
    <div class="footer-bar">
      <div class="footer-rule" />
      <div class="footer-inner">
        <span class="footer-text">© 2025 Opeoluwa Ayodeji</span>
        <span class="footer-text hidden md:block">Design &amp; Engineering by O.A</span>
        <button class="footer-text footer-top-btn" @click="scrollToTop">BACK TO TOP ↑</button>
      </div>
    </div>

  </section>
</template>

<script setup lang="ts">
import { ref, onMounted, onUnmounted } from 'vue'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { useLenis } from '~/composables/useLenis'

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger)
}

const { scrollTo } = useLenis()

const sectionRef = ref<HTMLElement | null>(null)
const openerRef  = ref<HTMLElement | null>(null)
const wordRef    = ref<HTMLElement | null>(null)
const rowRefs    = ref<HTMLElement[]>([])
const lastDivRef = ref<HTMLElement | null>(null)

const triggers: ScrollTrigger[] = []

const rows = [
  {
    label: 'Email',
    value: 'Reach out to me ↗',
    href: 'mailto:ayodejiope13@gmail.com',
    external: false,
  },
  {
    label: 'LinkedIn',
    value: 'Connect with me ↗',
    href: 'https://www.linkedin.com/in/ayodeji-opeoluwa/',
    external: true,
  },
  {
    label: 'GitHub',
    value: 'Check out my work ↗',
    href: 'https://github.com/DEVOPEOLUWA/',
    external: true,
  },
]

function scrollToTop() {
  scrollTo(0, { duration: 1.5 })
}

onMounted(() => {
  setTimeout(() => {
    ScrollTrigger.refresh()

    if (!sectionRef.value) return

    const st = ScrollTrigger.create({
      trigger: sectionRef.value,
      start: 'top 80%',
      once: true,
      onEnter: () => {
        // Large word
        gsap.to(wordRef.value, {
          opacity: 1, y: 0,
          duration: 1, ease: 'power3.out',
        })
        // Opener
        gsap.to(openerRef.value, {
          opacity: 1, y: 0,
          duration: 0.7, ease: 'power3.out',
          delay: 0.2,
        })
        // Rows staggered
        rowRefs.value.forEach((row, i) => {
          gsap.to(row, {
            opacity: 1, x: 0,
            duration: 0.55, ease: 'power3.out',
            delay: 0.15 + i * 0.1,
          })
        })
        if (lastDivRef.value) {
          gsap.to(lastDivRef.value, { opacity: 1, duration: 0.4, delay: 0.6 })
        }
      },
    })
    triggers.push(st)
  }, 400)
})

onUnmounted(() => {
  triggers.forEach((t) => t.kill())
})
</script>

<style scoped>
.contact-section {
  background: var(--bg-base);
  display: flex;
  flex-direction: column;
  min-height: 100vh;
  transition: background-color 0.4s ease;
}

/* ── Body ── */
.contact-body {
  flex: 1;
  display: flex;
  flex-direction: row;
  max-width: 1600px;
  width: 100%;
  margin: 0 auto;
  padding: 80px 96px 0;
  gap: 80px;
}

@media (max-width: 768px) {
  .contact-body {
    flex-direction: column;
    padding: 64px 24px 0;
    gap: 48px;
  }
}

/* ── Left ── */
.contact-left {
  flex: 1;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  min-height: 420px;
  position: relative;
}

@media (max-width: 768px) {
  .contact-left {
    min-height: auto;
  }
}

.contact-opener {
  font-family: 'Instrument Serif', Georgia, serif;
  font-style: italic;
  font-size: clamp(22px, 3vw, 36px);
  color: var(--txt-primary);
  max-width: 400px;
  line-height: 1.4;
  margin-bottom: auto;
}

.contact-word-wrap {
  display: flex;
  align-items: flex-end;
  overflow: hidden;
  padding-top: 40px;
}

.contact-word {
  font-family: 'Kalnia', Georgia, serif;
  font-size: clamp(80px, 14vw, 180px);
  font-weight: 700;
  color: var(--txt-primary);
  line-height: 0.85;
  letter-spacing: -0.03em;
  display: block;
  white-space: nowrap;
}

@media (max-width: 768px) {
  .contact-word {
    font-size: clamp(60px, 20vw, 100px);
  }
}

/* ── Right ── */
.contact-right {
  flex: 1;
  display: flex;
  flex-direction: column;
  justify-content: center;
  padding: 40px 0;
}

.contact-row {
  display: flex;
  flex-direction: column;
}

.row-divider {
  height: 1px;
  background: var(--line);
  width: 100%;
}

.row-inner {
  display: flex;
  align-items: baseline;
  justify-content: space-between;
  padding: 28px 0;
  gap: 16px;
}

.row-label {
  font-family: 'Space Mono', monospace;
  font-size: 10px;
  letter-spacing: 0.25em;
  text-transform: uppercase;
  color: var(--txt-primary);
  opacity: 0.4;
  flex-shrink: 0;
}

.row-value {
  font-family: 'Kalnia', Georgia, serif;
  font-size: clamp(18px, 2.5vw, 32px);
  font-weight: 400;
  color: var(--txt-primary);
  text-align: right;
  text-decoration: none;
  transition: color 0.2s ease;
  word-break: break-all;
}

.row-value:hover {
  color: var(--accent);
}

/* ── Footer bar ── */
.footer-bar {
  width: 100%;
  padding: 0 96px;
  margin-top: 40px;
}

@media (max-width: 768px) {
  .footer-bar {
    padding: 0 24px;
  }
}

.footer-rule {
  height: 1px;
  background: var(--line);
  width: 100%;
}

.footer-inner {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 20px 0;
}

.footer-text {
  font-family: 'Space Mono', monospace;
  font-size: 10px;
  letter-spacing: 0.15em;
  text-transform: uppercase;
  color: var(--txt-primary);
  opacity: 0.4;
}

.footer-top-btn {
  background: none;
  border: none;
  cursor: pointer;
  padding: 0;
  transition: opacity 0.2s ease;
}

.footer-top-btn:hover {
  opacity: 0.8;
}
</style>
