<script setup>
import Home from '~/src/components/Home.vue'
import VCard from '~/v2/src/components/VCard.vue'
import VFlexibleLink from '~/v2/src/components/VFlexibleLink.vue'
//import VImageWithCaption from '~/v2/src/components/VImageWithCaption.vue'
import VImage from '~/v2/src/components/VImage.vue'
import VImageCaption from '~/v2/src/components/VImageCaption.vue'
import VImageGallery from '~/v2/src/components/VImageGallery.vue'
import VImagePublisher from '~/v2/src/components/VImagePublisher.vue'
import VPerson from '~/v2/src/components/VPerson.vue'
//import VPersistentPlayer from '~/v2/src/components/VPersistentPlayer.vue'
import VShareTools from '~/v2/src/components/VShareTools.vue'
import VShareToolsItem from '~/v2/src/components/VShareToolsItem.vue'
import VLoginWithProvider from '~/v2/src/components/supabase/VLoginWithProvider.vue'

//import defaultUserPhoto from 'default-user.jpg'

const emitClick = (type, event) => {
  //console.log('click = ', type)
  //console.log('event = ', event)
}
const showImage = ref(false)

const doSomethingOnLoad = () => {
  showImage.value = true
  console.log('doSomethingOnLoad')
}
const profileFromArticle = {
  biography:
    'Lorem ipsum <b>dolor</b> sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat.',
  email: 'scoboco@gmail.com',
  firstName: 'Scott',
  id: 19,
  jobTitle: 'Photojournalist',
  lastName: 'Lynch',
  link: 'https://www.sponsoredLink.com',
  logo: '/default-sponsor.png',
  name: 'Scott Lynch',
  phone_numbers: [
    {
      phone_number: '9731231234',
    },
    {
      phone_number: '2011231234',
    },
  ],
  photoID: 327700,
  slug: 'scott-lynch',
  socialMediaProfile: [
    {
      profileUrl: 'https://www.instagram.com/scoboco/',
      service: 'instagram',
    },
    {
      profileUrl: 'https://twitter.com/Scoboco',
      service: 'twitter',
    },
  ],
  url: '/staff/scott-lynch',
  website: 'http://t.co/Np4U39BYlh',
}
const profileFromArticleNoPhoto = {
  biography:
    'Lorem ipsum <b>dolor</b> sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat.',
  email: 'scoboco@gmail.com',
  firstName: 'Scott',
  id: 19,

  jobTitle: 'Photojournalist',
  lastName: 'Lynch',
  link: 'https://www.sponsoredLink.com',
  logo: '/default-sponsor.png',
  name: 'Scott Lynch',
  phone_numbers: [
    {
      phone_number: '9731231234',
    },
    {
      phone_number: '2011231234',
    },
  ],
  slug: 'scott-lynch',
  socialMediaProfile: [
    {
      profileUrl: 'https://www.instagram.com/scoboco/',
      service: 'instagram',
    },
    {
      profileUrl: 'https://twitter.com/Scoboco',
      service: 'twitter',
    },
  ],
  url: '/staff/scott-lynch',
  website: 'http://t.co/Np4U39BYlh',
}
</script>

<template>
  <div class="pb-8">
    <div style="max-width: 1024px; margin: 0 auto">
      <VLoginWithProvider provider="google"/>
      <VLoginWithProvider provider="twitter" class="my-2"/>
      <VLoginWithProvider provider="apple" class="my-2"/>
      <VLoginWithProvider provider="google" label="This is a custom label" class="my-2"/>
      <VLoginWithProvider provider="google" class="p-button-rounded my-2"/>
      <VLoginWithProvider provider="google" class="p-button-outlined my-2"/>

      <VLoginWithProvider provider="google" class="p-button-rounded my-2">
        <template #icon>XX</template>
      </VLoginWithProvider>

    </div>
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
            <ClientOnly>
              <home />
            </ClientOnly>
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
              <ClientOnly>
                <home />
              </ClientOnly>
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
  background-color: #000;
  .content {
    padding: 1rem 2rem;
  }
}
</style>
