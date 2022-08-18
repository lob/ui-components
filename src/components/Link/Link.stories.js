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
      options: ['link', 'primary-button', 'secondary-button', 'subtle-button'],
      control: {
        type: 'select'
      }
    },
    small: {
      control: {
        type: 'boolean'
      }
    },
    underline: {
      control: {
        type: 'boolean'
      }
    },
    withChevron: {
      control: {
        type: 'boolean'
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

export const RegularLink = Template.bind({});

export const StyledAsPrimaryButton = Template.bind({});
StyledAsPrimaryButton.args = {
  variant: 'primary-button'
};

export const StyledAsSecondaryButton = Template.bind({});
StyledAsSecondaryButton.args = {
  variant: 'secondary-button'
};

export const StyledAsSubtleButton = Template.bind({});
StyledAsSubtleButton.args = {
  variant: 'subtle-button'
};
