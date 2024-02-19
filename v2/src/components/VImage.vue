<script setup>
import VImageRender from "./VImageRender.vue"

const props = defineProps({
  clientOnly: {
    default: false,
    type: Boolean,
  },
  src: {
    default: null,
    type: String,
  },
})
</script>

<template>
  <VImageRender v-if="!clientOnly" v-bind="{ ...$props, ...$attrs }">
    <template v-for="(value, name) in $slots" #[name]="data">
      <slot :name="name" v-bind="data"></slot>
    </template>
  </VImageRender>
  <ClientOnly v-else>
    <VImageRender v-bind="{ ...$props, ...$attrs }">
      <template v-for="(value, name) in $slots" #[name]="data">
        <slot :name="name" v-bind="data"></slot>
      </template>
    </VImageRender>
  </ClientOnly>
</template>
