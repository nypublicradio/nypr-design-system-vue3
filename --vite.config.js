import { defineConfig } from 'vite'
import Vue from '@vitejs/plugin-vue'

export default defineConfig({
  plugins: [
    Vue(),
  ],
  test: {
    runtimeEnv: 'dom',
  },
  css: {
    preprocessorOptions: {
      scss: {
        additionalData: `@import "src/assets/themes/radiolab/variables.scss"; @import "src/assets/themes/radiolab/_mixins.scss";`,
      },
    },
  },
})