// @ts-expect-error No types
import Card from './Card.vue';
import mdx from './Card.mdx';
import { IconName } from '@/components/Icon';
import { StoryFn } from '@storybook/vue3';

export default {
  title: 'Components/Card',
  component: Card,
  parameters: {
    docs: {
      page: mdx
    }
  },
  argTypes: {
    icon: {
      options: Object.values(IconName),
      control: {
        type: 'select'
      },
      table: {
        type: {
          summary: Object.values(IconName).join(' | ')
        }
      }
    },

    // SLOTS
    title: {
      control: {
        type: 'text'
      }
    },
    default: {
      control: {
        type: 'text'
      }
    }
  }
};

const Template: StoryFn = (args, { argTypes }) => ({
  props: Object.keys(argTypes),
  components: { Card },
  setup: () => ({ args }),
  template: '<Card v-bind="args" />'
});

export const Primary = Template.bind({});
Primary.args = {
  icon: 'Envelope',
  title: 'Envelopes',
  content: 'There are envelopes within this system'
};

export const NoIcon = Template.bind({});
NoIcon.args = {
  title: 'Envelopes',
  content: 'There are envelopes within this system'
};

export const OnlyContent = Template.bind({});
OnlyContent.args = {
  content: 'There are envelopes within this system'
};

export const Link = Template.bind({});
Link.args = {
  icon: 'Envelope',
  title: 'Envelopes',
  content: 'There are envelopes within this system',
  to: 'https://lob.com',
  target: '_blank'
};
