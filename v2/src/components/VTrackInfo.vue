<script setup>
import VFlexibleLink from './VFlexibleLink.vue'
import VImage from './VImage.vue'
import VProgressScrubber from './VProgressScrubber.vue'
import { computed } from 'vue'

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
  image: {
    default: null,
    type: String,
  },
  livestream: {
    default: false,
    type: Boolean,
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

const emit = defineEmits([
  'scrub-timeline-change',
  'scrub-timeline-end',
  'image-click',
  'title-click',
  'description-click',
  'timeline-click',
])

const percentBuffered = computed(() => {
  return (props.buffered / props.durationSeconds) * 100
})
const percentComplete = computed(() => {
  return (props.currentSeconds / props.durationSeconds) * 100
})

const convertTime = (val) => {
  const hhmmss = new Date(val * 1000).toISOString().substr(11, 8)
  return hhmmss.indexOf('00:') === 0 ? hhmmss.substr(3) : hhmmss
}
</script>

<template>
  <div class="track-info">
    <div v-if="image" class="track-info-image">
      <VFlexibleLink
        class="track-info-image-link"
        :to="titleLink ? titleLink : null"
        raw
        :title="titleLink ? titleLink : null"
        @flexible-link-click="emit('image-click')"
      >
        <VImage
          :src="image"
          :width="84"
          :height="84"
          sizes="xs:168px"
          :alt-text="title"
          :ratio="[1, 1]"
          role="presentation"
        />
      </VFlexibleLink>
    </div>
    <div class="track-info-details">
      <div class="overflow-hidden">
        <div v-if="livestream" class="track-info-livestream">
          <div class="track-info-livestream-indicator">
            <span class="track-info-livestream-indicator-text">Live</span>
            <span class="track-info-livestream-indicator-dot pulse" />
          </div>
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
        <div v-if="description" class="track-info-description">
          <VFlexibleLink
            class="track-info-description-link"
            :to="descriptionLink || null"
            @flexible-link-click="emit('description-click')"
          >
            <div
              class="track-info-description type-body"
              v-html="description"
            ></div>
          </VFlexibleLink>
        </div>
      </div>
      <template v-if="!livestream && currentSeconds > 0">
        <VProgressScrubber
          class="pl-0 md:pl-1"
          :progress="percentComplete"
          @scrub-timeline-change="emit('scrub-timeline-change', $event)"
          @scrub-timeline-end="emit('scrub-timeline-end', $event)"
          @timeline-click="emit('timeline-click', $event)"
        />
        <div v-if="durationSeconds" class="track-info-time footer">
          <span class="track-info-time-current">
            {{ convertTime(currentSeconds) }}
          </span>
          <span class="track-info-time-separator">/</span>
          <span class="track-info-time-total">
            {{ convertTime(durationSeconds) }}
          </span>
        </div>
        <span v-else class="track-info-time-separator">&nbsp;</span>
      </template>
    </div>
  </div>
</template>

<style lang="scss" scoped>
$track-info-image-size: 84px;
$container-breakpoint-md: useBreakpointOrFallback('md', 768px);
.track-info {
  display: flex;
  gap: 12px;
  width: 100%;
  height: inherit;
  flex: auto;
  align-self: center;
  .track-info-image {
    display: block;
    // prettier-ignore
    @container (max-width: #{$container-breakpoint-md}) {
      display: none;
    }
    width: $track-info-image-size;
    max-width: $track-info-image-size;
    height: $track-info-image-size;
    //flex: 1 0 $track-info-image-size;
    .image-with-caption {
      width: $track-info-image-size;
    }
  } // track-info-image
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
      margin-bottom: 8px;
      .track-info-livestream-indicator {
        display: flex;
        align-items: center;
        background: var(--persistent-player-live-indicator-bg);
        color: var(--persistent-player-live-indicator-color);
        border-radius: 44px;
        padding: 6px;
        margin-right: 8px;
        .track-info-livestream-indicator-text {
          font-size: 10px;
          font-weight: 900;
          text-transform: uppercase;
          letter-spacing: 2px;
        }
        .track-info-livestream-indicator-dot {
          background-color: #e74f4f;
          border-radius: 8px;
          height: 8px;
          width: 8px;
          margin-left: 2px;
        }
      }
      .track-info-livestream-station {
        font-family: var(--font-family);
        font-size: 12px;
        font-weight: 700;
      }
    }
    .track-info-title {
      width: 100%;
      text-overflow: ellipsis;
      overflow: hidden;
      white-space: nowrap;
      .title {
        font-weight: var(--persistent-player-title-weight);
        font-size: var(--font-size-9);
        color: var(--persistent-player-title-color);
        line-height: 1;
        text-overflow: ellipsis;
        overflow: hidden;
        white-space: nowrap;
        box-sizing: border-box;
      }
    }
    .track-info-description {
      display: block;
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
      @container (max-width: #{$container-breakpoint-md}) {
        display: none;
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
      }
    }
    .track-info-time {
      display: flex;
      gap: spacing(1);
      justify-content: flex-end;
      @container (max-width: #{$container-breakpoint-md}) {
        justify-content: flex-start;
      }
      .player-track-time-current {
        margin-right: spacing(1);
      }
      .player-track-time-total {
        margin-left: spacing(1);
      }
    }
  }
}
</style>
