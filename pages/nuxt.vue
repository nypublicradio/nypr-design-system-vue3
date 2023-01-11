<script setup>
import VShareTools from '~/v2/src/components/VShareTools.vue'
import VShareToolsItem from '~/v2/src/components/VShareToolsItem.vue'
import VFlexibleLink from '~/v2/src/components/VFlexibleLink.vue'
import VCard from '~/v2/src/components/VCard.vue'
import VImageWithCaption from '~/v2/src/components/VImageWithCaption.vue'
import Home from '~/src/components/Home.vue'

const emitClick = (type,event) => {
  console.log('click = ', type)
  console.log('event = ', event)
}

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

            <div class="grid">
              <div class="col-12 p-fluid">
                <div class="card">
                  <h5>Card</h5>
                  <v-card
                    image="https://cms.demo.nypr.digital/images/212141/fill-%width%x%height%|format-jpeg|jpegquality-%quality%/"
                    title="Title with some <em>HTML</em>"
                    title-link="https://www.google.com"
                    subtitle="Subtitle"
                    :width="175"
                    :tags="[{ name: 'tag', slug: 'tag' }]"
                    :height="175"
                    :max-width="1440"
                    :max-height="2560"
                    credit="Credit Text Here"
                    credit-url="https://www.Credit-URL-Here.com"
                    @image-click="(e) => emitClick('image',e)"
                    @title-click="(e) => emitClick('title',e)"
                    @credit-click="(e) => emitClick('credit',e)"
                    @tag-click="(e) => emitClick('tag',e)"
                  >
                    <a href="https://primefaces.org/primevue/showcase/#/icons"
                      >Get icons here</a
                    >
                  </v-card>
                </div>
                <div class="card">
                  <h5>Image With Caption</h5>
                  <v-image-with-caption
                    alt-text="Fallback alt text here"
                    image="https://cms.prod.nypr.digital/images/328822/fill-%width%x%height%|format-jpeg|jpegquality-%quality%/"
                    caption="Caption Here"
                    credit="Credit Text Here"
                    credit-url="https://www.Credit-URL-Here.com"
                    title="Title Text Here"
                    description="Description Text Here"
                    :allow-preview="true"
                    :width="600"
                    :height="400"
                  />
                </div>
              </div>
            </div>
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
@import '../src/App.scss';
.dark-mode-section {
  padding: 3rem 0;
  background-color: var(--surface-card);
  .content {
    padding: 1rem 2rem;
  }
}
</style>
