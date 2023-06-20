<script setup>
import { ref, computed, onBeforeMount } from 'vue'
import Image from 'primevue/image'
import VFlexibleLink from './VFlexibleLink.vue'
import ProgressSpinner from 'primevue/progressspinner'
import Button from 'primevue/button'

/** * Responsive image component, generates a srcset with multiple image sizes for different display densities. */

const props = defineProps({
  /* alt text prop */
  alt: {
    type: String,
    default: '',
  },
  /* loading image prop */
  loading: {
    type: String,
    default: 'lazy',
  },
  /** * An image url template string with tokens to replace for width and height
   * * e.g. "https://source.unsplash.com/random/%width%x%height%"
   * A plain image url here will also 'work' but you won't get additional sizes
   */
  src: {
    type: String,
    default: null,
  },
  /** * The desired width for the 1x sized image.
   * * this will also be added as an attribute to the image tag
   */
  width: {
    type: Number,
    default: null,
  },
  /** * The desired height for the 1x sized image. * this will also be added as an attribute to the image tag
   */
  height: {
    type: Number,
    default: null,
  },
  /** * Maximum width for the image. Generated sizes will be clipped to fit the max dimensions. * If you know the width of the original, full-sized image, use it here.
   */
  maxWidth: {
    type: Number,
    default: Infinity,
  },
  /** * Maximum height for the image. Generated sizes will be clipped to fit the max dimensions. * If you know the height of the original, full-sized image, use it here.
   */
  maxHeight: {
    type: Number,
    default: Infinity,
  },
  /** * Substring or regex within the urlto be replaced with width values. */
  widthToken: {
    type: [String, RegExp],
    default: '%width%',
  },
  /** * Substring or regex within the url to be replaced with height values. */
  heightToken: {
    type: [String, RegExp],
    default: '%height%',
  },
  /** * Substring or regex within the url to control jpg compression quality. */
  qualityToken: {
    type: [String, RegExp],
    default: '%quality%',
  },
  /** * List of display densities to generate sizes for in the srcset */
  sizes: {
    type: Array,
    default() {
      return [2, 3]
    },
  },
  /** * bool to NOT use the variable quality calc based on sizes */
  flatQuality: {
    type: Boolean,
    default: false,
  },
  /** * jpg compression quality */
  quality: {
    type: Number,
    default: 70,
  },
  /** * allow the vertical effect to happen */
  allowVerticalEffect: {
    type: Boolean,
    default: false,
  },
  /** * allow the user to click on the image to open a lightbox */
  allowPreview: {
    type: Boolean,
    default: false,
  },
  /**
   * desired ratio of the image if responsive
   */
  ratio: {
    type: Array,
    default: () => [3, 2],
  },
  /**
   * address to navigate to when the image is clicked
   */
  to: {
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
})
const formatPublisherImageUrl = (url) => {
  return url.replace('%s/%s/%s/%s', '%width%/%height%/c/%quality%')
}
const formatRawPublisherImageUrl = (url) => {
  return url.replace('%s/%s/%s/%s', 'raw')
}

const emit = defineEmits(['image-click', 'keypress', 'enlarge'])
const srcFormatted = formatPublisherImageUrl(props.src)
const srcRaw = formatRawPublisherImageUrl(props.src)

let isVertical = ref(false)
let loadingEnlargedImage = ref(false)

const computedWidth = computed(() => {
  return isVertical.value
    ? Math.round(props.maxWidth / (props.maxHeight / props.height))
    : props.width
})

const computedSrc = computed(() => {
  const template = srcFormatted

  return template
    ? template
        .replace(props.widthToken, computedWidth.value)
        .replace(props.heightToken, props.height)
        .replace(props.qualityToken, props.quality)
    : undefined
})

const computedSrcBg = computed(() => {
  const template = srcFormatted
  return template
    ? template
        .replace(props.widthToken, props.width)
        .replace(props.heightToken, props.height)
        .replace(props.qualityToken, 15)
    : undefined
})

const srcset = computed(() => {
  const template = srcFormatted
  if (template) {
    // If this is just a plain string with no tokens,
    // we don't need to generate a srcset
    if (
      template ===
      template.replace(props.widthToken, '').replace(props.heightToken, '')
    ) {
      return ''
    }
    let srcset = ''
    let lastImage = false
    for (const size of props.sizes) {
      /* continue if it is NOT the lastImage and the image has more pixels than its rendered area */
      if (!lastImage && props.maxWidth > computedWidth.value) {
        let width = Math.round(computedWidth.value * size)
        let height = Math.round(props.height * size)

        /* the image no longer has enough resolution to support the next srcset, use its maximum size and make it the last on the srcset list */
        if (width > props.maxWidth || height > props.maxHeight) {
          height = Math.round((height / width) * props.maxWidth)
          width = props.maxWidth
          lastImage = true
        }
        // if we are on the last size in the arraym set lastImage to true
        if (props.sizes.length - 1 === props.sizes.indexOf(size)) {
          lastImage = true
        }
        const url = template
          .replace(props.widthToken, width)
          .replace(props.heightToken, height)
          .replace(props.qualityToken, calcQuality(props.quality, size))
        srcset += `${url} ${size}x${!lastImage ? ',' : ''} `
      }
    }
    return srcset
  } else {
    return undefined
  }
})

onBeforeMount(() => {
  isVertical.value =
    props.allowVerticalEffect && props.maxHeight > props.maxWidth
})

const calcQuality = (quality, size) => {
  if (props.flatQuality) {
    return quality
  } else {
    const qual = size >= 2 ? quality - Math.round(size * 5) : quality
    return qual >= 15 ? qual : 15
  }
}

const enlarge = () => {
  loadingEnlargedImage.value = true
  const img = document.getElementsByClassName('p-image-preview')
  img[0].setAttribute('alt', props.alt)
  img[0].setAttribute('src', srcRaw)
}

const closeEnlarge = () => {
  loadingEnlargedImage.value = false
}
</script>

<template>
  <div class="v-image-publisher">
    <VFlexibleLink
      raw
      :to="props.to"
      :aria-hidden="props.isDecorative ? true : false"
      :tabindex="props.isDecorative ? -1 : 0"
      style="width: auto"
      @click="props.to ? emit('image-click', props.to) : null"
    >
      <div
        class="v-image-publisher-holder"
        :style="`aspect-ratio:${ratio[0]} / ${ratio[1]}`"
      >
        <div v-if="isVertical" class="bg">
          <img
            :src="computedSrcBg"
            :width="width"
            :height="height"
            :alt="props.isDecorative ? '' : props.alt + '-blurred-bg'"
            :loading="loading"
          />
        </div>
        <template v-if="allowPreview">
          <Image
            class="image prime-image"
            :class="isVertical ? 'is-vertical' : ''"
            image-class="prime-img-class"
            image-style="width: 100%; height: auto;"
            :srcset="srcset"
            :src="computedSrc"
            :width="computedWidth"
            :height="height"
            :style="[isVertical ? `width:${computedWidth}px;` : '']"
            :alt="props.isDecorative ? '' : props.alt"
            :preview="allowPreview"
            :loading="loading"
            @show="enlarge"
            @hide="closeEnlarge"
            @keypress="emit('keypress', $event.target.value)"
          >
            <template v-if="allowPreview" #indicatoricon>
              <ClientOnly>
                <Button
                  icon="pi pi-clone"
                  class="p-button-sm enlarge-button"
                  aria-label="Enlarge Image"
                  @click.prevent="emit('enlarge', $event.target.value)"
                ></Button>
              </ClientOnly>
            </template>
          </Image>
          <div v-if="loadingEnlargedImage">
            <Teleport to=".p-component-overlay">
              <ProgressSpinner
                v-if="loadingEnlargedImage"
                style="
                  z-index: -1;
                  position: fixed;
                  top: 0;
                  bottom: 0;
                  left: 0;
                  right: 0;
                  margin: auto;
                "
                stroke-width="6"
              />
            </Teleport>
          </div>
        </template>
        <img
          v-else
          class="image native-image prime-img-class"
          :class="isVertical ? 'is-vertical' : ''"
          :srcset="srcset"
          :src="computedSrc"
          :width="computedWidth"
          :height="height"
          :style="[isVertical ? `width:auto;` : '']"
          :alt="props.isDecorative ? '' : props.alt"
          :loading="loading"
          @keypress="emit('keypress', $event.target.value)"
        />
      </div>
    </VFlexibleLink>
  </div>
</template>

<style lang="scss">
.v-image-publisher {
  .v-image-publisher-holder {
    line-height: 0;
    position: relative;
    overflow: hidden;
    .image {
      position: relative;
      width: 100%;
      height: 100%;
      top: 0;
      object-fit: cover;
      &.is-vertical {
        margin: auto;
        display: block;
      }
      .p-image-preview-indicator {
        // remove the default indicator and just use the button
        background-color: transparent !important;
        opacity: 1;
        width: 0;
        height: 0;
        border: none;
      }
      img {
        cursor: pointer;
      }
    }
    .enlarge-button {
      background-color: rgba(var(--primary-color-rgb), 0.8);
      border-color: transparent;
      position: absolute;
      top: var(--v-image-button-padding);
      left: var(--v-image-button-padding);
    }
    .bg {
      pointer-events: none;
      width: 100%;
      height: 100%;
      position: absolute;
      top: 0;
      left: 0;
      overflow: hidden;
      &:after {
        content: '';
        background-color: RGB(var(--surface-900));
        width: 100%;
        height: 100%;
        position: absolute;
        top: 0;
        left: 0;
        opacity: 0.7;
      }
      img {
        width: 100%;
        filter: blur(3px) grayscale(100%);
        object-fit: cover;
        height: inherit;
      }
    }
  }
  .p-component-overlay {
    overflow: hidden;
    .p-image-toolbar {
      z-index: 1;
    }
    .p-progress-spinner {
      overflow: hidden;
    }
  }
}
</style>
