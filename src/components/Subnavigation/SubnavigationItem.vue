<template>
  <li
    class="list-none mr-12"
  >
    <router-link
      :to="to"
      class="relative pb-4"
      active-class="active-border"
      data-testid="subnav-item"
    >
      {{ title }}
    </router-link>
  </li>
</template>

<script>
export default {
  name: 'SubnavigationItem',
  props: {
    title: {
      type: String,
      default: ''
    },
    to: {
      type: String,
      default: ''
    }
  }
};
</script>

<style scoped lang="scss">
  .active-border::before {
    content: " ";
    bottom: -2px;

    @apply absolute;
    @apply z-10;
    @apply top-0;
    @apply left-0;
    @apply right-0;
    @apply border;
    @apply border-solid;
    @apply border-t-0;
    @apply border-r-0;
    @apply border-l-0;
    @apply border-b-3;
    @apply border-blue-l;
  }
</style>
