<script setup>
import { shallowRef } from 'vue'
import VSmartHeader from '~/v2/src/components/VSmartHeader.vue'

const headerHeight = shallowRef(76)
const heroBuffer = shallowRef(600)
//cssVar
const cssHeaderHeight = shallowRef(headerHeight.value + 'px')
</script>

<template>
  <div class="layout layout-defualt">
    <VSmartHeader
      :hero-buffer="heroBuffer"
      :resume-delay="0"
      window-class="testWindow"
    >
      <div>
        <ul style="background-color: antiquewhite; padding: 10px">
          <li><NuxtLink to="/nuxt">Home</NuxtLink></li>
          <li><NuxtLink to="/about">About</NuxtLink></li>
        </ul>
      </div>
    </VSmartHeader>
    <div
      class="testWindow"
      style="height: 500px; overflow: scroll; background-color: red"
    >
      <br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br />
    </div>
    <main>
      <slot />
    </main>
  </div>
</template>

<style lang="scss" scoped>
.layout-defualt {
  main {
    padding-top: v-bind(cssHeaderHeight);
  }
}
</style>
