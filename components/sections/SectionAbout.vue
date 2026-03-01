<template>
  <section
    id="about"
    ref="sectionRef"
    style="background:var(--bg-base);overflow-x:hidden;"
  >
    <div class="about-outer">

      <!-- ── Large typographic heading ── -->
      <div style="overflow:hidden;">
        <h2
          ref="headingRef"
          class="about-heading"
          style="clip-path:inset(0 0 100% 0);"
        >About</h2>
      </div>

      <!-- ── Hello line ── -->
      <p
        ref="helloRef"
        style="
          font-family:'Instrument Serif',Georgia,serif;
          font-style:italic;
          font-size:clamp(24px,3vw,40px);
          font-weight:400;
          color:var(--txt-primary);
          margin-top:16px;
          margin-bottom:32px;
          opacity:0;
          transform:translateY(12px);
        "
      >Hello, I'm Opeoluwa.</p>

      <!-- ── Full-width rule ── -->
      <div
        ref="ruleRef"
        style="height:1px;background:var(--line);transform-origin:left;transform:scaleX(0);margin-bottom:48px;"
      />

      <!-- ── Two-column body ── -->
      <div class="about-columns">

        <!-- LEFT — Bio + Resume + Quote -->
        <div class="about-left">

          <!-- Bio paragraphs -->
          <div class="bio-block">
            <p
              v-for="(para, i) in bioParagraphs"
              :key="i"
              :ref="(el: any) => { if (el) paraRefs[i] = el as HTMLElement }"
              class="bio-para"
              style="opacity:0;transform:translateY(20px);"
            >{{ para }}</p>
          </div>

          <!-- Resume button -->
          <a href="/resume.pdf" download class="resume-btn" style="margin-top:36px;display:inline-block;">
            Download Resume ↗
          </a>

          <!-- Pull quote -->
          <div ref="quoteRef" class="quote-block" style="margin-top:48px;opacity:0;transform:translateY(20px);">
            <p class="quote-text">"There is nothing so useless as doing efficiently that which should not be done at all."</p>
            <p class="quote-attr">— Peter Drucker</p>
            <p class="quote-reflection">I don't want to make things that look good for the sake of it. I want to make things that matter — where taking them away would actually be felt.</p>
          </div>

        </div>

        <!-- RIGHT — Experience timeline -->
        <div ref="expRef" class="about-right" style="opacity:0;transform:translateY(20px);">

          <span class="zone-label">Experience</span>

          <div class="timeline-wrap">
            <!-- Track -->
            <div class="timeline-track">
              <div ref="timelineLineRef" class="timeline-fill" />
            </div>

            <!-- Entries -->
            <div
              v-for="(entry, i) in timeline"
              :key="i"
              :ref="(el: any) => { if (el) entryRefs[i] = el as HTMLElement }"
              class="timeline-entry"
            >
              <div class="timeline-node" />
              <h3 class="entry-role">{{ entry.role }}</h3>
              <p class="entry-company">{{ entry.company }}</p>
              <p class="entry-date">{{ entry.date }}</p>
              <div v-if="i < timeline.length - 1" class="entry-divider" />
            </div>

          </div>
        </div>

      </div>

      <!-- Skills marquee — full width below both columns -->
      <div ref="skillsRef" style="margin-top:clamp(60px,8vh,100px);opacity:0;transform:translateY(20px);">
        <span class="zone-label" style="margin-bottom:24px;">Skills</span>
        <div class="marquee-outer">
          <div class="marquee-track">
            <span class="marquee-set" aria-hidden="false">
              <span v-for="(skill, si) in skills" :key="`a-${si}`" class="skill-item">
                {{ skill }}<span v-if="si < skills.length - 1" class="skill-dot"> · </span>
              </span>
            </span>
            <span class="marquee-set" aria-hidden="true">
              <span v-for="(skill, si) in skills" :key="`b-${si}`" class="skill-item">
                {{ skill }}<span v-if="si < skills.length - 1" class="skill-dot"> · </span>
              </span>
            </span>
          </div>
        </div>
      </div>

    </div>
  </section>
</template>

<script setup lang="ts">
import { ref, onMounted, onUnmounted } from 'vue'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

if (typeof window !== 'undefined') gsap.registerPlugin(ScrollTrigger)

const sectionRef      = ref<HTMLElement | null>(null)
const headingRef      = ref<HTMLElement | null>(null)
const helloRef        = ref<HTMLElement | null>(null)
const ruleRef         = ref<HTMLElement | null>(null)
const paraRefs        = ref<HTMLElement[]>([])
const quoteRef        = ref<HTMLElement | null>(null)
const expRef          = ref<HTMLElement | null>(null)
const timelineLineRef = ref<HTMLElement | null>(null)
const entryRefs       = ref<HTMLElement[]>([])
const skillsRef       = ref<HTMLElement | null>(null)

const triggers: ScrollTrigger[] = []

