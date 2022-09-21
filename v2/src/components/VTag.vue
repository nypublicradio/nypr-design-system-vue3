<script setup>
import Button from 'primevue/button'
import VFlexibleLink from './VFlexibleLink.vue'
const emit = defineEmits(['tagClick'])
const props = defineProps({
  slug: {
    type: String,
    default: null,
  },
  name: {
    type: String,
    default: null,
  },
  radius: {
    type: Number,
    default: null,
  },
})
</script>

<template>
  <span class="v-tag">
    <v-flexible-link
      :to="slug"
      :class="slug ? '' : 'disabled'"
      @click="emit('tagClick', tag)"
    >
      <div :class="`p-button p-button-rounded p-button-outlined ${name}`">
        <span class="p-button-label">{{name}}</span>
      </div>
    </v-flexible-link>
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
