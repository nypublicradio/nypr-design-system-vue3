<script setup>
import VBylineUnit from './VBylineUnit.vue'
import { ref } from 'vue'
const props = defineProps({
  /**
   * authors data to display
   */
  authors: {
    default: null,
    type: [Array, Object],
  },
  /**
   * concat separator
   */
  concat: {
    default: ', ',
    type: String,
  },
  /**
   * what the last concat should be befoe the last author
   */
  concatLast: {
    default: ' and ',
    type: String,
  },
  /**
   * flex direction
   */
  flexDirection: {
    default: 'row',
    type: String,
  },
  /**
   * prefix text
   */
  prefix: {
    default: 'By ',
    type: String,
  },
  /**
   * show author image state
   */
  showImage: {
    default: false,
    type: Boolean,
  },
})
const emit = defineEmits(['name-click', 'organization-click'])

//css vars
const cssAlignOption = ref(
  props.flexDirection === 'row' ? 'center' : 'flex-start'
)
// to support if authors is an array or object
const authorsData = Array.isArray(props.authors)
  ? props.authors
  : [props.authors]

// methods to get unique key for each author, used for v-for key
const getUniqueKey = (author) => {
  return author?.id || author?.photoID || author?.lastName
}
</script>

<template>
  <div class="v-byline">
    <div v-if="showImage" class="images-holder">
      <template
        v-for="author in authorsData"
        :key="`author-image-${getUniqueKey(author)}`"
      >
        <slot name="images" :author="author" />
      </template>
    </div>
    <div>
      {{ props.prefix }}
      <template
        v-for="(author, index) in authorsData"
        :key="`author-${getUniqueKey(author)}`"
      >
        <v-byline-unit
          class="v-byline-unit"
          :author="author || null"
          @name-click="($event) => emit('name-click', $event)"
          @organization-click="($event) => emit('organization-click', $event)"
        />
        <span
          v-if="authorsData.length > 1 && index < authorsData.length - 2"
          class="v-byline-concat"
        >
          {{ props.concat }}
        </span>
        <span
          v-else-if="index !== authorsData.length - 1"
          class="v-byline-concat"
        >
          {{ props.concatLast }}
        </span>
      </template>
    </div>
    <div class="slot-holder">
      <slot name="afterNames" />
    </div>
  </div>
  <div class="v-byline-slot-holder">
    <slot name="belowNames" />
  </div>
</template>

<style lang="scss" scoped>
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
