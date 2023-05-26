<script setup>
import { ref, computed, onMounted } from 'vue'
import VFlexibleLink from './VFlexibleLink.vue'
import VSimpleResponsiveImage from './VSimpleResponsiveImage.vue'
import VShareTools from './VShareTools.vue'
import VShareToolsItem from './VShareToolsItem.vue'

const props = defineProps({
  profileData: {
    type: Object,
    default: null,
  },
  namePrefix: {
    type: String,
    default: null,
  },
  imageSize: {
    type: Number,
    default: 100,
  },
  imageFallbackPath: {
    type: String,
    default: '../assets/images/default-user.jpg',
  },
  showCta: {
    type: Boolean,
    default: true,
  },
  sponsored: {
    type: Boolean,
    default: false,
  },
  reverse: {
    type: Boolean,
    default: false,
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
  ratio: {
    type: Array,
    default: () => [1, 1],
  },
  sizes: {
    type: Array,
    default() {
      return [2]
    },
  },
  imgApi: {
    type: String,
    default: 'https://cms.prod.nypr.digital/images/',
  },
  imgApiSuffix: {
    type: String,
    default: '/fill-%width%x%height%|format-webp|webpquality-%quality%',
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
// push original social array and email into new updatedSocialArr
updatedSocialArr.value.push(...profile.value.socialMediaProfile, email)
// push phone numbers into new updatedSocialArr
profile.value.phone_numbers.map((phone) => {
  updatedSocialArr.value.push({
    service: 'phone',
    profileUrl: String(phone.phone_number),
  })
})

const ctaText = ref(props.sponsored ? 'Learn More' : 'Read more')
const profileLink = ref(
  props.sponsored ? profile.value.link : profile.value.url
)

// cssvars
const imageSizePx = ref(props.imageSize + 'px')
const radius = ref(props.radius)

const accountNameFromUrl = (url) => {
  return url
    ?.split('/')
    .filter((str) => str !== '')
    .slice(-1)[0]
}
</script>

<template>
  <div
    v-if="profile"
    class="author-profile"
    :class="[{ reverse: props.reverse }]"
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
            v-if="profile.photoID"
            :src="`${props.imgApi}${profile.photoID}${props.imgApiSuffix}`"
            :width="imageSize"
            :height="imageSize"
            :sizes="props.sizes"
            :ratio="props.ratio"
            :loading="props.loading"
            alt="Profile image"
          />
          <img
            v-else
            :src="`${props.imageFallbackPath}`"
            :loading="props.loading"
            alt="Profile image"
          />
        </v-flexible-link>
      </div>
    </div>
    <div class="info">
      <div class="name-holder">
        <v-flexible-link
          class="name-link"
          :to="profileLink"
          @click="emit('click-name', profileLink)"
        >
          <div class="name">{{ props.namePrefix }} {{ profile.name }}</div>
        </v-flexible-link>
        <v-share-tools v-if="profile.socialMediaProfile">
          <v-share-tools-item
            v-for="account in updatedSocialArr"
            :key="account.id"
            :service="account.service"
            :username="accountNameFromUrl(account.profileUrl)"
            @share="(service) => emit('click-social-share', service)"
            @follow="(service) => emit('click-social-follow', service)"
          />
        </v-share-tools>
      </div>
      <p
        v-if="profile.biography"
        :class="props.truncate ? `truncate t${props.truncate}lines` : ''"
      >
        {{ profile.biography }}
      </p>
      <v-flexible-link
        v-if="showCta"
        :to="profileLink"
        @click="emit('click-cta', profileLink)"
      >
        {{ ctaText }}
      </v-flexible-link>
    </div>
  </div>
</template>

<style lang="scss" scoped>
$container-breakpoint-xs: if(
  global-variable-exists(breakpoints),
  map-get($breakpoints, 'xs'),
  375px
);
$container-breakpoint-sm: if(
  global-variable-exists(breakpoints),
  map-get($breakpoints, 'sm'),
  576px
);
$container-breakpoint-md: if(
  global-variable-exists(breakpoints),
  map-get($breakpoints, 'md'),
  768px
);
.author-profile {
  container-type: inline-size;
  display: flex;
  align-items: start;
  margin-right: 0;
  margin-left: 0;
  margin-top: 0;
  gap: 1rem;
  .author-image {
    background: #ffffff;
    width: v-bind(imageSizePx);
    height: auto;
    border-radius: v-bind(radius);
    overflow: hidden;
    // @include media('<md') {
    //   width: v-bind(profileImageSizeSm);
    //   height: v-bind(profileImageSizeSm);
    // }
  }
  .info {
    display: flex;
    flex-direction: column;
    gap: 0.25rem;
    .name-holder {
      display: flex;
      gap: 10px;
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
  &.reverse {
    flex-direction: row-reverse;
  }
}
@container (max-width: #{$container-breakpoint-md}) {
  .author-profile {
    .author-image {
      width: 60px;
      height: auto;
    }
  }
}

@container (max-width: #{$container-breakpoint-sm}) {
  .author-profile {
  }
}

@container (max-width: #{$container-breakpoint-xs}) {
  .author-profile {
  }
}
</style>
