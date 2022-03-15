<script setup>
import { ref, computed, onBeforeMount } from 'vue'
import Image from 'primevue/image'
import ProgressSpinner from 'primevue/progressspinner'
import Button from 'primevue/button'
/** * Responsive image component, generates a srcset with multiple image sizes for different display densities. */

const props = defineProps({
  /* alt text prop */
  alt: {
    type: String,
    default: null,
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
      return [2, 3, 3.5, 4]
    },
  },
  /** * jpg compression quality */
  quality: {
    type: Number,
    default: 80,
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
  /** * if specified, will use this image for the enlarged image for RAW images only */
  imageEnlarged: {
    type: String,
    default: null,
  },
})
const emit = defineEmits(['click', 'keypress'])

let isVertical = ref(false)
let loadingEnlargedImage = ref(false)
let rawImage = true

const computedWidth = computed(() => {
  return isVertical.value
    ? Math.round(props.maxWidth / (props.maxHeight / props.height))
    : props.width
})

const computedSrc = computed(() => {
  const template = props.src

  // detect if src has tokens or just a regular url
  const tokensArray = [props.widthToken, props.heightToken, props.qualityToken]
  for (var value of tokensArray) {
    if (template.includes(value)) {
      rawImage = false
      break
    }
  }

  return template
    ? template
        .replace(props.widthToken, computedWidth.value)
        .replace(props.heightToken, props.height)
        .replace(props.qualityToken, props.quality)
    : undefined
})
const computedSrcBg = computed(() => {
  const template = props.src
  return template
    ? template
        .replace(props.widthToken, props.width)
        .replace(props.heightToken, props.height)
        .replace(props.qualityToken, 15)
    : undefined
})

const srcset = computed(() => {
  const template = props.src
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

        const url = template
          .replace(props.widthToken, width)
          .replace(props.heightToken, height)
          .replace(props.qualityToken, calcQuality(props.quality, size))
        srcset += `${url} ${size}x${
          size < props.sizes.length && !lastImage ? ',' : ''
        } `
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
  return size >= 2 ? quality - Math.round(size * 5) : quality
}

const enlarge = () => {
  loadingEnlargedImage.value = true
  const img = document.getElementsByClassName('p-image-preview')
  if (rawImage) {
    img[0].setAttribute(
      'src',
      props.imageEnlarged ? props.imageEnlarged : props.src
    )
  } else {
    const sizeList = srcset.value.split(',')
    const lastSize = sizeList[sizeList.length - 1]
    const biggestSize = lastSize.slice(0, -3)
    img[0].setAttribute('src', biggestSize)
  }
}

const closeEnlarge = () => {
  loadingEnlargedImage.value = false
}
</script>

<template>
  <div class="simple-responsive-image-holder">
    <div v-if="isVertical" class="bg">
      <img
        :src="computedSrcBg"
        :width="width"
        :height="height"
        :alt="alt"
        loading="lazy"
      />
    </div>
    <client-only v-if="allowPreview">
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
        :alt="alt"
        :preview="allowPreview"
        loading="lazy"
        @show="enlarge"
        @hide="closeEnlarge"
        @click="emit('click', $event.target.value)"
        @keypress="emit('keypress', $event.target.value)"
      >
        <template v-if="allowPreview" #indicator>
          <Button
            icon="pi pi-arrows-v"
            class="p-button-sm enlarge-button"
          ></Button>
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
    </client-only>
    <img
      v-else
      class="image native-image prime-img-class"
      :class="isVertical ? 'is-vertical' : ''"
      :srcset="srcset"
      :src="computedSrc"
      :width="computedWidth"
      :height="height"
      :style="[isVertical ? `width:${computedWidth}px;` : '']"
      :alt="alt"
      loading="lazy"
      @click="emit('click', $event.target.value)"
      @keypress="emit('keypress', $event.target.value)"
    />
  </div>
</template>

<style lang="scss">
.simple-responsive-image-holder {
  line-height: 0;
  position: relative;
  .image {
    position: relative;
    width: 100%;
    height: auto;
    top: 0;

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
    }
    img {
      cursor: default;
    }
  }
  .enlarge-button {
    background-color: rgba(var(--primary-color-rgb), 0.8);
    border-color: transparent;
    // pointer-events: none;
    position: absolute;
    top: 8px;
    left: 8px;
    .pi {
      transform: rotate(45deg);
    }
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
</style>
