<template>
  <!-- conditionally render based on user permissions -->
  <li class="tw-list-none tw-relative tw-m-0 tw-p-0">
    <!-- conditionally render based on feature flags -->
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

    <a
      href="#"
      :class="['tw-no-underline tw-py-4 tw-pr-10 tw-pl-18 tw-max-h-8 tw-inline-flex tw-items-center tw-h-auto tw-w-full tw-text-light tw-text-sm tw-text-gray tw-overflow-hidden', { 'tw-text-normal tw-bg-gray-xl': active}]"
    >
      <img
        :src="iconSrc"
        alt="alt text"
        class="tw-absolute tw-w-auto tw-mr-1 tw-left-6 align-bottom"
      >
      {{ title }}

      <!-- if there's stuff in the slot, render the collapse button here -->
      <slot />
    </a>
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
