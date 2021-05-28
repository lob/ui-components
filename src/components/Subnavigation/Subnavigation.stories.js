import routeDecorator from '../../../.storybook/routeDecorator';

import Subnavigation from './Subnavigation.vue';
import SubnavigationItem from './SubnavigationItem.vue';
// import mdx from './SubNavigation.mdx';

export default {
  title: 'Components/Subnavigation ',
  component: Subnavigation,
  subcomponents: { SubnavigationItem },
  parameters: {
    // docs: {
    //   page: mdx
    // }
  },
  argTypes: {}
};

const Template = (args, { argTypes }) => ({
  props: Object.keys(argTypes),
  components: { Subnavigation, SubnavigationItem },
  template: `<div class="flex">
    <subnavigation v-bind="$props">
      <subnavigation-item label="Account" to="/account" />
      <subnavigation-item label="API Keys" to="/api-keys" />
      <subnavigation-item label="Payment" to="/payment" />
    </subnavigation>
  </div>`
});

export const Primary = Template.bind({});
Primary.decorators = [routeDecorator()];
