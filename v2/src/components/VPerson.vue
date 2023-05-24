<script setup>
import { gsap } from 'gsap'
import { isInViewport } from '../mixins/helpers.js'
import VShareTools from './VShareTools.vue'
import VShareToolsItem from './VShareToolsItem.vue'
import VImageWithCaption from './VImageWithCaption.vue'
import Button from 'primevue/button'
import { ref, shallowRef, computed, onBeforeMount, onMounted } from 'vue'

const props = defineProps({
  /**
   *  A URL pointing to an image of the person.
   */
  image: {
    type: String,
    default: null,
  },
  /**
   *  image scale in its container in vertical orientation only, 1(8.333%) through 12(100%)
   */
  imgScale: {
    type: String,
    default: '5',
  },
  /**
   *  adds a circle mask around the image.
   */
  circle: {
    type: Boolean,
    default: false,
  },
  /**
   *  youtube link to promo video
   */
  video: {
    type: String,
    default: null,
  },
  /**
   *  Full name of the person.
   */
  fullName: {
    type: String,
    default: null,
  },
  /**
   *  A URL pointing to the person's bio page or anywhere else they want to link to.
   */
  nameLink: {
    type: String,
    default: null,
  },
  /**
   *  Organization this person is from.
   */
  organization: {
    type: String,
    default: null,
  },
  /**
   *  link to the organization.
   */
  organizationLink: {
    type: String,
    default: null,
  },
  /**
   *  The person's role or job. e.g. Host, Guest, Author, etc.
   */
  role: {
    type: String,
    default: null,
  },
  /**
   *  Information about the author. e.g. "Jen is a blah blah..." etc.
   */
  blurb: {
    type: String,
    default: null,
  },
  /**
   *  maxium lines of text to show when truncarted
   */
  truncate: {
    type: [Boolean, String],
    default: false,
  },
  /**
   *  persons website url
   */
  websiteUrl: {
    type: String,
    default: null,
  },
  /**
   *  persons website label
   */
  websiteLabel: {
    type: String,
    default: null,
  },
  /**
   *  persons email address
   */
  email: {
    type: String,
    default: null,
  },
  /**
   *  persons phone number
   */
  phoneNumbers: {
    type: Array,
    default: null,
  },
  /**
   *  social account array
   */
  social: {
    type: Array,
    default: null,
  },
  /**
   *  horizontal(default), vertical, responsive (changes to vertical at the small break point)
   */
  orientation: {
    type: String,
    default: 'horizontal',
  },
  /**
   *  orientation responsive break point
   */
  bp: {
    type: String,
    default: 'sm',
  },
  /**
   *  If component is on the Author page, disables image and name links
   */
  onAuthorPage: {
    type: Boolean,
    default: false,
  },
})

const readMore = shallowRef(false)
const socialArrayData = ref([])
const bpVar = ref(props.bp)

const thisPersonRef = ref('thisPersonRef')
const blurbHolderRef = ref('blurbHolderRef')
const blurbRef = ref('blurbRef')
const imgRef = ref('imgRef')

const getSocialArray = computed(() => {
  let socialArray = []
  if (props.social) {
    props.social.forEach((item) => {
      socialArray.push({
        name: item.name,
        url: item.url,
        icon: item.icon,
      })
    })
  }
  return socialArray
})

const cssVars = computed(() => {
  return {
    '--trunc-lines': props.truncate ? props.truncate : 'unset',
  }
})
const hasDetails = computed(() => {
  return !!props.role || !!props.blurb || !!props.social || !!props.fullName
})
const organizationComputed = computed(() => {
  return ' (' + props.organization + ')'
})

onBeforeMount(() => {})

onMounted(() => {
  socialArrayData.value = getSocialArray.value
})
</script>

<template>
  <div ref="thisPersonRef" class="person" :style="cssVars">
    <div
      class="person-inner grid grid-nogutter"
      :class="[{ 'has-details': hasDetails }, { 'no-image': !props.image }]"
    >
      <!-- Image section -->
      <div
        v-if="image"
        class="person-image-link"
        :class="[
          { [`col-12 ${bp}:col-4`]: orientation === 'responsive' },
          { [`col-12 w-${imgScale} m-auto`]: orientation === 'vertical' },
          { 'col-4': orientation === 'horizontal' },
        ]"
      >
        <div
          ref="imgRef"
          class="visual-holder"
          :class="[
            {
              [`w-${imgScale} m-auto ${bp}:w-12 responsive`]:
                orientation === 'responsive',
            },
            { [`w-${imgScale} m-auto w-12`]: orientation === 'vertical' },
          ]"
        >
          <div ref="visual" class="visual" :class="[circle ? 'circle' : '']">
            <v-image-with-caption
              class="person-image person-image-img"
              :image="props.image"
              :alt-text="props.fullName"
              :image-url="props.nameLink ? props.nameLink : null"
              :ratio="[1, 1]"
              role="presentation"
              loading="lazy"
              decoding="async"
              :width="400"
              :height="400"
            />
          </div>
        </div>
      </div>

      <!-- Detail section -->
      <div
        v-if="hasDetails"
        ref="detailsRef"
        class="person-details flex flex-column justify-content-center"
        :class="[
          {
            [`col-12 p-2 text-center ${bp}:text-left ${bp}:col-8 ${bp}:p-3`]:
              orientation === 'responsive',
          },
          { [`col-12 p-2 text-center`]: orientation === 'vertical' },
          { 'col-8 p-3': orientation === 'horizontal' },
        ]"
      >
        <div class="person-name-link-holder">
          <a
            v-if="props.fullName"
            class="person-name-link"
            role="link"
            :class="!props.nameLink || onAuthorPage ? 'disabled' : ''"
            :href="props.nameLink ? props.nameLink : null"
          >
            <div class="h2" v-html="props.fullName"></div>
          </a>
        </div>
        <div v-if="role" class="person-role footer">
          <span v-html="role" />
          <a
            v-if="organization"
            :href="organizationLink"
            target="_blank"
            rel="noopener noreferrer"
            class="person-role footer organization"
            :class="[organizationLink ? 'link' : 'no-link']"
            v-html="organizationComputed"
          />
        </div>
        <div ref="blurbHolderRef" class="blurbHolder">
          <p
            v-if="blurb"
            ref="blurbRef"
            :class="[truncate ? 'truncate' : '']"
            class="blurb"
            v-html="blurb"
          />
        </div>
        <div>
          <a
            v-if="truncate"
            ref="readMoreRef"
            class="read-more"
            @click="handleBlurb()"
            >{{ readMore ? 'read less' : 'read more' }}</a
          >
        </div>
        <v-share-tools
          v-if="socialArrayData.length > 0"
          class="social"
          :class="[
            `text-center justify-content-center ${bp}:justify-content-start ${bp}:text-left`,
          ]"
        >
          <v-share-tools-item
            v-for="(item, index) in socialArrayData"
            :key="index"
            :service="item.service"
            :username="item.username"
            :link="item.profileUrl"
            :label="item.label"
            :action="item.action"
            :url="item.url"
          />
        </v-share-tools>
      </div>
    </div>
  </div>
