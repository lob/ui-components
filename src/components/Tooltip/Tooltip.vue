<template>
  <div
    class="bg-lemon m-4"
    @mouseover="hover=true"
    @mouseleave="hover = false"
  >
    <div
      v-if="visible"
      class="px-4 py-3 text-xs rounded-md bg-gray-700 text-white relative"
    >
      <slot />
      <div
        :class="[
          'absolute bg-transparent w-0 h-0 m-auto',
          {'border-l-8 border-r-8 border-b-8 border-l-transparent border-r-transparent border-b-gray-700 -top-2' : hasUpArrow},
          {'border-l-8 border-r-8 border-t-8 border-l-transparent border-r-transparent border-t-gray-700 -bottom-2' : hasDownArrow},
          {'border-t-8 border-b-8 border-r-8 border-t-transparent border-b-transparent border-r-gray-700 -left-2' : hasLeftArrow},
          {'border-t-8 border-b-8 border-l-8 border-t-transparent border-b-transparent border-l-gray-700 -right-2' : hasRightArrow},
          {'top-0 bottom-0': arrowIsVerticallyCenter},
          {'left-0 right-0': arrowIsHorizontallyCenter},
          {'left-4': arrowIsLeftOfCenter},
          {'right-4': arrowIsRightOfCenter},

        ]"
      />
    </div>
  </div>
</template>

<script>
export default {
  name: 'Tooltip',
  props: {
    position: {
      type: String,
      default: 'bottom',
      validator: function (value) {
        // The value must match one of these strings
        return ['top', 'bottom', 'left', 'right'].indexOf(value) !== -1;
      }
    },
    arrowPlacement: {
      type: String,
      default: '',
      validator: function (value) {
        // The value must match one of these strings
        return ['', 'left', 'right'].indexOf(value) !== -1;
      }
    },
    visible: {
      type: Boolean,
      default: false
    }
  },
  computed: {
    hasUpArrow () {
      return this.position.match(/bottom/);
    },
    hasDownArrow () {
      return this.position.match(/top/);
    },
    hasLeftArrow () {
      return this.position.match(/right/);
    },
    hasRightArrow () {
      return this.position.match(/left/);
    },
    arrowIsVerticallyCenter () {
      return this.hasLeftArrow || this.hasRightArrow;
    },
    arrowIsHorizontallyCenter () {
      return !this.arrowIsVerticallyCenter && this.arrowPlacement === '';
    },
    arrowIsLeftOfCenter () {
      return !this.arrowIsVerticallyCenter && this.arrowPlacement.match(/left/);
    },
    arrowIsRightOfCenter () {
      return !this.arrowIsVerticallyCenter && this.arrowPlacement.match(/right/);
    }
  }
};
</script>

<style scoped lang="scss">

</style>
