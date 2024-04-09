<script setup>
import VFlexibleLink from "./VFlexibleLink.vue"
import Button from "primevue/button"
import Dialog from "primevue/dialog"
import ProgressSpinner from "primevue/progressspinner"
import { computed, ref } from "vue"

const props = defineProps({
  /**
   * allow the user to click on the enlarge button to open a dialogue with full sized image */
  allowPreview: {
    default: false,
    type: Boolean,
  },
  /**
   * allow the vertical effect to happen for vertical images (images that are taller than they are wide)
   */
  allowVerticalEffect: {
    default: false,
    type: Boolean,
  },
  /**
   * alt text for the image
   */
  alt: {
    default: "",
    type: String,
  },
  /**
   * nuxt/image sizes attribute for responsive images (https://image.nuxtjs.org/components/nuxt-img/#sizes)
   * NOT WORKING
   */
  density: {
    default: "x1 x2",
    type: String,
  },
  /**
   * image format (webp, avif, jpeg, jpg, png, gif and svg)
   */
  format: {
    default: "webp",
    type: String,
  },
  /**
   * The desired height for image
   */
  height: {
    default: null,
    type: Number,
  },
  /**
   * to help with a11y
   */
  isDecorative: {
    default: false,
    type: Boolean,
  },
  /**
   * image loading type (eager or lazy)
   */
  loading: {
    default: "lazy",
    type: String,
  },
  /**
   * Maximum height for the image. If you know the height of the original, full-sized image, use it here. It is needed for the vertical effect
   */
  maxHeight: {
    default: Infinity,
    type: Number,
  },
  /**
   * Maximum width for the image. If you know the width of the original, full-sized image, use it here. It is needed for the vertical effect
   */
  maxWidth: {
    default: Infinity,
    type: Number,
  },
  /**
   * wagtail modifiers  (https://image.nuxtjs.org/components/nuxt-img/#modifiers
   * ONLY WORKS WITH WAGTAIL PROVIDER and only supporting 'focusZoom'
   */
  modifiers: {
    default: null,
    type: Object,
  },
  /**
   * @nuxt/Image provider
   */
  provider: {
    default: "npr",
    type: String,
  },
  /**
   * compression quality of the iamge
   */
  quality: {
    default: 80,
    type: Number,
  },
  /**
   * desired ratio of the image
   */
  ratio: {
    default: () => [16, 9],
    type: Array,
  },
  /**
   * nuxt/image sizes attribute for responsive images (https://image.nuxtjs.org/components/nuxt-img/#sizes)
   */
  sizes: {
    default: "",
    type: String,
  },
  /**
   * NPR image url wide
   */
  src: {
    default: null,
    type: String,
  },
  /**
   * NPR image url square
   */
  srcSq: {
    default: null,
    type: String,
  },
  /**
   * address to navigate to when the image is clicked
   */
  to: {
    default: null,
    type: String,
  },
  /**
   *  ammount of blur for the blured background image */
  verticalBgBlur: {
    default: "3px",
    type: String,
  },
  /**
   * tint the grey blured background image
   * */
  verticalBgColor: {
    default: "#f1f1f1",
    type: String,
  },
  /**
   *  the opacity of the tint of the grey blured background image
   */
  verticalBgColorOpacity: {
    default: "0.6",
    type: String,
  },
  /**
   * The desired width for image
   */
  width: {
    default: null,
    type: Number,
  },
})
const emit = defineEmits([
  "image-click",
  "image-enlarge-click",
  "image-load",
  "enlarge-image-load",
])

const theSrc = computed(() => {
  let src = props.src
  if (props.ratio[0] === props.ratio[1]) {
    src = props.srcSq
  }
  return src
    .replace("{width}", props.width)
    .replace("{quality}", props.quality)
    .replace("{format}", props.format)
})

const isVertical = ref(props.allowVerticalEffect && props.maxHeight > props.maxWidth)
const loadingEnlargedImage = ref(false)
const loadedEnlargedImage = ref(true)

const computedWidth = computed(() => {
  return isVertical.value
    ? Math.round(props.maxWidth / (props.maxHeight / props.height))
    : props.width
})
const computedEnlargeWidth = computed(() => {
  const modalFramePaddingOffset = 84
  return window.innerWidth * window.devicePixelRatio > props.maxWidth
    ? props.maxWidth
    : (window.innerWidth - modalFramePaddingOffset) * window.devicePixelRatio
})
const computedEnlargeHeight = computed(() => {
  const originalWidth = props.maxWidth
  const originalHeight = props.maxHeight
  const newWidth = computedEnlargeWidth.value / window.devicePixelRatio
  const originalRatio = originalWidth / originalHeight

  return Math.round((newWidth / originalRatio) * window.devicePixelRatio)
})
// method to handle the click on the enlarge button and its loading states
const enlarge = () => {
  loadingEnlargedImage.value = true
  loadedEnlargedImage.value = false
  emit("image-enlarge-click")
}
// method called when the imamge is loaded
const enlargeLoad = (target) => {
  emit("enlarge-image-load", target)
  loadedEnlargedImage.value = true
}

