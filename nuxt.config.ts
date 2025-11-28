// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: "2025-07-15",
  devtools: { enabled: true },
  modules: ["@nuxt/hints", "@nuxt/ui", "@nuxt/eslint", "@pinia/nuxt"],
  css: ["~/assets/css/main.css"],
  runtimeConfig: {
    public: {
      apiBaseUrl: import.meta.env.NUXT_APP_API_URL || "http://localhost:3022",
      imagesBaseUrl: import.meta.env.NUXT_APP_IMAGES_BASE_URL || "http://localhost:3022",
    },
  },
});
