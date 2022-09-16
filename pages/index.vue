<script setup>
import VShareTools from '/v2/src/components/VShareTools.vue'
import VShareToolsItem from '/v2/src/components/VShareToolsItem.vue'
import VFlexibleLink from '/v2/src/components/VFlexibleLink.vue'
import VCard from '~~/v2/src/components/VCard.vue'
import Home from '/src/components/Home.vue'
import { onBeforeMount, ref } from 'vue'
</script>

<template>
  <div>
    <section>
      <div class="content lg:px-8 pb-0">
        <div class="grid">
          <div class="col-12">
            <h1 id="defaultmode" class="h2">
              Default mode
              <span style="font-size: 1rem"
                ><a href="#darkmode">jump to DARK MODE</a></span
              >
            </h1>

            <v-share-tools>
              <v-share-tools-item
                service="site"
                link="https://www.sample.com"
              />
              <v-share-tools-item service="facebook" username="gothamist" />
              <v-share-tools-item service="twitter" username="gothamist" />
              <v-share-tools-item service="instagram" username="gothamist" />
              <v-share-tools-item
                service="youtube"
                username="UCY_2VeS5Q9_sMZRhtvF0c5Q"
              />
            </v-share-tools>
            <v-flexible-link to="https://www.google.com"
              >google</v-flexible-link
            >
            <br />
            <br />
            <client-only>
              <home />
            </client-only>
            <h1 id="darkmode" class="h2">
              Dark mode
              <span style="font-size: 1rem"
                ><a href="#defaultmode">jump to DEFAULT MODE</a></span
              >
            </h1>
            <div data-style-mode="dark" class="dark-mode-section">
              <div class="content">
                <v-flexible-link to="https://www.google.com"
                  >google dark</v-flexible-link
                >
              </div>
              <client-only>
                <home />
              </client-only>
            </div>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<style lang="scss">
@import '../src/App';
.dark-mode-section {
  padding: 3rem 0;
  background-color: var(--surface-card);
  .content {
    padding: 1rem 2rem;
  }
}
</style>
