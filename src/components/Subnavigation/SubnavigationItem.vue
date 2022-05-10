<template>
  <li
    class="list-none mr-12 whitespace-nowrap"
  >
    <LobLink
      :to="to"
      :class="['relative pb-4 no-underline text-black font-light', { 'lob-active-border font-normal': active }]"
      data-testid="subnav-item"
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
