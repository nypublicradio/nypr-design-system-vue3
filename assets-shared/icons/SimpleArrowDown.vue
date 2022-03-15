<template>
  <svg
    role="img"
    :aria-label="title"
    class="o-icon o-simple-arrow-down-icon"
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
      d="M1.77754 6.72492C2.30036 6.21885 2.75785 6.72492 2.75785 6.72492L11.729 15.3985L20.275 6.69305C20.275 6.69305 20.8108 6.26335 21.2878 6.72492C21.7652 7.1861 21.2878 7.83036 21.2878 7.83036L11.7129 17.5L1.6308 7.75204C1.6308 7.75204 1.25492 7.23022 1.77754 6.72492Z"
      fill="black"
    />
  </svg>
</template>

<script>
export default {
  name: 'SimpleArrowDown',
  props: {
    title: {
      type: String,
      default: 'arrow down'
    }
  }
}
</script>
