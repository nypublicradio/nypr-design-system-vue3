<script setup>
import VNewPersistentPlayer from "~/v2/src/components/VNewPersistentPlayer.vue"
import VPersistentPlayer from "~/v2/src/components/VPersistentPlayer.vue"
import VSmartHeader from "~/v2/src/components/VSmartHeader.vue"
import { shallowRef } from "vue"
const headerHeight = shallowRef(110)
const heroBuffer = shallowRef(600)
//cssVar
const cssHeaderHeight = shallowRef(`${headerHeight.value}px`)
</script>

<template>
  <div class="layout layout-defualt">
    <header>
      <VSmartHeader :hero-buffer="heroBuffer" :resume-delay="0">
        <div>
          <ul
            class="inline-flex gap-4 w-full"
            style="background-color: antiquewhite; padding: 10px"
          >
            <li><NuxtLink to="/nuxt">Home</NuxtLink></li>
            <li><NuxtLink to="/about">About</NuxtLink></li>
            <li><NuxtLink to="/logout">Logout</NuxtLink></li>
            <li><NuxtLink to="/forgot-password">forgot-password</NuxtLink></li>
            <li><NuxtLink to="/reset-password">reset-password</NuxtLink></li>
          </ul>
        </div>
      </VSmartHeader>
    </header>
    <main>
      <slot />
    </main>
    <VNewPersistentPlayer
      data-style-mode="dark"
      :auto-play="false"
      :can-expand="true"
      :show-download="true"
      :hide-download-mobile="true"
      :can-expand-with-swipe="true"
      :can-unexpand-with-swipe="true"
      :can-click-anywhere="true"
      :show-skip="false"
      :hide-time-on-mobile="true"
      :marquee="true"
      :volume="1"
      title="The Takeaway"
      station="WNYC 93.9 FM"
      title-link="http://www.google.com"
      image="329534"
      description="This week, people in Tulsa filed a lawsuit demanding reparations for victims and descendants of the Tulsa Race Massacre."
      file="https://chrt.fm/track/53A61E/pdst.fm/e/www.podtrac.com/pts/redirect.mp3/audio.wnyc.org/radiolab_podcast/radiolab_podcast031822_stress.mp3"
    >
      <!-- <template #play>
        <i class="pi pi-twitter"></i>
      </template> -->
      <!-- file="https://fm939.wnyc.org/wnycfm" -->
      <!-- file="https://chrt.fm/track/53A61E/pdst.fm/e/www.podtrac.com/pts/redirect.mp3/audio.wnyc.org/radiolab_podcast/radiolab_podcast031822_stress.mp3" -->
      <template #expanded-content>
        <div class="p-3">
          this is where we would put anything in the expanded view
          <br />
          <br />
          <br />
          <br />
          <br />
          <br />
          <br />
          <br />
          <br />
          <br />
          <br />
          <br />
          <br />
          <br />
          <br />
          <br />
          <br />
          <br />
          <br />
          <br />
          <br />
          <br />
          <br />
          <br />
          <br />
          <br />
          <br />
          <br />
          <br />
          <br />
          <br />
          <br />
          <br />
          <br />
          <br />
          <br />
          <br />
          <br />
          <br />
          <br />
          <br />
          <br />
          <br />
          <br />
          <br />
          <br />
          <br />
          <br />
          <br />
          <br />
          <br />
          <br />
          <br />
          <br />
          <br />
          <br />
          <br />
          <br />
          <br />
          <br />
          this is wherewe would oput anything in the expanded view
          <br />
          <br />
          <br />
          <br />
          <br />
          <br />
          <br />
          <br />
        </div>
        <div class="expandedFooter">This is fixed to the bottom</div>
      </template>
    </VNewPersistentPlayer>
    <!-- <VPersistentPlayer
      data-style-mode="dark"
      :can-expand="true"
      :show-download="true"
      :hide-download-mobile="true"
      :can-expand-with-swipe="true"
      :can-unexpand-with-swipe="true"
      :show-skip="true"
      :livestream="false"
      title="The Takeaway"
      station="WNYC 93.9 FM"
      title-link="http://www.google.com"
      image="329534"
      description="This week, people in Tulsa filed a lawsuit demanding reparations for victims and descendants of the Tulsa Race Massacre."
      file="https://chrt.fm/track/53A61E/pdst.fm/e/www.podtrac.com/pts/redirect.mp3/audio.wnyc.org/radiolab_podcast/radiolab_podcast031822_stress.mp3"
    >
      <template #chevronDown>
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
      </template>
      <template #expanded-content>
        <div class="p-3">
          this is wherewe would oput anything in the expanded view
          <br />
          <br />
          <br />
          <br />
          <br />
          <br />
          <br />
          <br />
          <br />
          <br />
          <br />
          <br />
          <br />
          <br />
          <br />
          <br />
          <br />
          <br />
          <br />
          <br />
          <br />
          <br />
          <br />
          <br />
          <br />
          <br />
          <br />
          <br />
          <br />
          <br />
          <br />
          <br />
          <br />
          <br />
          <br />
          <br />
          <br />
          <br />
          <br />
          <br />
          <br />
          <br />
          <br />
          <br />
          <br />
          <br />
          <br />
          <br />
          <br />
          <br />
          <br />
          <br />
          <br />
          <br />
          <br />
          <br />
          <br />
          <br />
          <br />
          <br />
          this is wherewe would oput anything in the expanded view
          <br />
          <br />
          <br />
          <br />
          <br />
          <br />
          <br />
          <br />
        </div>
        <div class="expandedFooter">This is fixed to the bottom</div>
      </template>
    </VPersistentPlayer> -->
  </div>
</template>

<style lang="scss" scoped>
.layout-defualt {
  main {
    padding-top: v-bind(cssHeaderHeight);
  }

  .expandedFooter {
    background-color: red;

    display: block;
    position: fixed;
    height: 100px;
    bottom: 0;
    left: 0;
    width: 100%;
  }
}
</style>
