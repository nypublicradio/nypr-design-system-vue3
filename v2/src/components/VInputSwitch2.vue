<script setup>
import InputSwitch from 'primevue/inputswitch'
import { ref } from 'vue'

const props = defineProps({
  fontSize: {
    default: '0.75rem',
    type: String,
  },
  no: {
    default: 'NO',
    type: String,
  },
  yes: {
    default: 'YES',
    type: String,
  },
})

const checked = ref(false)
const noRef = ref(null)
const yesRef = ref(null)
const noWidth = ref(null)
const yesWidth = ref(null)

onMounted(() => {
  noWidth.value = `${noRef.value.offsetWidth}px`
  yesWidth.value = `${yesRef.value.offsetWidth}px`
})
</script>

<template>
  <div class="v-input-switch2">
    <InputSwitch v-model="checked" />
    <div ref="noRef" class="option no">{{ props.no }}</div>
    <div ref="yesRef" class="option yes">{{ props.yes }}</div>
  </div>
</template>

<style lang="scss">
$noWidth: v-bind(noWidth);
$yesWidth: v-bind(yesWidth);
$paddingBuffer: 5px;
$fontSize: v-bind(fontSize);
$sliderSize: var(--slider-size);
$height: calc($sliderSize + ($paddingBuffer * 1.25));
.v-input-switch2 {
  position: relative;
  .option {
    pointer-events: none;
    z-index: 1;
    position: absolute;
    top: 0;
    color: red;
    font-weight: bold;
    line-height: $height;
    position: absolute;
    display: block;
    font-family: sans-serif;
    font-size: $fontSize;
    &.no {
      left: calc($yesWidth - ($sliderSize * 2) - $paddingBuffer);
    }
    &.yes {
      left: $paddingBuffer;
    }
  }
  .p-inputswitch {
    transition: width 0.2s;
    -webkit-transition: width 0.2s;
    width: $noWidth;
    height: $height;
    &.p-inputswitch-checked {
      width: $yesWidth;
    }
    // &:after,
    // &:before {
    //   color: white;
    //   font-weight: bold;
    //   line-height: $height;
    //   position: absolute;
    //   display: block;
    //   font-family: sans-serif;
    //   font-size: $fontSize;
    // }
    .p-inputswitch-slider {
      //z-index: -1;
      &:before {
        width: $sliderSize;
        height: $sliderSize;
      }
    }
  }
}
</style>
