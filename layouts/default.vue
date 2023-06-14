<script setup>
import { ref, computed, onMounted } from 'vue'
import VSmartHeader from '~/v2/src/components/VSmartHeader.vue'
import { useScroll } from '@vueuse/core'

let scroll = useScroll()
onMounted(() => {
  scroll = useScroll(document.body)
  console.log('mounted')
})
</script>

<template>
  <div class="layout layout-defualt">
    <VSmartHeader :height="80">
      <ul style="background-color: antiquewhite; padding: 10px">
        <li><NuxtLink to="/nuxt">Home</NuxtLink></li>
        <li><NuxtLink to="/about">About</NuxtLink></li>
      </ul>
      {{ scroll }}
    </VSmartHeader>
    <main>
      <slot />
    </main>
  </div>
</template>

<style lang="scss" scoped>
.layout-defualt {
}
</style>
