<template>
  <li
    :class="[
      'no-underline py-1 max-h-12 my-px flex items-center font-light text-sm text-left text-gray-500 hover:text-primary-700',
      { 'font-medium bg-white-300 rounded-l-full': active }
    ]"
    data-testid="nav-child-item"
  >
    <NewLink
      :to="to"
      class="w-full py-1 pl-4 !text-sm whitespace-nowrap overflow-hidden !text-gray-500 focus:outline-none focus:ring-2 focus:ring-primary-100 focus:border-transparent"
      :underline="false"
      @click.stop="handleNavigation"
    >
      {{ title }}
    </NewLink>
  </li>
</template>

<script>
import NewLink from '../NewLink/NewLink';

export default {
  name: 'MainNavigationChildItem',
  components: { NewLink },
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
      return this.$route.path.includes(this.to);
    }
  },
  methods: {
    handleNavigation () {
      this.$emit('nav', this.to);
    }
  }
};
</script>