</template>

<style lang="scss">
@mixin aspect-ratio($width, $height) {
  position: relative;
  &:before {
    display: block;
    content: '';
    width: 100%;
    padding-top: calc(($height / $width) * 100%);
  }
  > .iframeHolder {
    position: absolute !important;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
  }
}

.person {
  transition: all 1.5s;
  -webkit-transition: all 1.5s;
  &.animate {
    -moz-transform: scale(0.85);
    -webkit-transform: scale(0.85);
    -o-transform: scale(0.85);
    -ms-transform: scale(0.85);
    transform: scale(0.85);
    opacity: 0;
  }
  .person-inner {
    color: var(--text-color);
    .person-image-link {
      padding: 0;
      position: relative;
      line-height: 0;
      div.circle {
        position: relative;
        display: block;
        border-radius: 100%;
        overflow: hidden;
      }
      &.disabled {
        pointer-events: none;
      }
    }
    .person-image {
      height: 100%;
      width: 100%;
      object-fit: cover;
    }
    .visual-holder {
      position: relative;
      display: block;
      .visual {
        background: transparent;
        canvas {
          display: none;
          &.show {
            display: block;
          }
        }
      }
    }
    .video-play-button {
      position: absolute;
      bottom: spacing(1);
      left: spacing(1);
      min-width: 40px;
      min-height: 40px;
      .p-button-label {
        display: none;
      }
      &.circle {
        bottom: 0;
        left: 0px;
        top: 70%;
        right: 70%;
        margin: auto;
      }
    }
    .person-details {
      color: var(--text-color);
      .person-name-link-holder {
        margin-bottom: spacing(1);
        .person-name-link {
          // @include font-config($h2-config);
          color: var(--text-color);
          overflow-wrap: anywhere;
          word-break: break-word;
          text-decoration: none;
          display: inline-block;
          span {
            transition: color var(--transition-duration);
            -webkit-transition: color var(--transition-duration);
          }
          &.disabled {
            pointer-events: none;
          }
          &:hover {
            span {
              color: var(--link-button-hover-color);
              text-decoration: underline;
            }
          }
        }
      }

      .person-role,
      .person-role a {
        color: inherit;
        text-decoration: none;
        // @include font-config($footer-config);
        text-transform: uppercase;
        overflow-wrap: anywhere;
        word-break: break-word;
        letter-spacing: 1.6px;
        margin-bottom: spacing(3);
        &.no-link {
          pointer-events: none;
        }
        &.organization.link {
          &:hover {
            text-decoration: underline;
          }
        }
      }
      .blurbHolder {
        overflow: hidden;
        .blurb {
          // @include font-config($p-config);
          &.truncate {
            display: -webkit-box;
            -webkit-line-clamp: var(--trunc-lines);
            -webkit-box-orient: vertical;
            overflow: hidden;
          }
          margin-top: spacing(1);
          overflow-wrap: anywhere;
          word-break: break-word;
          &.expanded {
            -webkit-line-clamp: unset;
          }
        }
      }

      .read-more {
        word-break: keep-all;
        cursor: pointer;
        color: var(--text-color);
        font-size: var(--font-size-4);
        letter-spacing: 0.6px;
        text-transform: uppercase;
        margin-top: spacing(1);
        &.show-me {
          display: inline-block;
        }
        &:hover {
          color: var(--primary-color);
        }
      }
    }
    .video-holder {
      position: relative;
      display: block;
      margin: 15px auto 0 auto;
      width: 100%;
      .iframeHolder {
        width: 100% !important;
        height: 100% !important;
        iframe {
          width: 100% !important;
          height: 100% !important;
        }
      }
      @include aspect-ratio(16, 9);
      .closer {
        width: 24px;
        height: 24px;
        padding: 0;
        font-size: var(--font-size-2);
        position: absolute;
        cursor: pointer;
        top: spacing(1);
        right: spacing(1);
        .p-button-label {
          display: none;
        }
      }
    }
  }
}
</style>
