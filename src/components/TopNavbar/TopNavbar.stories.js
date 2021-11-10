import routeDecorator from '../../../.storybook/routeDecorator';
import TopNavbar from './TopNavbar.vue';
import mdx from './TopNavbar.mdx';
import MegaMenu from '@/components/MegaMenu/MegaMenu.vue';
import MegaMenuItem from '@/components/MegaMenu/MegaMenuItem.vue';

export default {
  title: 'Components/Top Navbar',
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
          <MegaMenuItem to="/settings/main/account" small>
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

      <MegaMenu id="3" title="Another menu" navKey="" :mobileNavs="{}"
      >
        <div class="flex flex-col xl:!flex-row">
          <div class="xl:w-1/2">
            <MegaMenuSubtitle>
              {{ ('topNav.industrySubtitle') }}
            </MegaMenuSubtitle>
            <MegaMenuItem
            to="/settings/main/account" :imageSource="$getConst('lobAssetsUrl')+'/dashboard/navbar/settings.svg'" small
            >
              {{ ('topNav.financialServices') }}
            </MegaMenuItem>
            <MegaMenuItem
            to="/settings/main/account" :imageSource="$getConst('lobAssetsUrl')+'/dashboard/navbar/settings.svg'" small
            >
              {{ ('topNav.insurance') }}
            </MegaMenuItem>
            <MegaMenuItem
            to="/settings/main/account" :imageSource="$getConst('lobAssetsUrl')+'/dashboard/navbar/settings.svg'" small
            >
              {{ ('topNav.healthcare') }}
            </MegaMenuItem>
            <MegaMenuItem
            to="/settings/main/account" :imageSource="$getConst('lobAssetsUrl')+'/dashboard/navbar/settings.svg'" small
            >
              {{ ('topNav.retailAndEcommerce') }}
            </MegaMenuItem>
          </div>
          <div class="xl:w-1/2">
            <MegaMenuSubtitle>
              {{ ('topNav.roleSubtitle') }}
            </MegaMenuSubtitle>
            <MegaMenuItem
            to="/settings/main/account" :imageSource="$getConst('lobAssetsUrl')+'/dashboard/navbar/settings.svg'" small
            >
              {{ ('topNav.productManagers') }}
            </MegaMenuItem>
            <MegaMenuItem
            to="/settings/main/account" :imageSource="$getConst('lobAssetsUrl')+'/dashboard/navbar/settings.svg'" small
            >
              {{ ('topNav.developers') }}
            </MegaMenuItem>
            <MegaMenuItem
            to="/settings/main/account" :imageSource="$getConst('lobAssetsUrl')+'/dashboard/navbar/settings.svg'" small
            >
              {{ ('topNav.marketers') }}
            </MegaMenuItem>
          </div>
        </div>
      </MegaMenu>

      <MegaMenu
      id="4" title="Some menu" navKey="" :mobileNavs="{}"
    >
      <MegaMenuSubtitle>
        {{ ('topNav.apisSubtitle') }}
      </MegaMenuSubtitle>
      <MegaMenuItem
      to="/settings/main/account" :imageSource="$getConst('lobAssetsUrl')+'/dashboard/navbar/settings.svg'" small
      >
        {{ ('topNav.printAndMail') }}
      </MegaMenuItem>
      <MegaMenuItem
      to="/settings/main/account" :imageSource="$getConst('lobAssetsUrl')+'/dashboard/navbar/settings.svg'" small
      >
        {{ ('topNav.addressVerification') }}
      </MegaMenuItem>

      <MegaMenuSubtitle>
        {{ ('topNav.partnersSubtitle') }}
      </MegaMenuSubtitle>
      <MegaMenuItem
      to="/settings/main/account" :imageSource="$getConst('lobAssetsUrl')+'/dashboard/navbar/settings.svg'" small
      >
        {{ ('topNav.buildOnLob') }}
      </MegaMenuItem>
    </MegaMenu>
    </topNavbar>
  `
});

export const Primary = Template.bind({});
Primary.args = {
};
