import LobLabel from "./Label.vue";
import mdx from "./Label.mdx";

import { Info } from "@/components/Icons";
import Tooltip from "@/components/Tooltip/Tooltip.vue";

export default {
  title: "Components/Label",
  component: LobLabel,
  parameters: {
    docs: {
      page: mdx,
    },
  },
  argTypes: {
    label: {
      control: {
        type: "text",
      },
    },
    tooltipContent: {
      control: {
        type: "text",
      },
    },
    tooltipPosition: {
      control: {
        options: ["leading", "trailing"],
        type: "select",
      },
    },
  },
};

const PrimaryTemplate = (args, { argTypes }) => ({
  props: Object.keys(argTypes),
  components: { LobLabel },
  setup: () => ({ args }),
  template: '<lob-label v-bind="args"/>',
});

export const Primary = PrimaryTemplate.bind({});
Primary.args = {
  label: "Name",
  labelFor: "Name",
};

const WithInputTemplate = (args, { argTypes }) => ({
  props: Object.keys(argTypes),
  components: { LobLabel },
  setup: () => ({ args }),
  template: `
    <lob-label v-bind="args"/>
    <input class="border rounded p-2 text-gray-500" />
  `,
});

export const WithInput = WithInputTemplate.bind({});
WithInput.args = {
  label: "Name",
  labelFor: "Name",
};

const RequiredFieldTemplate = (args, { argTypes }) => ({
  props: Object.keys(argTypes),
  components: { LobLabel },
  setup: () => ({ args }),
  template: `
    <lob-label v-bind="args"/>
    <input class="border rounded p-2 text-gray-500" />
  `,
});

export const RequiredField = RequiredFieldTemplate.bind({});
RequiredField.args = {
  label: "Name",
  labelFor: "Name",
  required: true,
};

const WithTooltipTemplate = (args, { argTypes }) => ({
  props: Object.keys(argTypes),
  components: { LobLabel, Info, Tooltip },
  setup: () => ({ args }),
  template: `
    <lob-label v-bind="args">
      <template v-slot:tooltip>
        <Tooltip position="bottom">
          <template #trigger>
            <Info class="w-5 h-5" />
          </template>
          <template #content>
            {{ args.tooltipContent }}
          </template>
        </Tooltip>
      </template>
    </lob-label>
    <input class="border rounded p-2 text-gray-500" />
  `,
});

export const WithTooltipLeading = WithTooltipTemplate.bind({});
WithTooltipLeading.args = {
  label: "Name",
  labelFor: "Name",
  tooltipContent: "Tooltip Content",
};

export const WithTooltipTrailing = WithTooltipTemplate.bind({});
WithTooltipTrailing.args = {
  label: "Name",
  labelFor: "Name",
  tooltipContent:
    "Tooltip Content to include some more information about this input field",
  tooltipPosition: "trailing",
};
