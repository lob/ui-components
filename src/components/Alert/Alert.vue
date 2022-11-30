<template>
  <div
    :class="['w-full border-l-4 py-3 px-4 rounded-r-lg flex justify-start items-start text-sm',
             { 'bg-turquoise-100 border-turquoise-500': info },
             { 'bg-mint-100 border-success': success },
             { 'bg-lemon-100 border-warning': warning },
             { 'bg-coral-100 border-coral-700': error }
    ]"
  >
    <component
      :is="icon"
      class="h-6 w-6 flex-shrink-0"
      :class="[{ 'text-gray-500': success },
               { 'text-turquoise-500': info },
               { 'text-warning': warning },
               { 'text-coral-700': error }
      ]"
    />
    <div class="px-4">
      <slot :link-color="linkColor" />
    </div>
  </div>
</template>

<script>
import Info from '../Icons/Info.vue';
import Checkmark from '../Icons/Checkmark.vue';
import CircleExclamation from '../Icons/CircleExclamation.vue';

export default {
  name: 'Alert',
  components: { Info, Checkmark, CircleExclamation },
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
        { variant: 'warning', icon: 'CircleExclamation', linkColor: 'text-gray-700' },
        { variant: 'error', icon: 'CircleExclamation', linkColor: 'text-coral-700' }
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
