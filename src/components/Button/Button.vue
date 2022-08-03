<template>
  <button
    :class="[
      'flex justify-center items-center rounded-lg focus-visible:ring-4 focus-visible:ring-primary-100 focus:outline-none',
      { 'font-medium': primary || secondary || subtle },
      { 'px-6 text-base h-[48px]': regular },
      { 'px-4 text-sm h-[32px]': small },
      { 'px-0 h-full text-base': link },
      { 'underline text-primary-500 hover:text-primary-900 active:text-primary-900 disabled:text-gray-500': link },
      { 'cursor-not-allowed': disabled },
      { 'active:scale-[.96]': !disabled && !link },
      { 'bg-gradient-114 from-[#1876db] to-[#5748ff] hover:from-[#5748ff] hover:to-[#1876db] text-white': primary && !warning && !disabled },
      { 'text-white disabled:bg-gray-100': primary && !warning && disabled },
      { 'bg-gradient-114 from-[#db1818] to-[#ec4949] hover:from-[#ec4949] hover:to-[#db1818] text-white': primary && warning && !disabled },
      { 'text-white disabled:!bg-coral-200': primary && warning && disabled },
      { 'bg-white text-gray-500 border disabled:hover:bg-transparent': secondary && !warning,
        'hover:bg-gray-100/[.15] active:bg-bg-gray-100/[.25] disabled:text-gray-100 disabled:border': secondary && !warning },
      { 'bg-white text-chili border disabled:hover:bg-transparent disabled:text-coral-200 disabled:border hover:bg-chili/[.04] active:bg-chili/[.08]': secondary && warning },
      { 'text-primary-500 hover:bg-primary-500/[.04] active:bg-primary-500/[.08] active:text-primary-700 disabled:text-gray-100 disabled:border disabled:hover:bg-transparent': subtle && !warning },
      { 'text-chili hover:bg-chili/[.04] active:bg-chili/[.08] disabled:text-coral-300 disabled:border disabled:hover:bg-transparent': subtle && warning }
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
        return ['primary', 'secondary', 'link', 'subtle'].includes(value);
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
    subtle () {
      return this.variant === 'subtle';
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
