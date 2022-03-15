<template>
  <svg
    role="img"
    :aria-label="title"
    class="o-icon o-simple-arrow-left-icon"
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
      d="M15.7751 21.7225C16.2812 21.1996 15.7751 20.7422 15.7751 20.7422L7.10145 11.771L15.3644 3.22504C15.3644 3.22504 15.7941 2.68916 15.3326 2.21217C14.8714 1.73478 14.2271 2.21217 14.2271 2.21217L5 11.7871L14.748 21.8692C14.748 21.8692 15.2698 22.2451 15.7751 21.7225Z"
      fill="black"
    />
  </svg>
</template>

<script>
export default {
  name: 'SimpleArrowLeft',
  props: {
    title: {
      type: String,
      default: 'arrow left'
    }
  }
}
</script>
