<script setup>
import VFlexibleLink from './VFlexibleLink.vue'
const props = defineProps({
  author: {
    type: Object,
    default: null,
  },
})
</script>

<template>
  <div>
    <v-flexible-link :to="author.url || null" class="v-byline-author-name">
      {{ author.firstName }} {{ author.lastName }}
    </v-flexible-link>
    <span v-if="author.organization" class="v-byline-parens"> (</span>
    <v-flexible-link
      v-if="author.organization"
      :to="author.organizationUrl || null"
      class="v-byline-contributing-org"
    >
      {{ author.organization }}
    </v-flexible-link>
    <span v-if="author.organization" class="v-byline-parens">)</span>
  </div>
</template>
