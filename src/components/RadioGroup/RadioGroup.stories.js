import RadioGroup from "./RadioGroup.vue";
import RadioButton from "../RadioButton/RadioButton.vue";
import mdx from "./RadioGroup.mdx";

export default {
  title: "Components/Radio Group",
  component: RadioGroup,
  subcomponents: { RadioButton },
  parameters: {
    docs: {
      page: mdx,
    },
  },
};

const radioModel = "4x6";

const Template = (args, { argTypes }) => ({
  props: Object.keys(argTypes),
  components: { RadioGroup, RadioButton },
  data: () => ({ radioModel }),
  setup: () => ({ args }),
  template: `
    <radio-group v-bind="args">
      <radio-button
        name="postcard-size"
        label="4x6"
        value="4x6"
        v-model="radioModel"
      />
      <radio-button
        name="postcard-size"
        label="5x7"
        value="5x7"
        v-model="radioModel"
      />
      <radio-button
        name="postcard-size"
        label="Really Big"
        value="big"
        v-model="radioModel"
      />
    </radio-group>
  `,
});

export const Primary = Template.bind({});
Primary.args = {
  legend: "Postcard Size",
  separateLines: false,
};
