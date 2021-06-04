<template>
  <div
    :class="['w-full p-4.5 rounded-md flex justify-center align-center',
             { 'bg-turquoise-100': info },
             { 'bg-mint-100': success && !info },
             { 'bg-lemon-100': warning && !info && !success },
             { 'bg-coral-100': error && !info && !success && !warning }
    ]"
  >
    <slot />
  </div>
</template>

<script>
export default {
  name: 'Alert',
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
    }
  }
};
</script>
