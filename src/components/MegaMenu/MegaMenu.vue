<template>
  <div
    class="mx-auto inline-block relative z-50 mx-0 px-0"
    data-testId="menu-container"
    @mouseenter="showNav = true"
    @mouseleave="showNav = false"
    @click="$emit('toggleMobileNavs')"
  >
    <div
      id="w-dropdown-toggle-3"
      class="outline-none mx-0 py-2.5 px-3 transition-colors duration-200 ease-linear text-gray-700 whitespace-nowrap active:text-primary-300 active:no-underline hover:text-primary-300 hover:no-underline inline-block cursor-pointer relative"
      aria-controls="w-dropdown-list-3"
      aria-haspopup="menu"
      aria-expanded="false"
      role=""
    >
      <div class="flex-nowrap flex width-100 mt-0 flex-row justify-start items-center">
        {{ title }}
        <img
          :src="$getConst('lobAssetsUrl')+'/dashboard/navbar/caret-down.svg'"
          width="24"
          alt=""
          :class="['transition-transform duration-200 ease-linear -mr-1', {'transform rotate-180': rotate}]"
        >
      </div>
    </div>
    <nav
      id="w-dropdown-list-3"
      aria-labelledby="w-dropdown-toggle-3"
      :class="['height-0 absolute min-w-full bg-gray-100', {'hidden': !showMenu}, {'block top-7' : showMenu}]"
    >
      <div
        :class="['height-0 pt-6 pb-4 px-4',
                 {'absolute mt-1 border-none border-gray-100 rounded-lg bg-white boxShadowGray opacity-100 block h-auto': showMenu},
                 {'width330': snug}, {'width430': snug2}, {'width550': noSnug}]"
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
    showMobileNav: {
      type: Boolean,
      default: false
    },
    mobileNavs: {
      type: Object,
      required: true
    },
    navKey: {
      type: String,
      required: true
    },
    snug: {
      type: Boolean,
      default: false
    },
    snug2: {
      type: Boolean,
      default: false
    }
  },
  data () {
    return {
      showNav: false
    };
  },
  computed: {
    rotate () {
      return this.showNav && (!this.showMobileNav || this.mobileNavs[this.navKey]);
    },
    showMenu () {
      return (!this.showMobileNav && this.showNav) || (this.showMobileNav && this.mobileNavs[this.navKey]);
    },
    noSnug () {
      return !this.snug && !this.snug2;
    }
  }
};
</script>

<style lang="scss" scoped>
  .boxShadowGray {
    box-shadow: 0 8px 16px 0 rgba(0, 0, 0, 0.08);
  }

  .width330 {
    width: 330px
  }

  .width430 {
    width: 430px
  }

  .width550 {
    width: 550px
  }
</style>
