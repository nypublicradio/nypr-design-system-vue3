<script setup>
import VFlexibleLink from "./VFlexibleLink.vue"
const props = defineProps({
  author: {
    default: null,
    type: Object,
  },
  isBlockLinks: {
    default: false,
    type: Boolean,
  },
})
const emit = defineEmits(["name-click", "organization-click"])
</script>

<template>
  <div>
    <VFlexibleLink
      :to="props.author?.url || null"
      class="v-byline-author-name inline"
      :style="`pointer-events: ${props.isBlockLinks ? 'none' : 'auto'}`"
      @click="
        () =>
          emit('name-click', {
            text: `${props.author?.firstName} ${props.author?.lastName}`,
            url: props.author?.url,
          })
      "
    >
      {{ props.author?.firstName }} {{ props.author?.lastName }}
    </VFlexibleLink>
    <template v-if="props.author?.organization">
      <span class="v-byline-parens">&nbsp;(</span>
      <VFlexibleLink
        :to="props.author?.organizationUrl || null"
        class="v-byline-contributing-org"
        :style="`display: inline; pointer-events: ${
          props.isBlockLinks ? 'none' : 'auto'
        }`"
        @click="
          () =>
            emit('organization-click', {
              text: props.author?.organization,
              url: props.author?.organizationUrl,
            })
        "
      >
        {{ props.author?.organization }}
      </VFlexibleLink>
      <span class="v-byline-parens">)</span>
    </template>
  </div>
</template>
