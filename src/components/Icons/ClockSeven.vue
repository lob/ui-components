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
    path: 'M10.875 5.625c0-.623.502-1.125 1.125-1.125s1.125.502 1.125 1.125V12c0 .22-.066.44-.23.623l-3 4.5c-.304.516-1.003.657-1.518.272-.516-.304-.657-1.003-.315-1.518l2.813-4.22V5.626zM12 0c6.628 0 12 5.372 12 12s-5.372 12-12 12S0 18.628 0 12 5.372 0 12 0zM2.25 12A9.749 9.749 0 0 0 12 21.75 9.749 9.749 0 0 0 21.75 12 9.749 9.749 0 0 0 12 2.25 9.749 9.749 0 0 0 2.25 12z'
  },
  xl: {
    size: 20,
    path: 'M9.063 4.688c0-.52.417-.938.937-.938s.938.418.938.938V10a.76.76 0 0 1-.192.52l-2.5 3.75c-.254.43-.836.546-1.266.226-.43-.254-.546-.836-.261-1.266l2.343-3.515V4.688zM10 0c5.523 0 10 4.477 10 10s-4.477 10-10 10S0 15.523 0 10 4.477 0 10 0zM1.875 10A8.124 8.124 0 0 0 10 18.125 8.124 8.124 0 0 0 18.125 10 8.124 8.124 0 0 0 10 1.875 8.124 8.124 0 0 0 1.875 10z'
  },
  l: {
    size: 18,
    path: 'M8.156 4.219c0-.468.376-.844.844-.844.468 0 .844.376.844.844V9c0 .165-.05.33-.173.468l-2.25 3.375c-.228.386-.752.492-1.139.204-.386-.229-.492-.753-.235-1.14l2.11-3.164V4.22zM9 0a9 9 0 0 1 9 9 9 9 0 0 1-9 9 9 9 0 0 1-9-9 9 9 0 0 1 9-9zM1.687 9A7.311 7.311 0 0 0 9 16.313 7.311 7.311 0 0 0 16.313 9 7.311 7.311 0 0 0 9 1.687 7.311 7.311 0 0 0 1.687 9z'
  },
  m: {
    size: 16,
    path: 'M7.25 3.75c0-.416.334-.75.75-.75s.75.334.75.75V8a.608.608 0 0 1-.153.416l-2 3a.688.688 0 0 1-1.013.18c-.343-.202-.437-.668-.209-1.012L7.25 7.772V3.75zM8 0a8 8 0 0 1 8 8 8 8 0 0 1-8 8 8 8 0 0 1-8-8 8 8 0 0 1 8-8zM1.5 8c0 3.59 2.91 6.5 6.5 6.5s6.5-2.91 6.5-6.5S11.59 1.5 8 1.5 1.5 4.41 1.5 8z'
  },
  s: {
    size: 14,
    path: 'M6.344 3.281c0-.363.292-.656.656-.656.364 0 .656.293.656.656V7a.532.532 0 0 1-.134.364l-1.75 2.625a.602.602 0 0 1-.886.158c-.3-.177-.382-.585-.183-.886l1.64-2.46V3.28zM7 0a7 7 0 0 1 7 7 7 7 0 0 1-7 7 7 7 0 0 1-7-7 7 7 0 0 1 7-7zM1.312 7A5.687 5.687 0 0 0 7 12.688 5.687 5.687 0 0 0 12.688 7 5.687 5.687 0 0 0 7 1.312 5.687 5.687 0 0 0 1.312 7z'
  }
};

export default {
  name: 'ClockSeven',
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
