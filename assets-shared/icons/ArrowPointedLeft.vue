<template>
  <svg
    role="img"
    :aria-label="title"
    class="o-icon o-arrow-pointed-left-icon"
    viewBox="3 3 18 18"
    width="40"
    height="40"
    preserveAspectRatio="xMidYMid meet"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <title>{{ title }}</title>
    <path
      d="M3.12762 12.326L9.01715 17.8553C9.21941 18.0544 9.55797 18.049 9.71986 17.8332C9.88175 17.6173 9.86129 17.3363 9.68463 17.1917L4.72761 12.5371H20.1484C20.4194 12.5371 20.6392 12.3121 20.6392 12.0344C20.6392 11.7568 20.4194 11.5318 20.1484 11.5318H4.72761L9.68463 6.87714C9.88521 6.68836 9.8984 6.36879 9.71408 6.16336C9.52976 5.95793 9.21773 5.94443 9.01715 6.1332L3.12762 11.6625C3.08955 11.6992 3.05945 11.7437 3.03928 11.7932C2.98693 11.9218 2.98693 12.0666 3.03928 12.1953C3.05945 12.2447 3.08955 12.2892 3.12762 12.326Z"
      fill="black"
    />
  </svg>
</template>

<script>
export default {
  name: 'ArrowPointedLeft',
  props: {
    title: {
      type: String,
      default: 'Arrow Pointed Left'
    }
  }
}
</script>
