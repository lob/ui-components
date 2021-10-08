<template>
  <li
    class="list-none mr-12"
  >
    <LobLink
      :to="to"
      class="inline-block relative pb-4 no-underline text-black font-light"
      :exact-active-class="exactActiveClass"
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
    exactActiveClass () {
      const activeClass = 'lob-active-border font-normal';
      const matchWithQueryString = this.$route.fullPath === this.to;
      if (this.matchQueryString) {
        return matchWithQueryString ? activeClass : '';
      } else {
        return activeClass;
      }
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
