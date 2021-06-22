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
  searchFunction : (searchTerm) => {
    const allPostCards = [
      {
        "img": 1,
        "description": "campaign ad",
        "type": "postcard"
      },
      {
        "img": 2,
        "description": "soccer postcard",
        "type": "postcard"
      },
      {
        "img": 3,
        "description": "baseball mail",
        "type": "postcard"
      },
      {
        "img": 4,
        "description": "basketball email",
        "type": "postcard"
      }
    ]
    const results = allPostCards.filter(postCard => postCard.description.includes(searchTerm))
    return new Promise((resolve, reject) => {
      resolve(results);
    });
  },

};