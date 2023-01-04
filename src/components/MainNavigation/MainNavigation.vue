<template>
  <nav class="xl:min-h-full p-4 relative bg-white border-r-2 border-white-300">
    <button
      v-if="collapsible"
      :class="['hidden xl:block w-7 h-7 rounded-full absolute -right-3 mt-3 z-10',
               'text-gray-500 bg-white border-2 border-white-300 transition-transform duration-100 ease-in',
               { 'transform -rotate-180': !expanded }]"
      :aria-expanded="expanded"
      @click="animateDrawer"
    >
      <ChevronLeft
        size="s"
        class="m-auto"
      />
    </button>
    <ul
      data-testId="main-navigation-list"
      :class="[
        'relative transition-width duration-100 ease-in',
        { expanded: collapsible && expanded },
        { collapsed: collapsible && !expanded }
      ]"
    >
      <slot
        :expanded="expanded"
        :events="{toggleCollapse:animateDrawer}"
      />
    </ul>
  </nav>
</template>

<script>
import ChevronLeft from '@/components/Icons/ChevronLeft';

export default {
  name: 'MainNavigation',
  components: { ChevronLeft },
  props: {
    collapsible: {
      type: Boolean,
      default: true
    }
  },
  emits: ['toggleCollapse'],
  data () {
    return {
      expanded: true
    };
  },
  methods: {
    animateDrawer () {
      this.expanded = !this.expanded;
      this.$emit('toggleCollapse');
    }
  }
};
</script>

<style scoped lang="scss">
nav {
  width: 100%;

  @screen xl {
    ul:not(.collapsed) {
      width: 100%;
    }

    ul.collapsed {
      width: 50px;
    }
  }
}
</style>
