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
      title: "Opeoluwa Ayodeji | Frontend Engineer",
      meta: [
        { charset: "utf-8" },
        { name: "viewport", content: "width=device-width, initial-scale=1" },
        {
          name: "description",
          content: "Frontend Engineer specializing in enterprise applications",
        },
      ],
      link: [
        {
          rel: "stylesheet",
          href: "https://fonts.googleapis.com/css2?family=Cormorant:wght@400;600;700&display=swap",
        },

        {
          rel: "stylesheet",
          href: "https://fonts.googleapis.com/css2?family=Work+Sans:wght@400;500;600&display=swap",
        },

        {
          rel: "stylesheet",
          href: "https://fonts.googleapis.com/css2?family=JetBrains+Mono:wght@400;600&display=swap",
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
