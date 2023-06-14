<script setup>
import { ref, computed, onMounted } from 'vue'
import { useScroll } from '@vueuse/core'

const props = defineProps({
  height: {
    type: Number,
    default: 0,
  },
})

let scroll = ref(null)
if (process.client) {
  scroll = useScroll(window)
}

// cssVars
const cssHeaderHeight = ref(props.height + 'px')
</script>

<template>
  <div class="v-smart-header">
    <header>
      <slot>THIS IS THE HEADER</slot>
    </header>
  </div>
</template>

<style lang="scss" scoped>
.v-smart-header {
  position: fixed;
  left: 0;
  top: 0;
  width: 100%;
  z-index: 999;
  box-shadow: 0 2px 10px 0 rgba(0, 0, 0, 0.36);
}
</style>
<style lang="scss">
body {
  padding-top: v-bind(cssHeaderHeight);
}
</style>
