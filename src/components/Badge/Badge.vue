<template>
  <div class="inline-block">
    <div
      :class="['flex justify-center align-center',
               { 'px-4 py-2 rounded-full': rounded },
               { 'px-2 py-1 rounded-sm': square },
               { 'bg-white-300 text-gray-500 hover:bg-gray-100': info },
               { 'bg-mint-100 text-mint-900 hover:bg-mint-300': success },
               { 'bg-lemon-100 text-lemon-900 hover:bg-lemon-300': warning },
               { 'bg-coral-100 text-coral-900 hover:bg-coral-300': error },
               { 'bg-turquoise-100 text-turquoise-900 hover:bg-turquoise-300': turquoise },
               { 'bg-flint-100 text-gray-700 hover:bg-flint-300': flint },
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
        return ['info', 'success', 'warning', 'error', 'turquoise', 'flint'].includes(value);
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
