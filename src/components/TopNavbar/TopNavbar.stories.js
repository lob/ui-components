import routeDecorator, { routeTemplate } from '../../../.storybook/routeDecorator';
import TopNavbar from './TopNavbar.vue';
import mdx from './TopNavbar.mdx';
import TopNavDropdown from '@/components/TopNavDropdown/TopNavDropdown.vue';
import TopNavDropdownItem from '@/components/TopNavDropdown/TopNavDropdownItem.vue';
import TopNavButton from '@/components/TopNavDropdown/TopNavButton.vue';
import { Signal, Map, PersonToPortal } from '../Icons';

export default {
  title: 'Components/Top Navbar',
  component: TopNavbar,
  subcomponents: { TopNavDropdown, TopNavDropdownItem, TopNavButton },
  parameters: {
    docs: {
      page: mdx
    }
  },
  decorators: [
    routeDecorator('/', [
      {
        path: '/settings/main/account',
        component: {
          template: routeTemplate('account')
        }
      }
    ])
  ]
};

const Template = (args, { argTypes }) => ({
  props: Object.keys(argTypes),
  components: { TopNavbar, TopNavDropdown, TopNavDropdownItem, TopNavButton, Signal, Map, PersonToPortal },
  setup: () => ({ args }),
  template: `
    <TopNavbar v-bind="args">
    <div style="width: 76vw; display: flex; justify-content: space-between;">
      <img
        :src="$getConst('lobAssetsUrl') + '/dashboard/navbar/lob-logo.svg'"
        width="95"
        alt=""
      >
      <div class="flex items-center">
        <TopNavDropdown right id="1" title="Resources" navKey="" :mobileNavs="{}">
          <TopNavDropdownItem id="api" to="/settings/main/account">
            <template #icon> <Signal/> </template>
            API Status
          </TopNavDropdownItem>
          <TopNavDropdownItem id="help" to="/settings/main/account">
            <template #icon> <Map/> </template>
            Help Center
          </TopNavDropdownItem>
        </TopNavDropdown>

        <TopNavButton style="margin-left:1px;">
            <template #icon> <PersonToPortal /> </template>
            Sign Out
        </TopNavButton>
      </div>
      </div>
    </TopNavbar>
  `
});

export const Primary = Template.bind({});
Primary.args = {
};
