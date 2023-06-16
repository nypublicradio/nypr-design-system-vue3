<script setup>
import VFlexibleLink from './VFlexibleLink.vue'

const props = defineProps({
  /**
   * url or slug or anchor to go to
   */
  href: {
    type: String,
    default: null,
  },
  /**
   * show icon state
   */
  showIcon: {
    type: Boolean,
    default: true,
  },
  /**
   * prime icons class
   */
  icon: {
    type: String,
    default: 'pi-comment',
  },
  /**
   * label
   */
  text: {
    type: String,
    default: 'Comments',
    required: true,
  },
  /**
   * number value in coutner
   */
  value: {
    type: Number,
    default: 0,
    required: true,
  },
})
</script>

<template>
  <VFlexibleLink
    v-if="props.value && props.value > 0"
    :to="props.href"
    class="counter"
  >
    <span v-if="props.showIcon" class="icon">
      <slot name="icon" :props="props">
        <i
          :class="`pi ${props.icon}`"
          role="img"
          :aria-label="`${props.value} ${props.text}`"
        ></i>
      </slot>
    </span>
    {{ props.value }} {{ props.text }}
  </VFlexibleLink>
</template>

<style lang="scss">
.counter {
  position: relative;
  display: inline-flex;
  .icon {
    position: relative;
    margin-right: spacing(2);
    margin-top: spacing(0.5);
    * {
      text-decoration: none !important;
    }
  }
}
</style>
