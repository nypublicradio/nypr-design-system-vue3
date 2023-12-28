<script setup lang="ts">

import 'vidstack/player/styles/default/layouts/audio.css';
import 'vidstack/player/styles/default/layouts/video.css';

// Register elements.
import 'vidstack/player';
import 'vidstack/player/layouts';
import 'vidstack/player/ui';

import { isHLSProvider, type MediaCanPlayEvent, type MediaProviderChangeEvent } from 'vidstack';
import type { MediaPlayerElement } from 'vidstack/elements';
import { defineCustomElement, MediaControlsElement,MediaControlsGroupElement, MediaPlayButtonElement, MediaToggleButtonElement, MediaSliderElement } from 'vidstack/elements';

import VImage from "~/v2/src/components/VImage.vue"
import soundAnimGif from '../assets/images/audioAnim.gif'
import VTrackInfo from './VTrackInfo.vue'
import VVolumeControl from './VVolumeControl.vue'
import { useSwipe } from '@vueuse/core'
import { Howl, Howler } from 'howler'
import Button from 'primevue/button'
import { nextTick, onBeforeUnmount, onMounted, ref } from 'vue'

// defineCustomElement(MediaControlsGroupElement);
// defineCustomElement(MediaControlsElement);
// defineCustomElement(MediaPlayButtonElement);
// defineCustomElement(MediaToggleButtonElement);
// defineCustomElement(MediaSliderElement);

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
    default: 1,
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