const handleProvider = computed(() => {
  return isNaN(props.src) ? null : props.provider
})
</script>

<template>
  <div class="v-image">
    <VFlexibleLink
      raw
      :to="props.to"
      :aria-hidden="props.isDecorative ? true : false"
      :tabindex="props.isDecorative ? -1 : 0"
      style="width: auto"
      @click="props.to ? emit('image-click', props.to) : null"
    >
      <div class="v-image-holder" :style="`aspect-ratio:${ratio[0]} / ${ratio[1]}`">
        <div v-if="isVertical" class="bg">
          <nuxt-img
            :format="props.format"
            :provider="handleProvider"
            class="blurred-bg-image"
            :src="theSrc"
            :width="props.width"
            :height="props.height"
            quality="15"
            :alt="props.isDecorative ? '' : props.alt + '-blurred-bg'"
            :modifiers="props.modifiers"
            :loading="props.loading"
          />
        </div>
        <nuxt-img
          :format="props.format"
          :provider="handleProvider"
          class="image native-image"
          :class="isVertical ? 'is-vertical' : ''"
          :src="theSrc"
          :width="computedWidth"
          :height="props.height"
          :sizes="props.sizes"
          :densities="props.density"
          :style="[
            isVertical
              ? `aspect-ratio:${props.maxWidth} / ${props.maxHeight}; object-fit: contain;`
              : '',
          ]"
          :alt="props.isDecorative ? '' : props.alt"
          :quality="String(props.quality)"
          :loading="loading"
          :modifiers="props.modifiers"
          @load="emit('image-load', $event.target)"
        />
        <slot class="slot caption" name="caption"></slot>
        <slot class="slot gallery" name="gallery"></slot>
        <template v-if="allowPreview">
          <div class="enlarge-button-holder">
            <slot
              class="slot enlarge-button"
              name="enlargeButton"
              :enlarge-func="enlarge"
            >
              <Button
                icon="pi pi-clone"
                class="enlarge-button"
                aria-label="Enlarge Image"
                @click.prevent="enlarge"
              ></Button>
            </slot>
          </div>
          <Dialog
            v-model:visible="loadingEnlargedImage"
            modal
            dismissable-mask
            :draggable="false"
            header=" "
            :style="{ width: '95vw' }"
          >
            <nuxt-img
              :format="props.format"
              :provider="handleProvider"
              class="enlarged-image"
              :src="theSrc"
              style="width: 100%; height: auto"
              :alt="props.isDecorative ? '' : props.alt"
              loading="eager"
              :quality="70"
              :width="computedEnlargeWidth"
              :height="computedEnlargeHeight"
              :modifiers="props.modifiers"
              @load="enlargeLoad($event.target)"
            />
            <template #closeicon
              ><slot class="slot close-icon" name="closeicon"></slot
            ></template>
          </Dialog>
          <Teleport to="body">
            <ProgressSpinner
              v-if="loadingEnlargedImage && !loadedEnlargedImage"
              style="
                z-index: 1102;
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
        </template>
      </div>
    </VFlexibleLink>
    <slot class="slot below-image" name="belowImage"></slot>
  </div>
</template>

<style lang="scss" scoped>
.v-image {
  line-height: 0;
  position: relative;

  .v-image-holder {
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
      img {
        cursor: default;
      }
    }
    .enlarge-button-holder {
      position: absolute;
      top: var(--v-image-button-padding);
      left: var(--v-image-button-padding);
      .enlarge-button {
        background-color: rgba(var(--primary-color-rgb), 0.8);
        border-color: transparent;
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
        content: "";
        background-color: v-bind(verticalBgColor);
        width: 100%;
        height: 100%;
        position: absolute;
        top: 0;
        left: 0;
        opacity: v-bind(verticalBgColorOpacity);
      }
      img {
        width: 100%;
        filter: blur(v-bind(verticalBgBlur)) grayscale(100%);
        object-fit: cover;
        height: inherit;
      }
    }
  }
  .slot:empty {
    display: none;
  }
}
</style>
