<template>
  <div>
    <div>Home Page</div>
    <!-- <v-simple-responsive-image
      alt="Fallback alt text here"
      src="https://cms.prod.nypr.digital/images/328822/fill-%width%x%height%|format-jpeg|jpegquality-%quality%/"
      :width="600"
      :height="400"
      :allow-vertical-effect="false"
      allow-preview
    />-->
    <v-persistent-player
      title="The Takeaway"
      station="WNYC 93.9 FM"
      title-link="http://www.google.com"
      image="https://cms.prod.nypr.digital/images/329534/fill-%width%x%height%|format-jpeg|jpegquality-%quality%/"
      description="This week people in Tulsa filed a lawsuit demanding reparations for victims and descendants of the Tulsa Race Massacre."
      file="https://chrt.fm/track/53A61E/pdst.fm/e/www.podtrac.com/pts/redirect.mp3/audio.wnyc.org/radiolab_podcast/radiolab_podcast031822_stress.mp3"
      :show-download="true"
      :can-minimize="true"
    />
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import VSimpleResponsiveImage from '../v2/src/components/VSimpleResponsiveImage.vue'
import VPersistentPlayer from '../v2/src/components/VPersistentPlayer.vue'


// import VAudioPlayerSystem from '~/v2/src/components/VAudioPlayerSystem'
// import VTag from '~/v2/src/components/VTag'
// import VSimpleResponsiveImage from '~/v2/src/components/VSimpleResponsiveImage'
// import VButton from '~/v1/src/components/src/components/VButton'
// import VPerson from '~/v1/src/components/src/components/VPerson'

const props = defineProps({})


</script>

<style lang="scss"></style>
