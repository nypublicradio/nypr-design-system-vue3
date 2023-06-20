
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
  // template: '<img :src="isNaN(src) ? `/images/${src}` :  `https://cms.demo.nypr.digital/images/${src}/fill-${width}x${height}-c0|format-webp|webpquality-85` "  :width="width" :height="height"/>'
  app.component('ClientOnly', {
    props: [],
    methods: {
      log() {
      },
    },
    template: '<template><slot></slot></template>',
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