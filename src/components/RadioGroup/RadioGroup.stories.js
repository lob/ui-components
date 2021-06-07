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

const Template = (args, { argTypes }) => ({
  props: Object.keys(argTypes),
  components: { RadioGroup, RadioButton },
  setup: () => ({ args }),
  template: `
    <radio-group v-bind="args">
      <radio-button
        name="postcard-size"
        label="4x6"
        value="4x6"
      />
      <radio-button
        name="postcard-size"
        label="5x7"
        value="5x7"
      />
      <radio-button
        name="postcard-size"
        label="Really Big"
        value="big"
      />
    </radio-group>
  `,
});

export const Primary = Template.bind({});
Primary.args = {
  legend: "Postcard Size",
  separateLines: false,
};
