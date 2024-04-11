// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  devtools: { enabled: true },

  modules: ["@nuxthub/core",  "@nuxt/ui", '@pinia/nuxt'],

  hub: {
    database : true
  }
})