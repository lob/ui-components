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

const checkboxVModel = false;

const PrimaryTemplate = (args, { argTypes }) => ({
  props: Object.keys(argTypes),
  components: { Checkbox },
  setup: () => ({ args }),
  data: () => ({ checkboxVModel }),
  template: `
    <checkbox 
      label="Agree to Terms and Conditions"
      name="terms"
      v-bind="args"
      v-model="checkboxVModel" 
    ></checkbox>
    `
});

export const Primary = PrimaryTemplate.bind({});
Primary.args = {
  label: 'Agree to Terms and Conditions',
  name: 'terms'
};

const arrayVModel = [];

const SecondaryTemplate = (args, { argTypes }) => ({
  props: Object.keys(argTypes),
  components: { Checkbox },
  setup: () => ({ args }),
  data: () => ({ arrayVModel }),
  template: `
  <div>
    <checkbox
      label="Chocolate"
      v-model="arrayVModel"
      name="chocolate"
      value="chocolate"
      :disabled="args.disabled"
      :required="args.required"
      :error="args.error"
      :sameLine="args.sameLine"
    />
    <checkbox
      label="Vanilla"
      v-model="arrayVModel"
      name="vanilla"
      value="vanilla"
      :disabled="args.disabled"
      :required="args.required"
      :error="args.error"
      :sameLine="args.sameLine"
    />
    <checkbox
      label="Strawberry"
      v-model="arrayVModel"
      name="strawberry"
      value="strawberry"
      :disabled="args.disabled"
      :required="args.required"
      :error="args.error"
      :sameLine="args.sameLine"
    />
  </div>
    `
});

export const Secondary = SecondaryTemplate.bind({});
Secondary.args = {
  sameLine: true
};
