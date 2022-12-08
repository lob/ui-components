<template>
  <svg
    :width="currentSize"
    :height="currentSize"
    :viewBox="`0 0 ${currentSize} ${currentSize}`"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      :d="path"
      fill="currentColor"
    />
  </svg>
</template>

<script>
const iconInfo = {
  xxl: { size: 24, path: 'M10.305 18.497a2.403 2.403 0 0 0 3.396 0l9.596-9.596c.69-.69.892-1.717.517-2.616A2.4 2.4 0 0 0 21.595 4.8l-19.192.008a2.402 2.402 0 0 0-1.702 4.1l9.596 9.597.008-.008z' },
  xl: { size: 20, path: 'M8.587 15.414c.781.781 2.05.781 2.83 0l7.997-7.996a1.99 1.99 0 0 0 .431-2.18A2 2 0 0 0 17.996 4l-15.993.006A2.002 2.002 0 0 0 .585 7.423l7.996 7.998.006-.007z' },
  l: { size: 18, path: 'M7.729 13.873a1.802 1.802 0 0 0 2.547 0l7.197-7.197c.517-.518.669-1.288.388-1.963A1.8 1.8 0 0 0 16.196 3.6l-14.394.006A1.802 1.802 0 0 0 .526 6.682l7.197 7.196.006-.005z' },
  m: { size: 16, path: 'M6.87 12.331c.625.625 1.64.625 2.264 0l6.397-6.397c.46-.46.595-1.144.345-1.744a1.6 1.6 0 0 0-1.48-.99l-12.794.005A1.601 1.601 0 0 0 .467 5.94l6.398 6.397.005-.005z' },
  s: { size: 14, path: 'M6.011 10.79a1.401 1.401 0 0 0 1.981 0l5.598-5.598c.402-.402.52-1.001.302-1.526a1.4 1.4 0 0 0-1.295-.866l-11.195.004a1.405 1.405 0 0 0-.993 2.393l5.598 5.597.004-.004z' }
};

export default {
  name: 'CaretDown',
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
    currentSize () {
      return iconInfo[this.size].size;
    },
    path () {
      return iconInfo[this.size].path;
    }
  }
};
</script>
