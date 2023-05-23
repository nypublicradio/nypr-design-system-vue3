<script setup>
import { ref, onMounted, onBeforeUnmount } from 'vue'
import VVolumeControl from './VVolumeControl.vue'
import VTrackInfo from './VTrackInfo.vue'
import Button from 'primevue/button'
import { Howl, Howler } from 'howler'
import { useSwipe } from '@vueuse/core'
import soundAnimGif from '../assets/images/audioAnim.gif'

const props = defineProps({
  autoPlay: {
    type: Boolean,
    default: false,
  },
  description: {
    type: String,
    default: null,
  },
  descriptionLink: {
    type: String,
    default: null,
  },
  file: {
    type: String,
    default: null,
  },
  livestream: {
    type: Boolean,
    default: false,
  },
  loop: {
    type: Boolean,
    default: false,
  },
  isLoading: {
    type: Boolean,
    default: false,
  },
  showDownload: {
    type: Boolean,
    default: false,
  },
  showSkip: {
    type: Boolean,
    default: true,
  },
  hideDownloadMobile: {
    type: Boolean,
    default: true,
  },
  hideSkipMobile: {
    type: Boolean,
    default: true,
  },
  showTrack: {
    type: Boolean,
    default: true,
  },
  station: {
    type: String,
    default: null,
  },
  image: {
    type: String,
    default: null,
  },
  title: {
    type: String,
    default: null,
  },
  titleLink: {
    type: String,
    default: null,
  },
  isMuted: {
    type: Boolean,
    default: false,
  },
  canMinimize: {
    type: Boolean,
    default: false,
  },
  canExpand: {
    type: Boolean,
    default: false,
  },
  canExpandWithSwipe: {
    type: Boolean,
    default: false,
  },
  canUnexpandWithSwipe: {
    type: Boolean,
    default: false,
  },
  volume: {
    type: Number,
    default: 100,
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
  'togglePlay',
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
])

//swipe setup
const playerRef = ref(null)
const { direction, lengthY } = useSwipe(playerRef, {
  passive: true,
  onSwipe() {
    if (props.canExpand && props.canExpandWithSwipe) {
      if (direction.value === 'up' && lengthY.value > 100) {
        isExpanded.value = true
      }
    }
    if (props.canExpand && props.canUnexpandWithSwipe) {
      if (direction.value === 'down' && lengthY.value < -100) {
        isExpanded.value = false
      }
    }
  },
})

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

const convertTime = (val) => {
  const hhmmss = new Date(val * 1000).toISOString().substr(11, 8)
  return hhmmss.indexOf('00:') === 0 ? hhmmss.substr(3) : hhmmss
}
const download = () => {
  emit('download')
  window.open(props.file, '_blank')
}
const goAhead15 = () => {
  if (sound) {
    emit('ahead-15')
    sound.seek(sound.seek() + 15)
    updateCurrentSeconds()
  }
}
const goBack15 = () => {
  if (sound) {
    emit('back-15')
    sound.seek() > 15 ? sound.seek(sound.seek() - 15) : sound.seek(0.1)
    updateCurrentSeconds()
  }
}

const togglePlay = () => {
  if (!sound || !currentFile.value === props.file) {
    // destoy old sound if one exists
    sound ? sound.unload() : null
    currentFile.value = props.file
    loading.value = true
    sound = new Howl({
      src: [props.file],
      html5: true,
      preload: true,
      onload: function () {
        emit('sound-loaded')
        loading.value = false
        durationSeconds.value = sound.duration()
      },
      onloaderror: function (id, errorCode) {
        emit('load-error', [id, errorCode])
      },
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
    })
  }
  // Play or pause the sound.
  if (sound && sound.playing()) {
    emit('togglePlay', false)
    playing.value = false
    sound.pause()
    clearDurationInterval()
  } else {
    playing.value = true
    emit('togglePlay', true)
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
const updateCurrentSeconds = () => {
  currentSeconds.value = sound.seek()
}

const startDurationInterval = () => {
  interval = setInterval(() => {
    updateCurrentSeconds()
  }, 1000)
}
const clearDurationInterval = () => {
  clearInterval(interval)
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

defineExpose({
  togglePlay,
  toggleMinimize,
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
          @scrub-timeline-change="scrubTimelineChange"
          @scrub-timeline-end="scrubTimelineEnd"
          @timeline-click="timelineClick"
          @image-click="emit('image-click')"
          @description-click="emit('description-click')"
          @title-click="emit('title-click')"
        />
        <v-volume-control
          class="hidden md:flex"
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
          :class="{ [`hidden md:flex`]: props.hideSkipMobile }"
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
          :class="{ [`hidden md:flex`]: props.hideSkipMobile }"
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
          :class="{ [`hidden md:flex`]: props.hideDownloadMobile }"
          aria-label="download"
          @click="download"
          @keypress.space.enter="download"
        >
          <slot name="download">
            <i class="pi pi-download download-icon"></i>
          </slot>
        </Button>
        <Button
          v-if="props.canMinimize"
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
          v-if="props.canExpand && !isExpanded"
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
                  class="p-button-icon-only p-button-text p-button-secondary"
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
.persistent-player {
  bottom: 0;
  left: 0;
  height: var(--persistent-player-height);
  position: fixed;
  z-index: var(--persistent-player-z-index);
  width: 100%;
  padding: 8px 16px 8px 8px;
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
  }

  a,
  a:visited,
  a:active {
    color: var(--persistent-player-text-button-color);

    text-decoration: none;

    &:hover {
      text-decoration: none;
      color: var(--persistent-player-text-button-color-hover) !important;
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
