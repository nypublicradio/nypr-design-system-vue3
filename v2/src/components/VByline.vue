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
  concatLast: {
    type: String,
    default: ' and ',
  },
  concat: {
    type: String,
    default: ', ',
  },
})
const emit = defineEmits([
  'name-click', 'organization-click'
])

// depending on the author object, we return a unique key
const getUniqueKey = (author) => {
  if (author.id) return author.id
  if (author.name) return author.name.replace(/\s+/g, '-').toLowerCase()
  return Math.random().toString(36).substr(2, 9)
}
</script>

<template>
  <div class="v-byline">
    {{ props.prefix }}
    <template v-if="Array.isArray(props.authors)">
      <template
        v-for="(author, index) in props.authors"
        :key="`author-${index}-${getUniqueKey(author)}`"
      >
        <v-byline-unit
          class="v-byline-unit"
          :author="author || null"
          @name-click="emit('name-click', $event)"
          @organization-click="emit('organization-click', $event)"
        />
        <span
          v-if="authors.length > 1 && index < authors.length - 2"
          class="v-byline-concat"
        >
          {{ props.concat }}
        </span>
        <span v-else-if="index !== authors.length - 1" class="v-byline-concat">
          {{ props.concatLast }}
        </span>
      </template>
    </template>
    <template v-else>
      <v-byline-unit
        class="v-byline-unit"
        :author="props.authors"
        @name-click="emit('name-click', $event)"
        @organization-click="emit('organization-click', $event)"
      />
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
