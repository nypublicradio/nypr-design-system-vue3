<script setup lang="ts">

import 'vidstack/player/styles/default/layouts/audio.css';
import 'vidstack/player/styles/default/layouts/video.css';

// Register elements.
import 'vidstack/player';
import 'vidstack/player/layouts';
import 'vidstack/player/ui';

import { isHLSProvider, type MediaCanPlayEvent, type MediaProviderChangeEvent } from 'vidstack';
import type { MediaPlayerElement } from 'vidstack/elements';


import soundAnimGif from '../assets/images/audioAnim.gif'
import VTrackInfo from './VTrackInfo.vue'
import VVolumeControl from './VVolumeControl.vue'
import { useSwipe } from '@vueuse/core'
import { Howl, Howler } from 'howler'
import Button from 'primevue/button'
import { onBeforeUnmount, onMounted, ref } from 'vue'

const props = defineProps({
  /**
   * autoplay on load
   */
  autoPlay: {
    default: false,
    type: Boolean,
  },
  /**
   * expand the player by clicking anywhere but the control buttons
   */
  canClickAnywhere: {
    default: false,
    type: Boolean,
  },
  /**
   * make the player expandable
   */
  canExpand: {
    default: false,
    type: Boolean,
  },
  /**
   * expand the player with up swipe actions
   */
  canExpandWithSwipe: {
    default: false,
    type: Boolean,
  },
  /**
   * make the player minimizable
   */
  canMinimize: {
    default: false,
    type: Boolean,
  },
  /**
   * can unexpand the player with down swipe actions
   */
  canUnexpandWithSwipe: {
    default: false,
    type: Boolean,
  },
  /**
   * description text
   */
  description: {
    default: null,
    type: String,
  },
  /**
   * link for the description
   */
  descriptionLink: {
    default: null,
    type: String,
  },
  /**
   * audio file url
   */
  file: {
    default: null,
    type: String,
  },
  /**
   * hide the description on mobile container breakpoint
   */
  hideDescriptionOnMobile: {
    default: false,
    type: Boolean,
  },
  /**
   * hide the download button on mobile
   */
  hideDownloadMobile: {
    default: true,
    type: Boolean,
  },
  /**
   * hide the image on mobile container breakpoint
   */
  hideImageOnMobile: {
    default: false,
    type: Boolean,
  },
  /**
   * hide the skip buttons on mobile
   */
  hideSkipMobile: {
    default: true,
    type: Boolean,
  },
  /**
   * hide the time on mobile container breakpoint
   */
  hideTimeOnMobile: {
    default: false,
    type: Boolean,
  },
  /**
   * left image representing the audio
   */
  image: {
    default: null,
    type: String,
  },
  /**
   * loading state
   */
  isLoading: {
    default: false,
    type: Boolean,
  },
  /**
   * muted state
   */
  isMuted: {
    default: false,
    type: Boolean,
  },
  /**
   * to render a livestream view (LIVE indicator and no progress bar)
   */
  livestream: {
    default: false,
    type: Boolean,
  },
  /**
   * loop the audio when complete
   */
  loop: {
    default: false,
    type: Boolean,
  },
  marquee: {
    default: false,
    type: Boolean,
  },
  marqueeDelay: {
    default: '3s',
    type: String,
  },
  marqueeLoops: {
    default: '1',
    type: String,
  },
  marqueeSpeed: {
    default: 0.1,
    type: Number,
  },
  /**
   * show the download button
   */
  showDownload: {
    default: false,
    type: Boolean,
  },
  /**
   * show the skip buttons
   */
  showSkip: {
    default: true,
    type: Boolean,
  },
  /**
   * skip ahead time
   */
  skipAheadTime: {
    default: 15,
    type: Number,
  },
  /**
   * skip back time
   */
  skipBackTime: {
    default: 15,
    type: Number,
  },
  /**
   * radio station name
   */
  station: {
    default: null,
    type: String,
  },
  /**
   * the swipe speed threshhold to trigger the swipe action
   */
  swipeThreshold: {
    default: 0.5,
    type: Number,
  },
  /**
   * the timeline is at the bottom of the player
   */
  timelineBottom: {
    default: false,
    type: Boolean,
  },
  /**
   * the timeline is interactive
   */
  timelineInteractive: {
    default: true,
    type: Boolean,
  },
  /**
   * the timeline is at the top of the player
   */
  timelineTop: {
    default: false,
    type: Boolean,
  },
  /**
   * title of the audio
   */
  title: {
    default: null,
    type: String,
  },
  /**
   * link for the title
   */
  titleLink: {
    default: null,
    type: String,
  },
  /**
   * volume state
   */
  volume: {
    default: 100,
    type: Number,
  },
})
let interval = null
const currentSeconds = ref(0)
const durationSeconds = ref(0)

