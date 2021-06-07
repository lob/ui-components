import Textarea from './Textarea.vue';
import mdx from './Textarea.mdx';

export default {
  title: 'Components/Textarea',
  component: Textarea,
  parameters: {
    docs: {
      page: mdx
    }
  },
  argTypes: {
    'v-model': {
      control: {
        type: null
      }
    }
  }
};
const value = 'initial value';
const Template = (args, { argTypes }) => ({
  props: Object.keys(argTypes),
  components: {  Textarea },
  template: '<Textarea v-bind="$props"></Textarea>'
});

export const Primary = Template.bind({});
Primary.args = {
  'v-model': value,
  value,
  label: 'Interesting text area'
};

