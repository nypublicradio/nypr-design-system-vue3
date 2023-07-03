<script setup>
import VLoginWithMagicLink from '../v2/src/components/supabase/VLoginWithMagicLink.vue'

definePageMeta({
  layout: 'blank',
})
</script>
<template>
  <div class="text-center">
    <h1 class="mb-6">Forgot your password?</h1>
    <p class="mb-4 w-7 m-auto">
      Please enter your email address below and a magic link will be sent to
      you. Once you click on the magic link and are logged in, you may reset
      your password on your account settings page.
    </p>
    <VLoginWithMagicLink />
  </div>
</template>
