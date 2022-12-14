<template>
  <li class="list-none">
    <component
      :is="tag"
      :class="[
        'py-3 !px-4 max-h-12 flex items-center w-full type-base-500 !text-gray-500 no-underline whitespace-nowrap',
        'hover:bg-gray-50 focus:outline-none focus:ring-none focus-visible:rounded-none focus:ring-0 focus-visible:bg-gray-50 focus-visible:ring-0',
        { '!text-gray-800 !type-base-600': active || hasActiveChild }
      ]"
      :to="to"
      :underline="false"
      @mouseenter="itemHover = true"
      @mouseleave="itemHover = false"
      @click.stop="handleNavigation"
      @[clickEvent]="toggleSubNav"
    >
      <div :class="['w-5 h-5 transition-transform duration-300 ease-in-out', { 'scale-[1.2]': itemHover && !hasChildNavItems }]">
        <slot
          name="icon"
          :title="title"
        />
      </div>
      <span
        :class="[
          'w-full flex items-center justify-between',
          { 'xl:max-w-full ml-4': expanded },
          { 'xl:max-w-0 xl:overflow-hidden xl:hidden': !expanded },
          itemClass
        ]"
        data-testid="collapsibleElement"
      >
        {{ title }}
        <ChevronDown
          v-if="collapsible && hasChildNavItems"
          :class="[
            'ml-6 inline-block text-gray-500 transition-transform duration-300 ease-in',
            { 'transform -rotate-180': subNavOpen }
          ]"
          role="img"
          :title="subNavOpen ? 'Collapse' : 'Expand'"
        />
      </span>
    </component>

    <ul
      v-show="subNavOpen"
      :class="['ml-12 bg-gradient-to-b from-[#9f94ff] to-[#fa6a8c]', { 'xl:hidden': !expanded }]"
    >
      <div class="ml-0.5 bg-white">
        <slot />
      </div>
    </ul>
  </li>
</template>

<script>
import ChevronDown from '../Icons/ChevronDown';
import LobLink from '../Link/Link';

export default {
  name: 'MainNavigationItem',
  components: { ChevronDown, LobLink },
  props: {
    title: {
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
  emits: ['nav'],
  data () {
    return {
      subNavOpen: this.expanded && !this.subNavCollapsed,
      itemHover: false,
      hasActiveChild: false
    };
  },
  computed: {
    active () {
      return this.$route.path.startsWith(this.to);
    },
    hasChildNavItems () {
      return Boolean(this.$slots.default);
    },
    tag () {
      return this.to ? 'LobLink' : 'button';
    },
    clickEvent () {
      return !this.to ? 'click' : null;
    }
  },
  watch: {
    expanded (val) {
      if (!val) {
        this.subNavOpen = false;
      }
    }
  },
  methods: {
    toggleSubNav () {
      if (this.collapsible) {
        this.subNavOpen = !this.subNavOpen;
      }
      if (!this.expanded) {
        this.$parent.expanded = true;
        this.subNavOpen = true;
      }
    },
    handleNavigation () {
      if (this.to) {
        this.$emit('nav', this.to);
      }
    }
  }
};
</script>
