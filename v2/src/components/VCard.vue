<script setup>
import { computed, useSlots, ref } from 'vue'
import breakpoint from '../../../src/assets/library/breakpoints.module.scss'
import VFlexibleLink from './VFlexibleLink.vue'
import VImage from './VImage.vue'

const props = defineProps({
  titleClass: {
    type: String,
    default: null,
  },
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
  minWidth: {
    type: Number,
    default: null,
  },
  baseClass: {
    type: String,
    default: null,
  },
  imageFlexBasis: {
    type: String,
    default: '33.33333%',
  },
  subtitle: {
    type: String,
    default: null,
  },
  blurb: {
    type: String,
    default: null,
  },
  truncate: {
    type: Number,
    default: null,
  },
  title: {
    type: String,
    default: null,
  },
  link: {
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
  creditJustifyContent: {
    default: 'flex-start',
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
  reverse: {
    type: Boolean,
    default: false,
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
  /**
   * ratio (in landscape)
   */
  mobileRatio: {
    type: Array,
    default: () => null,
  },
  /** * jpg compression quality */
  quality: {
    type: Number,
    default: 70,
  },
  sizes: {
    type: String,
    default: null,
  },
  isDecorative: {
    type: Boolean,
    default: false,
  },
  vertical: {
    type: Boolean,
    default: false,
  },
  verticalMobile: {
    type: Boolean,
    default: false,
  },
})

const emit = defineEmits(['title-click', 'image-click', 'credit-click'])

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
        { baseClass: props.baseClass },
      ]"
    >
      <!-- :image-url="props.link" -->
      <!-- :is-decorative="props.isDecorative" -->
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
        <VFlexibleLink
          :to="props.link"
          raw
          :aria-hidden="true"
          :tabindex="-1"
          @click="emit('image-click', e)"
        >
          <VImage
            class="card-image"
            :src="props.imageSrc"
            :alt="props.alt"
            :loading="props.loading"
            :width="props.width"
            :height="props.height"
            :max-width="props.maxWidth"
            :max-height="props.maxHeight"
            :allow-vertical-effect="props.allowVerticalEffect"
            :ratio="props.ratio"
            :quality="props.quality"
            :sizes="props.sizes"
            role="presentation"
          />
        </VFlexibleLink>
        <div class="slot slot-below-image">
          <slot name="belowImage"></slot>
        </div>
      </div>
      <!-- @image-click="(e) => emit('image-click', e)"
        @credit-click="(e) => emit('credit-click', e)"
      :caption="props.caption" :caption-keep-on-top="props.captionKeepOnTop"
      :credit="props.credit" :credit-url="props.creditUrl"
      :credit-justify-content="creditJustifyContent" -->
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
                @emit-flexible-link="emit('title-click', props.link)"
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
$container-breakpoint-md: useBreakpointOrFallback('md', 768px);
$container-breakpoint-sm: useBreakpointOrFallback('sm', 576px);
$container-breakpoint-xs: useBreakpointOrFallback('xs', 375px);

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
    border-radius: var(--v-card-border-radius);
    align-items: flex-start;
    justify-content: space-evenly;
    overflow: hidden;
    width: 100%;
    max-width: 100%;
    gap: 1rem;
    .card-image-holder {
      flex-basis: v-bind(cssImageFlexBasis);
      flex-shrink: 0;
      max-width: v-bind(cssImageWidth);
      min-width: v-bind(cssImageMinWidth);
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
      div:empty {
        display: none;
      }
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
}
@container (max-width: #{$container-breakpoint-sm}) {
  .v-card {
    .v-card-base {
      &.verticalMobile {
        @include verticalStyles;
        flex-direction: v-bind(cssVerticalOnMobileReverse) !important;
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
<style lang="scss">
$container-breakpoint-md: useBreakpointOrFallback('md', 768px);
$container-breakpoint-sm: useBreakpointOrFallback('sm', 576px);
$container-breakpoint-xs: useBreakpointOrFallback('xs', 375px);
@container (max-width: #{$container-breakpoint-sm}) {
  .v-card {
    .card-image-holder {
      &.is-vertical-mobile {
        max-width: 100% !important;
        min-width: 100% !important;
      }
      .v-image {
        aspect-ratio: v-bind(cssMobileRatio) !important;
      }
    }
  }
}
</style>
