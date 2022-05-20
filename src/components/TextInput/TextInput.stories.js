import TextInput from './TextInput.vue';
import mdx from './TextInput.mdx';

import LobLabel from '@/components/LobLabel/LobLabel.vue';
import Tooltip from '@/components/Tooltip/Tooltip.vue';
import { Close, Search, Info } from '@/components/Icons';

export default {
  title: 'Components/Text Input',
  component: TextInput,
  parameters: {
    docs: {
      page: mdx
    }
  },
  argTypes: {
    'v-model': {
      control: {
        type: null
      }
    },
    size: {
      options: ['default', 'small'],
      control: {
        type: 'select'
      }
    },
    type: {
      options: ['date', 'email', 'number', 'password', 'tel', 'text', 'url', 'time'],
      control: {
        type: 'select'
      }
    }
  }
};

const textInputVModel = '';

const PrimaryTemplate = (args, { argTypes }) => ({
  props: Object.keys(argTypes),
  components: { TextInput },
  setup: () => ({ args }),
  data: () => ({ textInputVModel }),
  template: '<text-input v-bind="args" v-model="textInputVModel" />'
});

export const Primary = PrimaryTemplate.bind({});
Primary.args = {
  id: 'name',
  label: 'Name',
  placeholder: 'Your name here'
};

const IconLeftTemplate = (args, { argTypes }) => ({
  props: Object.keys(argTypes),
  components: { TextInput, Search },
  setup: () => ({ args }),
  template: `
    <text-input v-bind="args" v-model="textInputVModel">
      <template v-slot:iconLeft>
        <search class="w-6 h-6" />
      </template>
    </text-input>
  `
});

export const IconLeft = IconLeftTemplate.bind({});
IconLeft.args = {
  id: 'one',
  label: 'One',
  placeholder: 'One'
};

const IconRightTemplate = (args, { argTypes }) => ({
  props: Object.keys(argTypes),
  components: { TextInput, Close },
  setup: () => ({ args }),
  template: `
    <text-input v-bind="args">
      <template v-slot:iconRight>
        <close class="w-6 h-6" />
      </template>
    </text-input>
  `
});

export const IconRight = IconRightTemplate.bind({});
IconRight.args = {
  id: 'one',
  label: 'One',
  placeholder: 'One'
};

const WithTooltipTemplate = (args, { argTypes }) => ({
  props: Object.keys(argTypes),
  components: { TextInput, LobLabel, Info, Tooltip },
  setup: () => ({ args }),
  template: `
    <LobLabel
      label="Favorite Lunar Maria"
      labelFor="one"
      tooltipContent="This is a tooltip"
    >
      <template v-slot:tooltip>
        <Tooltip>
          <template #trigger>
            <Info class="w-5 h-5" />
          </template>
          <template #content>
            Moon
          </template>      
        </Tooltip>
      </template>
    </LobLabel>
    <text-input v-bind="args" />
  `
});

export const WithTooltip = WithTooltipTemplate.bind({});
WithTooltip.args = {
  id: 'one',
  placeholder: 'Mare Nectaris'
};

const BothIconsTemplate = (args, { argTypes }) => ({
  props: Object.keys(argTypes),
  components: { TextInput, Search, Close },
  setup: () => ({ args }),
  template: `
    <text-input v-bind="args">
      <template v-slot:iconLeft>
        <search class="w-6 h-6" />
      </template>
      <template v-slot:iconRight>
        <close class="w-6 h-6" />
      </template>
    </text-input>
  `
});

export const BothIcons = BothIconsTemplate.bind({});
BothIcons.args = {
  id: 'one',
  label: 'One',
  placeholder: 'One'
};

const WithCopyButtonTemplate = (args, { argTypes }) => ({
  props: Object.keys(argTypes),
  components: { TextInput },
  setup: () => ({ args }),
  template: '<text-input v-bind="args"/>'
});

export const WithCopyButton = WithCopyButtonTemplate.bind({});
WithCopyButton.args = {
  id: 'copy-this',
  label: 'Copy this',
  modelValue: 'Direct Mail and Address Verification',
  readonly: true,
  withCopyButton: true
};
