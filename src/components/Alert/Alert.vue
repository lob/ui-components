<template>
  <div
    :class="['w-full border-l-4 p-4.5 rounded-r-lg flex justify-center align-center font-light',
             { 'bg-turquoise-100 border-turquoise-500': info },
             { 'bg-mint-100 border-success': success },
             { 'bg-lemon-100 border-warning': warning },
             { 'bg-coral-100 border-coral-700': error }
    ]"
  >
  <Info />
    <slot />
  </div>
</template>

<script>
import Info from '../Icons/Info.vue';

export default {
  name: 'Alert',
  components: { Info },
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
