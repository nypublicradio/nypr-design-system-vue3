<script setup>
import { computed, useSlots, ref } from 'vue'
import VFlexibleLink from './VFlexibleLink.vue'
import VImage from './VImage.vue'

const props = defineProps({
  /**
   * a class assigned to the title
   */
  titleClass: {
    type: String,
    default: null,
  },
  /**
   * alt text for the image
   */
  alt: {
    type: String,
    default: '',
  },
  /**
   * image loading type (eager or lazy)
   */
  loading: {
    type: String,
    default: 'lazy',
  },
  /**
   * wagtail image id
   */
  imageSrc: {
    type: String,
    default: null,
  },
  /**
   * The desired height for image
   */
  height: {
    type: Number,
    default: null,
  },
  /**
   * The desired width for image
   */
  width: {
    type: Number,
    default: null,
  },
  /**
   * The desired min-width for image when the flexbox is responding
   */
  minWidth: {
    type: Number,
    default: null,
  },
  /**
   * at what percentage the image starts to scale down
   */
  imageFlexBasis: {
    type: String,
    default: '33.33333%',
  },
  /**
   * Subtitle text below the title
   */
  subtitle: {
    type: String,
    default: null,
  },
  /**
   * Blur of text below the subtitle that can be truncated
   */
  blurb: {
    type: String,
    default: null,
  },
  /**
   * nuber of lines to truncate the blurb
   */
  truncate: {
    type: Number,
    default: null,
  },
  /**
   * The title text
   */
  title: {
    type: String,
    default: null,
  },
  /**
   * link for the title and image
   */
  link: {
    type: String,
    default: null,
  },
  /**
   * max-height of the image used just for the vertical effect
   */
  maxHeight: {
    type: Number,
    default: Infinity,
  },
  /**
   * max-width of the image used just for the vertical effect
   */
  maxWidth: {
    type: Number,
    default: Infinity,
  },
  /**
   * reverse the flex direction
   */
  reverse: {
    type: Boolean,
    default: false,
  },
  /**
   * allow the vertical effect to happen for vertical images (images that are taller than they are wide)
   */
  allowVerticalEffect: {
    type: Boolean,
    default: false,
  },
  /**
   *  tint the grey blured background image */
  verticalBgColor: {
    type: String,
    default: null,
  },
  /**
   *  the opacity of the tint of the grey blured background image */
  verticalBgColorOpacity: {
    type: String,
    default: null,
  },
  /**
   *  ammount of blur for the blured background image */
  verticalBgBlur: {
    type: String,
    default: null,
  },
  /**
   * ratio of the image
   */
  ratio: {
    type: Array,
    default: () => [3, 2],
  },
  /**
   * ratio of the image in mobile breakpoint only
   */
  mobileRatio: {
    type: Array,
    default: () => null,
  },
  /**
   * compression quality of the iamge
   */
  quality: {
    type: Number,
    default: null,
  },
  /**
   * nuxt/image sizes attribute for responsive images (https://image.nuxtjs.org/components/nuxt-img/#sizes)
   */
  sizes: {
    type: String,
    default: null,
  },
  /**
   * to help with a11y
   */
  isDecorative: {
    type: Boolean,
    default: false,
  },
  /**
   * will put the image on top and 100% width
   */
  vertical: {
    type: Boolean,
    default: false,
  },
  /**
   * will put the image on top and 100% width on mobile breakpoint only
   */
  verticalMobile: {
    type: Boolean,
    default: false,
  },
})

const emit = defineEmits(['title-click', 'image-click'])

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

// css vars
const cssImageWidth = ref(props.width + 'px')
const cssVerticalOnMobileReverse = ref(
  props.reverse && props.verticalMobile ? 'column-reverse' : 'column'
)
const cssFlexDirection = ref(
  props.reverse
    ? `${props.vertical ? 'column' : 'row'}-reverse`
    : `${props.vertical ? 'column' : 'row'}`
)
const cssMobileRatio = ref(
  props.mobileRatio
    ? `${props.mobileRatio[0]} / ${props.mobileRatio[1]}`
    : `${props.ratio[0]} / ${props.ratio[1]}`
)
const cssImageFlexBasis = ref(
  props.imageFlexBasis ? props.imageFlexBasis : cssImageWidth.value
)
const cssImageMinWidth = ref(
  props.minWidth
    ? props.minWidth + 'px'
    : props.imageFlexBasis
    ? 'unset'
    : cssImageWidth.value
)
</script>

