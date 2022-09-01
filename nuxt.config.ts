import { defineNuxtConfig } from 'nuxt'

const envTheme = process.env.VITE_VUE_APP_THEME

// https://v3.nuxtjs.org/docs/directory-structure/nuxt.config
export default defineNuxtConfig({
  css: [
    '~/src/assets/library/primeflex.min.css',
    `~/src/assets/themes/${envTheme}/${envTheme}/fonts/fonts.css`,
    `~/src/assets/themes/${envTheme}/${envTheme}.min.css`,
    'primevue/resources/primevue.min.css',
    'primeicons/primeicons.css'
  ],
  vite: {
    css: {
      preprocessorOptions: {
        scss: {
          additionalData: `@import "~/src/assets/themes/${envTheme}/variables.scss"; @import "~/src/assets/themes/${envTheme}/_mixins.scss";`
        },
      },
    },
  },
  //components: true,
  // components: [
  //   { path: '~/src/components/', extensions: ['vue'] }
  // ],
  build: {
    transpile: [
      'primevue'
    ]
  }
})