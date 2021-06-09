<template>
  <div
    class="block md:inline-block relative z-50 mx-0 px-0 border-b-2 border-gray-100 md:border-0 focus:border-b-2"
    data-testId="menu-container"
    @mouseenter="showNav = true"
    @mouseleave="showNav = false"
    @click="onClick"
  >
    <div
      :id="dropdownToggleId"
      class="w-full md:w-auto outline-none mx-0 py-2.5 px-3 transition-colors duration-200 ease-linear text-gray-700 whitespace-nowrap active:text-primary-300 active:no-underline hover:text-primary-300 hover:no-underline inline-block cursor-pointer relative"
      :aria-controls="dropdownListId" 
      aria-haspopup="menu"
      role="navigation"
    >
      <div class="flex-nowrap flex width-100 mt-0 flex-row justify-between md:justify-start items-center">
        {{ title }} 
        <img
          :src="`${$getConst('lobAssetsUrl')}/dashboard/navbar/caret-down.svg`"
          width="24"
          alt=""
          :class="['transition-transform duration-200 ease-linear -mr-1', {'md:transform md:rotate-180': showNav}]"
        >
      </div>
    </div>
    <nav
      :id="dropdownListId"
      :aria-labelledby="dropdownToggleId"
      :class="['height-0 md:absolute min-w-full bg-white-200', {'hidden': !showNav && !showMobileNav}, {'block top-7': showNav && !showMobileNav}]"
    >
      <div
        :class="['height-0 pt-6 pb-4 px-4',
                 {'width550 absolute mt-1 border-none border-gray-100 rounded-lg bg-white boxShadowGray opacity-100 hidden md:block h-auto': showNav && !showMobileNav},
                 {'!w-full mt-1 border-none border-gray-100 opacity-100 block md:hidden h-auto': showMobileNav},
                 {'width430': small && !showMobileNav}, {'width330': smaller && !showMobileNav}]"
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
    collapsed: {
      type: Boolean,
      default: false
    },
    small: {
      type: Boolean,
      default: false
    },
    smaller: {
      type: Boolean,
      default: false
    }
  },
  data () {
    return {
      showNav: false,
      showMobileNav: this.collapsed
    };
  },
  methods: {
    onClick($evt) {
      this.showMobileNav = !this.showMobileNav;
      this.$emit('click', $evt);
    }
  },
  computed: {
    dropdownToggleId() {
      return `dropdown-toggle-${this.id}`
    },
    dropdownListId() {
      return `dropdown-list-${this.id}`
    }
  }
};
</script>

<style lang="scss" scoped>
.boxShadowGray {
  box-shadow: 0 8px 16px 0 rgba(0, 0, 0, 0.08);
}

@screen md {
  .width330 {
    width: 330px !important
  }

  .width430 {
    width: 430px !important
  }

  .width550 {
    width: 550px
  }
}
</style>
