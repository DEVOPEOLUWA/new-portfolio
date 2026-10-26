<template>
  <section id="work" class="work">
    <header class="work__head section-pad wrap">
      <span class="chip">Selected work · 0{{ projects.length }}</span>
      <h2 class="work__title t-display">
        Big systems,<br />
        <em class="t-serif">small</em> friction.
      </h2>
      <p class="work__sub">
        Government and fintech platforms used by thousands of people every day. Each card is a case study —
        open one up.
      </p>
    </header>

    <div class="stack">
      <article
        v-for="(p, i) in projects"
        :key="p.slug"
        :ref="(el) => { if (el) cardRefs[i] = el as HTMLElement }"
        class="pcard"
        :style="{ '--brand': p.brandColor, top: `calc(var(--nav-h) + var(--frame) + 20px + ${i * 22}px)` }"
      >
        <NuxtLink :to="`/projects/${p.slug}`" class="pcard__inner" data-cursor="open" @click="track('Case study opened', { project: p.slug })">
          <div class="pcard__info">
            <div class="pcard__top">
              <span class="pcard__num t-display">0{{ i + 1 }}</span>
              <span class="chip">{{ p.category }}</span>
            </div>
            <h3 class="pcard__name t-display">{{ p.name }}</h3>
            <p class="pcard__desc">{{ p.descriptor }}</p>
            <ul class="pcard__tags">
              <li v-for="t in p.tags" :key="t" class="chip chip--dark">{{ t }}</li>
            </ul>
            <div class="pcard__stat">
              <span class="t-display">{{ p.stats[0].value }}</span>
              <span class="t-mono">{{ p.stats[0].label }}</span>
            </div>
            <span class="btn pcard__btn">Read the case study <span aria-hidden="true">→</span></span>
          </div>

          <div class="pcard__shot">
            <div class="browser">
              <div class="browser__bar"><i /><i /><i /><span class="t-mono">rachycodes.tech/projects/{{ p.slug }}</span></div>
              <img :src="p.image" :alt="`${p.name} interface`" loading="lazy" />
            </div>
          </div>
        </NuxtLink>
      </article>
    </div>
  </section>
</template>

<script setup lang="ts">
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { track } from '@vercel/analytics'
import { projects } from '~/data/projects'

const cardRefs = ref<HTMLElement[]>([])
let triggers: ScrollTrigger[] = []

onMounted(() => {
  gsap.registerPlugin(ScrollTrigger)
  // As the next card slides over, the one underneath shrinks and dims a touch
  cardRefs.value.forEach((card, i) => {
    const next = cardRefs.value[i + 1]
    if (!next) return
    triggers.push(ScrollTrigger.create({
      trigger: next,
      start: 'top bottom',
      end: 'top 20%',
      scrub: true,
      animation: gsap.to(card.querySelector('.pcard__inner'), { scale: 0.92, rotate: i % 2 ? 1.5 : -1.5, filter: 'brightness(0.75)', ease: 'none' }),
    }))
  })
  cardRefs.value.forEach((card) => {
    triggers.push(ScrollTrigger.create({
      trigger: card,
      start: 'top 85%',
      once: true,
      onEnter: () => gsap.fromTo(card.querySelector('.browser'), { y: 120, rotate: 8 }, { y: 0, rotate: 3, duration: 1.2, ease: 'expo.out' }),
    }))
  })
})

onUnmounted(() => triggers.forEach((t) => t.kill()))
</script>

<style scoped>
.work { background: var(--bg); border-top: 3px solid var(--ink); padding-bottom: clamp(80px, 10vw, 140px); }
.work__head { padding-bottom: 48px; }
.work__title { font-size: clamp(64px, 10vw, 170px); color: var(--on-bg); margin-top: 24px; }
.work__title em { color: var(--hi); font-size: 1.05em; }
.work__sub { max-width: 520px; margin-top: 24px; font-size: clamp(17px, 1.4vw, 20px); line-height: 1.5; color: var(--on-bg); }

.stack { padding: 0 clamp(14px, 4vw, 56px); display: flex; flex-direction: column; gap: 10vh; }
.pcard { position: sticky; max-width: 1440px; width: 100%; margin: 0 auto; }
.pcard__inner {
  display: grid; grid-template-columns: 1fr 1.15fr;
  min-height: min(76vh, 720px);
  background: var(--brand);
  color: #fff6ea;
  border: 3px solid var(--ink);
  border-radius: 28px;
  box-shadow: var(--shadow-lg);
  overflow: hidden;
  text-decoration: none;
  transform-origin: center top;
}
.pcard__info { display: flex; flex-direction: column; padding: clamp(24px, 3.5vw, 52px); gap: 18px; }
.pcard__top { display: flex; align-items: center; justify-content: space-between; gap: 12px; }
.pcard__num { font-size: clamp(56px, 6vw, 96px); color: transparent; -webkit-text-stroke: 2px #fff6ea; }
.pcard__name { font-size: clamp(40px, 4.6vw, 76px); }
.pcard__desc { font-size: clamp(16px, 1.25vw, 19px); line-height: 1.5; max-width: 480px; opacity: 0.88; }
.pcard__tags { display: flex; flex-wrap: wrap; gap: 8px; list-style: none; padding: 0; margin: 0; }
.chip--dark { background: rgba(0, 0, 0, 0.25); color: #fff6ea; border-color: rgba(255, 246, 234, 0.5); }
.pcard__stat { display: flex; align-items: baseline; gap: 12px; margin-top: auto; }
.pcard__stat .t-display { font-size: clamp(48px, 5vw, 80px); color: var(--pop2); }
.pcard__stat .t-mono { font-size: 11px; opacity: 0.8; }
.pcard__btn { align-self: flex-start; }
.pcard__inner:hover .pcard__btn { transform: translate(-2px, -2px); box-shadow: 7px 7px 0 var(--ink); }

.pcard__shot { position: relative; display: flex; align-items: center; justify-content: center; padding: 32px; overflow: hidden; background: radial-gradient(circle at 60% 40%, rgba(255, 255, 255, 0.16), transparent 60%); }
.browser {
  width: 108%;
  background: #fff6ea;
  border: 3px solid var(--ink);
  border-radius: 16px;
  box-shadow: 10px 10px 0 var(--ink);
  overflow: hidden;
  transform: rotate(3deg);
  transition: transform 0.6s var(--ease-out);
}
.pcard__inner:hover .browser { transform: rotate(0deg) scale(1.03) !important; }
.browser__bar { display: flex; align-items: center; gap: 6px; padding: 10px 14px; border-bottom: 3px solid var(--ink); background: var(--paper); color: var(--ink); }
.browser__bar i { width: 12px; height: 12px; border-radius: 50%; border: 2px solid var(--ink); background: var(--pop); }
.browser__bar i:nth-child(2) { background: var(--pop3); }
.browser__bar i:nth-child(3) { background: var(--pop2); }
.browser__bar span { margin-left: 10px; font-size: 10px; opacity: 0.6; text-transform: none; }
.browser img { display: block; width: 100%; aspect-ratio: 16 / 10; object-fit: cover; object-position: top left; }

@media (max-width: 900px) {
  .pcard__inner { grid-template-columns: 1fr; min-height: 0; }
  .pcard__shot { order: -1; padding: 20px 20px 0; }
  .browser { width: 100%; }
  .stack { gap: 6vh; }
}
</style>
