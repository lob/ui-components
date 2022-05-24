import TextInput from './TextInput.vue';
import mdx from './TextInput.mdx';

import LobLabel from '@/components/LobLabel/LobLabel.vue';
import Tooltip from '@/components/Tooltip/Tooltip.vue';
import { Close, Search, Info, Upload } from '@/components/Icons';

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
  data: () => ({ textInputVModel }),
  template: `
    <text-input v-bind="args" v-model="textInputVModel">
      <template v-slot:iconLeft>
        <search class="w-[18px] h-[18px]" />
      </template>
    </text-input>
  `
});

export const IconLeft = IconLeftTemplate.bind({});
IconLeft.args = {
  id: 'name',
  label: 'Name',
  placeholder: 'Your name here'
};

const IconRightTemplate = (args, { argTypes }) => ({
  props: Object.keys(argTypes),
  components: { TextInput, Search },
  setup: () => ({ args }),
  data: () => ({ textInputVModel }),
  template: `
    <text-input v-bind="args" v-model="textInputVModel">
      <template v-slot:iconRight>
        <search class="w-[18px] h-[18px]" />
      </template>
    </text-input>
  `
});

export const IconRight = IconRightTemplate.bind({});
IconRight.args = {
  id: 'name',
  label: 'Name',
  placeholder: 'Your name here'
};

const WithTooltipTemplate = (args, { argTypes }) => ({
  props: Object.keys(argTypes),
  components: { TextInput, LobLabel, Info, Tooltip },
  setup: () => ({ args }),
  data: () => ({ textInputVModel }),
  template: `
    <LobLabel
      label="Favorite Lunar Maria"
      labelFor="one"
      tooltipContent="This is a tooltip"
    >
      <template v-slot:tooltip>
        <Tooltip>
          <template #trigger>
            <Info class="w-[18px] h-[18px]" />
          </template>
          <template #content>
            Moon
          </template>      
        </Tooltip>
      </template>
    </LobLabel>
    <text-input v-bind="args" v-model="textInputVModel" />
  `
});

export const WithTooltip = WithTooltipTemplate.bind({});
WithTooltip.args = {
  id: 'name',
  placeholder: 'Mare Nectaris'
};

const BothIconsTemplate = (args, { argTypes }) => ({
  props: Object.keys(argTypes),
  components: { TextInput, Search, Upload },
  setup: () => ({ args }),
  data: () => ({ textInputVModel }),
  template: `
    <text-input v-bind="args" v-model="textInputVModel">
      <template v-slot:iconLeft>
        <search class="w-[18px] h-[18px]" />
      </template>
      <template v-slot:iconRight>
        <upload class="w-[18px] h-[18px]" />
      </template>
    </text-input>
  `
});

export const BothIcons = BothIconsTemplate.bind({});
BothIcons.args = {
  id: 'name',
  label: 'Name',
  placeholder: 'Your name here'
};

const WithCopyButtonTemplate = (args, { argTypes }) => ({
  props: Object.keys(argTypes),
  components: { TextInput },
  setup: () => ({ args }),
  template: '<text-input v-bind="args" />'
});

export const WithCopyButton = WithCopyButtonTemplate.bind({});
WithCopyButton.args = {
  id: 'copy-this',
  label: 'Copy this',
  modelValue: 'Direct Mail and Address Verification',
  readonly: true,
  withCopyButton: true
};
