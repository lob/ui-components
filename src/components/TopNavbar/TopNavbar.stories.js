import routeDecorator from '../../../.storybook/routeDecorator';
import TopNavbar from './TopNavbar.vue';
import mdx from './TopNavbar.mdx';
import { constants } from '../../config';
import MegaMenu from '../MegaMenu/MegaMenu.vue';
import MegaMenuItem from '../MegaMenu/MegaMenuItem.vue';

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


const Template = (args, {argTypes}) => ({
  props: Object.keys(argTypes),
  components: { TopNavbar, MegaMenu, MegaMenuItem },
  template: `
    <topNavbar v-bind="$props">
      <img
        src="${constants.lobAssetsUrl}/dashboard/navbar/lob-logo.svg"
        width="95"
        alt=""
      >
      <div class="pl-6">
        <MegaMenu title="Some menu" navKey="" :mobileNavs="{}" smaller>
          <MegaMenuItem to="/settings/main/account" imageSource="${constants.lobAssetsUrl}/dashboard/navbar/settings.svg" small>
            Some menu item
          </MegaMenuItem>
        </MegaMenu>

        <MegaMenu title="Another menu" navKey="" :mobileNavs="{}" smaller>
          <MegaMenuItem to="/settings/main/account" imageSource="${constants.lobAssetsUrl}/dashboard/navbar/settings.svg" small>
            Another menu item
          </MegaMenuItem>
        </MegaMenu>
      </div>
    </topNavbar>
  `
});

export const Primary = Template.bind({});
Primary.args = {
}
