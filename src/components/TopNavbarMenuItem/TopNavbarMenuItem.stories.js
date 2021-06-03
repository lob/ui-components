import TopNavbarMenuItem from './TopNavbarMenuItem.vue';
import mdx from './TopNavbarMenuItem.mdx';

export default {
  title: 'Components/TopNavbarMenuItem',
  component: TopNavbarMenuItem,
  parameters: {
    docs: {
      page: mdx
    }
  },
  argTypes: {
    content: {
      href: "dashboard.settings.main.account",
      imageSource: "LOB_ASSETS_URL+'/dashboard/navbar/settings.svg",
      small: true,
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
}
