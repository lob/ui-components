<template>
  <nav>
    <ul
      :class="[
        'bg-offWhite h-screen',
        {'cursor-pointer': collapsible},
        {'expanded': collapsible && expanded},
        {'collapsed': collapsible && !expanded}
      ]"
      @[clickEvent]="animateDrawer"
    >
      <slot
        :expanded="expanded"
      />
    </ul>
  </nav>
</template>

<script>
export default {
  name: 'MainNavigation',
  props: {
    collapsible: {
      type: Boolean,
      default: true
    }
  },
  data: function () {
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
