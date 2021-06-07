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
      defaultValue: 'Sign up',
      description: 'Content to display inside of the button',
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
  components: { LobButton },
  setup: () => ({ args }),
  template: '<lob-button v-bind="args" v-slot>{{ args.content }}</lob-button>'
});

export const Primary = Template.bind({});
Primary.args = {
  content: 'Sign up'
};
