import routeDecorator from '../../../.storybook/routeDecorator';
import TopNavbar from './TopNavbar.vue';
import mdx from './TopNavbar.mdx';
import TopNavDropdown from '@/components/TopNavDropdown/TopNavDropdown.vue';
import TopNavDropdownItem from '@/components/TopNavDropdown/TopNavDropdownItem.vue';

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
  components: { TopNavbar, TopNavDropdown, TopNavDropdownItem },
  setup: () => ({ args }),
  template: `
    <topNavbar v-bind="args">
      <img
        :src="$getConst('lobAssetsUrl') + '/dashboard/navbar/lob-logo.svg'"
        width="95"
        alt=""
      >
      <div class="md:pl-6">
        <TopNavDropdown id="1" title="Some menu" navKey="" :mobileNavs="{}">
          <TopNavDropdownItem to="/settings/main/account" small>
            Some menu item
          </TopNavDropdownItem>
          <TopNavDropdownItem to="/settings/main/account" :imageSource="$getConst('lobAssetsUrl') + '/dashboard/navbar/settings.svg'" small>
            Another menu item
          </TopNavDropdownItem>
        </TopNavDropdown>

        <TopNavDropdown id="2" title="Another menu" navKey="" :mobileNavs="{}">
          <TopNavDropdownItem to="/settings/main/account" :imageSource="$getConst('lobAssetsUrl')+'/dashboard/navbar/settings.svg'" small>
            Yet another menu item
          </TopNavDropdownItem>
        </TopNavDropdown>
      </div>
    </topNavbar>
  `
});

export const Primary = Template.bind({});
Primary.args = {
};
