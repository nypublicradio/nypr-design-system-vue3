<script setup>
import VImagePublisher from './VImagePublisher.vue'
import VImageWagtail from './VImageWagtail.vue'
import { isPublisherSrc } from './helpers.js'

const props = defineProps({
  src: {
    default: null,
    type: String,
  },
})
</script>

<template>
  <VImagePublisher
    v-if="isPublisherSrc(props.src)"
    v-bind="{ ...$props, ...$attrs }"
  />
  <VImageWagtail v-else v-bind="{ ...$props, ...$attrs }" />
</template>
