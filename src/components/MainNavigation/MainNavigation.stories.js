import routeDecorator from '../../../.storybook/routeDecorator';

import MainNavigation from './MainNavigation.vue';
import MainNavigationItem from './MainNavigationItem.vue';
import MainNavigationChildItem from './MainNavigationChildItem.vue';
import mdx from './MainNavigation.mdx';
import iconOverview from '../../assets/images/iconOverview.svg';

export default {
  title: 'Components/Main Navigation',
  component: MainNavigation,
  decorators: [
    () => ({ template: '<div class="block bg-offWhite"><story /></div>' }),
    routeDecorator()
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

const primaryTemplateStr = (args) => `
    <main-navigation v-bind="$props">
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
  `;

const Template = (args, { argTypes }) => ({
  props: Object.keys(argTypes),
  components: { MainNavigation, MainNavigationChildItem, MainNavigationItem },
  template: primaryTemplateStr(args)
});

export const Primary = Template.bind({});
Primary.args = {
  iconSrc: iconOverview
};
Primary.parameters = {
  docs: {
    source: {
      code: primaryTemplateStr({ iconSrc: 'srcFilePath' })
    }
  }
};

const itemTemplateStr = '<main-navigation-item v-bind="$props" />';
const ItemTemplate = (args, { argTypes }) => ({
  props: Object.keys(argTypes),
  components: { MainNavigationItem },
  template: itemTemplateStr
});
export const Item = ItemTemplate.bind({});
Item.args = {
  title: 'Overview',
  iconSrc: iconOverview,
  iconAltText: 'Overview icon',
  to: '/overview',
  expanded: true
};
Item.parameters = {
  docs: {
    source: {
      code: itemTemplateStr
    }
  }
};

const childTemplateStr = '<main-navigation-child-item v-bind="$props" />';
const ChildItemTemplate = (args, { argTypes }) => ({
  props: Object.keys(argTypes),
  components: { MainNavigationChildItem },
  template: childTemplateStr
});
export const ChildItem = ChildItemTemplate.bind({});
ChildItem.args = {
  title: 'Postcards',
  to: '/postcards'
};
ChildItem.parameters = {
  docs: {
    source: {
      code: childTemplateStr
    }
  }
};
