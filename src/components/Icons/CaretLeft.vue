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
    path: "M5.503 13.695a2.403 2.403 0 0 1 0-3.396L15.1.703a2.389 2.389 0 0 1 2.616-.517A2.4 2.4 0 0 1 19.2 2.405v19.192c0 .967-.585 1.844-1.485 2.219-.9.375-1.926.165-2.616-.517l-9.596-9.596v-.008z",
  },
  xl: {
    size: 20,
    path: "M4.586 11.413c-.781-.781-.781-2.05 0-2.83L12.583.586a1.99 1.99 0 0 1 2.18-.431A2 2 0 0 1 16 2.004v15.993a2.002 2.002 0 0 1-3.417 1.418L4.586 11.42v-.006z",
  },
  l: {
    size: 18,
    path: "M4.127 10.271a1.802 1.802 0 0 1 0-2.547L11.324.527A1.791 1.791 0 0 1 13.287.14 1.8 1.8 0 0 1 14.4 1.804v14.394c0 .725-.439 1.383-1.114 1.664a1.802 1.802 0 0 1-1.962-.388l-7.197-7.197v-.006z",
  },
  m: {
    size: 16,
    path: "M3.669 9.13a1.602 1.602 0 0 1 0-2.264L10.066.469A1.592 1.592 0 0 1 11.81.124c.6.25.99.83.99 1.48v12.794a1.602 1.602 0 0 1-2.734 1.135L3.67 9.134V9.13z",
  },
  s: {
    size: 14,
    path: "M3.21 7.989a1.402 1.402 0 0 1 0-1.981L8.808.41a1.393 1.393 0 0 1 1.526-.302 1.4 1.4 0 0 1 .866 1.295v11.195a1.405 1.405 0 0 1-2.392.993L3.21 7.993V7.99z",
  },
};

export default {
  name: "CaretLeft",
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
