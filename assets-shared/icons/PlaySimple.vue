<template>
  <svg
    role="img"
    :aria-label="title"
    class="o-icon o-play-icon"
    viewBox="4 4 16 16"
    width="40"
    height="40"
    preserveAspectRatio="xMidYMid meet"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <title>{{ title }}</title>
    <path
      fill-rule="evenodd"
      clip-rule="evenodd"
      d="M18 12.0001L6 19.6365V4.36377L18 12.0001Z"
      fill="black"
    />
  </svg>
</template>

<script>
export default {
  name: 'PlaySimple',
  props: {
    title: {
      type: String,
      default: 'Play'
    }
  }
}
</script>
