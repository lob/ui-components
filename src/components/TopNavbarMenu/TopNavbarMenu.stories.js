import routeDecorator from '../../../.storybook/routeDecorator';
import { constants } from '../../config';
import TopNavbarMenu from './TopNavbarMenu.vue';
import TopNavbarMenuItem from './TopNavbarMenuItem.vue';
//import mdx from './TopNavbarMenuItem.mdx';

export default {
  title: 'Components/TopNavbarMenu',
  component: TopNavbarMenu,
  subcomponents: { TopNavbarMenuItem },
  decorators: [
    routeDecorator()
  ],
  parameters: {
    docs: {
      //page: mdx
    }
  },
  argTypes: {
    content: {
    }
  }
};

const Template = (args, { argTypes }) => ({
  props: Object.keys(argTypes),
  components: { TopNavbarMenuItem },
  template: `
  <TopNavbarMenuItem v-bind="$props">
    Some text
  </TopNavbarMenuItem>`
});

export const Primary = Template.bind({});
Primary.args = {
  to: '/settings/main/account',
  imageSource: `${constants.lobAssetsUrl}/dashboard/navbar/settings.svg`,
  small: true
};
