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
    class="v-input-switch"
    :class="[{ 'static-size': props.static, checked: checked }]"
    :style="`opacity:${noWidth ? 1 : 0};`"
  >
    <InputSwitch v-model="checked" />

    <div class="options">
      <div ref="noRef" class="option no">
        {{ props.no }}
      </div>
      <div ref="yesRef" class="option yes">
        {{ props.yes }}
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
$paddingBuffer: var(--v-input-switch-padding-buffer);
$fontSize: v-bind(fontSize);
$sliderSize: var(--v-input-switch-slider-size);
$height: calc($sliderSize + ($paddingBuffer * 1.25));
$noWidthOrig: v-bind(noWidthOrig);
$yesWidthOrig: v-bind(yesWidthOrig);
$noWidth: v-bind(noWidth);
$yesWidth: v-bind(yesWidth);
$negativeYesWidth: #{calc(($yesWidthOrig + (($paddingBuffer * 2))) * -1)};
$noWidthSwitch: calc($noWidth + $sliderSize + ($paddingBuffer * 3.5));
$yesWidthSwitch: calc($yesWidth + $sliderSize + ($paddingBuffer * 3.5));

.v-input-switch {
  transition: opacity var(--v-input-switch-transition-duration);
  -webkit-transition: opacity var(--v-input-switch-transition-duration);
  position: relative;
  line-height: 0;
  .options {
    position: absolute;
    left: 0;
    top: 0;
    overflow: hidden;
    border-radius: 40px;
    height: 100%;
    width: 100%;
    pointer-events: none;
    .option {
      position: absolute;
      top: 0;
      color: white;
      font-weight: bold;
      line-height: $height;
      position: absolute;
      display: block;
      font-family: sans-serif;
      font-size: $fontSize;
      transition: left var(--v-input-switch-transition-duration);
      -webkit-transition: left var(--v-input-switch-transition-duration);
      &.no {
        left: calc($sliderSize + ($paddingBuffer * 2));
      }
      &.yes {
        left: $negativeYesWidth;
      }
    }
  }
  .p-inputswitch {
    transition: width var(--v-input-switch-transition-duration);
    -webkit-transition: width var(--v-input-switch-transition-duration);
    width: $noWidthSwitch;
    height: $height;
    &.p-inputswitch-checked {
      width: $yesWidthSwitch;
    }
    .p-inputswitch-slider {
      &:before {
        width: $sliderSize;
        height: $sliderSize;
        transition-duration: var(--v-input-switch-transition-duration);
      }
    }

    &.p-inputswitch-checked .p-inputswitch-slider:before {
      left: $yesWidth;
    }
  }
  &.static-size .option.no {
    left: calc($yesWidthSwitch - $noWidthOrig - $paddingBuffer);
  }
  &.checked {
    .option.no {
      left: calc($yesWidth + ($paddingBuffer * 2) + ($sliderSize * 2));
    }
    .option.yes {
      left: $paddingBuffer;
    }
  }
}
</style>

<style lang="scss">
$yesWidth: v-bind(yesWidth);
$sliderSize: var(--v-input-switch-slider-size);
.v-input-switch {
  .p-inputswitch {
    .p-inputswitch-slider {
      border-radius: var(--v-input-switch-border-radius);
      &:before {
        width: $sliderSize;
        height: $sliderSize;
        margin-top: calc(($sliderSize / 2) * -1);
      }
    }
    &.p-inputswitch-checked .p-inputswitch-slider:before {
      left: $yesWidth;
    }
  }
}
</style>
