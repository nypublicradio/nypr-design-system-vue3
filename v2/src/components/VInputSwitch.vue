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
  width: {
    default: '50px',
    type: String,
  },
  yes: {
    default: 'YES',
    type: String,
  },
})

const checked = ref(true)

const pseudoElementContentYes = computed(() => {
  return props.yes
})
const pseudoElementContentNo = computed(() => {
  return props.no
})
</script>

<template>
  <div class="card flex justify-content-center">
    <InputSwitch
      v-model="checked"
      :data-content-yes="pseudoElementContentYes"
      :data-content-no="pseudoElementContentNo"
    ></InputSwitch>
    <InputSwitch v-model="checked"></InputSwitch>
  </div>
</template>

<style lang="scss">
$theWidth: v-bind(width);
$paddingBuffer: 5px;
$fontSize: v-bind(fontSize);
$theYes: v-bind(yes);
$theNo: v-bind(no);
$sliderSize: var(--slider-size);
$height: calc($sliderSize + ($paddingBuffer * 1.25));
.p-inputswitch {
  width: $theWidth;
  height: $height;
  width: $theWidth;
  &:not(.p-inputswitch-checked):after {
    content: attr(data-content-no);
    right: $paddingBuffer;
  }
  &.p-inputswitch-checked:before {
    content: attr(data-content-yes);
    left: $paddingBuffer;
  }
  &.p-inputswitch-checked .p-inputswitch-slider:before {
    left: calc($theWidth - ($sliderSize * 2) - $paddingBuffer);
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
</style>
