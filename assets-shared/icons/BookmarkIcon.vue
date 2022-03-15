<template>
  <svg
    role="img"
    :aria-label="title"
    class="o-icon o-bookmark-icon"
    fill="none"
    viewBox="2 2 20 20"
    width="40"
    height="40"
    preserveAspectRatio="xMidYMid meet"
    xmlns="http://www.w3.org/2000/svg"
  >
    <title>{{ title }}</title>
    <path
      fill-rule="evenodd"
      clip-rule="evenodd"
      d="M5.27584 2.64645C5.36961 2.55268 5.49679 2.5 5.62939 2.5H18.3905C18.6667 2.5 18.8905 2.72386 18.8905 3V21C18.8905 21.1867 18.7865 21.3578 18.6208 21.4438C18.4551 21.5298 18.2553 21.5163 18.1027 21.4088L12.0005 17.1118L5.91804 21.4084C5.76545 21.5162 5.56549 21.5299 5.3996 21.444C5.23371 21.3581 5.12956 21.1868 5.12956 21L5.12939 3C5.12939 2.8674 5.18207 2.74022 5.27584 2.64645ZM6.1294 3.5L6.12955 20.0346L11.7115 16.0916C11.8842 15.9696 12.115 15.9694 12.2879 16.0912L17.8905 20.0364V3.5H6.1294Z"
      fill="black"
    />
  </svg>
</template>

<script>
export default {
  name: 'BookmarkIcon',
  props: {
    title: {
      type: String,
      default: 'Bookmark'
    }
  }
}
</script>
