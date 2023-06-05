<script setup>
import { ref } from 'vue'
import VFlexibleLink from './VFlexibleLink.vue'
import VSimpleResponsiveImage from './VSimpleResponsiveImage.vue'
import VShareTools from './VShareTools.vue'
import VShareToolsItem from './VShareToolsItem.vue'
import defaultUserPhoto from '../assets/images/default-user.jpg'

const props = defineProps({
  profileData: {
    type: Object,
    default: null,
  },
  namePrefix: {
    type: String,
    default: null,
  },
  imageSrc: {
    type: String,
    default: null,
  },
  imageSize: {
    type: Number,
    default: 100,
  },
  imageSizeScaleRatio: {
    type: Number,
    default: 1.5,
  },
  imageFallbackPath: {
    type: String,
    default: null,
  },
  verticalMobile: {
    type: Boolean,
    default: false,
  },
  showCta: {
    type: Boolean,
    default: true,
  },
  showBio: {
    type: Boolean,
    default: true,
  },
  showSocial: {
    type: Boolean,
    default: true,
  },
  showName: {
    type: Boolean,
    default: true,
  },
  justImage: {
    type: Boolean,
    default: false,
  },
  alignItems: {
    type: String,
    default: 'start',
  },
  sponsored: {
    type: Boolean,
    default: false,
  },
  flexDirection: {
    type: String,
    default: 'row',
  },
  truncate: {
    type: Number,
    default: null,
  },
  radius: {
    type: String,
    default: '50%',
  },
  loading: {
    type: String,
    default: 'lazy',
  },
  imageRatio: {
    type: Array,
    default: () => [1, 1],
  },
  pixelDensitySizes: {
    type: Array,
    default() {
      return [2]
    },
  },
})

const emit = defineEmits([
  'click-image',
  'click-name',
  'click-cta',
  'click-social-share',
  'click-social-follow',
])

const profile = ref(props.profileData)

const updatedSocialArr = ref([])
const email = { service: 'email', profileUrl: String(profile.value.email) }
const website = {
  service: 'site',
  profileUrl: profile.value.website,
}

// push original social array into new updatedSocialArr if it exist
if (profile.value.socialMediaProfile) {
  updatedSocialArr.value.push(...profile.value.socialMediaProfile)
}
// push website into new updatedSocialArr if it exist
if (profile.value.website) {
  updatedSocialArr.value.push(website)
}
// push email into new updatedSocialArr if it exist
if (profile.value.email) {
  updatedSocialArr.value.push(email)
}
// push phone numbers into new updatedSocialArr if it exist
if (profile.value.phone_numbers) {
  profile.value.phone_numbers.map((phone) => {
    updatedSocialArr.value.push({
      service: 'phone',
      profileUrl: String(phone.phone_number),
    })
  })
}

const ctaText = ref(props.sponsored ? 'Learn More' : 'Read more')
const profileLink = ref(
  props.sponsored ? profile.value.link : profile.value.url
)

// cssvars
const cssImageSizePx = ref(props.imageSize + 'px')
const cssImageSizeScaleRatio = ref(props.imageSizeScaleRatio)
const cssRadius = ref(props.radius)
const cssImageRatio = ref(`${props.imageRatio[0]} / ${props.imageRatio[1]}`)
const cssContainerType = ref(props.justImage ? 'unset' : 'inline-size')

const accountNameFromUrl = (url) => {
  return url
    ?.split('/')
    .filter((str) => str !== '')
    .slice(-1)[0]
}
</script>

<template>
  <div class="v-person">
    <div
      v-if="profile"
      class="author-profile"
      :class="[{ verticalMobile: props.verticalMobile }]"
      :style="`align-items: ${props.alignItems};`"
    >
      <div class="profile">
        <div class="author-image">
          <v-flexible-link
            :to="profileLink"
            raw
            :aria-hidden="true"
            :tabindex="-1"
            @click="emit('click-image', profileLink)"
          >
            <v-simple-responsive-image
              v-if="
                props.imageSrc && !props.sponsored && !props.imageFallbackPath
              "
              :src="props.imageSrc"
              :width="Number(imageSize)"
              :height="Number(imageSize)"
              :sizes="props.pixelDensitySizes"
              :ratio="props.imageRatio"
              :loading="props.loading"
              alt="Profile image"
            />
            <img
              v-else
              :src="`${
                props.sponsored
                  ? profile.logo
                  : props.imageFallbackPath
                  ? props.imageFallbackPath
                  : defaultUserPhoto
              }`"
              :loading="props.loading"
              style="width: 100%; height: auto"
              alt="Profile image"
            />
          </v-flexible-link>
        </div>
      </div>
      <div class="info" v-if="!justImage">
        <div class="slot slot-above-name">
          <slot name="slot-above-name" />
        </div>
        <div class="name-holder">
          <v-flexible-link
            v-if="props.showName"
            class="name-link"
            :to="profileLink"
            @click="emit('click-name', profileLink)"
          >
            <div class="name">{{ props.namePrefix }} {{ profile.name }}</div>
          </v-flexible-link>
          <v-share-tools v-if="updatedSocialArr && props.showSocial">
            <v-share-tools-item
              v-for="account in updatedSocialArr"
              :key="account.id"
              :service="account.service"
              :link="account.profileUrl"
              :username="accountNameFromUrl(account.profileUrl)"
              @share="(service) => emit('click-social-share', service)"
              @follow="(service) => emit('click-social-follow', service)"
            />
          </v-share-tools>
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
        <v-flexible-link
          v-if="showCta"
          :to="profileLink"
          class="cta"
          @click="emit('click-cta', profileLink)"
        >
          {{ ctaText }}
        </v-flexible-link>
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

.v-person {
  container-type: v-bind(cssContainerType);

  .author-profile {
    display: flex;
    align-items: start;
    flex-direction: v-bind(flexDirection);
    margin-right: 0;
    margin-left: 0;
    margin-top: 0;
    gap: 1rem;

    .author-image {
      background: #ffffff;
      width: v-bind(cssImageSizePx);
      height: auto;
      border-radius: v-bind(cssRadius);
      overflow: hidden;
      aspect-ratio: v-bind(cssImageRatio);
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
      .slot {
      }
    }
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
      .author-image {
        width: 60px;
        width: calc(v-bind(cssImageSizePx) / v-bind(cssImageSizeScaleRatio));
        height: auto;
      }
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
        flex-direction: column;
        align-items: center !important;
        text-align: center;
        .author-image {
          width: v-bind(cssImageSizePx);
          height: auto;
        }
        .v-share-tools {
          justify-content: center;
        }
      }
    }
  }
}

@container (max-width: #{$container-breakpoint-xs}) {
  .v-person {
    .author-profile {
      .author-image {
        width: calc(
          v-bind(cssImageSizePx) / v-bind(cssImageSizeScaleRatio) /
            v-bind(cssImageSizeScaleRatio)
        );
      }
    }
  }
}
</style>
