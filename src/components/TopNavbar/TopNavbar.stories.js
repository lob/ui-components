import routeDecorator from '../../../.storybook/routeDecorator';
import TopNavbar from './TopNavbar.vue';
import mdx from './TopNavbar.mdx';
import TopNavDropdown from '@/components/TopNavDropdown/TopNavDropdown.vue';
import TopNavDropdownItem from '@/components/TopNavDropdown/TopNavDropdownItem.vue';
import { Signal, Map } from '../Icons';

export default {
  title: 'Components/Top Navbar',
  component: TopNavbar,
  subcomponents: { TopNavDropdown, TopNavDropdownItem },
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
  components: { TopNavbar, TopNavDropdown, TopNavDropdownItem, Signal, Map },
  setup: () => ({ args }),
  template: `
    <TopNavbar v-bind="args">
    <div style="width: 76vw; display: flex; justify-content: space-between;">
      <img
        :src="$getConst('lobAssetsUrl') + '/dashboard/navbar/lob-logo.svg'"
        width="95"
        alt=""
      >
      <div class="md:pl-6">
        <TopNavDropdown right id="1" title="Some menu" navKey="" :mobileNavs="{}">
          <TopNavDropdownItem id="api" to="/settings/main/account">
            <template #icon> <Signal/> </template>
            API Status
          </TopNavDropdownItem>
          <TopNavDropdownItem id="help" to="/settings/main/account">
            <template #icon> <Map/> </template>
            Help Center
          </TopNavDropdownItem>
        </TopNavDropdown>

        <TopNavDropdown right id="2" title="Another menu" navKey="" :mobileNavs="{}">
          <TopNavDropdownItem id="api" to="/settings/main/account">
            <template #icon> <Signal/> </template>
            API Status
          </TopNavDropdownItem>
        </TopNavDropdown>
      </div>
    </TopNavbar>
  `
});

export const Primary = Template.bind({});
Primary.args = {
};
