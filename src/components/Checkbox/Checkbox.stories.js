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
let checkboxVModel2 = true;
let arrayVModel = ['chocolate'];

const Template = (args, {argTypes}) => ({
  props: Object.keys(argTypes),
  components: { Checkbox },
  data: () => ({ checkboxVModel, checkboxVModel2, arrayVModel }),
  template: `
  <div>
    Simple checkboxes: {{checkboxVModel}} {{checkboxVModel2}}<br/>
    <checkbox 
      label="First"
      v-model="checkboxVModel"
      name="first"
    ></checkbox>

    <checkbox 
      label="Second"
      v-model="checkboxVModel2"
      name="second"
    ></checkbox>

    <br/><br/>

    Grouped Checkboxes: {{arrayVModel}}<br/>
    <checkbox 
      label="Chocolate"
      v-model="arrayVModel"
      name="chocolate"
      value="chocolate"
      sameLine
    />
    <checkbox 
      label="Vanilla"
      v-model="arrayVModel"
      name="vanilla"
      value="vanilla"
      sameLine
    />
    <checkbox 
      label="Strawberry"
      v-model="arrayVModel"
      name="strawberry"
      value="strawberry"
      sameLine
    />
  </div>
    `,
});

export const Primary = Template.bind({});
Primary.args = {
  label: 'Custom checkbox label',
  name: 'myInput'
}
