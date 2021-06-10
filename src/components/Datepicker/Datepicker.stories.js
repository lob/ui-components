// import Datepicker from './Datepicker.vue';
import DatepickerMonth from './DatepickerMonth.vue';
import DatepickerDay from './DatepickerDay.vue';

//import mdx from './Datepicker.mdx';

export default {
  title: 'Components/Datepicker',
  component: DatepickerMonth,
  subcomponents: { DatepickerDay }
//	parameters: {
//		docs: {
//			page: mdx
//		}
//	},
};

const MonthTemplate = (args, { argTypes }) => ({
  props: Object.keys(argTypes),
  components: {  DatepickerMonth },
  setup: () => ({ args }),
  template: '<datepicker-month v-bind="args"></datepicker-month>'
});

export const Month = MonthTemplate.bind({});
Month.args = {
  focusedDay: new Date(),
  dateFormatter: new Intl.DateTimeFormat('en-US', { day: 'numeric', month: 'long' }),
  localization: {
    dayNames: [
      'Sunday',
      'Monday',
      'Tuesday',
      'Wednesday',
      'Thursday',
      'Friday',
      'Saturday'
    ]
  }
};

const DayTemplate = (args, { argTypes }) => ({
  props: Object.keys(argTypes),
  components: {  DatepickerDay },
  setup: () => ({ args }),
  template: '<datepicker-day v-bind="args"></datepicker-day>'
});

export const Day = DayTemplate.bind({});
Day.args = {
  focusedDay: new Date(),
  day: new Date(),
  today: new Date(),
  dateFormatter: new Intl.DateTimeFormat('en-US', { day: 'numeric', month: 'long' })
};
