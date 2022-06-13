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
    <v-flexible-link :to="props.slug" :class="props.slug ? '' : 'disabled'">
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
      padding: var(--badge-padding);
      border: var(--badge-border);
      border-radius: var(--badge-border-radius);
      text-decoration: none;
      vertical-align: middle;
      background: var(--badge-bg);
      color: var(--badge-text-color);
      .p-button-label {
        font-weight: var(--badge-font-weight);
        font-size: var(--badge-font-size);
        letter-spacing: var(--badge-letter-spacing);
        text-transform: uppercase;
      }
      &:hover {
        background: var(--badge-hover-bg);
        .p-button-label {
          color: var(--badge-hover-text-color) !important;
          text-decoration: none !important;
        }
      }
    }
  }
}
</style>
