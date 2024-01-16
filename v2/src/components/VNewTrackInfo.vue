<script setup>
import VFlexibleLink from "./VFlexibleLink.vue"
import { computed } from "vue"

const props = defineProps({
  description: {
    default: null,
    type: String,
  },
  descriptionLink: {
    default: null,
    type: String,
  },
  hideDescriptionOnMobile: {
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
  title: {
    default: null,
    type: String,
  },
  titleLink: {
    default: null,
    type: String,
  },
})

const emit = defineEmits(["title-click", "description-click"])

const getMarqueeSpeed = computed(() => {
  const length = props.description?.length
  return `${length * props.marqueeSpeed}s`
})
</script>

<template>
  <div class="track-info">
    <div class="track-info-details">
      <div class="overflow-hidden">
        <div
          v-if="props.livestream"
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
              :to="props.titleLink || null"
              @flexible-link-click="emit('title-click')"
            >
              <div v-html="title"></div>
            </VFlexibleLink>
          </div>
        </div>
        <div
          v-if="props.description"
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
            :to="props.descriptionLink || null"
            @flexible-link-click="emit('description-click')"
          >
            <div v-if="props.marquee" class="track-info-description-marquee">
              <div>
                <div class="news-message">
                  <div
                    class="content"
                    v-html="`${props.description}&nbsp;&nbsp;-&nbsp;&nbsp;`"
                  ></div>
                </div>
                <div class="news-message">
                  <div
                    class="content"
                    v-html="`${props.description}&nbsp;&nbsp;-&nbsp;&nbsp;`"
                  ></div>
                </div>
              </div>
            </div>
            <div v-else class="track-info-description" v-html="props.description"></div>
          </VFlexibleLink>
        </div>
        <div
          v-if="!props.livestream"
          class="media-time-group track-info-time"
          :class="[{ hideTimeOnMobile: props.hideTimeOnMobile }]"
        >
          <media-time class="media-time" type="current"></media-time>
          <div class="media-time-divider">/</div>
          <media-time class="media-time" type="duration"></media-time>
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
    * {
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
      * {
        font-weight: var(--persistent-player-desc-weight);
        font-size: var(--persistent-player-desc-size);
        color: var(--persistent-player-desc-color);
      }
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
      gap: 0.25rem;
      font-size: var(--persistent-player-time-size);
      color: var(--persistent-player-time-color);
      font-weight: var(--persistent-player-time-weight);
      &.hideTimeOnMobile {
        @container (max-width: #{$container-breakpoint-md}) {
          display: none;
        }
      }
    }
  }
}
</style>

<style lang="scss">
.track-info-details {
}
</style>
