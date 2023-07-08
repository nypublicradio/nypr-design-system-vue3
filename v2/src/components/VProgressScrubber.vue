<script setup>
import Slider from 'primevue/slider'
import { onUpdated, ref } from 'vue'

const props = defineProps({
  progress: {
    default: 0,
    type: Number,
  },
})

const emit = defineEmits([
  'scrub-timeline-change',
  'scrub-timeline-end',
  'timeline-click',
])

// v-model can't be used with props, so we need to create a ref
const progressRef = ref(props.progress)

onUpdated(() => {
  progressRef.value = props.progress
})
</script>

<template>
  <div class="progress-control">
    <Slider
      v-model="progressRef"
      :min="0.1"
      :max="100"
      aria-label="Volume slider"
      title="Volume slider"
      aria-labelledby="Volume slider"
      @slideend="emit('scrub-timeline-end', progressRef)"
      @change="emit('scrub-timeline-change', progressRef)"
      @click="emit('timeline-click', progressRef)"
    />
  </div>
</template>

<style lang="scss" scoped>
.progress-control {

  .p-slider {
    width: 100%;
    // .p-slider-range{

    // }
  }
}
</style>
