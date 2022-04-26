<template>
  <div
    :class="['w-full border-l-4 p-4.5 rounded-r-lg flex justify-start align-center font-light',
             { 'bg-turquoise-100 border-turquoise-500': info },
             { 'bg-mint-100 border-success': success },
             { 'bg-lemon-100 border-warning': warning },
             { 'bg-coral-100 border-coral-700': error }
    ]"
  >
    <component
      :is="icon"
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
  data () {
    return {
      iconTypes: [{ variant: 'info', icon: 'Info' }, { variant: 'success', icon: 'Checkmark' }, { variant: 'warning', icon: 'Warning' }, { variant: 'error', icon: 'Error' }]
    };
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
    icon () {
      const selectedVariant = this.iconTypes.find((currentVariant) => currentVariant.variant === this.variant);
      return selectedVariant.icon;
    }
  }
};
</script>
