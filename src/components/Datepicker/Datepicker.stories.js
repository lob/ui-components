import Datepicker from './Datepicker.vue';
import DatepickerMonth from './DatepickerMonth.vue';
import DatepickerDay from './DatepickerDay.vue';
import { printISODate } from '../../utils';

//import mdx from './Datepicker.mdx';

export default {
  title: 'Components/Datepicker',
  component: Datepicker,
  subcomponents: { DatepickerMonth, DatepickerDay }
//	parameters: {
//		docs: {
//			page: mdx
//		}
//	},
};

const dateModel = '';
const Template = (args, { argTypes }) => ({
  props: Object.keys(argTypes),
  components: {  Datepicker },
  data: () => ({ dateModel }),
  setup: () => ({ args }),
  template: '<datepicker v-bind="args" v-model="dateModel"></datepicker>'
});

const today = new Date();
const oneYearAgo = new Date();
const oneYearFromNow = new Date();
oneYearAgo.setMonth(today.getMonth() - 12);
oneYearFromNow.setMonth(today.getMonth() + 12);

export const Primary = Template.bind({});
Primary.args = {
  focusedDay: new Date(),
  dateFormatter: new Intl.DateTimeFormat('en-US', { day: 'numeric', month: 'long' }),
  localization: {
    keyboardInstruction: 'use the keyboard',
    calendarHeading: 'Calendar',
    closeLabel: 'Close',
    dayNames: [
      'Sunday',
      'Monday',
      'Tuesday',
      'Wednesday',
      'Thursday',
      'Friday',
      'Saturday'
    ],
    monthNames: [
      'January',
      'February',
      'March',
      'April',
      'June',
      'July',
      'August',
      'September',
      'October',
      'November',
      'December'
    ],
    monthNamesShort: [
      'Jan',
      'Feb',
      'Mar',
      'Apr',
      'Jun',
      'Jul',
      'Aug',
      'Sept',
      'Oct',
      'Nov',
      'Dec'
    ],
    monthSelectLabel: 'Choose month',
    yearSelectLabel: 'Choose year',
    prevMonthLabel: 'Previous',
    nextMonthLabel: 'Next'
  },
  min: printISODate(oneYearAgo),
  max: printISODate(oneYearFromNow)
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
