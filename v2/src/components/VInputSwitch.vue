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
  noWidth: {
    default: null,
    type: String,
  },
  width: {
    default: '50px',
    type: String,
  },
  yes: {
    default: 'YES',
    type: String,
  },
  yesWidth: {
    default: null,
    type: String,
  },
})

const checked = ref(false)

const noWidth = ref(props.noWidth ?? props.width)
const yesWidth = ref(props.yesWidth ?? props.width)

const pseudoElementContentYes = computed(() => {
  return props.yes
})
const pseudoElementContentNo = computed(() => {
  return props.no
})
</script>

<template>
  <div class="v-input-switch">
    <InputSwitch
      v-model="checked"
      :data-content-yes="pseudoElementContentYes"
      :data-content-no="pseudoElementContentNo"
    ></InputSwitch>
  </div>
</template>

<style lang="scss">
$noWidth: v-bind(noWidth);
$yesWidth: v-bind(yesWidth);
$paddingBuffer: 5px;
$fontSize: v-bind(fontSize);
$theYes: v-bind(yes);
$theNo: v-bind(no);
$sliderSize: var(--slider-size);
$height: calc($sliderSize + ($paddingBuffer * 1.25));
.v-input-switch {
  .p-inputswitch {
    transition: width 0.2s;
    -webkit-transition: width 0.2s;
    width: $noWidth;
    height: $height;
    &:not(.p-inputswitch-checked):after {
      content: attr(data-content-no);
      right: $paddingBuffer;
    }
    &.p-inputswitch-checked:before {
      content: attr(data-content-yes);
      left: $paddingBuffer;
    }
    &.p-inputswitch-checked .p-inputswitch-slider:before {
      left: calc($yesWidth - ($sliderSize * 2) - $paddingBuffer);
    }
    &.p-inputswitch-checked {
      width: $yesWidth;
    }
    &:after,
    &:before {
      color: white;
      font-weight: bold;
      line-height: $height;
      position: absolute;
      display: block;
      font-family: sans-serif;
      font-size: $fontSize;
    }
    .p-inputswitch-slider {
      z-index: -1;
      &:before {
        width: $sliderSize;
        height: $sliderSize;
      }
    }
  }
}
</style>
