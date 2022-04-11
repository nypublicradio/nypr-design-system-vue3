<template>
  <svg
    role="img"
    :aria-label="title"
    class="o-icon o-gothamist-arrow-icon"
    viewBox="4 4 16 16"
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
      d="M14 10.8084V6.44482L19.9999 12.2629L14 18.0811V13.7175H12V10.8084H14ZM11.2726 10.8083H8.36351V13.7174H11.2726V10.8083ZM6.18199 10.8083H7.63652V13.7174H6.18199V10.8083ZM5.45453 10.8083H4V13.7174H5.45453V10.8083Z"
      fill="#333333"
    />
  </svg>
</template>

<script>
export default {
  name: 'GothamistArrow',
  props: {
    title: {
      type: String,
      default: 'arrow'
    }
  }
}
</script>
