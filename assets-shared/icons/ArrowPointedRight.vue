<template>
  <svg
    role="img"
    :aria-label="title"
    class="o-icon o-arrow-pointed-right-icon"
    viewBox="3 3 18 18"
    width="40"
    height="40"
    preserveAspectRatio="xMidYMid meet"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <title>{{ title }}</title>
    <path
      d="M20.5115 11.674L14.622 6.14474C14.4198 5.94561 14.0812 5.95098 13.9193 6.16683C13.7574 6.38268 13.7779 6.66366 13.9545 6.80826L18.9116 11.4629H3.49079C3.21974 11.4629 3 11.6879 3 11.9656C3 12.2432 3.21974 12.4682 3.49079 12.4682H18.9116L13.9545 17.1229C13.7539 17.3116 13.7408 17.6312 13.9251 17.8366C14.1094 18.0421 14.4214 18.0556 14.622 17.8668L20.5115 12.3375C20.5496 12.3008 20.5797 12.2563 20.5999 12.2068C20.6522 12.0782 20.6522 11.9334 20.5999 11.8047C20.5797 11.7553 20.5496 11.7108 20.5115 11.674Z"
      fill="black"
    />
  </svg>
</template>

<script>
export default {
  name: 'ArrowPointedRight',
  props: {
    title: {
      type: String,
      default: 'Arrow Pointed Right'
    }
  }
}
</script>
