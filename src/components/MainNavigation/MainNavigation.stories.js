import routeDecorator, {
  routeTemplate
} from '../../../.storybook/routeDecorator';

import MainNavigation from './MainNavigation.vue';
import MainNavigationItem from './MainNavigationItem.vue';
import MainNavigationChildItem from './MainNavigationChildItem.vue';
import mdx from './MainNavigation.mdx';
import iconOverview from '@/assets/images/iconOverview.svg';
import {
  HouseChimney,
  ChartMixed,
  AddressBook,
  LocationDot,
  EnvelopesBulk
} from '../Icons';

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
  components: {
    MainNavigation,
    MainNavigationChildItem,
    MainNavigationItem,
    HouseChimney,
    ChartMixed,
    AddressBook,
    LocationDot,
    EnvelopesBulk
  },
  decorators: [() => ({ template: '<div class="block"><story /></div>' })],
  setup: () => ({ args }),
  template: `
  <div style="padding: 5em; background-color: #EBF0F6; max-width: min-content;">
    <main-navigation v-bind="args">
      <template v-slot="{ expanded }">
        <main-navigation-item title="Overview" to="/overview" :expanded="expanded">
          <template #icon="{ title }">
            <HouseChimney size="xl" />
          </template>
        </main-navigation-item>

        <main-navigation-item title="Mail Analytics" to="/mail-analytics" :expanded="expanded">
          <template #icon="{ title }">
            <ChartMixed size="xl" />
          </template>
        </main-navigation-item>

        <main-navigation-item title="Address Book" to="/address-book" :expanded="expanded">
          <template #icon="{ title }">
            <AddressBook size="xl" />
          </template>
        </main-navigation-item>

        <main-navigation-item title="Address Verification" :expanded="expanded">
          <template #icon="{ title }">
            <LocationDot size="xl" />
          </template>
          <main-navigation-child-item title="US Verifications" to="/us-verifications" />
          <main-navigation-child-item title="Int'l Verifications" to="/intl-verifications" />
        </main-navigation-item>
        

        <main-navigation-item title="Print & Mail" :expanded="expanded">
          <template #icon="{ title }">
            <EnvelopesBulk size="xl" />
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
    <template #icon="{ title }">
      <HouseChimney size="xl" />
    </template>
  </main-navigation-item>`
});

export const Item = ItemTemplate.bind({});
Item.args = {
  title: 'Overview',
  to: '/overview',
  expanded: true
};

const ItemWithChildItemsTemplate = (args, { argTypes }) => ({
  props: Object.keys(argTypes),
  components: { MainNavigationItem, MainNavigationChildItem, HouseChimney },
  setup: () => ({ args }),
  template: ` 
  <main-navigation-item title="Print & Mail" :expanded="expanded">
    <template #icon="{ title }">
      <HouseChimney size="xl" />
    </template>
    <main-navigation-child-item title="Postcards" to="/postcards" />
    <main-navigation-child-item title="Letters" to="/letters" />
  </main-navigation-item>`
});

export const ItemWithChildItems = ItemWithChildItemsTemplate.bind({});
ItemWithChildItems.args = {
  title: 'Overview',
  to: '/overview',
  expanded: true
};
