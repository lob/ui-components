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
    path: 'M12 13.5H9a3.749 3.749 0 0 0-3.75 3.75c0 .413.338.75.75.75h9a.75.75 0 0 0 .75-.75A3.749 3.749 0 0 0 12 13.5zM10.5 12a3 3 0 1 0 0-6 3 3 0 0 0 0 6zm12 3h-.75v4.5h.75a.75.75 0 0 0 .75-.75v-3a.752.752 0 0 0-.75-.75zm0-12h-.75v4.5h.75c.413 0 .75-.338.75-.75v-3A.751.751 0 0 0 22.5 3zm0 6h-.75v4.5h.75c.413 0 .75-.338.75-.75v-3A.752.752 0 0 0 22.5 9zm-5.25-9H3.75a3 3 0 0 0-3 3v18a3 3 0 0 0 3 3h13.5a3 3 0 0 0 3-3V3c0-1.657-1.345-3-3-3zM18 21a.75.75 0 0 1-.75.75H3.75A.75.75 0 0 1 3 21V3a.75.75 0 0 1 .75-.75h13.5A.75.75 0 0 1 18 3v18z'
  },
  xl: {
    size: 20,
    path: 'M10 11.25H7.5a3.124 3.124 0 0 0-3.125 3.125c0 .344.281.625.625.625h7.5c.345 0 .625-.28.625-.625A3.124 3.124 0 0 0 10 11.25zM8.75 10a2.5 2.5 0 1 0 0-5 2.5 2.5 0 0 0 0 5zm10 2.5h-.625v3.75h.625c.345 0 .625-.28.625-.625v-2.5a.627.627 0 0 0-.625-.625zm0-10h-.625v3.75h.625a.627.627 0 0 0 .625-.625v-2.5a.626.626 0 0 0-.625-.625zm0 5h-.625v3.75h.625a.627.627 0 0 0 .625-.625v-2.5a.627.627 0 0 0-.625-.625zM14.375 0H3.125a2.5 2.5 0 0 0-2.5 2.5v15a2.5 2.5 0 0 0 2.5 2.5h11.25a2.5 2.5 0 0 0 2.5-2.5v-15c0-1.38-1.121-2.5-2.5-2.5zM15 17.5c0 .345-.28.625-.625.625H3.125A.625.625 0 0 1 2.5 17.5v-15c0-.345.28-.625.625-.625h11.25c.345 0 .625.28.625.625v15z'
  },
  l: {
    size: 18,
    path: 'M9 10.125H6.75a2.812 2.812 0 0 0-2.813 2.813c0 .309.254.562.563.562h6.75c.31 0 .563-.252.563-.563A2.812 2.812 0 0 0 9 10.126zM7.875 9a2.25 2.25 0 1 0 0-4.5 2.25 2.25 0 0 0 0 4.5zm9 2.25h-.563v3.375h.563c.31 0 .563-.252.563-.563v-2.25a.564.564 0 0 0-.563-.562zm0-9h-.563v3.375h.563c.31 0 .563-.253.563-.563v-2.25a.563.563 0 0 0-.563-.562zm0 4.5h-.563v3.375h.563c.31 0 .563-.253.563-.563v-2.25a.564.564 0 0 0-.563-.562zM12.937 0H2.813a2.25 2.25 0 0 0-2.25 2.25v13.5A2.25 2.25 0 0 0 2.813 18h10.124a2.25 2.25 0 0 0 2.25-2.25V2.25A2.251 2.251 0 0 0 12.938 0zm.563 15.75c0 .31-.252.563-.563.563H2.813a.563.563 0 0 1-.563-.563V2.25c0-.31.252-.563.563-.563h10.124c.311 0 .563.252.563.563v13.5z'
  },
  m: {
    size: 16,
    path: 'M8 9H6a2.5 2.5 0 0 0-2.5 2.5c0 .275.225.5.5.5h6a.5.5 0 0 0 .5-.5A2.5 2.5 0 0 0 8 9zM7 8a2 2 0 1 0 0-4 2 2 0 0 0 0 4zm8 2h-.5v3h.5a.5.5 0 0 0 .5-.5v-2c0-.275-.225-.5-.5-.5zm0-8h-.5v3h.5c.275 0 .5-.225.5-.5v-2A.5.5 0 0 0 15 2zm0 4h-.5v3h.5c.275 0 .5-.225.5-.5v-2c0-.275-.225-.5-.5-.5zm-3.5-6h-9a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h9a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2zm.5 14a.5.5 0 0 1-.5.5h-9A.5.5 0 0 1 2 14V2a.5.5 0 0 1 .5-.5h9a.5.5 0 0 1 .5.5v12z'
  },
  s: {
    size: 14,
    path: 'M7 7.875H5.25a2.187 2.187 0 0 0-2.188 2.188c0 .24.197.437.438.437h5.25a.438.438 0 0 0 .438-.438A2.187 2.187 0 0 0 7 7.876zM6.125 7a1.75 1.75 0 1 0 0-3.5 1.75 1.75 0 0 0 0 3.5zm7 1.75h-.438v2.625h.438a.438.438 0 0 0 .438-.438v-1.75a.439.439 0 0 0-.438-.437zm0-7h-.438v2.625h.438c.24 0 .438-.197.438-.438v-1.75a.438.438 0 0 0-.438-.437zm0 3.5h-.438v2.625h.438c.24 0 .438-.197.438-.438v-1.75a.439.439 0 0 0-.438-.437zM10.062 0H2.189a1.75 1.75 0 0 0-1.75 1.75v10.5c0 .967.783 1.75 1.75 1.75h7.874a1.75 1.75 0 0 0 1.75-1.75V1.75A1.75 1.75 0 0 0 10.063 0zm.438 12.25a.438.438 0 0 1-.438.438H2.189a.438.438 0 0 1-.438-.438V1.75c0-.242.196-.438.438-.438h7.874c.242 0 .438.196.438.438v10.5z'
  }
};

export default {
  name: 'AddressBook',
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
