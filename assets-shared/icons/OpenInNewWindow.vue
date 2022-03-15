<template>
  <svg
    role="img"
    :aria-label="title"
    class="o-icon o-open-in-new-window-icon"
    viewBox="4 4 16 16"
    width="40"
    height="40"
    preserveAspectRatio="xMidYMid meet"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <title>{{ title }}</title>
    <path
      d="M12.2473 5.83919V4H20.0001V11.7528H18.1609V7.13997L13.0642 12.2367L11.7634 10.9359L16.8602 5.83919H12.2473Z"
      fill="black"
    />
    <path
      d="M14.6404 18.0691V11.7637H16.5714V20.0001H4V7.42871H12.2365V9.35975H5.93103V18.0691H14.6404Z"
      fill="black"
    />
  </svg>
</template>

<script>
export default {
  name: 'OpenInNewWindow',
  props: {
    title: {
      type: String,
      default: 'Open In New Window'
    }
  }
}
</script>
