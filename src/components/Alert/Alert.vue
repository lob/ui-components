<template>
  <div
    :class="['w-full py-3 px-4',
             { 'bg-blue-50 text-blue-700': info },
             { 'bg-green-50 text-green-700': success },
             { 'bg-orange-50 text-orange-600': warning },
             { 'bg-red-50 text-red-700': error }
    ]"
  >
    <div
      v-if="hasHeading"
      class="flex justify-between"
    >
      <div class="flex">
        <component
          :is="icon"
          v-if="showIcon"
          class="h-6 w-6 flex-shrink-0 mr-2"
          :class="[{ 'text-green-700': success },
                   { 'text-blue-700': info },
                   { 'text-orange-600': warning },
                   { 'text-red-700': error }
          ]"
        />
        <div class="type-base-700">
          <slot name="heading" />
        </div>
      </div>
      <LobLink
        v-if="learnMoreLink"
        :to="learnMoreLink"
        :underline="false"
        class="ml-4 !type-xs-400 text-gray-500"
      >
        {{ linkDisplayText }}
        <ArrowRight class="inline w-3 h-3" />
      </LobLink>
      <button v-if="showCloseButton">
        <Close class="w-4 h-4 ml-4" />
      </button>
    </div>
    <div
      v-if="hasContent"
      class="flex items-center justify-between"
    >
      <div class="flex items-center">
        <component
          :is="icon"
          v-if="showIcon && !hasHeading"
          class="h-6 w-6 flex-shrink-0 mr-2"
          :class="[{ 'text-green-700': success },
                   { 'text-blue-700': info },
                   { 'text-orange-600': warning },
                   { 'text-red-700': error }
          ]"
        />
        <!-- text/any content goes in the default slot -->
        <div class="type-xs-400 mt-1">
          <slot />
        </div>
      </div>
      <div v-if="!hasHeading">
        <LobLink
          v-if="learnMoreLink"
          :to="learnMoreLink"
          :underline="false"
          class="ml-4 !type-xs-400 text-gray-500"
        >
          {{ linkDisplayText }}
          <ArrowRight class="inline w-3 h-3" />
        </LobLink>
        <button v-if="showCloseButton">
          <Close class="w-4 h-4 ml-4" />
        </button>
      </div>
    </div>
  </div>
</template>

<script>
import { Info, Checkmark, AlertCircle, Close, ArrowRight } from '@/components/Icons';
import LobLink from '../Link/Link';

export default {
  name: 'Alert',
  components: { Info, Checkmark, AlertCircle, Close, ArrowRight, LobLink },
  props: {
    variant: {
      type: String,
      default: 'info',
      validator: function (value) {
        return ['info', 'success', 'warning', 'error'].includes(value);
      }
    },
    showIcon: {
      type: Boolean,
      default: true
    },
    showCloseButton: {
      type: Boolean,
      default: false
    },
    learnMoreLink: {
      type: String,
      default: null
    },
    linkDisplayText: {
      type: String,
      default: 'Learn more'
    }
  },
  emits: ['close'],
  data () {
    return {
      variantDetails: [
        { variant: 'info', icon: 'Info' },
        { variant: 'success', icon: 'Checkmark' },
        { variant: 'warning', icon: 'AlertCircle' },
        { variant: 'error', icon: 'AlertCircle' }
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
    hasHeading () {
      return Boolean(this.$slots.heading);
    },
    hasContent () {
      return Boolean(this.$slots.default);
    }
  },
  methods: {
    closeAlert () {
      this.$emit('close');
    }
  }
};
</script>
