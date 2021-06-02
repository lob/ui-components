import SwitchGroup from './SwitchGroup.vue';
import SwitchItem from './SwitchItem.vue';
import mdx from './SwitchGroup.mdx';

export default {
  title: 'Components/SwitchGroup',
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
  template: `
    <switch-group v-bind="$props">
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
