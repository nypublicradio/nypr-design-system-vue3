<script setup>
import VFlexibleLink from './VFlexibleLink.vue'

const props = defineProps({
  href: {
    type: String,
    default: null,
    //required: true,
  },
  icon: {
    type: Boolean,
    default: false,
  },
  text: {
    type: String,
    default: null,
  },
  value: {
    type: Number,
    default: 0,
    //required: true,
  },
})
</script>

<template>
  <span>
    <v-flexible-link
      v-if="props.value && props.value > 0"
      :to="props.href"
      class="counter"
    >
      <span v-if="props.icon" class="icon">
        <slot name="icon" :props="props">
          <i
            :class="`pi pi-comment`"
            role="img"
            :aria-label="`${props.value} ${props.text}`"
          ></i>
        </slot>
      </span>
      {{ props.value }} {{ props.text }}
    </v-flexible-link>
  </span>
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
