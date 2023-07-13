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

    <div
      ref="noRef"
      :style="`opacity:${!checked ? '1' : '0'};`"
      class="option no"
    >
      {{ props.no }}
    </div>

    <div
      v-show="checked"
      ref="yesRef"
      :style="`opacity:${checked ? '1' : '0'};`"
      class="option yes"
    >
      {{ props.yes }}
    </div>
  </div>
</template>

<style lang="scss">
$paddingBuffer: 5px;
$fontSize: v-bind(fontSize);
$sliderSize: var(--slider-size);
$height: calc($sliderSize + ($paddingBuffer * 1.25));
$noWidth: v-bind(noWidth);
$yesWidth: v-bind(yesWidth);
$noWidthSwitch: calc($noWidth + $sliderSize + ($paddingBuffer * 4));
$yesWidthSwitch: calc($yesWidth + $sliderSize + ($paddingBuffer * 4));

.v-input-switch2 {
  position: relative;
  .option {
    z-index: 999;
    pointer-events: none;
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
      left: calc($sliderSize + ($paddingBuffer * 2));
    }
    &.yes {
      left: $paddingBuffer;
    }
  }
  .p-inputswitch {
    transition: width 0.2s;
    -webkit-transition: width 0.2s;
    width: $noWidthSwitch;
    height: $height;
    &.p-inputswitch-checked {
      width: $yesWidthSwitch;
    }
    .p-inputswitch-slider {
      &:before {
        width: $sliderSize;
        height: $sliderSize;
      }
    }
  }
}
</style>
