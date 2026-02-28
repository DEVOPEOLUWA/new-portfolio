import { defineNuxtConfig } from "nuxt/config";

export default defineNuxtConfig({
  modules: [
    "@nuxtjs/tailwindcss",
    "@vueuse/nuxt",
    "@nuxt/image",
    "@nuxtjs/color-mode",
  ],

  colorMode: {
    classSuffix: "",
    preference: "light",
    fallback: "light",
  },

  app: {
    head: {
      title: "Opeoluwa Ayodeji — Frontend Engineer",
      htmlAttrs: { lang: "en" },
      meta: [
        { charset: "utf-8" },
        { name: "viewport", content: "width=device-width, initial-scale=1" },
        {
          name: "description",
          content:
            "Frontend Engineer crafting intuitive digital experiences with Vue, Nuxt, and modern web technologies.",
        },
        { name: "theme-color", content: "#F5F5F0" },
        { property: "og:title", content: "Opeoluwa Ayodeji — Frontend Engineer" },
        {
          property: "og:description",
          content:
            "Frontend Engineer crafting intuitive digital experiences with Vue, Nuxt, and modern web technologies.",
        },
        { property: "og:type", content: "website" },
      ],
      link: [
        {
          rel: "preconnect",
          href: "https://fonts.googleapis.com",
        },
        {
          rel: "preconnect",
          href: "https://fonts.gstatic.com",
          crossorigin: "",
        },
        {
          rel: "stylesheet",
          href: "https://fonts.googleapis.com/css2?family=Instrument+Serif:ital@0;1&family=Kalnia:wght@300;400;500;600;700&family=Manrope:wght@300;400;500;600;700&family=Space+Mono:wght@400;700&display=swap",
        },
      ],
      style: [
        {
          innerHTML: `
            body:not(.app-ready) { visibility: hidden; }
            body.app-ready { visibility: visible; }
          `,
        },
      ],
      script: [
        {
          innerHTML: `
            (function() {
              var mode = 'light';
              try { mode = localStorage.getItem('nuxt-color-mode') || 'light'; } catch(e) {}
              document.documentElement.style.backgroundColor = mode === 'dark' ? '#0A0A0A' : '#F5F5F0';
              document.documentElement.className = mode;
            })();
          `,
          type: 'text/javascript',
          tagPosition: 'head',
        },
      ],
    },
    pageTransition: { name: "page", mode: "out-in" },
  },

  css: ["~/assets/css/main.css"],
  compatibilityDate: "2025-12-14",
  components: [
    {
      path: "~/components",
      pathPrefix: false,
    },
  ],
});
