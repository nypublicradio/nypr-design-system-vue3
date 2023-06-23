<script setup>
import VFlexibleLink from './VFlexibleLink.vue'

const props = defineProps({
  /**
   * url or slug or anchor to go to
   */
  slug: {
    type: String,
    default: null,
  },
  /**
   * tag label
   */
  name: {
    type: String,
    default: null,
  },
})
const emit = defineEmits(['tagClick'])
</script>

<template>
  <span class="v-tag">
    <VFlexibleLink
      raw
      :to="props.slug"
      :class="props.slug ? '' : 'disabled'"
      @click="emit('tagClick', props.slug)"
    >
      <div :class="`p-button p-button-rounded p-button-outlined ${props.name}`">
        <span class="p-button-label">{{ props.name }}</span>
      </div>
    </VFlexibleLink>
  </span>
</template>

<style lang="scss">
.v-tag {
  .flexible-link {
    text-decoration: none !important;
    display: inline-flex;
    &.disabled {
      pointer-events: none;
    }
    &:hover .p-button,
    &:active .p-button {
      background: var(--tag-hover-bg);
      text-decoration: none !important;
      .p-button-label {
        color: var(--tag-hover-text-color) !important;
        text-decoration: none !important;
      }
    }
    .p-button {
      padding: var(--tag-padding);
      border: var(--tag-border);
      border-radius: var(--tag-border-radius);
      text-decoration: none !important;
      vertical-align: middle;
      background: var(--tag-bg);
      color: var(--tag-text-color);
      white-space: nowrap;
      .p-button-label {
        font-weight: var(--tag-font-weight);
        font-size: var(--tag-font-size);
        letter-spacing: var(--tag-letter-spacing);
        text-transform: uppercase;
      }
    }
  }
}
</style>
