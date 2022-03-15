<template>
  <div ref="thisPerson" class="person override" :style="cssVars">
    <div
      v-resize="onResize"
      class="person-inner grid grid-nogutter"
      :class="[hasDetails ? 'has-details' : '', image ? '' : 'no-image']"
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
            <canvas ref="canvas" class="person-image" />
            <img
              v-if="isGIF(image)"
              ref="img"
              class="person-image person-image-img"
              :src="image"
              :alt="fullName"
              role="presentation"
              loading="lazy"
              decoding="async"
            />
            <v-image-with-caption
              v-else
              class="person-image person-image-img"
              :image="image"
              :alt-text="fullName"
              :image-url="nameLink ? nameLink : null"
              :ratio="[1, 1]"
              role="presentation"
              loading="lazy"
              decoding="async"
            />
          </div>
          <Button
            v-if="video"
            :label="null"
            class="p-button-icon-only pi pi-play video-play-button"
            :class="[
              { 'pi-times': showVideo },
              { 'p-button-rounded circle': circle },
            ]"
            :title="
              (showVideo ? 'Close ' : 'Play ') +
              fullName +
              `'s introduction video`
            "
            @click="handleVideoClick($event)"
          />
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
            v-if="fullName"
            class="person-name-link"
            role="link"
            :class="!nameLink || onAuthorPage ? 'disabled' : ''"
            :href="nameLink ? nameLink : null"
          >
            <h2><span v-html="fullName" /></h2>
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
      <div
        v-if="video && showVideo"
        ref="videoHolderRef"
        class="video-holder col-12"
        @click="handleVideoClick($event)"
      >
        <iframe
          ref="youtubeRef"
          title="Video player"
          class="iframeHolder"
          type="text/html"
          :src="
            'https://www.youtube.com/embed/' +
            getYoutubeId(video) +
            '?autoplay=1'
          "
          frameborder="0"
          allowfullscreen
        />

        <!-- <div class="closer" @click="handleVideoClick($event)">
          <close-icon />
        </div>-->
        <Button
          v-if="video"
          :label="null"
          class="p-button-icon-only pi pi-times closer"
          :class="[{ 'p-button-rounded': circle }]"
          @click="handleVideoClick($event)"
        />
      </div>
    </div>
  </div>
</template>

<script>
import { gsap } from 'gsap'
import { isInViewport } from '../mixins/helpers.js'
import VShareTools from './VShareTools'
import VShareToolsItem from './VShareToolsItem'
import VImageWithCaption from './VImageWithCaption'
import Button from 'primevue/button'

function initResizeListener(binding) {
  const onResizeCallback = binding.value
  window.addEventListener('resize', () => {
    const width = document.documentElement.clientWidth
    const height = document.documentElement.clientHeight
    onResizeCallback({ width, height })
  })
}

/**
 * A component for displaying details about a person
 */
