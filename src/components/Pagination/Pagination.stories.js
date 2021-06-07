import Pagination from './Pagination.vue';
import mdx from './Pagination.mdx';

export default {
  title: 'Components/Pagination',
  component: Pagination,
  parameters: {
    docs: {
      page: mdx
    },
    layout: 'padded'
  },
  argTypes: {}
};

const Template = (args, { argTypes }) => ({
  props: Object.keys(argTypes),
  components: { Pagination },
  setup: () => ({ args }),
  template:
    '<div class="block w-1/2 mx-auto mt-auto"><pagination v-bind="args" /></div>'
});

export const FirstPageActive = Template.bind({});
FirstPageActive.args = {
  collection: [{}],
  page: 1,
  total: 30,
  limit: 10
};

export const MiddlePageActive = Template.bind({});
MiddlePageActive.args = {
  collection: [{}],
  page: 2,
  total: 30,
  limit: 10
};

export const LastPageActive = Template.bind({});
LastPageActive.args = {
  collection: [{}],
  page: 3,
  total: 30,
  limit: 10
};

export const NoResults = Template.bind({});
NoResults.args = {
  collection: [],
  page: null,
  total: null,
  limit: null
};
