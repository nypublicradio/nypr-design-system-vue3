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
      :to="props.slug"
      :class="props.slug ? '' : 'disabled'"
      class="raw"
    >
      <Button
        :class="props.name"
        :label="props.name"
        :style="
          props.radius !== null ? `border-radius: ${props.radius}px;` : ''
        "
        @click="props.slug ? emit('tagClick', props.slug) : null"
      ></Button>
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
    .p-button {
      padding: var(--tag-padding);
      border: var(--tag-border);
      border-radius: var(--tag-border-radius);
      text-decoration: none;
      vertical-align: middle;
      background: var(--tag-bg);
      color: var(--tag-text-color);
      .p-button-label {
        font-weight: var(--tag-font-weight);
        font-size: var(--tag-font-size);
        letter-spacing: var(--tag-letter-spacing);
        text-transform: uppercase;
      }
      &:link,
      &:visited,
      &:hover,
      &:active {
        background: var(--tag-hover-bg);
        text-decoration: none !important;
        .p-button-label {
          color: var(--tag-hover-text-color) !important;
          text-decoration: none !important;
        }
      }
    }
  }
}
</style>
