/// <reference types="vitest" />

import { defineConfig } from 'vite'
import Vue from '@vitejs/plugin-vue'

export default defineConfig({
  plugins: [
    Vue(),
  ],
  test: {
    globals: true,
    environment: 'jsdom',
  },
  css: {
    preprocessorOptions: {
      scss: {
        additionalData: `@import "src/assets/themes/radiolab/variables.scss"; @import "src/assets/themes/radiolab/_mixins.scss";`,
      },
    },
  },
})



