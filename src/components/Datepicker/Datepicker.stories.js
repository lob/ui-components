// import Datepicker from './Datepicker.vue';
import DatepickerDay from './DatepickerDay.vue';

//import mdx from './Datepicker.mdx';

export default {
  title: 'Components/Datepicker',
  component: DatepickerDay,
  subcomponents: { DatepickerDay }
//	parameters: {
//		docs: {
//			page: mdx
//		}
//	},
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
