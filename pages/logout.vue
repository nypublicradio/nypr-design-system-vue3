<template>
  <div class="text-center">
    <p class="mb-2">
      You have been logged out.
      <nuxt-link to="/nuxt">Click here to return to the login page.</nuxt-link>
    </p>
  </div>
</template>

<script setup>
import { useCurrentUser, useCurrentUserProfile } from '~/composables/states'

definePageMeta({
  layout: 'blank',
})

// sign out from supabase
const client = useSupabaseClient()
const { error } = await client.auth.signOut()
if (error) {
  console.log('error')
}

// set the currentUser composable to null
const currentUser = useCurrentUser()
currentUser.value = null

// set the currentUserProfile composable to null
const currentUserProfile = useCurrentUserProfile()
currentUserProfile.value = null

// clear localStorage
localStorage.clear()
</script>
