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
const initialValue = 'initial value';
const Template = (args, { argTypes }) => ({
  props: Object.keys(argTypes),
  components: {  Textarea },
  data: () => ({ initialValue }),
  setup: () => ({ args }),
  template: '<Textarea v-bind="args" v-model="initialValue"></Textarea>'
});

export const Primary = Template.bind({});
Primary.args = {
  label: 'Interesting text area'
};

