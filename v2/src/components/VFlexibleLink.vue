<script setup>
import { computed } from 'vue'

const props = defineProps({
  to: {
    type: String,
    default: null,
  },
  target: {
    type: String,
    default: '_blank',
  },
  raw: {
    type: Boolean,
    default: false,
  },
  rawHover: {
    type: String,
    default: 'none',
  },
})

const emit = defineEmits(['emit-flexible-link'])

const isExternal = computed(() => {
  const reg = /^https?:\/\/|mailto:|tel:/i
  if (typeof props.to === 'string' && reg.test(props.to)) {
    return true
  }
  return false
})
const isAnchor = computed(() => {
  if (props.to.charAt(0) === '#') {
    return true
  }
  return false
})
</script>

<template>
  <div v-if="!to" class="flexible-link null" v-bind="{ ...$attrs }">
    <slot name="default"></slot>
  </div>
  <a
    v-else-if="isExternal"
    v-bind="{ ...$props, ...$attrs }"
    :href="to"
    :target="target"
    :rel="`noopener ${props.target === '_blank' ? 'noreferrer' : ''}`"
    class="flexible-link external"
    :class="{ ['raw']: raw }"
    @click="emit('emit-flexible-link')"
  >
    <slot name="default"></slot>
  </a>
  <a
    v-else-if="isAnchor"
    v-bind="{ ...$props, ...$attrs }"
    :href="to"
    target="_self"
    class="flexible-link anchor"
    :class="{ ['raw']: raw }"
    @click="emit('emit-flexible-link')"
  >
    <slot name="default"></slot>
  </a>
  <nuxt-link
    v-else
    class="flexible-link internal"
    :class="{ ['raw']: raw }"
    :to="to"
    v-bind="{ ...$attrs }"
    @click="emit('emit-flexible-link')"
  >
    <slot name="default"></slot>
  </nuxt-link>
</template>
<style lang="scss">
.flexible-link:not(.raw):not(.null) {
  color: var(--link-button-color);
  transition: all var(--transition-duration);
  * {
    transition: all var(--transition-duration);
  }
  &:hover {
    color: var(--link-button-hover-color) !important;
    text-decoration: var(--link-button-text-hover-decoration);
    * {
      color: var(--link-button-hover-color) !important;
      text-decoration: var(--link-button-text-hover-decoration);
    }
  }
  &:focus {
    outline: var(--focus-outline);
    outline-offset: var(--focus-outline-offset);
    box-shadow: var(--focus-shadow);
  }
}
.flexible-link.null {
  color: inherit;
  text-decoration: none;
  &:hover {
    text-decoration: none;
  }
}
.flexible-link.raw {
  color: inherit;
  text-decoration: none;
  &:hover {
    text-decoration: v-bind(rawHover);
  }
}
</style>
