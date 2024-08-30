import { AdvancedSearchBar } from '@/components';
import mdx from './AdvancedSearchBar.mdx';
import routeDecorator, {
  routeTemplate
} from '../../../.storybook/routeDecorator';
import { Icon, IconName } from '../Icon';

export default {
  title: 'Components/Advanced Search Bar',
  component: AdvancedSearchBar,
  decorators: [
    routeDecorator('/', [
      {
        path: '/advanced-search',
        component: {
          template: routeTemplate('advanced-search')
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
  components: { Icon, AdvancedSearchBar },
  setup: () => ({ args }),
  template: `
    <AdvancedSearchBar v-bind='args'>
      <template #header="{result}">
        <div class="flex text-gray-400 text-xs items-center" v-if="result">
          <Icon v-if="result.icon" class="mr-1" :icon="result.icon"/>
          {{ result.title }}
        </div>
      </template>
      <template #body="{ result }">
        <div
          :result="result"
          class="min-w-full text-gray-700 text-sm font-medium hover:text-primary-700 flex"
        >
          <div v-if="result">
            {{ result.name }}
          </div>
        </div>
      </template>
    </AdvancedSearchBar>
    `
});

export const Primary = PrimaryTemplate.bind({});
Primary.args = {
  searchFunction: (searchTerm) => {
    const allResults = [
      {
        title: 'Recipients',
        icon: IconName.USER,
        results: [
          {
            name: 'John Doe',
            description: 'A postcard to John Doe for Texas',
            type: 'postcard'
          },
          {
            name: 'Jane Doe',
            description: 'A postcard to Jane Doe for California',
            type: 'postcard'
          },
          {
            name: 'John Smith',
            description: 'soccer postcard going to Texas',
            type: 'postcard'
          }
        ]
      },
      {
        title: 'Campaigns',
        icon: IconName.BULLHORN,
        results: [
          {
            name: 'Marketing Campaign for Texas',
            description: '5000 recipients'
          },
          {
            name: 'Marketing Campaign for California',
            description: '10000 recipients'
          }
        ]
      },
      {
        title: 'Templates',
        icon: IconName.CREATIVE,
        results: [
          {
            name: 'Template with John Doe to be sent to Texas',
            description: 'A template to create postcard for John Doe'
          },
          {
            name: 'Template with Jane Doe to be sent to California',
            description: 'A template to create postcard for Jane Doe'
          }
        ]
      }
    ];
    const results = allResults.map((result) => {
      return {
        title: result.title,
        icon: result.icon,
        items: result.results.filter(
          (eachResult) =>
            eachResult.description.includes(searchTerm) ||
            eachResult.name.includes(searchTerm)
        )
      };
    });

    return new Promise((resolve) => {
      setTimeout(() => {
        resolve(results);
      }, 1500); // waits for 1500ms before returning results, so it's more 'realistic'
    });
  },
  link: '/advanced-search',
  count: 10,
  footer: true
};
