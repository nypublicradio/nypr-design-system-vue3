<template>
  <div class="responsive-embed">
    <iframe
      :src="`${url}?controls=${controls ? '1' : '0'}&amp;start=${startTime}&amp;autoplay=${autoPlay ? '1' : '0'}&amp;mute=${mute ? '1' : '0'}`"
      title="Media Player"
      :aria-label="label"
      frameborder="0"
      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
      allowfullscreen
    ></iframe>
  </div>
</template>

<script setup>
import { computed } from 'vue'
const props = defineProps({
  label: {
    type: String,
    default: 'embedded video'
  },
  url: {
    type: String,
    default: null
  },
  ratio: {
    type: Array,
    default: () => [16, 9]
  },
  controls: {
    type: Boolean,
    default: true
  },
  autoPlay: {
    type: Boolean,
    default: false
  },
  startTime: {
    type: String,
    default: "0"
  },
  mute: {
    type: Boolean,
    default: false
  }
})
const getRatio = computed(() => {
  var percent = 100 / props.ratio[0] * props.ratio[1]
  return percent + "%"
})

</script>

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