const buffered = ref(0)
const volume = ref(props.volume)

const loading = ref(props.isLoading)
const playing = ref(null)
const muted = ref(props.isMuted)
const currentFile = ref(null)

const isMinimized = ref(false)
const isExpanded = ref(false)

let sound = null

const emit = defineEmits([
  'toggle-play',
  'volume-toggle-mute',
  'volume-change',
  'load-error',
  'skip-ahead',
  'skip-back',
  'scrub-timeline-change',
  'scrub-timeline-end',
  'download',
  'image-click',
  'description-click',
  'title-click',
  'sound-ended',
  'sound-loaded',
  'sound-looping',
  'timeline-click',
  'is-minimized',
  'is-expanded',
  'swipe-up',
  'swipe-down',
  'is-loading',
  'duration',
  'current-duration',
])

//swipe setup
const playerRef = ref(null)
const $mediaPlayerRef = ref<MediaPlayerElement>();

// prevents the body from scrolling when the dropdown is open
function preventScrollOnTouch(event) {
  event.preventDefault()
}
const supportSwipe =
  (props.canExpand && props.canExpandWithSwipe) ||
  (props.canExpand && props.canUnexpandWithSwipe)

if (supportSwipe) {
  let touchstartY = 0
  let touchendY = 0
  let touchPrevY = 0
  let touchCurrentY = 0
  let touchstartTime = 0
  let touchendTime = 0
  const swipeThreshold = props.swipeThreshold
  let isDraggingDown = false

  // handles the detection of the direction of the drag movment
  function handleSwipeDirection() {
    const tempBool = isDraggingDown
    if (touchCurrentY < touchPrevY) {
      isDraggingDown = true
    }
    if (touchCurrentY > touchPrevY) {
      isDraggingDown = false
    }
    //reset the touchstartY and touchstartTime if the direction changes
    if (tempBool !== isDraggingDown) {
      touchstartY = touchCurrentY
      touchstartTime = new Date().getTime()
    }
  }

  // handles the swipe ended logic
  function handleSwipe() {
    const distance = Math.abs(touchendY - touchstartY)
    const time = touchendTime - touchstartTime
    const velocity = distance / time
    // console.log('________________________________________________________')
    // console.log('distance', distance)
    // console.log('time', time)
    // console.log('velocity', velocity)
    // console.log('swipeThreshold', swipeThreshold)
    // console.log('isDraggingDown', isDraggingDown)
    // console.log('touchendY', touchendY)
    // console.log('touchstartY', touchstartY)
    if (props.canExpand && props.canExpandWithSwipe) {
      if (!isDraggingDown) {
        if (velocity > swipeThreshold) {
          //console.log('EXPAND')
          playerRef.value.removeEventListener(
            'touchmove',
            preventScrollOnTouch,
            {
              passive: false,
            }
          )
          isExpanded.value = true
          emit('swipe-up')
        }
      }
    }
    if (props.canExpand && props.canUnexpandWithSwipe) {
      if (isDraggingDown) {
        if (velocity > swipeThreshold) {
          //console.log('UNEXPAND')
          playerRef.value.addEventListener('touchmove', preventScrollOnTouch, {
            passive: false,
          })
          isExpanded.value = false
          emit('swipe-down')
        }
      }
    }
  }

  const swipe = useSwipe(playerRef, {
    onSwipe() {
      touchCurrentY = swipe.lengthY.value

      handleSwipeDirection()
      touchPrevY = touchCurrentY
    },
    onSwipeEnd() {
      touchendY = swipe.lengthY.value
      touchendTime = new Date().getTime()
      handleSwipe()
    },
    onSwipeStart() {
      touchstartY = swipe.lengthY.value
      touchstartTime = new Date().getTime()
    },
    passive: true,
  })
}
// initially set touchmove prevent default on the playerRef
onMounted(() => {
  if (supportSwipe) {
    playerRef.value.addEventListener('touchmove', preventScrollOnTouch, {
      passive: false,
    })
  }
})
// END swipe

