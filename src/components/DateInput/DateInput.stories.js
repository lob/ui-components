import DateInput from './DateInput.vue';
import mdx from './DateInput.mdx';

export default {
  title: 'Components/Date Input',
  component: DateInput,
  parameters: {
    docs: {
      page: mdx
    }
  }
};

const startDate = new Date();
const startDateOpen = false;

const Template = (args, { argTypes }) => ({
  props: Object.keys(argTypes),
  components: {  DateInput },
  data: () => ({ startDate, startDateOpen }),
  setup: () => ({ args }),
  template: '<date-input v-bind="args" v-model="startDate" v-model:open="startDateOpen"></date-input>'
});

export const Primary = Template.bind({});
Primary.args = {
  id: 'startDate',
  label: 'Start date',
  srOnlyLabel: true
};
