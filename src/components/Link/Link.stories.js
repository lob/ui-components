import routeDecorator, {
  routeTemplate
} from '../../../.storybook/routeDecorator';

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
    content: {
      control: {
        type: 'text'
      },
      description: 'Link display name',
      table: {
        defaultValue: 'This is a link',
        type: {
          summary: 'html or component'
        }
      }
    },
    variant: {
      options: [
        'link',
        'primary-button',
        'secondary-button',
        'quiet-button',
        'ghost-button',
        'danger-button',
        'danger-secondary-button'
      ],
      control: {
        type: 'select'
      }
    },
    size: {
      options: ['small', 'base', 'large', 'xl'],
      control: {
        type: 'select'
      }
    },
    underline: {
      control: {
        type: 'boolean'
      }
    },
    bold: {
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
  template:
    '<lob-link v-bind="args" to="/internal">{{ args.content }}</lob-link>'
});

export const DefaultLink = Template.bind({});
DefaultLink.args = {
  content: 'I am a link'
};
export const StyledAsPrimaryButton = Template.bind({});
StyledAsPrimaryButton.args = {
  variant: 'primary-button',
  content: 'I look like a button'
};

export const StyledAsSecondaryButton = Template.bind({});
StyledAsSecondaryButton.args = {
  variant: 'secondary-button',
  content: 'I look like a button'
};
