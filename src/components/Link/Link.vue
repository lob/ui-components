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
        { 'flex justify-center items-center rounded-lg no-underline font-medium': primary || secondary },
        { 'focus-visible:ring-4 focus-visible:ring-primary-100 focus:ring-transparent focus:outline-none active:scale-[.96]': primary || secondary },
        { 'px-6 text-base h-[48px]': regular && (primary || secondary) },
        { 'px-4 text-sm h-[32px]': small && (primary || secondary) },
        { 'primary !text-white ': !disabled && primary && !warning },
        { 'bg-gray-100 !text-white': disabled && primary && !warning },
        { 'primary warning !text-white': !disabled && primary && warning },
        { 'bg-coral-200 !text-white': disabled && primary && warning },
        { 'secondary border !border-gray-300 text-gray-500 hover:text-gray-500 hover:bg-gray-100/[.15] active:bg-gray-100/[.25]': !disabled && secondary && !warning },
        { 'border border-gray-100 text-gray-100': disabled && secondary && !warning },
        { 'secondary bg-white border !border-chili text-chili hover:bg-chili/[.04] active:bg-chili/[.08]': !disabled && secondary && warning },
        { 'border border-coral-200 text-coral-200': disabled && secondary && warning }
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
        return ['link', 'primary-button', 'secondary-button'].includes(value);
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

<style scoped lang="scss">
.primary:not(:disabled) {
  background: linear-gradient(114.08deg, #1876db 7.95%, #5748ff 90.87%);
}

.primary:focus:not(:disabled),
.primary:hover:not(:disabled):not(:focus) {
  background: linear-gradient(114.08deg, #5748ff 7.95%, #1876db 90.87%);
}

.primary.warning:not(:disabled) {
  background: linear-gradient(114.08deg, #db1818 7.95%, #ec4949 90.87%);
}

.primary.warning:focus:not(:disabled),
.primary.warning:hover:not(:disabled):not(:focus) {
  background: linear-gradient(114.08deg, #ec4949 7.95%, #db1818 90.87%);
}
</style>
