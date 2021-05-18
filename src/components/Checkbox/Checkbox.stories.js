import Checkbox from './Checkbox.vue';
import mdx from './Checkbox.mdx';

export default {
  title: 'Components/Checkbox',
  component: Checkbox,
  parameters: {
    docs: {
      page: mdx
    }
  },
};

let checkboxVModel = false;

const Template = (args, {argTypes}) => ({
  props: Object.keys(argTypes),
  components: { Checkbox },
  data: () => ({ checkboxVModel }),
  template: `
    <checkbox 
      v-bind="$props" 
      v-model="checkboxVModel"
    ></checkbox>`,
});

export const Primary = Template.bind({});
Primary.args = {
  label: 'Custom checkbox label'
}