// ── Data ─────────────────────────────────────────────
const bioParagraphs = [
  "I got into engineering because I love building things — taking what exists, pushing it further, and watching complexity fold into something that just works. There's a satisfaction in that I haven't found anywhere else.",
  "The problems I'm most drawn to are the ones that are genuinely hard. Not hard because nobody thought about them, but hard because they involve real scale, real users, and real consequences if you get it wrong. I've built systems that thousands of people depend on daily. That weight keeps me honest.",
  "My approach is simple: every problem is solvable. The question is always which solution fits the people who actually have to live with it. I build for the user's mental model, not my own.",
  "When I'm not at a screen, I'm usually solving puzzles, watching Korean variety shows, or deep in a conversation that went longer than anyone expected. I think the same way I code — looking for the pattern underneath everything.",
  "Where I want to be is simple. I want to build things that make hard things feel easy — the kind of automation and tooling that turns hours of human effort into seconds. The way AI is reshaping what's possible is exactly the direction I want to be moving.",
]

const timeline = [
  { role: 'Frontend Engineer',        company: 'Encentral Solutions · Abuja', date: 'Nov 2022 — Present'  },
  { role: 'Frontend Engineer Intern', company: 'Encentral Solutions · Abuja', date: 'Apr 2022 — Nov 2022' },
]

const skills = ['Angular','React','Vue.js','TypeScript','REST APIs','GraphQL','WebSockets','SSE','CI/CD','OAuth2','JWT','AWS S3']

// ── Section entry animations ─────────────────────────
function initEntryAnimations() {
  const section = sectionRef.value
  if (!section) return

  triggers.push(ScrollTrigger.create({
    trigger: section,
    start: 'top 80%',
    once: true,
    onEnter: () => {
      // 1. Heading clip-path reveal
      gsap.to(headingRef.value, {
        clipPath: 'inset(0 0 0% 0)',
        duration: 1,
        ease: 'power4.out',
      })
      // 2. Hello line
      gsap.to(helloRef.value, {
        opacity: 1, y: 0,
        duration: 0.7, ease: 'power3.out', delay: 0.3,
      })
      // 3. Rule draws left→right
      gsap.to(ruleRef.value, {
        scaleX: 1,
        duration: 0.6,
        ease: 'power3.out',
        delay: 0.2,
      })
      // 4. Bio paragraphs staggered fade-up
      paraRefs.value.forEach((el, i) => {
        if (!el) return
        gsap.to(el, {
          opacity: 1, y: 0,
          duration: 0.65, ease: 'power3.out',
          delay: 0.4 + i * 0.1,
        })
      })
      // 5. Quote
      gsap.to(quoteRef.value, { opacity: 1, y: 0, duration: 0.7, ease: 'power3.out', delay: 0.9 })
      // 6. Exp column
      gsap.to(expRef.value, { opacity: 1, y: 0, duration: 0.7, ease: 'power3.out', delay: 0.5 })
    },
  }))
}

// ── Timeline scrub ───────────────────────────────────
function initTimeline() {
  const line    = timelineLineRef.value
  const entries = entryRefs.value
  const wrap    = expRef.value
  if (!line || !wrap || !entries.length) return

  // Reset
  line.style.height = '0'
  entries.forEach((e) => {
    e.style.opacity   = '0'
    e.style.transform = 'translateX(16px)'
    const node = e.querySelector('.timeline-node') as HTMLElement | null
    if (node) node.style.transform = 'scale(0)'
  })

  triggers.push(ScrollTrigger.create({
    trigger: wrap,
    start: 'top 60%',
    end: 'bottom 50%',
    scrub: 1.2,
    onUpdate: (self) => {
      line.style.height = `${self.progress * 100}%`
      entries.forEach((entry, i) => {
        const threshold = i / entries.length
        if (self.progress >= threshold + 0.1 && parseFloat(entry.style.opacity) < 1) {
          gsap.to(entry, { opacity: 1, x: 0, duration: 0.5, ease: 'power3.out' })
          const node = entry.querySelector('.timeline-node') as HTMLElement | null
          if (node) gsap.to(node, { scale: 1, duration: 0.3, ease: 'back.out(2)' })
        }
      })
    },
  }))
}

// ── Skills fade ──────────────────────────────────────
function initSkills() {
  if (!skillsRef.value) return
  triggers.push(ScrollTrigger.create({
    trigger: skillsRef.value,
    start: 'top 88%',
    once: true,
    onEnter: () => gsap.to(skillsRef.value, { opacity: 1, y: 0, duration: 0.7, ease: 'power3.out' }),
  }))
}

onMounted(() => {
  setTimeout(() => {
    ScrollTrigger.refresh()
    initEntryAnimations()
    initTimeline()
    initSkills()
  }, 500)
})

onUnmounted(() => { triggers.forEach((t) => t.kill()) })
</script>

<style scoped>
/* ── Outer container ── */
.about-outer {
  max-width: 1400px;
  margin: 0 auto;
  padding: 96px clamp(24px, 6vw, 96px) 96px;
}

