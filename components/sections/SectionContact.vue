<template>
  <section id="contact" class="relative w-full px-6 md:px-24 py-24 md:py-40">
    <div class="max-w-site mx-auto">
      <!-- Section Header -->
      <div ref="headerRef">
        <SectionHeader tag="03 CONTACT" alignment="center">
          Let's work<br />
          <span class="italic">together.</span>
        </SectionHeader>
      </div>

      <!-- Content -->
      <div ref="contentRef" class="mt-12 md:mt-20 text-center max-w-2xl mx-auto">
        <p class="font-sans text-base md:text-lg text-txt-secondary leading-relaxed">
          I'm always open to discussing new projects, creative ideas,
          or opportunities to be part of something great. Let's connect
          and build something meaningful.
        </p>

        <!-- Email CTA -->
        <div class="mt-10">
          <a
            href="mailto:your.email@example.com"
            class="inline-flex items-center gap-3 px-10 py-4 bg-txt-primary text-bg-base rounded-full font-sans text-sm md:text-base font-medium tracking-wide transition-smooth hover:opacity-80"
          >
            <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
              <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/>
              <polyline points="22,6 12,13 2,6"/>
            </svg>
            Say Hello
          </a>
        </div>

        <!-- Social Links -->
        <div ref="socialsRef" class="mt-12 flex items-center justify-center gap-6 md:gap-8">
          <a
            v-for="social in socials"
            :key="social.label"
            :href="social.url"
            target="_blank"
            rel="noopener noreferrer"
            class="group flex items-center gap-2 font-sans text-sm text-txt-secondary transition-smooth hover:text-accent"
          >
            <span class="w-8 h-8 rounded-full border border-line flex items-center justify-center transition-smooth group-hover:border-accent group-hover:bg-accent-dim">
              <component :is="social.icon" />
            </span>
            <span class="hidden md:inline font-medium">{{ social.label }}</span>
          </a>
        </div>
      </div>

      <!-- Footer -->
      <div class="mt-24 md:mt-32 pt-8 border-t border-line flex flex-col md:flex-row items-center justify-between gap-4 text-txt-muted">
        <span class="font-mono text-[10px] tracking-widest">
          © {{ new Date().getFullYear() }} OPEOLUWA AYODEJI
        </span>
        <span class="font-mono text-[10px] tracking-widest">
          BUILT WITH NUXT & VUE
        </span>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import { ref, onMounted, h } from 'vue'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger)
}

const headerRef = ref<HTMLElement | null>(null)
const contentRef = ref<HTMLElement | null>(null)
const socialsRef = ref<HTMLElement | null>(null)

// SVG icon components
const GitHubIcon = {
  render: () => h('svg', {
    xmlns: 'http://www.w3.org/2000/svg',
    width: '14', height: '14',
    viewBox: '0 0 24 24',
    fill: 'none', stroke: 'currentColor',
    'stroke-width': '1.5', 'stroke-linecap': 'round', 'stroke-linejoin': 'round',
  }, [
    h('path', { d: 'M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22' })
  ])
}

const LinkedInIcon = {
  render: () => h('svg', {
    xmlns: 'http://www.w3.org/2000/svg',
    width: '14', height: '14',
    viewBox: '0 0 24 24',
    fill: 'none', stroke: 'currentColor',
    'stroke-width': '1.5', 'stroke-linecap': 'round', 'stroke-linejoin': 'round',
  }, [
    h('path', { d: 'M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z' }),
    h('rect', { x: '2', y: '9', width: '4', height: '12' }),
    h('circle', { cx: '4', cy: '4', r: '2' }),
  ])
}

const TwitterIcon = {
  render: () => h('svg', {
    xmlns: 'http://www.w3.org/2000/svg',
    width: '14', height: '14',
    viewBox: '0 0 24 24',
    fill: 'none', stroke: 'currentColor',
    'stroke-width': '1.5', 'stroke-linecap': 'round', 'stroke-linejoin': 'round',
  }, [
    h('path', { d: 'M4 4l11.733 16h4.267l-11.733 -16h-4.267z' }),
    h('path', { d: 'M4 20l6.768 -6.768m2.46 -2.46l6.772 -6.772' }),
  ])
}

const socials = [
  { label: 'GitHub', url: 'https://github.com/', icon: GitHubIcon },
  { label: 'LinkedIn', url: 'https://linkedin.com/', icon: LinkedInIcon },
  { label: 'Twitter / X', url: 'https://x.com/', icon: TwitterIcon },
]

onMounted(() => {
  setTimeout(() => {
    ScrollTrigger.refresh()

    const els = [
      { el: headerRef.value, delay: 0 },
      { el: contentRef.value, delay: 0.15 },
      { el: socialsRef.value, delay: 0.3 },
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
