import routeDecorator from '../../../.storybook/routeDecorator';

import Subnavigation from './Subnavigation.vue';
import SubnavigationItem from './SubnavigationItem.vue';
import mdx from './Subnavigation.mdx';

const templateStr = `
  <subnavigation>
    <subnavigation-item title="Account" to="/account" />
    <subnavigation-item title="API Keys" to="/api-keys" />
    <subnavigation-item title="Payment" to="/payment" />
  </subnavigation>
`;

export default {
  title: 'Components/Subnavigation ',
  component: Subnavigation,
  subcomponents: { SubnavigationItem },
  parameters: {
    docs: {
      page: mdx,
      source: {
        code: templateStr
      }
    }
  },
  argTypes: {}
};

const Template = (args, { argTypes }) => ({
  props: Object.keys(argTypes),
  components: { Subnavigation, SubnavigationItem },
  template: templateStr
});

export const Primary = Template.bind({});
Primary.decorators = [routeDecorator('/account')];
