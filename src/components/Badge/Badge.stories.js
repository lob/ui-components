import Badge from './Badge.vue';
import mdx from './Badge.mdx';

export default {
  title: 'Components/Badge',
  component: Badge,
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
      defaultValue: 'I am a card.',
      description: 'Content to display inside of the card',
      table: {
        type: {
          summary: 'html or component'
        }
      }
    }
  }
};

const Template = (args, { argTypes }) => ({
  props: Object.keys(argTypes),
  components: {  Badge },
  setup: () => ({ args }),
  template: '<badge v-slot v-bind="args">{{ args.content }}</badge>'
});

export const Primary = Template.bind({});
Primary.args = {
  content: 'Badge text.'
};
