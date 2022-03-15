<template>
  <svg
    role="img"
    :aria-label="title"
    class="o-icon o-embed-icon"
    viewBox="3 3 18 18"
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
      d="M11.6086 17.866H9.66585L12.2577 6.1333H14.201L11.6086 17.866ZM7.60734 7.4223L3.00488 11.9997L7.60734 16.5771L8.90351 15.2879L5.59669 11.9997L8.90351 8.71125L7.60734 7.4223ZM16.3927 7.4223L15.097 8.71125L18.4033 11.9997L15.097 15.2882L16.3927 16.5774L20.9951 11.9997L16.3927 7.4223Z"
      fill="black"
    />
  </svg>
</template>

<script>
export default {
  name: 'EmbedIcon',
  props: {
    title: {
      type: String,
      default: 'Embed'
    }
  }
}
</script>
