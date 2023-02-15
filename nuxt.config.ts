const envTheme = process.env.VITE_VUE_APP_THEME

// https://v3.nuxtjs.org/docs/directory-structure/nuxt.config
export default {
  css: [
    '~/src/assets/library/primeflex.min.css',
    `~/src/assets/themes/${envTheme}/fonts/fonts.css`,
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
  imports: {
    dirs: [
      'composables', // top-level modules
      'composables/*/index.{ts,js,mjs,mts}' // one level directories's index.js,
    ]
  },
  build: {
    transpile: [
      'primevue'
    ]
  },
  runtimeConfig: {
    public: {
      IMAGE_BASE_URL: process.env['IMAGE_BASE_URL'] || 'https://cms.prod.nypr.digital/images/',
    }
  },
}