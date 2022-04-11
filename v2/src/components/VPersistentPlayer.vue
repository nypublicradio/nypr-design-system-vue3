<script setup>
import { ref, onMounted, onBeforeUnmount } from 'vue'
import VVolumeControl from './VVolumeControl'
import VTrackInfo from './VTrackInfo'
import Button from 'primevue/button'
import { Howl, Howler } from 'howler'
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
  isPlaying: {
    type: Boolean,
    default: false,
  },
  shouldShowCta: {
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
})
let interval = null
const currentSeconds = ref(0)
const durationSeconds = ref(0)

const buffered = ref(0)
const innerLoop = ref(false)
const volume = ref(50)

const loading = ref(props.isLoading)
const playing = ref(props.isPlaying)
const muted = ref(props.isMuted)
const currentFile = ref(null)

const isMinimized = ref(false)

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
])

onMounted(() => {
  innerLoop.value = props.loop
  // keyboard accessibility
  window.addEventListener('keydown', (event) => {
    switch (event.code) {
      case 'Space':
        togglePlay()
        break
      case 'Enter':
        togglePlay()
        break
      case 'ArrowUp':
        if (volume.value < 100) {
          volume.value++
        }
        break
      case 'ArrowDown':
        if (volume.value > 0) {
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

  // auto play
  props.autoPlay ? togglePlay() : null
})

onBeforeUnmount(() => {
  // stop the audio
  sound.unload()
})

const convertTime = (val) => {
  const hhmmss = new Date(val * 1000).toISOString().substr(11, 8)
  return hhmmss.indexOf('00:') === 0 ? hhmmss.substr(3) : hhmmss
}
const download = () => {
  emit('download')
  window.open(props.file, '_top')
}
const goAhead15 = () => {
  emit('ahead-15')
  sound.seek(sound.seek() + 15)
  updateCurrentSeconds()
}
const goBack15 = () => {
  emit('back-15')(sound.seek() > 15)
    ? sound.seek(sound.seek() - 15)
    : sound.seek(0)
  updateCurrentSeconds()
}

let sound = null
const togglePlay = () => {
  emit('togglePlay')
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
      onloaderror: function () {
        emit('load-error')
      },
      onend: function () {
        emit('sound-ended')
        sound.unload()
      },
    })
  }
  // Play or pause the sound.
  if (sound.playing()) {
    playing.value = false
    sound.pause()
    clearDurationInterval()
  } else {
    playing.value = true
    startDurationInterval()
    sound.play()
  }
  // Change global volume init
  Howler.volume(volume.value)
}

const volumeToggleMute = (e) => {
  emit('volume-toggle-mute')
  muted.value = !muted.value
  sound.mute(muted.value)
}

const volumeChange = (e) => {
  emit('volume-change')
  sound.volume(e / 100)
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
  emit('scrub-timeline-end')
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
  if (!onceFlag) {
    emit('scrub-timeline-change')
    onceFlag = true
    if (playing.value) {
      togglePlay()
      scrubWhenPaused = false
    } else {
      scrubWhenPaused = true
    }
  }
}
</script>

<template>
  <div class="persistent-player" :class="{ minimized: isMinimized }">
    <Button
      v-if="props.canMinimize"
      title="Minimize Player"
      class="minimize-btn p-button-icon-only p-button-text p-button-secondary"
      aria-label="minimize player"
      @click="isMinimized = !isMinimized"
    >
      <i class="pi pi-chevron-down"></i>
    </Button>
    <div class="maximize-btn-holder">
      <Button
        v-if="props.canMinimize"
        title="maximize Player"
        class="maximize-btn p-button-icon-only"
        :class="{ show: isMinimized }"
        aria-label="maximize player"
        @click="isMinimized = !isMinimized"
      >
        <img v-if="playing" :src="soundAnimGif" alt="sounds wave animation" />
        <i v-else class="pi pi-chevron-up"></i>
      </Button>
    </div>
    <div class="player-controls">
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
        @image-click="emit('image-click')"
        @description-click="emit('description-click')"
        @title-click="emit('title-click')"
      />
      <template v-if="props.shouldShowCta">
        <v-volume-control
          :volume="volume"
          :is-muted="muted"
          @volume-toggle-mute="volumeToggleMute"
          @volume-change="volumeChange"
        />
        <Button
          label="Listen Live"
          icon="pi pi-play"
          class="player-cta-play-button"
          @click="togglePlay"
        ></Button>
      </template>
      <template v-else>
        <v-volume-control
          :volume="volume"
          :is-muted="muted"
          @volume-toggle-mute="volumeToggleMute"
          @volume-change="volumeChange"
        />
        <Button
          v-if="props.showSkip && !props.livestream"
          title="Go Back 15 Seconds"
          class="player-back-15-icon p-button-icon-only p-button-text p-button-secondary"
          aria-label="go back 15 seconds"
          @click="goBack15"
        >
          <i class="pi pi-replay"></i>
        </Button>
        <Button
          :title="playing ? 'Pause' : 'Play'"
          class="play-button p-button-icon-only"
          @click="togglePlay"
        >
          <i v-if="!playing && !loading" class="pi pi-play"></i>
          <i v-if="playing && !loading" class="pi pi-pause"></i>
          <i v-if="loading" class="pi pi-spin pi-spinner"></i>
        </Button>
        <Button
          v-if="props.showSkip && !props.livestream"
          title="Go Ahead 15 Seconds"
          class="player-ahead-15-icon p-button-icon-only p-button-text p-button-secondary"
          aria-label="go ahead 15 seconds"
          @click="goAhead15"
        >
          <i class="pi pi-refresh"></i>
        </Button>
      </template>
      <Button
        v-if="props.showDownload && !props.livestream"
        title="Download"
        tabindex="0"
        class="player-download-icon p-button-icon-only p-button-text p-button-secondary"
        aria-label="download"
        @click="download"
        @keypress.space.enter="download"
      >
        <i class="pi pi-download download-icon"></i>
      </Button>
    </div>
  </div>
</template>

<style lang="scss">
$persistentPlayerHeight: 100px;
$persistentPlayerHeightBuffer: 20px;

.persistent-player {
  bottom: 0;
  left: 0;
  height: $persistentPlayerHeight;
  position: fixed;
  z-index: var(--z-index-10);
  width: 100%;
  padding: 8px 16px 8px 8px;
  color: var(--text-color);
  background-color: var(--gray-100);
  transition: bottom 0.25s;
  -webkit-transition: bottom 0.25s;

  &.minimized {
    bottom: -$persistentPlayerHeight - $persistentPlayerHeightBuffer;
  }

  .minimize-btn {
    position: absolute;
    right: 12px;
    top: 2px;
    padding: 0.4rem 0.2rem !important;

    .pi {
      font-size: 0.7rem;
    }
  }

  .maximize-btn-holder {
    position: absolute;
    display: block;
    right: 12px;
    top: calc(-40px - $persistentPlayerHeightBuffer);
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
      background-color: var(--gray-100);
      pointer-events: none;
      transition: top 0.1s;
      -webkit-transition: top 0.1s;

      &.show {
        transition: top 0.5s;
        -webkit-transition: top 0.5s;
        top: 0px;
        pointer-events: all;
      }

      &:hover {
        background-color: var(--gray-300);
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
    height: 100%;
    gap: 16px;

    .player-cta-play-button {
      min-width: 150px;
    }

    .play-button {
      min-width: 55px;
    }
  }

  a,
  a:visited,
  a:active {
    color: var(--text-color);
    text-decoration: none;

    &:hover {
      text-decoration: none;
    }
  }
}
</style>
