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
    path: 'M24 12c0 .767-.617 1.384-1.385 1.384h-9.23v9.23a1.385 1.385 0 0 1-2.77 0v-9.23h-9.23a1.384 1.384 0 1 1 0-2.77h9.23v-9.23a1.384 1.384 0 0 1 2.77 0v9.23h9.23c.768 0 1.385.624 1.385 1.385z'
  },
  xl: {
    size: 20,
    path: 'M20 10c0 .639-.514 1.153-1.154 1.153h-7.692v7.693a1.155 1.155 0 0 1-2.308 0v-7.693H1.154a1.154 1.154 0 1 1 0-2.307h7.692V1.153a1.154 1.154 0 0 1 2.308 0v7.693h7.692c.64 0 1.154.519 1.154 1.154z'
  },
  l: {
    size: 18,
    path: 'M18 9c0 .575-.463 1.038-1.038 1.038h-6.923v6.923a1.04 1.04 0 0 1-2.077 0v-6.923H1.038a1.038 1.038 0 1 1 0-2.077h6.924V1.038a1.038 1.038 0 0 1 2.077 0v6.923h6.923C17.537 7.961 18 8.428 18 9z'
  },
  m: {
    size: 16,
    path: 'M16 8a.92.92 0 0 1-.923.923H8.923v6.153a.924.924 0 0 1-1.846 0V8.924H.923a.923.923 0 1 1 0-1.846h6.154V.923a.923.923 0 0 1 1.846 0v6.154h6.154c.511 0 .923.415.923.923z'
  },
  s: {
    size: 14,
    path: 'M14 7c0 .447-.36.807-.808.807H7.808v5.385a.808.808 0 0 1-1.616 0V7.807H.808a.808.808 0 1 1 0-1.615h5.384V.807a.808.808 0 0 1 1.616 0v5.385h5.384c.448 0 .808.363.808.808z'
  }
};

export default {
  name: 'Plus',
  props: {
    size: {
      type: String,
      default: 'm',
      validator: function (value) {
        return ['xxl', 'xl', 'l', 'm', 's'].includes(value);
      }
    }
  },
  computed: {
    currentSize() {
      return iconInfo[this.size].size;
    },
    path() {
      return iconInfo[this.size].path;
    }
  }
};
</script>
