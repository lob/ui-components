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
  template: '<ul style="width: 222px;" class="bg-offWhite"><main-navigation-item v-bind="$props">{{ children }}</main-navigation-item></ul>'
});

export const Primary = Template.bind({});
Primary.args = {
  title: 'Overview',
  iconSrc: iconOverview,
  iconAltText: 'Overview icon'
};

export const Secondary = Template.bind({});
Secondary.args = {
  title: 'Item With Children',
  iconSrc: iconOverview,
  iconAltText: 'item with children icon',
  children: '<ul><li>I\'m a child</li></li>And I\'m a second</li></ul>'
};
