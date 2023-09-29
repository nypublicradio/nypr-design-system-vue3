<script setup>
import VImagePublisher from './VImagePublisher.vue'
import VImageWagtail from './VImageWagtail.vue'
import { computed } from 'vue'

const props = defineProps({
  src: {
    default: null,
    type: String,
  },
})

const isPublisherSrc = computed(() => {
  return props.src.includes('media.wnyc.org')
})
</script>

<template>
  <VImagePublisher v-if="isPublisherSrc" v-bind="{ ...$props, ...$attrs }" />
  <VImageWagtail v-else v-bind="{ ...$props, ...$attrs }" />
</template>
