<script setup>
import Button from 'primevue/button'
import VFlexibleLink from './VFlexibleLink'
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
      padding: var(--tab-padding);
      border: none;
      text-decoration: none;
      vertical-align: middle;
      .p-button-label {
        font-weight: var(--badge-font-weight);
        font-size: var(--font-size-2);
        letter-spacing: var(--badge-letter-spacing);
        text-transform: uppercase;
      }
    }
    &:hover {
      .p-button-label {
        text-decoration: none !important;
        color: var(--primary-color-text) !important;
      }
    }
  }
}
</style>
