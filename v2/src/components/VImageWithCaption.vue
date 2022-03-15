<script setup>
import { ref, computed, onBeforeMount, onMounted } from 'vue'
//import GothamistArrow from '../../../assets-shared/icons/gothamist/GothamistArrow'
import VSimpleResponsiveImage from './VSimpleResponsiveImage'
import VFlexibleLink from './VFlexibleLink'
import Button from 'primevue/button'

const props = defineProps({
  altText: {
    default: null,
    type: String,
  },
  caption: {
    default: null,
    type: String,
  },
  credit: {
    default: null,
    type: String,
  },
  creditUrl: {
    default: null,
    type: String,
  },
  description: {
    default: null,
    type: String,
  },
  height: {
    default: null,
    type: Number,
  },
  urlTemplate: {
    default: null,
    type: String,
  },
  variation: {
    default: null,
    type: String,
  },
  width: {
    default: null,
    type: Number,
  },
  widthInViewport: {
    default: null,
    type: Number,
  },
  widthInViewportTablet: {
    default: null,
    type: Number,
  },
  image: {
    default: null,
    type: String,
  },
  imageUrl: {
    default: null,
    type: String,
  },
  title: {
    default: null,
    type: String,
  },
  maxHeight: {
    default: null,
    type: Number,
  },
  maxWidth: {
    default: null,
    type: Number,
  },
  allowVerticalEffect: {
    default: false,
    type: Boolean,
  },
  /**
   * allow the user to click on the image to open a lightbox
   */
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
   * desired default image
   */
  defaultWidth: {
    type: Number,
    default: null,
  },
  /** * if specified, will use this image for the enlarged image for RAW images only */
  imageEnlarged: {
    type: String,
    default: null,
  },
})

const emit = defineEmits(['componentEvent'])

const refThisImg = ref(null)
let thisWidth = ref(null)
let responsive = ref(false)

let captionVisible = ref(false)

const gothamistVariation = computed(() => {
  return props.variation === 'gothamist'
})

const toggleCaption = () => {
  captionVisible.value = !captionVisible.value
  if (captionVisible.value) {
    emit('componentEvent', 'Expanded')
  } else {
    emit('componentEvent', 'Collapsed')
  }
}

onBeforeMount(() => {
  if (!props.width) {
    responsive.value = true
  }
})
onMounted(() => {
  // if it gets a width of refThisImg, it will use it, otherwise, it will use the browsers width as the default, unless if it specifically overwritten by the defaultWidth prop which is controlled by the breakpoints
  thisWidth.value =
    refThisImg.value.offsetWidth != 0
      ? refThisImg.value.offsetWidth
      : props.defaultWidth
      ? props.defaultWidth
      : window.innerWidth
})

const getCurrentDimensions = computed(() => {
  const hRatio = Number(props.ratio[0])
  const vRatio = Number(props.ratio[1])
  return {
    width: thisWidth.value,
    height: Math.round((thisWidth.value * vRatio) / hRatio),
  }
})
</script>

<template>
  <figure ref="refThisImg" class="image-with-caption" :class="variation">
    <div class="image-with-caption-wrapper">
      <div class="image-with-caption-image">
        <v-flexible-link
          class="image-with-caption-image-link"
          :class="!imageUrl && !allowPreview ? 'disabled' : ''"
          :to="imageUrl && !allowPreview ? imageUrl : null"
          target="_blank"
          aria-hidden="true"
          @click="
            imageUrl && !allowPreview ? emit('componentEvent', imageUrl) : null
          "
        >
          <v-simple-responsive-image
            v-if="(image && thisWidth) || width"
            :src="image"
            :alt="altText"
            :width="width ? width : getCurrentDimensions.width"
            :height="height ? height : getCurrentDimensions.height"
            :max-width="maxWidth || Infinity"
            :max-height="maxHeight || Infinity"
            :allow-vertical-effect="allowVerticalEffect"
            :allow-preview="allowPreview"
            :image-enlarged="imageEnlarged"
            :class="imageUrl && !allowPreview ? 'addPointer' : ''"
          />
        </v-flexible-link>
        <transition name="fade">
          <div
            v-if="caption && captionVisible"
            class="image-with-caption-caption"
          >
            <p>{{ caption }}</p>
          </div>
        </transition>
      </div>
      <div
        v-if="caption && !gothamistVariation"
        class="image-with-caption-icons"
        @click="toggleCaption"
      >
        <Button
          v-if="captionVisible"
          icon="pi pi-times p-button-icon"
          class="p-button-sm p-button-secondary p-button-text image-with-caption-icons-close"
        ></Button>
        <Button
          v-else
          icon="pi pi-info"
          class="p-button-sm image-with-caption-icons-info"
        ></Button>
      </div>
    </div>
    <figcaption v-if="credit || (caption && gothamistVariation)" class="mt-1">
      <!--       <gothamist-arrow v-if="caption && gothamistVariation" />
      <div class="image-with-caption-credit">
        <p v-if="caption && gothamistVariation" class="gothamist-caption">{{ caption }}</p>
      </div> -->
      <h4 v-if="title" class="image-with-caption-title">{{ title }}</h4>
      <p v-if="description" class="footer image-with-caption-description">
        {{ description }}
      </p>
      <v-flexible-link
        v-if="creditUrl"
        :to="creditUrl"
        rel="noopener"
        class="image-with-caption-credit-link"
      >
        <span class="footer">{{ credit }}</span>
      </v-flexible-link>
      <span v-else class="image-with-caption-credit-link footer">
        {{ credit }}
      </span>
    </figcaption>
  </figure>
