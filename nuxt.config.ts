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
    preference: "dark",
    fallback: "dark",
  },

  app: {
    head: {
      title: "Opeoluwa Ayodeji — rachycodes | Frontend Engineer",
      htmlAttrs: { lang: "en" },
      meta: [
        { charset: "utf-8" },
        { name: "viewport", content: "width=device-width, initial-scale=1" },
        { name: "description", content: "Frontend Engineer building enterprise systems that handle real complexity — then make them feel effortless to use." },
        { name: "theme-color", content: "#F5F5F0" },
        { property: "og:title", content: "Opeoluwa Ayodeji — rachycodes" },
        { property: "og:description", content: "Frontend Engineer building enterprise systems that handle real complexity — then make them feel effortless to use." },
        { property: "og:image", content: "https://rachycodes.tech/og-image.png" },
        { property: "og:url", content: "https://rachycodes.tech" },
        { property: "og:type", content: "website" },
        { name: "twitter:card", content: "summary_large_image" },
        { name: "twitter:title", content: "Opeoluwa Ayodeji — rachycodes" },
        { name: "twitter:description", content: "Frontend Engineer building enterprise systems that handle real complexity — then make them feel effortless to use." },
        { name: "twitter:image", content: "https://rachycodes.tech/og-image.png" },
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
        // Google Analytics 4
        // Replace GA_MEASUREMENT_ID with your actual Google Analytics 4 Measurement ID from analytics.google.com
        ...((process as any).env.NODE_ENV === 'production' ? [
          {
            src: 'https://www.googletagmanager.com/gtag/js?id=GA_MEASUREMENT_ID',
            async: true,
            tagPosition: 'head' as const,
          },
          {
            innerHTML: `
              window.dataLayer = window.dataLayer || [];
              function gtag(){dataLayer.push(arguments);}
              gtag('js', new Date());
              gtag('config', 'GA_MEASUREMENT_ID');
            `,
            type: 'text/javascript',
            tagPosition: 'head' as const,
          },
        ] : []),
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
  runtimeConfig: {
    public: {
      supabaseUrl: process.env.SUPABASE_URL ?? '',
      supabaseAnonKey: process.env.SUPABASE_ANON_KEY ?? '',
    },
  },
});
