<template>
  <span :class="[{ 'cursor-not-allowed': disabled, 'cursor-pointer': !disabled }]">
    <component
      :is="tag"
      :[linkProp]="to"
      :target="target"
      :rel="target === '_blank' ? 'noopener noreferrer' : ''"
      :aria-disabled="disabled"
      v-bind="$attrs"
      :class=" [ { 'pointer-events-none': disabled },
                 { 'text-blue-600': link },
                 { 'underline': link && underline },
                 link ? `type-${size}-600`: '',
                 link && bold ? `type-${size}-800 no-underline`: '',
                 { 'flex justify-center items-center rounded-full focus:outline-dashed focus:outline-black focus:outline-offset-1 focus:ring-0': isButtonVariant },
                 { 'type-xs-700 py-2 px-4': isButtonVariant && size==='small' },
                 { 'type-small-700 py-2 px-4': isButtonVariant && size==='base' },
                 { 'type-small-700 py-3 px-5': isButtonVariant && size==='large' },
                 { 'type-base-700 py-[14px] px-6': isButtonVariant && size==='xl' },
                 { '!text-gray-400': link && disabled },
                 { 'bg-black text-white hover:bg-gray-700 active:bg-gray-800 focus:bg-gray-800' : primaryButton },
                 { 'bg-white text-gray-800 border border-gray-800 hover:bg-gray-50 active:bg-gray-100 focus:bg-gray-100' : secondaryButton },
                 { '!border-gray-200 !text-gray-400': secondaryButton && disabled },
                 { 'bg-gray-50 text-gray-500 border border-gray-300 hover:bg-gray-100 hover:text-gray-600 hover:border-gray-400 active:bg-gray-100 active:text-gray-600 active:border-gray-500 focus:bg-gray-100 focus:text-gray-600' : quietButton },
                 { 'bg-transparent text-gray-500 hover:bg-gray-100 hover:text-gray-600 active:bg-gray-200 active:text-gray-600 focus:bg-gray-100 focus:text-gray-600' : ghostButton },
                 { '!bg-gray-100 !text-gray-300 !border-none': (primaryButton || quietButton || ghostButton) && disabled },
                 { 'bg-red-500 text-white hover:bg-red-600 active:bg-red-700 focus:bg-red-600' : dangerButton },
                 { '!bg-red-200 !text-red-400': dangerButton && disabled },
                 { 'bg-white text-red-500 border border-red-500 hover:bg-red-50 hover:border-red-600 hover:text-red-600 active:bg-red-100 active:border-red-700 active:text-red-700 focus:bg-red-50 focus:border-red-600 focus:text-red-600' : dangerSecondaryButton },
                 { '!border-red-300 !text-red-300': dangerSecondaryButton && disabled }
      ]"
    >
      <slot />
      <ChevronRight
        v-if="link && withChevron"
        class="h-4 inline-flex -mr-1"
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
        return ['link', 'primary-button', 'secondary-button', 'quiet-button', 'ghost-button', 'danger-button', 'danger-secondary-button'].includes(value);
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
    link () {
      return this.variant === 'link';
    },
    isExternal () {
      const protocolRelativePattern = /^https?:\/\/|^\/\//i;
      return typeof this.to === 'string' && protocolRelativePattern.test(this.to);
    },
    tag () {
      return this.isExternal ? 'a' : 'router-link';
    },
    linkProp () {
      return this.isExternal ? 'href' : 'to';
    },
    isButtonVariant () {
      return this.variant !== 'link';
    },
    primaryButton () {
      return this.variant === 'primary-button';
    },
    secondaryButton () {
      return this.variant === 'secondary-button';
    },
    quietButton () {
      return this.variant === 'quiet-button';
    },
    ghostButton () {
      return this.variant === 'ghost-button';
    },
    dangerButton () {
      return this.variant === 'danger-button';
    },
    dangerSecondaryButton () {
      return this.variant === 'danger-secondary-button';
    }
  }
};
</script>
