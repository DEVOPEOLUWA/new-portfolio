import { defineNuxtConfig } from "nuxt/config";

const description =
  "Frontend-first software developer in Lagos making the web feel like a dream — complex designs built from scratch into enterprise platforms that solve real problems.";

export default defineNuxtConfig({
  modules: [
    "@nuxtjs/tailwindcss",
    "@vueuse/nuxt",
    "@nuxt/image",
    // Vercel Web Analytics + Speed Insights. Turn both on in the Vercel
    // dashboard (Project → Analytics / Speed Insights) — no keys needed.
    "@vercel/analytics/nuxt",
    "@vercel/speed-insights/nuxt",
  ],

  app: {
    head: {
      title: "Opeoluwa Ayodeji — rachycodes | Frontend-first Full-Stack Engineer",
      htmlAttrs: { lang: "en", "data-flavour": "daydream" },
      meta: [
        { charset: "utf-8" },
        { name: "viewport", content: "width=device-width, initial-scale=1" },
        { name: "description", content: description },
        { name: "theme-color", content: "#e4dcff" },
        { property: "og:title", content: "Opeoluwa Ayodeji — rachycodes" },
        { property: "og:description", content: description },
        { property: "og:image", content: "https://rachycodes.tech/og-image.png" },
        { property: "og:url", content: "https://rachycodes.tech" },
        { property: "og:type", content: "website" },
        { name: "twitter:card", content: "summary_large_image" },
        { name: "twitter:title", content: "Opeoluwa Ayodeji — rachycodes" },
        { name: "twitter:description", content: description },
        { name: "twitter:image", content: "https://rachycodes.tech/og-image.png" },
      ],
      link: [
        { rel: "preconnect", href: "https://fonts.googleapis.com" },
        { rel: "preconnect", href: "https://fonts.gstatic.com", crossorigin: "" },
        {
          rel: "stylesheet",
          href: "https://fonts.googleapis.com/css2?family=Bricolage+Grotesque:opsz,wdth,wght@12..96,75..100,200..800&family=Instrument+Serif:ital@0;1&family=Unbounded:wght@400..800&family=Martian+Mono:wdth,wght@75..112,400..800&family=Caveat:wght@600&display=swap",
        },
        { rel: "preload", as: "image", href: "/images/profile.jpg" },
      ],
      script: [
        {
          // Apply the saved flavour before first paint so there's no flash.
          innerHTML: `(function(){try{var f=localStorage.getItem('rachy:flavour');if(f)document.documentElement.setAttribute('data-flavour',f)}catch(e){}})();`,
          tagPosition: "head",
        },
      ],
    },
    pageTransition: { name: "page", mode: "out-in" },
  },

  css: ["~/assets/css/main.css"],
  compatibilityDate: "2025-12-14",
  components: [{ path: "~/components", pathPrefix: false }],
  runtimeConfig: {
    public: {
      supabaseUrl: process.env.SUPABASE_URL ?? "",
      supabaseAnonKey: process.env.SUPABASE_ANON_KEY ?? "",
    },
  },
});
