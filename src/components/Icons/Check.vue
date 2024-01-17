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
    path: "M23.59 4.02c.547.504.547 1.319 0 1.774L9.44 19.945c-.456.547-1.271.547-1.775 0l-7.288-7.29c-.503-.455-.503-1.27 0-1.774a1.294 1.294 0 0 1 1.819 0l6.38 6.384L21.816 4.02c.504-.5 1.318-.5 1.774 0z",
  },
  xl: {
    size: 20,
    path: "M19.658 3.35c.456.42.456 1.1 0 1.479L7.866 16.62c-.38.456-1.059.456-1.479 0L.314 10.546c-.419-.38-.419-1.058 0-1.478a1.078 1.078 0 0 1 1.516 0l5.317 5.32L18.18 3.35c.42-.417 1.099-.417 1.478 0z",
  },
  l: {
    size: 18,
    path: "M17.692 3.015c.41.378.41.99 0 1.33L7.08 14.96c-.341.41-.952.41-1.33 0L.283 9.492c-.377-.342-.377-.953 0-1.331a.97.97 0 0 1 1.364 0l4.785 4.788 9.93-9.934c.378-.375.989-.375 1.33 0z",
  },
  m: {
    size: 16,
    path: "M15.727 2.68c.364.336.364.88 0 1.183l-9.434 9.434c-.304.364-.847.364-1.183 0L.251 8.437c-.335-.304-.335-.847 0-1.183a.862.862 0 0 1 1.213 0l4.253 4.256 8.827-8.83c.336-.334.879-.334 1.183 0z",
  },
  s: {
    size: 14,
    path: "M13.76 2.345c.32.294.32.77 0 1.035l-8.254 8.255c-.266.319-.74.319-1.035 0L.22 7.382c-.293-.265-.293-.74 0-1.035a.755.755 0 0 1 1.061 0l3.722 3.724 7.723-7.726c.294-.292.769-.292 1.035 0z",
  },
};

export default {
  name: "Check",
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
