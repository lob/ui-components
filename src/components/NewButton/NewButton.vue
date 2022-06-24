<template>
  <button
    :class="[
      'flex justify-center items-center rounded-lg focus-visible:ring-4 focus:outline-none',
      { 'font-medium': primary || secondary },
      { 'px-6 text-base h-[48px]': regular },
      { 'px-4 text-sm h-[32px]': small },
      { 'px-0 h-full text-base': link || none },
      { 'underline text-primary-500 hover:text-primary-900 active:text-primary-900 disabled:text-gray-500': link },
      { 'disabled:text-gray-500': none },
      { 'cursor-not-allowed': disabled },
      { 'focus-visible:ring-primary-100': !warning },
      { 'focus-visible:ring-coral-700': warning },
      { 'primary text-white active:bg-black disabled:bg-gray-100': primary && !warning },
      { 'primary warning text-white active:bg-coral-700 disabled:bg-coral-200': primary && warning },
      { 'secondary border bg-white border-[#5F83A5] text-[#416581] hover:bg-[#c5d6e626] active:bg-[#c5d6e640]': secondary && !warning,
        'disabled:border-gray-100 disabled:text-gray-100 active:border-black active:text-black': secondary && !warning },
      { 'secondary border bg-white border-[#DE3124] text-[#DE3124] hover:bg-[#de31240a]': secondary && warning,
        'disabled:border-coral-200 disabled:text-coral-200 active:bg-[#de312414]': secondary && warning }
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
        return ['primary', 'secondary', 'link', 'none'].includes(value);
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
    none () {
      return this.variant === 'none';
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
.primary:not(:disabled):not(:active) {
  background: linear-gradient(114.08deg, #1876db 7.95%, #5748ff 90.87%);
}

.primary:focus:not(:active):not(:disabled),
.primary:hover:not(:disabled):not(:focus) {
  background: linear-gradient(114.08deg, #5748ff 7.95%, #1876db 90.87%);
}

.primary.warning:not(:disabled):not(:active) {
  background: linear-gradient(114.08deg, #DB1818 7.95%, #EC4949 90.87%);
}

.primary.warning:focus:not(:active):not(:disabled),
.primary.warning:hover:not(:disabled):not(:focus) {
  background: linear-gradient(114.08deg, #EC4949 7.95%, #DB1818 90.87%);
}
</style>
