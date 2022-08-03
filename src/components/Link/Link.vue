<template>
  <span :class="[{ 'cursor-not-allowed': disabled, 'cursor-pointer': !disabled }]">
    <component
      :is="tag"
      :[linkProp]="to"
      :target="target"
      :rel="target === '_blank' ? 'noopener noreferrer' : ''"
      :aria-disabled="disabled"
      :class="[
        { 'pointer-events-none': disabled },
        { 'font-bold': bold },
        { 'text-inherit': inheritTextColor },
        { 'px-0 text-base focus-visible:ring-4 focus-visible:ring-offset-2 focus-visible:rounded-lg': link },
        { 'underline': underline && link },
        { '!text-gray-500': disabled && link },
        { 'text-primary-500 hover:text-primary-900 active:text-primary-900': !inheritTextColor && link },
        { 'flex justify-center items-center rounded-lg no-underline font-medium': primary || secondary || subtle },
        { 'focus-visible:ring-4 focus-visible:ring-primary-100 focus:ring-transparent focus:outline-none active:scale-[.96]': primary || secondary || subtle },
        { 'px-6 text-base h-[48px]': regular && (primary || secondary || subtle) },
        { 'px-4 text-sm h-[32px]': small && (primary || secondary || subtle) },
        { 'bg-gradient-114 from-[#1876db] to-[#5748ff] hover:from-[#5748ff] hover:to-[#1876db] !text-white': !disabled && primary && !warning },
        { 'bg-gray-100 !text-white': disabled && primary && !warning },
        { 'bg-gradient-114 from-[#db1818] to-[#ec4949] hover:from-[#ec4949] hover:to-[#db1818] !text-white': !disabled && primary && warning },
        { 'bg-coral-200 !text-white': disabled && primary && warning },
        { 'border !border-gray-300 text-gray-500 hover:text-gray-500 hover:bg-gray-100/[.15] active:bg-gray-100/[.25]': !disabled && secondary && !warning },
        { 'text-gray-100 border': disabled && secondary && !warning },
        { 'bg-white border !border-chili text-chili hover:bg-chili/[.04] active:bg-chili/[.08]': !disabled && secondary && warning },
        { 'text-coral-200 border': disabled && secondary && warning },
        { 'text-primary-500 hover:bg-primary-500/[.04] active:bg-primary-500/[.08] active:text-primary-700': !disabled && subtle && !warning },
        { 'text-gray-100 border hover:bg-transparent': disabled && subtle && !warning },
        { 'text-chili hover:bg-chili/[.04] active:bg-chili/[.08]' : !disabled && subtle && warning },
        { 'text-coral-300 border hover:bg-transparent' : disabled && subtle && warning }
      ]"
      v-bind="$attrs"
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
        return ['link', 'primary-button', 'secondary-button', 'subtle-button'].includes(value);
      }
    },
    small: {
      type: Boolean,
      default: false
    },
    warning: {
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
    label: {
      type: String,
      default: ''
    },
    underline: {
      type: Boolean,
      default: true
    },
    bold: {
      type: Boolean,
      default: false
    },
    inheritTextColor: {
      type: Boolean,
      default: false
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
    primary () {
      return this.variant === 'primary-button';
    },
    secondary () {
      return this.variant === 'secondary-button';
    },
    subtle () {
      return this.variant === 'subtle-button';
    },
    regular () {
      return !this.small;
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
    }
  }
};
</script>
