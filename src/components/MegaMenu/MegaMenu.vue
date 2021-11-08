<template>
  <div
    class="block xl:inline-block relative z-50 mx-0 px-0 border-b-2 border-gray-100 xl:border-0 focus:border-b-2"
    data-testId="menu-container"
    @mouseenter="showNav = true"
    @mouseleave="showNav = false"
    @keyup.enter="onClick"
    @click="onClick"
  >
    <div
      :id="dropdownToggleId"
      class="w-full xl:w-auto outline-none mx-0 py-2.5 px-3 transition-colors duration-200 ease-linear text-gray-700 whitespace-nowrap active:text-primary-300 active:no-underline hover:text-primary-300 hover:no-underline inline-block cursor-pointer relative"
      :aria-controls="dropdownListId"
      aria-haspopup="menu"
    >
      <div
        tabindex="0"
        class="focus:outline-none focus:opacity-100 focus:ring-2 focus:ring-primary-100 focus:border-transparent flex-nowrap flex mt-0 flex-row justify-between xl:justify-start items-center px-2 py-1 xl:px-0 xl:py-0"
      >
        {{ title }}
        <img
          :src="`${$getConst('lobAssetsUrl')}/dashboard/navbar/caret-down.svg`"
          width="24"
          alt=""
          :class="['transition-transform duration-200 ease-linear -mr-1', {'xl:transform xl:rotate-180': showNav}]"
        >
      </div>
    </div>
    <nav
      :id="dropdownListId"
      :aria-labelledby="dropdownToggleId"
      :class="['hidden height-0 min-w-full xl:rounded-lg xl:bg-white xl:absolute', {'!block xl:hidden': showMobileNav}, {'xl:top-9 xl:!block': showNav}, {'xl:!hidden': !showNav}, {'xl:right-0': right}]"
    >
      <div
        :class="['height-0 pt-6 pb-4 px-4 h-auto w-full mt-1 border-gray-100 opacity-100',
                 {'!w-full xl:!mt-0': showMobileNav},
                 {'boxShadowGray xl:border-none xl:rounded-lg xl:bg-white': showNav}]"
      >
        <slot />
      </div>
    </nav>
  </div>
</template>

<script>
export default {
  name: 'MegaMenu',
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
