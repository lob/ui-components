<template>
  <nav>
    <ul
      :class="[
        'bg-offWhite h-screen',
        {'expanded': expanded},
        {'collapsed': !expanded}
      ]"
      @click="animateDrawer"
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
  data: function () {
    return {
      expanded: true
    };
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
     .expanded {
       width: 222px;
     }

     .collapsed {
       width: 70px;
     }
  }
}
</style>
