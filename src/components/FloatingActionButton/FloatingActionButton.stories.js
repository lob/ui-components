import FloatingActionButton from './FloatingActionButton.vue';
import mdx from './FloatingActionButton.mdx';

export default {
  title: 'Components/FloatingActionButton',
  component: FloatingActionButton,
  parameters: {
    docs: {
      page: mdx
    }
  },
  argTypes: {
    labelText: {
      control: {
        type: 'text'
      },
      description: 'Label text to display inside of the FloatingActionButton',
      table: {
        defaultValue: 'I am a FloatingActionButton.',
        type: {
          summary: 'string'
        }
      }
    },
    buttonText: {
      control: {
        type: 'text'
      },
      description: 'Content to display inside of the FloatingActionButton',
      table: {
        defaultValue: 'Submit',
        type: {
          summary: 'string'
        }
      }
    },
    buttonVariant: {
      control: {
        type: 'text'
      },
      description:
        'Variant to make the button within the FloatingActionButton. Any value from the `Button` component is valid',
      table: {
        defaultValue: 'primary',
        type: {
          summary: 'string'
        }
      }
    }
  }
};

const Template = (args, { argTypes }) => ({
  props: Object.keys(argTypes),
  components: { FloatingActionButton },
  setup: () => ({ args }),
  template: `
      <div style="height: 100px; width: 100%;">
        <floating-action-button v-bind="args"></floating-action-button>
      </div>
`
});

export const Primary = Template.bind({});
Primary.args = {
  labelText: 'I am a FloatingActionButton.',
  buttonText: 'Submit',
  buttonVariant: 'primary'
};
