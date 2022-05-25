import RadioButtonLarge from './RadioButtonLarge.vue';
import mdx from './RadioButtonLarge.mdx';

export default {
  title: 'Components/Radio Button Large',
  component: RadioButtonLarge,
  parameters: {
    docs: {
      page: mdx
    }
  },
  argTypes: {
    size: {
      options: ['default', 'large'],
      control: {
        type: 'select'
      }
    }
  }
};

const Template = (args, { argTypes }) => ({
  props: Object.keys(argTypes),
  components: { RadioButtonLarge },
  setup: () => ({ args }),
  template: '<radio-button-large v-bind="args" />'
});

export const Primary = Template.bind({});
Primary.args = {
  name: 'postcard-size',
  id: '4x6',
  label: '4x6',
  value: '4x6'
};
