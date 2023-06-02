<script setup>
import { computed, useSlots } from 'vue'
import breakpoint from '../../../src/assets/library/breakpoints.module.scss'
import VTag from './VTag.vue'
import VFlexibleLink from './VFlexibleLink.vue'
import VImageWithCaption from './VImageWithCaption.vue'

const props = defineProps({
  alt: {
    type: String,
    default: '',
  },
  loading: {
    type: String,
    default: 'lazy',
  },
  imageSrc: {
    type: String,
    default: null,
  },
  height: {
    type: Number,
    default: null,
  },
  width: {
    type: Number,
    default: null,
  },
  sponsored: {
    type: Boolean,
    default: false,
  },
  subtitle: {
    type: String,
    default: null,
  },
  blurb: {
    type: String,
    default: null,
  },
  eyebrow: {
    type: String,
    default: null,
  },
  tags: {
    type: Array,
    default: null,
  },
  title: {
    type: String,
    default: null,
  },
  titleLink: {
    type: String,
    default: null,
  },
  caption: {
    type: String,
    default: null,
  },
  captionKeepOnTop: {
    type: Boolean,
    default: false,
  },
  credit: {
    default: null,
    type: String,
  },
  creditUrl: {
    default: null,
    type: String,
  },
  maxHeight: {
    type: Number,
    default: Infinity,
  },
  maxWidth: {
    type: Number,
    default: Infinity,
  },
  /**
   * does not allow the vertical effect to happen
   */
  allowVerticalEffect: {
    type: Boolean,
    default: false,
  },
  /**
   * ratio (in landscape)
   */
  ratio: {
    type: Array,
    default: () => [3, 2],
  },
  /** * jpg compression quality */
  quality: {
    type: Number,
    default: 70,
  },
  /** * bool to NOT use the variable quality calc based on sizes */
  flatQuality: {
    type: Boolean,
    default: false,
  },
  sizes: {
    type: Array,
    default() {
      return [2, 3]
    },
  },
})

const emit = defineEmits([
  'title-click',
  'image-click',
  'credit-click',
  'tag-click',
])

const slots = useSlots()

const hasDetails = computed(() => {
  return (
    !!props.title ||
    !!props.subtitle ||
    !!slots.default ||
    !!props.blurb ||
    !!props.eyebrow
  )
})
</script>

<template>
  <div class="v-card2" :class="{ sponsored: sponsored }">
    <v-image-with-caption
      v-if="props.imageSrc"
      class="card-image"
      :style="`max-width: ${props.width}px;`"
      :image="props.imageSrc"
      :alt-text="props.alt"
      is-decorative
      :loading="props.loading"
      :image-url="props.titleLink"
      :width="props.width"
      :height="props.height"
      :max-width="props.maxWidth"
      :max-height="props.maxHeight"
      :allow-vertical-effect="props.allowVerticalEffect"
      :ratio="props.ratio"
      :quality="props.quality"
      :flat-quality="props.flatQuality"
      :sizes="props.sizes"
      :caption="props.caption"
      :caption-keep-on-top="props.captionKeepOnTop"
      :credit="props.credit"
      :credit-url="props.creditUrl"
      role="presentation"
      @image-click="(e) => emit('image-click', e)"
      @credit-click="(e) => emit('credit-click', e)"
    />
    <div v-if="hasDetails" class="card-details">
      <div v-if="eyebrow" class="card-eyebrow" v-html="eyebrow" />
      <div v-if="title" class="card-title" role="heading" aria-level="3">
        <template v-if="props.tags || sponsored">
          <v-tag
            v-for="(tag, index) in props.tags"
            :key="index"
            :name="tag.name"
            :slug="tag.slug"
            @tagClick="(e) => emit('tag-click', e)"
          />
          <v-tag v-if="sponsored" name="sponsored" />
        </template>
        <div class="title-holder">
          <div>
            <div class="slot slot-before-title">
              <slot name="beforeTitle"></slot>
            </div>
            <v-flexible-link
              class="card-title-link"
              :class="{ disabled: !props.titleLink }"
              :to="props.titleLink"
              @emit-flexible-link="emit('title-click', props.titleLink)"
            >
              <div class="card-title-title" v-html="props.title"></div>
              <!-- CHANGE TO SLOT AFTER TITLE -->
            </v-flexible-link>
          </div>
          <div class="slot slot-after-title">
            <slot name="afterTitle"></slot>
          </div>
        </div>
      </div>
      <div v-if="props.subtitle" class="card-subtitle">
        {{ props.subtitle }}
      </div>
      <div v-if="props.blurb" class="card-blurb" v-html="props.blurb"></div>
      <div class="slot slot-below-blurb"><slot name="belowBlurb"></slot></div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.v-card2 {
  display: flex;
  border-radius: var(--border-radius);
  width: 100%;
  max-width: 100%;
  gap: 1rem;
  .card-image {
  }
  .card-details {
    .title-holder {
      display: flex;
      flex-direction: row;
      align-items: flex-start;
      gap: 0.5rem;
      .slot-before-title {
        float: left;
        margin-right: 0.5rem;
      }
    }
  }
  a.disabled {
    pointer-events: none;
  }
}
</style>
