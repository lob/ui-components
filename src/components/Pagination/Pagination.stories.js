import Pagination from './Pagination.vue';
import mdx from './Pagination.mdx';

export default {
  title: 'Components/Pagination',
  component: Pagination,
  parameters: {
    docs: {
      page: mdx
    }
  },
  argTypes: {}
};

const Template = (args, { argTypes }) => ({
  props: Object.keys(argTypes),
  components: { Pagination },
  setup: () => ({ args }),
  template: '<div style="width: 500px;"><Pagination v-bind="args" /></div>'
});

export const Primary = Template.bind({});
Primary.args = {
  total: 1024,
  next: 'example'
};

export const Loading = Template.bind({});
Loading.args = {
  total: 1024,
  loading: true,
  next: 'example'
};
