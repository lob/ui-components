import routeDecorator from '../../../.storybook/routeDecorator';
import Vue from 'vue';

import Breadcrumb from './Breadcrumb.vue';
// import mdx from './Breadcrumb.mdx';
import iconOverview from '../../assets/images/iconOverview.svg';

export default {
  title: 'Components/Breadcrumb',
  component: Breadcrumb,
  decorators: [
    routeDecorator('/envelopes/create', {
      routes: [
        {
          path: '/',
          name: 'Dashboard',
          component: Vue.component('dashboard', {
            template: '<div>dashboard</div>'
          })
        },
        {
          path: '/envelopes',
          name: 'Envelopes',
          component: Vue.component('envelopes', {
            template: '<div>envelopes</div>'
          }),
          children: [
            {
              path: 'create',
              component: Vue.component('envelopes', {
                template: '<div>create</div>'
              })
            }
          ]
        }
      ]
    })
  ]
  // parameters: {
  //   docs: {
  //     page: mdx
  //   }
  // },
};

const Template = (args, { argTypes }) => ({
  props: Object.keys(argTypes),
  components: { Breadcrumb },
  template: '<breadcrumb v-bind="$props"></breadcrumb>'
});

export const Primary = Template.bind({});
Primary.args = {
  startName: 'Dashboard',
  iconSrc: `/${iconOverview}`
};