<template>
  <div class="v-card">
    <div
      class="v-card-base"
      :class="[
        { verticalMobile: props.verticalMobile },
        { vertical: props.vertical },
      ]"
    >
      <div
        v-if="props.imageSrc"
        class="card-image-holder"
        :class="[
          { 'is-vertical': props.vertical },
          { 'is-vertical-mobile': props.verticalMobile },
        ]"
      >
        <div class="slot slot-above-image">
          <slot name="aboveImage"></slot>
        </div>
        <VImage
          class="card-image"
          :src="props.imageSrc"
          :alt="props.isDecorative ? '' : props.alt"
          :loading="props.loading"
          :width="props.width"
          :height="props.height"
          :max-width="props.maxWidth"
          :max-height="props.maxHeight"
          :allow-vertical-effect="props.allowVerticalEffect"
          :ratio="props.ratio"
          :quality="props.quality || undefined"
          :sizes="props.sizes"
          :vertical-bg-color="props.verticalBgColor || undefined"
          :vertical-bg-color-opacity="props.verticalBgColorOpacity || undefined"
          :vertical-bg-blur="props.verticalBgBlur || undefined"
          role="presentation"
          :to="props.link"
          :is-decorative="props.isDecorative"
          @image-click="emit('image-click', props.imageSrc)"
        />
        <div class="slot slot-below-image">
          <slot name="belowImage"></slot>
        </div>
      </div>
      <div v-if="hasDetails" class="card-details">
        <div class="slot slot-above-title">
          <slot name="aboveTitle"></slot>
        </div>
        <div v-if="title" class="card-title" role="heading" aria-level="3">
          <div class="title-holder">
            <div>
              <div class="slot slot-before-title">
                <slot name="beforeTitle"></slot>
              </div>
              <v-flexible-link
                class="card-title-link"
                :class="[
                  { disabled: !props.link },
                  { customTitleClass: props.titleClass },
                  props.titleClass ? props.titleClass : '',
                ]"
                :to="props.link"
                @flexible-link-click="emit('title-click', props.link)"
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
        <div
          v-if="props.blurb"
          :class="props.truncate ? `truncate t${props.truncate}lines` : ''"
          class="card-blurb"
          v-html="props.blurb"
        ></div>
        <div class="slot slot-below-blurb">
          <slot name="belowBlurb"></slot>
        </div>
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
//$container-breakpoint-md: useBreakpointOrFallback('md', 768px);
$container-breakpoint-sm: useBreakpointOrFallback('sm', 576px);
//$container-breakpoint-xs: useBreakpointOrFallback('xs', 375px);

@mixin verticalStyles {
  .v-image {
    max-width: 100%;
  }
}

.v-card {
  container-type: inline-size;
  .v-card-base {
    display: flex;
    flex-direction: v-bind(cssFlexDirection);
    background-color: var(--v-card-bg-color);
    padding: var(--v-card-padding);
    border-radius: var(--v-card-border-radius);
    align-items: flex-start;
    justify-content: space-evenly;
    overflow: hidden;
    width: 100%;
    max-width: 100%;
    gap: 1rem;
    .card-image-holder {
      flex-basis: v-bind(cssImageFlexBasis) !important;
      flex-shrink: 0;
      max-width: v-bind(cssImageWidth);
      min-width: v-bind(cssImageMinWidth);
      border-radius: var(--v-card-image-radius);
      overflow: hidden;
      &.is-vertical {
        max-width: 100%;
        min-width: 100%;
      }
    }
    .card-details {
      display: flex;
      flex-direction: column;
      flex: auto;
      gap: 0.5rem;
      .title-holder {
        display: flex;
        flex-direction: row;
        align-items: flex-start;
        gap: 0.5rem;
        .slot-before-title {
          float: left;
          margin-right: 0.5rem;
        }
        .card-title-link:not(.customTitleClass) {
          text-decoration: var(--v-card-title-hover-text-decoration);
          color: var(--v-card-title-color);
          font-family: var(--v-card-title-font-family);
          font-size: var(--v-card-title-font-size);
          line-height: var(--v-card-title-line-height);
          font-weight: var(--v-card-title-font-weight);
          letter-spacing: var(--v-card-title-letter-spacing);
          text-decoration: var(--v-card-title-text-decoration);
          &:hover {
            color: var(--v-card-title-hover-color);
            .card-title-title {
              text-decoration: var(--v-card-title-hover-text-decoration);
            }
          }
        }
        .card-title-link.disabled {
          pointer-events: none;
        }
      }
    }
    &.vertical {
      @include verticalStyles;
    }
  }
  .slot:empty {
    display: none;
  }
}
@container (max-width: #{$container-breakpoint-sm}) {
  .v-card {
    .v-card-base {
      &.verticalMobile {
        @include verticalStyles;
        flex-direction: v-bind(cssVerticalOnMobileReverse) !important;
      }
      .card-image-holder {
        &.is-vertical-mobile {
          max-width: 100% !important;
          min-width: 100% !important;
        }
        .v-image {
          aspect-ratio: v-bind(cssMobileRatio) !important;
        }
      }
      .card-details {
        .title-holder {
          .card-title-link:not(.customTitleClass) {
            font-size: var(--v-card-title-mobile-font-size);
            line-height: var(--v-card-title-mobile-line-height);
          }
        }
      }
    }
  }
}
</style>
