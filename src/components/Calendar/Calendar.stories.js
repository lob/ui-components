import Calendar from './Calendar.vue';
import mdx from './Calendar.mdx';

export default {
  title: 'Components/Calendar',
  component: Calendar,
  parameters: {
    docs: {
      page: mdx
    }
  }
};
const vModel = null;
const Template = (args) => ({
  components: { Calendar },
  setup: () => ({ args }),
  data: () => ({ vModel }),
  template: `
  <calendar 
  id="some-id"
  v-model="vModel"
  :selectable-range="180"
  />
  `
});

export const Primary = Template.bind({});
Primary.args = {
};
