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
  name: 'MegaButton',
  props: {
    variant: {
      type: String,
      default: 'primary',
      validator: function (value) {
        return ['primary', 'none'].includes(value);
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
</style>
