<template>
  <svg
    role="img"
    :aria-label="title"
    class="o-icon o-facebook-icon"
    viewBox="2 2 20 20"
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
      d="M9.34783 9H7V12H9.34783V21H13.2609V12H16.1111L16.3913 9H13.2609V7.74975C13.2609 7.0335 13.4111 6.75 14.1335 6.75H16.3913V3H13.4111C10.5969 3 9.34783 4.18725 9.34783 6.46125V9Z"
      fill="black"
    />
  </svg>
</template>

<script>
export default {
  name: 'FacebookIcon',
  props: {
    title: {
      type: String,
      default: 'Facebook'
    }
  }
}
</script>
