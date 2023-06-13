<script setup>
const props = defineProps({
  /**
   * label prefix
   */
  label: {
    type: String,
    default: null,
  },
  /**
   * stack icons vertically
   */
  vertical: {
    type: Boolean,
    default: false,
  },
})
</script>

<template>
  <div
    class="v-share-tools group"
    :class="[{ vertical: props.vertical }]"
    v-bind="{ ...$attrs }"
  >
    <p v-if="props.label" class="label">
      {{ props.label }}
    </p>
    <slot />
  </div>
</template>

<style lang="scss">
.v-share-tools.group {
  display: flex;
  align-items: center;
  flex-wrap: wrap;
  justify-content: flex-start;
  gap: 0.5rem 1rem;
  &.group.vertical {
    flex-direction: column;
  }
}
</style>
