import routeDecorator, { routeTemplate } from '../../../.storybook/routeDecorator';
import Stepper from './Stepper.vue';
import StepperItem from './StepperItem.vue';
import mdx from './Stepper.mdx';

export default {
  title: 'Components/Stepper',
  component: Stepper,
  subcomponents: { StepperItem },
  decorators: [
    routeDecorator('/', [
      {
        path: '/settings/main/account',
        component: {
          template: routeTemplate('account')
        }
      }
    ])
  ],
  parameters: {
    docs: {
      page: mdx
    }
  },
  argTypes: {}
};

const Template = (args, { argTypes }) => ({
  props: Object.keys(argTypes),
  components: { Stepper, StepperItem },
  setup: () => ({ args }),
  template: `
    <Stepper>
      <StepperItem position="first" variant="finished" v-bind="args">
        Finished
      </StepperItem>
      <StepperItem variant="active" v-bind="args">
        Active
      </StepperItem>
      <StepperItem variant="error" v-bind="args">
        Error
      </StepperItem>
      <StepperItem position="last" variant="unfinished" v-bind="args">
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
Item.args = {
  variant: 'active',
  position: 'middle',
  alignLeft: false,
  dashedBorder: false
};
