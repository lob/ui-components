<template>
  <li
    :class="[
      'w-full my-1 max-h-12 hover:bg-gray-50 relative'
    ]"
    data-testid="nav-child-item"
  >
    <div
      v-if="active"
      class="absolute top-2.5 -left-[3px] w-1 h-5 bg-gray-800 rounded-full"
    />

    <LobLink
      :to="to"
      :class="[
        'block !w-full py-2 pl-4 !type-small-500 whitespace-nowrap  !text-gray-500',
        'focus-visible:rounded-none focus:ring-0 focus-visible:bg-gray-50 focus-visible:ring-0',
        { '!text-gray-800 !type-small-600': active }
      ]"
      :underline="false"
      @click.stop="handleNavigation"
    >
      {{ title }}
    </LobLink>
  </li>
</template>

<script>
import LobLink from '../Link/Link';

export default {
  name: 'MainNavigationChildItem',
  components: { LobLink },
  props: {
    title: {
      type: String,
      required: true
    },
    to: {
      type: String,
      required: true
    }
  },
  emits: ['nav'],
  computed: {
    active () {
      return this.$route.path.startsWith(this.to);
    }
  },
  watch: {
    active (val) {
      this.$parent.hasActiveChild = val;
    }
  },
  methods: {
    handleNavigation () {
      this.$emit('nav', this.to);
    }
  }
};
</script>
