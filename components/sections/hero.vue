<template>
  <section :style="isDark ? { backgroundColor: '#191919' } : {}" class="relative h-screen w-full flex flex-col justify-center overflow-hidden">
      
    <div class="absolute top-8 right-8 z-50">
        <button 
          @click="toggleTheme" 
          class="w-12 h-12 rounded-full border border-current opacity-20 hover:opacity-100 flex items-center justify-center transition-all duration-300 hover:border-accent hover:text-accent"
        >
          <span v-if="isDark">☀</span>
          <span v-else>☾</span>
        </button>
    </div>

    <div class="w-full h-full grid grid-cols-1 md:grid-cols-12 relative pointer-events-none">

      <div class="col-span-1 md:col-span-5 flex flex-col justify-center px-8 md:pl-24 z-30 pointer-events-auto">
        <div class="space-y-6">
          
          <h1 class="font-serif text-6xl md:text-8xl leading-[0.85] tracking-tight mix-blend-difference text-current min-h-[160px]">
            Opeoluwa<br />
            <span class="italic font-light text-accent">
              {{ typedText }}<span class="animate-pulse">|</span>
            </span>
          </h1>
          
          <div class="h-px w-24 bg-accent opacity-50"></div>

          <div class="animate-fade-up" style="animation-delay: 2s; opacity: 0; animation-fill-mode: forwards;">
             <p class="font-sans font-bold text-sm md:text-base opacity-90 max-w-xs leading-relaxed uppercase tracking-widest text-accent">
               Frontend Engineer
             </p>
             
             <p class="intro-paragraph font-sans text-base md:text-lg opacity-60 max-w-md leading-relaxed pt-4 md:block dark:text-gray-300" style="animation-delay:2.2s; opacity:0; transform:translateY(8px); animation-fill-mode:forwards;">
            I engineer intuitive digital flows and reactive systems that translate intricate data into seamless user experiences. Balancing the rigor of creativity with the precision of agility of modern software engineering, I create web environments that feel organic, high-end, and purpose-built for global impact.
             </p>
          </div>
        </div>
      </div>

      <div class="col-span-1 md:col-span-4 relative h-full flex items-end justify-center z-10 pointer-events-none">
          <div class="relative w-full max-w-md h-[80vh] md:h-[86vh] bottom-[-12%] transition-all duration-700">
            <img 
              src="/images/profile.jpg" 
              alt="Ayodeji Opeoluwa" 
              class="w-full h-full object-cover object-top grayscale contrast-125 brightness-90 dark:brightness-75"
            />
            <div class="absolute bottom-0 w-full h-64 bg-gradient-to-t from-[#F4F4F0] dark:from-[#0a0a0a] to-transparent"></div>
          </div>
      </div>

      <div class="hidden md:flex col-span-3 flex-col justify-center items-start pl-12 z-40 pointer-events-auto">
        <nav class="flex flex-col space-y-8">
          
          <a 
            v-for="(link, index) in navLinks" 
            :key="link.label" 
            href="#" 
            :class="['group flex items-center gap-4 cursor-pointer nav-link', navEntered ? 'entered' : '']"
            :style="{ transitionDelay: `${index * 120}ms` }"
          >
            <!-- <span class="side-line" aria-hidden></span> -->
            <span class="label font-serif text-3xl text-gray-400 dark:text-gray-600 transition-all duration-300">
              {{ link.label }}
            </span>

            <span class="desc font-sans text-xs tracking-widest uppercase text-accent opacity-0 -translate-x-4 transition-all duration-400 delay-75">
                {{ link.desc }}
            </span>
          </a>

        </nav>
      </div>

    </div>

    <div class="absolute bottom-12 left-12 hidden md:block text-accent opacity-60 animate-bounce">
       <span class="text-[10px] tracking-[0.4em] uppercase" style="writing-mode: vertical-rl">Scroll</span>
    </div>

  </section>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { useTheme } from '~/composables/useTheme'

const { isDark, toggleTheme } = useTheme()

// Navigation Data with descriptions
const navLinks = [
  { label: 'About', desc: 'Who I Am' },
  { label: 'Resume', desc: 'My Path' },
  { label: 'Credentials', desc: 'Certifications' },
  { label: 'Inspirations', desc: 'What Drives Me' },
  { label: 'Contact', desc: 'Say Hello' }
]

// Typewriter Logic
const fullText = "Ayodeji"
const typedText = ref("")

// Nav entry state (links slide in from left)
const navEntered = ref(false)

const typeWriter = () => {
  if (typedText.value.length < fullText.length) {
    typedText.value += fullText.charAt(typedText.value.length)
    setTimeout(typeWriter, 150) // Speed of typing (ms)
  }
}

onMounted(() => {
  // Start typing after a short delay
  setTimeout(typeWriter, 500)
  // Trigger nav entry slightly after mount
  setTimeout(() => { navEntered.value = true }, 350)
})
</script>

<style scoped>
/* Define your bright accent color here.
   I used a "Lime Green" (#CCFF00) which looks expensive on black.
   You can change it to Cyan (#00FFFF) or Hot Pink (#FF00FF).
*/
.text-accent {
  color: #EEE4B1;
}

.hover\:border-accent:hover {
  border-color: #EEE4B1;
}

.hover\:text-accent:hover {
  color: #EEE4B1;
}

/* Custom Fade Up Animation for the subtext */
@keyframes fadeUp {
  from { opacity: 0; transform: translateY(20px); }
  to { opacity: 1; transform: translateY(0); }
}

.animate-fade-up {
  animation-name: fadeUp;
  animation-duration: 0.8s;
  animation-timing-function: ease-out;
}

/* Nav link entry and hover styles */
.nav-link {
  transform: translateX(-28px);
  opacity: 0;
  transition: transform 520ms cubic-bezier(.15,.9,.25,1), opacity 360ms ease, color 260ms ease;
}
.nav-link.entered {
  transform: translateX(0);
  opacity: 1;
}
.nav-link .label {
  transition: transform 320ms cubic-bezier(.2,.9,.2,1), color 300ms ease;
}
.nav-link:hover .label {
  transform: translateX(4px);
  color: #EEE4B1; /* Use accent color on hover */
}
.nav-link .desc {
  opacity: 0;
  transform: translateX(-12px);
  transition: transform 340ms cubic-bezier(.2,.9,.2,1), opacity 300ms ease;
}
.nav-link:hover .desc { opacity: 1; transform: translateX(0); }
.nav-link::after {
  content: '';
  display: block;
  height: 2px;
  width: 0%;
  background-color: #EEE4B1; /* Removed gradient */
  transition: width 360ms cubic-bezier(.2,.9,.2,1);
  margin-top: 6px;
}
.nav-link:hover::after { width: 36%; }

/* Side line that grows beside each link for obvious visual activity */
.nav-link .side-line {
  width: 0px;
  height: 28px;
  display: inline-block;
  background-color: #EEE4B1; /* Removed gradient */
  border-radius: 2px;
  transition: width 420ms cubic-bezier(.2,.9,.2,1), opacity 280ms ease;
  opacity: 0.95;
}
.nav-link.entered .side-line { width: 6px; }
.nav-link:hover .side-line { width: 10px; }

/* Slightly soften dark background tone fallback */
.dark-bg-soft { background-color: #191919; }
</style>