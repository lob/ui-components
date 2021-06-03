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
  template: '<text-input v-bind="$props" />'
});

export const Primary = Template.bind({});
Primary.args = {
  id: 'one',
  label: 'One',
  placeholder: 'One'
};
