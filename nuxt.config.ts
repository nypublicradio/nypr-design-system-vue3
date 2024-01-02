import vue from '@vitejs/plugin-vue';
/* eslint-disable perfectionist/sort-objects */
const envTheme = process.env.VITE_VUE_APP_THEME
// https://v3.nuxtjs.org/docs/directory-structure/nuxt.config
export default {
  modules: [
    '@nuxt/image', '@nuxtjs/supabase'
  ],
  supabase: {
    url: process.env.NUXT_ENV_SUPABASE_URL,
    key: process.env.NUXT_ENV_SUPABASE_KEY,
    redirect: true,
  },
  image: {
    dir: 'assets-shared/images',
    wagtail: {
      baseURL: "https://cms.demo.nypr.digital/images/",
      screens: {
        xs: 375,
        sm: 576,
        md: 768,
        lg: 992,
        xl: 1280,
        xxl: 1366,
        '2xl': 1920
      },
      presets: {
        avatar: {
          modifiers: {
            format: 'jpg',
            width: 50,

            height: 50
          }
        }
      }
    },
  },

  css: [

    `~/src/assets/themes/${envTheme}/fonts/fonts.css`,
    `~/src/assets/themes/${envTheme}/${envTheme}.min.css`,
    'primevue/resources/primevue.min.css',
    'primeicons/primeicons.css',
    'vidstack/player/styles/default/theme.css'
  ],

  vite: {
    css: {
      preprocessorOptions: {
        scss: {
          additionalData: `@import "~/src/assets/themes/${envTheme}/variables.scss"; @import "~/src/assets/themes/${envTheme}/_mixins.scss";`
        },
      },
    },
    vue: {
      template: {
        compilerOptions: {
          isCustomElement: tag => tag.startsWith('media-'),
        },
      },
    },
  },

  components: true,
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
      IMAGE_BASE_URL: process.env['IMAGE_BASE_URL'] ?? 'https://cms.prod.nypr.digital/images/',
      environment: process.env.environment ?? 'demo',
      supabaseUrl: process.env.NUXT_ENV_SUPABASE_URL,
      supabaseKey: process.env.NUXT_ENV_SUPABASE_KEY,
      supabaseAuthSignInRedirectTo: process.env.NUXT_ENV_SUPABASE_AUTH_SIGN_IN_REDIRECT_TO,
      supabaseAuthTokenName: process.env.NUXT_ENV_SUPABASE_AUTH_TOKEN_NAME,
    }
  },

  devtools: {
    enabled: true
  }
};
