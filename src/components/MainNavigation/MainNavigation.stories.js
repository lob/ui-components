import routeDecorator from '../../../.storybook/routeDecorator';

import MainNavigation from './MainNavigation.vue';
import MainNavigationItem from './MainNavigationItem.vue';
import MainNavigationChildItem from './MainNavigationChildItem.vue';
import mdx from './MainNavigation.mdx';
import iconOverview from '../../assets/images/iconOverview.svg';

const routeTemplate = (name) => `<div>${name}</div>`;

export default {
  title: 'Components/Main Navigation',
  component: MainNavigation,
  subcomponents: { MainNavigationItem, MainNavigationChildItem },
  decorators: [
    routeDecorator('/', {
      routes: [
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
          path: '/address-verification',
          component: {
            template: routeTemplate('address-verification')
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
          }
        },
        {
          path: '/letters',
          component: {
            template: routeTemplate('letters')
          }
        }
      ]
    })
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
  components: { MainNavigation, MainNavigationChildItem, MainNavigationItem },
  decorators: [() => ({ template: '<div class="block"><story /></div>' })],
  setup: () => ({ args }),
  template: `
    <main-navigation v-bind="args">
      <template v-slot="{ expanded }">
        <main-navigation-item title="Overview" iconSrc="${args.iconSrc}" iconAltText="Overview icon" to="/overview" :expanded="expanded" />
        <main-navigation-item title="Mail Analytics" iconSrc="${args.iconSrc}" iconAltText="Overview icon" to="/mail-analytics" :expanded="expanded" />
        <main-navigation-item title="Address Books" iconSrc="${args.iconSrc}" iconAltText="Overview icon" to="/address-verification" :expanded="expanded" />
        <main-navigation-item title="Address Verification" iconSrc="${args.iconSrc}" iconAltText="Overview icon" :expanded="expanded">
          <main-navigation-child-item title="US Verifications" to="/us-verifications" />
          <main-navigation-child-item title="Int'l Verifications" to="/intl-verifications" />
        </main-navigation-item>
        <main-navigation-item title="Print & Mail" iconSrc="${args.iconSrc}" iconAltText="Overview icon" :expanded="expanded">
          <main-navigation-child-item title="Postcards" to="/postcards" />
          <main-navigation-child-item title="Letters" to="/letters" />
        </main-navigation-item>
      </template>
    </main-navigation>
  `
});

export const Primary = Template.bind({});
Primary.args = {
  iconSrc: iconOverview
};

const ItemTemplate = (args, { argTypes }) => ({
  props: Object.keys(argTypes),
  components: { MainNavigationItem },
  setup: () => ({ args }),
  template: '<main-navigation-item v-bind="args" />'
});
export const Item = ItemTemplate.bind({});
Item.args = {
  title: 'Overview',
  iconSrc: iconOverview,
  iconAltText: 'Overview icon',
  to: '/overview',
  expanded: true
};

const ChildItemTemplate = (args, { argTypes }) => ({
  props: Object.keys(argTypes),
  components: { MainNavigationChildItem },
  setup: () => ({ args }),
  template: '<main-navigation-child-item v-bind="args" />'
});
export const ChildItem = ChildItemTemplate.bind({});
ChildItem.args = {
  title: 'Postcards',
  to: '/postcards'
};
