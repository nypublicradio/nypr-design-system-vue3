<script setup>
import { useScroll } from '@vueuse/core'
import { onMounted, ref, shallowRef, watch } from 'vue'

const props = defineProps({
  /**
   * number of pixels at the top of the page before the header minimizes
   */
  heroBuffer: {
    default: 400,
    type: Number,
  },
  /**
   * multipyler of the --transition-duration css var that determines the delay before the header minimizes when resuming to scroll down after scrolling up to show the menu
   */
  resumeDelay: {
    default: 3,
    type: Number,
  },
  /**
   * element class to use for scrolling (default is window)
   */
  targetWindowClass: {
    default: null,
    type: String,
  },
})

// scroll handler
let scroll = null
if (process.client) {
  scroll = useScroll(
    props.targetWindowClass
      ? document.getElementsByClassName(props.targetWindowClass)[0]
      : window,
    {
      behavior: 'smooth',
    }
  )
}

// vars
const headerRef = ref(null)
const headerHeight = shallowRef(null)

// cssVars
const cssHeaderHeight = shallowRef(null)

onMounted(() => {
  headerHeight.value = headerRef.value.clientHeight
  cssHeaderHeight.value = `${headerHeight.value}px`
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
    <Transition name="v-smart-header-minimize">
      <div v-show="!isMinimized" ref="headerRef" class="v-smart-header">
        <slot />
      </div>
    </Transition>
  </div>
</template>

<style lang="scss" scoped>
.v-smart-header {
  position: fixed;
  left: 0;
  top: 0;
  top: env(safe-area-inset-top);
  width: 100%;
  z-index: 999;
  //box-shadow: 0 2px 10px 0 rgba(0, 0, 0, 0.36);
}
//expand
.v-smart-header-minimize-enter-active {
  transition: top calc(var(--transition-duration) * 2) ease-out;
}
.v-smart-header-minimize-leave-active {
  transition: top calc(var(--transition-duration) * 2) ease-in;
  transition-delay: calc(var(--transition-duration) * v-bind(resumeDelay));
}
.v-smart-header-minimize-enter-from,
.v-smart-header-minimize-leave-to {
  top: calc(v-bind(cssHeaderHeight) * -1);
}
</style>
