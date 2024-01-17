import ProgressBar from "./ProgressBar.vue";
import mdx from "./ProgressBar.mdx";

export default {
  title: "Components/ProgressBar",
  component: ProgressBar,
  parameters: {
    docs: {
      page: mdx,
    },
  },
};

const Template = (args, { argTypes }) => ({
  props: Object.keys(argTypes),
  components: { ProgressBar },
  setup: () => ({ args }),
  template: '<ProgressBar v-bind="args" />',
});

export const Indeterminate = Template.bind({});

export const WithPercentage = Template.bind({});
WithPercentage.args = {
  percentage: 25,
};
