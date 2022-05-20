<template>
  <div
    ref="progressbar"
    role="progressbar"
    title="Progress"
    aria-live="polite"
    aria-valuetext="In progress, please wait"
    class="relative h-4.5 w-[420px]"
  >
    <div class="absolute inset-0 rounded-full border border-primary-500 text-r" />
    <div class="absolute inset-0 rounded-full overflow-hidden">
      <div
        data-testid="innerbar"
        :style="percentage ? `width: ${styleWidth}` : ''"
        :class="['absolute inset-0 w-full rounded-full gradientBg transition-all duration-500 ease-out',
                 {'animate-indybar': !percentage}]"
      />
    </div>
    <div
      v-if="percentage"
      class="absolute top-[0.5px] left-2.5 text-white text-xs font-bold tracking-[0.08em]"
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
      if (this.percentage >= 0 && this.percentage < 10) {
        return '10%';
      } else if (this.percentage >= 10 && this.percentage < 100) {
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
  background: linear-gradient(105.01deg, #0154AC 17.25%, #1876DB 93.21%);
}

.animate-indybar {
  animation: indybar 3s infinite;
}

@keyframes indybar {
  0% { width: 0; margin-left: 0; margin-right: 100% }
  50% { width: 100%; margin-left: 0; margin-right: 0 }
  100% { width: 0; margin-left: 100%; margin-right: 0 }
}
</style>
