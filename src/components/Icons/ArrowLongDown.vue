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
const sizeInfo = {
  xxl: { size: 24, path: 'M4.83 15.702c.22-.22.507-.328.795-.328.29 0 .576.11.796.33l4.454 4.455V1.125C10.875.504 11.381 0 12 0s1.125.504 1.125 1.125v19.034l4.454-4.454a1.125 1.125 0 1 1 1.59 1.591l-6.374 6.374c-.44.44-1.15.44-1.59 0L4.83 17.296a1.129 1.129 0 0 1 0-1.594z' },
  xl: { size: 20, path: 'M4.025 13.085a.93.93 0 0 1 .663-.274c.24 0 .48.092.663.275L9.063 16.8V.937C9.063.42 9.484 0 10 0s.937.42.937.937V16.8l3.712-3.711a.937.937 0 1 1 1.326 1.325l-5.312 5.312a.937.937 0 0 1-1.326 0l-5.312-5.312a.94.94 0 0 1 0-1.328z' },
  l: { size: 18, path: 'M3.623 11.776a.837.837 0 0 1 .596-.246.84.84 0 0 1 .597.248l3.34 3.341V.845a.845.845 0 0 1 1.687 0V15.12l3.341-3.341a.843.843 0 1 1 1.194 1.193l-4.781 4.78a.843.843 0 0 1-1.194 0l-4.78-4.78a.847.847 0 0 1 0-1.196z' },
  m: { size: 16, path: 'M3.22 10.468a.744.744 0 0 1 .53-.219c.193 0 .384.073.53.22l2.97 2.97V.75a.751.751 0 0 1 1.5 0v12.69l2.97-2.969a.75.75 0 1 1 1.06 1.06l-4.25 4.25a.75.75 0 0 1-1.06 0l-4.25-4.25a.752.752 0 0 1 0-1.062z' },
  s: { size: 14, path: 'M2.817 9.16a.653.653 0 0 1 .928 0l2.599 2.6V.656a.657.657 0 0 1 1.312 0V11.76l2.598-2.599a.656.656 0 1 1 .928.928l-3.718 3.719a.656.656 0 0 1-.928 0l-3.719-3.719a.658.658 0 0 1 0-.93z' }
};

export default {
  name: 'ArrowLongDown',
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
      return sizeInfo[this.size].size;
    },
    path () {
      return sizeInfo[this.size].path;
    }
  }
};
</script>
