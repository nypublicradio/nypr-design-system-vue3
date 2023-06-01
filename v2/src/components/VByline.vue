<script setup>
import { ref } from 'vue'
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
  showImage: {
    type: Boolean,
    default: false,
  },
  flexDirection: {
    type: String,
    default: 'row',
  },
})
const emit = defineEmits(['name-click', 'organization-click'])

//css vars
const cssAlignOption = ref(
  props.flexDirection === 'row' ? 'center' : 'flex-start'
)

// depending on the author object, we return a unique key
const getUniqueKey = (author) => {
  if (author.id) return author.id
  if (author.name) return author.name.replace(/\s+/g, '-').toLowerCase()
  return Math.random().toString(36).substr(2, 9)
}
</script>

<template>
  <div class="v-byline">
    <div class="images-holder" v-if="showImage">
      <template
        v-for="(author, index) in props.authors"
        :key="`author-${index}-${getUniqueKey(author)}`"
      >
        <slot name="images" :author="author" />
      </template>
    </div>
    <div>
      {{ props.prefix }}
      <template v-if="Array.isArray(props.authors)">
        <template
          v-for="(author, index) in props.authors"
          :key="`author-${index}-${getUniqueKey(author)}`"
        >
          <v-byline-unit
            class="v-byline-unit"
            :author="author || null"
            @name-click="($event) => emit('name-click', $event)"
            @organization-click="($event) => emit('organization-click', $event)"
          />
          <span
            v-if="authors.length > 1 && index < authors.length - 2"
            class="v-byline-concat"
          >
            {{ props.concat }}
          </span>
          <span
            v-else-if="index !== authors.length - 1"
            class="v-byline-concat"
          >
            {{ props.concatLast }}
          </span>
        </template>
      </template>
      <template v-else>
        <v-byline-unit
          class="v-byline-unit"
          :author="props.authors"
          @name-click="($event) => emit('name-click', $event)"
          @organization-click="($event) => emit('organization-click', $event)"
        />
      </template>
    </div>
    <div class="slot-holder">
      <slot name="afterNames" :author="author" />
    </div>
  </div>
  <div class="v-byline-slot-holder">
    <slot name="belowNames" :author="author" />
  </div>
</template>

<style lang="scss">
.v-byline {
  color: var(--text-color);
  display: flex;
  gap: 10px;
  align-items: v-bind(cssAlignOption);
  flex-direction: v-bind(flexDirection);
  .images-holder {
    display: flex;
    gap: 10px;
    flex-wrap: wrap;
  }
  .v-byline-contributing-org,
  .v-byline-concat,
  .v-byline-unit {
    display: inline;
  }
}
</style>