@media (max-width: 768px) {
  .about-outer { padding: 48px 24px 64px; }
}

/* ── Large heading ── */
.about-heading {
  font-family: 'Kalnia', Georgia, serif;
  font-weight: 700;
  font-size: clamp(64px, 14vw, 180px);
  color: var(--txt-primary);
  line-height: 0.9;
  letter-spacing: -0.02em;
}

@media (max-width: 768px) {
  .about-heading { font-size: clamp(64px, 18vw, 100px); }
}

/* ── Two-column layout ── */
.about-columns {
  display: flex;
  flex-direction: row;
  gap: clamp(40px, 6vw, 80px);
  align-items: flex-start;
}
.about-left  { flex: 0 0 55%; min-width: 0; }
.about-right { flex: 1 1 0;   min-width: 0; }

@media (max-width: 768px) {
  .about-columns  { flex-direction: column; gap: 48px; }
  .about-left, .about-right { flex: none; width: 100%; }
}

/* ── Bio ── */
.bio-block { display: flex; flex-direction: column; }
.bio-para {
  font-family: 'Manrope', sans-serif;
  font-weight: 300;
  font-size: clamp(16px, 1.5vw, 19px);
  line-height: 1.85;
  color: var(--txt-primary);
  max-width: 580px;
  margin-bottom: 1.25em;
}

/* ── Resume button ── */
.resume-btn {
  font-family: 'Space Mono', monospace;
  font-size: 11px;
  letter-spacing: 0.15em;
  text-transform: uppercase;
  color: var(--txt-primary);
  text-decoration: none;
  border: 1px solid var(--txt-primary);
  border-radius: 4px;
  padding: 12px 28px;
  background: transparent;
  cursor: pointer;
  transition: all 0.25s ease;
  display: inline-block;
}
.resume-btn:hover {
  background: var(--txt-primary);
  color: var(--bg-base);
}

/* ── Quote ── */
.quote-block { border-left: 2px solid var(--accent); padding-left: 20px; max-width: 500px; }
.quote-text  { font-family:'Instrument Serif',Georgia,serif; font-style:italic; font-size:clamp(17px,1.8vw,22px); color:var(--accent); line-height:1.6; }
.quote-attr  { font-family:'Space Mono',monospace; font-size:10px; letter-spacing:0.15em; text-transform:uppercase; color:var(--txt-primary); opacity:0.4; margin-top:10px; }
.quote-reflection { font-family:'Manrope',sans-serif; font-weight:300; font-size:clamp(14px,1.3vw,16px); color:var(--txt-primary); opacity:0.75; max-width:500px; margin-top:14px; line-height:1.7; }

/* ── Zone label ── */
.zone-label {
  font-family: 'Space Mono', monospace;
  font-size: 10px;
  letter-spacing: 0.3em;
  text-transform: uppercase;
  color: var(--txt-primary);
  opacity: 0.4;
  display: block;
  margin-bottom: 40px;
}

/* ── Timeline ── */
.timeline-wrap   { position: relative; }
.timeline-track  { position:absolute; left:3px; top:8px; bottom:0; width:2px; background:var(--line); }
.timeline-fill   { width:100%; height:0; background:var(--accent); }
.timeline-entry  { position:relative; padding:28px 0 28px 44px; }
@media (max-width:768px) { .timeline-entry { padding-left:28px; } }

.timeline-node   { position:absolute; left:0; top:36px; width:8px; height:8px; background:var(--accent); border-radius:50%; transform:scale(0); }
.entry-role      { font-family:'Kalnia',serif; font-size:clamp(17px,1.8vw,22px); font-weight:500; color:var(--txt-primary); line-height:1.2; }
.entry-company   { font-family:'Manrope',sans-serif; font-size:13px; font-weight:400; color:var(--txt-primary); opacity:0.6; margin-top:4px; }
.entry-date      { font-family:'Space Mono',monospace; font-size:11px; color:var(--txt-primary); opacity:0.4; margin-top:4px; }
.entry-divider   { height:1px; background:var(--line); margin-top:28px; }

/* ── Skills marquee ── */
.marquee-outer {
  overflow: hidden;
  width: 100%;
}
.marquee-track {
  display: inline-flex;
  white-space: nowrap;
  animation: marquee-scroll 30s linear infinite;
  will-change: transform;
}
.marquee-outer:hover .marquee-track {
  animation-play-state: paused;
}
.marquee-set { display: inline-flex; align-items: baseline; }
.skill-item  { font-family:'Manrope',sans-serif; font-weight:500; font-size:clamp(15px,1.5vw,18px); color:var(--txt-primary); }
.skill-dot   { padding:0 20px; color:var(--txt-muted); opacity:0.4; }

@keyframes marquee-scroll {
  from { transform: translateX(0); }
  to   { transform: translateX(-50%); }
}
</style>
