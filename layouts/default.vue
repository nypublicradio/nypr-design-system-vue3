<template>
  <div :class="$route.name">
    <div>header</div>
    <!-- <ul>
      <li>
        <nuxt-link to="/">Home</nuxt-link>
      </li>
      <li>
        <nuxt-link to="/other">Other</nuxt-link>
      </li>
    </ul>-->
    <!-- <v-audio-player-system persistent always /> -->
    <main>
      <slot></slot>
    </main>
    <div>footer</div>
  </div>
</template>

<script>
// import VAudioPlayerSystem from '~/v1/src/components/VAudioPlayerSystem'

export default {
  name: 'HomePage',
  components: {
    // VAudioPlayerSystem,
  },
  mixins: [],
  data() {
    return {
      windowWidth: null,
    }
  },
  computed: {},
  watch: {},
  beforeMount() {
    this.windowWidth = window.innerWidth
  },
  mounted() {
    this.handleNewPage()
  },
  methods: {
    handleNewPage() { },
  },
}
</script>

<style lang="scss"></style>
