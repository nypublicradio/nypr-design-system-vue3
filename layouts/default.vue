<script setup>
import { shallowRef } from 'vue'
import VSmartHeader from '~/v2/src/components/VSmartHeader.vue'
import VPersistentPlayer from '~/v2/src/components/VPersistentPlayer.vue'
const headerHeight = shallowRef(76)
const heroBuffer = shallowRef(600)
//cssVar
const cssHeaderHeight = shallowRef(headerHeight.value + 'px')
</script>

<template>
  <div class="layout layout-defualt">
    <VSmartHeader :hero-buffer="heroBuffer" :resume-delay="0">
      <div>
        <ul style="background-color: antiquewhite; padding: 10px">
          <li><NuxtLink to="/nuxt">Home</NuxtLink></li>
          <li><NuxtLink to="/about">About</NuxtLink></li>
        </ul>
      </div>
    </VSmartHeader>
    <main>
      <slot />
    </main>
    <!-- <VPersistentPlayer
      data-style-mode="dark"
      :can-minimize="true"
      :show-download="true"
      :hide-download-mobile="false"
      :show-skip="true"
      :livestream="false"
      title="The Takeaway"
      station="WNYC 93.9 FM"
      title-link="http://www.google.com"
      image="329534"
      description="This week, people in Tulsa filed a lawsuit demanding reparations for victims and descendants of the Tulsa Race Massacre."
      file="https://chrt.fm/track/53A61E/pdst.fm/e/www.podtrac.com/pts/redirect.mp3/audio.wnyc.org/radiolab_podcast/radiolab_podcast031822_stress.mp3"
    > -->
    <!-- <template #chevronDown>
        <i class="pi pi-twitter"></i>
      </template>
      <template #chevronUp>
        <i class="pi pi-facebook"></i>
      </template>
      <template #volumeOn>
        <i class="pi pi-twitter"></i>
      </template>
      <template #volumeOff>
        <i class="pi pi-facebook"></i>
      </template>
      <template #prev>
        <i class="pi pi-twitter"></i>
      </template>
      <template #play>
        <i class="pi pi-twitter"></i>
      </template>
      <template #pause>
        <i class="pi pi-facebook"></i>
      </template>
      <template #loading>
        <i class="pi pi-spin pi-spinner"></i>
      </template>
      <template #skip>
        <i class="pi pi-twitter"></i>
      </template>
      <template #download>
        <i class="pi pi-twitter"></i>
      </template> -->
    <!-- </VPersistentPlayer> -->
  </div>
</template>

<style lang="scss" scoped>
.layout-defualt {
  main {
    padding-top: v-bind(cssHeaderHeight);
  }
}
</style>
