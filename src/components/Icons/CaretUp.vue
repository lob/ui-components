<template>
  <svg
    :width="currentSize"
    :height="currentSize"
    :viewBox="`0 0 ${currentSize} ${currentSize}`"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path :d="path" fill="currentColor" />
  </svg>
</template>

<script>
const iconInfo = {
  xxl: {
    size: 24,
    path: "M13.695 5.503a2.403 2.403 0 0 0-3.396 0L.703 15.1a2.389 2.389 0 0 0-.517 2.616A2.4 2.4 0 0 0 2.405 19.2h19.192c.967 0 1.844-.585 2.219-1.485.375-.9.165-1.926-.517-2.616l-9.596-9.596h-.008z",
  },
  xl: {
    size: 20,
    path: "M11.413 4.586c-.781-.781-2.05-.781-2.83 0L.586 12.583a1.99 1.99 0 0 0-.431 2.18A2 2 0 0 0 2.004 16h15.993a2.002 2.002 0 0 0 1.418-3.417L11.42 4.586h-.006z",
  },
  l: {
    size: 18,
    path: "M10.271 4.127a1.802 1.802 0 0 0-2.547 0L.527 11.324a1.791 1.791 0 0 0-.388 1.963A1.8 1.8 0 0 0 1.804 14.4h14.394c.725 0 1.383-.439 1.664-1.114a1.802 1.802 0 0 0-.388-1.962l-7.197-7.197h-.006z",
  },
  m: {
    size: 16,
    path: "M9.13 3.669a1.602 1.602 0 0 0-2.264 0L.469 10.066a1.592 1.592 0 0 0-.345 1.744c.25.6.83.99 1.48.99h12.794a1.602 1.602 0 0 0 1.135-2.734L9.134 3.67H9.13z",
  },
  s: {
    size: 14,
    path: "M7.989 3.21a1.402 1.402 0 0 0-1.981 0L.41 8.808a1.393 1.393 0 0 0-.302 1.526 1.4 1.4 0 0 0 1.295.866h11.195a1.405 1.405 0 0 0 .993-2.392L7.993 3.21H7.99z",
  },
};

export default {
  name: "CaretUp",
  props: {
    size: {
      type: String,
      default: "m",
      validator: function (value) {
        return ["xxl", "xl", "l", "m", "s"].includes(value);
      },
    },
  },
  computed: {
    currentSize() {
      return iconInfo[this.size].size;
    },
    path() {
      return iconInfo[this.size].path;
    },
  },
};
</script>
