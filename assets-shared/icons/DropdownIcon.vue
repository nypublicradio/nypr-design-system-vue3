<template>
  <svg
    role="img"
    :aria-label="title"
    class="o-icon o-dropdown-icon"
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
      d="M12.0003 16.3333L4.85742 8H19.1431L12.0003 16.3333Z"
      fill="black"
    />
  </svg>
</template>

<script>
export default {
  name: 'DropdownIcon',
  props: {
    title: {
      type: String,
      default: 'Dropdown'
    }
  }
}
</script>
