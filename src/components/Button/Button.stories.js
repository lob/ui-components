import LobButton from './Button.vue';
import mdx from './Button.mdx';

export default {
  title: 'Components/Button',
  component: LobButton,
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
      description: 'Content to display inside of the button',
      table: {
        defaultValue: 'Sign up',
        type: {
          summary: 'html or component'
        }
      }
    },
    variant: {
      options: ['primary', 'secondary', 'tertiary', 'alert', 'success', 'error', 'link', 'none'],
      control: {
        type: 'select'
      }
    },
    size: {
      options: ['default', 'small', 'large'],
      control: {
        type: 'select'
      }
    }
  }
};

const Template = (args, { argTypes }) => ({
  props: Object.keys(argTypes),
  components: { LobButton },
  setup: () => ({ args }),
  template: '<lob-button v-bind="args" v-slot>{{ args.content }}</lob-button>'
});

export const Primary = Template.bind({});
Primary.args = {
  content: 'Sign up'
};
