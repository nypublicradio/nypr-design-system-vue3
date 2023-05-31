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
  showImage: {
    type: Boolean,
    default: false,
  },
})
const emit = defineEmits(['name-click', 'organization-click'])

// depending on the author object, we return a unique key
const getUniqueKey = (author) => {
  if (author.id) return author.id
  if (author.name) return author.name.replace(/\s+/g, '-').toLowerCase()
  return Math.random().toString(36).substr(2, 9)
}
</script>

<template>
  <div class="v-byline">
    <template v-if="showImage">
      <template
        v-for="(author, index) in props.authors"
        :key="`author-${index}-${getUniqueKey(author)}`"
      >
        <slot name="images" />
      </template>
    </template>
    <!-- <template v-if="Array.isArray(props.authors)">
      <template
        v-for="(author, index) in props.authors"
        :key="`author-${index}-${getUniqueKey(author)}`"
      >
        <div class="author-image">
          <v-flexible-link
            :to="author.url"
            raw
            :aria-hidden="true"
            :tabindex="-1"
            @click="emit('click-image', author.url)"
          >
            <v-simple-responsive-image
              v-if="profile.photoID"
              :src="`${props.imgApi}${profile.photoID}${props.imgApiSuffix}`"
              :width="imageSize"
              :height="imageSize"
              :sizes="props.pixelDensitySizes"
              :ratio="props.imageRatio"
              :loading="props.loading"
              alt="Profile image"
            />
            <img
              v-else
              :src="`${
                props.sponsored
                  ? profile.logo
                  : props.imageFallbackPath
                  ? props.imageFallbackPath
                  : defaultUserPhoto
              }`"
              :loading="props.loading"
              style="width: 100%; height: auto"
              alt="Profile image"
            />
          </v-flexible-link>
        </div>
      </template>
    </template> -->
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
        <span v-else-if="index !== authors.length - 1" class="v-byline-concat">
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
