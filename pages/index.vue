<script setup>
import VShareTools from '/v2/src/components/VShareTools.vue'
import VShareToolsItem from '/v2/src/components/VShareToolsItem.vue'
import { onBeforeMount, ref } from 'vue'
</script>

<template>
  <div>
    <section>
      <div class="content lg:px-8 pb-0">
        <div class="grid">
          <div class="col-12">
            <h1 class="h2">The Team</h1>
            <v-share-tools>
              <v-share-tools-item service="facebook" username="gothamist" />
              <v-share-tools-item service="twitter" username="gothamist" />
              <v-share-tools-item service="instagram" username="gothamist" />
              <v-share-tools-item
                service="youtube"
                username="UCY_2VeS5Q9_sMZRhtvF0c5Q"
              />
            </v-share-tools>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<style lang="scss"></style>
