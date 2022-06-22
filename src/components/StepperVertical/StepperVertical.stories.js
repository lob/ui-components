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
      { path: '/settings', displayName: 'Configure settings', pathName: 'Create Campaign Step One' },
      { path: '/audience', displayName: 'Add audience', pathName: 'Create Campaign Step Two' },
      { path: '/creative', displayName: 'Choose creative', pathName: 'Create Campaign Step Three' },
      { path: '/confirm', displayName: 'Review campaign', pathName: 'Create Campaign Step Four' }
    ]
  }
};

const activeStepIndex = 0;

const Template = (args) => ({
  components: { StepperVertical, StepperVerticalItem },
  setup: () => ({ args }),
  data: () => ({ activeStepIndex }),
  methods: {
    handleGoToStep (step) {
      this.activeStepIndex = args.steps.findIndex((s) => s === step);
    }
  },
  template: `<div style="width: 300px;">
                <StepperVertical 
                :steps="args.steps" 
                :active-step-index="activeStepIndex"
                @goToStep="(step)=> handleGoToStep(step)" 
              />
            </div>`
});

export const Default = Template.bind({});

const DarkTemplate = (args) => ({
  components: { StepperVertical, StepperVerticalItem },
  setup: () => ({ args }),
  data: () => ({ activeStepIndex }),
  methods: {
    handleGoToStep (step) {
      this.activeStepIndex = args.steps.findIndex((s) => s === step);
    }
  },
  template: `<div style="width: 300px;">
              <StepperVertical 
                style="backgroundColor: #324350; padding: 4em 4em 4em 0;"
                dark-mode 
                :steps="args.steps" 
                :active-step-index="activeStepIndex"
                @goToStep="(step)=> handleGoToStep(step)"  
              />
            </div>`
});

export const DarkMode = DarkTemplate.bind({});
