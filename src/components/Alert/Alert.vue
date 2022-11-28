<template>
  <div
    :class="`w-full py-3 px-4 ${variantDetails.color} ${variantDetails.bgColor}`"
    data-testid="alert"
  >
    <div
      v-if="hasHeading"
      class="flex justify-between"
    >
      <div class="flex items-center">
        <component
          :is="variantDetails.icon"
          v-if="showIcon"
          class="h-5 w-5 flex-shrink-0 mr-2"
          :class="variantDetails.color"
          data-testid="alertIcon"
        />
        <div class="type-base-700">
          <slot name="heading" />
        </div>
      </div>
      <LinkAndClose
        :learn-more-link="learnMoreLink"
        :link-display-text="linkDisplayText"
        :show-close-button="showCloseButton"
        @close="closeAlert"
      />
    </div>
    <div
      v-if="hasContent"
      class="flex items-center justify-between"
    >
      <div class="flex items-center">
        <component
          :is="variantDetails.icon"
          v-if="showIcon && !hasHeading"
          class="h-5 w-5 flex-shrink-0 mr-2"
          :class="variantDetails.color"
          data-testid="alertIcon"
        />
        <div :class="['type-xs-400', {'mt-1': hasHeading && hasContent}]">
          <slot /> <!-- text/any content goes in the default slot -->
        </div>
      </div>
      <LinkAndClose
        v-if="!hasHeading"
        :learn-more-link="learnMoreLink"
        :link-display-text="linkDisplayText"
        :show-close-button="showCloseButton"
        @close="closeAlert"
      />
    </div>
  </div>
</template>

<script>
import { Info, Checkmark, AlertCircle, Close, ArrowRight } from '@/components/Icons';
import LobLink from '../Link/Link';

const LinkAndClose = {
  template: `<div><LobLink
          v-if="learnMoreLink"
          :to="learnMoreLink"
          :underline="false"
          target="_blank"
          role="link"
          class="ml-4 !type-xs-400 text-gray-500"
        >
          {{ linkDisplayText }}
          <ArrowRight class="inline w-3 h-3" />
        </LobLink>
        <button v-if="showCloseButton">
          <Close class="w-4 h-4 ml-4" data-testid="closeButton" @click="closeAlert"/>
        </button></div>`,
  components: { LobLink, Close, ArrowRight },
  props: {
    learnMoreLink: String,
    linkDisplayText: String,
    showCloseButton: Boolean
  },
  methods: {
    closeAlert () {
      this.$emit('close');
    }
  }
};

export default {
  name: 'Alert',
  components: { Info, Checkmark, AlertCircle, LinkAndClose },
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
      variants: [
        { variant: 'info', icon: 'Info', color: 'text-blue-700', bgColor: 'bg-blue-50' },
        { variant: 'success', icon: 'Checkmark', color: 'text-green-700', bgColor: 'bg-green-50' },
        { variant: 'warning', icon: 'AlertCircle', color: 'text-orange-600', bgColor: 'bg-orange-50' },
        { variant: 'error', icon: 'AlertCircle', color: 'text-orange-600', bgColor: 'bg-red-50' }
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
    variantDetails () {
      const selectedVariant = this.variants.find((currentVariant) => currentVariant.variant === this.variant);
      return { icon: selectedVariant.icon, color: selectedVariant.color, bgColor: selectedVariant.bgColor };
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
