import Tooltip from "./Tooltip.vue";
import mdx from "./Tooltip.mdx";

export default {
  title: "Components/Tooltip",
  component: Tooltip,
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
      defaultValue: "I am a tooltip.",
      description: "Content to display inside of the tooltip",
      table: {
        type: {
          summary: "html or component",
        },
      },
    },
    trigger: {
      control: {
        type: "text",
      },
      defaultValue: "Hover me.",
      description: "Content to trigger display of tooltip on hover",
      table: {
        type: {
          summary: "html or component",
        },
      },
    },
    position: {
      options: ["top", "bottom", "left", "right"],
      control: {
        type: "select",
      },
    },
    arrowPlacement: {
      options: ["center", "left", "right"],
      control: {
        type: "select",
      },
    },
  },
};

const Template = (args, { argTypes }) => ({
  props: Object.keys(argTypes),
  components: { Tooltip },
  setup: () => ({ args }),
  template: `
  <tooltip v-bind="args">
    <template v-slot:content>
      {{ args.content }}
    </template>
    <template v-slot:trigger>
      {{ args.trigger }}
    </template>
  </tooltip>
  `,
});

export const Primary = Template.bind({});
Primary.args = {
  content: "I am a tooltip.",
  trigger: "Hover me",
};
