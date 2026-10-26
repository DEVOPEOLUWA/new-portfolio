<template>
  <section id="about" class="about section-pad">
    <div class="wrap">
      <div class="about__top" data-fit>
        <h2 class="about__title t-display">The person<br />behind the <em class="t-serif">pixels.</em></h2>
        <a href="/Opeoluwa_Ayodeji_Frontend_Engineer_Resume.pdf" target="_blank" rel="noopener" class="btn btn--pink" data-cursor="cv" @click="track('Resume downloaded')">
          Grab my résumé <span aria-hidden="true">↓</span>
        </a>
      </div>

      <div class="about__grid">
        <div class="about__bio" data-fit>
          <p v-for="(p, i) in bio" :key="i" class="about__p">{{ p }}</p>

          <blockquote class="quote card">
            <p class="t-serif">“There is nothing so useless as doing efficiently that which should not be done at all.”</p>
            <cite class="t-mono">— Peter Drucker</cite>
            <p class="quote__mine">
              I don't want to make things that look good for the sake of it. I want to make things that matter —
              where taking them away would actually be felt.
            </p>
          </blockquote>
        </div>

        <div class="about__side" data-fit>
          <h3 class="about__h t-mono">Experience</h3>
          <div v-for="job in timeline" :key="job.date" class="ticket">
            <div class="ticket__main">
              <span class="t-mono ticket__date">{{ job.date }}</span>
              <strong class="ticket__role t-display">{{ job.role }}</strong>
              <span class="ticket__co">{{ job.company }}</span>
            </div>
            <div class="ticket__stub t-mono">{{ job.badge }}</div>
          </div>

          <h3 class="about__h t-mono" style="margin-top: 40px">Off the clock <span class="about__tap">(tap to flip)</span></h3>
          <div class="facts">
            <button
              v-for="(f, i) in facts"
              :key="f.front"
              class="fact"
              :class="{ 'is-flipped': flipped[i] }"
              :style="{ '--c': f.color }"
              data-cursor="flip"
              :aria-pressed="flipped[i]"
              @click="flip(i)"
            >
              <span class="fact__face fact__front"><span class="fact__emoji">{{ f.emoji }}</span><span class="t-display">{{ f.front }}</span></span>
              <span class="fact__face fact__back">{{ f.back }}</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import { track } from '@vercel/analytics'

const { blip } = useSound()

const bio = [
  "I got into engineering because I love building things — taking what exists, pushing it further, and watching complexity fold into something that just works. There's a satisfaction in that I haven't found anywhere else.",
  "The problems I'm drawn to are the genuinely hard ones: real scale, real users, real consequences if you get it wrong. I've built systems thousands of people depend on daily. That weight keeps me honest. Every problem is solvable — the question is which solution fits the people who actually have to live with it.",
  "Frontend is home — it's where I've spent most of my career, sweating the details that make a screen feel calm instead of chaotic. My speciality is enterprise platforms: the big, permission-heavy, workflow-shaped systems most people find scary. These days I work across the full stack too — understanding the whole system is what makes the interfaces I build hold up under real-world pressure.",
  "Lately I've been taking bioinformatics courses. Genetic code fascinates me — four letters, billions of lines, not a single comment — and the place where biology meets software is exactly where I'd love to build next.",
]

const timeline = [
  { role: 'Software Developer', company: 'Encentral Solutions · frontend → full-stack', date: 'Nov 2022 — Now', badge: 'Current' },
  { role: 'Frontend Engineer Intern', company: 'Encentral Solutions', date: 'Apr 2022 — Nov 2022', badge: 'Level 1' },
]

const facts = [
  { emoji: '🧩', front: 'Puzzles', back: 'Word puzzles and card puzzles, any day. Same brain I debug with — always hunting for the pattern.', color: 'var(--pop2)' },
  { emoji: '📺', front: 'K-variety', back: 'Korean variety shows are my comfort watch. No notes.', color: 'var(--pop)' },
  { emoji: '💬', front: 'Long talks', back: "Usually deep in a conversation that went longer than anyone expected.", color: 'var(--pop3)' },
]
const flipped = ref(facts.map(() => false))
function flip(i: number) {
  flipped.value[i] = !flipped.value[i]
  blip(flipped.value[i] ? 660 : 440, 0.07, 'triangle', 0.05)
}
</script>

<style scoped>
.about { background: var(--paper); color: var(--ink); border-top: 3px solid var(--ink); }
.about__top { display: flex; justify-content: space-between; align-items: flex-end; gap: 24px; flex-wrap: wrap; }
.about__title { font-size: clamp(56px, 8.5vw, 150px); }
.about__title em { color: var(--bg); }

