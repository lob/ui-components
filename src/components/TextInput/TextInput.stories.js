import TextInput from './TextInput.vue';
// import mdx from './TextInput.mdx';

export default {
  title: 'Components/Text Input',
  component: TextInput,
  parameters: {
  // docs: {
  //   page: mdx
  // }
  }
};

const Template = (args, { argTypes }) => ({
  props: Object.keys(argTypes),
  components: { TextInput },
  setup: () => ({ args }),
  template: '<text-input v-bind="args" />'
});

export const Primary = Template.bind({});
Primary.args = {
  id: 'one',
  label: 'One',
  placeholder: 'One',
  withCopyBtn: true,
  readonly: true,
  value: 'something'
};
