<template>
  <svg
    role="img"
    :aria-label="title"
    class="o-icon o-print-icon"
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
      d="M17.7142 5.14286C17.7142 4.512 17.2022 4 16.5714 4H7.4285C6.79764 4 6.28564 4.512 6.28564 5.14286V6.28571H17.7142V5.14286Z"
      fill="black"
    />
    <path
      fill-rule="evenodd"
      clip-rule="evenodd"
      d="M18.8571 7.42871H5.14286C4.512 7.42871 4 7.94071 4 8.57157V15.4287C4 16.0596 4.512 16.5716 5.14286 16.5716H6.28571V18.8573C6.28571 19.4881 6.79771 20.0001 7.42857 20.0001H16.5714C17.2023 20.0001 17.7143 19.4881 17.7143 18.8573V16.5716H18.8571C19.488 16.5716 20 16.0596 20 15.4287V8.57157C20 7.94071 19.488 7.42871 18.8571 7.42871ZM16.5714 18.8573H7.42852V13.143H16.5714V18.8573ZM17.7142 10.8569H15.4285V9.71406H17.7142V10.8569Z"
      fill="black"
    />
    <rect
      x="8.57153"
      y="16.5713"
      width="3.42857"
      height="1.14286"
      fill="black"
    />
    <rect
      x="8.57153"
      y="14.2856"
      width="6.85714"
      height="1.14286"
      fill="black"
    />
  </svg>
</template>

<script>
export default {
  name: 'PrintIcon',
  props: {
    title: {
      type: String,
      default: 'print'
    }
  }
}
</script>
