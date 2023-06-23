<script setup>
import { computed } from 'vue'
const props = defineProps({
  /**
   * autoplay the media if possible
   */
  autoPlay: {
    default: false,
    type: Boolean,
  },
  /**
   * show controls state
   */
  controls: {
    default: true,
    type: Boolean,
  },
  /**
   * arial label for the iframe
   */
  iFrameArialLabel: {
    default: 'embedded media',
    type: String,
  },
  /**
   * mute the media if possible
   */
  mute: {
    default: false,
    type: Boolean,
  },
  /**
   * ratio of the embed media
   */
  ratio: {
    default: () => [16, 9],
    type: Array,
  },
  /**
   * set start time of the media (youtube only)
   */
  startTime: {
    default: '0',
    type: String,
  },
  /**
   * url of the embed media
   */
  url: {
    default: null,
    type: String,
  },
})
const getRatio = computed(() => {
  var percent = (100 / props.ratio[0]) * props.ratio[1]
  return percent + '%'
})

const isYoutube = computed(() => {
  return props.url.includes('youtube.com')
})
const isVimeo = computed(() => {
  return props.url.includes('vimeo.com')
})
const isSpotify = computed(() => {
  return props.url.includes('spotify.com')
})
const isSoundCloud = computed(() => {
  return props.url.includes('soundcloud.com')
})
const getSoundCloudUrl = computed(() => {
  return props.autoPlay
    ? props.url.replace('auto_play=false', 'auto_play=true')
    : props.url
})

const getPlatform = computed(() => {
  if (isYoutube.value) {
    return 'youtube'
  } else if (isVimeo.value) {
    return 'vimeo'
  } else if (isSpotify.value) {
    return 'spotify'
  } else if (isSoundCloud.value) {
    return 'sound-cloud'
  } else {
    return 'unknown'
  }
})
</script>

<template>
  <div class="responsive-embed">
    <iframe
      v-if="isSpotify"
      class="spotify-player"
      style="border-radius: 12px"
      :src="props.url"
      title="Spotify Player"
      width="100%"
      height="352"
      frameBorder="0"
      allowfullscreen=""
      allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
      loading="lazy"
      :aria-label="props.iFrameArialLabel"
    ></iframe>
    <iframe
      v-else-if="isSoundCloud"
      class="soundcloud-player"
      width="100%"
      height="200"
      scrolling="no"
      frameborder="no"
      allow="autoplay"
      :aria-label="props.iFrameArialLabel"
      :src="getSoundCloudUrl"
    ></iframe>

    <iframe
      v-else
      :src="`${url}?controls=${
        controls ? '1' : '0'
      }&amp;start=${startTime}&amp;autoplay=${autoPlay ? '1' : '0'}&amp;mute=${
        mute ? '1' : '0'
      }`"
      :class="`${getPlatform}-player`"
      title="Media Player"
      :aria-label="props.iFrameArialLabel"
      frameborder="0"
      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
      allowfullscreen
    ></iframe>
  </div>
</template>

<style lang="scss">
.responsive-embed {
  position: relative;
  height: 0;
  padding-bottom: v-bind(getRatio);
  overflow: hidden;
  iframe {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
  }
}
</style>
