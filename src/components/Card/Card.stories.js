import Card from './Card.vue';
import mdx from './Card.mdx';
import { IconName } from '@/components/Icon';

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
    onClick: {
      description: 'Utilize the `@emit`, this is to detect clickability'
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

const Template = (args, { argTypes }) => ({
  props: Object.keys(argTypes),
  components: { Card },
  setup: () => ({ args }),
  template:
    '<Card><template #title>{{ args.title }}</template><template #default>{{ args.content }}</template></Card>'
});

export const Primary = Template.bind({});
Primary.args = {
  title: 'Envelopes',
  content: 'There are envelopes within this system'
};
