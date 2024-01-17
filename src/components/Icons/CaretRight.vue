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
    path: "M18.497 13.695a2.403 2.403 0 0 0 0-3.396L8.901.703A2.389 2.389 0 0 0 6.285.186 2.4 2.4 0 0 0 4.8 2.405v19.192c0 .967.585 1.844 1.485 2.219.9.375 1.926.165 2.616-.517l9.596-9.596v-.008z",
  },
  xl: {
    size: 20,
    path: "M15.414 11.413c.781-.781.781-2.05 0-2.83L7.418.586a1.99 1.99 0 0 0-2.18-.431A2 2 0 0 0 4 2.004v15.993a2.002 2.002 0 0 0 3.417 1.418l7.997-7.996v-.006z",
  },
  l: {
    size: 18,
    path: "M13.873 10.271a1.802 1.802 0 0 0 0-2.547L6.676.527A1.791 1.791 0 0 0 4.713.14 1.8 1.8 0 0 0 3.6 1.804v14.394a1.802 1.802 0 0 0 3.076 1.276l7.197-7.197v-.006z",
  },
  m: {
    size: 16,
    path: "M12.331 9.13a1.602 1.602 0 0 0 0-2.264L5.934.469A1.592 1.592 0 0 0 4.19.124c-.6.25-.99.83-.99 1.48v12.794a1.601 1.601 0 0 0 2.734 1.135l6.397-6.398V9.13z",
  },
  s: {
    size: 14,
    path: "M10.79 7.989a1.401 1.401 0 0 0 0-1.981L5.192.41A1.393 1.393 0 0 0 3.666.108 1.4 1.4 0 0 0 2.8 1.403v11.195a1.405 1.405 0 0 0 2.392.993l5.598-5.598V7.99z",
  },
};

export default {
  name: "CaretRight",
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
