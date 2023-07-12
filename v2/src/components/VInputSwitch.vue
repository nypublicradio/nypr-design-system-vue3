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
    default: '60px',
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
  </div>
</template>

<style lang="scss">
$theWidth: v-bind(width);
$paddingBuffer: 5px;
$fontSize: v-bind(fontSize);
$theYes: v-bind(yes);
$theNo: v-bind(no);
.p-inputswitch {
  width: $theWidth;
  &:after {
    content: attr(data-content-no);
    right: $paddingBuffer;
  }
  &.p-inputswitch-checked:before {
    content: attr(data-content-yes);
    left: unset;
    right: 20px;
  }
  &:after,
  &:before {
    color: white;
    font-weight: bold;
    line-height: 18.48px;
    position: absolute;
    display: block;
    font-family: sans-serif;
    font-size: $fontSize;
  }
  .p-inputswitch-slider {
    z-index: -1;
  }
}
</style>
