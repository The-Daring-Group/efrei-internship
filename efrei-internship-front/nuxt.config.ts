// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  build: {
    transpile: [
      '@fortawesome/vue-fontawesome',
    ],
  },
  devtools: { enabled: true },
  css: [
    '~/assets/css/main.css',
    '@fortawesome/fontawesome-svg-core/styles.css'
  ],
  postcss: {
    plugins: {
      tailwindcss: {},
      autoprefixer: {},
    },
  },
  modules: [
    [
      '@pinia/nuxt',
      {
        autoImports: ['defineStore', 'acceptHMRUpdate', 'type']
      },
    ],
    '@pinia-plugin-persistedstate/nuxt'
  ],
  imports: {
    dirs: ['stores']
  }
})
