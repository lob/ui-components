<template>
  <button
    :class="[
      'rounded disabled:text-gray-500 focus:outline-none focus:ring-2 focus:ring-primary-100 focus:border-transparent',
      {
        'primary bg-primary-500 text-white active:bg-primary-700 disabled:bg-white-300': primary,
      },
      {
        'secondary bg-white-200 border border-primary-500 text-primary-500 active:text-primary-700 active:border-primary-700 disabled:border-gray-100':
          secondary && !primary,
      },
      {
        'tertiary bg-white border border-gray-100 text-gray-500 active:border-gray-300 disabled:border-white-300':
          tertiary && !primary && !secondary,
      },
      { 'px-6 py-3.5': !small && !large },
      { 'px-3 py-2': small },
      { 'px-6 py-4.5': large && !small },
    ]"
    :disabled="disabled"
    @click="handleClick"
  >
    <span class="flex justify-between items-center">
      <slot />
    </span>
  </button>
</template>

<script>
export default {
  name: 'LobButton',
  emits: ['click'],
  props: {
    primary: {
      type: Boolean,
      default: true
    },
    secondary: {
      type: Boolean,
      default: false
    },
    tertiary: {
      type: Boolean,
      default: false
    },
    small: {
      type: Boolean,
      default: false
    },
    large: {
      type: Boolean,
      default: false
    },
    disabled: {
      type: Boolean,
      default: false
    }
  },
  methods: {
    handleClick ($event) {
      this.$emit('click', $event);
    }
  }
};
</script>

<style scoped lang="scss">
.primary:hover:not(:disabled) {
  box-shadow: 0 0 10px 2px rgba(24, 118, 219, 0.6);
}

.secondary:hover:not(:disabled) {
  box-shadow: 0 0 10px rgba(65, 101, 129, 0.2);
}

.tertiary:hover:not(:disabled) {
  box-shadow: 0 0 10px 2px rgba(0, 153, 215, 0.2);
}
</style>
