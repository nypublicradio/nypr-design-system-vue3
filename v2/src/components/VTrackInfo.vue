<script setup>
import { computed } from 'vue'
import VImageWithCaption from './VImageWithCaption'
import VFlexibleLink from './VFlexibleLink'
import VProgressScrubber from './VProgressScrubber'

const props = defineProps({
  description: {
    type: String,
    default: null,
  },
  descriptionLink: {
    type: String,
    default: null,
  },
  livestream: {
    type: Boolean,
    default: false,
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
  durationSeconds: {
    type: Number,
    default: 0,
  },
  currentSeconds: {
    type: Number,
    default: 0,
  },
  buffered: {
    type: Number,
    default: 0,
  },
})

const emit = defineEmits(['scrub-timeline-change', 'scrub-timeline-end', 'image-click', 'title-click', 'description-click'])

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
      <v-image-with-caption
        :image="image"
        :width="84"
        :height="84"
        :alt-text="title"
        :image-url="titleLink ? titleLink : null"
        :ratio="[1, 1]"
        role="presentation"
        @image-click="$emit('image-click', image)"
      />
    </div>
    <div class="track-info-details">
      <div v-if="livestream" class="track-info-livestream">
        <div class="track-info-livestream-indicator">
          <span class="track-info-livestream-indicator-text">Live</span>
          <span class="track-info-livestream-indicator-dot pulse" />
        </div>
        <div class="track-info-livestream-station">{{ station }}</div>
      </div>
      <div class="track-info-title">
        <h2 v-if="title && titleLink">
          <v-flexible-link
            class="track-info-title-link"
            :to="titleLink"
            @emit-flexible-link="emit('title-click')"
          >
            {{
              title
            }}
          </v-flexible-link>
        </h2>
        <h2 v-if="title && !titleLink">{{ title }}</h2>
      </div>
      <div v-if="description" class="track-info-description">
        <p v-if="description && !descriptionLink" class="track-info-description">{{ description }}</p>

        <v-flexible-link
          v-if="description && descriptionLink"
          class="track-info-description-link"
          :to="descriptionLink"
          @emit-flexible-link="emit('description-click')"
        >{{ description }}</v-flexible-link>
      </div>
      <template v-if="!livestream && currentSeconds > 0">
        <v-progress-scrubber
          :progress="percentComplete"
          @scrub-timeline-change="emit('scrub-timeline-change', $event)"
          @scrub-timeline-end="emit('scrub-timeline-end', $event)"
        />
        <div v-if="durationSeconds" class="track-info-time footer">
          <span class="track-info-time-current">
            {{
              convertTime(currentSeconds)
            }}
          </span>
          <span class="track-info-time-separator">/</span>
          <span class="track-info-time-total">
            {{
              convertTime(durationSeconds)
            }}
          </span>
        </div>
        <span v-else class="track-info-time-separator">&nbsp;</span>
      </template>
    </div>
  </div>
</template>

<style lang="scss">
$track-info-image-size: 84px;
.track-info {
  display: flex;
  gap: 12px;
  width: 100%;
  height: inherit;
  flex: auto;
  align-self: center;
  overflow: hidden;
  .track-info-image {
    display: none;
    @media all and (min-width: $md) {
      display: block;
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
    overflow: hidden;
    width: 100%;
    display: flex;
    flex-direction: column;
    justify-content: center;
    gap: 2px;
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
        background: var(--text-color);
        color: var(--white);
        border-radius: 44px;
        padding: 4px;
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
      h2 {
        font-weight: 500;
        font-size: var(--font-size-9);
        line-height: 1;
        text-overflow: ellipsis;
        overflow: hidden;
        white-space: nowrap;
        box-sizing: border-box;
      }
    }
    .track-info-description {
      display: none;
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
      @media all and (min-width: $md) {
        display: block;
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
      @media all and (min-width: $md) {
        justify-content: flex-end;
      }
      .player-track-time-current {
        margin-right: spacing(1);
      }
      .player-track-time-total {
        margin-left: spacing(1);
      }
    }
  } // track-info-details
}
</style>
