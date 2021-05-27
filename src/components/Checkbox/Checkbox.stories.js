import Checkbox from './Checkbox.vue';
import mdx from './Checkbox.mdx';

export default {
  title: 'Components/Checkbox',
  component: Checkbox,
  parameters: {
    docs: {
      page: mdx
    }
  }
};

let checkboxVModel = false; //eslint-disable-line

const PrimaryTemplate = (args, { argTypes }) => ({
  props: Object.keys(argTypes),
  components: { Checkbox },
  data: () => ({ checkboxVModel }),
  template: `
    <checkbox 
      label="First"
      name="first"
      v-model="checkboxVModel" 
      v-bind="$props"
    ></checkbox>
    `
});

export const Primary = PrimaryTemplate.bind({});
Primary.args = {
  label: 'Custom checkbox label',
  name: 'myInput'
};

let arrayVModel = []; //eslint-disable-line

const SecondaryTemplate = (args, { argTypes }) => ({
  props: Object.keys(argTypes),
  components: { Checkbox },
  data: () => ({ arrayVModel }),
  template: `
  <div>
    <checkbox
      label="Chocolate"
      v-model="arrayVModel"
      name="chocolate"
      value="chocolate"
      v-bind="$props"
    />
    <checkbox
      label="Vanilla"
      v-model="arrayVModel"
      name="vanilla"
      value="vanilla"
      v-bind="$props"
    />
    <checkbox
      label="Strawberry"
      v-model="arrayVModel"
      name="strawberry"
      value="strawberry"
      v-bind="$props"
    />
  </div>
    `
});

export const Secondary = SecondaryTemplate.bind({});
Secondary.args = {
  sameLine: true
};