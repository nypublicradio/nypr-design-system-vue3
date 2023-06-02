<script setup>
import { computed } from 'vue'
const props = defineProps({
  label: {
    type: String,
    default: 'embedded video',
  },
  url: {
    type: String,
    default: null,
  },
  ratio: {
    type: Array,
    default: () => [16, 9],
  },
  controls: {
    type: Boolean,
    default: true,
  },
  autoPlay: {
    type: Boolean,
    default: false,
  },
  startTime: {
    type: String,
    default: '0',
  },
  mute: {
    type: Boolean,
    default: false,
  },
})
const getRatio = computed(() => {
  var percent = (100 / props.ratio[0]) * props.ratio[1]
  return percent + '%'
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
</script>

<template>
  <div class="responsive-embed">
    <iframe
      v-if="isSpotify"
      style="border-radius: 12px"
      :src="props.url"
      title="Spotify Player"
      width="100%"
      height="352"
      frameBorder="0"
      allowfullscreen=""
      allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
      loading="lazy"
    ></iframe>
    <iframe
      v-else-if="isSoundCloud"
      width="100%"
      height="200"
      scrolling="no"
      frameborder="no"
      allow="autoplay"
      :src="getSoundCloudUrl"
    ></iframe>

    <iframe
      v-else
      :src="`${url}?controls=${
        controls ? '1' : '0'
      }&amp;start=${startTime}&amp;autoplay=${autoPlay ? '1' : '0'}&amp;mute=${
        mute ? '1' : '0'
      }`"
      title="Media Player"
      :aria-label="label"
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
