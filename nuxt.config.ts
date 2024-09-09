// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2024-04-03',
  devtools: { enabled: true },
  modules: [
    '@nuxtjs/tailwindcss',
    'nuxt-auth-utils',
    '@pinia/nuxt',
    'nuxt-toastify',
    '@nuxt/icon',
  ],

  toastify: {
    autoClose: 3000,
    position: 'top-right',
    theme: 'auto',
  },
})
