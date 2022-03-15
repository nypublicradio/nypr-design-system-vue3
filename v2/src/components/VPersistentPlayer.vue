<script setup>
import { ref, onMounted } from 'vue'
import VVolumeControl from './VVolumeControl'
import VTrackInfo from './VTrackInfo'
import Button from 'primevue/button'

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
})
let currentSeconds = ref(0)
let durationSeconds = ref(0)
let buffered = ref(0)
let innerLoop = ref(false)
let loaded = ref(false)
let previousVolume = ref(35)
let showVolume = ref(false)
let volume = ref(100)

const emit = defineEmits(['togglePlay', 'volume-toggle-mute', 'volume-change'])

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
})

const convertTime = (val) => {
  const hhmmss = new Date(val * 1000).toISOString().substr(11, 8)
  return hhmmss.indexOf('00:') === 0 ? hhmmss.substr(3) : hhmmss
}
const download = () => {
  // this.stop() // emit event so vue-hifi can handle
  window.open(props.file, 'download')
}
const goAhead15 = () => {
  // emit event so vue-hifi can handle
  // this.audio.currentTime = this.audio.currentTime + 15
}
const goBack15 = () => {
  // emit event so vue-hifi can handle
  // this.audio.currentTime = this.audio.currentTime - 15
}
const seek = (e) => {
  // emit event so vue-hifi can handle
  // if (!this.loaded) return
  // const el = e.target.getBoundingClientRect()
  // const seekPos = (e.clientX - el.left) / el.width
  // this.audio.currentTime = (this.audio.duration * seekPos)
}
const togglePlay = () => {
  emit('togglePlay')
}
</script>

<template>
  <div class="persistent-player u-color-group-dark">
    <div class="player-controls">
      <v-track-info
        :livestream="props.livestream"
        :station="props.station"
        :image="props.image"
        :title="props.title"
        :title-link="props.titleLink"
        :description="props.description"
        :description-link="props.descriptionLink"
        :buffered="buffered.value"
        :current-seconds="currentSeconds.value"
        :duration-seconds="durationSeconds.value"
        @seek="seek"
      />
      <template v-if="props.shouldShowCta">
        <v-volume-control
          :volume="volume.value"
          :is-muted="props.isMuted"
          @volume-toggle-mute="emit('volume-toggle-mute')"
          @volume-change="emit('volume-change', $event)"
        />
        <!-- <button class="button player-cta-play-button" @click="togglePlay">
          <play-simple class="button-icon" />
          <span class="button-text">Listen Live</span>
        </button>-->
        <Button
          label="Listen Live"
          icon="pi pi-play"
          class="player-cta-play-button"
          @click="togglePlay"
        ></Button>
      </template>
      <template v-else>
        <v-volume-control
          :volume="volume.value"
          :is-muted="props.isMuted"
          @volume-toggle-mute="emit('volume-toggle-mute')"
          @volume-change="emit('volume-change', $event)"
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
          :title="isPlaying ? 'Pause' : 'Play'"
          class="play-button p-button-icon-only"          
          @click="togglePlay"
        >
          <i v-if="!isPlaying && !isLoading" class="pi pi-play"></i>
          <i v-if="isPlaying" class="pi pi-pause"></i>
          <i v-if="isLoading" class="pi pi-spin pi-spinner"></i>
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
.persistent-player {
  bottom: 0;
  left: 0;
  height: 100px;
  position: fixed;
  z-index: $z-index-10;
  width: 100%;
  padding: 8px 16px 8px 8px;
  color: var(--text-color);
  background-color: var(--gray-100);
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
