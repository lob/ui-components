<template>
  <div
    role="progressbar"
    title="Progress"
    aria-live="polite"
    aria-valuetext="In progress, please wait"
    class="relative h-4.5 w-[420px]"
  >
    <!-- div with just the border, absolute so that the border does not contain the bar,
    the gradient bar sits exactly on top of the border -->
    <div
      :class="['absolute inset-0 rounded-full border border-primary-500 bg-white',
               {'z-[1]': percentage}] "
    />
    <!-- div with overflow hidden - important for containing the bar -->
    <div class="absolute inset-0 rounded-full overflow-hidden">
      <!-- div with black bg to trick the next div to turn the text white (has same width as the blue bar) -->
      <div
        :class="['absolute inset-0 rounded-full',
                 {'bg-[#000] z-[2]': percentage}]"
        :style="percentage ? `width: ${styleWidth}` : ''"
      />
      <!-- div with gradient blue fill with z-4 so it sits over the blackbg
      but has mix-blend-screen so we can see the number under it -->
      <div
        data-testid="innerbar"
        :style="percentage ? `width: ${styleWidth}` : ''"
        :class="['absolute inset-0 w-full rounded-full gradientBg transition-all duration-500 ease-out',
                 {'z-[4] mix-blend-screen': percentage},
                 {'animate-indybar': !percentage}]"
      />
    </div>
    <!-- div with white text (turns black/white based on its background with mix-blend-difference) -->
    <div
      v-if="percentage"
      class="absolute top-[0.5px] left-2.5 text-white text-xs font-bold tracking-[0.08em] mix-blend-difference z-[3]"
    >
      {{ displayedPercentage }}%
    </div>
  </div>
</template>

<script>
export default {
  name: 'ProgressBar',
  props: {
    percentage: {
      type: Number,
      default: 0,
      validator (value) {
        return value >= 0 && value <= 100;
      }
    }
  },
  computed: {
    displayedPercentage () { //do not show -0 or 100+ (in case of bug/mistake)
      if (this.percentage >= 100) {
        return 100;
      }
      if (this.percentage <= 0) {
        return 0;
      }
      return this.percentage;
    },
    styleWidth () {
      if (this.percentage >= 0 && this.percentage < 100) {
        return `${this.percentage}%`;
      } else if (this.percentage >= 100) {
        return '100%';
      } else {
        return '';
      }
    }
  },
  watch: {
    percentage (value) {
      if (value > 0) {
        const pb = this.$refs.progressbar;
        pb.setAttribute('aria-valuenow', this.percentage);
        pb.setAttribute('aria-valuenmin', 0);
        pb.setAttribute('aria-valuemax', 100);
        pb.setAttribute('aria-busy', this.percentage === 100 ? false : true);
        pb.setAttribute('aria-valuetext', `In progress, ${this.percentage}%`);
      }
    }
  }
};
</script>

<style scoped lang="scss">
.gradientBg {
  background: linear-gradient(105.01deg, #0154ac 17.25%, #1876db 93.21%);
}

.animate-indybar {
  animation: indybar 3s infinite;
}

@keyframes indybar {
  0% {
    width: 0;
    margin-left: 0;
    margin-right: 100%;
  }

  50% {
    width: 100%;
    margin-left: 0;
    margin-right: 0;
  }

  100% {
    width: 0;
    margin-left: 100%;
    margin-right: 0;
  }
}
</style>
