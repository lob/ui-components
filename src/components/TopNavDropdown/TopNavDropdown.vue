<template>
  <div
    class="block xl:inline-block relative z-50 mx-0 px-0 border-b-2 border-gray-100 xl:border-0 focus:border-b-2"
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
      :class="['relative inline-block cursor-pointer w-full xl:w-auto py-6 px-10',
               'transition-colors duration-200 ease-linear hover:bg-gray-50 hover:focus-within:border-none focus-within:border focus-within:border-black focus-within:border-dotted']"
      :aria-controls="dropdownListId"
      aria-haspopup="menu"
    >
      <div
        ref="titleItem"
        tabindex="0"
        class="type-small-700 text-gray-500 whitespace-nowrap focus:outline-none flex items-center"
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
      :class="['hidden height-0 min-w-full xl:bg-white xl:absolute', {'!block xl:hidden': showMobileNav}, {'xl:top-17 xl:!block': showNav}, {'xl:!hidden': !showNav}, {'xl:right-0': right}]"
    >
      <div
        ref="dropdownMenu"
        :class="['height-0 pt-6 pb-4 px-4 h-auto w-full mt-1 border-gray-100 opacity-100',
                 {'!w-full xl:!mt-0': showMobileNav},
                 {'boxShadowGray xl:border-none  xl:bg-white': showNav}]"
      >
        <slot />
      </div>
    </nav>
  </div>
</template>

<script>
import ChevronDown from '../Icons/ChevronDown.vue';
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

<style lang="scss" scoped>
@screen md {
  .boxShadowGray {
    box-shadow: 0 8px 16px 0 rgba(0, 0, 0, 0.08);
  }
}
</style>
