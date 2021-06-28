import SearchBar from './SearchBar.vue';
import mdx from './SearchBar.mdx';
import iconOverview from '@/assets/images/iconOverview.svg';

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
    <SearchBar v-bind='args'></SearchBar>
    `
});

export const Primary = PrimaryTemplate.bind({});
Primary.args = {
  searchFunction: (searchTerm) => {
    const allPostCards = [
      {
        img: `/${iconOverview}`,
        description: 'campaign ad',
        type: 'postcard'
      },
      {
        img: `/${iconOverview}`,
        description: 'soccer postcard',
        type: 'postcard'
      },
      {
        img: `/${iconOverview}`,
        description: 'baseball mail',
        type: 'postcard'
      },
      {
        img: `/${iconOverview}`,
        description: 'basketball email',
        type: 'postcard'
      },
      {
        img: 'https://upload.wikimedia.org/wikipedia/commons/1/13/Tunnel_View%2C_Yosemite_Valley%2C_Yosemite_NP_-_Diliff.jpg',
        description: 'campaign ad 1000',
        type: 'postcard'
      },
      {
        img: 'https://upload.wikimedia.org/wikipedia/commons/1/13/Tunnel_View%2C_Yosemite_Valley%2C_Yosemite_NP_-_Diliff.jpg',
        description: 'soccer postcard 1000',
        type: 'postcard'
      },
      {
        img: 'https://upload.wikimedia.org/wikipedia/commons/1/13/Tunnel_View%2C_Yosemite_Valley%2C_Yosemite_NP_-_Diliff.jpg',
        description: 'baseball mail 1000',
        type: 'postcard'
      },
      {
        img: 'https://upload.wikimedia.org/wikipedia/commons/1/13/Tunnel_View%2C_Yosemite_Valley%2C_Yosemite_NP_-_Diliff.jpg',
        description: 'basketball email 1000',
        type: 'postcard'
      },
      {
        img: `/${iconOverview}`,
        description: 'campaign ad',
        type: 'postcard'
      },
      {
        img: `/${iconOverview}`,
        description: 'soccer postcard',
        type: 'postcard'
      },
      {
        img: `/${iconOverview}`,
        description: 'baseball mail',
        type: 'postcard'
      },
      {
        img: `/${iconOverview}`,
        description: 'basketball email',
        type: 'postcard'
      },
      {
        img: 'https://upload.wikimedia.org/wikipedia/commons/1/13/Tunnel_View%2C_Yosemite_Valley%2C_Yosemite_NP_-_Diliff.jpg',
        description: 'campaign ad 1000',
        type: 'postcard'
      },
      {
        img: 'https://upload.wikimedia.org/wikipedia/commons/1/13/Tunnel_View%2C_Yosemite_Valley%2C_Yosemite_NP_-_Diliff.jpg',
        description: 'soccer postcard 1000',
        type: 'postcard'
      },
      {
        img: 'https://upload.wikimedia.org/wikipedia/commons/1/13/Tunnel_View%2C_Yosemite_Valley%2C_Yosemite_NP_-_Diliff.jpg',
        description: 'baseball mail 1000',
        type: 'postcard'
      },
      {
        img: 'https://upload.wikimedia.org/wikipedia/commons/1/13/Tunnel_View%2C_Yosemite_Valley%2C_Yosemite_NP_-_Diliff.jpg',
        description: 'basketball email 1000',
        type: 'postcard'
      }
    ];
    const results = allPostCards.filter((postCard) => postCard.description.includes(searchTerm));
    return new Promise((resolve) => {
      resolve(results);
    });
  }
};
