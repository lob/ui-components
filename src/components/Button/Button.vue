<template>
  <button
    :class="[
      'flex justify-center items-center disabled:text-gray-500 focus:outline-none focus:ring-2 focus:ring-primary-100 focus:border-transparent',
      { 'rounded': !link || !none },
      { 'cursor-not-allowed': disabled },
      { 'border-none': disabled && primary },
      {
        'primary bg-primary-500 border border-primary-500 text-white active:bg-primary-700 disabled:bg-white-300': primary
      },
      {
        'secondary bg-white-200 border border-primary-500 text-primary-500 active:text-primary-700 active:border-primary-700 disabled:border-gray-100 disabled:bg-white':
          secondary
      },
      {
        'alert bg-white hover:bg-lemon-300 border border-lemon-700 text-lemon-900 focus:ring-lemon-700 disabled:border-gray-100': alert
      },
      {
        'tertiary bg-white border border-gray-100 text-gray-500 active:border-gray-300 disabled:border-white-300':
          tertiary
      },
      {
        'success bg-success border border-success-500 !text-white active:bg-success-700': success
      },
      {
        'error bg-error border border-error-500 !text-white active:bg-error-700': error
      },
      { 'underline text-primary-300 hover:text-primary-500': link },
      { 'block': none },
      {
        'bg-opacity-50': (success || error) && disabled
      },
      { 'px-6 py-3.5': defaultSize },
      { 'px-3 py-2': small },
      { 'px-6 py-4.5': large },
      { '!p-0': link || none }
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
  props: {
    variant: {
      type: String,
      default: 'primary',
      validator: function (value) {
        return ['primary', 'secondary', 'tertiary', 'success', 'alert', 'error', 'link', 'none'].includes(value);
      }
    },
    size: {
      type: String,
      default: 'default',
      validator: function (value) {
        return ['default', 'small', 'large'].includes(value);
      }
    },
    disabled: {
      type: Boolean,
      default: false
    }
  },
  emits: ['click'],
  computed: {
    primary () {
      return this.variant === 'primary';
    },
    secondary () {
      return this.variant === 'secondary';
    },
    tertiary () {
      return this.variant === 'tertiary';
    },
    success () {
      return this.variant === 'success';
    },
    alert () {
      return this.variant === 'alert';
    },
    error () {
      return this.variant === 'error';
    },
    link () {
      return this.variant === 'link';
    },
    none () {
      return this.variant === 'none';
    },
    defaultSize () {
      return this.size === 'default';
    },
    small () {
      return this.size === 'small';
    },
    large () {
      return this.size === 'large';
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
.primary:hover:not(:disabled):not(:focus) {
  box-shadow: 0 0 10px 2px rgba(24, 118, 219, 0.6);
}

.secondary:hover:not(:disabled):not(:focus) {
  box-shadow: 0 0 10px rgba(65, 101, 129, 0.2);
}

.tertiary:hover:not(:disabled):not(:focus) {
  box-shadow: 0 0 10px 2px rgba(0, 153, 215, 0.2);
}

.alert:hover:not(:disabled):not(:focus) {
  box-shadow: 0 0 10px 2px rgba(245, 158, 11, 0.3);
}

.success:hover:not(:disabled):not(:focus) {
  box-shadow: 0 0 10px 2px rgba(75, 188, 133, 0.3);
}

.error:hover:not(:disabled):not(:focus) {
  box-shadow: 0 0 10px 2px rgba(247, 110, 64, 0.3);
}
</style>
