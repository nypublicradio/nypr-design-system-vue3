import { defineConfig } from '@peeky/test'
import Vue from '@vitejs/plugin-vue'

export default defineConfig({
  runtimeEnv: 'dom',
  collectCoverage: true,
  vite: {
    plugins: [Vue()],
    // vite options here...
    css: {
      preprocessorOptions: {
        scss: {
          additionalData: `@import "src/assets/themes/radiolab/variables.scss"; @import "src/assets/themes/radiolab/_mixins.scss";`,
        },
      },
    },
  },
})
