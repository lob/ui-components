<template>
  <div
    :class="['w-full border-l-4 p-4.5 rounded-r-lg flex justify-start align-center font-light',
             { 'bg-turquoise-100 border-turquoise-500': info },
             { 'bg-mint-100 border-success': success },
             { 'bg-lemon-100 border-warning': warning },
             { 'bg-coral-100 border-coral-700': error }
    ]"
  >
    <Info
      v-if="info"
      class="mr-4"
    />
    <Checkmark
      v-if="success"
      class="mr-4"
    />
    <Warning
      v-if="warning"
      class="mr-4"
    />
    <Error
      v-if="error"
      class="mr-4"
    />
    <slot />
  </div>
</template>

<script>
import Info from '../Icons/Info.vue';
import Checkmark from '../Icons/Checkmark.vue';
import Warning from '../Icons/Warning.vue';
import Error from '../Icons/Error.vue';

export default {
  name: 'Alert',
  components: { Info, Checkmark, Warning, Error },
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
      return this.variant === 'info' ? 'info' : false;
    },
    success () {
      return this.variant === 'success' ? 'success' : false;
    },
    warning () {
      return this.variant === 'warning' ? 'warning' : false;
    },
    error () {
      return this.variant === 'error' ? 'error' : false;
    }
  }
};
</script>
