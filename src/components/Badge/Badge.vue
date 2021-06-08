<template>
  <div class="inline-block">
    <div
      :class="['flex justify-center align-center',
               { 'px-4 py-2 rounded-full': rounded },
               { 'px-2 py-1 rounded-sm': square },
               { 'bg-white-300 text-gray-500 hover:bg-gray-100': info },
               { 'bg-mint-100 text-mint-900 hover:bg-mint-300': success && !info },
               { 'bg-lemon-100 text-lemon-900 hover:bg-lemon-300': warning && !info && !success },
               { 'bg-coral-100 text-coral-900 hover:bg-coral-300': error && !info && !success && !warning },
               { 'bg-turquoise-100 text-turquoise-900 hover:bg-turquoise-300': error && !info && !success && !warning && !error },
               { 'bg-flint-100 text-gray-700 hover:bg-flint-300': error && !info && !success && !warning && !error && !turquoise }
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
    info: {
      type: Boolean,
      default: true
    },
    success: {
      type: Boolean,
      default: false
    },
    warning: {
      type: Boolean,
      default: false
    },
    error: {
      type: Boolean,
      default: false
    },
    turquoise: {
      type: Boolean,
      default: false
    },
    flint: {
      type: Boolean,
      default: false
    },
    rounded: {
      type: Boolean,
      default: true
    },
    square: {
      type: Boolean,
      default: false
    }
  }
};
</script>
