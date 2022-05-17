<template>
  <li class="list-none">
    <component
      :is="tag"
      :class="[
        'no-underline py-2 px-6 max-h-12 flex items-center w-full font-light whitespace-nowrap !text-sm text-left !text-gray-500 relative overflow-hidden hover:text-primary-700 focus:outline-none focus:ring-2 focus:ring-primary-100 focus:border-transparent'
      ]"
      :to="to"
      :underline="false"
      active-class="text-normal bg-white-300 font-medium"
      @click.stop="handleNavigation"
      @[clickEvent]="toggleSubNav"
    >
      <img
        :src="iconSrc"
        :alt="iconAltText"
        class="w-6 align-bottom"
      >
      <span
        :class="[
          'px-4',
          { expanded: expanded },
          { 'collapsed xl:hidden': !expanded },
          itemClass
        ]"
        data-testid="collapsibleElement"
      >
        {{ title }}
        <img
          v-if="collapsible && hasChildNavItems"
          :class="[
            'w-6 absolute top-2 right-3',
            { 'transform rotate-180': subNavOpen }
          ]"
          :src="`${$getConst('lobAssetsUrl')}/dashboard/navbar/caret-down.svg`"
          :alt="subNavOpen ? 'Collapse' : 'Expand'"
        >
      </span>
    </component>

    <ul
      v-if="subNavOpen"
      :class="['pl-12', { 'xl:hidden': !expanded }]"
    >
      <slot />
    </ul>
  </li>
</template>

<script>
import NewLink from '../NewLink/NewLink';

export default {
  name: 'MainNavigationItem',
  components: { NewLink },
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
    collapsible: {
      type: Boolean,
      default: true
    },
    subNavCollapsed: {
      type: Boolean,
      default: false
    },
    expanded: {
      type: Boolean,
      default: true
    },
    itemClass: {
      type: String,
      default: null
    },
    id: {
      type: String,
      default: ''
    }
  },
  emits: ['nav', 'navItemWithChildClick'],
  data () {
    return {
      subNavOpen: this.expanded && !this.subNavCollapsed
    };
  },
  computed: {
    hasChildNavItems () {
      return Boolean(this.$slots.default);
    },
    tag () {
      return this.to ? 'NewLink' : 'button';
    },
    clickEvent () {
      return !this.to ? 'click' : null;
    }
  },
  methods: {
    toggleSubNav () {
      if (this.collapsible) {
        this.subNavOpen = !this.subNavOpen;
      }

      this.$emit('navItemWithChildClick', this.id);

    },
    handleNavigation () {
      if (this.to) {
        this.$emit('nav', this.to);
      }
    }
  }
};
</script>

<style scoped lang="scss">
@screen xl {
  .expanded {
    max-width: 100%;
    transition: max-width 0.3s ease-in;
  }

  .collapsed {
    max-width: 0;
    overflow: hidden;
    transition: max-width 0.3s ease-out;
  }
}
</style>
