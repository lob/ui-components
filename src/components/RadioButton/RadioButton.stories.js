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

const vModel = '';

const Template = (args, { argTypes }) => ({
  props: Object.keys(argTypes),
  components: { RadioButton },
  data: () => ({ vModel }),
  setup: () => ({ args }),
  template: '<radio-button v-bind="args" v-model="vModel"/>'
});

export const Primary = Template.bind({});
Primary.args = {
  name: 'postcard-size',
  id: '4x6',
  label: '4x6',
  value: '4x6'
};

const WithHelperTextTemplate = (args, { argTypes }) => ({
  props: Object.keys(argTypes),
  components: { RadioButton },
  data: () => ({ vModel }),
  setup: () => ({ args }),
  template: '<div style="width:200px"><radio-button v-bind="args" v-model="vModel" /></div>'
});

export const WithHelperText = WithHelperTextTemplate.bind({});
WithHelperText.args = {
  name: 'postcard-size',
  id: '4x6',
  label: '4x6',
  value: '4x6',
  helperText: 'Standard Postcard Size and a second line of text'
};
