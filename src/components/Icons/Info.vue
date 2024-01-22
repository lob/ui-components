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
    path: 'M15.6 21.6h-2.4V8.4A1.2 1.2 0 0 0 12 7.2h-2c-.662 0-1.2.54-1.2 1.2 0 .66.537 1.2 1.2 1.2h.8v12H8.4c-.663 0-1.2.54-1.2 1.2 0 .66.537 1.2 1.2 1.2h7.2a1.2 1.2 0 0 0 0-2.4zM12 4.8A2.4 2.4 0 1 0 12 0a2.4 2.4 0 0 0 0 4.8z'
  },
  xl: {
    size: 20,
    path: 'M13 18h-2V7a1 1 0 0 0-1-1H8.333c-.552 0-1 .45-1 1s.448 1 1 1H9v10H7c-.552 0-1 .45-1 1s.448 1 1 1h6a1 1 0 0 0 0-2zM10 4a2 2 0 1 0 0-4 2 2 0 0 0 0 4z'
  },
  l: {
    size: 18,
    path: 'M11.7 16.2H9.9V6.3a.9.9 0 0 0-.9-.9H7.5c-.497 0-.9.405-.9.9s.403.9.9.9h.6v9H6.3c-.497 0-.9.405-.9.9s.403.9.9.9h5.4a.9.9 0 0 0 0-1.8zM9 3.6A1.8 1.8 0 1 0 9 0a1.8 1.8 0 0 0 0 3.6z'
  },
  m: {
    size: 16,
    path: 'M10.4 14.4H8.8V5.6a.8.8 0 0 0-.8-.8H6.667c-.442 0-.8.36-.8.8 0 .44.358.8.8.8H7.2v8H5.6c-.442 0-.8.36-.8.8 0 .44.358.8.8.8h4.8a.8.8 0 0 0 0-1.6zM8 3.2A1.6 1.6 0 1 0 8 0a1.6 1.6 0 0 0 0 3.2z'
  },
  s: {
    size: 14,
    path: 'M9.1 12.6H7.7V4.9a.7.7 0 0 0-.7-.7H5.833a.701.701 0 0 0 0 1.4H6.3v7H4.9a.701.701 0 0 0 0 1.4h4.2a.7.7 0 0 0 0-1.4zM7 2.8A1.4 1.4 0 1 0 7 0a1.4 1.4 0 0 0 0 2.8z'
  }
};

export default {
  name: 'Info',
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
