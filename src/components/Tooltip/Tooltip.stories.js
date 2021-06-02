import Tooltip from './Tooltip.vue';
// import mdx from './Tooltip.mdx';

export default {
  title: 'Components/Tooltip',
  component: Tooltip,
  // parameters: {
  //   docs: {
  //     page: mdx
  //   }
  // },
  argTypes: {
    content: {
      control: {
        type: 'text'
      },
      defaultValue: 'I am a tooltip.',
      description: 'Content to display inside of the tooltip',
      table: {
        type: {
          summary: 'html or component'
        }
      }
    },
    position: {
      control: {
        type: 'select',
        options: ['top', 'bottom', 'left', 'right']
      }
    },
    arrowPlacement: {
      control: {
        type: 'select',
        options: ['', 'left', 'right']
      }
    }
  }
};

const Template = (args, { argTypes }) => ({
  props: Object.keys(argTypes),
  components: { Tooltip },
  template: '<tooltip v-slot v-bind="$props">{{ content }}</tooltip>'
});

export const Primary = Template.bind({});
Primary.args = {
  content: 'I am a tooltip.',
  visible: true
};
