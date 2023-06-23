<script setup>
import VFlexibleLink from './VFlexibleLink.vue'
import Button from 'primevue/button'
const props = defineProps({
  count: {
    default: null,
    type: String,
  },
  galleryLink: {
    default: null,
    required: true,
    type: String,
  },
  label: {
    default: 'View all',
    type: String,
  },
})

const emit = defineEmits(['gallery-click'])
</script>

<template>
  <VFlexibleLink
    class="v-image-gallery"
    :to="props.galleryLink"
    raw
    @click="emit('gallery-click', props.galleryLink)"
  >
    <Button
      :label="props.label"
      :badge="props.count"
      class="gallery-button"
      aria-label="gallery button"
    >
    </Button>
  </VFlexibleLink>
</template>

<style lang="scss" scoped>
.v-image-gallery {
  position: absolute;
  top: var(--v-image-button-padding);
  right: var(--v-image-button-padding);
}
</style>
