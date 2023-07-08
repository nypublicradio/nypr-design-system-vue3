<script setup>
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
   * radio station name
   */
  station: {
    default: null,
    type: String,
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
  'ahead-15',
  'back-15',
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
])

//swipe setup
const playerRef = ref(null)
const { direction, lengthY } = useSwipe(playerRef, {
  onSwipe() {
    if (props.canExpand && props.canExpandWithSwipe) {
      if (direction.value === 'up' && lengthY.value > 100) {
        isExpanded.value = true
        emit('swipe-up')
      }
    }
    if (props.canExpand && props.canUnexpandWithSwipe) {
      if (direction.value === 'down' && lengthY.value < -100) {
        isExpanded.value = false
        emit('swipe-down')
      }
    }
  },
  passive: true,
})
const updateCurrentSeconds = () => {
  currentSeconds.value = sound.seek()
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
// makes the audio skip ahead 15 seconds
const goAhead15 = () => {
  if (sound) {
    emit('ahead-15')
    sound.seek(sound.seek() + 15)
    updateCurrentSeconds()
  }
}
// makes the audio skip back 15 seconds
const goBack15 = () => {
  if (sound) {
    emit('back-15')
    sound.seek() > 15 ? sound.seek(sound.seek() - 15) : sound.seek(0.1)
    updateCurrentSeconds()
  }
}
// the base clock interval for the audio player
const startDurationInterval = () => {
  interval = setInterval(() => {
    updateCurrentSeconds()
  }, 1000)
}
const clearDurationInterval = () => {
  clearInterval(interval)
}
const togglePlay = () => {
  if (!sound || !currentFile.value === props.file) {
    // destoy old sound if one exists
    sound ? sound.unload() : null
    currentFile.value = props.file
    loading.value = true
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
        }
      },
      onload: function () {
        emit('sound-loaded')
        loading.value = false
        durationSeconds.value = sound.duration()
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

const volumeToggleMute = (e) => {
  emit('volume-toggle-mute', e)
  muted.value = !muted.value
  sound.mute(muted.value)
}

const volumeChange = (e) => {
  if (sound) {
    emit('volume-change', e)
    sound.volume(e / 100)
    volume.value = e
  }
}

let onceFlag = null
let scrubWhenPaused = false
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

const timelineClick = (e) => {
  emit('timeline-click', e)
  scrubTimelineEnd(e)
}
// exposed method to handle the minimize toggle
const toggleMinimize = (e) => {
  emit('is-minimized', e)
  isMinimized.value = e
}
const toggleExpanded = (e) => {
  emit('is-expanded', e)
  isExpanded.value = e
}

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
        if (volume.value < 100 && sound) {
          volume.value++
        }
        break
      case 'ArrowDown':
        if (volume.value > 0 && sound) {
          volume.value--
        }
        break
      case 'ArrowLeft':
        goBack15()
        break
      case 'ArrowRight':
        goAhead15()
        break
      default:
        /* code */
        break
    }
  })

  /*   window.addEventListener('keyup', (event) => {
    // checks to see if the play-button is focused/active element, because then, hitting the Space or Enter key will toggle play by simulating a click as a normal browser feature... thus, we can bypass the following keyup event listeners in that case.
    var isPlayButtonActive =
      document.getElementsByClassName('the-play-button')[0] ===
      document.activeElement
    if (!isPlayButtonActive) {
      switch (event.code) {
        case 'Space':
          togglePlay()
          break
        case 'Enter':
          togglePlay()
          break
      }
    }
  }) */

  // auto play
  props.autoPlay ? togglePlay() : null
})

onBeforeUnmount(() => {
  // stop the audio
  sound ? sound.unload() : null
})

