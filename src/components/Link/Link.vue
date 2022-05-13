<template>
  <component
    :is="tag"
    :[linkProp]="to"
    :target="target"
    :rel="target === '_blank' ? 'noopener noreferrer' : ''"
    :aria-disabled="disabled"
    :class="[
      {'font-bold': bold},
      {'underline' : underline},
      {'text-primary-900': !inheritTextColor },
      {'text-inherit': inheritTextColor },
      {'primary py-3 px-6 bg-primary-500 !text-white active:bg-primary-700': primary},
      {'secondary py-3 px-6 bg-white-200 border border-primary-500 text-primary-500 active:text-primary-700 active:border-primary-700': secondary},
      {'tertiary py-3 px-6 bg-white border border-gray-100 text-gray-500 active:border-gray-300': tertiary},
      {'alert py-3 px-6 bg-white hover:bg-lemon-300 border rounded border-lemon-700 text-lemon-900 hover:text-lemon-900 focus:ring-lemon-700': alert},
      {'flex justify-center items-center rounded focus:outline-none focus:ring-2 focus:ring-primary-100 focus:border-transparent': primary || secondary || tertiary},
      {'hover:text-white': primary},
      {'!px-3 !py-2': small},
      {'disabled pointer-events-none !text-gray-500': disabled},
      {'bg-white-300': disabled && primary},
      {'border-gray-100': disabled && secondary},
      {'border-white-300': disabled && tertiary},
      {'border-gray-100 hover:bg-white': disabled && alert}
    ]"
  >
    <slot />
  </component>
</template>

<script>
import { ChevronRight } from '@/components/Icons';
export default {
  name: 'LobLink',
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
      if (this.isExternal) {
        return 'a';
      } else {
        return 'router-link';
      }
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
