import { defineNuxtConfig } from 'nuxt'

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
  // buildModules: ['nuxt-purgecss'],
  css: [
    '~/src/assets/library/primeflex.min.css',
    '~/src/assets/themes/white-label/white-label.min.css',
    'primevue/resources/primevue.min.css',
    'primeicons/primeicons.css'
  ],
  ssr: true,
  vite: {
    css: {
      preprocessorOptions: {
        scss: {
          //additionalData: `@import "~/src/assets/library/primeflex.min.css"; @import "~/src/assets/themes/white-label/_theme.scss"; @import "primevue/resources/primevue.min.css"; @import "primeicons/primeicons.css";`,
          additionalData: `@import "src/assets/themes/radiolab/variables.scss"; @import "src/assets/themes/radiolab/_mixins.scss";`,
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