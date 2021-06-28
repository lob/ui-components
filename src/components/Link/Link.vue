<template>
  <component
    :is="tag"
    :href="to"
    :to="to"
  >
    {{ label }}
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
    isExternal () {
      const r = new RegExp('^(?:[a-z]+:)?//', 'i'); // from https://stackoverflow.com/a/19709846
      return r.test(this.to);
    },
    tag () {
      if (this.isExternal) {
        return 'a';
      } else {
        return 'router-link';
      }
    }
  }
};
</script>
