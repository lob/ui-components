<template>
  <nav>
    <ul
      :class="[
        'bg-white-100 h-screen relative border-r-2 border-white-300',
        { expanded: collapsible && expanded },
        { collapsed: collapsible && !expanded }
      ]"
    >
      <chevron-left
        v-if="collapsible"
        :class="['w-6 h-6 pr-0.5 cursor-pointer absolute z-10 text-gray-300 bg-white bg-opacity-100 border-2 border-white-300 rounded-xl -right-3 mt-3', { 'transform rotate-180': !expanded }]"
        role="button"
        :aria-expanded="expanded"
        @click="animateDrawer"
      />
      <slot :expanded="expanded" />
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
  data () {
    return {
      expanded: true
    };
  },
  computed: {
    clickEvent () {
      return this.collapsible ? 'click' : null;
    }
  },
  methods: {
    animateDrawer () {
      this.expanded = !this.expanded;
    }
  }
};
</script>

<style scoped lang="scss">
nav {
  width: 100%;

  @screen md {
    ul:not(.collapsed) {
      width: 222px;
    }

    ul.collapsed {
      width: 70px;
    }
  }
}
</style>
