import StepperVertical from './StepperVertical.vue';
import StepperVerticalItem from './StepperVerticalItem.vue';
import mdx from './StepperVertical.mdx';

export default {
  title: 'Components/StepperVertical',
  component: StepperVertical,
  subcomponents: { StepperVerticalItem },
  parameters: {
    docs: {
      page: mdx
    }
  },
  args: {
    steps: [
      { path: '/settings', pathName: 'Choose campaign settings' },
      { path: '/audience', pathName: 'Add target audience' },
      { path: '/creative', pathName: 'Compose creative' },
      { path: '/finalize', pathName: 'Finalize campaign' }
    ]
  },
  methods: {
    handleClick (step) {
      console.log(`clicked ${step.pathName}`); //eslint-disable-line
    }
  }
};

const Template = (args) => ({
  components: { StepperVertical, StepperVerticalItem },
  setup: () => ({ args }),
  template: `
  <StepperVertical :steps="args.steps">
    <StepperVerticalItem :v-for="args.steps" :key="step" :step="step" @click="handleClick"/>
  </StepperVertical>
  `
});

export const Primary = Template.bind({});

const DarkTemplate = (args) => ({
  components: { StepperVertical, StepperVerticalItem },
  setup: () => ({ args }),
  template: `
  <StepperVertical dark-mode :steps="args.steps" style="backgroundColor: #324350; padding: 4em 4em 4em 0;">
    <StepperVerticalItem :v-for="args.steps" :key="step" :step="step" @click="handleClick"/>
  </StepperVertical>
  `
});

export const DarkMode = DarkTemplate.bind({});
