<template>
  <div class="relative">
    <div
      :class="['absolute', { 'hidden': !hover }]"
      :style="tooltipPositionStyle"
    >
      <div
        v-if="$slots.content"
        ref="tooltipContainer"
        :class="[
          'z-10 px-4 py-4 text-sm rounded-md m-auto bg-primary-700 text-white relative',
          { 'opacity-0': !hover }
        ]"
      >
        <slot name="content" />
        <div
          :class="[
            'absolute bg-transparent w-0 h-0 m-auto',
            {
              'border-l-8 border-r-8 border-b-8 border-l-transparent border-r-transparent border-b-primary-700 -top-2': hasUpArrow
            },
            {
              'border-l-8 border-r-8 border-t-8 border-l-transparent border-r-transparent border-t-primary-700 -bottom-2': hasDownArrow
            },
            {
              'border-t-8 border-b-8 border-r-8 border-t-transparent border-b-transparent border-r-primary-700 -left-2': hasLeftArrow
            },
            {
              'border-t-8 border-b-8 border-l-8 border-t-transparent border-b-transparent border-l-primary-700 -right-2': hasRightArrow
            },
            { 'top-0 bottom-0': arrowIsVerticallyCenter },
            { 'left-0 right-0': arrowIsHorizontallyCenter },
            { 'left-4': arrowIsLeftOfCenter },
            { 'right-4': arrowIsRightOfCenter }
          ]"
        />
      </div>
    </div>
    <div
      ref="triggerContainer"
      @mouseover="handleMouseover"
      @mouseleave="handleMouseleave"
    >
      <slot name="trigger" />
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
      default: 'center',
      validator: function (value) {
        // The value must match one of these strings
        return ['center', 'left', 'right'].indexOf(value) !== -1;
      }
    }
  },
  emits: ['mouseover', 'mouseleave'],
  data () {
    return {
      hover: false,
      triggerWidth: 0,
      triggerHeight: 0,
      xOffset: 0,
      yOffset: 0
    };
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
      return (
        !this.arrowIsVerticallyCenter && this.arrowPlacement.match(/center/)
      );
    },
    arrowIsLeftOfCenter () {
      return !this.arrowIsVerticallyCenter && this.arrowPlacement.match(/left/);
    },
    arrowIsRightOfCenter () {
      return (
        !this.arrowIsVerticallyCenter && this.arrowPlacement.match(/right/)
      );
    },
    tooltipPositionStyle () {
      switch (this.position) {
        case 'top':
          return {
            left: `${this.xOffset}px`,
            bottom: `calc(${this.triggerHeight}px + 1rem)`
          };
        case 'left':
          return {
            right: `calc(${this.triggerWidth}px + 1rem)`,
            top: `${this.yOffset}px`
          };
        case 'right':
          return {
            left: `calc(${this.triggerWidth}px + 1rem)`,
            top: `${this.yOffset}px`
          };
        case 'bottom':
        default:
          return {
            left: `${this.xOffset}px`,
            top: `calc(${this.triggerHeight}px + 1rem)`
          };
      }
    }
  },
  updated () {
    this.triggerWidth = this.$refs.triggerContainer.clientWidth;
    this.triggerHeight = this.$refs.triggerContainer.clientHeight;
    this.xOffset = this.getXOffset();
    this.yOffset = this.getYOffset();
  },
  methods: {
    handleMouseover ($event) {
      this.hover = true;
      this.$emit('mouseover', $event);
    },
    handleMouseleave ($event) {
      this.hover = false;
      this.$emit('mouseleave', $event);
    },
    getXOffset () {
      if (this.$slots.content) {
        return (
          (this.$refs.triggerContainer.clientWidth -
            this.$refs.tooltipContainer.clientWidth) /
          2
        );
      }
    },
    getYOffset () {
      if (this.$slots.content) {
        return (
          (this.$refs.triggerContainer.clientHeight -
          this.$refs.tooltipContainer.clientHeight) /
        2
        );
      }
    }
  }
};
</script>
