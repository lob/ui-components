import LobLabel from './LobLabel.vue';
import mdx from './LobLabel.mdx';

import { Info } from '@/components/Icons';
import Tooltip from '@/components/Tooltip/Tooltip.vue';

export default {
  title: 'Components/Label',
  component: LobLabel,
  parameters: {
    docs: {
      page: mdx
    }
  },
  argTypes: {
    label: {
      control: {
        type: 'text'
      }
    }
  }
};

const WithTooltipTemplate = (args, { argTypes }) => ({
  props: Object.keys(argTypes),
  components: { LobLabel, Info, Tooltip },
  setup: () => ({ args }),
  template: `
    <lob-label v-bind="args">
      <template v-slot:tooltip>
        <Tooltip position="left">
          <template #trigger>
            <Info class="w-5 h-5" />
          </template>
          <template #content>
            Cat
          </template>
        </Tooltip>
      </template>
    </lob-label>
    <input class="border rounded p-2 text-gray-500" />
  `
});

export const WithTooltip = WithTooltipTemplate.bind({});
WithTooltip.args = {
  label: 'Name',
  labelFor: 'Name',
  required: true,
  tooltipContent: 'Tooltip Content'
};

const WithInputTemplate = (args, { argTypes }) => ({
  props: Object.keys(argTypes),
  components: { LobLabel },
  setup: () => ({ args }),
  template: `
    <lob-label v-bind="args"/>
    <input class="border rounded p-2 text-gray-500" />
  `
});

export const WithInput = WithInputTemplate.bind({});
WithInput.args = {
  label: 'Name',
  labelFor: 'Name',
  required: true
};

const WithNestedInputTemplate = (args, { argTypes }) => ({
  props: Object.keys(argTypes),
  components: { LobLabel },
  setup: () => ({ args }),
  template: `
    <lob-label v-bind="args">
    <input class="border rounded p-2 text-gray-500" />
    </lob-label>
  `
});

export const WithNestedInput = WithNestedInputTemplate.bind({});
WithNestedInput.args = {
  label: 'Name',
  labelFor: 'Name',
  required: true
};
