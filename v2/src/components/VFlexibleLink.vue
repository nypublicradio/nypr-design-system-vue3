<script setup>
import { computed } from 'vue'

const props = defineProps({
  /**
   * pass through and not render link visuals
   */
  raw: {
    default: false,
    type: Boolean,
  },
  /**
   * raw hover style
   */
  rawHover: {
    default: 'none',
    type: String,
  },
  /**
   * link target value
   */
  target: {
    default: '_blank',
    type: String,
  },
  /**
   * url or slug or anchor to go to
   */
  to: {
    default: null,
    type: String,
  },
})

const emit = defineEmits(['flexible-link-click'])

const isExternal = computed(() => {
  const reg = /^https?:\/\/|mailto:|tel:/i
  return typeof props.to === 'string' && reg.test(props.to)
})
const isAnchor = computed(() => {
  return props.to.charAt(0) === '#'
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
    @click="emit('flexible-link-click', to)"
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
    @click="emit('flexible-link-click', to)"
  >
    <slot name="default"></slot>
  </a>
  <nuxt-link
    v-else
    class="flexible-link internal"
    :class="{ ['raw']: raw }"
    :to="to"
    v-bind="{ ...$attrs }"
    @click="emit('flexible-link-click', to)"
  >
    <slot name="default"></slot>
  </nuxt-link>
</template>
<style lang="scss" scoped>
.flexible-link:not(.raw):not(.null) {
  color: var(--link-button-color);
  transition: all var(--transition-duration);
  * {
    transition: all var(--transition-duration);
  }
  &:hover {
    color: var(--link-button-hover-color);
    text-decoration: var(--link-button-text-hover-decoration);
    * {
      color: var(--link-button-hover-color);
      text-decoration: var(--link-button-text-hover-decoration);
    }
  }
  &:focus {
    outline: var(--focus-outline);
    outline-offset: var(--focus-outline-offset);
    box-shadow: var(--link-button-focus-shadow);
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
  &:hover,
  *:hover {
    text-decoration: v-bind(rawHover);
  }
}
</style>
