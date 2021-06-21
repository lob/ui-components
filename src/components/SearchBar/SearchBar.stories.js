import SearchBar from './SearchBar.vue';
import mdx from './SearchBar.mdx';

export default {
  title: 'Components/SearchBar',
  component: SearchBar,
  parameters: {
    docs: {
      page: mdx
    }
  }
};

const PrimaryTemplate = (args, { argTypes }) => ({
  props: Object.keys(argTypes),
  components: { SearchBar },
  setup: () => ({ args }),
  template: `
    <SearchBar v-bind="args"></SearchBar>
    `
});

export const Primary = PrimaryTemplate.bind({});
Primary.args = {
};