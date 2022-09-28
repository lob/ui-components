<template>
  <div class="inline-block">
    <div
      :class="['flex justify-center align-center',
               { 'px-4 py-2 rounded-full': rounded },
               { 'px-2 py-1 rounded-sm': square },
               { 'bg-white-300 text-gray-500': info },
               { 'bg-mint-100 text-mint-900': success },
               { 'bg-lemon-100 text-lemon-900': warning },
               { 'bg-coral-100 text-error': error },
               { 'bg-turquoise-100 text-turquoise-900': turquoise },
               { 'bg-flint-100 text-gray-700': flint },
               { 'bg-gradient-114 from-[#1876db] to-[#5748ff] text-white': gradient },
               { '!py-0.5': small }
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
      default: 'info',
      validator: function (value) {
        return ['info', 'success', 'warning', 'error', 'turquoise', 'flint', 'gradient'].includes(value);
      }
    },
    shape: {
      type: String,
      default: 'rounded',
      validator: function (value) {
        return ['rounded', 'square'].includes(value);
      }
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
    turquoise () {
      return this.variant === 'turquoise';
    },
    flint () {
      return this.variant === 'flint';
    },
    gradient () {
      return this.variant === 'gradient';
    },
    rounded () {
      return this.shape === 'rounded';
    },
    square () {
      return this.shape === 'square';
    },
    small () {
      return this.size === 'small';
    }
  }
};
</script>
