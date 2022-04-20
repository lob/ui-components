import MegaButton from './MegaButton.vue';
import mdx from './MegaButton.mdx';

export default {
  title: 'Components/Mega Button',
  component: MegaButton,
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
      options: ['primary', 'none'],
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
  components: { MegaButton },
  setup: () => ({ args }),
  template: '<mega-button v-bind="args" v-slot>{{ args.content }}</lob-button>'
});

export const Primary = Template.bind({});
Primary.args = {
  title: 'Cat dispenser',
  text: 'Click here to receive catte'
};
