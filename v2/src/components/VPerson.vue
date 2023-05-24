<script setup>
import { ref, computed } from 'vue'
import VFlexibleLink from './VFlexibleLink.vue'
import VSimpleResponsiveImage from './VSimpleResponsiveImage.vue'
import VShareTools from './VShareTools.vue'
import VShareToolsItem from './VShareToolsItem.vue'

const props = defineProps({
  profileId: {
    type: String,
    default: null,
  },
  imageSize: {
    type: Object,
    default: { sm: 60, md: 86, lg: 157 },
  },
  showCta: {
    type: Boolean,
    default: true,
  },
  sponsored: {
    type: Boolean,
    default: false,
  },
  staffPage: {
    type: Boolean,
    default: false,
  },
})

const profile = ref(null)

fetch('https://cms.demo.nypr.digital/api/v2/pages/19')
  .then((response) => response.json())
  .then((data) => (profile.value = data))

// const ctaText = ref(props.sponsored ? 'Learn More' : 'Read more')
// const profileLink = ref(
//   props.sponsored ? profile.value['link'] : profile.value['url']
// )

const profileImageSizeLg = ref(157)
const profileImageSizeMd = ref(86)
const profileImageSizeSm = ref(60)
const imageSize = computed(() => {
  return props.staffPage ? profileImageSizeLg.value : profileImageSizeMd.value
})
const imageSizePx = ref(imageSize.value + 'px')
// const accountNameFromUrl = (url) => {
//   return url
//     ?.split('/')
//     .filter((str) => str !== '')
//     .slice(-1)[0]
// }
</script>

<template>
  <div
    v-if="profile"
    class="author-profile grid grid-nogutter"
    :class="[{ staffPage: props.staffPage }]"
  >
    <pre>{{ profile.photo.id }}</pre>
    <pre>{{ imageSize }}</pre>

    <div class="col-fixed profile">
      <div class="author-image">
        <v-flexible-link
          :to="profile.photo.url"
          raw
          :aria-hidden="true"
          :tabindex="-1"
        >
          <v-simple-responsive-image
            :src="`https://cms.prod.nypr.digital/images/${profile.photo.id}/fill-%width%x%height%|format-webp|webpquality-%quality%`"
            :width="imageSize"
            :height="imageSize"
            :sizes="[2]"
            :ratio="[1, 1]"
            :loading="props.staffPage ? 'eager' : 'lazy'"
            alt=""
          />
          <!-- <img
            v-else
            src="/avatar.svg"
            :loading="props.staffPage ? 'eager' : 'lazy'"
            alt=""
          /> -->
        </v-flexible-link>
      </div>
    </div>
    <!-- <div class="col flex flex-column gap-2">
      <div
        class="flex flex-column align-items-start gap-2 md:flex-row md:align-items-center"
      >
        <v-flexible-link :to="profileLink" class="no-underline">
          <div class="h5">{{ profile.name }}</div>
        </v-flexible-link>
        <span v-if="profile.socialMediaProfile">
          <v-share-tools class="">
            <v-share-tools-item
              v-for="account in profile.socialMediaProfile"
              :key="account.id"
              :service="account.service"
              :username="accountNameFromUrl(account.profileUrl)"
            />
          </v-share-tools>
        </span>
      </div>
      <p
        v-if="profile.biography"
        class="p2"
        :class="props.staffPage ? '' : 'truncate t3lines'"
      >
        {{ profile.biography }}
      </p>
      <v-flexible-link v-if="showCta" :to="profileLink" class="type-textlink1">
        {{ ctaText }}
      </v-flexible-link>
    </div> -->
  </div>
</template>

<style lang="scss">
.author-profile {
  gap: 1.5rem;
  .col-fixed {
    max-width: v-bind(imageSizePx) !important;
    @include media('<md') {
      max-width: v-bind(profileImageSizeSm) !important;
    }
    .profile {
      box-sizing: content-box;
      width: v-bind(imageSizePx);
      @include media('<md') {
        width: v-bind(profileImageSizeSm);
      }
    }
  }
  .author-image {
    background: #ffffff;
    width: v-bind(imageSizePx);
    height: v-bind(imageSizePx);
    border-radius: 50%;
    margin-right: 12px;
    overflow: hidden;
    img {
      width: v-bind(imageSizePx);
      height: v-bind(imageSizePx);
    }
    @include media('<md') {
      width: #{v-bind(profileImageSizeSm) px};
      height: v-bind(profileImageSizeSm);
      img {
        width: v-bind(profileImageSizeSm);
        height: v-bind(profileImageSizeSm);
      }
    }
  }
  &.staffPage {
    flex-direction: row-reverse;
    .flexible-link {
      pointer-events: none;
    }
  }
}
</style>
