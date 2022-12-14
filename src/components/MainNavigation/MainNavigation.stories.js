import routeDecorator, { routeTemplate } from '../../../.storybook/routeDecorator';

import MainNavigation from './MainNavigation.vue';
import MainNavigationItem from './MainNavigationItem.vue';
import MainNavigationChildItem from './MainNavigationChildItem.vue';
import mdx from './MainNavigation.mdx';
import iconOverview from '@/assets/images/iconOverview.svg';
import { HouseChimney } from '../Icons';

export default {
  title: 'Components/Main Navigation',
  component: MainNavigation,
  subcomponents: { MainNavigationItem, MainNavigationChildItem },
  decorators: [
    routeDecorator('/', [
      {
        path: '/overview',
        component: {
          template: routeTemplate('overview')
        }
      },
      {
        path: '/mail-analytics',
        component: {
          template: routeTemplate('mail-analytics')
        }
      },
      {
        path: '/address-book',
        component: {
          template: routeTemplate('address-book')
        }
      },
      {
        path: '/us-verifications',
        component: {
          template: routeTemplate('us-verifications')
        }
      },
      {
        path: '/intl-verifications',
        component: {
          template: routeTemplate('intl-verifications')
        }
      },
      {
        path: '/postcards',
        component: {
          template: routeTemplate('postcards')
        },
        children: [
          {
            path: ':id',
            component: {
              template: routeTemplate('view postcard')
            }
          }
        ]
      },
      {
        path: '/letters',
        component: {
          template: routeTemplate('letters')
        }
      }
    ])
  ],
  parameters: {
    docs: {
      page: mdx
    }
  },
  argTypes: {
    iconSrc: {
      table: {
        disable: true
      },
      control: {
        disable: true
      }
    }
  }
};

const Template = (args, { argTypes }) => ({
  props: Object.keys(argTypes),
  components: { MainNavigation, MainNavigationChildItem, MainNavigationItem, HouseChimney },
  decorators: [() => ({ template: '<div class="block"><story /></div>' })],
  setup: () => ({ args }),
  template: `
  <div style="padding: 10px; background-color: #ccc">
    <main-navigation v-bind="args">
      <template v-slot="{ expanded }">
        <main-navigation-item title="Overview" to="/overview" :expanded="expanded">
          <template #icon>
            <HouseChimney size="xl" role="img" title="Overview Icon" />
          </template>
        </main-navigation-item>

        <main-navigation-item title="Mail Analytics" to="/mail-analytics" :expanded="expanded">
          <template #icon>
            <HouseChimney size="xl" role="img" title="Mail Analytics Icon" />
          </template>
        </main-navigation-item>

        <main-navigation-item title="Address Book" to="/address-book" :expanded="expanded">
          <template #icon>
            <HouseChimney size="xl" role="img" title="Address Book Icon" />
          </template>
        </main-navigation-item>

        <main-navigation-item title="Address Verification" :expanded="expanded">
          <template #icon>
            <HouseChimney size="xl" role="img" title="Address Verification Icon" />
          </template>
          <main-navigation-child-item title="US Verifications" to="/us-verifications" />
          <main-navigation-child-item title="Int'l Verifications" to="/intl-verifications" />
        </main-navigation-item>
        

        <main-navigation-item title="Print & Mail" :expanded="expanded">
          <template #icon>
            <HouseChimney size="xl" role="img" title="Print & Mail Icon" />
          </template>
          <main-navigation-child-item title="Postcards" to="/postcards" />
          <main-navigation-child-item title="Letters" to="/letters" />
        </main-navigation-item>
      </template>
    </main-navigation>
    </div>
  `
});

export const FullNavigation = Template.bind({});
FullNavigation.args = {
  iconSrc: iconOverview
};

const ItemTemplate = (args, { argTypes }) => ({
  props: Object.keys(argTypes),
  components: { MainNavigationItem, HouseChimney },
  setup: () => ({ args }),
  template: ` 
  <main-navigation-item title="Overview" to="/overview" :expanded="expanded">
    <template #icon>
      <HouseChimney size="xl" role="img" title="Overview Icon" />
    </template>
  </main-navigation-item>`
});

export const Item = ItemTemplate.bind({});
Item.args = {
  title: 'Overview',
  to: '/overview',
  expanded: true
};

const ItemWithSubItemsTemplate = (args, { argTypes }) => ({
  props: Object.keys(argTypes),
  components: { MainNavigationItem, MainNavigationChildItem, HouseChimney },
  setup: () => ({ args }),
  template: ` 
  <main-navigation-item title="Print & Mail" :expanded="expanded">
    <template #icon>
     <HouseChimney size="xl" role="img" title="Print & Mail Icon" />
    </template>
    <main-navigation-child-item title="Postcards" to="/postcards" />
    <main-navigation-child-item title="Letters" to="/letters" />
  </main-navigation-item>`
});

export const ItemWithSubItems = ItemWithSubItemsTemplate.bind({});
ItemWithSubItems.args = {
  title: 'Overview',
  to: '/overview',
  expanded: true
};
