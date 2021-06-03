import { constants } from '../../config';
import TopNavbarMenuItem from './TopNavbarMenuItem.vue';
//import mdx from './TopNavbarMenuItem.mdx';

export default {
  title: 'Components/TopNavbarMenuItem',
  component: TopNavbarMenuItem,
  parameters: {
    docs: {
      //page: mdx
    }
  },
  argTypes: {
    content: {
    }
  },
};

const Template = (args, {argTypes}) => ({
  props: Object.keys(argTypes),
  components: { TopNavbarMenuItem },
  template: `<TopNavbarMenuItem
      v-bind="$props"
  >Some text</TopNavbarMenuItem>`,
});

export const Primary = Template.bind({});
Primary.args = {
  href: "dashboard.settings.main.account",
  imageSource: `${constants.lobAssetsUrl}/dashboard/navbar/settings.svg`,
  small: true
}
