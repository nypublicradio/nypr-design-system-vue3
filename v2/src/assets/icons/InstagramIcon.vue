<template>
  <svg
    role="img"
    :aria-label="title"
    class="o-icon o-instagram-icon"
    viewBox="0 0 30 30"
    width="40"
    height="40"
    preserveAspectRatio="xMidYMid meet"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <title>{{ title }}</title>

    <circle fill="black" cx="15" cy="15" r="4" />
    <path
      fill="black"
      d="M19.999,3h-10C6.14,3,3,6.141,3,10.001v10C3,23.86,6.141,27,10.001,27h10C23.86,27,27,23.859,27,19.999v-10   C27,6.14,23.859,3,19.999,3z M15,21c-3.309,0-6-2.691-6-6s2.691-6,6-6s6,2.691,6,6S18.309,21,15,21z M22,9c-0.552,0-1-0.448-1-1   c0-0.552,0.448-1,1-1s1,0.448,1,1C23,8.552,22.552,9,22,9z"
    />
  </svg>
</template>

<script>
export default {
  name: 'InstagramIcon',
  props: {
    title: {
      type: String,
      default: 'Instagram'
    }
  }
}
</script>
