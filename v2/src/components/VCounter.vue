<script setup>

import VFlexibleLink from './VFlexibleLink'

const props = defineProps({
  href: {
    type: String,
    default: null,
    required: true
  },
  icon: {
    type: String,
    default: null
  },
  text: {
    type: String,
    default: null
  },
  value: {
    type: Number,
    default: 0,
    required: true
  }
})

</script>

<template>
  <v-flexible-link v-if="props.value && props.value > 0" :to="props.href" class="counter">
    <span v-if="props.icon" class="icon">
      <i
        v-if="props.icon === 'comment'"
        class="pi pi-comment"
        role="img"
        :aria-label="props.value + ' comments'"
      ></i>
      <i
        v-if="props.icon === 'gallery'"
        class="pi pi-images"
        role="img"
        :aria-label="props.value + ' photos'"
      ></i>
    </span>
    {{ props.value }} {{ props.text }}
  </v-flexible-link>
</template>

<style lang="scss">
.counter {
  position: relative;
  display: inline-flex;
  .icon {
    position: relative;
    margin-right: spacing(2);
    margin-top: spacing(0.5);
    .pi {
      text-decoration: none;
    }
  }
}
</style>
