<template>
  <Lottie :options="defaultOptions" />
</template>

<script>
import * as animationData from './AudioWaveIsActiveJson.json'
import Lottie from 'vue-lottie/src/lottie.vue'

export default {
  name: 'AudioWaveIsActive',
  components: {
    Lottie
  },
  data () {
    return {
      defaultOptions: {
        animationData: animationData.default
      }
    }
  }
}
</script>
