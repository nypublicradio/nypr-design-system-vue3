<script setup>
import VInputSwitch from '../v2/src/components/VInputSwitch.vue'
import VInputSwitch2 from '../v2/src/components/VInputSwitch2.vue'
// auth
import { useCurrentUser } from '~/composables/states'
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
import VLoginWithEmail from '~/v2/src/components/supabase/VLoginWithEmail.vue'
import VLoginWithMagicLink from '~/v2/src/components/supabase/VLoginWithMagicLink.vue'
import VLoginWithProvider from '~/v2/src/components/supabase/VLoginWithProvider.vue'
import VSignupWithEmail from '~/v2/src/components/supabase/VSignupWithEmail.vue'
import { onMounted } from 'vue'

definePageMeta({
  middleware: 'check-auth-session-home-page',
})
// //auth
// const config = useRuntimeConfig()
// const currentUser = useCurrentUser()
// const client = useSupabaseClient()
// const user = await client.auth.getSession()
// // definePageMeta({
// //   layout: 'blank',
// // })

// // check local storage for the auth token
// if (process.client) {
//   const supabaseAuthToken = JSON.parse(
//     localStorage.getItem(config.supabaseAuthTokenName)
//   )
//   if (supabaseAuthToken) {
//     currentUser.value = supabaseAuthToken.user
//   }

//   // check supabase session for logged in user
//   if (user?.data?.session?.user) {
//     currentUser.value = user?.data?.session?.user
//   }

//   // redirect to dashboard if the user is logged in
//   if (currentUser.value) {
//     await navigateTo('/dashboard')
//   }

//   // sometimes the supabase token doesn't get detected right away when magic links are used
//   // i don't think we should have to do this, but here we are
//   setTimeout(async () => {
//     // check if the user is logged in
//     if (user?.data?.session?.user) {
//       currentUser.value = user?.data?.session?.user
//     }
//     // redirect to dashboard if the user is logged in
//     if (currentUser.value) {
//       //console.log('currentUser setTimeout found', currentUser.value)
//       await navigateTo('/dashboard')
//     }
//   }, 1000)
// }

//END auth

const emitClick = (type, event) => {
  //console.log('click = ', type)
  //console.log('event = ', event)
}
</script>

<template>
  <div class="pb-8">
    <div style="max-width: 1024px; margin: 0 auto">
      <VInputSwitch />
      <VInputSwitch yes="AMAZING" no="NOPE" no-width="60px" yes-width="84px" />
      <VInputSwitch yes="AMAZING" no="NOPE" width="84px" />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <VInputSwitch2 />
      <VInputSwitch2 yes="AMAZINGGGGGGGG" no="NOPERS" />
      <VInputSwitch2 yes="AMAZINGGGGGGGG" no="STATIC" static />
      <VSignupWithEmail />
      <!-- <br />
      <br />
      <VLoginWithMagicLink />
      <br />
      <br />
      <VSignupWithEmail>
        <template #success>
          <VLoginWithEmail />
        </template>
      </VSignupWithEmail>
      <br />
      <br /><br />
      <br /><br />
      <br /><br />
      <br />
      <Divider class="my-4" align="center">
        <b>Or</b>
      </Divider>
      <VLoginWithEmail />
      <p class="my-2 text-center">
        Don't have an account?
        <VFlexibleLink to="/onboarding">Register here</VFlexibleLink>
      </p>
      <p class="mb-2 text-center">
        <VFlexibleLink to="/forgot-password">Forgot password?</VFlexibleLink>
      </p> -->
      <!-- 
      <Divider class="my-4" align="center">
        <b>Or</b>
      </Divider>
      <VLoginWithMagicLink />
      <br />
      <br />
      <VLoginWithMagicLink class="p-button-rounded" />
      <br />
      <br />
      <VLoginWithMagicLink><template #icon>XX</template></VLoginWithMagicLink>
      <Divider class="my-4" align="center">
        <b>Or</b>
      </Divider>
      <VLoginWithProvider provider="google" />
      <VLoginWithProvider provider="twitter" class="my-2" />
      <VLoginWithProvider provider="apple" class="my-2" />
      <VLoginWithProvider
        provider="google"
        label="This is a custom label"
        class="my-2"
      />
      <VLoginWithProvider provider="google" class="p-button-rounded my-2" />
      <VLoginWithProvider provider="google" class="p-button-outlined my-2" />

      <VLoginWithProvider provider="google" class="p-button-rounded my-2">
        <template #icon>XX</template>
      </VLoginWithProvider>
      -->
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