// method to handle update the currentSeconds with the audio playhead
const updateCurrentSeconds = () => {
  currentSeconds.value = sound.seek()
  emit('current-duration', currentSeconds.value)
}
// time converter
const convertTime = (val) => {
  const hhmmss = new Date(val * 1000).toISOString().substr(11, 8)
  return hhmmss.indexOf('00:') === 0 ? hhmmss.substr(3) : hhmmss
}
// starts the download process. This will eventually be replaced with a proper download function that supports web and app
const download = () => {
  emit('download')
  window.open(props.file, '_blank')
}
// makes the audio skip ahead props.skipAheadTime seconds
const skipAhead = () => {
  if (sound) {
    emit('skip-ahead')
    sound.seek(sound.seek() + props.skipAheadTime)
    updateCurrentSeconds()
  }
}
// makes the audio skip back props.skipBackTime seconds
const skipBack = () => {
  if (sound) {
    emit('skip-back')
    sound.seek() > props.skipBackTime
      ? sound.seek(sound.seek() - props.skipBackTime)
      : sound.seek(0.1)
    updateCurrentSeconds()
  }
}
// the base clock interval for the audio player
const startDurationInterval = () => {
  interval = setInterval(() => {
    updateCurrentSeconds()
    //console.log('updaintg')
  }, 1000)
}
// clears the clock interval
const clearDurationInterval = () => {
  clearInterval(interval)
}
// handle the toggle play event
const togglePlay = () => {
  if (!sound || !currentFile.value === props.file) {
    // destoy old sound if one exists
    sound ? sound.unload() : null
    currentFile.value = props.file
    loading.value = true
    emit('is-loading', true)
    sound = new Howl({
      html5: true,
      onend: function () {
        emit('sound-ended')
        if (props.loop) {
          emit('sound-looping')
          sound.seek(0.1)
          sound.play()
        } else {
          sound.unload()
          playing.value = false
          emit('toggle-play', false)
          // without the timeout, the timeline will not update and disapear on the last tick
          setTimeout(() => {
            clearDurationInterval()
          }, 1100)
        }
      },
      onload: function () {
        emit('sound-loaded')
        loading.value = false
        emit('is-loading', false)
        durationSeconds.value = sound.duration()
        emit('duration', durationSeconds.value)
      },
      onloaderror: function (id, errorCode) {
        emit('load-error', [id, errorCode])
      },
      preload: true,
      src: [props.file],
    })
  }
  // Play or pause the sound.
  if (sound && sound.playing()) {
    emit('toggle-play', false)
    playing.value = false
    sound.pause()
    clearDurationInterval()
  } else {
    playing.value = true
    emit('toggle-play', true)
    startDurationInterval()
    sound.play()
  }
  // Change global volume init
  Howler.volume(volume.value)
}
// handle toggling the mute state
const volumeToggleMute = (e) => {
  emit('volume-toggle-mute', e)
  muted.value = !muted.value
  sound.mute(muted.value)
}
// handle the volume change event
// const volumeChange = (e) => {
//   if (sound) {
//     emit('volume-change', e)
//     sound.volume(e / 100)
//     volume.value = e
//   }
// }

let onceFlag = null
let scrubWhenPaused = false
// handle the scrub end event on the timeline
const scrubTimelineEnd = (e) => {
  emit('scrub-timeline-end', e)
  const percentUnit = durationSeconds.value / 100
  sound.seek(e * percentUnit)
  if (!scrubWhenPaused && !playing.value) {
    togglePlay()
  } else {
    // to update the time
    updateCurrentSeconds()
  }
  onceFlag = null
}
// handle the change event on the timeline
const scrubTimelineChange = (e) => {
  // update currentSeconds from the Slider change event, that passes the value to the Slider.
  currentSeconds.value = (e * durationSeconds.value) / 100
  if (!onceFlag) {
    emit('scrub-timeline-change', e)
    onceFlag = true
    if (playing.value) {
      togglePlay()
      scrubWhenPaused = false
    } else {
      scrubWhenPaused = true
    }
  }
}
// handle the click on the timeline
const timelineClick = (e) => {
  emit('timeline-click', e)
  scrubTimelineEnd(e)
}
// exposed method to handle the minimize toggle
const toggleMinimize = (e) => {
  emit('is-minimized', e)
  isMinimized.value = e
}

