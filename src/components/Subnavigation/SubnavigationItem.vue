<template>
  <li
    class="list-none mr-12 whitespace-nowrap"
    :class="['relative pb-4', { 'lob-active-border': active }]"
  >
    <LobLink
      :to="to"
      :underline="false"
      :class="['pb-4 text-black font-light', { 'font-normal': active }]"
    >
      {{ title }}
    </LobLink>
  </li>
</template>

<script>
import LobLink from '../Link/Link';

export default {
  name: 'SubnavigationItem',
  components: { LobLink },
  props: {
    title: {
      type: String,
      default: ''
    },
    to: {
      type: String,
      default: ''
    },
    matchQueryString: {
      type: Boolean,
      default: false
    }
  },
  computed: {
    active () {
      return this.matchQueryString ? this.$route.fullPath === this.to : this.$route?.fullPath?.includes(this.to);
    }
  }
};
</script>

<style scoped lang="scss">
  .lob-active-border::before {
    content: " ";
    bottom: -2px;

    @apply absolute;
    @apply z-10;
    @apply top-0;
    @apply left-0;
    @apply right-0;
    @apply border-b-3;
    @apply border-primary-300;
  }
</style>
