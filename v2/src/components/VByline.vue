<script setup>
import VBylineUnit from './VBylineUnit.vue'
const props = defineProps({
  authors: {
    type: [Array, Object],
    default: null,
  },
  prefix: {
    type: String,
    default: 'By ',
  },
  concat: {
    type: String,
    default: ' and ',
  },
})
</script>

<template>
  <div class="v-byline">
    {{ props.prefix }}
    <template v-if="Array.isArray(props.authors)">
      <template
        v-for="(author, index) in props.authors"
        :key="`author-${index}`"
      >
        <v-byline-unit class="v-byline-unit" :author="author || null" />
        <span v-if="index !== authors.length - 1" class="v-byline-concat">
          {{ props.concat }}
        </span>
      </template>
    </template>
    <template v-else>
      <v-byline-unit class="v-byline-unit" :author="props.authors" />
    </template>
  </div>
</template>

<style lang="scss">
.v-byline {
  color: var(--text-color);

  .v-byline-contributing-org,
  .v-byline-concat,
  .v-byline-unit {
    display: inline;
  }
}
</style>
