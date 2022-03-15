<template>
  <Lottie
    class="loading-icon"
    :options="defaultOptions"
  />
</template>

<script>
import * as animationData from './LoadingIconJson.json'
import Lottie from 'vue-lottie/src/lottie.vue'

export default {
  name: 'LoadingIcon',
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
