<template>
  <div>
    <div>Home Page</div>
    <v-simple-responsive-image
      alt="Fallback alt text here"
      src="https://cms.prod.nypr.digital/images/328822/fill-%width%x%height%|format-jpeg|jpegquality-%quality%/"
      :width="600"
      :height="400"
      :allow-vertical-effect="false"
      allow-preview
    />
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import VSimpleResponsiveImage from '../v2/src/components/VSimpleResponsiveImage.vue'


// import VAudioPlayerSystem from '~/v2/src/components/VAudioPlayerSystem'
// import VTag from '~/v2/src/components/VTag'
// import VSimpleResponsiveImage from '~/v2/src/components/VSimpleResponsiveImage'
// import VButton from '~/v1/src/components/src/components/VButton'
// import VPerson from '~/v1/src/components/src/components/VPerson'

const props = defineProps({})


</script>

<style lang="scss"></style>
