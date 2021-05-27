<template>
  <li
    :class="[
      'no-underline py-2 pl-8 max-h-12 my-px flex items-center w-full text-sm text-left text-gray overflow-hidden relative focus:outline-none focus:ring-2 focus:ring-blue-xl focus:border-transparent',
      { 'font-medium bg-gray-xl rounded-l-full': active}
    ]"
  >
    <router-link
      :to="to"
    >
      {{ title }}
    </router-link>
  </li>
</template>

<script>
export default {
  name: 'MainNavigationChildItem',
  props: {
    title: {
      type: String,
      required: true
    },
    to: {
      type: String,
      default: null
    }
  },
  computed: {
    active () {
      return this.$route.matched.some(({ name }) => name === this.to); //eslint-disable-line no-undef
    }
  }
};
</script>
