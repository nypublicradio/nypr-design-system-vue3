<script setup>
import VFlexibleLink from './VFlexibleLink.vue'
import VImage from './VImage.vue'
import VShareTools from './VShareTools.vue'
import VShareToolsItem from './VShareToolsItem.vue'
import { computed, ref } from 'vue'

const props = defineProps({
  /**
   * fflex-align for the image and content
   */
  alignItems: {
    default: 'flex-start',
    type: String,
  },
  /**
   * alt text for the image
   */
  alt: {
    default: 'Profile Image',
    type: String,
  },
  /**
   * show/hide CTA button
   */
  ctaText: {
    default: 'Read more',
    type: String,
  },
  /**
   * flex-direction for the image and content
   */
  flexDirection: {
    default: 'row',
    type: String,
  },
  /**
   * the path to the fallback image
   */
  imageFallbackPath: {
    default: null,
    type: String,
  },
  /**
   * at what percentage the image starts to scale down
   */
  imageFlexBasis: {
    default: '20%',
    type: String,
  },
  /**
   * desired ratio of the image
   */
  imageRatio: {
    default: () => [1, 1],
    type: Array,
  },
  /**
   * The desired width & height for image
   */
  imageSize: {
    default: 100,
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
   * when true, only the image will be displayed... and work properly
   */
  justImage: {
    default: false,
    type: Boolean,
  },
  /**
   * image loading type (eager or lazy)
   */
  loading: {
    default: 'lazy',
    type: String,
  },
  /**
   * The desired min-width for image when the flexbox is responding
   */
  minWidth: {
    default: null,
    type: Number,
  },
  /**
   * the prefix before the name
   */
  namePrefix: {
    default: null,
    type: String,
  },
  /**
   * API responseof the user/author's data
   */
  profileData: {
    default: null,
    type: Object,
  },
  /**
   * border radius for the image
   */
  radius: {
    default: '50%',
    type: String,
  },
  /**
   * show/hide bio
   */
  showBio: {
    default: true,
    type: Boolean,
  },
  /**
   * show/hide CTA button
   */
  showCta: {
    default: true,
    type: Boolean,
  },
  /**
   * show/hide name
   */
  showName: {
    default: true,
    type: Boolean,
  },
  /**
   * show/hide social icons
   */
  showSocial: {
    default: true,
    type: Boolean,
  },
  /**
   * nuxt/image sizes attribute for responsive images (https://image.nuxtjs.org/components/nuxt-img/#sizes)
   */
  sizes: {
    default: null,
    type: String,
  },
  /**
   * flags the profile as sponsored
   */
  sponsored: {
    default: false,
    type: Boolean,
  },
  /**
   * snumber of lines to truncate the bio
   */
  truncate: {
    default: null,
    type: Number,
  },
  /**
   * vertical layout
   */
  vertical: {
    default: false,
    type: Boolean,
  },
  /**
   * vertical layout on mobile only
   */
  verticalMobile: {
    default: false,
    type: Boolean,
  },
})

const emit = defineEmits([
  'image-click',
  'name-click',
  'cta-click',
  'social-share-click',
  'social-follow-click',
])

const profile = ref(props.profileData)

const updatedSocialArr = ref([])
const email = { profileUrl: String(profile.value?.email), service: 'email' }
const website = {
  profileUrl: profile.value?.website,
  service: 'site',
}

// push original social array into new updatedSocialArr if it exist
if (profile.value?.socialMediaProfile) {
  updatedSocialArr.value.push(...profile.value?.socialMediaProfile)
}
// push website into new updatedSocialArr if it exist
if (profile.value?.website) {
  updatedSocialArr.value.push(website)
}
// push email into new updatedSocialArr if it exist
if (profile.value?.email) {
  updatedSocialArr.value.push(email)
}
// push phone numbers into new updatedSocialArr if it exist
if (profile.value?.phone_numbers) {
  profile.value?.phone_numbers.map((phone) => {
    updatedSocialArr.value.push({
      profileUrl: String(phone.phone_number),
      service: 'phone',
    })
  })
}

const profileLink = ref(
  props.sponsored ? profile.value?.link : profile.value?.url
)

const accountNameFromUrl = (url) => {
  return url
    ?.split('/')
    .filter((str) => str !== '')
    .slice(-1)[0]
}

const isWagtailImage = computed(() => {
  return profile.value.photoID && !props.sponsored && !props.imageFallbackPath
})
const getImageSrc = computed(() => {
  return props.sponsored
    ? profile.value.logo
    : profile.value.photoID
    ? String(profile.value.photoID)
    : props.imageFallbackPath
    ? props.imageFallbackPath
    : 'default-user.jpg'
})

// cssvars
const cssImageSizePx = ref(props.imageSize + 'px')
const cssImageFlexBasis = ref(
  props.imageFlexBasis ? props.imageFlexBasis : cssImageSizePx.value
)
const cssImageMinWidth = ref(
  props.minWidth
    ? props.minWidth + 'px'
    : props.imageFlexBasis
    ? 'unset'
    : cssImageSizePx.value
)

const cssRadius = ref(props.radius)
const cssImageRatio = ref(`${props.imageRatio[0]} / ${props.imageRatio[1]}`)
const cssContainerType = ref(props.justImage ? 'unset' : 'inline-size')
</script>

<template>
  <div class="v-person">
    <div
      v-if="profile"
      class="author-profile"
      :class="[
        { verticalMobile: props.verticalMobile },
        { vertical: props.vertical },
      ]"
      :style="`align-items: ${props.alignItems};`"
    >
      <div class="profile">
        <div class="author-image">
          <VImage
            :src="getImageSrc"
            :provider="isWagtailImage ? 'wagtail' : null"
            :width="props.imageSize"
            :height="props.imageSize"
            :sizes="props.sizes"
            :ratio="props.imageRatio"
            :loading="props.loading"
            :alt="props.isDecorative ? '' : props.alt"
            :is-decorative="props.isDecorative"
            :to="profileLink"
            @image-click="emit('image-click', profileLink)"
          />
        </div>
      </div>
      <div v-if="!justImage" class="info">
        <div class="slot slot-above-name">
          <slot name="slot-above-name" />
        </div>
        <div class="name-holder">
          <VFlexibleLink
            v-if="props.showName"
            class="name-link"
            :to="profileLink"
            @click="emit('name-click', profileLink)"
          >
            <div class="name">{{ props.namePrefix }} {{ profile.name }}</div>
          </VFlexibleLink>
          <VShareTools v-if="updatedSocialArr && props.showSocial">
            <VShareToolsItem
              v-for="account in updatedSocialArr"
              :key="account.id"
              :service="account.service"
              :link="account.profileUrl"
              :username="accountNameFromUrl(account.profileUrl)"
              @share="(service) => emit('social-share-click', service)"
              @follow="(service) => emit('social-follow-click', service)"
            />
          </VShareTools>
        </div>
        <div class="slot slot-above-bio">
          <slot name="slot-above-bio" />
        </div>
        <div
          v-if="profile.biography && props.showBio"
          class="bio"
          :class="props.truncate ? `truncate t${props.truncate}lines` : ''"
          v-html="profile.biography"
        />
        <div class="slot slot-below-bio">
          <slot name="slot-below-bio" />
        </div>
        <VFlexibleLink
          v-if="showCta"
          :to="profileLink"
          class="cta"
          @click="emit('cta-click', profileLink)"
        >
          {{ ctaText }}
        </VFlexibleLink>
        <div class="slot slot-below-cta">
          <slot name="slot-below-cta" />
        </div>
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
$container-breakpoint-xs: useBreakpointOrFallback('xs', 375px);
$container-breakpoint-sm: useBreakpointOrFallback('sm', 576px);
$container-breakpoint-md: useBreakpointOrFallback('md', 768px);

