import Badge from "./Badge.vue";
import mdx from "./Badge.mdx";

export default {
  title: "Components/Badge",
  component: Badge,
  parameters: {
    docs: {
      page: mdx,
    },
  },
  argTypes: {
    content: {
      control: {
        type: "text",
      },
      description: "Content to display inside of the card",
      table: {
        defaultValue: "I am a card.",
        type: {
          summary: "html or component",
        },
      },
    },
    variant: {
      options: [
        "default",
        "secondary",
        "info",
        "success",
        "warning",
        "error",
        "gradient-primary",
        "gradient-secondary",
      ],
      control: {
        type: "select",
      },
    },
    size: {
      options: ["default", "small"],
      control: {
        type: "select",
      },
    },
  },
};

const Template = (args, { argTypes }) => ({
  props: Object.keys(argTypes),
  components: { Badge },
  setup: () => ({ args }),
  template: '<badge v-slot v-bind="args">{{ args.content }}</badge>',
});

export const Primary = Template.bind({});
Primary.args = {
  content: "Badge text.",
};
