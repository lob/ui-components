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
  }
};

const Template = (args) => ({
  components: { StepperVertical, StepperVerticalItem },
  setup: () => ({ args }),
  template: '<StepperVertical :steps="args.steps"/>'
});

export const Default = Template.bind({});

const DarkTemplate = (args) => ({
  components: { StepperVertical, StepperVerticalItem },
  setup: () => ({ args }),
  template: '<StepperVertical dark-mode :steps="args.steps" style="backgroundColor: #324350; padding: 4em 4em 4em 0;"/>'
});

export const DarkMode = DarkTemplate.bind({});
