<template>
  <li class="list-none">
    <button
      :class="['no-underline py-4 pr-10 pl-6 max-h-12 inline-flex items-center w-full text-light text-sm text-gray overflow-hidden focus:outline-none focus:ring-2 focus:ring-blue-xl focus:border-transparent', { 'text-normal bg-gray-xl': active}]"
      @click="toggleSubNav"
    >
      <img
        :src="iconSrc"
        :alt="iconAltText"
        class="w-auto mr-1 mr-4 align-bottom"
      >
      {{ title }}
      <img
        v-if="!hasChildNavItems"
        :class="['w-6 ml-16', { 'transform rotate-180': !subNavOpen}]"
        :src="`${$getConst('lobAssetsUrl')}/dashboard/navbar/caret-down.svg`"
        :alt="subNavOpen ? 'Collapse' : 'Expand'"
      >
      <slot v-if="subNavOpen" />
    </button>

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
    iconAltText: {
      type: String,
      default: ''
    },
    active: {
      type: Boolean,
      default: false
    },
    collapsed: {
      type: Boolean,
      default: false
    }
  },
  data () {
    return {
      subNavOpen: !this.collapsed
    };
  },
  computed: {
    hasChildNavItems () {
      return Boolean(this.$slots.default);
    }
  },
  methods: {
    toggleSubNav () {
      this.subNavOpen = !this.subNavOpen;
    }
  }
};
</script>
