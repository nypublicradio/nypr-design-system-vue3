<template>
  <Lottie
    class="live-indicator-dot"
    :options="defaultOptions"
  />
</template>

<script>
import * as animationData from './LiveIndicatorDotJson.json'
import Lottie from 'vue-lottie/src/lottie.vue'

export default {
  name: 'LiveIndicatorDot',
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

<style lang="scss">
.live-indicator-dot,
.live-indicator-dot path {
  fill: #e74f4f;
}
</style>
