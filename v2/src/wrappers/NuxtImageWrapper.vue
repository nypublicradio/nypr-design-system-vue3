<script setup>
const props = defineProps({
  provider: {
    type: String,
    default: 'wagtail',
  },
  src: {
    type: String,
    required: true,
  },
  alt: {
    type: String,
    default: '',
  },
  sizes: {
    type: String,
    default: null,
  },
  format: {
    type: String,
    default: 'webp',
  },
  quality: {
    type: String,
    default: '70',
  },
  width: {
    type: Number,
    default: null,
  },
  height: {
    type: Number,
    default: null,
  },
  onLoad: {
    type: Number,
    default: () => {},
  },
})
</script>

<template>
  <nuxt-img
    :provider="provider"
    :src="src"
    :sizes="sizes"
    :format="format"
    :quality="quality"
    :alt="alt"
    :width="width"
    :height="height"
    @load="onLoad"
  />
</template>
