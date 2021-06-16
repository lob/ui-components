<template>
  <div
    :class="['w-full p-4.5 rounded-md flex justify-center align-center',
             { 'bg-turquoise-100': info },
             { 'bg-mint-100': success },
             { 'bg-lemon-100': warning },
             { 'bg-coral-100': error }
    ]"
  >
    <slot />
  </div>
</template>

<script>
export default {
  name: 'Alert',
  props: {
    variant: {
      type: String,
      default: 'info',
      validator: function (value) {
        return ['info', 'success', 'warning', 'error'].includes(value);
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
    }
  }
};
</script>
