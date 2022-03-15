<template>
  <div
    v-show="showPlayer"
    :id="pFixed ? 'audioPlayerFixed' : 'audioPlayer'"
    class="audioPlayer"
    :class="{ minimized: pIsMinimized, fixed: pFixed }"
  >
    <div class="content">
      <h3>Audio Player!</h3>
      <button
        v-if="pFixed"
        @click="closePlayer"
        @mouseover="minimizeTimeoutReset"
      >
        &times;
      </button>
    </div>
    <div class="min-content">
      <Button
        class="playPauseButton"
        :icon="`pi ${pIsPlaying ? 'pi-pause' : 'pi-play'}`"
        @click="togglePlay"
        @mouseover="minimizeTimeoutReset"
      >
      </Button>
    </div>
  </div>
</template>

<script>
import { ref, onMounted } from 'vue'
import { gsap } from 'gsap'
import Button from 'primevue/button'
// import scssVars from './assets/scss/exports.module.scss'
// use esm versions of gsap plugins
import { ScrollTrigger } from 'gsap/ScrollTrigger.js'
gsap.registerPlugin(ScrollTrigger)

export default {
  name: 'VAudioPlayer',
  components: {
    Button,
  },
  mixins: [],

  props: {
    fixed: {
      type: Boolean,
      default: false,
    },
    isMinimized: {
      type: Boolean,
      default: false,
    },
    isPlaying: {
      type: Boolean,
      default: false,
    },
  },
  setup: (props) => {
    // props vars
    const pFixed = ref(props.fixed)
    const pIsMinimized = ref(props.isMinimized)
    const pIsPlaying = ref(props.isPlaying)

    // local data vars
    let timeoutHandler = ref(null)
    let showPlayer = ref(!props.fixed)

    // local vars
    const audioPlayer = '#audioPlayerFixed'
    const animSpeed = 0.5
    // const playerFullWidth = scssVars.audioPlayerWidth.slice(0, -2)
    const playerFullWidth = 375

    // methods
    const togglePlay = () => {
      minimizeTimeoutReset()
      console.log('togglePlay = ', pIsPlaying.value)
      pIsPlaying.value = !pIsPlaying.value
    }
    const togglePlayer = (bool) => {
      if (showPlayer.value && pFixed.value) {
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
      // minimzes player after 6 soconds of inactivity
      if (pFixed.value) {
        if (timeoutHandler.value) {
          pIsMinimized.value = false
          clearTimeout(timeoutHandler)
        }
        timeoutHandler = setTimeout(() => {
          pIsMinimized.value = true
          clearTimeout(timeoutHandler)
        }, 6000)
      }
    }
    const closePlayer = () => {
      if (pIsPlaying.value) {
        pIsMinimized.value = true
      } else {
        slideOut(() => {
          showPlayer.value = false
        })
      }
    }

    onMounted(() => {
      if (pFixed.value) {
        minimizeTimeoutReset()
        ScrollTrigger.create({
          trigger: '#audioPlayer',
          markers: true,
          onLeave: () => {
            console.log('pIsPlaying.value = ', pIsPlaying.value)
            if (pIsPlaying.value) {
              showPlayer.value = true
              console.log('onLeave')
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
      pFixed,
      pIsMinimized,
      pIsPlaying,
      showPlayer,
      togglePlay,
      closePlayer,
      minimizeTimeoutReset,
    }
  },
  head() {
    return {}
  },
}
</script>

<style lang="scss">
$audioPlayerWidth: 375px;
body {
  max-width: $md;
  margin: 0 auto;
  padding: spacing(3);
}
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
    column-gap: spacing(3);
    row-gap: spacing(3);
    justify-items: end;
  }
}
</style>
