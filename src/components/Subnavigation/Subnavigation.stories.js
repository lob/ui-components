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
const routeTemplate = (name) => `<div>${name}</div>`;

export default {
  title: 'Components/Subnavigation ',
  component: Subnavigation,
  subcomponents: { SubnavigationItem },
  decorators: [
    routeDecorator('/account', {
      routes: [
        {
          path: '/account',
          component: {
            template: routeTemplate('account')
          }
        },
        {
          path: '/api-keys',
          component: {
            template: routeTemplate('api-keys')
          }
        },
        {
          path: '/payment',
          component: {
            template: routeTemplate('payment')
          }
        }
      ]
    })
  ],
  parameters: {
    docs: {
      page: mdx,
      source: {
        code: templateStr
      }
    }
  }
};

const Template = (args, { argTypes }) => ({
  props: Object.keys(argTypes),
  components: { Subnavigation, SubnavigationItem },
  setup: () => ({ args }),
  template: templateStr
});

export const Primary = Template.bind({});
