<script setup>
const props = defineProps({
  label: {
    type: String,
    default: null,
  },
  responsive: {
    type: Boolean,
    default: false,
  },
  vertical: {
    type: Boolean,
    default: false,
  },
  bp: {
    type: String,
    default: 'sm',
  },
})
</script>

<template>
  <div
    class="v-share-tools group"
    :class="[{ vertical: props.vertical }]"
    v-bind="{ ...$attrs }"
  >
    <p
      v-if="props.label"
      class="label"
      :class="[{ [`w-full ${bp}:w-auto`]: responsive }]"
    >
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
  gap: spacing(4);
  &.group.vertical {
    flex-direction: column;
  }
}
</style>
