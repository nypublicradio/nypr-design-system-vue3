<script setup>
import { shallowRef, ref, onMounted } from 'vue'
import { useScroll } from '@vueuse/core'

const props = defineProps({
  buffer: {
    type: Number,
    default: 400,
  },
})

// scroll handler
let scroll = ref(null)
if (process.client) {
  scroll = useScroll(window)
}

// vars
const headerRef = ref(null)
const headerHeight = shallowRef(null)

// cssVars
const cssHeaderHeight = shallowRef(null)

onMounted(() => {
  headerHeight.value = headerRef.value.clientHeight
  cssHeaderHeight.value = headerHeight.value + 'px'
})
</script>

<template>
  <div class="v-smart-header">
    <header ref="headerRef">
      <slot>THIS IS THE HEADER</slot>
      <!-- {{ scroll }}
      {{ buffer }} -->
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
  &.hide {
    top: v-bind(cssHeaderHeight);
  }
}
</style>

<style lang="scss">
main {
}
</style>
