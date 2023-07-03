<script setup>
import { useCurrentUser, useCurrentUserProfile } from '~/composables/states'
import VFlexibleLink from '~/v2/src/components/VFlexibleLink.vue'

definePageMeta({
  middleware: 'check-auth',
})

const currentUser = useCurrentUser()
const currentUserProfile = useCurrentUserProfile()
</script>

<template>
  <div>
    <ClientOnly>
      <h1>Dashboard</h1>
      <div class="p-3 container">
        <h3 class="mb-4">Current User:</h3>
        <p class="mb-4">{{ currentUser }}</p>
        <h3 class="mb-4">User Profile Data:</h3>
        <p class="mb-4">{{ currentUserProfile }}</p>
      </div>
      <p class="mb-2 text-center">
        <VFlexibleLink to="/reset-password">
          change your password?
        </VFlexibleLink>
      </p>
    </ClientOnly>
  </div>
</template>
