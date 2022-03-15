<template>
  <svg
    role="img"
    :aria-label="title"
    class="o-icon o-placeholder-icon"
    viewBox="0 0 24 24"
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
      d="M20.5858 2H3.41421L12 10.5858L20.5858 2ZM22 3.41421L13.4142 12L22 20.5858V3.41421ZM10.5858 12L2 3.41421V20.5858L10.5858 12ZM3.41421 22L12 13.4142L20.5858 22H3.41421ZM2 0H0V2V22V24H2H22H24V22V2V0H22H2Z"
      fill="#8C8C8C"
    />
  </svg>
</template>

<script>
export default {
  name: 'PlaceholderIcon',
  props: {
    title: {
      type: String,
      default: 'Placeholder'
    }
  }
}
</script>
