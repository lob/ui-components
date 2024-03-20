<template>
  <div
    :class="`w-full rounded-xl py-2 px-4 ${variantDetails.color} ${variantDetails.bgColor}`"
    data-testid="alert"
  >
    <div v-if="hasHeading" class="flex justify-between items-center">
      <div class="flex items-center">
        <component
          :is="variantDetails.icon"
          v-if="showIcon"
          size="l"
          class="mr-2"
          :class="variantDetails.color"
          data-testid="alertIcon"
        />
        <div class="type-base-700">
          <slot name="heading" />
        </div>
      </div>
      <CloseButton
        v-if="showCloseButton"
        :close-button-aria-label="closeButtonAriaLabel"
        @close="closeAlert"
      />
      <LinkWithArrow
        v-if="linkSrc && !hasContent"
        :link-src="linkSrc"
        :link-display-text="linkDisplayText"
        :show-close-button="showCloseButton"
        @close="closeAlert"
      />
    </div>
    <div v-if="hasContent" class="flex items-center justify-between">
      <div class="flex items-center">
        <component
          :is="variantDetails.icon"
          v-if="showIcon && !hasHeading"
          size="l"
          class="mr-4"
          :class="variantDetails.color"
          data-testid="alertIcon"
        />
        <div :class="['type-small-600', { 'mt-1': hasHeading && hasContent }]">
          <slot />
          <!-- text/any content goes in the default slot -->
        </div>
      </div>
      <CloseButton
        v-if="showCloseButton && !hasHeading"
        :close-button-aria-label="closeButtonAriaLabel"
        @close="closeAlert"
      />
    </div>
    <div class="w-full flex justify-end">
      <LinkWithArrow
        v-if="linkSrc && hasContent"
        :link-src="linkSrc"
        :link-display-text="linkDisplayText"
      />
    </div>
  </div>
</template>

<script>
import {
  CircleInfo,
  CircleCheck,
  CircleExclamation,
  TriangleExclamation,
  ArrowsRotate
} from '@/components/Icons';
import { Icon } from '../Icon';
import LobLink from '../Link/Link';
import ArrowUpRight from '../Icons/ArrowUpRight.vue';

const LinkWithArrow = {
  template: `<LobLink
          :to="linkSrc"
          :underline="false"
          target="_blank"
          role="link"
          class="ml-4 !type-small-500 !text-gray-500 hover:!text-gray-500"
        >
          {{ linkDisplayText }}
          <ArrowUpRight class="inline ml-1 mb-1" />
        </LobLink>`,
  components: { LobLink, ArrowUpRight },
  props: {
    linkSrc: String,
    linkDisplayText: String
  }
};

const CloseButton = {
  template: `
  <button
    :aria-label="closeButtonAriaLabel"
    data-testid="closeButton"
    @click="closeAlert"
  >
    <Icon icon="Close" size="xl" class="text-gray-800"/>
  </button>`,
  props: {
    closeButtonAriaLabel: { type: String, default: 'Close alert' }
  },
  components: { Icon },
  methods: {
    closeAlert() {
      this.$emit('close');
    }
  }
};

export default {
  name: 'Alert',
  components: {
    CloseButton,
    LinkWithArrow,
    CircleInfo,
    CircleCheck,
    CircleExclamation,
    TriangleExclamation,
    ArrowsRotate
  },
  props: {
    variant: {
      type: String,
      default: 'info',
      validator: function (value) {
        return ['info', 'success', 'warning', 'refresh', 'error'].includes(
          value
        );
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
    closeButtonAriaLabel: {
      type: String,
      default: 'Close alert'
    },
    linkSrc: {
      type: String,
      default: null
    },
    linkDisplayText: {
      type: String,
      default: 'Learn more'
    }
  },
  emits: ['close'],
  data() {
    return {
      variants: [
        {
          variant: 'info',
          icon: 'CircleInfo',
          color: 'text-info-dark',
          bgColor: 'bg-info-light'
        },
        {
          variant: 'success',
          icon: 'CircleCheck',
          color: 'text-success-dark',
          bgColor: 'bg-success-light'
        },
        {
          variant: 'warning',
          icon: 'TriangleExclamation',
          color: 'text-warning-dark',
          bgColor: 'bg-warning-light'
        },
        {
          variant: 'refresh',
          icon: 'ArrowsRotate',
          color: 'text-purple-600',
          bgColor: 'bg-purple-50'
        },
        {
          variant: 'error',
          icon: 'CircleExclamation',
          color: 'text-error-dark',
          bgColor: 'bg-error-light'
        }
      ]
    };
  },
  computed: {
    info() {
      return this.variant === 'info';
    },
    success() {
      return this.variant === 'success';
    },
    warning() {
      return this.variant === 'warning';
    },
    refresh() {
      return this.variant === 'refresh';
    },
    error() {
      return this.variant === 'error';
    },
    variantDetails() {
      const selectedVariant = this.variants.find(
        (currentVariant) => currentVariant.variant === this.variant
      );
      return {
        icon: selectedVariant.icon,
        color: selectedVariant.color,
        bgColor: selectedVariant.bgColor
      };
    },
    hasHeading() {
      return Boolean(this.$slots.heading);
    },
    hasContent() {
      return Boolean(this.$slots.default);
    }
  },
  methods: {
    closeAlert() {
      this.$emit('close');
    }
  }
};
</script>
