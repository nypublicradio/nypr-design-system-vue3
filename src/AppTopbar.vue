<template>
  <div class="layout-topbar">
    <a class="action-icon menu-icon" @click="$emit('menubutton-click')">
      <i class="pi pi-bars"></i>
    </a>
    <router-link
      v-if="!main"
      v-tooltip.bottom="'Home'"
      class="action-icon home-icon"
      to="/"
    >
      <i class="pi pi-arrow-left"></i>
    </router-link>
    <router-link class="route-link" to="/documentation"
      >Get Started</router-link
    >
  </div>
</template>

<script>
export default {
  computed: {
    main() {
      return this.$route.path === '/'
    },
  },
}
</script>
