/// <reference types="vitest" />

import vue from '@vitejs/plugin-vue'
import { defineConfig, loadEnv } from 'vite'

export default ({ mode }) => {
  process.env = { ...process.env, ...loadEnv(mode, process.cwd()) };
  const envTheme = process.env.VITE_VUE_APP_THEME

  return defineConfig({
    css: {
      preprocessorOptions: {
        scss: {
          additionalData: `@import "src/assets/themes/${envTheme}/fonts/fonts.css"; @import "src/assets/themes/${envTheme}/${envTheme}.min.css"; @import "src/assets/themes/${envTheme}/variables.scss"; @import "src/assets/themes/${envTheme}/_mixins.scss";`,
        },
      },
    },
    plugins: [
      vue(),
    ],
    test: {
      coverage: {
        provider: 'v8'
      },
      environment: 'jsdom',
      globals: true,
    },
  })
}