.about__grid { display: grid; grid-template-columns: 1.2fr 1fr; gap: clamp(40px, 6vw, 100px); margin-top: clamp(48px, 6vw, 80px); }
.about__p { font-size: clamp(17px, 1.35vw, 20px); line-height: 1.6; margin-bottom: 22px; }
.about__p:first-child::first-letter { float: left; font-weight: 800; font-size: 4.2em; line-height: 0.8; margin: 6px 10px 0 0; color: var(--bg); }

.quote { margin: 36px 0 0; padding: 28px; background: var(--bg); color: var(--on-bg); transform: rotate(-1deg); }
.quote .t-serif { font-size: clamp(24px, 2.2vw, 34px); line-height: 1.15; }
.quote cite { display: block; margin-top: 12px; font-size: 11px; font-style: normal; opacity: 0.8; }
.quote__mine { margin-top: 20px; padding-top: 18px; border-top: 2px dashed currentColor; font-size: 16px; line-height: 1.5; }

.about__h { font-size: 11px; font-weight: 800; margin-bottom: 14px; }
.about__tap { opacity: 0.5; }

.ticket { display: flex; border: 3px solid var(--ink); border-radius: 16px; background: #fff; box-shadow: var(--shadow); margin-bottom: 14px; overflow: hidden; }
.ticket__main { flex: 1; padding: 18px 20px; display: flex; flex-direction: column; gap: 6px; }
.ticket__date { font-size: 10px; opacity: 0.6; }
.ticket__role { font-size: clamp(28px, 2.6vw, 40px); }
.ticket__co { font-size: 14px; }
.ticket__stub {
  writing-mode: vertical-rl; transform: rotate(180deg);
  display: grid; place-items: center; padding: 12px 10px;
  border-right: 3px dashed var(--ink);
  background: var(--pop2); font-size: 10px; font-weight: 800;
}

.facts { display: grid; grid-template-columns: repeat(3, 1fr); gap: 12px; }
.fact { position: relative; aspect-ratio: 3 / 4; perspective: 800px; background: none; border: none; padding: 0; }
.fact__face {
  position: absolute; inset: 0;
  display: flex; flex-direction: column; justify-content: space-between;
  padding: 14px;
  border: 3px solid var(--ink); border-radius: 16px;
  backface-visibility: hidden;
  transition: transform 0.7s var(--ease-bounce);
  text-align: left;
}
.fact__front { background: var(--c); box-shadow: 4px 4px 0 var(--ink); }
.fact__front .t-display { font-size: clamp(16px, 1.6vw, 26px); line-height: 0.9; overflow-wrap: anywhere; }
.fact__emoji { font-size: 34px; }
.fact__back { background: var(--ink); color: var(--paper); transform: rotateY(180deg); font-size: 13px; line-height: 1.4; justify-content: center; }
.fact.is-flipped .fact__front { transform: rotateY(-180deg); }
.fact.is-flipped .fact__back { transform: rotateY(0); }

@media (min-width: 900px) and (min-height: 560px) {
  .about { width: max-content; }
  .about .wrap { height: 100%; display: flex; align-items: center; gap: 5vw; }
  .about__top { width: 26vw; flex-shrink: 0; flex-direction: column; align-items: flex-start; gap: 4vh; }
  .about__title { font-size: min(7.5vw, 13vh); }
  .about__grid { display: flex; align-items: center; gap: 4vw; margin-top: 0; }
  .about__bio { width: 82vw; flex-shrink: 0; column-count: 3; column-gap: 3vw; }
  .about__p { font-size: min(16px, 2.15vh); margin-bottom: 1.8vh; break-inside: avoid; }
  .quote { margin-top: 0; break-inside: avoid; padding: 2.4vh 22px; }
  .quote .t-serif { font-size: min(1.9vw, 3.2vh); }
  .about__side { width: 30vw; flex-shrink: 0; }
  .ticket { margin-bottom: 1.2vh; }
  .ticket__main { padding: 1vh 16px; gap: 0.3vh; }
  .ticket__role { font-size: min(2vw, 3.3vh); }
  .ticket__co { font-size: min(13px, 1.9vh); }
  .about__h[style] { margin-top: 2.4vh !important; }
  .about__h { margin-bottom: 1vh; }
  .about { padding-bottom: 110px; }
  .facts { grid-template-columns: repeat(3, minmax(0, 1fr)); gap: 10px; }
  .fact { aspect-ratio: 1 / 1.05; }
  .fact__face { padding: 1.4vh 12px; }
  .fact__emoji { font-size: min(30px, 4vh); }
  .fact__front .t-display { font-size: min(1.5vw, 2.7vh); }
  .fact__back { font-size: min(12px, 1.8vh); line-height: 1.3; }
}

@media (max-width: 900px) {
  .about__grid { grid-template-columns: 1fr; }
}
@media (max-width: 480px) {
  .fact__back { font-size: 11px; padding: 10px; }
}
</style>
