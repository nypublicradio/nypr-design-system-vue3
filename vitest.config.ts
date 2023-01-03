/// <reference types="vitest" />

import { defineConfig, loadEnv } from 'vite'
import vue from '@vitejs/plugin-vue'

export default ({ mode }) => {
  process.env = { ...process.env, ...loadEnv(mode, process.cwd()) };
  const envTheme = process.env.VITE_VUE_APP_THEME

  return defineConfig({
    plugins: [
      vue(),
    ],
    test: {
      globals: true,
      environment: 'jsdom',
      coverage: {
        provider: 'istanbul'
      },
    },
    css: {
      preprocessorOptions: {
        scss: {
          additionalData: `@import "src/assets/themes/${envTheme}/fonts/fonts.css"; @import "src/assets/themes/${envTheme}/variables.scss"; @import "src/assets/themes/${envTheme}/_mixins.scss";`,
        },
      },
    },
  })
}





