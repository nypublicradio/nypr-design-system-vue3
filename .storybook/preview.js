
import { setup } from '@storybook/vue3'
import PrimeVue from 'primevue/config'
import { themes } from '@storybook/theming'
import { action } from '@storybook/addon-actions'
import NuxtImageWrapper from '../v2/src/wrappers/NuxtImageWrapper.vue'
//import { NuxtImage } from '@nuxt/image'

// darkmose styles
import './darkmode.css'

//enable primevue
setup((app) => {
  app.use(PrimeVue)
  app.component('nuxt-link', {
    props: ['to'],
    methods: {
      log() {
        action('link target')(this.to)
      },
    },
    template: '<a :href="to" @click.prevent="log()"><slot>NuxtLink</slot></a>',
  })
  //support nuxt image mock
  app.component('nuxt-img', {
    props: ['src', 'alt', 'width', 'height', 'loading', 'maxWidth', 'maxHeight', 'quality', 'modifiers', 'allowVerticalEffect', 'verticalBgColor', 'verticalBgColorOpacity', 'verticalBgBlur', 'allowPreview', 'ratio'],
    methods: {
      log() {

      },
    },
    template: '<img :src="`https://cms.demo.nypr.digital/images/${src}/fill-${width}x${height}-c0|format-webp|webpquality-85`" :width="width" :height="height"/>',
  })
  app.component('ClientOnly', {
    props: [],
    methods: {
      log() {
      },
    },
    template: '<template><slot></slot></template>',
  })
  //app.component('nuxt-img', NuxtImageWrapper)
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