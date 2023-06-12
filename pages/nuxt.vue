<script setup>
import VPerson from '~/v2/src/components/VPerson.vue'
//import VPersistentPlayer from '~/v2/src/components/VPersistentPlayer.vue'
import VShareTools from '~/v2/src/components/VShareTools.vue'
import VShareToolsItem from '~/v2/src/components/VShareToolsItem.vue'
import VFlexibleLink from '~/v2/src/components/VFlexibleLink.vue'
import VCard from '~/v2/src/components/VCard.vue'
//import VImageWithCaption from '~/v2/src/components/VImageWithCaption.vue'
import VImage from '~/v2/src/components/VImage.vue'
import Home from '~/src/components/Home.vue'

const emitClick = (type, event) => {
  //console.log('click = ', type)
  //console.log('event = ', event)
}

const doSomethingOnLoad = () => {
  console.log('doSomethingOnLoad')
}

const profileFromArticle = {
  id: 19,
  firstName: 'Scott',
  lastName: 'Lynch',
  name: 'Scott Lynch',
  photoID: 327700,
  jobTitle: 'Photojournalist',
  biography:
    'Lorem ipsum <b>dolor</b> sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat.',
  website: 'http://t.co/Np4U39BYlh',
  phone_numbers: [
    {
      phone_number: '9731231234',
    },
    {
      phone_number: '2011231234',
    },
  ],
  email: 'scoboco@gmail.com',
  slug: 'scott-lynch',
  url: '/staff/scott-lynch',
  link: 'https://www.sponsoredLink.com',
  logo: 'images/default-sponsor.png',
  socialMediaProfile: [
    {
      service: 'instagram',
      profileUrl: 'https://www.instagram.com/scoboco/',
    },
    {
      service: 'twitter',
      profileUrl: 'https://twitter.com/Scoboco',
    },
  ],
}
</script>

<template>
  <main class="pb-8">
    <div style="max-width: 1024px; margin: 0 auto">
      <VCard
        image-src="329944"
        title="Title with some <em>HTML</em>"
        link="https://www.google.com"
        subtitle="Subtitle"
        blurb="Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum."
        :width="300"
        :height="200"
      />
      <div class="grid">
        <div class="col-12 md:col-6">
          <VCard
            image-src="329944"
            title="Title with some <em>HTML</em>"
            link="https://www.google.com"
            subtitle="Subtitle"
            blurb="Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum."
            :width="168"
            :height="112"
            sizes="md:274px lg:168px"
          />
        </div>
        <div class="col-12 md:col-6">
          <VCard
            image-src="329944"
            title="Title with some <em>HTML</em>"
            link="https://www.google.com"
            subtitle="Subtitle"
            blurb="Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum."
            :width="168"
            :height="112"
            sizes="md:274px lg:18px"
          />
        </div>
      </div>
      <div class="grid">
        <div class="col-12 md:col-6">
          <VPerson
            :profile-data="profileFromArticle"
            sizes="xs:30 sm:100 md:200"
          />
        </div>
        <div class="col-12 md:col-6">
          <VPerson
            :profile-data="profileFromArticle"
            sizes="xs:30 sm:100 md:200"
          />
        </div>
      </div>
      <div class="grid">
        <div class="col-6">
          <VImage
            src="329836"
            alt="this is alt text"
            :width="700"
            :height="400"
            :max-width="2598"
            :max-height="3484"
            allow-preview
            sizes="xs:400px md:800px"
            :allow-vertical-effect="true"
            format="jpeg"
            :quality="85"
            @load="doSomethingOnLoad"
            @click="doSomethingOnLoad"
            @keypress="doSomethingOnLoad"
          />
        </div>
        <div class="col-6">
          <VImage
            src="329944"
            alt="this is alt text"
            :width="400"
            sizes="xs:400px md:800px"
            format="jpeg"
            :quality="85"
            @load="doSomethingOnLoad"
          />
        </div>
        <div class="col-6">
          <VImage
            src="329944"
            alt="this is alt text"
            :width="400"
            :height="400"
            sizes="xs:400px md:800px"
            format="jpeg"
            :quality="85"
            :modifiers="{ focusZoom: '100' }"
            @load="doSomethingOnLoad"
          />
        </div>
        <div class="col-6">
          <VImage
            src="329944"
            alt="this is alt text"
            :width="400"
            allow-preview
            sizes="xs:400px md:800px"
            format="jpeg"
            :quality="85"
            @load="doSomethingOnLoad"
          >
            <template #closeicon>@</template>
          </VImage>
        </div>
        <div class="col-6">
          <VImage
            src="329944"
            alt="this is alt text"
            :width="400"
            allow-preview
            sizes="xs:400px md:800px"
            format="jpeg"
            :quality="85"
            @load="doSomethingOnLoad"
          >
            <template #enlargeButton="slotProps"
              ><Button
                icon="pi pi-youtube"
                aria-label="Enlarge Image"
                @click="slotProps.enlargeFunc"
              ></Button
            ></template>
          </VImage>
        </div>
      </div>
      <NuxtImg src="images/default-sponsor.jpg" height="400" />
    </div>

    <!--  <VFlexibleLink to="https://www.google.com">go to google</VFlexibleLink>
    <VFlexibleLink raw to="https://www.google.com"
      ><Button label="button"></Button
    ></VFlexibleLink> -->

    <!--   <v-persistent-player
      data-style-mode="dark"
      :can-minimize="true"
      :show-download="true"
      :show-skip="true"
      :livestream="false"
      title="The Takeaway"
      station="WNYC 93.9 FM"
      title-link="http://www.google.com"
      image="https://cms.prod.nypr.digital/images/329534/fill-%width%x%height%|format-jpeg|jpegquality-%quality%/"
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
      </template> 
    </v-persistent-player>-->
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
  </main>
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