// handle scroll blocking with js when player is expanded
const scrollToggle = (e) => {
  if (e) {
    playerRef.value.removeEventListener('touchmove', preventScrollOnTouch, {
      passive: false,
    })
  } else {
    playerRef.value.addEventListener('touchmove', preventScrollOnTouch, {
      passive: false,
    })
  }
}
// exposed method to handle the expanding toggle
const toggleExpanded = (e) => {
  scrollToggle(e)
  emit('is-expanded', e)
  isExpanded.value = e

}
// handles the click anywhere prop. So if the user clicks anywhere on the player, exect the buttons, the player will expand or minimize
const handleClickAnywhere = (e) => {
  if (props.canClickAnywhere) {
    e.preventDefault()
    if (props.canExpand) {
      toggleExpanded(!isExpanded.value)
    }
    if (props.canMinimize) {
      toggleMinimize(!isMinimized.value)
    }
  }
}

onMounted(() => {
  // keyboard accessibility
  window.addEventListener('keydown', (event) => {
    switch (event.code) {
      case 'ArrowUp':
        if ($mediaPlayerRef.value && $mediaPlayerRef.value.volume < 1) {
          $mediaPlayerRef.value.volume += 0.1
        }
        break
      case 'ArrowDown':
         if ($mediaPlayerRef.value && $mediaPlayerRef.value.volume > 0) {
           $mediaPlayerRef.value.volume -= 0.1
        }
        break
      default:
        /* code */
        break
    }
  })


  const instance = document.querySelector("media-player");
  if (instance) {
    // Read
    const { playing, paused, seeking, canPlay,volume } = instance.state;

    //subscribe to state changess
    instance.subscribe(({ playing }) => {
      console.log("is playing = ", playing)
    });
    instance.subscribe(({ paused }) => {
      console.log("is paused = ", paused)
    });
    instance.subscribe(({ seeking }) => {
      console.log("is seeking = ", seeking)
    });
    instance.subscribe(({ canPlay }) => {
      console.log("canPlay = ", canPlay)
    });
    instance.subscribe(({ volume }) => {
      console.log("volume = ", volume)
      emit('volume-change', volume)
    });
  }
})

onBeforeUnmount(() => {
  // destroy the audio
  $mediaPlayerRef.value?.destroy();
})

defineExpose({
  scrubTimelineChange,
  scrubTimelineEnd,
  skipAhead,
  skipBack,
  sound,
  timelineClick,
  toggleExpanded,
  toggleMinimize,
  togglePlay,
})
</script>

<template>
  <div
    ref="playerRef"
    class="persistent-player"
    :class="[{ minimized: isMinimized }, { expanded: isExpanded }]"
  >
    <div v-if="props.canMinimize" class="maximize-btn-holder">
      <Button
        title="maximize Player"
        class="maximize-btn p-button-icon-only"
        :class="{ show: isMinimized }"
        aria-label="maximize player"
        @click="toggleMinimize(!isMinimized)"
      >
        <img v-if="playing" :src="soundAnimGif" alt="sounds wave animation" />
        <slot v-else name="chevronUp"><i class="pi pi-chevron-up"></i></slot>
      </Button>
    </div>
    <Transition name="expand">
      <div v-show="!isExpanded" class="player-controls">
        <media-player
          class="media-player"
          :title="props.title"
          :src="props.file"
          :autoplay="props.autoPlay"
          view-type="audio"
          load="eager"
          :audio-track-change="audioTrackChange"
          :volume-change="volumeChange"
          :stream-type="props.livestream ? 'live:dvr' : 'on-demand'"
          :loop="props.loop"
          poster="https://i.natgeofe.com/n/4cebbf38-5df4-4ed0-864a-4ebeb64d33a4/NationalGeographic_1468962_3x2.jpg?w=1638&h=1092"
          crossorigin
          ref="$mediaPlayerRef"
        >
          <media-provider></media-provider>
          <media-audio-layout> </media-audio-layout>
        </media-player>
      </div>
    </Transition>

    <Button
      v-if="props.canExpand && !isExpanded && !props.canClickAnywhere"
      title="Expand Player"
      class="expand-btn p-button-icon-only p-button-text p-button-secondary"
      :class="{ show: isExpanded }"
      aria-label="expand player"
      @click="toggleExpanded(!isExpanded)"
    >
      <slot name="chevronUp"><i class="pi pi-chevron-up"></i></slot>
    </Button>

    <Transition name="expand-delay">
      <div v-if="isExpanded" class="expanded-view">
        <div class="expanded-content-holder">
          <div class="header">
            <slot name="expanded-header">
              <div class="flex">
                <Button
                  class="unexpand-btn p-button-icon-only p-button-text p-button-secondary"
                  @click="toggleExpanded(!isExpanded)"
                >
                  <slot name="unexpanded-button-icon">
                    <i class="pi pi-chevron-down" />
                  </slot>
                </Button>
                <div class="header-content">
                  <slot name="header-content"></slot>
                </div>
              </div>
            </slot>
          </div>
          <slot name="expanded-content"></slot>
        </div>
      </div>
    </Transition>
  </div>
