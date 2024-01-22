import Multiselect from './Multiselect.vue';
import mdx from './Multiselect.mdx';

export default {
  title: 'Components/Multiselect',
  component: Multiselect,
  decorators: [() => ({ template: '<div class="w-72"><story /></div>' })],
  parameters: {
    docs: {
      page: mdx
    }
  },
  argTypes: {
    modelValue: {
      table: {
        disable: true
      }
    },
    size: {
      options: ['default', 'small'],
      control: {
        type: 'select'
      }
    },
    matchOn: {
      options: ['label', 'value', 'both'],
      control: {
        type: 'select'
      }
    }
  }
};

const selected = [];

const options = [
  { label: 'Egypt', value: 'EG' },
  { label: 'United States', value: 'US' },
  { label: 'Uruguay', value: 'UR' }
];

const Template = (args, { argTypes }) => ({
  props: Object.keys(argTypes),
  components: { Multiselect },
  data: () => ({ selected }),
  setup: () => ({ args }),
  template: '<multiselect v-bind="args" v-model="selected"></multiselect>'
});

export const Primary = Template.bind({});
Primary.args = {
  id: 'country',
  label: 'Destination Country',
  placeholder: 'Country',
  options
};
