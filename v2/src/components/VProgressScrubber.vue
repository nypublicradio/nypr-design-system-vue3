<script setup>
import { ref, onUpdated } from 'vue'
import Slider from 'primevue/slider'

const props = defineProps({
  progress: {
    type: Number,
    default: 0,
  }
})

const previousProgress = ref(props.progress)

// onUpdated(() => {
//   console.log('props.progress -= ', props.progress)
//   console.log('previousProgress -= ', previousProgress.value)
//   previousProgress.value = props.progress
//   emit('scrub-timeline-change', previousProgress)
// })

const emit = defineEmits(['scrub-timeline-change', 'scrub-timeline-end', 'timeline-click'])
</script>

<template>
  <div class="progress-control">
    <Slider
      v-model="progress"
      :min="0.1"
      :max="100"
      @slideend="emit('scrub-timeline-end', progress)"
      @change="emit('scrub-timeline-change', progress)"
      @click="emit('timeline-click', progress)"
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
