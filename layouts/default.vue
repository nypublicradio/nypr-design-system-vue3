<script setup>
import { ref, computed, onMounted } from 'vue'
import VSmartHeader from '~/v2/src/components/VSmartHeader.vue'
</script>

<template>
  <div class="layout layout-defualt">
    <VSmartHeader :height="80">
      <ul style="background-color: antiquewhite; padding: 10px">
        <li><NuxtLink to="/nuxt">Home</NuxtLink></li>
        <li><NuxtLink to="/about">About</NuxtLink></li>
      </ul>
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
