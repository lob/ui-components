import routeDecorator, { routeTemplate } from '../../../.storybook/routeDecorator';

import Breadcrumb from './Breadcrumb.vue';
import mdx from './Breadcrumb.mdx';
import iconOverview from '@/assets/images/iconOverview.svg';

export default {
  title: 'Components/Breadcrumb',
  component: Breadcrumb,
  decorators: [
    routeDecorator('/envelopes/create', [
      {
        path: '/',
        component: {
          template: routeTemplate('overview')
        }
      },
      {
        path: '/envelopes',
        component: {
          template: '<div><h1>Letters</h1><router-view /></div>'
        },
        children: [
          {
            path: '',
            name: 'Envelopes',
            component: {
              template: routeTemplate('envelopes')
            }
          },
          {
            path: 'create',
            name: 'Create Envelope',
            component: {
              template: routeTemplate('create')
            }
          }
        ]
      }
    ])
  ],
  parameters: {
    docs: {
      page: mdx
    }
  }
};

const Template = (args, { argTypes }) => ({
  props: Object.keys(argTypes),
  components: { Breadcrumb },
  setup: () => ({ args }),
  template: '<breadcrumb v-bind="args"></breadcrumb>'
});

export const Primary = Template.bind({});
Primary.args = {
  startName: 'Dashboard',
  iconSrc: `/${iconOverview}`
};