export default {
  name: 'VPerson',
  components: {
    VShareTools,
    VShareToolsItem,
    Button,
    VImageWithCaption,
  },
  directives: {
    resize: {
      // vue3 support
      mounted(el, binding) {
        initResizeListener(binding)
      },
      // vue 2 supoort
      inserted(el, binding) {
        initResizeListener(binding)
      },
    },
  },
  props: {
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
     *  adds a basic animation to the component when it enters the viewport once. If an image and details are present, it will animate them individually. If either is missing, it will animate the entire component.
     */
    animate: {
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
  },
  data() {
    return {
      readMore: false,
      showVideo: false,
      inViewPort: false,
      windowSize: {},
      socialArrayData: [],
      initTruncHeight: 0,
      bpVar: this.bp,
    }
  },
  computed: {
    cssVars() {
      return {
        '--trunc-lines': this.truncate ? this.truncate : 'unset',
      }
    },
    hasDetails() {
      return !!this.role || !!this.blurb || !!this.social || !!this.fullName
    },
    organizationComputed() {
      return ' (' + this.organization + ')'
    },
  },
  watch: {
    windowSize() {
      this.runHandleOnResizeDebounce()
    },
  },
  beforeMount() {
    this.socialArrayData = this.socialArray()
  },
  mounted() {
    const { thisPerson, blurbHolderRef, blurbRef } = this.$refs

    if (this.truncate) {
      // set initial height of element so gsap can animate it
      this.initTruncHeight = blurbRef.offsetHeight + 5
      gsap.set(blurbHolderRef, {
        height: this.initTruncHeight,
      })

      // initial call of handleResize
      this.handleResize()
    }

    if (this.animate) {
      thisPerson.classList.add('animate')
    }
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          // console.log('in viewport')
          // stop GIF
          if (this.image && this.isGIF(this.image)) {
            this.handleGifInViewPort()
          }

          // animate
          if (this.animate) {
            thisPerson.classList.remove('animate')
          }
          observer.disconnect()
        }
      })
    })

    observer.observe(thisPerson)

    // running the resize code in a debounce and controlled by a watch method looking at a data var windowSize, which is updarted by the onResize method with the screen is resized
    this.runHandleOnResizeDebounce = this.debounce(() => {
      this.handleResize()
    }, 500)
  },
  methods: {
    getOffsetTop(el) {
      const rect = el.getBoundingClientRect()
      const scrollTop = window.pageYOffset || document.documentElement.scrollTop
      return rect.top + scrollTop - 160 // 160 is the ~ height of the header buffer
    },
    handleBlurb() {
      this.readMore = !this.readMore
      const { blurbRef, blurbHolderRef, imgRef, thisPerson } = this.$refs
      if (this.readMore) {
        blurbRef.classList.toggle('expanded')
      }
      // animate height of blurb container (vue/nuxt3 w/ gsap)
      gsap.to(blurbHolderRef, {
        duration: this.readMore ? 0.5 : this.isInViewport(imgRef) ? 0.15 : 0.5,
        height: this.readMore ? 'auto' : this.initTruncHeight,
        overwrite: true,
        onComplete: () => {
          if (!this.readMore) {
            blurbRef.classList.toggle('expanded')
          }
          this.handleResize()
        },
      })

      // when closeing the expanded blurb, if the image is not in the viewport, animate it into view
      if (!this.readMore && !this.isInViewport(imgRef)) {
        window.scrollTo({
          top: this.getOffsetTop(thisPerson),
          behavior: 'smooth',
        })
      }
    },
    debounce(fn, delay) {
      let timeoutID = null
      return function () {
        clearTimeout(timeoutID)
        const args = arguments
        const that = this
        timeoutID = setTimeout(function () {
          fn.apply(that, args)
        }, delay)
      }
    },
    onResize(size) {
      this.windowSize = size
    },
    handleResize() {
      if (!this.readMore && this.truncate) {
        const { blurbRef, readMoreRef } = this.$refs
        const clamped = blurbRef.scrollHeight > blurbRef.clientHeight
        readMoreRef.classList.toggle('show-me', clamped)
      }
    },
    handleVideoClick(event) {
      event.preventDefault()
      event.stopPropagation()
      this.$emit(' componentEvent', 'playing promo video')
      this.showVideo = !this.showVideo
      setTimeout(() => {
        // when showing the video and it is not inviewport, it scrolls element into view
        const { videoHolderRef, thisPerson, blurbRef } = this.$refs
        if (this.showVideo && !this.isInViewport(videoHolderRef)) {
          window.scrollTo({
            top: this.getOffsetTop(thisPerson) + blurbRef.clientHeight,
            behavior: 'smooth',
          })
        }
      }, 100)
    },
    handleGifInViewPort(inViewPort) {
      /* wait 10 seconds then swap out GIF with canvas render */
      this.inViewPort = inViewPort
      const { canvas, img } = this.$refs
      setTimeout(function () {
        const w = img.clientWidth
        const h = img.clientHeight
        canvas.setAttribute('width', w + 'px')
        canvas.setAttribute('height', h + 'px')
        canvas.getContext('2d').drawImage(img, 0, 0, w, h)
        img.remove()
        canvas.classList.add('show')
      }, 10000)
    },
    isGIF(imageURL) {
      return imageURL.match(/(http(s?):)([/|.|\w|\s|-])*\.(?:gif)/g)
    },
    getYoutubeId(url) {
      const regExp =
        /^.*((youtu.be\/)|(v\/)|(\/u\/\w\/)|(embed\/)|(watch\?))\??v?=?([^#&?]*).*/
      const match = url.match(regExp)
      return match && match[7].length === 11 ? match[7] : false
    },
    socialArray() {
      // Website, Email, Phone array
      const wepArray = this.social ? this.social : []

      if (this.email) {
        wepArray.push({
          service: 'email',
          username: this.email,
        })
      }
      if (this.phoneNumbers) {
        this.phoneNumbers.forEach((phone) => {
          wepArray.push({
            service: 'phone',
            username: phone.phoneNumber,
          })
        })
      }
      if (this.websiteUrl) {
        wepArray.push({
          service: 'site',
          profileUrl: this.websiteUrl,
          label: this.websiteLabel ? this.websiteLabel : 'Website',
        })
      }
      return wepArray
    },
    // imported global helpers
    isInViewport,
  },
}
</script>

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
        display: none;
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
