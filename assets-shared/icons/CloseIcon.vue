<template>
  <svg
    role="img"
    :aria-label="title"
    class="o-icon o-close-icon"
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
      d="M5.65909 3.4563C5.05062 2.84783 4.06455 2.84798 3.45626 3.45626C2.84784 4.06468 2.848 5.05079 3.4563 5.65909L9.79721 12L3.4563 18.3409C2.84783 18.9494 2.84798 19.9355 3.45626 20.5437C4.06468 21.1522 5.05079 21.152 5.65909 20.5437L12 14.2028L18.3409 20.5437C18.9494 21.1522 19.9355 21.152 20.5437 20.5437C21.1522 19.9353 21.152 18.9492 20.5437 18.3409L14.2028 12L20.5437 5.65909C21.1522 5.05062 21.152 4.06455 20.5437 3.45626C19.9353 2.84784 18.9492 2.848 18.3409 3.4563L12 9.79721L5.65909 3.4563Z"
      fill="black"
    />
  </svg>
</template>

<script>
export default {
  name: 'CloseIcon',
  props: {
    title: {
      type: String,
      default: 'Close'
    }
  }
}
</script>
