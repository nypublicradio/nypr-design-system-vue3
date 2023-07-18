<script setup>
import VFlexibleLink from './VFlexibleLink.vue'

const props = defineProps({
  /**
   * background color
   */
  color: {
    default: null,
    type: String,
  },
  /**
   * tag label
   */
  name: {
    default: null,
    type: String,
  },
  /**
   * url or slug or anchor to go to
   */
  slug: {
    default: null,
    type: String,
  },
  /**
   * text color
   */
  textColor: {
    default: null,
    type: String,
  },
})
const emit = defineEmits(['tagClick'])
</script>

<template>
  <span class="v-tag">
    <VFlexibleLink
      raw
      :to="props.slug"
      :class="[
        { disabled: !props.slug },
        { useProps: props.color || props.textColor },
      ]"
      @click="emit('tagClick', props.slug)"
    >
      <div
        class="p-button p-button-rounded p-button-outlined"
        :class="[props.name, { useProps: props.color || props.textColor }]"
      >
        <span class="p-button-label">{{ props.name }}</span>
      </div>
    </VFlexibleLink>
  </span>
</template>

<style lang="scss" scoped>
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
    &.useProps:hover .p-button-label {
      color: v-bind(textColor) !important;
    }
    .p-button {
      display: flex;
      background: var(--tag-bg);
      padding: var(--tag-padding);
      border: var(--tag-border);
      border-radius: var(--tag-border-radius);
      text-decoration: none !important;
      vertical-align: middle;
      color: var(--tag-text-color);
      white-space: nowrap;
      &.useProps {
        background: v-bind(color);
        color: v-bind(textColor);
      }
      .p-button-label {
        font-weight: var(--tag-font-weight);
        font-size: var(--tag-font-size);
        letter-spacing: var(--tag-letter-spacing);
        text-transform: uppercase;
        line-height: normal;
      }
    }
  }
}
</style>
