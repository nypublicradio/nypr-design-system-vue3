<template>
  <svg
    role="img"
    :aria-label="title"
    class="o-icon o-download-icon"
    viewBox="3 3 18 18"
    width="40"
    height="40"
    preserveAspectRatio="xMidYMid meet"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <title>{{ title }}</title>
    <path
      d="M12 17.9333L6.07129 11.8249L7.20754 10.6504L12 15.5881L16.7925 10.6504L17.9288 11.8249L12 17.9333Z"
      fill="black"
    />
    <path
      d="M11.1938 3.11621H12.8026V16.7587H11.1938V3.11621Z"
      fill="black"
    />
    <path
      d="M6.64111 19.7725H17.3624V21.43H6.64111V19.7725Z"
      fill="black"
    />
  </svg>
</template>

<script>
export default {
  name: 'DownloadIcon',
  props: {
    title: {
      type: String,
      default: 'Download'
    }
  }
}
</script>
