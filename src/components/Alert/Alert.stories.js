import Alert from "./Alert.vue";
import mdx from "./Alert.mdx";

export default {
  title: "Components/Alert",
  component: Alert,
  parameters: {
    layout: "padded",
    docs: {
      page: mdx,
    },
  },
  argTypes: {
    content: {
      control: {
        type: "text",
      },
      defaultValue: "I am a card.",
      description: "Content to display inside of the card",
      table: {
        type: {
          summary: "html or component",
        },
      },
    },
  },
};

const Template = (args, { argTypes }) => ({
  props: Object.keys(argTypes),
  components: { Alert },
  setup: () => ({ args }),
  template: '<alert v-slot v-bind="args">{{ args.content }}</alert>',
});

export const Primary = Template.bind({});
Primary.args = {
  content:
    "You are in LIVE mode, all verifications will be charged according to your chosen plan.",
};
