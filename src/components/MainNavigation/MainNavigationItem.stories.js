import routeDecorator from '../../../.storybook/routeDecorator';

import MainNavigationItem from './MainNavigationItem.vue';
import MainNavigationChildItem from './MainNavigationChildItem.vue';
import mdx from './MainNavigationItem.mdx';
import iconOverview from '../../assets/images/iconOverview.svg';

export default {
  title: 'Components/Main Navigation/Item',
  component: MainNavigationItem,
  decorators: [
    () => ({ template: '<ul style="width: 222px;" class="bg-offWhite"><story /></ul>' })
  ],
  parameters: {
    docs: {
      page: mdx
    }
  },
  argTypes: {
    collapsed: {
      control: {
        disable: true
      }
    }
  }
};

const Template = (args, { argTypes }) => ({
  props: Object.keys(argTypes),
  components: { MainNavigationItem, MainNavigationChildItem },
  template: `
    <main-navigation-item v-bind="$props">
      <template v-if="${Boolean(args.default)}" v-slot>${args.default}</template>
    </main-navigation-item>
  `
});

export const Primary = Template.bind({});
Primary.args = {
  title: 'Overview',
  iconSrc: iconOverview,
  iconAltText: 'Overview icon',
  to: '/overview'
};
Primary.decorators = [routeDecorator('/')];

export const PrimaryActive = Template.bind({});
PrimaryActive.args = { ...Primary.args };
PrimaryActive.decorators = [routeDecorator('/overview')];

export const Secondary = Template.bind({});
Secondary.args = {
  title: 'With Children',
  iconSrc: iconOverview,
  iconAltText: 'item with children icon',
  to: '',
  default: `
    <main-navigation-child-item title="Child Item 1" to="/us-verifications" />
    <main-navigation-child-item title="Child Item 2" to="/intl-verifications" />
  `
};
Secondary.decorators = [routeDecorator('/')];

