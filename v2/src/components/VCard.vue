<script setup>
import { computed, useSlots } from 'vue'
import breakpoint from '../../../src/assets/library/breakpoints.module.scss'
import VTag from './VTag.vue'
import VFlexibleLink from './VFlexibleLink.vue'
import VImageWithCaption from './VImageWithCaption.vue'

const props = defineProps({
  alt: {
    type: String,
    default: null,
  },
  loading: {
    type: String,
    default: 'lazy',
  },
  image: {
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
  icon: {
    type: String,
    default: null,
  },
  customIcon: {
    type: Object,
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
   * Switches to vertical layout on 'sm' mobile breakpoint
   */
  responsive: {
    type: Boolean,
    default: false,
  },
  /**
   * will control the scale of the image on 'sm' mobile breakpoint
   */
  mobileImageScale: {
    type: Number,
    default: 1,
  },
  /**
   * what breakpoint to be mobile breakpoint
   */
  bp: {
    type: String,
    default: 'sm',
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
const slots = useSlots()

const hasDetails = computed(() => {
  return (
    !!props.title ||
    !!props.subtitle ||
    !!slots.default ||
    !!slots.blurb ||
    !!slots.eyebrow
  )
})

// const getMobileImageScale = computed(() => {
//   // console.log('window.innerWidth = ', window.innerWidth)
//   // console.log('breakpoint[props.bp] = ', breakpoint[props.bp])
//   return window.innerWidth < breakpoint[props.bp] ? props.mobileImageScale : 1
// })
</script>

<template>
  <div
    class="v-card"
    :class="{
      [`flex-column ${bp}:flex-row`]: responsive,
      sponsored: sponsored,
    }"
  >
    <template v-if="image">
      <div
        class="card-image-link card-image-wrapper"
        :class="{ [`w-full ${bp}:w-max`]: responsive }"
      >
        <!-- mobile, uses window width to load the image size-->
        <v-image-with-caption
          class="card-image w-full"
          :class="responsive ? `${bp}:hidden ${bp}:w-max` : 'hidden'"
          :image="image"
          :alt-text="title"
          :loading="loading"
          :image-url="titleLink"
          :width="width ? Math.round(width * props.mobileImageScale) : null"
          :height="height ? Math.round(height * props.mobileImageScale) : null"
          :max-width="maxWidth"
          :max-height="maxHeight"
          :allow-vertical-effect="allowVerticalEffect"
          :ratio="ratio"
          :quality="quality"
          :flat-quality="flatQuality"
          :sizes="sizes"
          :caption="caption"
          :caption-keep-on-top="captionKeepOnTop"
          role="presentation"
        />
        <!-- desktop, uses width and height props -->
        <v-image-with-caption
          class="card-image w-full"
          :class="{ [`hidden ${bp}:w-max ${bp}:block`]: responsive }"
          :image="image"
          :alt-text="title"
          :loading="loading"
          :image-url="titleLink"
          :width="width ? Math.round(width * props.mobileImageScale) : null"
          :height="height ? Math.round(height * props.mobileImageScale) : null"
          :max-width="maxWidth"
          :max-height="maxHeight"
          :allow-vertical-effect="allowVerticalEffect"
          :ratio="ratio"
          :quality="quality"
          :flat-quality="flatQuality"
          :sizes="sizes"
          :caption="caption"
          :caption-keep-on-top="captionKeepOnTop"
          role="presentation"
        />
      </div>
    </template>
    <div v-if="hasDetails" class="card-details">
      <div v-if="eyebrow" class="card-eyebrow type-body" v-html="eyebrow" />
      <div v-if="title" class="card-title" role="heading" aria-level="3">
        <template v-if="tags || sponsored">
          <v-tag
            v-for="(tag, index) in tags"
            :key="index"
            :name="tag.name"
            :slug="tag.slug"
          />
          <v-tag v-if="sponsored" name="sponsored" />
        </template>
        <v-flexible-link
          class="card-title-link"
          :class="{ disabled: !titleLink }"
          :to="titleLink"
        >
          <div class="h2" v-html="title"></div>
          <i
            v-if="icon"
            :class="`pi pi-${icon}`"
            role="img"
            :aria-label="icon + ' icon'"
          ></i>
          <slot name="customIcon"></slot>
        </v-flexible-link>
      </div>
      <p v-if="subtitle" class="card-subtitle">{{ subtitle }}</p>
      <div v-if="blurb" class="card-blurb" v-html="blurb"></div>

      <div v-if="$slots.default" class="card-slot">
        <slot />
      </div>
    </div>
  </div>
</template>

<style lang="scss">
.v-card {
  display: flex;
  align-items: flex-start;
  background: var(--surface-a);
  color: var(--text-color);
  box-shadow: var(--shadow);
  -webkit-box-shadow: var(--shadow);
  border-radius: var(--border-radius);
  width: 100%;
  max-width: 100%;
  gap: 1rem;
  a.disabled {
    pointer-events: none;
  }
  .card-image-link {
    img {
      cursor: pointer;
    }
  }
  .card-details {
    align-self: flex-start;
    flex: 1;
    overflow: hidden;
    .card-title {
      line-height: var(--font-size-8);
      .v-tag {
        float: left;
        margin-right: spacing(2);
        line-height: var(--font-size-8);
      }
      .card-title-link {
        display: inline-block;
        width: 100%;
        text-decoration: none;
        overflow-wrap: anywhere;
        word-break: break-word;
        .pi {
          font-size: var(--font-size-8);
          margin-left: spacing(2);
          margin-top: spacing(0.5);
          text-decoration: none;
          &:before {
            color: var(--link-button-color);
          }
        }
      }
    }
  }
  .card-slot {
    word-break: break-word;
    margin-top: spacing(5);
  }
  .card-slot,
  .card-slot p {
    font-size: var(--font-size-6);
    line-height: var(--font-size-9);
    @include media('<lg') {
      font-size: var(--font-size-5);
      line-height: var(--font-size-8);
    }
  }
}

.v-card.mod-vertical {
  flex-direction: column;
  .card-details {
    padding: spacing(0);
  }
}

.v-card.mod-vertical .card-image-wrapper {
  display: contents;
}

.v-card.mod-horizontal {
  @include media('<lg') {
    .image {
      width: 100px;
    }
  }
}

.v-card.mod-left {
  flex-direction: row-reverse;
}

.v-card.mod-large {
  @include media('<lg') {
    flex-direction: column;
  }
}
.v-card.mod-large .card-image-wrapper {
  flex-basis: 75%;
  @include media('<lg') {
    flex-basis: 100%;
    width: 100%;
    margin-bottom: spacing(5);
  }
}
.v-card.mod-large .card-image-wrapper .image-with-caption {
  width: 100% !important;
}
.v-card.mod-large .card-details {
  align-self: flex-end;
  @include media('<lg') {
    align-self: flex-start;
  }
}
</style>
