<template>
  <nav :style="`width: ${animatedWidth}px;`">
    <ul
      class="bg-offWhite h-screen"
      @click="slide"
    >
      <slot
        :slidOut="slidOut"
        :sliding="sliding"
      />
    </ul>
  </nav>
</template>

<script>
import { gsap } from 'gsap';

const openWidth = 222;
const closedWidth = 70;

export default {
  name: 'MainNavigation',
  data: function () {
    return {
      slidOut: true,
      tweenedWidth: openWidth,
      sliding: false
    };
  },
  computed: {
    animatedWidth: function () {
      return this.tweenedWidth.toFixed(0);
    }
  },
  watch: {
    slidOut: function (newValue) {
      const newWidth = newValue ? openWidth : closedWidth;
      gsap.to(this.$data, { duration: 0.5, tweenedWidth: newWidth });
    },
    tweenedWidth: function (newValue) {
      if (newValue === openWidth || newValue === closedWidth) {
        this.sliding = false;
      } else {
        this.sliding = true;
      }
    }
  },
  methods: {
    slide () {
      this.slidOut = !this.slidOut;
    }
  }
};
</script>

