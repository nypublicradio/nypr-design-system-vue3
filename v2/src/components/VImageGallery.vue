<script setup>
import VFlexibleLink from './VFlexibleLink.vue'
import Button from 'primevue/button'
const props = defineProps({
  count: {
    type: Number,
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
  top: 8px;
  right: 8px;
}
</style>
