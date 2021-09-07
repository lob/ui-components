import Multiselect from './Multiselect.vue';

export default {
  title: 'Components/Multiselect',
  component: Multiselect,
  argTypes: {
    modelValue: {
      table: {
        disable: true
      }
    }
  }
};

const options = [
  { label: 'Egypt', value: 'EG' },
  { label: 'United States', value: 'US' },
  { label: 'Uruguay', value: 'UR' }
];

const Template = (args, { argTypes }) => ({
  props: Object.keys(argTypes),
  components: {  Multiselect },
  setup: () => ({ args }),
  template: '<multiselect v-bind="args"></multiselect>'
});

export const Primary = Template.bind({});
Primary.args = {
  id: 'country',
  label: 'Destination Country',
  options
};
