import routeDecorator, { routeTemplate } from '../../../.storybook/routeDecorator';

import Breadcrumb from './Breadcrumb.vue';
import mdx from './Breadcrumb.mdx';
import iconOverview from '@/assets/images/iconOverview.svg';

export default {
  title: 'Components/Breadcrumb',
  component: Breadcrumb,
  decorators: [
    routeDecorator('/envelopes/env_f488a53a4801c87f5', [
      {
        path: '/',
        component: {
          template: routeTemplate('overview')
        }
      },
      {
        path: '/envelopes',
        component: {
          template: '<div><h1>Envelopes</h1><router-view /></div>'
        },
        children: [
          {
            path: '',
            name: 'EnvelopesList',
            component: {
              template: routeTemplate('envelopes')
            },
            meta: {
              displayName: 'Envelopes'
            }
          },
          {
            path: ':id',
            name: 'ViewEnvelope',
            component: {
              template: routeTemplate('view')
            },
            meta: {
              useParamsForDisplay: true
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
  iconSrc: iconOverview
};
