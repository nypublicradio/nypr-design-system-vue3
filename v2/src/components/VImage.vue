<script setup>
import { ref, computed } from 'vue'
import VFlexibleLink from './VFlexibleLink.vue'
import ProgressSpinner from 'primevue/progressspinner'
import Dialog from 'primevue/dialog'
import Button from 'primevue/button'

const props = defineProps({
  /**
   * @nuxt/Image provider
   */
  provider: {
    type: String,
    default: 'wagtail',
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
  src: {
    type: String,
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
   * The desired height for image
   */
  height: {
    type: Number,
    default: null,
  },
  /**
   * Maximum width for the image. If you know the width of the original, full-sized image, use it here. It is needed for the vertical effect
   */
  maxWidth: {
    type: Number,
    default: Infinity,
  },
  /**
   * Maximum height for the image. If you know the height of the original, full-sized image, use it here. It is needed for the vertical effect
   */
  maxHeight: {
    type: Number,
    default: Infinity,
  },
  /**
   * nuxt/image sizes attribute for responsive images (https://image.nuxtjs.org/components/nuxt-img/#sizes)
   */
  sizes: {
    type: String,
    default: '',
  },
  /**
   * nuxt/image sizes attribute for responsive images (https://image.nuxtjs.org/components/nuxt-img/#sizes)
   * NOT WORKING
   */
  density: {
    type: String,
    default: 'x1 x2',
  },
  /**
   * compression quality of the iamge
   */
  quality: {
    type: Number,
    default: 80,
  },
  /**
   * wagtail modifiers  (https://image.nuxtjs.org/components/nuxt-img/#modifiers
   * ONLY WORKS WITH WAGTAIL PROVIDER and only supporting 'focusZoom'
   */
  modifiers: {
    type: Object,
    default: null,
  },
  /**
   * allow the vertical effect to happen for vertical images (images that are taller than they are wide)
   */
  allowVerticalEffect: {
    type: Boolean,
    default: false,
  },
  /**
   * tint the grey blured background image
   * */
  verticalBgColor: {
    type: String,
    default: '#f1f1f1',
  },
  /**
   *  the opacity of the tint of the grey blured background image
   */
  verticalBgColorOpacity: {
    type: String,
    default: '0.6',
  },
  /**
   *  ammount of blur for the blured background image */
  verticalBgBlur: {
    type: String,
    default: '3px',
  },
  /**
   * allow the user to click on the enlarge button to open a dialogue with full sized image */
  allowPreview: {
    type: Boolean,
    default: false,
  },
  /**
   * desired ratio of the image
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
const emit = defineEmits([
  'image-click',
  'image-enlarge-click',
  'image-load',
  'enlarge-image-load',
])

let isVertical = ref(
  props.allowVerticalEffect && props.maxHeight > props.maxWidth
)
let loadingEnlargedImage = ref(false)
let loadedEnlargedImage = ref(true)

const computedWidth = computed(() => {
  return isVertical.value
    ? Math.round(props.maxWidth / (props.maxHeight / props.height))
    : props.width
})

const enlarge = () => {
  loadingEnlargedImage.value = true
  loadedEnlargedImage.value = false
  emit('image-enlarge-click')
}

const enlargeLoad = (target) => {
  emit('enlarge-image-load', target)
  loadedEnlargedImage.value = true
}
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
      <div
        class="v-image-holder"
        :style="`aspect-ratio:${ratio[0]} / ${ratio[1]}`"
      >
        <div v-if="isVertical" class="bg">
          <nuxt-img
            :provider="props.provider"
            class="blurred-bg-image"
            :src="String(props.src)"
            :width="props.width"
            :height="props.height"
            quality="15"
            :alt="props.isDecorative ? '' : props.alt + '-blurred-bg'"
            :modifiers="props.modifiers"
            :loading="props.loading"
          />
        </div>
        <nuxt-img
          :provider="props.provider"
          class="image native-image"
          :class="isVertical ? 'is-vertical' : ''"
          :src="String(props.src)"
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
            header=" "
            :style="{ width: '95vw' }"
          >
            <nuxt-img
              :provider="props.provider"
              class="enlarged-image"
              :src="String(props.src)"
              style="width: 100%; height: auto"
              :alt="props.isDecorative ? '' : props.alt"
              loading="eager"
              :quality="100"
              :modifiers="props.modifiers"
              @load="enlargeLoad($event.target)"
            />
            <template #closeicon
              ><slot class="slot close-icon" name="closeicon"></slot
            ></template>
          </Dialog>
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
        </template>
      </div>
    </VFlexibleLink>
  </div>
</template>

<style lang="scss" scoped>
.v-image {
  line-height: 0;
  position: relative;
  overflow: hidden;
  .v-image-holder {
    position: relative;
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
        content: '';
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
