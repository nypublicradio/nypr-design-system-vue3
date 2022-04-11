<script setup>
import Slider from 'primevue/slider'

const props = defineProps({
  progress: {
    type: Number,
    default: 0,
  },
})

const emit = defineEmits(['scrub-timeline-change', 'scrub-timeline-end'])
</script>

<template>
  <div class="progress-control">
    <Slider
      v-model="progress"
      :min="0"
      :max="100"
      @slideend="emit('scrub-timeline-end', progress)"
      @change="emit('scrub-timeline-change', progress)"
    />
  </div>
</template>

<style lang="scss">
.progress-control {
  width: 100%;

  @media (max-width: $md) {
    position: absolute;
    cursor: pointer;
    min-width: 200px;
    top: -5px;
    margin-top: 0;
    left: 0;
    right: 0;
    height: 5px;
  }

  .p-slider {
    width: 100%;
  }
}
</style>
