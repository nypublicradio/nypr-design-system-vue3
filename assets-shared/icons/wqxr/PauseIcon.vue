<template>
  <svg
    role="img"
    :aria-label="title"
    class="o-icon wqxr-pause"
    xmlns="http://www.w3.org/2000/svg"
    viewBox="2 2 20 20"
  >
    <title>{{ title }}</title>
    <rect
      x="6"
      y="5"
      width="4.0303"
      height="14"
      fill="black"
    />
    <rect
      x="13.0532"
      y="5"
      width="4.0303"
      height="14"
      fill="black"
    />
  </svg>
</template>

<script>
export default {
  name: 'PauseIcon',
  props: {
    title: {
      type: String,
      default: 'pause'
    }
  }
}
</script>
