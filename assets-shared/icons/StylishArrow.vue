<template>
  <svg
    role="img"
    :aria-label="title"
    class="o-icon o-arrow-stylish-arrow-icon"
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
      d="M13.236 5L19.836 7.736L21 8.906L14.772 15.128L16.884 17.24L6.174 19.04L5.01 17.894L3 10.232L6.552 11.702L13.236 5ZM5.898 17L13.416 15.71L11.214 14.792L17.886 8.126L13.5 6.326L6.816 12.986L4.614 12.062L5.898 17.006V17Z"
      fill="black"
    />
  </svg>
</template>

<script>
export default {
  name: 'StylishArrow',
  props: {
    title: {
      type: String,
      default: 'arrow'
    }
  }
}
</script>
