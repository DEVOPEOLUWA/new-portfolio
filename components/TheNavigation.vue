<template>
  <header
    ref="navRef"
    class="fixed top-0 left-0 right-0 z-50 transition-all duration-500"
    :class="[scrolled ? 'nav-blur border-b border-line' : '']"
  >
    <div class="max-w-site mx-auto px-6 md:px-24 h-20 flex items-center justify-between">
      <!-- Logo -->
      <a
        href="#"
        ref="logoRef"
        class="logo-link group relative flex items-center gap-0.5"
        @click.prevent="scrollToTop"
        @mouseenter="replayLogo"
      >
        <!-- The O -->
        <span class="logo-char font-display text-2xl md:text-3xl tracking-tight" ref="logoO">O</span>
        <!-- The dot -->
        <span class="logo-dot w-1.5 h-1.5 md:w-2 md:h-2 rounded-full bg-accent inline-block self-end mb-1.5 md:mb-2 mx-[2px]" ref="logoDot" />
        <!-- The A -->
        <span class="logo-char font-display text-2xl md:text-3xl tracking-tight italic" ref="logoA">A</span>
        <!-- Cursor blink -->
        <span class="logo-cursor w-[2px] h-5 md:h-6 bg-accent self-end mb-1 ml-0.5 opacity-0" ref="logoCursor" />
      </a>

      <!-- Desktop Navigation -->
      <nav class="hidden md:flex items-center gap-10">
        <a
          v-for="link in navLinks"
          :key="link.id"
          :href="`#${link.id}`"
          class="nav-link group flex items-center gap-2"
          @click.prevent="scrollToSection(link.id)"
          @mouseenter="link.hovered = true"
          @mouseleave="link.hovered = false"
        >
          <span class="font-mono text-[10px] tracking-widest text-txt-muted italic transition-all duration-300 group-hover:text-accent group-hover:-translate-y-0.5">{{ link.number }}</span>
          <span class="nav-label-wrap">
            <span class="nav-label font-sans text-sm font-medium tracking-wide" :class="{ 'slide-up': link.hovered }">
              {{ link.label }}
            </span>
            <span class="nav-label-hover font-sans text-sm font-medium tracking-wide text-accent" :class="{ 'slide-up': link.hovered }">
              {{ link.hoverLabel }}
            </span>
          </span>
        </a>

        <!-- Theme Toggle -->
        <button
          @click="toggleTheme"
          class="w-9 h-9 rounded-full border border-line flex items-center justify-center transition-smooth hover:border-accent hover:text-accent"
          aria-label="Toggle theme"
        >
          <svg v-if="isDark" xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
            <circle cx="12" cy="12" r="5"/>
            <line x1="12" y1="1" x2="12" y2="3"/>
            <line x1="12" y1="21" x2="12" y2="23"/>
            <line x1="4.22" y1="4.22" x2="5.64" y2="5.64"/>
            <line x1="18.36" y1="18.36" x2="19.78" y2="19.78"/>
            <line x1="1" y1="12" x2="3" y2="12"/>
            <line x1="21" y1="12" x2="23" y2="12"/>
            <line x1="4.22" y1="19.78" x2="5.64" y2="18.36"/>
            <line x1="18.36" y1="5.64" x2="19.78" y2="4.22"/>
          </svg>
          <svg v-else xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
            <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"/>
          </svg>
        </button>
      </nav>

      <!-- Mobile Hamburger -->
      <button
        class="md:hidden flex flex-col gap-1.5 p-2"
        @click="mobileOpen = !mobileOpen"
        aria-label="Toggle menu"
      >
        <span
          class="block w-6 h-px bg-txt-primary transition-all duration-300"
          :class="{ 'rotate-45 translate-y-[4px]': mobileOpen }"
        />
        <span
          class="block w-6 h-px bg-txt-primary transition-all duration-300"
          :class="{ '-rotate-45 -translate-y-[3px]': mobileOpen, 'opacity-100': !mobileOpen }"
        />
      </button>
    </div>

    <!-- Mobile Drawer -->
    <Transition name="drawer">
      <div
        v-if="mobileOpen"
        class="md:hidden absolute top-20 left-0 right-0 border-b border-line nav-blur"
      >
        <nav class="flex flex-col px-6 py-8 gap-6">
          <a
            v-for="link in navLinks"
            :key="link.id"
            :href="`#${link.id}`"
            class="flex items-center gap-3 transition-smooth hover:text-accent"
            @click.prevent="scrollToSection(link.id); mobileOpen = false"
          >
            <span class="font-mono text-[10px] tracking-widest text-txt-muted italic">{{ link.number }}</span>
            <span class="font-sans text-lg font-medium">{{ link.label }}</span>
          </a>

          <button
            @click="toggleTheme"
            class="mt-4 px-4 py-2 border border-line rounded-full text-sm font-sans transition-smooth self-start"
          >
            {{ isDark ? '☀ Light Mode' : '☾ Dark Mode' }}
          </button>
        </nav>
      </div>
    </Transition>
  </header>
</template>

