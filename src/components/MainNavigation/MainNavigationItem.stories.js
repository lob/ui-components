import VueRouter from 'vue-router';

import MainNavigationItem from './MainNavigationItem.vue';
import MainNavigationChildItem from './MainNavigationChildItem.vue';
import mdx from './MainNavigationItem.mdx';
import iconOverview from '../../assets/images/iconOverview.svg';

export default {
  title: 'Components/Main Navigation/Item',
  component: MainNavigationItem,
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
  router: new VueRouter({ mode: 'history' }),
  template: `
    <ul style="width: 222px;" class="bg-offWhite">
      <main-navigation-item v-bind="$props">
        <template v-if="${Boolean(args.default)}" v-slot>${args.default}</template>
      </main-navigation-item>
    </ul>
  `
});

export const Primary = Template.bind({});
Primary.args = {
  title: 'Overview',
  iconSrc: iconOverview,
  iconAltText: 'Overview icon',
  to: '/overview'
};

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
