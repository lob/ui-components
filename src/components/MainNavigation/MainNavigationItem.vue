<template>
  <li class="list-none">
    <component
      :is="tag"
      :class="[
        'no-underline py-4 pr-10 pl-6 max-h-12 inline-flex items-center w-full text-light text-sm text-left text-gray overflow-hidden relative focus:outline-none focus:ring-2 focus:ring-blue-xl focus:border-transparent',
        { 'text-normal bg-gray-xl': active}
      ]"
      :to="to"
      active-class="text-normal bg-gray-xl"
      @[clickEvent]="toggleSubNav"
    >
      <img
        :src="iconSrc"
        :alt="iconAltText"
        class="w-auto mr-1 mr-4 align-bottom"
      >
      {{ title }}
      <img
        v-if="hasChildNavItems"
        :class="['w-6 absolute top-3 right-4', { 'transform rotate-180': !subNavOpen}]"
        :src="`${$getConst('lobAssetsUrl')}/dashboard/navbar/caret-down.svg`"
        :alt="subNavOpen ? 'Collapse' : 'Expand'"
      >
    </component>

    <div class="pl-20">
      <slot v-if="subNavOpen" />
    </div>
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
      required: true
    },
    iconAltText: {
      type: String,
      required: true
    },
    to: {
      type: String,
      default: null
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
    },
    tag () {
      return this.to ? 'router-link' : 'button';
    },
    clickEvent () {
      return !this.to ? 'click' : null;
    }
  },
  methods: {
    toggleSubNav () {
      this.subNavOpen = !this.subNavOpen;
    }
  }
};
</script>
