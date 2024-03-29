<template>
  <span
    :class="[{ 'cursor-not-allowed': disabled, 'cursor-pointer': !disabled }]"
  >
    <component
      :is="tag"
      :[linkProp]="to"
      :target="target"
      :rel="target === '_blank' ? 'noopener noreferrer' : ''"
      :aria-disabled="disabled"
      v-bind="$attrs"
      :class="[
        { 'pointer-events-none': disabled },
        { underline: isLink && underline },
        { [`type-${size}-600`]: isLink },
        { [`type-${size}-800 no-underline`]: isLink && bold },
        isLink
          ? 'text-blue-600 hover:text-blue-500'
          : 'flex justify-center items-center rounded-full',
        'focus-visible:outline-1 focus-visible:outline-dashed focus-visible:outline-black focus-visible:outline-offset-1 focus:ring-0 whitespace-nowrap h-min',
        { 'type-xs-700 py-2 px-4': isButton && size === 'small' },
        { 'type-small-700 py-2 px-4': isButton && size === 'base' },
        { 'type-small-700 py-3 px-5': isButton && size === 'large' },
        { 'type-base-700 py-[14px] px-6': isButton && size === 'xl' },
        { '!text-gray-400': isLink && disabled },
        {
          'bg-black text-white hover:bg-gray-700 hover:text-white active:bg-gray-800 focus:bg-gray-800':
            primaryButton
        },
        {
          'bg-[#483AC5] text-white hover:text-white hover:bg-[#6C61D1] active:bg-[#483AC5] focus:bg-[#483AC5]':
            upgradeButton
        },
        {
          'bg-white text-gray-800 border border-gray-100 hover:border-gray-200 hover:bg-gray-50 hover:text-gray-800 focus:border-gray-800 active:bg-gray-100 focus:bg-gray-100':
            secondaryButton
        },
        { '!border-gray-200 !text-gray-400': secondaryButton && disabled },
        {
          'bg-gray-50 text-gray-500 border border-gray-300 hover:bg-gray-100 hover:text-gray-600 hover:border-gray-400 active:bg-gray-100 active:text-gray-600 active:border-gray-500 focus:bg-gray-100 focus:text-gray-600':
            quietButton
        },
        {
          'bg-transparent text-gray-500 hover:bg-gray-100 hover:text-gray-600 active:bg-gray-200 active:text-gray-600 focus:bg-gray-100 focus:text-gray-600':
            ghostButton
        },
        {
          '!bg-gray-100 !text-gray-300 !border-none':
            (primaryButton || quietButton || ghostButton) && disabled
        },
        {
          'bg-red-500 text-white hover:bg-red-600 active:bg-red-700 focus:bg-red-600':
            dangerButton
        },
        { '!bg-red-200 !text-red-400': dangerButton && disabled },
        {
          'bg-white text-red-500 border border-red-500 hover:bg-red-50 hover:border-red-600 hover:text-red-600 active:bg-red-100 active:border-red-700 active:text-red-700 focus:bg-red-50 focus:border-red-600 focus:text-red-600':
            dangerSecondaryButton
        },
        { '!border-red-300 !text-red-300': dangerSecondaryButton && disabled }
      ]"
    >
      <slot />
      <ChevronRight
        v-if="isLink && withChevron"
        size="s"
        class="h-3 inline-flex ml-1"
      />
    </component>
  </span>
</template>

<script>
import { ChevronRight } from '@/components/Icons';
export default {
  name: 'LobLink',
  components: { ChevronRight },
  inheritAttrs: false,
  props: {
    variant: {
      type: String,
      default: 'link',
      validator: function (value) {
        return [
          'link',
          'primary-button',
          'upgrade-button',
          'secondary-button',
          'quiet-button',
          'ghost-button',
          'danger-button',
          'danger-secondary-button'
        ].includes(value);
      }
    },
    size: {
      type: String,
      default: 'base',
      validator: function (value) {
        return ['small', 'base', 'large', 'xl'].includes(value);
      }
    },
    underline: {
      type: Boolean,
      default: true
    },
    bold: {
      type: Boolean,
      default: false
    },
    disabled: {
      type: Boolean,
      default: false
    },
    to: {
      type: [String, Object],
      default: ''
    },
    target: {
      type: String,
      default: '_self'
    },
    withChevron: {
      type: Boolean,
      default: false
    }
  },
  computed: {
    isLink() {
      return this.variant === 'link';
    },
    isButton() {
      return this.variant !== 'link';
    },
    isExternal() {
      const protocolRelativePattern = /^https?:\/\/|^\/\//i;
      return (
        typeof this.to === 'string' && protocolRelativePattern.test(this.to)
      );
    },
    tag() {
      return this.isExternal ? 'a' : 'router-link';
    },
    linkProp() {
      return this.isExternal ? 'href' : 'to';
    },
    primaryButton() {
      return this.variant === 'primary-button';
    },
    upgradeButton() {
      return this.variant === 'upgrade-button';
    },
    secondaryButton() {
      return this.variant === 'secondary-button';
    },
    quietButton() {
      return this.variant === 'quiet-button';
    },
    ghostButton() {
      return this.variant === 'ghost-button';
    },
    dangerButton() {
      return this.variant === 'danger-button';
    },
    dangerSecondaryButton() {
      return this.variant === 'danger-secondary-button';
    }
  }
};
</script>
