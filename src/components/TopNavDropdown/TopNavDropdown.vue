<template>
  <div
    class="inline-block relative z-50"
    data-testId="menu-container"
    @mouseenter="showNav = true"
    @mouseleave="showNav = false"
    @keyup.enter="onClick"
    @click="onClick"
    @keydown="onKeydown"
    @keyup.esc="onEscape"
  >
    <div
      :id="dropdownToggleId"
      :class="[
        'inline-block cursor-pointer w-auto h-[76px] py-7 px-8',
        'transition-colors duration-200 ease-linear hover:bg-gray-50 focus:outline-black focus:outline-dashed focus:outline-1'
      ]"
      tabindex="0"
      :aria-controls="dropdownListId"
      aria-haspopup="menu"
    >
      <div
        ref="titleItem"
        class="flex items-center type-small-700 text-gray-500 whitespace-nowrap"
      >
        <component
          :is="icon"
          v-if="variant === 'icon' && icon"
          v-bind="iconProps"
          class="m-0 p-0"
        />
        {{ title }}
        <ChevronDown
          v-if="showChevron"
          size="s"
          :class="[
            'ml-2 -mr-2 transition-transform duration-200 ease-linear',
            { '-rotate-180': showNav }
          ]"
        />
      </div>
    </div>
    <nav
      :id="dropdownListId"
      :aria-labelledby="dropdownToggleId"
      :class="[
        'min-w-full bg-white absolute',
        { 'top-[76px] !block border-t-2 border-gray-50': showNav },
        { '!hidden': !showNav },
        { 'right-0': right }
      ]"
    >
      <div
        ref="dropdownMenu"
        :class="[
          'p-4 h-auto w-full mt-1 opacity-100',
          { 'md:shadow-large bg-white': showNav }
        ]"
      >
        <slot />
      </div>
    </nav>
  </div>
</template>

<script>
import { ChevronDown } from '../Icons';
export default {
  name: 'TopNavDropdown',
  components: { ChevronDown },
  props: {
    title: {
      type: String,
      required: true
    },
    id: {
      type: String,
      required: true
    },
    open: {
      type: Boolean,
      default: false
    },
    right: {
      type: Boolean,
      default: false
    },
    showChevron: {
      type: Boolean,
      default: true
    },
    variant: {
      type: String,
      default: 'text'
    },
    icon: {
      type: [Object, null],
      default: null
    },
    iconProps: {
      type: Object,
      default: () => ({})
    }
  },
  emits: ['click'],
  data () {
    return {
      showNav: false
    };
  },
  computed: {
    dropdownToggleId () {
      return `dropdown-toggle-${this.id}`;
    },
    dropdownListId () {
      return `dropdown-list-${this.id}`;
    }
  },
  methods: {
    onKeydown ($event) {
      const anchorTags = this.$refs.dropdownMenu.getElementsByTagName('a');
      const firstAnchorTag = anchorTags[0];
      const lastAnchorTag = anchorTags[anchorTags.length - 1];

      if (
        $event.key === 'Tab' &&
        $event.shiftKey &&
        $event.target === firstAnchorTag
      ) {
        this.onBlur();
      }

      if (
        $event.key === 'Tab' &&
        !$event.shiftKey &&
        $event.target === lastAnchorTag
      ) {
        this.onBlur();
      }
    },
    onBlur () {
      this.showNav = false;
    },
    onEscape () {
      this.$refs.titleItem.focus();
      this.showNav = false;
    },
    onClick ($event) {
      this.showNav = !this.showNav;
      this.$emit('click', $event);
    }
  }
};
</script>
