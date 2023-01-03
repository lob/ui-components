<template>
  <div
    class="block xl:inline-block relative z-50 mx-0 border-b-2 border-gray-100 xl:border-0"
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
      :class="['inline-block cursor-pointer w-full xl:w-auto h-[76px] py-7 px-8',
               'transition-colors duration-200 ease-linear hover:bg-gray-50 focus:outline-black focus:outline-dotted']"
      tabindex="0"
      :aria-controls="dropdownListId"
      aria-haspopup="menu"
    >
      <div
        ref="titleItem"
        class="flex items-center type-small-700 text-gray-500 whitespace-nowrap"
      >
        {{ title }}
        <ChevronDown
          v-if=" showChevron"
          size="s"
          :class="['ml-2 -mr-2 transition-transform duration-200 ease-linear',
                   { 'xl:transform xl:-rotate-180': showNav }]"
        />
      </div>
    </div>
    <nav
      :id="dropdownListId"
      :aria-labelledby="dropdownToggleId"
      :class="['hidden height-0 min-w-full xl:bg-white xl:absolute',
               {'!block xl:hidden': showMobileNav},
               {'xl:top-[78px] xl:!block': showNav},
               {'xl:!hidden': !showNav},
               {'xl:right-0': right}]"
    >
      <div
        ref="dropdownMenu"
        :class="['height-0 p-4 h-auto w-full mt-1 opacity-100',
                 {'!w-full xl:!mt-0': showMobileNav},
                 {'md:shadow-large xl:border-none  xl:bg-white': showNav}]"
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
    }
  },
  emits: ['click'],
  data () {
    return {
      showNav: false,
      showMobileNav: this.open
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
  watch: {
    open (val) {
      this.showMobileNav = val;
    }
  },
  methods: {
    onKeydown ($event) {
      const anchorTags = this.$refs.dropdownMenu.getElementsByTagName('a');
      const firstAnchorTag = anchorTags[0];
      const lastAnchorTag = anchorTags[anchorTags.length - 1];

      if ($event.key === 'Tab' && $event.shiftKey && $event.target === firstAnchorTag) {
        this.onBlur();
      }

      if ($event.key === 'Tab' && !$event.shiftKey && $event.target === lastAnchorTag) {
        this.onBlur();
      }
    },
    onBlur () {
      this.showNav = false;
      this.showMobileNav = false;
    },
    onEscape () {
      this.$refs.titleItem.focus();
      this.showNav = false;
      this.showMobileNav = false;
    },
    onClick ($event) {
      this.showNav = !this.showNav;
      this.showMobileNav = !this.showMobileNav;
      this.$emit('click', $event);
    }
  }
};
</script>
