<script setup>
import VFlexibleLink from './VFlexibleLink.vue'
const props = defineProps({
  author: {
    type: Object,
    default: null,
  },
})
const emit = defineEmits([
  'name-click', 'organization-click'
])
</script>

<template>
  <div>
    <v-flexible-link
      :to="author.url || null"
      class="v-byline-author-name"
      @click="emit('name-click', {text: `${author.firstName} ${author.lastName}`, url: author.url})"
    >
      {{ author.firstName }} {{ author.lastName }}
    </v-flexible-link>
    <span v-if="author.organization" class="v-byline-parens"> (</span>
    <v-flexible-link
      v-if="author.organization"
      :to="author.organizationUrl || null"
      class="v-byline-contributing-org"
      @click="emit('organization-click', {text: author.organization, url: author.organizationUrl})"
    >
      {{ author.organization }}
    </v-flexible-link>
    <span v-if="author.organization" class="v-byline-parens">)</span>
  </div>
</template>
