<script setup>
//import AudioIcon from '../assets/icons/AudioIcon.vue'
import EmailIcon from '../assets/icons/EmailIcon.vue'
import FacebookIcon from '../assets/icons/FacebookIcon.vue'
import InstagramIcon from '../assets/icons/InstagramIcon.vue'
//import NewsletterIcon from '../assets/icons/EmailIcon.vue'
import LinkedinIcon from '../assets/icons/LinkedinIcon.vue'
import PhoneIcon from '../assets/icons/PhoneIcon.vue'
import RedditIcon from '../assets/icons/RedditIcon.vue'
import SiteIcon from '../assets/icons/SiteIcon.vue'
import SpotifyIcon from '../assets/icons/SpotifyIcon.vue'
import TwitterIcon from '../assets/icons/TwitterIcon.vue'
import YoutubeIcon from '../assets/icons/YoutubeIcon.vue'
import { computed } from 'vue'

const props = defineProps({
  action: {
    default: 'follow',
    type: String,
  },
  label: {
    default: null,
    type: String,
  },
  link: {
    default: null,
    type: String,
  },
  service: {
    default: 'site',
    type: String,
  },
  shareParameters: {
    default: () => ({}),
    type: Object,
  },
  url: {
    default: null,
    type: String,
  },
  username: {
    default: null,
    type: String,
  },
  utmParameters: {
    default: () => ({}),
    type: Object,
  },
})

const emit = defineEmits(['share', 'follow'])

const icons = {
  email: EmailIcon,
  facebook: FacebookIcon,
  instagram: InstagramIcon,
  linkedin: LinkedinIcon,
  newsletter: EmailIcon,
  phone: PhoneIcon,
  reddit: RedditIcon,
  site: SiteIcon,
  spotify: SpotifyIcon,
  twitter: TwitterIcon,
  youtube: YoutubeIcon,
}

const URL_PLACEHOLDER_PATTERN = /%URL%/g
const SOCIAL_SERVICE_MAP = {
  email: {
    omitUrl: true,
    profileBase: 'mailto:',
    shareBase: 'mailto:',
  },
  facebook: {
    profileBase: 'https://www.facebook.com/',
    shareBase: 'https://www.facebook.com/sharer.php',
    urlKey: 'u',
  },
  instagram: {
    profileBase: 'https://www.instagram.com/',
  },
  linkedin: {
    profileBase: 'https://www.linkedin.com/in/',
    shareBase: 'https://www.linkedin.com/sharing/share-offsite/',
  },
  phone: {
    omitUrl: true,
    profileBase: 'tel:',
    shareBase: 'tel:',
  },
  reddit: {
    profileBase: 'https://www.reddit.com/r/',
    shareBase: 'https://www.reddit.com/submit',
  },
  spotify: {
    profileBase: 'https://open.spotify.com/playlist/',
  },
  twitter: {
    profileBase: 'https://twitter.com/',
    shareBase: 'https://twitter.com/intent/tweet',
  },
  youtube: {
    profileBase: 'https://www.youtube.com/channel/',
  },
}

const socialLink = computed(() => {
  return SOCIAL_SERVICE_MAP[props.service]?.profileBase + props.username ?? ''
})
const shareBase = computed(() => {
  return SOCIAL_SERVICE_MAP[props.service]?.shareBase ?? ''
})
const shareUrl = computed(() => {
  const utmParams = Object.entries(props.utmParameters).map(([key, value]) => {
    return `utm_${key}=${encodeURIComponent(value)}`
  })
  let url = props.url
  if (utmParams.length > 0) {
    url = `${url}?${utmParams.join('&')}`
  }

  const shareParams = Object.entries(props.shareParameters).map(
    ([key, value]) => {
      return `${key}=${encodeURIComponent(
        value.replace(URL_PLACEHOLDER_PATTERN, url)
      )}`
    }
  )

  let params = shareParams

  const shouldOmitUrl = SOCIAL_SERVICE_MAP[props.service]?.omitUrl
  if (!shouldOmitUrl) {
    const urlKey = SOCIAL_SERVICE_MAP[props.service]?.urlKey ?? 'url'
    const urlParam = `${urlKey}=${encodeURIComponent(url)}`
    params = [urlParam, ...params]
  }

  return `${shareBase.value}?${params.join('&')}`
})
const ariaLabel = computed(() => {
  if (props.label) {
    return props.label
  } else if (props.action === 'follow') {
    return `Follow us on ${props.service}`
  } else if (props.action === 'share') {
    return `Share on ${props.service}`
  }
  return ''
})
// handles the share feature
const share = () => {
  if (!props.service) {
    return
  }
  emit('share', props.service)
  if (props.service === 'email') {
    window.open(`${shareUrl.value}`, '_self')
    return
  }

  // get the position of the popup window
  function getPopupPosition() {
    const screenLeft = screen.availLeft
    const screenTop = screen.availTop

    const windowWidth = screen.availWidth
    const windowheight = screen.availHeight

    const left = windowWidth / 2 - 600 / 2 + screenLeft
    const top = windowheight / 2 - 600 / 2 + screenTop

    return { left, top }
  }

  // get the position of the window
  const windowString = ({ left, top }) =>
    `location=no,toolbar=no,menubar=no,scrollbars=no,status=no,width=550,height=600,top=${top},left=${left}`
  const popupPosition = getPopupPosition()
  const newWindow = window.open(
    shareUrl.value,
    'share window',
    windowString(popupPosition)
  )

  // make sure it actually opened and bring it to the front
  if (
    typeof newWindow !== 'undefined' &&
    newWindow !== null &&
    newWindow.focus
  ) {
    newWindow.focus()
  }
}
</script>

<template>
  <a
    v-if="action === 'follow'"
    :href="username && props.service !== 'site' ? socialLink : link"
    class="v-share-tools-item follow-link c-share-tools__link"
    :class="service"
    :aria-label="ariaLabel"
    :target="service !== 'phone' ? '_blank' : '_self'"
    rel="noopener noreferrer"
    :title="username && props.service !== 'site' ? socialLink : link"
    @click="emit('follow', service)"
  >
    <component :is="icons[props.service]" v-if="!label" />
    <span v-else>{{ label }}</span>
  </a>

  <button
    v-else-if="action === 'share'"
    class="v-share-tools-item share-button"
    @click="share"
  >
    <component :is="icons[props.service]" />
  </button>
</template>

<style lang="scss" scoped>
.share-button,
.follow-link,
.follow-link svg,
.share-button svg {
  width: 20px;
  height: 20px;
}

.share-button svg > *,
.follow-link svg > *,
.follow-link {
  color: var(--text-color);
  fill: var(--text-color);
  transition: var(--transition-ease) var(--transition-duration);
}

.follow-link,
.share-button {
  &:hover {
    cursor: pointer;
    svg > * {
      fill: var(--primary-color) !important;
    }
    color: var(--primary-color) !important;
  }
}
.follow-link.phone svg {
  padding: 2px;
}
.follow-link.site {
  width: auto;
  &:hover {
    color: var(--primary-color);
    text-decoration: underline;
  }
}

.share-button > *,
.follow-link > * {
  pointer-events: none;
}

.share-button {
  border: none;
  border-radius: 0;
  background: none;
}
</style>
