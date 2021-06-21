import TextInput from './TextInput.vue';
import mdx from './TextInput.mdx';

import { Close, Search } from '@/components/Icons';

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
      options: ['date', 'email', 'number', 'password', 'tel', 'text', 'url'],
      control: {
        type: 'select'
      }
    }
  }
};

const PrimaryTemplate = (args, { argTypes }) => ({
  props: Object.keys(argTypes),
  components: { TextInput },
  setup: () => ({ args }),
  template: '<text-input v-bind="args" />'
});

export const Primary = PrimaryTemplate.bind({});
Primary.args = {
  id: 'one',
  label: 'One',
  placeholder: 'One'
};

const IconLeftTemplate = (args, { argTypes }) => ({
  props: Object.keys(argTypes),
  components: { TextInput, Search },
  setup: () => ({ args }),
  template: `
    <text-input v-bind="args">
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
