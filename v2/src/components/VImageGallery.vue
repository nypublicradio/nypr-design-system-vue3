<script setup>
import VFlexibleLink from './VFlexibleLink.vue'
import Button from 'primevue/button'
const props = defineProps({
  count: {
    type: String,
    default: null,
  },
  label: {
    type: String,
    default: 'View all',
  },
  galleryLink: {
    type: String,
    default: null,
    required: true,
  },
})

const emit = defineEmits(['gallery-click'])
</script>

<template>
  <VFlexibleLink
    class="v-image-gallery"
    :to="props.galleryLink"
    raw
    @click="emit('gallery-click')"
  >
    <Button
      :label="props.label"
      :badge="props.count"
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