</template>

<style lang="scss">
.image-with-caption {
  width: 100%;
}

.image-with-caption .image-with-caption-image,
.image-with-caption .image-with-caption-wrapper {
  position: relative;
}

.image-with-caption .simple-responsive-image-holder.addPointer {
  img {
    cursor: pointer;
  }
}

.image-with-caption .image-with-caption-image-link {
  .enlarge-button {
    text-decoration: none !important;
    span {
      text-decoration: none !important;
      color: var(--white) !important;
    }
  }
  &.disabled {
    pointer-events: none;
  }
}

.image-with-caption .image-with-caption-caption {
  position: absolute;
  bottom: 0;
  right: 0;
  left: 0;
  display: flex;
  justify-content: space-between;
  align-items: flex-end;
  padding: spacingXY(4, 2);
  overflow-y: auto;
  display: block;
  max-height: 100%;
  background: rgba(var(--primary-dark-color-rgb), 0.7);
  pointer-events: none;
  p {
    color: var(--white);
  }
}

.image-with-caption .image-with-caption-credit,
.image-with-caption .image-with-caption-caption p {
  margin-right: spacing(3.5);
}

.image-with-caption .image-with-caption-credit {
  margin-left: spacing(2);
  @media all and (min-width: $md) {
    margin-left: 0;
  }

  text-align: right;
}

// .image-with-caption.gothamist .image-with-caption-credit {
//   margin-top: spacing(1);
//   text-align: left;
//   display: flex;
//   flex-wrap: wrap;
//   align-items: baseline;
// }

// .image-with-caption.gothamist .image-with-caption-credit-link {
//   text-transform: uppercase;
//   line-height: 20px;

//   &:hover {
//     background-color: RGB(var(--color-reddish-orange));
//     color: RGB(var(--color-white));
//   }
// }

// .image-with-caption.gothamist .image-with-caption-credit span {
//   @include typeface(small, 1);
//   letter-spacing: 1px;
//   text-transform: uppercase;
// }

.image-with-caption .image-with-caption-icons {
  cursor: pointer;
  margin: 0 0 0 auto;
  position: absolute;
  bottom: spacing(2);
  right: spacing(2);
  z-index: 999;
  .p-button {
    background-color: rgba(var(--primary-color-rgb), 0.8);
    border-color: transparent;
  }
}

// keep X white on rollover
.image-with-caption
  .image-with-caption-icons
  .image-with-caption-icons-close
  .pi {
  color: var(--white);
}

.image-with-caption .info-icon,
.image-with-caption .o-close-icon {
  transition: var(--transition-duration);
  width: 28px;
  height: 28px;

  &:hover {
    opacity: var(--opacity-hover);
  }
}

.image-with-caption .o-close-icon {
  padding: 6px;
}

.image-with-caption .o-close-icon path,
.image-with-caption .info-icon-i {
  fill: var(--white);
}

.image-with-caption .info-icon-bg {
  fill: rgba(var(--black), 0.7);
}

// .image-with-caption .gothamist-caption {
//   display: flex;
//   align-items: center;
//   font-size: var(--font-size-4);
//   margin-right: spacing(2);
// }

// .image-with-caption .o-gothamist-arrow-icon {
//   width: 20px;
//   margin-top: -11px;
//   margin-right: spacing(2);
//   float: left;

//   path {
//     fill: RGB(var(--color-reddish-orange));
//   }
// }

.image-with-caption .image-with-caption-description {
  margin: 0 0 spacing(1) 0;
}
</style>
