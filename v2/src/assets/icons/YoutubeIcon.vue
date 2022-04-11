<template>
  <svg
    role="img"
    :aria-label="title"
    class="o-icon o-youtube-icon"
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
      d="M20.6236 7.69313C20.4166 6.91421 19.8067 6.30084 19.0322 6.09268C17.6285 5.71436 11.9998 5.71436 11.9998 5.71436C11.9998 5.71436 6.37097 5.71436 4.96728 6.09268C4.19287 6.30084 3.58291 6.91421 3.37591 7.69313C2.99976 9.10483 2.99976 12.0504 2.99976 12.0504C2.99976 12.0504 2.99976 14.9958 3.37591 16.4077C3.58291 17.1865 4.19287 17.7999 4.96728 18.0081C6.37097 18.3864 11.9998 18.3864 11.9998 18.3864C11.9998 18.3864 17.6285 18.3864 19.0322 18.0081C19.8067 17.7999 20.4166 17.1865 20.6236 16.4077C20.9998 14.9958 20.9998 12.0504 20.9998 12.0504C20.9998 12.0504 20.9998 9.10483 20.6236 7.69313ZM10.1614 14.6176L14.8065 11.908L10.1614 9.19824V14.6176Z"
      fill="black"
    />

  </svg>
</template>

<script>
export default {
  name: 'YoutubeIcon',
  props: {
    title: {
      type: String,
      default: 'Youtube'
    }
  }
}
</script>
