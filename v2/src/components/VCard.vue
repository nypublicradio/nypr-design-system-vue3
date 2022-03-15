<script setup>
import { computed, useSlots } from 'vue'
import breakpoint from '../../../src/assets/library/breakpoints.module.scss'
import VTag from './VTag'
import VFlexibleLink from './VFlexibleLink'
import VImageWithCaption from './VImageWithCaption'

const props = defineProps({
  alt: {
    type: String,
    default: null,
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
})
const slots = useSlots()

const hasDetails = computed(() => {
  return !!props.title || !!props.subtitle || !!slots.default
})

const getMobileImageScale = computed(() => {
  // console.log('window.innerWidth = ', window.innerWidth)
  // console.log('breakpoint[props.bp] = ', breakpoint[props.bp])
  return window.innerWidth < breakpoint[props.bp] ? props.mobileImageScale : 1
})
</script>

<template>
  <div class="v-card" :class="{ [`flex-column ${bp}:flex-row`]: responsive }">
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
          :image-url="titleLink"
          :max-width="maxWidth"
          :max-height="maxHeight"
          :allow-vertical-effect="allowVerticalEffect"
          :ratio="ratio"
          :default-width="Number(breakpoint[props.bp])"
          role="presentation"
        />
        <!-- desktop, uses width and height props -->
        <v-image-with-caption
          class="card-image w-full"
          :class="{ [`hidden ${bp}:w-max ${bp}:block`]: responsive }"
          :image="image"
          :width="Math.round(width * getMobileImageScale)"
          :height="Math.round(height * getMobileImageScale)"
          :alt-text="title"
          role="presentation"
          :image-url="titleLink"
        />
      </div>
    </template>
    <div v-if="hasDetails" class="card-details">
      <div v-if="tags || sponsored" class="card-tags">
        <v-tag
          v-for="(tag, index) in tags"
          :key="index"
          :name="tag.name"
          :slug="tag.slug"
        />
        <v-tag v-if="sponsored" name="sponsored" />
      </div>
      <div v-if="title" class="card-title" role="heading" aria-level="3">
        <v-flexible-link
          class="card-title-link"
          :class="{ disabled: !titleLink }"
          :to="titleLink"
        >
          <h2 v-html="title"></h2>
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
  overflow: hidden;
  width: 100%;
  max-width: 100%;
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
    padding: spacing(3) spacing(6) spacing(6) spacing(3);
    overflow: hidden;
    .card-tags {
      display: flex;
      flex-direction: row;
      flex-wrap: wrap;
      gap: spacing(2);
      margin-bottom: spacing(2);
    }
    .card-title {
      .card-title-link {
        display: flex;
        justify-content: space-between;
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
}

// .card.mod-large .o-gallery-icon {
//   width: 30px;
//   height: 30px;
//   margin-bottom: 3px;
// }

// .card-subtitle {
//   font-family: var(--font-family-subheader);
//   font-size: var(--font-size-4);
// }

// .card.mod-large {
//   --card-image-width: 360px;
//   --card-image-height: 306px;
// }

// .card.mod-large .card-title {
//   font-size: var(--font-size-10);
// }

// .card.mod-large .card-subtitle {
//   font-size: var(--font-size-7);
// }

// .card.mod-large:not(.mod-vertical) .card-image-wrapper,
// .card.mod-large:not(.mod-vertical) .card-image .image {
//   @include media("<medium") {
//     min-width: 100px;
//     width: 100px;
//     height: 100px;
//   }
// }
</style>
