
<template>
  <div
    :class="[
      {'pb-2': small},
      {'pb-4': !small}
    ]"
  >
    <LobLink
      :to="to"
      :target="target"
      class="flex flex-nowrap items-center no-underline hover:text-gray-800 focus:!outline-none focus:!ring-none focus:rounded-none"
    >
      <slot name="icon" />

      <div class="">
        <span class="pt-1 whitespace-nowrap type-small-600 text-gray-500 ">
          <slot />
        </span>
        <div
          v-if="subtitle"
          class="opacity-80 pr-0 text-gray-700 text-sm hidden xl:block"
        >
          {{ subtitle }}
        </div>
      </div>
    </LobLink>
  </div>
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
    imageSource: {
      type: String,
      required: false,
      default: null
    },
    iconClasses: {
      type: String,
      default: null
    },
    subtitle: {
      type: String,
      default: ''
    },
    small: {
      type: Boolean,
      default: false
    }
  }
};
</script>
