import RadioButtonLarge from './RadioButtonLarge.vue';
import mdx from './RadioButtonLarge.mdx';

export default {
  title: 'Components/Radio Button Large',
  component: RadioButtonLarge,
  parameters: {
    docs: {
      page: mdx
    }
  }
};

const vModel = '';

const Template = (args, { argTypes }) => ({
  props: Object.keys(argTypes),
  components: { RadioButtonLarge },
  data: () => ({ vModel }),
  setup: () => ({ args }),
  template: '<radio-button-large v-bind="args" v-model="vModel" />'
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
  components: { RadioButtonLarge },
  data: () => ({ vModel }),
  setup: () => ({ args }),
  template: '<radio-button-large v-bind="args" v-model="vModel" />'
});

export const WithHelperText = WithHelperTextTemplate.bind({});
WithHelperText.args = {
  name: 'postcard-size',
  id: '4x6',
  label: '4x6',
  value: '4x6',
  helperText: 'Standard postcard size'
};

const WithRevealTextTemplate = (args, { argTypes }) => ({
  props: Object.keys(argTypes),
  components: { RadioButtonLarge },
  data: () => ({ vModel }),
  setup: () => ({ args }),
  template: '<radio-button-large v-bind="args" v-model="vModel" />'
});

export const WithRevealText = WithRevealTextTemplate.bind({});
WithRevealText.args = {
  name: 'postcard-size',
  id: '4x6',
  label: '4x6',
  value: '4x6',
  revealText: 'Standard postcard size'
};

const WithFullWidthTemplate = (args, { argTypes }) => ({
  props: Object.keys(argTypes),
  components: { RadioButtonLarge },
  data: () => ({ vModel }),
  setup: () => ({ args }),
  template: '<div style="width: 800px"><radio-button-large v-bind="args" v-model="vModel" /></div>'
});

export const WithFullWidth = WithFullWidthTemplate.bind({});
WithFullWidth.args = {
  name: 'postcard-size',
  id: '4x6',
  label: '4x6',
  value: '4x6',
  helperText: 'Standard postcard size',
  fullWidth: true
};
