<template>
  <div>
    <v-audio-player
      id="audioPlayer"
      :is-playing="isPlaying"
      @emit-toggle-play="onTogglePlay"
    />
    <v-audio-player
      v-show="pIsPersistent && showPlayer"
      id="audioPlayerFixed"
      class="fixed"
      :is-playing="isPlaying"
      :is-minimized="isMinimized"
      is-fixed
      @mouseenter="minimizeTimeoutReset"
      @emit-toggle-play="onTogglePlay"
      @emit-close-player="onClosePlayer"
    />
  </div>
</template>

<script>
import { ref, onMounted } from 'vue'
import { gsap } from 'gsap'
import VAudioPlayer from './VAudioPlayer'
// import scssVars from './assets/scss/exports.module.scss'
// use esm versions of gsap plugins
import { ScrollTrigger } from 'gsap/ScrollTrigger.js'
gsap.registerPlugin(ScrollTrigger)

export default {
  name: 'VAudioPlayerSystem',
  components: {
    VAudioPlayer,
  },
  props: {
    persistent: {
      type: Boolean,
      default: false,
    },
    always: {
      type: Boolean,
      default: false,
    },
  },
  setup: (props) => {
    // props vars
    const pIsPersistent = ref(props.persistent)
    const pIsAlways = ref(props.always)

    // local data vars
    const isMinimized = ref(false)
    const isPlaying = ref(false)
    const showPlayer = ref(false)

    // local vars
    let timeoutHandler = null
    const audioPlayer = '#audioPlayerFixed'
    const animSpeed = 0.5
    // const playerFullWidth = scssVars.audioPlayerWidth.slice(0, -2)
    const playerFullWidth = 375

    // methods
    const onTogglePlay = () => {
      minimizeTimeoutReset()
      isPlaying.value = !isPlaying.value
    }
    const togglePlayer = (bool) => {
      if (pIsPersistent.value) {
        if (bool) {
          minimizeTimeoutReset()
          slideIn()
        } else {
          slideOut(() => minimizeTimeoutReset())
        }
      }
    }
    const slideIn = () => {
      gsap.to(audioPlayer, {
        duration: animSpeed,
        right: 0,
        overwrite: true,
      })
    }
    const slideOut = (onCompleteFunc) => {
      gsap.to(audioPlayer, {
        duration: animSpeed,
        right: -playerFullWidth,
        overwrite: true,
        onComplete: () => {
          onCompleteFunc()
        },
      })
    }
    const minimizeTimeoutReset = () => {
      // minimizes player after 6 soconds of inactivity
      if (pIsPersistent.value) {
        if (timeoutHandler) {
          isMinimized.value = false
          clearTimeout(timeoutHandler)
        }
        timeoutHandler = setTimeout(() => {
          isMinimized.value = true
          clearTimeout(timeoutHandler)
        }, 6000)
      }
    }
    const onClosePlayer = () => {
      if (isPlaying.value) {
        isMinimized.value = true
      } else {
        slideOut(() => {
          showPlayer.value = false
        })
      }
    }

    onMounted(() => {
      if (pIsPersistent.value) {
        minimizeTimeoutReset()
        ScrollTrigger.create({
          trigger: '#audioPlayer',
          // markers: true,
          onLeave: () => {
            if (isPlaying.value || pIsAlways.value) {
              showPlayer.value = true
            }
            togglePlayer(true)
          },
          onEnterBack: () => {
            togglePlayer(false)
          },
        })
      }
    })

    return {
      pIsPersistent,
      pIsAlways,
      isMinimized,
      isPlaying,
      showPlayer,
      onTogglePlay,
      onClosePlayer,
      minimizeTimeoutReset,
    }
  },
}
</script>

<style lang="scss">
$audioPlayerWidth: 375px;
.audioPlayer {
  background: var(--gray-300);
  border-radius: var(--border-radius);
  width: 100%;
  display: grid;
  margin: 0 auto;
  grid-template-columns: 4fr 1fr;
  row-gap: spacing(2);
  align-items: center;
  padding: spacing(2);
  box-sizing: border-box;
  transition: width 0.5s, padding 0.5s;
  -webkit-transition: width 0.5s, padding 0.5s;
  &.inline {
    width: 100%;
  }
  &.fixed {
    width: $audioPlayerWidth;
    position: fixed;
    bottom: 0;
    right: -$audioPlayerWidth;
    &.minimized {
      width: 60px;
      height: 60px;
      padding: 0;
      .content {
        display: none;
      }
    }
  }
  .min-content {
    width: 100%;
    display: grid;
    margin: 0 auto;
    grid-template-columns: 1fr;
    column-gap: spacing(4);
    row-gap: spacing(4);
    justify-items: end;
  }
}
</style>
