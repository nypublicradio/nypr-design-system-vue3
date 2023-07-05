
import { setup } from '@storybook/vue3'
import PrimeVue from 'primevue/config'
import { themes } from '@storybook/theming'
import { action } from '@storybook/addon-actions'


// darkmose styles
import './darkmode.css'

//enable primevue
setup((app) => {
  app.use(PrimeVue)
  app.component('nuxt-link', {
    props: ['to', 'target', 'raw', 'rawHover'],
    methods: {
      log() {
        action('link target')(this.to)
      },
    },
    template: '<a :href="to" :target="target" @click.prevent="log()"><slot/></a>',
  })

  // Storybook NuxtImage mock
  app.component('nuxt-img', {
    props: ['src', 'alt', 'width', 'height', 'sponsored', 'loading', 'maxWidth', 'maxHeight', 'quality', 'modifiers', 'allowVerticalEffect', 'verticalBgColor', 'verticalBgColorOpacity', 'verticalBgBlur', 'allowPreview', 'ratio'],
    methods: {
      log() {

      },
    },
    template: '<img :src="isNaN(src) && !src.includes(`http`) ? `/images/${src}` : src.includes(`http`) ? `${src}` : width ? `https://cms.demo.nypr.digital/images/${src}/fill-${width}x${height}-c${modifiers && modifiers.focusZoom || 0}|format-webp|webpquality-${quality}` : `https://cms.demo.nypr.digital/images/${src}/original|format-webp|webpquality-${quality}` "  :width="width" :height="height" :alt="alt" :loading="loading"/>'
  })
  app.component('ClientOnly', {
    props: [],
    methods: {
      log() {
      },
    },
    template: '<slot></slot>',
  })

})

// dark mode setup
export const parameters = {
  darkMode: {
    // Override the default dark theme
    dark: { ...themes.dark, appBg: 'black' },
    // Override the default light theme
    light: { ...themes.normal },
    stylePreview: true,
    darkClass: 'style-mode-dark',
    lightClass: 'style-mode-light',
  }
}

// Mock useSupabaseClient function
const useSupabaseClient = () => {
  return {
    auth: { signInWithOAuth: () => { } }
  }
}
const useRuntimeConfig = () => {
  return {
    supabaseAuthSignInRedirectTo: '/'
  }
}
const useCurrentUser = () => {
  return {
    "id": "fc6c5a64-9b2a-4160-a737-f4561d64d60c", "aud": "authenticated", "role": "authenticated", "email": "thomasbono.com@gmail.com", "email_confirmed_at": "2023-06-30T19:50:22.593684Z", "phone": "", "confirmed_at": "2023-06-30T19:50:22.593684Z", "last_sign_in_at": "2023-07-05T23:03:06.712991962Z", "app_metadata": { "provider": "email", "providers": ["email"] }, "user_metadata": {}, "identities": [{ "id": "fc6c5a64-9b2a-4160-a737-f4561d64d60c", "user_id": "fc6c5a64-9b2a-4160-a737-f4561d64d60c", "identity_data": { "email": "thomasbono.com@gmail.com", "sub": "fc6c5a64-9b2a-4160-a737-f4561d64d60c" }, "provider": "email", "last_sign_in_at": "2023-06-30T19:50:22.591738Z", "created_at": "2023-06-30T19:50:22.591775Z", "updated_at": "2023-06-30T19:50:22.591775Z" }], "created_at": "2023-06-30T19:50:22.58882Z", "updated_at": "2023-07-05T23:03:06.716431Z"
  }
}
global.useSupabaseClient = useSupabaseClient
global.useRuntimeConfig = useRuntimeConfig
global.useCurrentUser = useCurrentUser