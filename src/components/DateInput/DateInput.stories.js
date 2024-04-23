import DateInput from './DateInput.vue';
import mdx from './DateInput.mdx';

export default {
  title: 'Components/Date Input',
  component: DateInput,
  parameters: {
    docs: {
      page: mdx
    }
  },
  argTypes: {
    open: {
      table: {
        disable: true
      }
    },
    modelValue: {
      table: {
        disable: true
      }
    },
    min: {
      control: {
        type: 'date'
      }
    },
    max: {
      control: {
        type: 'date'
      }
    },
    error: {
      control: {
        type: 'boolean'
      }
    },
    errorMessage: {
      control: {
        type: 'text'
      }
    }
  },
  disabled: {
    control: {
      type: 'boolean'
    }
  }
};

const startDate = new Date();
const startDateOpen = false;

const Template = (args, { argTypes }) => ({
  props: Object.keys(argTypes),
  components: { DateInput },
  data: () => ({ startDate, startDateOpen }),
  setup: () => {
    args.min = args.min ? new Date(args.min) : undefined;
    args.max = args.max ? new Date(args.max) : undefined;
    return { args };
  },
  template:
    '<date-input v-bind="args" v-model="startDate" v-model:open="startDateOpen"></date-input>'
});

export const Primary = Template.bind({});
Primary.args = {
  id: 'startDate',
  label: 'Start date',
  srOnlyLabel: true
};

export const DisabledWeekendsAndHolidays = Template.bind({});
DisabledWeekendsAndHolidays.args = {
  id: 'startDate',
  label: 'Start date',
  srOnlyLabel: true,
  disableWeekends: true,
  disableHolidays: true
};
