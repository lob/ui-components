<template>
  <div
    data-delay="0"
    data-hover="1"
    data-w-id="w-dropdown-toggle-0"
    class="nav-dropdown dropdownlinkmega w-dropdown"
    @mouseover="showNav = true"
    @mouseleave="showNav = false"
    @click="$emit('toggleMobileNavs')"
  >
    <div
      id="w-dropdown-toggle-0"
      aria-controls="w-dropdown-list-0"
      data-toggle="collapse"
      aria-haspopup="menu"
      aria-expanded="false"
      role=""
      tabindex="0"
      style="outline: none;"
      :class="['nav-link-4', 'w-dropdown-toggle', {'w--open': showNav && (!showMobileNav || mobileNavs[navKey])}]"
    >
      <div class="row-2 no-wrap">
        <div class="text-block-68">
          {{ title }}
        </div>
        <img
          :src="LOB_ASSETS_URL+'/dashboard/navbar/caret-down.svg'"
          width="24"
          alt=""
          class="dropdown-icon"
        >
      </div>
    </div>
    <nav
      id="w-dropdown-list-0"
      style="width: 430px;"
      aria-labelledby="w-dropdown-toggle-0"
      :class="['dropdown-list-5', 'w-dropdown-list', {'w--open': (!showMobileNav && showNav) || (showMobileNav && mobileNavs[navKey])}]"
    >
      <div :class="['dropdown-menu', 'dropdownmega', {'snug': snug}, {'snug2': snug2}]">
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
      default: () => ({})
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
    },
    LOB_ASSETS_URL: {
      type: String,
      required: true
    }
  },
  data () {
    return {
      showNav: false
    };
  }
};
</script>
