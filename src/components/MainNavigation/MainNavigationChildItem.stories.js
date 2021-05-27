import VueRouter from 'vue-router';

import MainNavigationItem from './MainNavigationItem.vue';
import MainNavigationChildItem from './MainNavigationChildItem.vue';
import iconOverview from '../../assets/images/iconOverview.svg';

export default {
  title: 'Components/Main Navigation/Child Item',
  component: MainNavigationChildItem,
  parameters: {
    // docs: {
    //   page: mdx
    // }
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
  components: { MainNavigationChildItem, MainNavigationItem },
  router: new VueRouter({ mode: 'history', routes: [] }),
  template: `
    <ul style="width: 222px;" class="bg-offWhite">
      <main-navigation-item :collapsed="false" title="Navigation Item" iconSrc="${args.iconSrc}" iconAltText="Overview icon">
        <main-navigation-child-item v-bind="$props" />
      </main-navigation-item>
    </ul>
  `
});

export const Primary = Template.bind({});
Primary.args = {
  title: 'Child item one',
  to: '/overview/child',
  iconSrc: iconOverview
};
