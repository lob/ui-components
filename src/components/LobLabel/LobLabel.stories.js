import LobLabel from './LobLabel.vue';
import mdx from './LobLabel.mdx';

import { Close } from '@/components/Icons';

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

const WithIconTemplate = (args, { argTypes }) => ({
  props: Object.keys(argTypes),
  components: { LobLabel, Close },
  setup: () => ({ args }),
  template: `
    <lob-label v-bind="args">
      <template v-slot:iconRight>
        <close class="w-5 h-5" />
      </template>
    </lob-label>
    <input class="border rounded p-2 text-gray-500" />
  `
});

export const WithIcon = WithIconTemplate.bind({});
WithIcon.args = {
  label: 'Name',
  labelFor: 'Name',
  required: true
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
