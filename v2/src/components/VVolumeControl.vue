<script setup>
import Slider from 'primevue/slider'
import { onUpdated, ref } from 'vue'

const props = defineProps({
  disabled: {
    default: false,
    type: Boolean,
  },
  isMuted: {
    default: false,
    type: Boolean,
  },
  showVolume: {
    default: false,
    type: Boolean,
  },
  volume: {
    default: 100,
    type: Number,
  },
})

const emit = defineEmits(['volume-toggle-mute', 'volume-change'])

const previousVolume = ref(props.volume)

onUpdated(() => {
  previousVolume.value = props.volume
  emit('volume-change', props.volume)
})
</script>

<template>
  <div
    class="volume-control align-items-center"
    :class="{ 'show-volume': props.showVolume }"
  >
    <Slider
      v-if="!props.isMuted"
      v-model="previousVolume"
      :disabled="disabled"
      class="volume-control-slider"
      :min="0"
      :max="100"
      aria-label="Volume slider"
      title="Volume slider"
      aria-labelledby="Volume slider"
      @change="emit('volume-change', previousVolume)"
    />
    <button
      class="volume-control-icon"
      :disabled="disabled"
      :aria-label="props.isMuted ? 'unmute' : 'mute'"
      @click="emit('volume-toggle-mute')"
      @keypress.space.enter="mute"
    >
      <slot v-if="!props.isMuted" name="volumeOn"
        ><i class="pi pi-volume-up"></i
      ></slot>
      <slot v-if="props.isMuted" name="volumeOff"
        ><i class="pi pi-volume-off"></i
      ></slot>
    </button>
  </div>
</template>

<style lang="scss">
.volume-control {
  display: flex;
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
    line-height: 0.5rem;
    color: var(--persistent-player-text-button-color);
    flex: 1 0;
    appearance: none;
    border: none;
    background: transparent;
    cursor: pointer;
    display: inline-block;
    height: 36px;
    min-width: 36px;
    max-width: 36px;
    &:hover {
      color: var(--persistent-player-text-button-color-hover);
    }
  }
  .volume-control-slider {
    transition: width var(--transition-duration),
      opacity var(--transition-duration),
      margin-right var(--transition-duration);
    -webkit-transition: width var(--transition-duration),
      opacity var(--transition-duration),
      margin-right var(--transition-duration);
    margin-right: 0;
    width: 0px;
    opacity: 0;
    border: none;
  }
}
</style>
