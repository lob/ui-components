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
  xxl: { size: 24, path: 'm7.859.413 10.215 10.662c.249.258.373.592.373.925 0 .333-.124.668-.373.925L7.859 23.587a1.335 1.335 0 0 1-1.891.04 1.332 1.332 0 0 1-.04-1.892L15.3 11.95 5.93 2.265A1.332 1.332 0 0 1 5.97.373a1.333 1.333 0 0 1 1.889.04z' },
  xl: { size: 20, path: 'm6.55.344 8.512 8.885c.207.215.31.493.31.771s-.103.556-.31.771l-8.513 8.885a1.112 1.112 0 0 1-1.576.033 1.11 1.11 0 0 1-.033-1.576l7.81-8.155-7.809-8.07A1.11 1.11 0 0 1 4.975.31a1.11 1.11 0 0 1 1.574.033z' },
  l: { size: 18, path: 'm5.894.31 7.661 7.996a.996.996 0 0 1 0 1.388l-7.66 7.996a1.001 1.001 0 0 1-1.42.03 1 1 0 0 1-.03-1.419l7.03-7.339L4.447 1.7a1 1 0 0 1 .03-1.42A1 1 0 0 1 5.894.31z' },
  m: { size: 16, path: 'm5.24.276 6.81 7.107a.886.886 0 0 1 0 1.234l-6.81 7.107a.89.89 0 0 1-1.261.027.888.888 0 0 1-.027-1.261L10.2 7.966 3.953 1.51A.888.888 0 0 1 3.98.249a.888.888 0 0 1 1.26.027z' },
  s: { size: 14, path: 'm4.584.241 5.959 6.22a.775.775 0 0 1 0 1.079l-5.959 6.219a.778.778 0 0 1-1.103.023.777.777 0 0 1-.023-1.103L8.925 6.97 3.459 1.32A.777.777 0 0 1 3.482.218.777.777 0 0 1 4.584.24z' }
};

export default {
  name: 'ChevronRight',
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
