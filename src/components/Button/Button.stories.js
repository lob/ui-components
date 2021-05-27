import Button from './Button.vue';
import mdx from './Button.mdx';

export default {
  title: 'Components/Button',
  component: Button,
  parameters: {
    docs: {
      page: mdx
    }
  },
  argTypes: {
    text: 'stuff'
  }
};

const Template = (args, { argTypes }) => ({
  props: Object.keys(argTypes),
  components: { Button },
  template: '<div width="500px;"><Button v-bind="$props" /></div>'
});

export const Primary = Template.bind({});
Primary.args = {
  text: 'This is a button'
};
