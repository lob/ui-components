import VueRouter from 'vue-router';

import MainNavigation from './MainNavigation.vue';
import MainNavigationItem from './MainNavigationItem.vue';
import MainNavigationChildItem from './MainNavigationChildItem.vue';
import mdx from './MainNavigation.mdx';
import iconOverview from '../../assets/images/iconOverview.svg';

export default {
  title: 'Components/Main Navigation',
  component: MainNavigation,
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
  router: new VueRouter({ mode: 'history' }),
  template: `
    <main-navigation style="width: 222px;" v-bind="$props">
      <main-navigation-item title="Navigation Item 1" iconSrc="${args.iconSrc}" iconAltText="Overview icon" />
      <main-navigation-item title="Navigation Item 2" iconSrc="${args.iconSrc}" iconAltText="Overview icon" :collapsed="false" >
        <main-navigation-child-item title="Child Item 1" to="/us-verifications" />
        <main-navigation-child-item title="Child Item 2" to="/intl-verifications" />
      </main-navigation-item>
    </main-navigation>
  `
});

export const Primary = Template.bind({});
Primary.args = {
  iconSrc: iconOverview
};
