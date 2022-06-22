<template>
  <div>
    <StepperVerticalItem
      v-for="step, index in steps"
      :key="step"
      :step="step"
      :dark-mode="darkMode"
      :index="index"
      :active="getIsActiveStep(index)"
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
    steps: { type: Array, required: true,
      validator: function (value) {
        const hasPathName = (obj) => obj.hasOwnProperty('pathName');
        const hasDisplayName = (obj) => obj.hasOwnProperty('displayName');
        return Array.isArray(value) && value.every(hasDisplayName) && value.every(hasPathName);
      } },
    activeStepIndex: { type: Number, required: true },
    darkMode: { type: Boolean, default: false }
  },
  emits: ['goToStep'],
  computed: {
    activeStep () {
      return this.steps[this.activeStepIndex];
    }
  },
  methods: {
    handleClick (step) {
      this.$emit('goToStep', step);
    },
    getIsActiveStep (index) {
      return index === this.activeStepIndex;
    }
  }
};
</script>