<script setup lang="ts">
import { ref, reactive, onMounted, onUnmounted, nextTick } from 'vue'
import { gsap } from 'gsap'
import { useTheme } from '~/composables/useTheme'
import { useLenis } from '~/composables/useLenis'

const { isDark, toggleTheme } = useTheme()
const { scrollTo } = useLenis()

const scrolled = ref(false)
const mobileOpen = ref(false)

// Logo refs
const logoRef = ref<HTMLElement | null>(null)
const logoO = ref<HTMLElement | null>(null)
const logoDot = ref<HTMLElement | null>(null)
const logoA = ref<HTMLElement | null>(null)
const logoCursor = ref<HTMLElement | null>(null)
let logoPlayed = false

const navLinks = reactive([
  { number: '01', label: 'Projects', hoverLabel: 'Works', id: 'projects', hovered: false },
  { number: '02', label: 'About', hoverLabel: 'Story', id: 'about', hovered: false },
  { number: '03', label: 'Contact', hoverLabel: 'Say Hi', id: 'contact', hovered: false },
])

const scrollToSection = (id: string) => {
  scrollTo(`#${id}`, { offset: -80, duration: 1.5 })
}

const scrollToTop = () => {
  scrollTo(0, { duration: 1.5 })
}

const onScroll = () => {
  scrolled.value = window.scrollY > 50
}

const playLogoTypewriter = () => {
  if (!logoO.value || !logoDot.value || !logoA.value || !logoCursor.value) return

  const tl = gsap.timeline()

  // Reset
  gsap.set([logoO.value, logoDot.value, logoA.value], {
    opacity: 0, y: 8, scale: 0.8, filter: 'blur(4px)',
  })
  gsap.set(logoCursor.value, { opacity: 1 })

  // Cursor appears + blinks
  tl.to(logoCursor.value, {
    opacity: 1,
    duration: 0.15,
  }, 0)

  // "O" types in
  tl.to(logoO.value, {
    opacity: 1, y: 0, scale: 1, filter: 'blur(0px)',
    duration: 0.25, ease: 'power3.out',
  }, 0.2)

  // Dot punches in
  tl.to(logoDot.value, {
    opacity: 1, y: 0, scale: 1.3, filter: 'blur(0px)',
    duration: 0.15, ease: 'back.out(3)',
  }, 0.45)
  tl.to(logoDot.value, {
    scale: 1, duration: 0.2, ease: 'power2.out',
  }, 0.6)

  // "A" types in
  tl.to(logoA.value, {
    opacity: 1, y: 0, scale: 1, filter: 'blur(0px)',
    duration: 0.25, ease: 'power3.out',
  }, 0.65)

  // Cursor blinks then fades
  tl.to(logoCursor.value, {
    opacity: 0,
    duration: 0.15,
    repeat: 3,
    yoyo: true,
    ease: 'steps(1)',
  }, 0.9)
  tl.to(logoCursor.value, {
    opacity: 0,
    duration: 0.3,
  }, 1.6)
}

const replayLogo = () => {
  playLogoTypewriter()
}

onMounted(async () => {
  window.addEventListener('scroll', onScroll, { passive: true })
  await nextTick()
  // Slight delay so it plays after nav mounts
  setTimeout(playLogoTypewriter, 300)
})

onUnmounted(() => {
  window.removeEventListener('scroll', onScroll)
})
</script>

<style scoped>
.drawer-enter-active,
.drawer-leave-active {
  transition: all 0.35s cubic-bezier(0.15, 0.9, 0.25, 1);
}
.drawer-enter-from,
.drawer-leave-to {
  opacity: 0;
  transform: translateY(-12px);
}

/* Nav link hover — text slides up to reveal alternate label */
.nav-label-wrap {
  position: relative;
  display: inline-flex;
  flex-direction: column;
  height: 1.25em;
  overflow: hidden;
}

.nav-label,
.nav-label-hover {
  display: block;
  transition: transform 0.35s cubic-bezier(0.25, 0.46, 0.45, 0.94);
  line-height: 1.25em;
}

.nav-label-hover {
  position: absolute;
  top: 100%;
  left: 0;
}

.nav-label.slide-up {
  transform: translateY(-100%);
}

.nav-label-hover.slide-up {
  transform: translateY(-100%);
}

/* Subtle link hover effects */
.nav-link {
  position: relative;
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
}

.nav-link::after {
  content: '';
  position: absolute;
  bottom: -4px;
  left: 0;
  width: 0;
  height: 1px;
  background: var(--accent);
  transition: width 0.35s cubic-bezier(0.25, 0.46, 0.45, 0.94);
}

.nav-link:hover::after {
  width: 100%;
}

/* Logo styles */
.logo-link {
  transition: all 0.3s ease;
}

.logo-char {
  display: inline-block;
  will-change: transform, opacity, filter;
}

.logo-dot {
  will-change: transform, opacity;
  transition: background-color 0.3s ease;
}

.logo-link:hover .logo-dot {
  box-shadow: 0 0 8px var(--accent);
}

.logo-cursor {
  will-change: opacity;
}
</style>
