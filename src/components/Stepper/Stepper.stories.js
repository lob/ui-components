import Stepper from './Stepper.vue';
import StepperItem from './StepperItem.vue';
import mdx from './Stepper.mdx';

export default {
  title: 'Components/Stepper',
  component: Stepper,
  subcomponents: { StepperItem },
  parameters: {
    docs: {
      page: mdx
    }
  },
  argTypes: {}
};

const Template = (args) => ({
  components: { Stepper, StepperItem },
  setup: () => ({ args }),
  template: `
    <Stepper>
      <StepperItem position="first" variant="finished" :alignLeft="args.alignLeft" :dashedBorder="args.dashedBorder">
        Finished
      </StepperItem>
      <StepperItem variant="active" :alignLeft="args.alignLeft" :dashedBorder="args.dashedBorder">
        Active
      </StepperItem>
      <StepperItem variant="error" :alignLeft="args.alignLeft" :dashedBorder="args.dashedBorder">
        Error
      </StepperItem>
      <StepperItem position="last" variant="unfinished" :alignLeft="args.alignLeft" :dashedBorder="args.dashedBorder">
        Unfinished
      </StepperItem>
    </Stepper>
    `
});

export const Primary = Template.bind({});
Primary.args = {
  alignLeft: false,
  dashedBorder: false
};

const ItemTemplate = (args, { argTypes }) => ({
  props: Object.keys(argTypes),
  components: { StepperItem },
  setup: () => ({ args }),
  template: `
    <StepperItem v-bind="args">
      Some text
    </StepperItem>
    `
});

export const Item = ItemTemplate.bind({});
Item.argTypes = {
  variant: {
    options: ['finished', 'active', 'error', 'unfinished'],
    control: {
      type: 'select'
    }
  },
  position: {
    options: ['first', 'middle', 'last'],
    control: {
      type: 'select'
    }
  }
};

Item.args = {
  variant: 'active',
  position: 'middle',
  alignLeft: false,
  dashedBorder: false
};
