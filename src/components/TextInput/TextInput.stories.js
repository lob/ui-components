import TextInput from './TextInput.vue';
import mdx from './TextInput.mdx';
import { MagnifyingGlass, Upload } from '@/components/Icons';

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
  components: { TextInput, MagnifyingGlass },
  setup: () => ({ args }),
  data: () => ({ textInputVModel }),
  template: `
    <text-input v-bind="args" v-model="textInputVModel">
      <template v-slot:iconLeft>
        <MagnifyingGlass />
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
  components: { TextInput, MagnifyingGlass },
  setup: () => ({ args }),
  data: () => ({ textInputVModel }),
  template: `
    <text-input v-bind="args" v-model="textInputVModel">
      <template v-slot:iconRight>
        <MagnifyingGlass />
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

export const WithTooltip = PrimaryTemplate.bind({});
WithTooltip.args = {
  id: 'name',
  label: 'Name',
  tooltipContent: 'Type name here',
  tooltipPosition: 'trailing'
};

const BothIconsTemplate = (args, { argTypes }) => ({
  props: Object.keys(argTypes),
  components: { TextInput, MagnifyingGlass, Upload },
  setup: () => ({ args }),
  data: () => ({ textInputVModel }),
  template: `
    <text-input v-bind="args" v-model="textInputVModel">
      <template v-slot:iconLeft>
        <MagnifyingGlass />
      </template>
      <template v-slot:iconRight>
        <Upload />
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
