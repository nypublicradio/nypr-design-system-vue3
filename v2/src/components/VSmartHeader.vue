<script setup>
import { shallowRef, ref, onMounted, watch } from 'vue'
import { useScroll } from '@vueuse/core'

const props = defineProps({
  heroBuffer: {
    type: Number,
    default: 400,
  },
  resumeDelay: {
    type: Number,
    default: 3,
  },
})

// scroll handler
let scroll = null
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

const isMinimized = shallowRef(false)
watch(
  [scroll?.y, scroll?.directions, scroll?.isScrolling],
  ([y, top, isScrolling]) => {
    if (isScrolling) {
      y > props.heroBuffer && top.top
        ? (isMinimized.value = false)
        : !top.top && y > props.heroBuffer
        ? (isMinimized.value = true)
        : (isMinimized.value = false)
    }
  }
)
</script>

<template>
  <div>
    <Transition name="minimize">
      <div v-show="!isMinimized" ref="headerRef" class="v-smart-header">
        <header>
          <slot>THIS IS THE HEADER</slot>
          <!-- <pre>
            {{ scroll }}
          </pre> -->
        </header>
      </div>
    </Transition>
  </div>
</template>

<style lang="scss" scoped>
.v-smart-header {
  background-color: grey;
  position: fixed;
  left: 0;
  top: 0;
  width: 100%;
  z-index: 999;
  box-shadow: 0 2px 10px 0 rgba(0, 0, 0, 0.36);
}
//expand
.minimize-enter-active {
  transition: top calc(var(--transition-duration) * 2) ease-out;
}
.minimize-leave-active {
  transition: top calc(var(--transition-duration) * 2) ease-in;
  transition-delay: calc(var(--transition-duration) * v-bind(resumeDelay));
}
.minimize-enter-from,
.minimize-leave-to {
  top: calc(v-bind(cssHeaderHeight) * -1);
}
</style>

<style lang="scss">
main {
  padding-top: 400px;
}
</style>
