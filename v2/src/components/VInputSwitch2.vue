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
  static: {
    default: false,
    type: Boolean,
  },
  yes: {
    default: 'YES',
    type: String,
  },
})

const checked = ref(false)
const noRef = ref(null)
const yesRef = ref(null)

const noWidthOrig = ref(null)
const yesWidthOrig = ref(null)
const noWidth = ref(null)
const yesWidth = ref(null)

function findLargestNumber(a, b) {
  return Math.max(a, b)
}

onMounted(() => {
  const noW = noRef.value.offsetWidth
  const yesW = yesRef.value.offsetWidth
  noWidthOrig.value = `${noW}px`
  yesWidthOrig.value = `${yesW}px`
  if (props.static) {
    const largest = findLargestNumber(noW, yesW)
    noWidth.value = `${largest}px`
    yesWidth.value = `${largest}px`
  } else {
    noWidth.value = `${noW}px`
    yesWidth.value = `${yesW}px`
  }
})
</script>

<template>
  <div
    class="v-input-switch2"
    :class="[{ 'static-size': props.static }]"
    :style="`opacity:${noWidth ? '1' : '0'};`"
  >
    <InputSwitch v-model="checked" />
    <div
      ref="noRef"
      :style="`opacity:${!checked ? '1' : '0'};`"
      class="option no"
    >
      {{ props.no }}
    </div>
    <div
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
$noWidthOrig: v-bind(noWidthOrig);
$yesWidthOrig: v-bind(yesWidthOrig);
$noWidth: v-bind(noWidth);
$yesWidth: v-bind(yesWidth);
$noWidthSwitch: calc($noWidth + $sliderSize + ($paddingBuffer * 3.5));
$yesWidthSwitch: calc($yesWidth + $sliderSize + ($paddingBuffer * 3.5));

.v-input-switch2 {
  transition: opacity var(--transition-duration);
  -webkit-transition: opacity var(--transition-duration);
  position: relative;
  .option {
    z-index: 999;
    pointer-events: none;
    position: absolute;
    top: 0;
    color: white;
    font-weight: bold;
    line-height: $height;
    position: absolute;
    display: block;
    font-family: sans-serif;
    font-size: $fontSize;
    transition: opacity var(--transition-duration);
    -webkit-transition: opacity var(--transition-duration);
    &.no {
      left: calc($sliderSize + ($paddingBuffer * 2));
    }
    &.yes {
      left: $paddingBuffer;
    }
  }
  .p-inputswitch {
    transition: width var(--transition-duration);
    -webkit-transition: width var(--transition-duration);
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

    &.p-inputswitch-checked .p-inputswitch-slider:before {
      left: calc($yesWidth);
    }
  }
  &.static-size .option.no {
    left: calc($yesWidthSwitch - $noWidthOrig - $paddingBuffer);
  }
}
</style>
