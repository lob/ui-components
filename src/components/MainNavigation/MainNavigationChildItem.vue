<template>
  <li
    :class="[
      'no-underline py-1 max-h-12 my-px flex items-center font-light text-sm text-left text-gray hover:text-primary-l',
      { 'font-medium bg-gray-xl rounded-l-full': active}
    ]"
    data-testid="nav-child-item"
  >
    <router-link
      :to="to"
      class="w-full py-1 pl-8 overflow-hidden focus:outline-none focus:ring-2 focus:ring-blue-xl focus:border-transparent"
      @click.native.stop
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
      required: true
    }
  },
  computed: {
    active () {
      return this.$route.path === this.to;
    }
  }
};
</script>
