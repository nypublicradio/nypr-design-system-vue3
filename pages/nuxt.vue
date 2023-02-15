<script setup>
import VPerson from '~/v2/src/components/VPerson.vue'
import VPersistentPlayer from '~/v2/src/components/VPersistentPlayer.vue'
import VShareTools from '~/v2/src/components/VShareTools.vue'
import VShareToolsItem from '~/v2/src/components/VShareToolsItem.vue'
import VFlexibleLink from '~/v2/src/components/VFlexibleLink.vue'
import VCard from '~/v2/src/components/VCard.vue'
import VImageWithCaption from '~/v2/src/components/VImageWithCaption.vue'
import Home from '~/src/components/Home.vue'

const emitClick = (type, event) => {
  //console.log('click = ', type)
  //console.log('event = ', event)
}

const block = ref({
  type: 'image',
  value: {
    image: {
      id: 336706,
      title: 'FTVDAY021423_Gabriela-Bhaskar-0334.jpg',
      width: 3000,
      height: 2000,
      createdAt: '2022-03-24T17:18:54.828125-04:00',
      focalPointX: null,
      focalPointY: null,
      focalPointWidth: null,
      focalPointHeight: null,
      fileSize: 4464794,
      fileHash: 'abbbe9be96a1f501da9ee298550e2c2ab55bed46',
      alt: 'A photo of a "Vote Yes" banner held by Amazon union organizers.',
      caption:
        'Amazon union organizers rally for a union ahead of a vote that begins Friday.',
      credit: 'Gwynne Hogan/Gothamist',
      creditLink: '',
      file: 'https://cdn.cms.demo.nypr.digital/original_images/FTVDAY021423_Gabriela-Bhaskar-0334.original.jpg',
      usageLimitations: '',
      expiryDate: null,
      collection: 1,
      uploadedByUser: 123,
    },
    caption: 'VOTE YES! This is a caption override. YAY!',
  },
  id: '7a907edf-af2b-43a2-8d64-dea6d196a8ee',
})
</script>

<template>
  <main class="pb-8">
    <v-image-with-caption
      v-if="block.value.image"
      class="mb-7"
      :image="useImageUrl(block.value.image)"
      :alt-text="block.value.image.alt"
      :maxWidth="block.value.image.width"
      :maxHeight="block.value.image.height"
      :description="block.value.caption || block.value.image.caption"
      :credit="block.value.image.credit"
      :credit-url="block.value.image.creditLink"
      :sizes="[2]"
      :ratio="[block.value.image.width, block.value.image.height]"
    />
    <v-persistent-player
      data-style-mode="dark"
      :livestream="true"
      title="The Takeaway"
      station="WNYC 93.9 FM"
      title-link="http://www.google.com"
      image="https://cms.prod.nypr.digital/images/329534/fill-%width%x%height%|format-jpeg|jpegquality-%quality%/"
      description="This week, people in Tulsa filed a lawsuit demanding reparations for victims and descendants of the Tulsa Race Massacre."
      file="https://chrt.fm/track/53A61E/pdst.fm/e/www.podtrac.com/pts/redirect.mp3/audio.wnyc.org/radiolab_podcast/radiolab_podcast031822_stress.mp3"
    />
    <section class="pb-8">
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

            <div class="mb-8" />

            <h1 class="h1">H1 Header Text</h1>
            <h2 class="h2">H2 Header Text</h2>
            <h3 class="h3">H3 Header Text</h3>
            <h4 class="h4">H4 Header Text</h4>
            <h5 class="h5">H5 Header Text</h5>
            <h6 class="h6">H6 Header Text</h6>

            <div class="mb-8" />

            <div class="grid">
              <div class="col-12 p-fluid">
                <div class="card">
                  <v-card
                    image="https://media.wnyc.org/i/240/240/l/80/2020/06/AllOfIt.png"
                    title="Title with some <em>HTML</em>"
                    title-link="https://www.google.com"
                    loading="eager"
                    :width="240"
                    :height="240"
                    :max-width="240"
                    :max-height="240"
                    @image-click="(e) => emitClick('image', e)"
                    @title-click="(e) => emitClick('title', e)"
                    @credit-click="(e) => emitClick('credit', e)"
                    @tag-click="(e) => emitClick('tag', e)"
                  >
                    <p>
                      All Of It with Alison Stewart is a live daily conversation
                      about culture and the culture in and around New York City.
                      Follow All Of It on
                      <a
                        href="https://www.instagram.com/allofitwnyc/?hl=en"
                        target="_blank"
                        rel="noopener noreferrer"
                        >Instagram</a
                      >.
                    </p>
                    <Button label="Listen Live" icon="pi pi-play" />
                  </v-card>
                </div>

                <div class="mb-8" />

                <div class="grid align-items-center">
                  <div class="col-12 lg:col-3">
                    <v-person
                      image="https://media.wnyc.org/i/1860/1240/l/80/2020/10/NYPR_020819_1161_R1_silo_layers-Alison-Stewart.jpg"
                      full-name="Alison Stewart"
                      role="Host"
                    />
                  </div>
                  <div class="col-1 hidden lg:flex justify-content-center">
                    <div class="divider" />
                  </div>
                  <div class="col-12 lg:col-3">
                    <p class="text-sm">Connect with the show!</p>
                    <v-share-tools>
                      <v-share-tools-item
                        service="site"
                        link="https://www.sample.com"
                      />
                      <v-share-tools-item
                        service="facebook"
                        username="gothamist"
                      />
                      <v-share-tools-item
                        service="twitter"
                        username="gothamist"
                      />
                      <v-share-tools-item
                        service="instagram"
                        username="gothamist"
                      />
                      <v-share-tools-item
                        service="youtube"
                        username="UCY_2VeS5Q9_sMZRhtvF0c5Q"
                      />
                    </v-share-tools>
                  </div>
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
  </main>
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
