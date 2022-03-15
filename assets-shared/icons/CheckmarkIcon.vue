<template>
  <svg
    role="img"
    :aria-label="title"
    class="o-icon o-checkmark-icon"
    viewBox="5 5 14 14"
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
      d="M17.1704 7L16.2505 7.90975L9.95307 14.2072L7.62816 12.3473L6.61733 11.5386L5 13.5603L6.01083 14.3689L9.24549 16.9567L10.1451 17.6744L10.974 16.8556L18.0903 9.73933L19 8.82959L17.1704 7Z"
      fill="black"
    />
  </svg>
</template>

<script>
export default {
  name: 'CheckmarkIcon',
  props: {
    title: {
      type: String,
      default: 'Checkmark'
    }
  }
}
</script>
