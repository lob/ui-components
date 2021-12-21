import RadioButton from './RadioButton.vue';
import mdx from './RadioButton.mdx';

export default {
  title: 'Components/Radio Button',
  component: RadioButton,
  parameters: {
    docs: {
      page: mdx
    }
  }
};

const Template = (args, { argTypes }) => ({
  props: Object.keys(argTypes),
  components: { RadioButton },
  setup: () => ({ args }),
  template: '<radio-button v-bind="args" />'
});

export const Primary = Template.bind({});
Primary.args = {
  name: 'postcard-size',
  id: '4x6',
  label: '4x6',
  value: '4x6'
};
