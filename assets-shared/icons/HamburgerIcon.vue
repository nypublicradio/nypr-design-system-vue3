<template>
  <svg
    role="img"
    :aria-label="title"
    class="o-icon o-arrow-pointed-down-icon"
    viewBox="4 4 16 16"
    width="40"
    height="40"
    preserveAspectRatio="xMidYMid meet"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <title>{{ title }}</title>
    <rect
      x="4"
      y="4.02637"
      width="16"
      height="2.35876"
      fill="black"
    />
    <rect
      x="4"
      y="10.4355"
      width="16"
      height="2.35876"
      fill="black"
    />
    <rect
      x="4"
      y="16.8447"
      width="16"
      height="2.35876"
      fill="black"
    />
  </svg>
</template>

<script>
export default {
  name: 'HamburgerIcon',
  props: {
    title: {
      type: String,
      default: 'Hamburger'
    }
  }
}
</script>
