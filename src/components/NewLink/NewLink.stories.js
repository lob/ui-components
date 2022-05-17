import routeDecorator, { routeTemplate } from '../../../.storybook/routeDecorator';

import NewLink from './NewLink.vue';
import mdx from './NewLink.mdx';

export default {
  title: 'Components/NewLink',
  component: NewLink,
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
      options: ['link', 'primary-button', 'secondary-button'],
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
  components: { NewLink },
  setup: () => ({ args }),
  template: '<new-link v-bind="args" to="/internal">Click me</new-link>'
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
