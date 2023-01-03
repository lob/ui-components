
<template>
  <LobLink
    :to="to"
    :target="target"
    :disabled="disabled"
    :class="['flex flex-nowrap items-center no-underline py-2 px-4 type-small-500 hover:bg-gray-50',
             'focus-visible:rounded-sm focus-visible:bg-gray-50 focus:outline-black focus:outline-dotted focus:!ring-none',
             { '!text-gray-500 disabled:!text-gray-300 hover:!text-gray-800 focus-visible:!text-gray-800': !disabled },
             { '!text-gray-300': disabled }]"
  >
    <div :class="{ 'mr-4': hasIcon }">
      <slot name="icon" />
    </div>
    <div class="whitespace-nowrap">
      <slot />
    </div>
  </LobLink>
</template>

<script>
import LobLink from '../Link/Link.vue';

export default {
  name: 'TopNavDropdownItem',
  components: { LobLink },
  props: {
    to: {
      type: String,
      required: true
    },
    target: {
      type: String,
      default: '_self'
    },
    disabled: {
      type: Boolean,
      required: false
    }
  },
  computed: {
    hasIcon () {
      return Boolean(this.$slots.icon);
    }
  }
};
</script>
