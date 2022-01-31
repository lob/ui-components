<template>
  <div
    ref="progressbar"
    role="progressbar"
    title="Progress"
    aria-live="polite"
    aria-valuetext="In progress, please wait"
    class="text-left"
  >
    <div>
      Progress
      <span v-if="percentage"> - {{ percentage }}%</span>
      <span
        v-else
        data-testid="dots"
      >
        <span
          v-for="dot in 3"
          :key="dot"
          aria-hidden="true"
          class="dots animate-ping ml-0.5"
        >.</span>
      </span>
    </div>
    <div class="mt-2 h-1.5 bg-gray-100 flex">
      <span
        data-testid="innerbar"
        :style="percentage ? `width: ${percentage}%` : ''"
        :class="['h-1.5 bg-turquoise-500 transition-all duration-500 ease-out',
                 {'animate-indybar bg-gradient-to-r from-turquoise-300 to-turquoise-500': !percentage}]"
      />
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
  watch: {
    percentage (value) {
      if (value > 0) {
        const pb = this.$refs.progressbar;
        pb.setAttribute('aria-valuenow', this.percentage);
        pb.setAttribute('aria-valuenmin', 0);
        pb.setAttribute('aria-valuemax', 100);
        pb.setAttribute('aria-busy', true);
        pb.setAttribute('aria-valuetext', `In progress, ${this.percentage}%`);
      }
    }
  }
};
</script>

<style scoped lang="scss">
.dots {
  animation-duration: 2s;
  &:nth-child(2) { animation-delay: 0.4s; }
  &:nth-child(3) { animation-delay: 0.8s; }
}
</style>
