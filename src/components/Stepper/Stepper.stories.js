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
      <StepperItem position="first" variant="finished">
        Finished
      </StepperItem>
      <StepperItem variant="active">
        Active
      </StepperItem>
      <StepperItem variant="error">
        Error
      </StepperItem>
      <StepperItem position="last" variant="unfinished">
        Unfinished
      </StepperItem>
    </Stepper>
    `
});

export const Primary = Template.bind({});
Primary.args = {
};

const ItemTemplate = (args, { argTypes }) => ({
  props: Object.keys(argTypes),
  components: { StepperItem },
  setup: () => ({ args }),
  template: `
    <StepperItem>
      Some text
    </StepperItem>
    `
});

export const Item = ItemTemplate.bind({});
Item.args = {
};
