import SwitchGroup from './SwitchGroup.vue';
import SwitchItem from './SwitchItem.vue';
import { Earth, TableIcon } from '@/components/Icons';
import mdx from './SwitchGroup.mdx';

export default {
  title: 'Components/Switch Group',
  component: SwitchGroup,
  subcomponents: { SwitchItem },
  parameters: {
    docs: {
      page: mdx
    }
  }
};

const switchModel = 'test';

const Template = (args, { argTypes }) => ({
  props: Object.keys(argTypes),
  components: { SwitchGroup, SwitchItem },
  data: () => ({ switchModel }),
  setup: () => ({ args }),
  template: `
    <switch-group v-bind="args">
      <switch-item name='mode' label="Test" value='test' v-model="switchModel" />
      <switch-item name='mode' label="Live" value='live' v-model="switchModel" />
    </switch-group>
  `
});

export const Primary = Template.bind({});
Primary.args = {
  legend: 'Environment mode',
  srOnlyLegend: true
};

const withIconsModel = 'map';

const WithIconsTemplate = (args, { argTypes }) => ({
  props: Object.keys(argTypes),
  components: { SwitchGroup, SwitchItem, Earth, TableIcon },
  data: () => ({ withIconsModel }),
  setup: () => ({ args }),
  template: `
    <switch-group v-bind="args">
      <switch-item name='chart' label="Map view" value='map' v-model="withIconsModel" sr-only-label><earth class="w-6 h-6" /></switch-item>
      <switch-item name='chart' label="List view" value='list' v-model="withIconsModel" sr-only-label><table-icon class="w-6 h-6" /></switch-item>
    </switch-group>
  `
});

export const WithIcons = WithIconsTemplate.bind({});
WithIcons.args = {
  legend: 'Chart type',
  srOnlyLegend: true
};
