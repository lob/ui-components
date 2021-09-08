import Multiselect from './Multiselect.vue';

export default {
  title: 'Components/Multiselect',
  component: Multiselect,
  decorators: [
    () => ({ template: '<div class="w-72"><story /></div>' })
  ],
  argTypes: {
    modelValue: {
      table: {
        disable: true
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
  components: {  Multiselect },
  data: () => ({ selected }),
  setup: () => ({ args }),
  template: '<multiselect v-bind="args" v-model="selected"></multiselect>'
});

export const Primary = Template.bind({});
Primary.args = {
  id: 'country',
  label: 'Destination Country',
  options,
  inputWidthClass: 'w-40'
};
