<template>
  <div class="inline-block">
    <div
      :class="['flex justify-center align-center px-4 py-1 rounded-full',
               [ small ? '!type-xs-600' : 'type-small-600' ],
               { 'text-gray-500 bg-gray-50': defaultVariant },
               { 'bg-white text-gray-500 border border-gray-100': secondary },
               { 'bg-blue-50 text-blue-600': info },
               { 'bg-green-50 text-green-700': success },
               { 'bg-orange-50 text-orange-600': warning },
               { 'bg-red-50 text-red-600': error },
               { 'bg-gradient-114 from-[#1876db] to-[#5748ff] !text-white': gradientPrimary },
               { 'bg-gradient-114 from-[#9F94FF] to-[#FA6A8C] !text-white': gradientSecondary }
      ]"
    >
      <slot />
    </div>
  </div>
</template>

<script>
export default {
  name: 'Badge',
  props: {
    variant: {
      type: String,
      default: 'default',
      validator: (value) =>
        ['default', 'secondary', 'info', 'success', 'warning', 'error', 'gradient-primary', 'gradient-secondary'].includes(value)
    },
    size: {
      type: String,
      default: 'default',
      validator: function (value) {
        return ['default', 'small'].includes(value);
      }
    }
  },
  computed: {
    defaultVariant () {
      return this.variant === 'default';
    },
    secondary () {
      return this.variant === 'secondary';
    },
    info () {
      return this.variant === 'info';
    },
    success () {
      return this.variant === 'success';
    },
    warning () {
      return this.variant === 'warning';
    },
    error () {
      return this.variant === 'error';
    },
    gradientPrimary () {
      return this.variant === 'gradient-primary';
    },
    gradientSecondary () {
      return this.variant === 'gradient-secondary';
    },
    small () {
      return this.size === 'small';
    }
  }
};
</script>
