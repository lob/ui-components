import routeDecorator, { routeTemplate } from '../../../.storybook/routeDecorator';

import LobLink from './Link.vue';
// import mdx from './Link.mdx';

export default {
  title: 'Components/Link',
  component: LobLink,
  decorators: [
    routeDecorator('/', [
      {
        path: '/internal',
        component: {
          template: routeTemplate('internal')
        }
      }
    ])
  ],
  parameters: {
    // docs: {
    //   page: mdx
    // }
  },
  argTypes: {
    variant: {
      options: ['default', 'primary-button', 'primary-button-small', 'secondary-button', 'secondary-button-small'],
      control: {
        type: 'select'
      }
    }
  }
};

const Template = (args, { argTypes }) => ({
  props: Object.keys(argTypes),
  components: { LobLink },
  setup: () => ({ args }),
  template: '<lob-link v-bind="args" label="link" to="/internal" />'
});

export const Primary = Template.bind({});
// Primary.args = {
//   label: 'link',
//   to: 'https://dashboard.lob.com'
// };