</template>

<style lang="scss">
$container-breakpoint-md: useBreakpointOrFallback("md", 768px);

.persistent-player {
  container-type: inline-size;
  bottom: 0;
  left: 0;
  height: var(--persistent-player-height);
  position: fixed;
  z-index: var(--persistent-player-z-index);
  width: 100%;
  color: var(--text-color);
  background-color: var(--persistent-player-bg);
  transition: bottom 0.25s, height calc(var(--transition-duration) * 2);
  -webkit-transition: bottom 0.25s, height calc(var(--transition-duration) * 2);
  display: flex;
  flex-direction: column;
  justify-content: center;
  &.minimized {
    bottom: calc(
      calc(var(--persistent-player-height) * -1) - var(--persistent-player-height-buffer)
    );
  }
  &.expanded {
    bottom: 0;
    height: 100%;
  }
  .maximize-btn-holder {
    position: absolute;
    display: block;
    right: 0;
    left: 0;
    margin: auto;
    top: calc(-40px - var(--persistent-player-height-buffer));
    width: 40px;
    height: 40px;
    overflow: hidden;

    .maximize-btn.p-button {
      position: absolute;
      display: block;
      right: 0px;
      top: 44px;
      padding: 0.4rem 0.2rem !important;
      width: 40px;
      height: 40px;
      border-radius: 4px 4px 0 0;
      background-color: var(--persistent-player-maximize-btn-bg);
      pointer-events: none;
      transition: top 0.1s;
      -webkit-transition: top 0.1s;
      color: var(--persistent-player-maximize-btn-color);
      &.show {
        transition: top 0.5s;
        -webkit-transition: top 0.5s;
        top: 1px;
        pointer-events: all;
      }

      &:hover {
        background-color: var(--persistent-player-maximize-btn-bg-hover);
      }

      .pi {
        font-size: 0.7rem;
      }

      img {
        width: 100%;
        height: auto;
      }
    }
  }

  .player-controls {
    display: flex;
    align-items: center;
    gap: 16px;
    padding-top: 20px;
    //padding: var(--persistent-player-padding);
  }

  .minimize-btn,
  .expand-btn {
    position: absolute;
    right: 0;
    left: 0;
    margin: auto;
    top: 3px;
    padding: 0.4rem 0.2rem !important;
    background-color: var(--persistent-player-minimize-btn-bg);
    color: var(--persistent-player-minimize-btn-color);
    z-index: 100;
    .pi {
      font-size: 0.7rem;
    }
  }

  .expanded-view {
    padding-top: env(safe-area-inset-top);
    position: relative;
    height: inherit;
    .expanded-content-holder {
      .header {
        position: sticky;
        top: 0;
        background-color: var(--persistent-player-bg);
        padding: 5px 0;
        z-index: 1;
      }
      position: relative;
      overflow-y: auto;
      overflow-x: hidden;
      height: inherit;
    }
  }
  .hideOnMobile {
    @container (max-width: #{$container-breakpoint-md}) {
      display: none;
    }
  }
}
//expand-delay
.expand-delay-enter-active {
  transition: opacity calc(var(--transition-duration) * 2) ease-out;
}
.expand-delay-leave-active {
  transition: opacity calc(var(--transition-duration) * 2) ease-in;
}
.expand-delay-enter-from,
.expand-delay-leave-to {
  opacity: 0;
}
//expand
.expand-enter-active {
  transition: opacity calc(var(--transition-duration) * 2) ease-out;
  transition-delay: calc(var(--transition-duration) * 2.25);
}
.expand-leave-active {
  transition: opacity 0s ease-in;
}
.expand-enter-from,
.expand-leave-to {
  opacity: 0;
}
</style>

<style lang="scss">
.v-persistent-player-stop-window-scrolling {
  height: 100%;
  overflow: hidden;
}
</style>
<style lang="scss">
:root {
  --audio-bg: transparent;
  --audio-border: none;
}
.persistent-player {
  .media-player {
    .vds-slider {
      .vds-slider-value {
        z-index: 201 !important;
      }
    }
  }
}
</style>
