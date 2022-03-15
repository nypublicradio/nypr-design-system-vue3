<template>
  <svg
    role="img"
    :aria-label="title"
    class="o-icon o-search-icon"
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
      d="M15.293 9.8687C15.293 7.23321 13.2301 5.08966 10.6939 5.08966C8.15763 5.08966 6.09479 7.23321 6.09479 9.8687C6.09479 12.5053 8.15763 14.6489 10.6939 14.6489C11.9219 14.6489 13.0775 14.1512 13.9463 13.2484C14.8152 12.3455 15.293 11.1459 15.293 9.8687ZM14.2929 15.7521C13.2275 16.461 11.9883 16.841 10.6937 16.841C7.00296 16.841 4.00008 13.7206 4.00008 9.88419C4.00008 6.04909 7.00296 2.92871 10.6937 2.92871C14.3843 2.92871 17.3872 6.04909 17.3872 9.88419C17.3872 11.5744 16.812 13.1714 15.7566 14.4352L19.7121 18.3907C20.096 18.7746 20.096 19.3971 19.7121 19.781C19.3281 20.1649 18.7057 20.1649 18.3218 19.781L14.2929 15.7521Z"
      fill="black"
    />
  </svg>
</template>

<script>
export default {
  name: 'SearchIcon',
  props: {
    title: {
      type: String,
      default: 'Search'
    }
  }
}
</script>
