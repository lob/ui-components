<template>
  <div>
    <StepperVerticalItem
      v-for="step in steps"
      :key="step"
      :ref="step === stepWithlongestPathName ? 'longest' : null"
      :style="`min-width:${longestWidth}px;`"
      :step="step"
      :dark-mode="darkMode"
      :index="steps.indexOf(step)+1"
      :active="activeStepPathName === step.pathName"
      @click="handleClick(step)"
    />
  </div>
</template>

<script>
import StepperVerticalItem from './StepperVerticalItem.vue';

export default {
  name: 'StepperVertical',
  components: { StepperVerticalItem },
  props: {
    steps: { type: Array, required: true },
    currentStep: { type: Object, default: null },
    darkMode: { type: Boolean, default: false }
  },
  emits: ['goToStep'],
  data () {
    return {
      activeStepPathName: this.currentStep?.pathName || this.steps[0]?.pathName,
      longestWidth: null
    };
  },
  computed: {
    stepWithlongestPathName () {
      return this.steps.reduce((max, step) => {
        return step.pathName.length > max.pathName.length ? step : max;
      }, this.steps[0]);
    }
  },
  mounted () {
    //get the longest element's width for setting the steps' min width
    this.longestWidth = this.$refs.longest[0].$el.offsetWidth;
  },
  methods: {
    handleClick (step) {
      this.activeStepPathName = step.pathName;
      this.$emit('goToStep', step);
    }
  }
};
</script>
