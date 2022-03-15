<template>
  <svg
    role="img"
    :aria-label="title"
    class="o-icon o-simple-arrow-right-icon"
    viewBox="1 1 20 20"
    width="40"
    height="40"
    preserveAspectRatio="xMidYMid meet"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <title>{{ title }}</title>
    <path
      opacity="0.6"
      fill-rule="evenodd"
      clip-rule="evenodd"
      d="M6.22492 21.7225C5.71885 21.1996 6.22492 20.7422 6.22492 20.7422L14.8985 11.771L6.63557 3.22504C6.63557 3.22504 6.20588 2.68916 6.66745 2.21217C7.12863 1.73478 7.77288 2.21217 7.77288 2.21217L17 11.7871L7.25204 21.8692C7.25204 21.8692 6.73022 22.2451 6.22492 21.7225Z"
      fill="black"
    />
  </svg>
</template>

<script>
export default {
  name: 'SimpleArrowRight',
  props: {
    title: {
      type: String,
      default: 'arrow right'
    }
  }
}
</script>
