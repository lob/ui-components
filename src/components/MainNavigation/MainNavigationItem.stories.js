import MainNavigationItem from './MainNavigationItem.vue';
import mdx from './MainNavigationItem.mdx';
import iconOverview from '../../assets/images/iconOverview.svg';

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
  template: '<ul style="width: 222px;"><main-navigation-item v-bind="$props"></main-navigation-item></ul>'
});

export const Primary = Template.bind({});
Primary.args = {
  title: 'Overview',
  iconSrc: iconOverview
};
