<template>
  <svg
    role="img"
    :aria-label="title"
    class="o-icon o-arrow-pointed-up-icon"
    viewBox="3 3 18 18"
    width="40"
    height="40"
    preserveAspectRatio="xMidYMid meet"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <title>{{ title }}</title>
    <path
      d="M11.674 3.80826L6.14473 9.6978C5.9456 9.90006 5.95097 10.2386 6.16682 10.4005C6.38266 10.5624 6.66364 10.5419 6.80824 10.3653L11.4629 5.40825L11.4629 20.829C11.4629 21.1001 11.6879 21.3198 11.9656 21.3198C12.2432 21.3198 12.4682 21.1001 12.4682 20.829L12.4682 5.40825L17.1229 10.3653C17.3116 10.5659 17.6312 10.579 17.8366 10.3947C18.0421 10.2104 18.0556 9.89838 17.8668 9.6978L12.3375 3.80826C12.3008 3.77019 12.2563 3.7401 12.2068 3.71992C12.0781 3.66757 11.9334 3.66757 11.8047 3.71992C11.7553 3.7401 11.7107 3.77019 11.674 3.80826Z"
      fill="black"
    />
  </svg>
</template>

<script>
export default {
  name: 'ArrowPointedUp',
  props: {
    title: {
      type: String,
      default: 'Arrow Pointed Up'
    }
  }
}
</script>
