<template>
  <section id="about" class="relative w-full px-6 md:px-24 py-24 md:py-40 bg-bg-surface">
    <div class="max-w-site mx-auto">
      <!-- Section Header -->
      <div ref="headerRef">
        <SectionHeader tag="02 ABOUT" show-divider>
          Designing with<br />
          <span class="italic">purpose.</span>
        </SectionHeader>
      </div>

      <!-- Content Grid -->
      <div class="mt-16 md:mt-24 grid grid-cols-1 md:grid-cols-2 gap-12 md:gap-24">
        <!-- Left: Bio -->
        <div ref="bioRef" class="space-y-6">
          <p class="font-sans text-base md:text-lg text-txt-secondary leading-relaxed">
            I'm Ayodeji — a Frontend Engineer who bridges the gap between
            design and engineering. I build reactive systems that translate
            intricate data into seamless user experiences.
          </p>
          <p class="font-sans text-base md:text-lg text-txt-secondary leading-relaxed">
            My experience spans building scalable web applications with Vue &amp; Nuxt,
            optimizing performance for high-traffic platforms, and crafting
            interactions that feel natural and human.
          </p>
          <p class="font-sans text-base md:text-lg text-txt-secondary leading-relaxed">
            I balance the rigor of creativity with the precision and agility of
            modern software engineering, creating web environments that feel
            organic, high-end, and purpose-built for global impact.
          </p>

          <!-- Resume Link -->
          <div class="pt-4">
            <a
              href="#"
              target="_blank"
              rel="noopener noreferrer"
              class="inline-flex items-center gap-3 px-6 py-3 border border-line rounded-full font-sans text-sm font-medium tracking-wide transition-smooth hover:bg-txt-primary hover:text-bg-base hover:border-txt-primary"
            >
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
                <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/>
                <polyline points="7 10 12 15 17 10"/>
                <line x1="12" y1="15" x2="12" y2="3"/>
              </svg>
              Download Resume
            </a>
          </div>
        </div>

        <!-- Right: Stats + Experience -->
        <div ref="statsRef" class="space-y-12">
          <!-- Stats -->
          <div class="grid grid-cols-2 gap-6">
            <div class="glass-card p-6 md:p-8">
              <span class="font-display text-4xl md:text-5xl block mb-2">3+</span>
              <span class="mono-tag">Years Experience</span>
            </div>
            <div class="glass-card p-6 md:p-8">
              <span class="font-display text-4xl md:text-5xl block mb-2">20+</span>
              <span class="mono-tag">Projects Shipped</span>
            </div>
            <div class="glass-card p-6 md:p-8 col-span-2">
              <span class="font-display text-4xl md:text-5xl block mb-2">Vue &amp; Nuxt</span>
              <span class="mono-tag">Core Specialization</span>
            </div>
          </div>

          <!-- Experience Table -->
          <div>
            <h3 class="mono-tag mb-6">{ EXPERIENCE }</h3>
            <div class="border-t border-line">
              <ExperienceItem
                role="Frontend Engineer"
                company="Company Name"
                period="2022 → NOW"
              />
              <ExperienceItem
                role="Frontend Developer"
                company="Company Name"
                period="2021 → 2022"
              />
              <ExperienceItem
                role="Web Developer"
                company="Company Name"
                period="2020 → 2021"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger)
}

const headerRef = ref<HTMLElement | null>(null)
const bioRef = ref<HTMLElement | null>(null)
const statsRef = ref<HTMLElement | null>(null)

onMounted(() => {
  setTimeout(() => {
    ScrollTrigger.refresh()

    const els = [
      { el: headerRef.value, delay: 0 },
      { el: bioRef.value, delay: 0.15 },
      { el: statsRef.value, delay: 0.3 },
    ]

    els.forEach(({ el, delay }) => {
      if (!el) return
      gsap.set(el, { opacity: 0, y: 50 })
      gsap.to(el, {
        opacity: 1,
        y: 0,
        duration: 0.9,
        ease: 'power3.out',
        delay,
        scrollTrigger: {
          trigger: el,
          start: 'top 85%',
          toggleActions: 'play none none none',
        },
      })
    })
  }, 500)
})
</script>