defineExpose({
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
      <div v-if="!isExpanded" class="player-controls">
        <div
          class="v-track-info-wrapper"
          :class="[{ cursor: props.canClickAnywhere }]"
          @click="handleClickAnywhere"
        >
          <v-track-info
            :livestream="props.livestream"
            :station="props.station"
            :image="props.image"
            :title="props.title"
            :title-link="props.titleLink"
            :description="props.description"
            :description-link="props.descriptionLink"
            :buffered="buffered"
            :current-seconds="currentSeconds"
            :duration-seconds="durationSeconds"
            :hide-image-on-mobile="props.hideImageOnMobile"
            :hide-description-on-mobile="props.hideDescriptionOnMobile"
            :hide-time-on-mobile="props.hideTimeOnMobile"
            :timeline-interactive="props.timelineInteractive"
            :timeline-bottom="props.timelineBottom"
            :timeline-top="props.timelineTop"
            :can-expand-with-click-anywhere="props.canClickAnywhere"
            @scrub-timeline-change="scrubTimelineChange"
            @scrub-timeline-end="scrubTimelineEnd"
            @timeline-click="timelineClick"
            @image-click="emit('image-click')"
            @description-click="emit('description-click')"
            @title-click="emit('title-click')"
          />
        </div>
        <v-volume-control
          class="hideOnMobile"
          :disabled="!currentFile"
          :volume="volume"
          :is-muted="muted"
          @volume-toggle-mute="volumeToggleMute"
          @volume-change="volumeChange"
        >
          <template #volumeOn>
            <slot name="volumeOn"></slot>
          </template>
          <template #volumeOff>
            <slot name="volumeOff"></slot>
          </template>
        </v-volume-control>
        <Button
          v-if="props.showSkip && !props.livestream"
          title="Go Back 15 Seconds"
          class="player-back-15-icon p-button-icon-only p-button-text p-button-secondary"
          :class="{ [`hideOnMobile`]: props.hideSkipMobile }"
          aria-label="go back 15 seconds"
          @click="goBack15"
        >
          <slot name="prev"><i class="pi pi-replay"></i></slot>
        </Button>
        <Button
          :disabled="loading"
          :title="playing ? 'Pause' : props.livestream ? 'Listen Live' : 'Play'"
          class="the-play-button play-button p-button-icon-only"
          :aria-label="playing ? 'Pause button' : 'Play button'"
          @click="togglePlay"
        >
          <slot v-if="!playing && !loading" name="play"
            ><i class="pi pi-play"></i
          ></slot>
          <slot v-if="playing && !loading" name="pause"
            ><i class="pi pi-pause"></i
          ></slot>
          <slot v-if="loading" name="loading"
            ><i class="pi pi-spin pi-spinner"></i
          ></slot>
        </Button>
        <Button
          v-if="props.showSkip && !props.livestream"
          title="Go Ahead 15 Seconds"
          class="player-ahead-15-icon p-button-icon-only p-button-text p-button-secondary"
          :class="{ [`hideOnMobile`]: props.hideSkipMobile }"
          aria-label="go ahead 15 seconds"
          @click="goAhead15"
        >
          <slot name="skip">
            <i class="pi pi-refresh"></i>
          </slot>
        </Button>

        <Button
          v-if="props.showDownload && !props.livestream"
          title="Download"
          tabindex="0"
          class="player-download-icon p-button-icon-only p-button-text p-button-secondary"
          :class="{ [`hideOnMobile`]: props.hideDownloadMobile }"
          aria-label="download"
          @click="download"
          @keypress.space.enter="download"
        >
          <slot name="download">
            <i class="pi pi-download download-icon"></i>
          </slot>
        </Button>
        <Button
          v-if="props.canMinimize && !props.canClickAnywhere"
          title="Minimize Player"
          class="minimize-btn p-button-icon-only p-button-text p-button-secondary"
          aria-label="minimize player"
          @click="toggleMinimize(!isMinimized)"
        >
          <slot name="chevronDown">
            <i class="pi pi-chevron-down"></i>
          </slot>
        </Button>
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
      </div>
    </Transition>
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

<style lang="scss" scoped>
$container-breakpoint-md: useBreakpointOrFallback('md', 768px);

.persistent-player {
  container-type: inline-size;
  bottom: 0;
  left: 0;
  height: var(--persistent-player-height);
  position: fixed;
  z-index: var(--persistent-player-z-index);
  width: 100%;
  padding: var(--persistent-player-padding);
  color: var(--text-color);
  background-color: var(--persistent-player-bg);
  transition: bottom 0.25s, height calc(var(--transition-duration) * 2);
  -webkit-transition: bottom 0.25s, height calc(var(--transition-duration) * 2);
  display: flex;
  flex-direction: column;
  justify-content: center;
  &.minimized {
    bottom: calc(
      calc(var(--persistent-player-height) * -1) -
        var(--persistent-player-height-buffer)
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

    .play-button {
      min-width: var(--persistent-player-play-button-width);
      min-height: var(--persistent-player-play-button-height);
      border-radius: var(--persistent-player-play-button-radius);
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
      .pi {
        font-size: 0.7rem;
      }
    }
    .p-button-text {
      border-radius: var(--persistent-player-text-button-radius);
      color: var(--persistent-player-text-button-color);
      &:hover {
        color: var(--persistent-player-text-button-color-hover) !important;
      }
    }
    .v-track-info-wrapper {
      display: flex;
      gap: 12px;
      width: 100%;
      height: inherit;
      flex: auto;
      align-self: center;
      &.cursor {
        cursor: pointer;
      }
    }
  }
  .expanded-view {
    position: relative;
    height: inherit;
    .expanded-content-holder {
      .header {
        position: sticky;
        top: 0;
        background-color: var(--persistent-player-bg);
        padding: 5px 0;
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
.persistent-player {
  .track-info-title {
    a,
    a:visited,
    a:active {
      color: var(--persistent-player-text-button-color);

      text-decoration: var(--persistent-player-title-decoration) !important;

      &:hover {
        text-decoration: var(
          --persistent-player-title-hover-decoration
        ) !important;
        color: var(--persistent-player-text-button-color-hover) !important;
      }
    }
  }
}
</style>
