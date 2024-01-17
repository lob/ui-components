<template>
  <li class="list-none mx-1 relative">
    <LobLink
      :to="to"
      :underline="false"
      :disabled="disabled"
      :tabindex="disabled ? -1 : 0"
      :class="[
        'inline-block px-1 py-3 !text-gray-500 type-small-600 whitespace-nowrap focus-visible:!outline-none',
        'focus-visible:before:content[``] focus-visible:before:z-10 focus-visible:before:absolute focus-visible:before:inset-0 focus-visible:before:bottom-[-3px] ',
        'hover:before:content[``] hover:before:z-10 hover:before:absolute hover:before:inset-0 hover:before:bottom-[-3px] hover:before:border-b-2',
        {
          'hover:!text-gray-600 focus-visible:!text-gray-600 focus-visible:before:border-b-2 hover:before:border-gray-300 focus-visible:before:border-gray-300':
            !active && !disabled,
        },
        {
          '!text-black before:content[``] before:z-10 before:absolute before:inset-0 before:bottom-[-3px] before:border-b-2 before:border-black':
            active,
        },
        { '!text-gray-300': disabled },
      ]"
    >
      {{ title }}
      <div class="flex items-center">
        <slot />
      </div>
    </LobLink>
  </li>
</template>

<script>
import LobLink from "../Link/Link";

export default {
  name: "SubnavigationItem",
  components: {
    LobLink,
  },
  props: {
    title: {
      type: String,
      default: "",
    },
    to: {
      type: String,
      default: "",
    },
    matchQueryString: {
      type: Boolean,
      default: false,
    },
    disabled: {
      type: Boolean,
      default: false,
    },
    stringToMatch: {
      type: String,
      default: "",
    },
  },
  computed: {
    active() {
      if (this.stringToMatch) {
        const pattern = new RegExp(`${this.stringToMatch}`, "gi");
        if (pattern.test(this.$route.fullPath)) {
          return true;
        }
      }
      return this.matchQueryString
        ? this.$route.fullPath === this.to
        : this.$route.fullPath?.includes(this.to);
    },
  },
};
</script>
