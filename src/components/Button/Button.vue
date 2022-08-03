<template>
  <button
    :class="[
      'flex justify-center items-center rounded-lg focus-visible:ring-4 focus-visible:ring-primary-100 focus:outline-none',
      { 'font-medium': primary || secondary },
      { 'px-6 text-base h-[48px]': regular },
      { 'px-4 text-sm h-[32px]': small },
      { 'px-0 h-full text-base': link },
      { 'underline text-primary-500 hover:text-primary-900 active:text-primary-900 disabled:text-gray-500': link },
      { 'cursor-not-allowed': disabled },
      { 'active:scale-[.96]': !disabled && !link },
      { 'primary text-white transform disabled:bg-gray-100': primary && !warning },
      { 'primary warning text-white disabled:bg-coral-200': primary && warning },
      { 'secondary bg-white border border-gray-300 text-gray-500': secondary && !warning,
        'hover:bg-gray-100/[.15] active:bg-bg-gray-100/[.25] disabled:border-gray-100 disabled:text-gray-100': secondary && !warning },
      { 'secondary bg-white border border-chili text-chili': secondary && warning,
        'disabled:border-coral-200 disabled:text-coral-200 hover:bg-chili/[.04] active:bg-chili/[.08]': secondary && warning }
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
        return ['primary', 'secondary', 'link'].includes(value);
      }
    },
    small: {
      type: Boolean,
      default: false
    },
    disabled: {
      type: Boolean,
      default: false
    },
    warning: {
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
    link () {
      return this.variant === 'link';
    },
    regular () {
      return !this.small;
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
.primary:not(:disabled) {
  background: linear-gradient(114.08deg, #1876db 7.95%, #5748ff 90.87%);
}

.primary:focus:not(:disabled),
.primary:hover:not(:disabled):not(:focus) {
  background: linear-gradient(114.08deg, #5748ff 7.95%, #1876db 90.87%);
}

.primary.warning:not(:disabled) {
  background: linear-gradient(114.08deg, #db1818 7.95%, #ec4949 90.87%);
}

.primary.warning:focus:not(:disabled),
.primary.warning:hover:not(:disabled):not(:focus) {
  background: linear-gradient(114.08deg, #ec4949 7.95%, #db1818 90.87%);
}
</style>