@mixin verticalStyles {
  flex-direction: column;
  align-items: center !important;
  text-align: center;
  .name-holder {
    align-items: center;
    flex-direction: column;
    gap: 0.25rem;
  }
  .v-share-tools {
    justify-content: center;
  }
  .cta {
    align-self: center;
  }
}

.v-person {
  container-type: v-bind(cssContainerType);
  .author-profile {
    display: flex;
    flex-direction: v-bind(flexDirection);
    margin-right: 0;
    margin-left: 0;
    margin-top: 0;
    gap: 1rem;
    .profile {
      height: auto;
      flex-basis: v-bind(cssImageFlexBasis) !important;
      flex: auto;
      flex-shrink: 0;
      max-width: v-bind(cssImageSizePx);
      min-width: v-bind(cssImageMinWidth);
      .author-image {
        border-radius: v-bind(cssRadius);
        background: #ffffff;
        width: 100%;
        height: auto;
        overflow: hidden;
      }
    }
    .info {
      display: flex;
      flex-direction: column;
      gap: 0.25rem;
      .name-holder {
        display: flex;
        gap: 1rem;
        .name-link {
          text-decoration: var(--person-name-decoration);
          display: inline-block;
          color: var(--person-name-color);
          .name {
            font-size: var(--person-name-size);
            font-weight: var(--person-name-weight);
          }
          &:hover {
            text-decoration: var(--person-name-hover-decoration);
          }
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
@container (max-width: #{$container-breakpoint-md}) {
  .v-person {
    .author-profile {
      .info {
        .name-holder {
          flex-direction: column;
          gap: 0.25rem;
        }
      }
    }
  }
}

@container (max-width: #{$container-breakpoint-sm}) {
  .v-person {
    .author-profile {
      .info {
        .name-holder {
          .name-link {
            .name {
              font-size: var(--person-name-small-size);
            }
          }
        }
      }
      &.verticalMobile {
        @include verticalStyles;
      }
    }
  }
}

@container (max-width: #{$container-breakpoint-xs}) {
  .v-person {
    .author-profile {
    }
  }
}
</style>
