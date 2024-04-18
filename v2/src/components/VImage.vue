<script setup>
import VImageNpr from "./VImageNpr.vue"
import VImagePublisher from "./VImagePublisher.vue"
import VImageWagtail from "./VImageWagtail.vue"
import { cmsSources, getCmsSource } from "./helpers.js"
import { ref, watch } from "vue"

const props = defineProps({
  src: {
    default: null,
    type: String,
  },
})
const cmsSource = ref(getCmsSource(props.src))

// Watch the 'src' prop for changes and update 'cmsSource' accordingly
watch(
  () => props.src,
  (newSrc) => {
    cmsSource.value = getCmsSource(newSrc)
  }
)
</script>

<template>
  <VImagePublisher
    v-if="cmsSource === cmsSources.PUBLISHER"
    :key="`${props.src}Publisher`"
    v-bind="{ ...$props, ...$attrs }"
  >
    <template v-for="(value, name) in $slots" #[name]="data">
      <slot :name="name" v-bind="data"></slot>
    </template>
  </VImagePublisher>
  <VImageNpr
    v-else-if="cmsSource === cmsSources.NPR"
    :key="`${props.src}Npr`"
    v-bind="{ ...$props, ...$attrs }"
  >
    <template v-for="(value, name) in $slots" #[name]="data">
      <slot :name="name" v-bind="data"></slot>
    </template>
  </VImageNpr>
  <VImageWagtail
    v-else-if="cmsSource === cmsSources.WAGTAIL"
    :key="`${props.src}Wagtail`"
    v-bind="{ ...$props, ...$attrs }"
  >
    <template v-for="(value, name) in $slots" #[name]="data">
      <slot :name="name" v-bind="data"></slot>
    </template>
  </VImageWagtail>
</template>
