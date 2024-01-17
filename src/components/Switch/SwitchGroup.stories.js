import SwitchGroup from "./SwitchGroup.vue";
import SwitchItem from "./SwitchItem.vue";
import { Globe, TableLayout } from "@/components/Icons";
import mdx from "./SwitchGroup.mdx";

export default {
  title: "Components/Switch Group",
  component: SwitchGroup,
  subcomponents: { SwitchItem },
  parameters: {
    docs: {
      page: mdx,
    },
  },
};

const switchModel = "test";

const Template = (args, { argTypes }) => ({
  props: Object.keys(argTypes),
  components: { SwitchGroup, SwitchItem },
  data: () => ({ switchModel }),
  setup: () => ({ args }),
  template: `
    <switch-group v-bind="args">
      <switch-item name="mode" label="Test" value="test" v-model="switchModel" />
      <switch-item name="mode" label="Live" value="live" v-model="switchModel" />
    </switch-group>
  `,
});

export const Primary = Template.bind({});
Primary.args = {
  legend: "Environment mode",
  srOnlyLegend: true,
};

const selectionModel = "selection1";

const TemplateWithThreeItems = (args, { argTypes }) => ({
  props: Object.keys(argTypes),
  components: { SwitchGroup, SwitchItem },
  data: () => ({ switchModel: selectionModel }),
  setup: () => ({ args }),
  template: `
    <switch-group v-bind="args">
      <switch-item name="mode" label="Selection 1" value="selection1" v-model="switchModel" />
      <switch-item name="mode" label="Selection 2" value="selection2" v-model="switchModel" />
      <switch-item name="mode" label="Selection 3" value="selection3" v-model="switchModel" />
    </switch-group>
  `,
});

export const WithMoreOptions = TemplateWithThreeItems.bind({});
WithMoreOptions.args = {
  legend: "Mode selection",
  srOnlyLegend: true,
};

const WithDisabledTemplate = (args, { argTypes }) => ({
  props: Object.keys(argTypes),
  components: { SwitchGroup, SwitchItem },
  data: () => ({ switchModel }),
  setup: () => ({ args }),
  template: `
    <switch-group v-bind="args">
      <switch-item name="mode" label="Selection 1" value="selection1" v-model="switchModel" />
      <switch-item name="mode" label="Selection 2" value="selection2" v-model="switchModel" disabled />
    </switch-group>
  `,
});

export const WithDisabled = WithDisabledTemplate.bind({});
WithDisabled.args = {
  legend: "Environment mode",
  srOnlyLegend: true,
};

const withIconsModel = "map";

const WithIconsTemplate = (args, { argTypes }) => ({
  props: Object.keys(argTypes),
  components: { SwitchGroup, SwitchItem, Globe, TableLayout },
  data: () => ({ withIconsModel }),
  setup: () => ({ args }),
  template: `
    <switch-group v-bind="args">
      <switch-item 
        v-model="withIconsModel" 
        name="chart" 
        label="Map view" 
        value="map" 
        sr-only-label
      >
        <Globe size="l" />
      </switch-item>
      <switch-item 
        v-model="withIconsModel" 
        name="chart" 
        label="List view" 
        value="list" 
        sr-only-label
      >
        <TableLayout size="l" />
      </switch-item>
    </switch-group>
  `,
});

export const WithIcons = WithIconsTemplate.bind({});
WithIcons.args = {
  legend: "Chart type",
  srOnlyLegend: true,
};
