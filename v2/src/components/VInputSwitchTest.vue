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
  // Generate the dynamic content based on your requirements
  return props.yes
})
const pseudoElementContentNo = computed(() => {
  // Generate the dynamic content based on your requirements
  return props.no
})
</script>

<template>
  <div
    class="text"
    :data-content-yes="pseudoElementContentYes"
    :data-content-no="pseudoElementContentNo"
  >
    hello
  </div>
</template>

<style>
.text:before {
  content: attr(data-content-yes);
}

.text:after {
  content: attr(data-content-no);
}
</style>
