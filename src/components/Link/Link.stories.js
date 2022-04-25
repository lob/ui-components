import routeDecorator, { routeTemplate } from '../../../.storybook/routeDecorator';

import LobLink from './Link.vue';
import mdx from './Link.mdx';

export default {
  title: 'Components/Link',
  component: LobLink,
  decorators: [
    routeDecorator('/', [
      {
        path: '/internal',
        name: 'InternalLink',
        component: {
          template: routeTemplate('internal')
        }
      }
    ])
  ],
  parameters: {
    docs: {
      page: mdx
    }
  },
  argTypes: {
    variant: {
      options: ['default', 'primary-button', 'secondary-button', 'tertiary-button', 'alert-button'],
      control: {
        type: 'select'
      }
    },
    color: {
      options: ['default', 'info', 'warning', 'success', 'error'],
      control: {
        type: 'select'
      }
    },
    size: {
      options: ['default', 'small'],
      control: {
        type: 'select'
      }
    },
    underline: {
      options: [true, false],
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
  template: '<lob-link v-bind="args" to="/internal">Click me</lob-link>'
});

export const Primary = Template.bind({});
