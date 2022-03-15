<script setup>
import { computed, defineAsyncComponent } from 'vue'

const emit = defineEmits(['share', 'follow'])

const icons = {
  email: "EmailIcon",
  phone: "PhoneIcon",
  facebook: "FacebookIcon",
  instagram: "InstagramIcon",
  linkedin: "LinkedinIcon",
  newsletter: "EmailIcon",
  reddit: "RedditIcon",
  spotify: "SpotifyIcon",
  twitter: "TwitterIcon",
  youtube: "YoutubeIcon",
}


const URL_PLACEHOLDER_PATTERN = new RegExp('%URL%', 'g')
const SOCIAL_SERVICE_MAP = {
  spotify: {
    profileBase: 'https://open.spotify.com/playlist/'
  },
  facebook: {
    profileBase: 'https://www.facebook.com/',
    shareBase: 'https://www.facebook.com/sharer.php',
    urlKey: 'u'
  },
  linkedin: {
    profileBase: 'https://www.linkedin.com/in/',
    shareBase: 'https://www.linkedin.com/sharing/share-offsite/'
  },
  twitter: {
    profileBase: 'https://twitter.com/',
    shareBase: 'https://twitter.com/intent/tweet'
  },
  reddit: {
    profileBase: 'https://www.reddit.com/r/',
    shareBase: 'https://www.reddit.com/submit'
  },
  instagram: {
    profileBase: 'https://www.instagram.com/'
  },
  youtube: {
    profileBase: 'https://www.youtube.com/channel/'
  },
  email: {
    profileBase: 'mailto:',
    shareBase: 'mailto:',
    omitUrl: true
  },
  phone: {
    profileBase: 'tel:',
    shareBase: 'tel:',
    omitUrl: true
  }
}

const props = defineProps({
  action: {
    type: String,
    default: 'follow'
  },
  service: {
    type: String,
    default: ''
  },
  username: {
    type: String,
    default: null
  },
  label: {
    type: String,
    default: null
  },
  link: {
    type: String,
    default: null
  },
  url: {
    type: String,
    default: null
  },
  shareParameters: {
    type: Object,
    default: () => ({})
  },
  utmParameters: {
    type: Object,
    default: () => ({})
  }
})

const getServiceComponent = computed(() => defineAsyncComponent(() => import("../../../assets-shared/icons/" + icons[props.service] + ".vue")))

const socialLink = computed(() => {
  return SOCIAL_SERVICE_MAP[props.service]?.profileBase + props.username || ''
})
const shareBase = computed(() => {
  return SOCIAL_SERVICE_MAP[props.service]?.shareBase || ''
})
const shareUrl = computed(() => {
  const utmParams = Object.entries(props.utmParameters).map(
    ([key, value]) => {
      return 'utm_' + key + '=' + encodeURIComponent(value)
    }
  )
  let url = props.url
  if (utmParams.length > 0) {
    url = url + '?' + utmParams.join('&')
  }

  const shareParams = Object.entries(props.shareParameters).map(
    ([key, value]) => {
      return (
        key +
        '=' +
        encodeURIComponent(value.replace(URL_PLACEHOLDER_PATTERN, url))
      )
    }
  )

  let params = shareParams

  const shouldOmitUrl = SOCIAL_SERVICE_MAP[props.service]?.omitUrl
  if (!shouldOmitUrl) {
    const urlKey = SOCIAL_SERVICE_MAP[props.service]?.urlKey || 'url'
    const urlParam = urlKey + '=' + encodeURIComponent(url)
    params = [urlParam, ...params]
  }

  return shareBase.value + '?' + params.join('&')
})
const ariaLabel = computed(() => {
  if (props.label) {
    return props.label
  } else if (props.action === 'follow') {
    return 'Follow us on ' + props.service
  } else if (props.action === 'share') {
    return 'Share on ' + props.service
  }
  return ''
})

const share = () => {
  if (!props.service) {
    return
  }

  emit('share', props.service)

  // get the position of the popup window   
  function getPopupPosition() {
    const screenLeft = screen.availLeft
    const screenTop = screen.availTop

    const windowWidth = screen.availWidth
    const windowheight = screen.availHeight

    const left = windowWidth / 2 - 600 / 2 + screenLeft
    const top = windowheight / 2 - 600 / 2 + screenTop

    return { left: left, top: top }
  }

  // get the position of the window
  const windowString = ({ top, left }) =>
    `location=no,toolbar=no,menubar=no,scrollbars=no,status=no,width=550,height=600,top=${top},left=${left}`
  const popupPosition = getPopupPosition()
  const newWindow = window.open(
    shareUrl,
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
    :href="username ? socialLink : link"
    class="follow-link c-share-tools__link"
    :class="service"
    :aria-label="ariaLabel"
    :target="service !== 'phone' ? '_blank' : '_self'"
    rel="noopener noreferrer"
    :title="username ? socialLink : link"
    @click="emit('follow', service)"
  >
    <component :is="getServiceComponent" v-if="service !== 'site'" />
    <span v-else>{{ label }}</span>
  </a>

  <button v-else-if="action === 'share'" class="share-button" @click="share">
    <component :is="getServiceComponent" />
  </button>
</template>



<style lang="scss" >
.share-button,
.follow-link,
.follow-link svg,
.share-button svg {
  width: 24px;
  height: 24px;

  @include media("<sm") {
    width: 30px;
    height: 30px;
  }
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
