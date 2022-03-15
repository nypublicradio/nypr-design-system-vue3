<script setup>
import VFlexibleLink from './VFlexibleLink'
const props = defineProps({
  authors: {
    type: Array,
    default: null,
  },
  prefix: {
    type: String,
    default: 'by ',
  },
})
// console.log('authors - ', props.authors)
</script>

<template>
  <div class="byline">
    {{ props.prefix }}
    <span
      v-for="(author, index) in props.authors"
      :key="index"
      class="byline-author"
    >
      <v-flexible-link v-if="author.url" target="_self" :to="author.url"
        >{{ author.firstName }}&nbsp;{{ author.lastName }}</v-flexible-link
      >
      <template v-else
        >{{ author.firstName }}&nbsp;{{ author.lastName }}</template
      >
      <template v-if="author.organization && author.organizationUrl">
        <v-flexible-link :to="author.organizationUrl"
          >({{ author.organization }})</v-flexible-link
        >
      </template>
      <template v-if="author.organization && !author.organizationUrl"
        >({{ author.organization }})</template
      >
      <template v-if="index < props.authors.length - 2">,&nbsp;</template>
      <template v-if="index === props.authors.length - 2"
        >&nbsp;and&nbsp;</template
      >
    </span>
  </div>
</template>

<style lang="scss">
.byline {
  color: var(--text-color);
}
</style>
