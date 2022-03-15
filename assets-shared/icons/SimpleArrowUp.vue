<template>
  <svg
    role="img"
    :aria-label="title"
    class="o-icon o-simple-arrow-up-icon"
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
      d="M1.77754 17.2751C2.30036 17.7812 2.75785 17.2751 2.75785 17.2751L11.729 8.60145L20.275 16.8644C20.275 16.8644 20.8108 17.2941 21.2878 16.8326C21.7652 16.3714 21.2878 15.7271 21.2878 15.7271L11.7129 6.5L1.6308 16.248C1.6308 16.248 1.25492 16.7698 1.77754 17.2751Z"
      fill="black"
    />
  </svg>
</template>

<script>
export default {
  name: 'SimpleArrowUp',
  props: {
    title: {
      type: String,
      default: 'arrow up'
    }
  }
}
</script>
