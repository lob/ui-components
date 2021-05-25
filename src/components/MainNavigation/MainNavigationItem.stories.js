import MainNavigationItem from './MainNavigationItem.vue';
import mdx from './MainNavigationItem.mdx';
import iconOverview from './iconOverview.svg';

export default {
  title: 'Components/MainNavigationItem',
  component: MainNavigationItem,
  parameters: {
    docs: {
      page: mdx
    }
  }
};

const Template = (args, { argTypes }) => ({
  props: Object.keys(argTypes),
  components: { MainNavigationItem },
  template: '<div style="width: 222px;"><main-navigation-item v-bind="$props"></main-navigation-item></div>'
});

export const Primary = Template.bind({});
Primary.args = {
  title: 'Overview',
  iconSrc: {
    default: () => console.log(iconOverview) && iconOverview
  }
};
