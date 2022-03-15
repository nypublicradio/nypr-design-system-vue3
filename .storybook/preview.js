import { app, addParameters } from '@storybook/vue3'
// import './storybook-styles.scss'
import { action } from '@storybook/addon-actions'

import addons from '@storybook/addons'

// get an instance to the communication channel for the manager and preview
const channel = addons.getChannel()

// switch body class for story along with interface theme
channel.on('DARK_MODE', isDark => {
  if (isDark) {
    document.body.classList.add('dark')
    document.body.setAttribute('data-style-mode', 'dark')
  } else {
    document.body.classList.remove('dark')
    document.body.setAttribute('data-style-mode', 'default')
  }
})


addParameters({
  docs: {
    inlineStories: true,
  },
})

app.component('nuxt-link', {
  props: ['to'],
  methods: {
    log() {
      action('link target')(this.to)
    },
  },
  template: '<a :href="to" @click.prevent="log()"><slot>NuxtLink</slot></a>',
})

export const parameters = {
  actions: { argTypesRegex: "^on[A-Z].*" },
  controls: {
    matchers: {
      color: /(background|color)$/i,
      date: /Date$/,
    },
  },
  darkMode: {
    stylePreview: true
  }
}
