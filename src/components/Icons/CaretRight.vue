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
  xxl: { size: 24, path: '' },
  xl: { size: 20, path: '' },
  l: { size: 18, path: '' },
  m: { size: 16, path: '' },
  s: { size: 14, path: '' }
};

export default {
  name: 'CaretRight',
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
