<template>
  <div>
    <StepperVerticalItem
      v-for="step in steps"
      :key="step"
      :ref="step === stepWithlongestPathName ? 'longest' : null"
      :step="step"
      :min-width="minWidth"
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
      minWidth: null
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
    //get the longest element's width
    this.minWidth = this.$refs.longest[0].$el.offsetWidth;
  },
  methods: {
    handleClick (step) {
      this.activeStepPathName = step.pathName;
      this.$emit('goToStep', step);
    }
  }
};
</script>
