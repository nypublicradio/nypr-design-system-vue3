<template>
  <div class="text-center">
    <p class="mb-2">
      You have been logged out.
      <nuxt-link to="/nuxt">Click here to return to the login page.</nuxt-link>
    </p>
  </div>
</template>

<script setup>

definePageMeta({
  layout: 'blank',
  middleware: 'logout',
})

</script>
