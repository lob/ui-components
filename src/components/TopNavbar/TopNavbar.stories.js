import routeDecorator from '../../../.storybook/routeDecorator';
import TopNavbar from './TopNavbar.vue';
import mdx from './TopNavbar.mdx';
import MegaMenu from '@/components/MegaMenu/MegaMenu.vue';
import MegaMenuItem from '@/components/MegaMenu/MegaMenuItem.vue';

export default {
  title: 'Components/TopNavbar',
  component: TopNavbar,
  subcomponents: { MegaMenu, MegaMenuItem },
  parameters: {
    docs: {
      page: mdx
    }
  },
  decorators: [
    routeDecorator()
  ]
};

const Template = (args, { argTypes }) => ({
  props: Object.keys(argTypes),
  components: { TopNavbar, MegaMenu, MegaMenuItem },
  setup: () => ({ args }),
  template: `
    <topNavbar v-bind="args">
      <img
        :src="$getConst('lobAssetsUrl') + '/dashboard/navbar/lob-logo.svg'"
        width="95"
        alt=""
      >
      <div class="md:pl-6">
        <MegaMenu id="1" title="Some menu" navKey="" :mobileNavs="{}">
          <MegaMenuItem to="/settings/main/account" :imageSource="$getConst('lobAssetsUrl') + '/dashboard/navbar/settings.svg'" small>
            Some menu item
          </MegaMenuItem>
          <MegaMenuItem to="/settings/main/account" :imageSource="$getConst('lobAssetsUrl') + '/dashboard/navbar/settings.svg'" small>
            Another menu item
          </MegaMenuItem>
        </MegaMenu>

        <MegaMenu id="2" title="Another menu" navKey="" :mobileNavs="{}">
          <MegaMenuItem to="/settings/main/account" :imageSource="$getConst('lobAssetsUrl')+'/dashboard/navbar/settings.svg'" small>
            Yet another menu item
          </MegaMenuItem>
        </MegaMenu>
      </div>
    </topNavbar>
  `
});

export const Primary = Template.bind({});
Primary.args = {
};