// handle the scrub end event on the timeline
const scrubTimelineEnd = (e) => {

}
// handle the change event on the timeline
const scrubTimelineChange = (e) => {

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
// handles the click anywhere prop. So if the user clicks anywhere on the player, except the buttons, the player will expand or minimize
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

onMounted(async() => {
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

  await nextTick()
  const instance = document.querySelector("media-player");
  if (instance) {
    // Read
    const { playing, paused, seeking, canPlay,volume,muted } = instance.state;

    //subscribe to state changess
    instance.subscribe(({ playing }) => {
      console.log("is playing = ", playing)
      if (playing) {
        emit('toggle-play', true)
      }
    });
    instance.subscribe(({ paused }) => {
      console.log("is paused = ", paused)
      if (paused) {
        emit('toggle-play', false)
      }
    });
    instance.subscribe(({ seeking }) => {
      console.log("is seeking = ", seeking)
      if($mediaPlayerRef.value){
        emit('scrub-timeline-change', $mediaPlayerRef.value.currentTime)
        if ($mediaPlayerRef.value && !seeking) {
          emit('scrub-timeline-end', $mediaPlayerRef.value.currentTime)
          console.log("$mediaPlayerRef.value.currentTime = ", $mediaPlayerRef.value.currentTime)
        }
      }
    });
    instance.subscribe(({ canPlay }) => {
      console.log("canPlay = ", canPlay)
    });
    instance.subscribe(({ volume }) => {
      console.log("volume = ", volume)
      emit('volume-change', volume)
    });
    instance.subscribe(({ muted }) => {
      console.log("muted = ", muted)
      emit('volume-toggle-mute', muted)
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
        <ClientOnly>
          <media-player
            class="media-player"
            :title="props.title"
            :src="props.file"
            :autoplay="props.autoPlay"
            view-type="audio"
            load="eager"
            :volume="props.volume"
            :stream-type="props.livestream ? 'live:dvr' : 'on-demand'"
            :loop="props.loop"
            poster="https://i.natgeofe.com/n/4cebbf38-5df4-4ed0-864a-4ebeb64d33a4/NationalGeographic_1468962_3x2.jpg?w=1638&h=1092"
            crossorigin
            ref="$mediaPlayerRef"
          >
            <media-provider></media-provider>

            <media-controls>
              <div class="flex">
                <div>image</div>
                <div>
                  <media-controls-group>
                    <media-play-button class="media-button">
                      <media-icon type="play" class="play-icon">play</media-icon>
                      <media-icon type="pause" class="pause-icon">pause</media-icon>
                    </media-play-button>
                    <media-time-slider class="media-slider">
                      <div class="media-slider-track">
                        <div class="media-slider-track-fill media-slider-track"></div>
                        <div class="media-slider-progress media-slider-track"></div>
                      </div>
                      <div class="media-slider-thumb"></div>
                    </media-time-slider>
                  </media-controls-group>
                  <div class="media-controls-spacer"></div>
                  <media-controls-group>Center Controls Group</media-controls-group>
                  <div class="media-controls-spacer"></div>
                  <media-controls-group>Bottom Controls Group</media-controls-group>
                </div>
              </div>
            </media-controls>
            <!-- <media-controls>
            <MediaPlayButton class="media-button">
              <media-icon type="play" class="play-icon">play</media-icon>
              <media-icon type="pause" class="pause-icon">pause</media-icon>
            </MediaPlayButton>
            <media-scrubber class="media-scrubber"></media-scrubber>
            <media-time class="media-time" type="current"></media-time>
            <media-time class="media-time" type="duration"></media-time>
            <media-volume class="media-button"></media-volume>
            <media-fullscreen-button class="media-button"></media-fullscreen-button>
          </media-controls> -->
          </media-player>
        </ClientOnly>
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
    //padding: var(--persistent-player-padding);
    padding-top: 20px;
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
  .vds-audio-layout {
    --audio-brand: #f5f5f5;
    --audio-controls-color: #f5f5f5;
    --audio-focus-ring-color: rgb(78 156 246);
    --audio-focus-ring: 0 0 0 3px var(--media-focus-ring-color);
    --audio-font-family: sans-serif;

    --audio-bg: transparent;
    --audio-border-radius: 0px;
    --audio-border: none;

    /* Buttons. */
    --audio-button-size: 40px;
    --audio-play-button-size: 43px;

    /* Sliders. */
    --audio-slider-chapter-title-color: white;
    --audio-slider-value-border: 1px solid rgb(255 255 255 / 0.1);

    /* Menus. */
    --audio-menu-max-height: 320px;

    /* Buffering. */
    --audio-buffering-stripe-color: rgb(0 0 0 / 0.25);
    --audio-buffering-stripe-size: 30px;
    --audio-buffering-stripe-speed: 2s;

    /* Captions. */
    --audio-captions-offset: 2px;
    --audio-captions-bg: transparent;
    --audio-cue-font-size: 14px;
    --audio-cue-color: white;
    --audio-cue-border: 1px solid rgb(255 255 255 / 0.1);
    --audio-cue-bg: black;
  }
  .vds-audio-layout,
  .vds-video-layout {
    /* Shared. */
    --media-brand: #f5f5f5;
    --media-controls-color: #f5f5f5;
    --media-font-family: sans-serif;

    /* Buffering. */
    --media-buffering-animation: vds-buffering-spin 1s linear infinite;
    --media-buffering-size: 96px;
    --media-buffering-track-color: #f5f5f5;
    --media-buffering-track-fill-color: var(--media-brand);
    --media-buffering-track-fill-offset: 50;
    --media-buffering-track-fill-opacity: 0.75;
    --media-buffering-track-fill-width: 9;
    --media-buffering-track-opacity: 0.25;
    --media-buffering-track-width: 8;
    --media-buffering-transition: opacity 200ms ease;

    /* Buttons. */
    --media-button-border-radius: 50%;
    --media-button-color: var(--media-controls-color, #f5f5f5);
    --media-button-hover-bg: rgb(255 255 255 / 0.2);
    --media-button-hover-transform: scale(1);
    --media-button-hover-transition: transform 0.2s ease-in;
    --media-button-icon-size: 80%;
    --media-button-padding: 0px;
    --media-button-size: 40px;
    --media-button-touch-hover-bg: rgb(255 255 255 / 0.2);
    --media-button-touch-hover-border-radius: 100%;
    --media-sm-fullscreen-button-size: 42px;
    --media-fullscreen-button-size: 42px;

    /* Tooltips. */
    --media-tooltip-bg-color: black;
    --media-tooltip-border-radius: 4px;
    --media-tooltip-border: 1px solid rgb(255 255 255 / 0.1);
    --media-tooltip-color: hsl(0, 0%, 80%);
    --media-tooltip-font-size: 13px;
    --media-tooltip-font-weight: 500;
    --media-tooltip-padding: 2px 8px;
    --media-tooltip-enter-animation: vds-tooltip-enter 0.2s ease-in;
    --media-tooltip-exit-animation: vds-tooltip-exit 0.2s ease-out;

    /* Live Indicator. */
    --media-live-button-bg: #8a8a8a;
    --media-live-button-border-radius: 2px;
    --media-live-button-color: #161616;
    --media-live-button-edge-bg: #dc2626;
    --media-live-button-edge-color: #f5f5f5;
    --media-live-button-font-size: 12px;
    --media-live-button-font-weight: 600;
    --media-live-button-height: 40px;
    --media-live-button-letter-spacing: 1.5px;
    --media-live-button-padding: 1px 4px;
    --media-live-button-width: 40px;

    /* Captions. */
    --media-captions-padding: 1%;
    --media-cue-backdrop: blur(8px);
    --media-cue-bg: rgba(0, 0, 0, 0.7);
    --media-cue-border-radius: 2px;
    --media-cue-border: unset;
    --media-cue-box-shadow: var(--cue-box-shadow);
    --media-cue-color: white;
    --media-cue-display-bg: unset;
    --media-cue-display-border-radius: unset;
    --media-cue-display-padding: unset;
    --media-cue-font-size: calc(var(--overlay-height) / 100 * 4.5);
    --media-cue-line-height: calc(var(--cue-font-size) * 1.2);
    --media-cue-padding-x: calc(var(--cue-font-size) * 0.4);
    --media-cue-padding-x: calc(var(--cue-font-size) * 0.6);
    --media-lg-fullscreen-cue-font-size: calc(var(--overlay-height) / 100 * 3);

    /* Chapter Title. */
    --media-chapter-title-color: rgba(255 255 255 / 0.64);
    --media-chapter-title-font-size: 14px;
    --media-chapter-title-font-weight: 500;
    --media-chapter-title-separator-color: var(--color);
    --media-chapter-title-separator-gap: 6px;
    --media-chapter-title-separator: "\2022";

    /* Controls. */
    --media-controls-padding: 0px;
    --media-controls-in-transition: opacity 0.2s ease-in;
    --media-controls-out-transition: opacity 0.2s ease-out;

    /* Thumbnails. */
    --media-thumbnail-bg: black;
    --media-thumbnail-border: 1px solid white;
    --media-thumbnail-aspect-ratio: 16 / 9;
    --media-thumbnail-min-width: 120px;
    --media-thumbnail-min-height: calc(
      var(--media-thumbnail-min-width) / var(--aspect-ratio)
    );
    --media-thumbnail-max-width: 180px;
    --media-thumbnail-max-height: calc(
      var(--media-thumbnail-max-width) / var(--aspect-ratio)
    );

    /* Time. */
    --media-time-bg: unset;
    --media-time-border-radius: unset;
    --media-time-border: unset;
    --media-time-color: #f5f5f5;
    --media-time-divider-color: #e0e0e0;
    --media-time-divider-gap: 2.5px;
    --media-time-font-size: 14px;
    --media-time-font-weight: 400;
    --media-time-letter-spacing: 0.025em;

    /* Sliders. */
    --media-slider-width: 100%;
    --media-slider-height: 48px;

    /* Slider Thumb. */
    --media-slider-thumb-bg: #fff;
    --media-slider-thumb-border-radius: 9999px;
    --media-slider-thumb-border: 1px solid #cacaca;
    --media-slider-thumb-size: 15px;
    --media-slider-thumb-transition: opacity 0.2s ease-in, box-shadow 0.2s ease;

    /* Slider Tracks. */
    --media-slider-track-width: 100%;
    --media-slider-track-bg: rgb(255 255 255 / 0.3);
    --media-slider-track-border-radius: 1px;
    --media-slider-track-fill-bg: var(--media-brand);
    --media-slider-track-fill-live-bg: #dc2626;
    --media-slider-track-height: 5px;
    --media-slider-track-progress-bg: rgb(255 255 255 / 0.5);
    --media-slider-focused-thumb-shadow: 0 0 0 4px hsla(0, 0%, 100%, 0.4);
    --media-slider-focused-thumb-size: calc(var(--thumb-size) * 1.1);
    --media-slider-focused-track-height: calc(var(--track-height) * 1.25);
    --media-slider-focused-track-height: var(--track-height);
    --media-slider-focused-track-width: calc(var(--track-width) * 1.25);
    --media-slider-focused-track-width: var(--track-width);

    /* Slider Chapter. */
    --media-slider-chapter-hover-transform: scaleY(2);
    --media-slider-chapter-hover-transition: transform 0.1s cubic-bezier(0.4, 0, 1, 1);

    /* Slider Preview. */
    --media-slider-preview-bg: unset;
    --media-slider-preview-border-radius: 2px;

    /* Slider Chapter Title. */
    --media-slider-chapter-title-bg: unset;
    --media-slider-chapter-title-color: #f5f5f5;
    --media-slider-chapter-title-font-size: 14px;
    --media-slider-chapter-title-gap: 6px;

    /* Slider Value. */
    --media-slider-value-bg: black;
    --media-slider-value-border-radius: 2px;
    --media-slider-value-border: unset;
    --media-slider-value-color: white;
    --media-slider-value-gap: 0px;
    --media-slider-value-padding: 1px 10px;

    /* Menus. */
    --media-menu-bg: rgb(10 10 10 / 0.95);
    --media-menu-border-radius: 8px;
    --media-menu-border: 1px solid rgb(255 255 255 / 0.1);
    --media-menu-box-shadow: 1px 1px 1px rgb(10 10 10 / 0.5);
    --media-menu-button-icon-rotate-deg: 90deg;
    --media-menu-enter-animation: vds-menu-enter 0.3s ease-out;
    --media-menu-exit-animation: vds-menu-exit 0.2s ease-out;
    --media-menu-divider: 1px solid rgb(245 245 245 /0.15);
    --media-menu-font-size: 15px;
    --media-menu-font-weight: 500;
    --media-menu-max-height: 250px;
    --media-menu-min-width: 220px;
    --media-menu-padding: 10px;
    --media-menu-scrollbar-thumb-bg: rgb(245 245 245 / 0.1);
    --media-menu-scrollbar-track-bg: rgb(245 245 245 / 0.08);
    --media-menu-top-bar-bg: rgb(10 10 10 / 0.6);
    --media-sm-menu-landscape-max-height: min(70vh, 400px);
    --media-sm-menu-portrait-max-height: 40vh;

    /* Menu Item. */
    --media-menu-item-bg: transparent;
    --media-menu-item-border-radius: 2px;
    --media-menu-item-border: 0;
    --media-menu-item-color: #f5f5f5;
    --media-menu-item-hover-bg: rgb(245 245 245 / 0.08);
    --media-menu-item-icon-size: 22px;
    --media-menu-item-icon-spacing: 6px;
    --media-menu-item-info-color: rgb(168, 169, 171);
    --media-menu-item-info-font-size: 13px;
    --media-menu-item-padding: 12px;
    --media-sm-menu-item-padding: 12px;

    /* Menu Radio. */
    --media-menu-radio-check-active-color: #f5f5f5;
    --media-menu-radio-check-border: 2px solid rgb(245 245 245 / 0.5);
    --media-menu-radio-check-inner-size: 4px;
    --media-menu-radio-check-size: 9px;

    /* Menu Hint. */
    --media-menu-hint-color: rgb(245 245 245 / 0.5);
    --media-menu-hint-font-size: 14px;

    /* Chapters Menu. */
    --media-chapters-divider: 1px solid rgb(245 245 245 / 0.1);
    --media-chapters-duration-bg: unset;
    --media-chapters-duration-border-radius: 2px;
    --media-chapters-duration-color: rgb(245 245 245 / 0.5);
    --media-chapters-duration-font-size: 12px;
    --media-chapters-duration-font-weight: 500;
    --media-chapters-duration-gap: 6px;
    --media-chapters-focus-padding: 4px;
    --media-chapters-item-active-bg: rgb(255 255 255 / 0.05);
    --media-chapters-item-active-border-left: unset;
    --media-chapters-label-active-color: #f5f5f5;
    --media-chapters-label-active-font-weight: 500;
    --media-chapters-label-color: rgb(245 245 245 / 0.64);
    --media-chapters-label-font-size: 15px;
    --media-chapters-label-font-weight: 500;
    --media-chapters-label-white-space: nowrap;
    --media-chapters-min-width: var(--media-menu-min-width: 220px);
    --media-chapters-padding: 0;
    --media-chapters-progress-bg: var(--media-brand);
    --media-chapters-progress-border-radius: 0;
    --media-chapters-progress-height: 3px;
    --media-chapters-start-time-bg: rgb(156 163 175 / 0.2);
    --media-chapters-start-time-border-radius: 2px;
    --media-chapters-start-time-color: rgb(168, 169, 171);
    --media-chapters-start-time-font-size: 12px;
    --media-chapters-start-time-font-weight: 500;
    --media-chapters-start-time-gap: 6px;
    --media-chapters-start-time-letter-spacing: 0.4px;
    --media-chapters-start-time-padding: 1px 4px;
    --media-chapters-thumbnail-border: 0;
    --media-chapters-thumbnail-gap: 12px;
    --media-chapters-thumbnail-max-height: 68px;
    --media-chapters-thumbnail-max-width: 120px;
    --media-chapters-thumbnail-min-height: 56px;
    --media-chapters-thumbnail-min-width: 100px;
    --media-chapters-with-thumbnails-min-width: 300px;
  }
}
.persistent-player {
  .media-player {
    .vds-slider {
      .vds-slider-value {
        z-index: 201 !important;
      }
    }
    .media-button {
      display: inline-flex;
      position: relative;
      justify-content: center;
      align-items: center;
      width: 40px;
      height: 40px;
      color: var(--night-500);

      margin-right: 2.5px;
      background-color: white;
      cursor: pointer;
    }

    .media-button > media-icon {
      width: 80%;
      height: 80%;
      border-radius: 2px;
    }

    .media-button[data-focus] > media-icon {
      box-shadow: var(--media-focus-ring);
    }

    @media (hover: hover) and (pointer: fine) {
      .media-button:hover {
        //background-color: rgb(255 255 255 / 0.2);
      }
    }

    .media-button[data-paused] .pause-icon,
    .media-button:not([data-paused]) .play-icon {
      display: none;
    }

    .media-slider {
      display: inline-flex;
      align-items: center;
      width: 100%;
      height: 40px;
      position: relative;
      contain: layout style;
      outline: none;
      pointer-events: auto;
      cursor: pointer;
      user-select: none;
      touch-action: none;
      max-width: 72px;
      /** Prevent thumb flowing out of slider (15px = thumb width). */
      margin: 0 calc(15px / 2);
      -webkit-user-select: none;
      -webkit-tap-highlight-color: transparent;
    }

    .media-slider[data-focus] .media-slider-track {
      box-shadow: var(--media-focus-ring, 0 0 0 3px rgb(78 156 246));
    }

    .media-slider-track {
      z-index: 0;
      position: absolute;
      width: 100%;
      height: 5px;
      top: 50%;
      left: 0;
      border-radius: 1px;
      transform: translateY(-50%) translateZ(0);
      background-color: rgb(255 255 255 / 0.3);
      contain: strict;
    }

    .media-slider-track-fill {
      z-index: 2; /** above track. */
      background-color: #f5f5f5;
      width: var(--slider-fill, 0%);
      will-change: width;
    }

    .media-slider-thumb {
      position: absolute;
      top: 50%;
      left: var(--slider-fill);
      opacity: 0;
      contain: layout size style;
      width: 15px;
      height: 15px;
      border: 1px solid #cacaca;
      border-radius: 9999px;
      background-color: #fff;
      transform: translate(-50%, -50%) translateZ(0);
      transition: opacity 0.15s ease-in;
      pointer-events: none;
      will-change: left;
      z-index: 2; /** above track fill. */
    }

    .media-slider[data-active] .media-slider-thumb {
      opacity: 1;
      transition: opacity 0.2s ease-in;
    }

    .media-slider[data-dragging] .media-slider-thumb {
      box-shadow: 0 0 0 3px hsla(0, 0%, 100%, 0.4);
    }
  }
}
</style>
