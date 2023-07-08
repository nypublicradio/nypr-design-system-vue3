<script setup>
import Button from 'primevue/button'
import { shallowRef } from 'vue'

const props = defineProps({
  text: {
    default: null,
    type: String,
  },
})

const emit = defineEmits([
  'toggle-caption-expanded',
  'toggle-caption-collapsed',
])

const showCaption = shallowRef(false)
// toggle caption state and emits
const toggleCaption = () => {
  showCaption.value = !showCaption.value
  if (showCaption.value) {
    emit('toggle-caption-expanded')
  } else {
    emit('toggle-caption-collapsed')
  }
}
</script>

<template>
  <div class="v-image-caption">
    <transition name="fade">
      <div
        v-if="showCaption"
        class="content"
        aria-live="polite"
        v-html="props.text"
      ></div>
    </transition>
    <Button
      :icon="`pi pi-${showCaption ? 'times' : 'info'}`"
      class="caption-button"
      aria-label="caption button"
      @click.prevent="toggleCaption"
    >
    </Button>
  </div>
</template>

<style lang="scss" scoped>
.v-image-caption {
  position: absolute;
  display: block;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  .caption-button {
    position: absolute;
    bottom: var(--v-image-button-padding);
    right: var(--v-image-button-padding);
  }
  .content {
    position: absolute;
    bottom: 0;
    right: 0;
    left: 0;
    width: 100%;
    height: auto;
    background-color: rgba(
      var(--v-caption-bg-color),
      var(--v-caption-bg-color-opacity)
    );
    color: white;
    padding: 16px 54px 16px 16px;
    line-height: normal;
    overflow-y: auto;
    display: block;
    max-height: 100%;
  }
}
</style>
