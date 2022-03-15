<template>
  <svg
    role="img"
    :aria-label="title"
    class="o-icon o-arrow-pointed-down-icon"
    viewBox="3 3 18 18"
    width="40"
    height="40"
    preserveAspectRatio="xMidYMid meet"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <title>{{ title }}</title>
    <path
      d="M12.326 20.5115L17.8553 14.622C18.0544 14.4198 18.049 14.0812 17.8332 13.9193C17.6173 13.7574 17.3363 13.7779 17.1917 13.9545L12.5371 18.9116V3.49079C12.5371 3.21974 12.3121 3 12.0344 3C11.7568 3 11.5318 3.21974 11.5318 3.49079V18.9116L6.87714 13.9545C6.68836 13.7539 6.36879 13.7408 6.16336 13.9251C5.95793 14.1094 5.94443 14.4214 6.1332 14.622L11.6625 20.5115C11.6992 20.5496 11.7437 20.5797 11.7932 20.5999C11.9218 20.6522 12.0666 20.6522 12.1953 20.5999C12.2447 20.5797 12.2892 20.5496 12.326 20.5115Z"
      fill="black"
    />
  </svg>
</template>

<script>
export default {
  name: 'ArrowPointedDown',
  props: {
    title: {
      type: String,
      default: 'Arrow Pointed Down'
    }
  }
}
</script>
