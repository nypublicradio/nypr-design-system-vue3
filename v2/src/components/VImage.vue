<script setup>
import VImageNpr from "./VImageNpr.vue"
import VImagePublisher from "./VImagePublisher.vue"
import VImageWagtail from "./VImageWagtail.vue"
import { cmsSources, getCmsSource } from "./helpers.js"

const props = defineProps({
  src: {
    default: null,
    type: String,
  },
})

const cmsSource = getCmsSource(props.src)
</script>

<template>
  <div>
    {{ cmsSource }}
    <VImagePublisher
      v-if="cmsSource === cmsSources.PUBLISHER"
      :key="`${props.src}Publisher`"
      v-bind="{ ...$props, ...$attrs }"
    >
      <template v-for="(value, name) in $slots" #[name]="data">
        <slot :name="name" v-bind="data"></slot>
      </template>
    </VImagePublisher>

    <VImageWagtail
      v-if="cmsSource === cmsSources.WAGTAIL"
      :key="`${props.src}Wagtail`"
      v-bind="{ ...$props, ...$attrs }"
    >
      <template v-for="(value, name) in $slots" #[name]="data">
        <slot :name="name" v-bind="data"></slot>
      </template>
    </VImageWagtail>

    <VImageNpr
      v-if="cmsSource === cmsSources.NPR"
      :key="`${props.src}Npr`"
      v-bind="{ ...$props, ...$attrs }"
    >
      <template v-for="(value, name) in $slots" #[name]="data">
        <slot :name="name" v-bind="data"></slot>
      </template>
    </VImageNpr>
  </div>
</template>
