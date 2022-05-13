import { defineNuxtConfig } from 'nuxt'

const envTheme = process.env.VITE_VUE_APP_THEME

// https://v3.nuxtjs.org/docs/directory-structure/nuxt.config
export default defineNuxtConfig({
  head: {
    title: 'Storybook',
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      {
        hid: 'description',
        name: 'description',
        content: 'StoryBook'
      }
    ],
    link: [{ rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }]
  },
  css: [
    '~/src/assets/library/primeflex.min.css',
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
  // components: true,
  // components: [
  //   { path: '~/v2.src.components/', extensions: ['vue'] }
  // ],
  build: {
    transpile: [
      'primevue'
    ]
  }
})