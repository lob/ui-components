<template>
  <div :class="{ 'cursor-not-allowed': disabled, 'cursor-pointer': !disabled }">
    <component
      :is="tag"
      :[linkProp]="to"
      :target="target"
      :rel="target === '_blank' ? 'noopener noreferrer' : ''"
      :aria-disabled="disabled"
      :class="[
        { 'pointer-events-none': disabled },
        { 'px-0 text-base ': link },
        { 'font-bold': bold },
        { 'underline': underline && link },
        { '!text-gray-500': disabled && link },
        { 'text-inherit': inheritTextColor },
        { 'text-primary-500 hover:text-primary-700 active:text-primary-900': !inheritTextColor },
        { 'flex justify-center items-center rounded-lg no-underline tracking-[-0.04em] font-bold': primary || secondary },
        { 'focus-visible:ring-4 focus:outline-none': primary || secondary },
        { 'focus:ring-primary-100': !warning && (primary || secondary) },
        { 'focus:ring-coral-700': warning && (primary || secondary) },
        { 'px-8 text-[1.25rem] h-[48px]': regular && (primary || secondary) },
        { 'px-6 text-sm h-[32px]': small && (primary || secondary) },
        { 'primary bg-primary-500 !text-white active:bg-black': !disabled && primary && !warning },
        { 'bg-gray-100 !text-white': disabled && primary && !warning },
        { 'primary warning bg-coral-900 !text-white active:bg-coral-700': !disabled && primary && warning },
        { 'bg-coral-200 !text-white': disabled && primary && warning },
        { 'secondary border border-primary-500 bg-white text-primary-500': !disabled && secondary && !warning,
          'focus:border-primary-500 active:border-black active:text-black': !disabled && secondary && !warning },
        { 'border border-gray-100 text-gray-100': disabled && secondary && !warning },
        { 'secondary border border-coral-900 bg-white !text-coral-900': !disabled && secondary && warning,
          'focus:border-coral-900 active:border-coral-700 active:!text-coral-700': !disabled && secondary && warning },
        { 'border border-coral-200 text-coral-200': disabled && secondary && warning }
      ]"
      v-bind="$attrs"
    >
      <slot />
      <ChevronRight
        v-if="link && withChevron"
        class="h-4 text-primary-500 inline-flex -mr-1"
      />
    </component>
    <div />
  </div>
</template>

<script>
import { ChevronRight } from '@/components/Icons';
export default {
  name: 'NewLink',
  components: { ChevronRight },
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
.primary:focus:not(:active):not(:disabled),
.primary:hover:not(:disabled):not(:focus) {
  background: linear-gradient(105.01deg, #0154ac 17.25%, #1876db 93.21%);
}

.primary.warning:focus:not(:active):not(:disabled),
.primary.warning:hover:not(:disabled):not(:focus) {
  background: linear-gradient(95.27deg, #611d18 4.76%, #943832 81.28%);
}

.secondary:hover:not(:disabled):not(:focus),
.primary:hover:not(:disabled):not(:focus) {
  box-shadow:
    0 9px 12px 0 rgba(0, 0, 0, 0.2),
    0 19px 29px 0 rgba(0, 0, 0, 0.14),
    0 7px 36px 0 rgba(0, 0, 0, 0.12);
}

.primary:not(:disabled):focus:active,
.secondary:not(:disabled):focus:active,
.primary:not(:disabled):focus:not(:focus-visible),
.secondary:not(:disabled):focus:not(:focus-visible) {
  box-shadow: none;
}
</style>
