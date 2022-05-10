<template>
  <div
    :class="['w-full border-l-4 p-4.5 rounded-r-lg flex justify-start items-center font-light',
             { 'bg-turquoise-100 border-turquoise-500': info },
             { 'bg-mint-100 border-success': success },
             { 'bg-lemon-100 border-warning': warning },
             { 'bg-coral-100 border-coral-700': error }
    ]"
  >
    <component
      :is="icon"
      class="mr-4 h-6 w-6 flex-shrink-0"
    />
    <div class="block">
      <slot :link-color="linkColor" />
    </div>
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
      variantDetails: [
        { variant: 'info', icon: 'Info', linkColor: 'text-turquoise-700' },
        { variant: 'success', icon: 'Checkmark', linkColor: 'text-mint-900' },
        { variant: 'warning', icon: 'Warning', linkColor: 'text-gray-700' },
        { variant: 'error', icon: 'Error', linkColor: 'text-coral-700' }
      ]
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
      const selectedVariant = this.variantDetails.find((currentVariant) => currentVariant.variant === this.variant);
      return selectedVariant.icon;
    },
    linkColor () {
      const selectedVariant = this.variantDetails.find((currentVariant) => currentVariant.variant === this.variant);
      return selectedVariant.linkColor;
    }
  }
};
</script>
