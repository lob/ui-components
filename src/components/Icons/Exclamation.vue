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
  xxl: { size: 24, path: 'M12 18c.71 0 1.286-.576 1.286-1.286V1.285a1.285 1.285 0 1 0-2.572 0v15.429c0 .712.575 1.286 1.286 1.286zm0 2.57A1.715 1.715 0 1 0 12 24a1.715 1.715 0 0 0 0-3.43z' },
  xl: { size: 20, path: 'M10 15c.592 0 1.072-.48 1.072-1.072V1.071a1.07 1.07 0 1 0-2.143 0v12.857A1.07 1.07 0 0 0 10 15zm0 2.142A1.429 1.429 0 1 0 10 20a1.429 1.429 0 0 0 0-2.858z' },
  l: { size: 18, path: 'M9 13.5a.964.964 0 0 0 .964-.965V.964a.964.964 0 1 0-1.928 0v11.571c0 .535.43.965.964.965zm0 1.928A1.286 1.286 0 1 0 9 18a1.286 1.286 0 0 0 0-2.572z' },
  m: { size: 16, path: 'M8 12a.857.857 0 0 0 .857-.857V.857a.857.857 0 1 0-1.714 0v10.286c0 .474.383.857.857.857zm0 1.714A1.143 1.143 0 1 0 8 16a1.143 1.143 0 0 0 0-2.286z' },
  s: { size: 14, path: 'M7 10.5a.75.75 0 0 0 .75-.75v-9a.75.75 0 1 0-1.5 0v9c0 .415.335.75.75.75zM7 12a1 1 0 1 0 0 2 1 1 0 0 0 0-2z' }
};

export default {
  name: 'Exclamation',
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
