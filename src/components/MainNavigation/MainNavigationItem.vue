<template>
  <!-- conditionally render based on user permissions -->
  <li class="list-none">
    <!-- conditionally render based on feature flags -->

    <a
      href="#"
      :class="['no-underline py-4 pr-10 pl-18 max-h-8 inline-flex items-center h-auto w-full text-light text-sm text-gray overflow-hidden', { 'text-normal bg-gray-xl': active}]"
    >
      <img
        :src="iconSrc"
        alt="alt text"
        class="w-auto mr-1 mr-4 align-bottom"
      >
      {{ title }}

      <!-- if there's stuff in the slot, render the collapse button here -->
      <slot />
    </a>

    <!-- <component
        :is="tag"
        class="navbar-item"
        :class="{
            'is-active': active
        }"
        v-bind="$attrs"
        v-on="$listeners">
        <slot/>
    </component> -->
  </li>
</template>

<script>
// click event
// router-link
export default {
  name: 'MainNavigationItem',
  props: {
    title: {
      type: String,
      required: true
    },
    iconSrc: {
      type: String,
      default: ''
    },
    active: {
      type: Boolean,
      default: false
    }
  },
  computed: {

  },
  methods: {

  }
};
</script>

<style scoped lang="scss">
</style>
