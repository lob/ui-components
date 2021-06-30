<template>
  <component
    :is="tag"
    :[linkProp]="to"
    :class="[
      'underline',
      {'primary py-3 px-6 bg-primary-500 text-white active:bg-primary-700 disabled:bg-white-300': primary},
      {'secondary py-3 px-6 bg-white-200 border border-primary-500 text-primary-500 active:text-primary-700 active:border-primary-700 disabled:border-gray-100': secondary},
      {'rounded disabled:text-gray-500 focus:outline-none focus:ring-2 focus:ring-primary-100 focus:border-transparent': primary || secondary},
      {'!px-3 !py-2': small}
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
        return ['default', 'primary-button', 'secondary-button'].includes(value);
      }
    },
    size: {
      type: String,
      default: 'default',
      validator: function (value) {
        return ['default', 'small'].includes(value);
      }
    },
    to: {
      type: String,
      default: ''
    },
    label: {
      type: String,
      default: ''
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
    small () {
      return this.size === 'small';
    },
    isExternal () {
      const protocolRelativePattern = /^https?:\/\/|^\/\//i;
      return protocolRelativePattern.test(this.to);
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
.primary:hover:not(:disabled):not(:focus) {
  box-shadow: 0 0 10px 2px rgba(24, 118, 219, 0.6);
}

.secondary:hover:not(:disabled):not(:focus) {
  box-shadow: 0 0 10px rgba(65, 101, 129, 0.2);
}
</style>
