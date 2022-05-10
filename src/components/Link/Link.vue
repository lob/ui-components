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
export default {
  name: 'LobLink',
  props: {
    variant: {
      type: String,
      default: 'default',
      validator: function (value) {
        return ['default', 'primary-button', 'secondary-button', 'tertiary-button', 'alert-button'].includes(value);
      }
    },
    size: {
      type: String,
      default: 'default',
      validator: function (value) {
        return ['default', 'small'].includes(value);
      }
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
    }
  },
  computed: {
    default () {
      return this.variant === 'default';
    },
    primary () {
      return this.variant === 'primary-button';
    },
    secondary () {
      return this.variant === 'secondary-button';
    },
    tertiary () {
      return this.variant === 'tertiary-button';
    },
    alert () {
      return this.variant === 'alert-button';
    },
    small () {
      return this.size === 'small';
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
.primary:hover:not(.disabled):not(:focus) {
  box-shadow: 0 0 10px 2px rgba(24, 118, 219, 0.6);
}

.secondary:hover:not(.disabled):not(:focus) {
  box-shadow: 0 0 10px rgba(65, 101, 129, 0.2);
}

.tertiary:hover:not(.disabled):not(:focus) {
  box-shadow: 0 0 10px 2px rgba(0, 153, 215, 0.2);
}
</style>
