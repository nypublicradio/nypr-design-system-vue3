<script setup>
import InputSwitch from "primevue/inputswitch"
import { onMounted, ref, watchEffect } from "vue"

const props = defineProps({
  data: {
    default: false,
    type: Boolean,
  },
  fontSize: {
    default: "0.70rem",
    type: String,
  },
  no: {
    default: "NO",
    type: String,
  },
  staticWidth: {
    default: false,
    type: Boolean,
  },
  yes: {
    default: "YES",
    type: String,
  },
})

const emit = defineEmits(["click", "update:data", "change", "input", "focus", "blur"])

const checked = ref(props.data)

const noRef = ref(null)
const yesRef = ref(null)

const noWidthOrig = ref(null)
const yesWidthOrig = ref(null)
const noWidth = ref(null)
const yesWidth = ref(null)

// simply returns the largest number
function findLargestNumber(a, b) {
  return Math.max(a, b)
}

onMounted(() => {
  // needed to add a slight delay for Storybook to "see" the cssvars
  setTimeout(() => {
    const noW = noRef.value.offsetWidth
    const yesW = yesRef.value.offsetWidth
    noWidthOrig.value = `${noW}px`
    yesWidthOrig.value = `${yesW}px`
    if (props.staticWidth) {
      const largest = findLargestNumber(noW, yesW)
      noWidth.value = `${largest}px`
      yesWidth.value = `${largest}px`
    } else {
      noWidth.value = `${noW}px`
      yesWidth.value = `${yesW}px`
    }
  }, 10)
})

watchEffect(() => {
  checked.value = props.data
})
</script>

<template>
  <div
    class="v-input-switch"
    :class="[{ 'static-width': props.staticWidth, checked: checked }]"
    :style="`opacity:${noWidth ? 1 : 0};`"
  >
    <InputSwitch
      v-model="checked"
      :aria-label="`Toggle between ${props.yes} and ${props.no}`"
      @update:model-value="emit('update:data', checked)"
      @click="emit('click', checked)"
      @change="emit('change', checked)"
      @input="emit('input', checked)"
      @focus="emit('focus', checked)"
      @blur="emit('blur', checked)"
    />

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
  display: inline-block;
  .options {
    position: absolute;
    left: 0;
    top: 0;
    overflow: hidden;
    border-radius: 40px;
    height: $height;
    width: 100%;
    pointer-events: none;
    .option {
      position: absolute;
      top: 0;
      color: var(--v-input-switch-text-color);
      font-weight: bold;
      line-height: $height;
      position: absolute;
      display: block;
      font-family: var(--font-family);
      font-size: $fontSize;
      transition: left var(--v-input-switch-transition-duration);
      -webkit-transition: left var(--v-input-switch-transition-duration);
      font-smooth: always;
      -webkit-font-smoothing: antialiased;
      -moz-osx-font-smoothing: grayscale;
      &.no {
        left: calc($sliderSize + ($paddingBuffer * 2));
      }
      &.yes {
        left: $negativeYesWidth;
        color: var(--v-input-switch-text-yes-color);
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
  &.static-width .option.no {
    left: calc($yesWidthSwitch - $noWidthOrig - ($paddingBuffer * 2));
  }
  &.checked {
    .option.no {
      left: calc($yesWidth + ($paddingBuffer * 2) + ($sliderSize * 2));
    }
    .option.yes {
      left: calc($paddingBuffer * 2);
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
      outline: 1px solid var(--v-input-switch-border-color);
      border-radius: var(--v-input-switch-border-radius);
      &:before {
        width: $sliderSize;
        height: $sliderSize;
        margin-top: calc(($sliderSize / 2) * -1);
        outline: 1px solid var(--v-input-switch-border-color);
      }
    }
    &.p-inputswitch-checked {
      .p-inputswitch-slider {
        outline: none;
        &:before {
          left: $yesWidth;
          outline: none;
        }
      }
    }
  }
}
</style>
