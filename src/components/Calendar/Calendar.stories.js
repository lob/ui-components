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

const Template = (args) => ({
  components: { Calendar },
  setup: () => ({ args }),
  template: `
  <calendar 
  id="some-id"
  />
  `
});

export const Primary = Template.bind({});
Primary.args = {
};
