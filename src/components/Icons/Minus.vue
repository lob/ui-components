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
    path: "M24 12c0 .767-.617 1.385-1.385 1.385H1.385a1.384 1.384 0 1 1 0-2.77h21.23c.768 0 1.385.624 1.385 1.385z",
  },
  xl: {
    size: 20,
    path: "M20 10c0 .64-.514 1.154-1.154 1.154H1.154a1.154 1.154 0 1 1 0-2.308h17.692c.64 0 1.154.52 1.154 1.154z",
  },
  l: {
    size: 18,
    path: "M18 9c0 .575-.463 1.038-1.038 1.038H1.038a1.038 1.038 0 1 1 0-2.077h15.924C17.537 7.961 18 8.43 18 9z",
  },
  m: {
    size: 16,
    path: "M16 8a.92.92 0 0 1-.923.923H.923a.923.923 0 1 1 0-1.846h14.154c.511 0 .923.415.923.923z",
  },
  s: {
    size: 14,
    path: "M14 7c0 .448-.36.808-.808.808H.808a.808.808 0 1 1 0-1.616h12.384c.448 0 .808.364.808.808z",
  },
};

export default {
  name: "Minus",
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
