<template>
  <button
    :class="[
      'flex justify-center items-center px-8 py-2.5 rounded-lg focus:ring-4 font-bold textTwenty',
      { 'cursor-not-allowed ': disabled },
      { 'focus:ring-primary-100': !warning },
      { 'focus:ring-coral-700': warning },
      { 'primary bg-primary-500 text-white active:bg-black disabled:bg-gray-100': primary && !warning },
      { 'primary warning bg-coral-900 text-white active:bg-coral-700 disabled:bg-coral-200': primary && warning },
      { 'secondary border border-primary-500 bg-white text-primary-500': secondary && !warning,
        'disabled:border-gray-100 disabled:text-gray-100 active:border-black active:text-black': secondary && !warning },
      { 'secondary border border-coral-900 bg-white text-coral-900': secondary && warning,
        'disabled:border-coral-200 disabled:text-coral-200 active:border-coral-700 active:text-coral-700': secondary && warning }
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
  name: 'NewButton',
  props: {
    variant: {
      type: String,
      default: 'primary',
      validator: function (value) {
        return ['primary', 'secondary'].includes(value);
      }
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
.textTwenty {
  font-size: 20px;
}

.primary:focus:not(:active):not(:disabled),
.primary:hover:not(:disabled):not(:focus) {
  background: linear-gradient(105.01deg, #0154ac 17.25%, #1876db 93.21%);
}

.primary.warning:focus:not(:active):not(:disabled),
.primary.warning:hover:not(:disabled):not(:focus) {
  background: linear-gradient(95.27deg, #611d18 4.76%, #943832 81.28%);
}

.secondary:hover:not(:disabled):not(:focus),
.primary:hover:not(:disabled):not(:focus) {
  box-shadow:
    0 9px 12px 0 rgba(0, 0, 0, 0.2),
    0 19px 29px 0 rgba(0, 0, 0, 0.14),
    0 7px 36px 0 rgba(0, 0, 0, 0.12);
}

.primary:not(:disabled):focus:active,
.secondary:not(:disabled):focus:active {
  box-shadow: none;
}
</style>
