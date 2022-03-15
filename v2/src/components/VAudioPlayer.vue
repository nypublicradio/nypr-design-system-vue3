<template>
  <div class="audioPlayer" :class="{ minimized: isMinimized }">
    <div class="content">
      <h3>Audio Player!</h3>
      <Button
        v-if="isFixed"
        class="ClosePlayerButton"
        icon="pi pi-times"
        @click="$emit('emitClosePlayer')"
      >
      </Button>
    </div>
    <div class="min-content">
      <Button
        class="playPauseButton"
        :icon="`pi ${isPlaying ? 'pi-pause' : 'pi-play'}`"
        @click="$emit('emitTogglePlay')"
      >
      </Button>
    </div>
  </div>
</template>

<script>
import { ref } from 'vue'
import Button from 'primevue/button'
// import scssVars from './assets/scss/exports.module.scss'

export default {
  name: 'VAudioPlayer',
  components: {
    Button,
  },
  props: {
    isFixed: {
      type: Boolean,
      default: false,
    },
    isMinimized: {
      type: Boolean,
      default: false,
    },
    isPlaying: {
      type: Boolean,
      default: false,
    },
  },
  emits: ['emitTogglePlay', 'emitClosePlayer'],
  setup: (props) => {
    // props vars

    // local data vars

    // local vars

    // methods

    return {}
  },
}
</script>

<style lang="scss">
$audioPlayerWidth: 375px;

.audioPlayer {
  background: var(--gray-300);
  border-radius: var(--border-radius);
  width: 100%;
  display: grid;
  margin: 0 auto;
  grid-template-columns: 4fr 1fr;
  row-gap: spacing(2);
  align-items: center;
  padding: spacing(2);
  box-sizing: border-box;
  transition: width 0.5s, padding 0.5s;
  -webkit-transition: width 0.5s, padding 0.5s;
  &.inline {
    width: 100%;
  }
  &.fixed {
    width: $audioPlayerWidth;
    position: fixed;
    bottom: 0;
    right: -$audioPlayerWidth;
    &.minimized {
      width: 60px;
      height: 60px;
      padding: 0;
      .content {
        display: none;
      }
    }
  }
  .min-content {
    width: 100%;
    display: grid;
    margin: 0 auto;
    grid-template-columns: 1fr;
    column-gap: spacing(3);
    row-gap: spacing(3);
    justify-items: end;
  }
}
</style>
