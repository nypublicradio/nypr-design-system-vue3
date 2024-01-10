<script setup lang="ts">
// Register elements.
import "vidstack/player"
import "vidstack/player/layouts"
import "vidstack/player/styles/default/layouts/audio.css"
import "vidstack/player/ui"
//import { MediaRemoteControl } from "vidstack"

//import { isHLSProvider, type MediaCanPlayEvent, type MediaProviderChangeEvent } from 'vidstack';
//import type { MediaPlayerElement } from "vidstack/elements"

import soundAnimGif from "../assets/images/audioAnim.gif"
import VFlexibleLink from "./VFlexibleLink.vue"
import VImage from "./VImage.vue"
import VNewTrackInfo from "./VNewTrackInfo.vue"
import { useSwipe } from "@vueuse/core"
import Button from "primevue/button"
//import { MediaPlayerElement, defineCustomElement } from "vidstack/elements"
import { nextTick, onBeforeUnmount, onMounted, ref } from "vue"

import type { MediaPlayerElement } from "vidstack/elements"

//defineCustomElement(MediaPlayerElement)

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
   * left image representing the audio
   */
  imageSize: {
    default: 60,
    type: Number,
  },
  /**
   * left image representing the audio
   */
  imageSizeExpanded: {
    default: 144,
    type: Number,
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
    default: "3s",
    type: String,
  },
  marqueeLoops: {
    default: "1",
    type: String,
  },
  marqueeSpeed: {
    default: 0.1,
    type: Number,
  },
  nativeHLS: {
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
   * show the skip buttons
   */
  showVolume: {
    default: false,
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
  streamType: {
    default: "unknown",
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

const emit = defineEmits([
  "toggle-play",
  "volume-toggle-mute",
  "volume-change",
  "error",
  "hls-error",
  "skip-ahead",
  "skip-back",
  "scrub-timeline-change",
  "scrub-timeline-end",
  "image-click",
  "description-click",
  "title-click",
  "ended",
  "is-minimized",
  "is-expanded",
  "swipe-up",
  "swipe-down",
  "is-loading",
  "is-live",
  "duration",
  "current-duration",
])

//swipe setup
const playerRef = ref(null)
const $mediaPlayerRef = ref<MediaPlayerElement>()

//const remote = new MediaRemoteControl()
const playButtonRef = ref(null)
const isLive = ref(false)
const isPlayable = ref(false)
const isPlaying = ref(false)
const isPaused = ref(true)
const playerError = ref("")

const isMinimized = ref(false)
const isExpanded = ref(false)
const isMounted = ref(false)

// prevents the body from scrolling when the dropdown is open
function preventScrollOnTouch(event) {
  event.preventDefault()
}
const supportSwipe =
  (props.canExpand && props.canExpandWithSwipe) ||
  (props.canExpand && props.canUnexpandWithSwipe)

// swipe setup
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
  if (props.canExpand && props.canExpandWithSwipe) {
    if (!isDraggingDown) {
      if (velocity > swipeThreshold) {
        //console.log('EXPAND')
        playerRef.value.removeEventListener("touchmove", preventScrollOnTouch, {
          passive: false,
        })
        toggleExpanded(true)
        emit("swipe-up")
      }
    }
  }
  if (props.canExpand && props.canUnexpandWithSwipe) {
    if (isDraggingDown) {
      if (velocity > swipeThreshold) {
        //console.log('UNEXPAND')
        playerRef.value.addEventListener("touchmove", preventScrollOnTouch, {
          passive: false,
        })
        toggleExpanded(false)
        emit("swipe-down")
      }
    }
  }
}

if (supportSwipe) {
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
  isMounted.value = true
  if (supportSwipe) {
    playerRef.value.addEventListener("touchmove", preventScrollOnTouch, {
      passive: false,
    })
  }
})
// END swipe

// handle the toggle play event
const togglePlay = () => {
  // Play or pause the sound.
  if ($mediaPlayerRef.value && isPlaying.value) {
    emit("toggle-play", false)
    isPlaying.value = false
    $mediaPlayerRef.value.pause()
  } else {
    isPlaying.value = true
    emit("toggle-play", true)
    $mediaPlayerRef.value.play()
  }
}

// exposed method to handle the minimize toggle
const toggleMinimize = (e) => {
  emit("is-minimized", e)
  isMinimized.value = e
}

// handle scroll blocking with js when player is expanded
const scrollToggle = (e) => {
  if (e) {
    playerRef.value.removeEventListener("touchmove", preventScrollOnTouch, {
      passive: false,
    })
  } else {
    playerRef.value.addEventListener("touchmove", preventScrollOnTouch, {
      passive: false,
    })
  }
}
// exposed method to handle the expanding toggle
const toggleExpanded = async (e) => {
  scrollToggle(e)
  emit("is-expanded", e)
  isExpanded.value = e

  // hack for the teleported audio player to not pause when the player is teleported
  await nextTick()
  if (isPlaying.value) {
    setTimeout(async () => {
      $mediaPlayerRef.value?.play()
    }, 10)
  } else {
    $mediaPlayerRef.value?.pause()
  }
}

// exposed method to handle the skip ahead
const skipAhead = () => {
  emit("skip-ahead", $mediaPlayerRef.value.currentTime)
}

// exposed method to handle the skip back
const skipBack = () => {
  emit("skip-back", $mediaPlayerRef.value.currentTime)
}

// exposed method to handle the mute toggle
const toggleMute = () => {
  if ($mediaPlayerRef.value) {
    $mediaPlayerRef.value.muted = !$mediaPlayerRef.value.muted
  }
}

// handles the click anywhere prop. So if the user clicks anywhere on the player, except the buttons, the player will expand or minimize
const handleClickAnywhere = (e) => {
  //console.log("anywhere click")
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

onMounted(async () => {
  // keyboard accessibility
  window.addEventListener("keydown", (event) => {
    switch (event.code) {
      case "ArrowUp":
        if ($mediaPlayerRef.value && $mediaPlayerRef.value.volume < 1) {
          $mediaPlayerRef.value.volume += 0.1
        }
        break
      case "ArrowDown":
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
  const instance = document.querySelector("media-player")
  if (instance) {
    //subscribe to state changess
    instance.subscribe(({ playing }) => {
      if (playing) {
        emit("toggle-play", true)
      }
      isPlaying.value = playing
    })
    instance.subscribe(({ paused }) => {
      if (paused) {
        emit("toggle-play", false)
      }
      isPaused.value = paused
    })
    instance.subscribe(({ seeking }) => {
      if ($mediaPlayerRef.value) {
        emit("scrub-timeline-change", $mediaPlayerRef.value.currentTime)
        if ($mediaPlayerRef.value && !seeking) {
          emit("scrub-timeline-end", $mediaPlayerRef.value.currentTime)
        }
      }
    })
    instance.subscribe(({ canPlay }) => {
      isPlayable.value = canPlay
      emit("is-loading", !canPlay)
    })
    instance.subscribe(({ volume }) => {
      emit("volume-change", volume)
    })
    instance.subscribe(({ muted }) => {
      emit("volume-toggle-mute", muted)
    })
    instance.subscribe(({ live }) => {
      isLive.value = live
      emit("is-live", live)
    })
    instance.subscribe(({ error }) => {
      playerError.value = error
      emit("error", error)
    })
    instance.subscribe(({ duration }) => {
      emit("duration", duration)
    })
    instance.subscribe(({ currentTime }) => {
      emit("current-duration", currentTime)
    })
    instance.subscribe(({ ended }) => {
      emit("ended", ended)
    })

    // Fired when we begin downloading the hls.js library.
    instance.addEventListener("hls-lib-load-start", (event) => {
      console.log("HLS library loadStart = ", event)
    })

    // Fired when the hls.js library has loaded.
    instance.addEventListener("hls-lib-loaded", (event) => {
      console.log("HLS library lOADED = ", event)
    })

    // Fired when the hls.js library fails to download.
    instance.addEventListener("hls-lib-load-error", (event) => {
      console.log("HLS library error = ", event)
    })
    // Fired when we begin downloading the hls audio.
    instance.addEventListener("hls-audio-track-loading", (event) => {
      console.log("HLS audio loadStart = ", event)
    })

    // Fired when the hls audio has loaded.
    instance.addEventListener("hls-audio-track-loaded", (event) => {
      console.log("HLS audio lOADED = ", event)
    })

    // Fired when the hls audio fails to download.
    instance.addEventListener("hls-error", (event) => {
      console.log("HLS audio error = ", event)
      emit("hls-error", event)
    })
  }
  // remote.setTarget($mediaPlayerRef.value)
  // const player = remote.getPlayer()
})

onBeforeUnmount(() => {
  // destroy the audio
  $mediaPlayerRef.value?.destroy()
})

defineExpose({
  skipAhead,
  skipBack,
  toggleExpanded,
  toggleMinimize,
  toggleMute,
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
        <img v-if="isPlaying" :src="soundAnimGif" alt="sounds wave animation" />
        <slot v-else name="chevronUp"><i class="pi pi-chevron-up"></i></slot>
      </Button>
    </div>

    <Transition name="expand">
      <div v-show="!isExpanded" class="player-controls">
        <Teleport :disabled="!isExpanded" v-if="isMounted" to="#expandedViewPlayer">
          <media-player
            ref="$mediaPlayerRef"
            class="media-player"
            :title="props.title"
            :src="props.file"
            :autoplay="props.autoPlay"
            view-type="audio"
            load="eager"
            :volume="props.volume"
            :loop="props.loop"
            :stream-type="props.streamType"
            poster="https://i.natgeofe.com/n/4cebbf38-5df4-4ed0-864a-4ebeb64d33a4/NationalGeographic_1468962_3x2.jpg?w=1638&h=1092"
            keep-alive
            :prefer-native-h-l-s="props.nativeHLS"
            controls
          >
            <media-provider></media-provider>

            <media-controls>
              <div
                v-if="!isExpanded"
                class="flex w-full"
                :style="`height:${props.imageSize}px`"
              >
                <div
                  v-if="props.image"
                  class="track-info-image flex-none"
                  :class="[{ hideImageOnMobile: props.hideImageOnMobile }]"
                >
                  <div
                    :class="[{ 'cursor-pointer': props.canClickAnywhere }]"
                    @click="handleClickAnywhere"
                  >
                    <VFlexibleLink
                      class="track-info-image-link"
                      :to="props.titleLink ? props.titleLink : null"
                      raw
                      :title="props.titleLink ? props.titleLink : null"
                      @flexible-link-click="emit('image-click')"
                    >
                      <VImage
                        :src="props.image"
                        :width="props.imageSize"
                        :height="props.imageSize"
                        :sizes="`xs:${props.imageSize * 2}px`"
                        :alt-text="props.title"
                        :ratio="[1, 1]"
                        role="presentation"
                      />
                    </VFlexibleLink>
                  </div>
                </div>
                <div class="w-full">
                  <media-controls-group>
                    <div class="flex flex-column h-full justify-content-between">
                      <div class="flex h-full align-items-center gap-2 px-2">
                        <VNewTrackInfo
                          v-bind="{ ...$props, ...$attrs }"
                          :livestream="isLive"
                          :class="[{ 'cursor-pointer': props.canClickAnywhere }]"
                          @description-click="emit('description-click')"
                          @title-click="emit('title-click')"
                          @click="handleClickAnywhere"
                        />
                        <div class="flex gap-1" v-if="props.showVolume">
                          <media-volume-slider
                            class="media-slider volume-slider flex-none"
                          >
                            <div class="media-slider-track">
                              <div
                                class="media-slider-track-fill media-slider-track"
                              ></div>
                            </div>
                            <div class="media-slider-thumb"></div>
                          </media-volume-slider>
                          <media-mute-button class="volume-btn media-button flex-none">
                            <div type="mute" class="mute-icon">
                              <slot name="mute"><i class="pi pi-volume-off"></i></slot>
                            </div>
                            <div type="volume-low" class="volume-low-icon">
                              <slot name="volume-low"
                                ><i class="pi pi-volume-down"></i
                              ></slot>
                            </div>
                            <div type="volume-high" class="volume-high-icon">
                              <slot name="volume-high"
                                ><i class="pi pi-volume-up"></i
                              ></slot>
                            </div>
                          </media-mute-button>
                        </div>
                        <media-seek-button
                          v-if="props.showSkip"
                          class="media-button flex-none"
                          :seconds="`-${props.skipAheadTime}`"
                          @click="skipBack"
                        >
                          <slot name="skipBack"><i class="pi pi-undo"></i></slot>
                        </media-seek-button>
                        <media-play-button
                          ref="playButtonRef"
                          class="media-button flex-none"
                          :data-disabled="isPlayable ? null : ''"
                        >
                          <media-icon type="play" class="play-icon">
                            <slot v-if="!isPlayable" name="loading">
                              <i class="pi pi-spin pi-spinner"></i>
                            </slot>
                            <slot v-else name="play"><i class="pi pi-play"></i></slot>
                          </media-icon>
                          <media-icon type="pause" class="pause-icon">
                            <slot name="pause"><i class="pi pi-pause"></i></slot>
                          </media-icon>
                        </media-play-button>
                        <media-seek-button
                          v-if="props.showSkip"
                          class="media-button flex-none"
                          :seconds="`+${props.skipAheadTime}`"
                          @click="skipAhead"
                        >
                          <slot name="skipAhead"><i class="pi pi-refresh"></i></slot>
                        </media-seek-button>
                      </div>

                      <media-time-slider
                        v-if="!isLive"
                        class="media-slider thin-disabled"
                      >
                        <div class="media-slider-track">
                          <div class="media-slider-track-fill media-slider-track"></div>
                          <div class="media-slider-progress media-slider-track"></div>
                        </div>
                        <div class="media-slider-thumb"></div>
                      </media-time-slider>
                    </div>
                  </media-controls-group>
                </div>
              </div>
              <!-- What the controls looks like in the expanded view -->
              <div v-show="isExpanded" id="expandedControls">
                <media-time-slider class="media-slider expanded-slider">
                  <div class="media-slider-track">
                    <div class="media-slider-track-fill media-slider-track"></div>
                    <div class="media-slider-progress media-slider-track"></div>
                  </div>
                  <div class="media-slider-thumb"></div>
                </media-time-slider>
                <div
                  class="media-time-group track-info-time flex justify-content-between w-full -mt-3"
                >
                  <media-time class="media-time" type="current"></media-time>
                  <media-time class="media-time" type="duration"></media-time>
                </div>
                <div class="expanded-buttons flex gap-2 justify-content-center">
                  <media-seek-button
                    v-if="props.showSkip"
                    class="media-button flex-none"
                    :seconds="props.skipBackTime"
                  >
                    <slot name="skipBack"><i class="pi pi-undo"></i></slot>
                  </media-seek-button>
                  <media-play-button
                    ref="playButtonRef"
                    class="media-button flex-none"
                    :data-disabled="isPlayable ? null : ''"
                  >
                    <media-icon type="play" class="play-icon">
                      <slot v-if="!isPlayable" name="loading">
                        <i class="pi pi-spin pi-spinner"></i>
                      </slot>
                      <slot v-else name="play"><i class="pi pi-play"></i></slot>
                    </media-icon>
                    <media-icon type="pause" class="pause-icon">
                      <slot name="pause"><i class="pi pi-pause"></i></slot>
                    </media-icon>
                  </media-play-button>
                  <media-seek-button
                    v-if="props.showSkip"
                    class="media-button flex-none"
                    :seconds="props.skipAheadTime"
                  >
                    <slot name="skipAhead"><i class="pi pi-refresh"></i></slot>
                  </media-seek-button>
                </div>
              </div>
            </media-controls>
            <!-- <media-audio-layout small-when="never"></media-audio-layout> -->
          </media-player>
        </Teleport>
      </div>
    </Transition>

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

    <Transition name="expand-delay">
      <div v-show="isExpanded" class="expanded-view">
        <div class="expanded-content-holder">
          <div class="header">
            <slot name="expanded-header">
              <div class="flex flex-column">
                <Button
                  class="unexpand-btn p-button-icon-only p-button-text p-button-secondary"
                  @click="toggleExpanded(!isExpanded)"
                >
                  <slot name="unexpanded-button-icon">
                    <i class="pi pi-chevron-down" />
                  </slot>
                </Button>
              </div>
            </slot>
          </div>
          <div class="flex flex-column header-top">
            <slot name="header-content"></slot>

            <div class="flex flex-column gap-3">
              <!--   <pre class="text-xs">{{ currentEpisode }}</pre> -->
              <VImage
                :src="props.image"
                :alt="`${props.title} show image`"
                :width="props.imageSizeExpanded"
                :height="props.imageSizeExpanded"
                :sizes="`xs:${props.imageSize * 2}px`"
                class="show-image m-auto"
                :ratio="[1, 1]"
                role="presentation"
              />

              <div v-if="isLive" class="flex flex-column gap-2">
                <div class="live flex gap-2 align-items-center">
                  <media-live-button class="media-live-button">
                    <span class="media-live-button-text">LIVE</span>
                  </media-live-button>
                  <div class="text-sm">{{ props.station }}</div>
                </div>
                <slot name="expanded-player-title">{{ props.title }}</slot>
              </div>

              <div v-else>
                <slot name="expanded-player-title">{{ props.title }}</slot>
              </div>
            </div>

            <div id="expandedViewPlayer"></div>
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
    #expandedControls {
      min-height: 85px;
    }
  }
  video {
    display: none;
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
$container-breakpoint-md: useBreakpointOrFallback("md", 768px);

.persistent-player {
  // .media-player {
  media-controls {
    // override inline pointer-events: none which stops the image click
    pointer-events: auto !important;
    width: 100%;
  }

  .track-info-image {
    display: block;

    // prettier-ignore
    &.hideImageOnMobile {
      @container (max-width: #{$container-breakpoint-md}) {
        display: none;
      }
    }

    width: var(--persistent-player-image-size);
    max-width: var(--persistent-player-image-size);
    height: var(--persistent-player-image-size);

    //flex: 1 0 var(--persistent-player-image-size);
    .image-with-caption {
      width: var(--persistent-player-image-size);
    }
  }

  // secondary button override
  @mixin secondary-button {
    background: none;

    * {
      color: var(--text-color);
      fill: var(--text-color);
    }

    &:hover {
      * {
        color: var(--persistent-player-button-color-hover);
        fill: var(--persistent-player-button-color-hover);
      }
    }
  }

  // BUTTONS
  .media-button {
    display: inline-flex;
    position: relative;
    justify-content: center;
    align-items: center;
    width: var(--persistent-player-button-width);
    height: var(--persistent-player-button-height);
    color: var(--persistent-player-button-color);
    border-radius: var(--persistent-player-button-radius);
    margin-right: 2.5px;
    background: var(--persistent-player-button-bg-color);
    cursor: pointer;

    * {
      color: var(--persistent-player-button-color);
      fill: var(--persistent-player-button-color);
    }
  }

  @media (hover: hover) and (pointer: fine) {
    .media-button:hover {
      background: var(--persistent-player-button-bg-color-hover);
    }
  }

  .media-button[data-paused] .pause-icon,
  .media-button:not([data-paused]) .play-icon {
    display: none;
  }

  // SLIDERS
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
    /** Prevent thumb flowing out of slider (15px = thumb width). */
    //margin: 0 calc(15px / 2);
    -webkit-user-select: none;
    -webkit-tap-highlight-color: transparent;
    &.volume-slider {
      width: 72px;
    }
  }

  .media-slider[data-focus] .media-slider-track {
    box-shadow: var(--media-focus-ring, 0 0 0 3px rgb(78 156 246));
  }

  .media-slider-track {
    z-index: 0;
    position: absolute;
    width: 100%;
    height: 6px;
    top: 50%;
    left: 0;
    border-radius: 3px;
    transform: translateY(-50%) translateZ(0);
    background-color: var(--persistent-player-slider-bg);
    //contain: strict;
  }

  .media-slider-track-fill {
    z-index: 2;
    /** above progress. */
    background-color: var(--persistent-player-slider-progress);
    width: var(--slider-fill, 0%);
    will-change: width;
  }

  .media-slider-progress {
    z-index: 1;
    /** above track. */
    width: var(--slider-progress, 0%);
    will-change: width;
    background-color: var(--persistent-player-slider-buffer);
  }

  .media-slider-thumb {
    position: absolute;
    top: 50%;
    left: var(--slider-fill);
    //opacity: 0;
    contain: layout size style;
    width: 15px;
    height: 15px;
    border: 1px solid var(--persistent-player-slider-thumb-border);
    border-radius: 9999px;
    background-color: var(--persistent-player-slider-thumb-bg);
    transform: translate(-50%, -50%) translateZ(0);
    transition: opacity 0.15s ease-in;
    pointer-events: none;
    will-change: left;
    z-index: 2;
    /** above track fill. */
  }

  .media-slider[data-active] .media-slider-thumb {
    opacity: 1;
    transition: opacity 0.2s ease-in;
  }

  .media-slider[data-dragging] .media-slider-thumb {
    box-shadow: 0 0 0 3px var(--persistent-player-slider-thumb-shadow);
  }

  // thin disabled slider

  .thin-disabled {
    &.media-slider {
      pointer-events: none;
      height: 2px;
      margin: 0;

      .media-slider-track {
        height: 2px;
        border-radius: 0;
      }
      .media-slider-thumb {
        opacity: 0;
      }
    }
  }

  // live button
  .media-live-button {
    width: 40px;
    height: 16px;
    display: flex;
    align-items: center;
    cursor: pointer;
    /* Browser resets. */
    padding: 0;
    user-select: none;
    appearance: none;
    background: none;
    outline: none;
    border: none;
  }

  .media-live-button-text {
    background-color: #8a8a8a;
    border-radius: 2px;
    color: #161616;
    font-family: sans-serif;
    font-size: 9px;
    font-weight: 900;
    letter-spacing: 1.5px;
    padding: 0px 4px;
    transition: color 0.3s ease;
  }

  .media-live-button[data-focus] {
    box-shadow: var(--media-focus-ring, 0 0 0 3px var(--primary-color));
  }

  .media-live-button[data-edge] {
    cursor: unset;
  }

  .media-live-button[data-edge] .media-live-button-text {
    background-color: var(--red, #dc2626);
    color: var(--media-live-button-edge-color, #f5f5f5);
  }

  //volume button
  .media-button:not([data-muted]) .mute-icon,
  .media-button:not([data-state="low"]) .volume-low-icon,
  .media-button:not([data-state="high"]) .volume-high-icon {
    display: none;
  }

  .media-button.volume-btn {
    @include secondary-button;
  }

  // time
  .media-time {
    font-size: 0.75rem;
  }
}
</style>
