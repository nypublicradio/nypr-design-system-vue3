<script setup>
import { ref, computed } from 'vue'
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
   * compression quality of the iamge
   */
  quality: {
    type: Number,
    default: 70,
  },
  /**
   * wagtail modifiers  (https://image.nuxtjs.org/components/nuxt-img/#modifiers*/
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
})
const emit = defineEmits(['click', 'keypress', 'load', 'enlargeLoad'])

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
}

const enlargeLoad = (target) => {
  emit('enlargeLoad', target)
  loadedEnlargedImage.value = true
}
</script>

<template>
  <div class="v-image" :style="`aspect-ratio:${ratio[0]} / ${ratio[1]}`">
    <div v-if="isVertical" class="bg">
      <nuxt-img
        :provider="props.provider"
        :src="props.src"
        :width="props.width"
        :height="props.height"
        quality="15"
        :alt="alt"
        :modifiers="props.modifiers"
        :loading="props.loading"
      />
    </div>
    <nuxt-img
      :provider="props.provider"
      class="image native-image"
      :class="isVertical ? 'is-vertical' : ''"
      :src="props.src"
      :width="computedWidth"
      :height="props.height"
      :sizes="props.sizes"
      :style="[
        isVertical
          ? `aspect-ratio:${props.maxWidth} / ${props.maxHeight}; object-fit: contain;`
          : '',
      ]"
      :alt="alt"
      :quality="String(props.quality)"
      :loading="loading"
      :modifiers="props.modifiers"
      @click="emit('click', $event.target.value)"
      @keypress="emit('keypress', $event.target.value)"
      @load="emit('load', $event.target)"
    />
    <template v-if="allowPreview">
      <div class="enlarge-button-holder">
        <slot name="enlargeButton" :enlargeFunc="enlarge">
          <Button
            icon="pi pi-clone"
            class="enlarge-button"
            aria-label="Enlarge Image"
            @click="enlarge"
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
          :src="props.src"
          style="width: 100%; height: auto"
          :alt="alt"
          loading="eager"
          :quality="100"
          :modifiers="props.modifiers"
          @load="enlargeLoad($event.target)"
        />
        <template #closeicon><slot name="closeicon"></slot></template>
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
</template>

<style lang="scss" scoped>
.v-image {
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
    img {
      cursor: default;
    }
  }
  .enlarge-button-holder {
    position: absolute;
    top: 8px;
    left: 8px;
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
</style>
