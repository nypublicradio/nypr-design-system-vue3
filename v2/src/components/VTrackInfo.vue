<script setup>
import VFlexibleLink from "./VFlexibleLink.vue"
import VImage from "./VImage.vue"
import VProgressScrubber from "./VProgressScrubber.vue"
import { computed } from "vue"

const props = defineProps({
  buffered: {
    default: 0,
    type: Number,
  },
  currentSeconds: {
    default: 0,
    type: Number,
  },
  description: {
    default: null,
    type: String,
  },
  descriptionLink: {
    default: null,
    type: String,
  },
  durationSeconds: {
    default: 0,
    type: Number,
  },
  hideDescriptionOnMobile: {
    default: false,
    type: Boolean,
  },
  hideImageOnMobile: {
    default: false,
    type: Boolean,
  },
  hideTimeOnMobile: {
    default: false,
    type: Boolean,
  },
  livestream: {
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
  station: {
    default: null,
    type: String,
  },
  timelineBottom: {
    default: false,
    type: Boolean,
  },
  timelineInteractive: {
    default: true,
    type: Boolean,
  },
  timelineTop: {
    default: false,
    type: Boolean,
  },
  title: {
    default: null,
    type: String,
  },
  titleLink: {
    default: null,
    type: String,
  },
})

const emit = defineEmits([
  "scrub-timeline-change",
  "scrub-timeline-end",
  "image-click",
  "title-click",
  "description-click",
  "timeline-click",
])

const percentBuffered = computed(() => {
  return (props.buffered / props.durationSeconds) * 100
})
const percentComplete = computed(() => {
  return (props.currentSeconds / props.durationSeconds) * 100
})
// converts time to desired format
const convertTime = (val) => {
  const hhmmss = new Date(val * 1000).toISOString().substr(11, 8)
  return hhmmss.indexOf("00:") === 0 ? hhmmss.substr(3) : hhmmss
}

const getMarqueeSpeed = computed(() => {
  const length = props.description?.length
  return `${length * props.marqueeSpeed}s`
})
</script>

<template>
  <div class="track-info">
    <div
      class="track-info-details"
      :class="[
        {
          timelineTop: props.timelineTop,
          timelineBottom: props.timelineBottom,
          timelineInteractive: props.timelineInteractive,
        },
      ]"
    >
      <div class="overflow-hidden">
        <div
          v-if="livestream"
          class="track-info-livestream flex gap-1 align-content-center"
        >
          <media-live-button class="media-live-button">
            <span class="media-live-button-text">LIVE</span>
          </media-live-button>
          <!-- <div class="track-info-livestream-indicator">
            <span class="track-info-livestream-indicator-text">Live</span>
            <span class="track-info-livestream-indicator-dot pulse" />
          </div> -->
          <div class="track-info-livestream-station">{{ station }}</div>
        </div>
        <div class="track-info-title">
          <div v-if="title">
            <VFlexibleLink
              class="track-info-title-link title"
              :to="titleLink || null"
              @flexible-link-click="emit('title-click')"
            >
              <div v-html="title"></div>
            </VFlexibleLink>
          </div>
        </div>
        <div
          v-if="description"
          class="track-info-description"
          :class="[
            {
              hideDescriptionOnMobile: props.hideDescriptionOnMobile,
              marquee: props.marquee,
            },
          ]"
        >
          <VFlexibleLink
            class="track-info-description-link"
            :to="descriptionLink || null"
            @flexible-link-click="emit('description-click')"
          >
            <div v-if="props.marquee" class="track-info-description-marquee">
              <div>
                <div class="news-message">
                  <div
                    class="content"
                    v-html="`${description}&nbsp;&nbsp;-&nbsp;&nbsp;`"
                  ></div>
                </div>
                <div class="news-message">
                  <div
                    class="content"
                    v-html="`${description}&nbsp;&nbsp;-&nbsp;&nbsp;`"
                  ></div>
                </div>
              </div>
            </div>
            <div v-else class="track-info-description" v-html="description"></div>
          </VFlexibleLink>
        </div>
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
$container-breakpoint-md: useBreakpointOrFallback("md", 768px);
.track-info {
  display: flex;
  gap: 12px;
  width: 100%;
  height: inherit;
  flex: auto;
  align-self: center;
  .track-info-details {
    width: 0;
    flex-grow: 1;
    display: flex;
    flex-direction: column;
    justify-content: center;
    gap: 6px;
    line-height: normal;
    &* {
      line-height: normal;
    }
    .track-info-livestream {
      height: 16px;
      line-height: 16px;
      display: flex;
      margin-bottom: 4px;
      .track-info-livestream-station {
        font-family: var(--font-family);
        font-size: 10px;
        font-weight: 400;
      }
    }
    .track-info-title {
      width: 100%;
      text-overflow: ellipsis;
      overflow: hidden;
      white-space: nowrap;
      .title,
      .title div {
        font-weight: var(--persistent-player-title-weight);
        font-size: var(--persistent-player-title-size);
        color: var(--persistent-player-title-color);
        line-height: 1;
        text-overflow: ellipsis;
        overflow: hidden;
        white-space: nowrap;
        box-sizing: border-box;
      }
    }
    .track-info-description {
      position: relative;
      display: block;
      font-weight: var(--persistent-player-desc-weight);
      font-size: var(--persistent-player-desc-size);
      color: var(--persistent-player-desc-color);
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
      &.hideDescriptionOnMobile {
        @container (max-width: #{$container-breakpoint-md}) {
          display: none;
        }
      }
      &.marquee {
        -webkit-mask-image: linear-gradient(90deg, #000 94%, transparent);
        mask-image: linear-gradient(90deg, #000 94%, transparent);
      }
      .track-info-description-link {
        display: block;
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
        text-decoration: none;
        &:hover {
          text-decoration: none;
        }
        .track-info-description-marquee {
          overflow-x: hidden;
          div {
            display: flex;
            flex-wrap: nowrap;
            white-space: nowrap;
            min-width: 100%;
            .news-message {
              display: flex;
              flex-shrink: 0;
              align-items: center;
              animation: slide-left v-bind(getMarqueeSpeed) linear v-bind(marqueeLoops);
              animation-delay: v-bind(marqueeDelay);
              .content {
              }
              @keyframes slide-left {
                from {
                  -webkit-transform: translateX(0);
                  transform: translateX(0);
                }
                to {
                  -webkit-transform: translateX(-100%);
                  transform: translateX(-100%);
                }
              }
            }
          }
        }
      }
    }
    .track-info-time {
      display: flex;
      gap: spacing(1);
      justify-content: flex-end;

      @container (max-width: #{$container-breakpoint-md}) {
        justify-content: flex-start;
      }

      &.hideTimeOnMobile {
        @container (max-width: #{$container-breakpoint-md}) {
          display: none;
        }
      }

      .player-track-time-current {
        margin-right: spacing(1);
      }
      .player-track-time-total {
        margin-left: spacing(1);
      }
    }
    &.timelineBottom .progress-control {
      //display: none;

      @container (max-width: #{$container-breakpoint-md}) {
        position: absolute;
        cursor: pointer;
        bottom: 0;
        left: 0;
        right: 0;
        height: 5px;
      }
    }
    &.timelineTop .progress-control {
      //display: none;

      @container (max-width: #{$container-breakpoint-md}) {
        position: absolute;
        cursor: pointer;
        top: -5px;
        left: 0;
        right: 0;
        height: 5px;
      }
    }
  }
}
</style>

<style lang="scss">
.track-info-details {
  &:not(.timelineInteractive) .progress-control {
    pointer-events: none;
    .p-slider-handle {
      display: none !important;
    }
  }
}
</style>
