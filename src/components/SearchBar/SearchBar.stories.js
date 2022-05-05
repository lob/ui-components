import { SearchBar } from '@/components';
import mdx from './SearchBar.mdx';
import iconOverview from '@/assets/images/iconOverview.svg';
import routeDecorator, { routeTemplate } from '../../../.storybook/routeDecorator';

export default {
  title: 'Components/Search Bar',
  component: SearchBar,
  decorators: [
    routeDecorator('/', [
      {
        path: '/search',
        component: {
          template: routeTemplate('search')
        }
      }
    ])
  ],
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
    <SearchBar v-bind='args' style="width: 600px;">
      <template
        #default="{ result }"
        class="min-w-full"
      >
        <td>
          <img class="w-5 h-5" :src="result.img" />
        </td>
        <td>
          {{ result.description }}
        </td>
        <td>
          {{ result.type }}
        </td>
        <td>
           <span style="font-size: large;">></span>
        </td>
      </template>
    </SearchBar> 
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
      setTimeout(() => {
        resolve(results);
      }, 1500); // waits for 1500ms before returning results, so it's more 'realistic'
    });
  },
  link: '/search',
  count: 10,
  placeholder: 'Search here',
  disabled: false
};
