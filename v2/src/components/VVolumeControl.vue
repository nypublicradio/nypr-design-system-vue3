<script setup>
import { ref } from 'vue'
import Slider from 'primevue/slider'

const props = defineProps({
  volume: {
    type: Number,
    default: 50
  },
  isMuted: {
    type: Boolean,
    default: false
  },
  showVolume: {
    type: Boolean,
    default: false
  }
})

const emit = defineEmits(['volume-toggle-mute', 'volume-change'])

let previousVolume = ref(props.volume)

</script>

<template>
  <div class="volume-control" :class="{ 'show-volume': props.showVolume }">
    <Slider
      v-show="!props.isMuted"
      v-model="previousVolume"
      class="volume-control-slider"
      :min="0"
      :max="100"
      @change="emit('volume-change', previousVolume)"
    />
    <button
      class="volume-control-icon"
      :aria-label="props.isMuted ? 'unmute' : 'mute'"
      @click="emit('volume-toggle-mute')"
      @keypress.space.enter="mute"
    >
      <i v-if="!props.isMuted" class="pi pi-volume-up"></i>
      <i v-if="props.isMuted" class="pi pi-volume-off"></i>
    </button>
  </div>
</template>



<style lang="scss">
.volume-control {
  display: none;
  @media all and (min-width: $md) {
    display: flex;
    align-items: center;
    justify-content: flex-end;
  }
  &:hover,
  &:focus-within,
  &:focus-visible {
    .volume-control-slider {
      width: 116px;
      opacity: 1;
      visibility: visible;
      margin-right: 0;
    }
  }

  &.show-volume .volume-control-slider,
  & .volume-control-slider.focus-visible {
    width: 116px;
    opacity: 1;
    visibility: visible;
    margin-right: 0;
  }
  .label {
    height: 4px;
    line-height: 0px;
    margin-right: 4px;
  }
  .volume-control-icon {
    color: var(--text-color);
    flex: 1 0;
    appearance: none;
    border: none;
    background: transparent;
    cursor: pointer;
    display: inline-block;
    height: 36px;
    min-width: 36px;
    max-width: 36px;
  }
  .volume-control-slider {
    transition: width var(--transition-duration), opacity var(--transition-duration),
      margin-right var(--transition-duration);
    -webkit-transition: width var(--transition-duration), opacity var(--transition-duration),
      margin-right var(--transition-duration);
    margin-right: 0;
    width: 0px;
    opacity: 0;
    border: none;
  }
}
</style>
