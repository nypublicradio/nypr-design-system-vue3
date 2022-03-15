<template>
  <svg
    role="img"
    :aria-label="title"
    class="o-icon o-email-icon"
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
      d="M21 6.60714C21 5.72321 20.2768 5 19.3929 5H4.60714C3.72321 5 3 5.72321 3 6.60714V7.41071L11.6518 11.6964C11.8661 11.8036 12.1339 11.8036 12.3482 11.6964L21 7.41071V6.60714Z"
      fill="black"
    />
    <path
      fill-rule="evenodd"
      clip-rule="evenodd"
      d="M4.60714 18.4466H19.3929C20.2768 18.4466 21 17.7234 21 16.8394V8.61621L12.8304 12.6609C12.5625 12.7948 12.2946 12.8484 12 12.8484C11.7054 12.8484 11.4375 12.7948 11.1696 12.6609L3 8.61621V16.8394C3 17.7234 3.72321 18.4466 4.60714 18.4466Z"
      fill="black"
    />
  </svg>
</template>

<script>
export default {
  name: 'EmailIcon',
  props: {
    title: {
      type: String,
      default: 'Email'
    }
  }
}
</script>
