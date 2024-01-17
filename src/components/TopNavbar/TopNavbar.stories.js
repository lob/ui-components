import routeDecorator, {
  routeTemplate,
} from "../../../.storybook/routeDecorator";
import TopNavbar from "./TopNavbar.vue";
import mdx from "./TopNavbar.mdx";
import TopNavDropdown from "@/components/TopNavDropdown/TopNavDropdown.vue";
import TopNavDropdownItem from "@/components/TopNavDropdown/TopNavDropdownItem.vue";
import TopNavButton from "@/components/TopNavDropdown/TopNavButton.vue";
import { Signal, Map, PersonToPortal, CircleQuestion, Gear } from "../Icons";

export default {
  title: "Components/Top Navbar",
  component: TopNavbar,
  subcomponents: { TopNavDropdown, TopNavDropdownItem, TopNavButton },
  parameters: {
    docs: {
      page: mdx,
    },
  },
  decorators: [
    routeDecorator("/", [
      {
        path: "/settings/main/account",
        component: {
          template: routeTemplate("account"),
        },
      },
    ]),
  ],
};

const Template = (args, { argTypes }) => ({
  props: Object.keys(argTypes),
  components: {
    TopNavbar,
    TopNavDropdown,
    TopNavDropdownItem,
    TopNavButton,
    Signal,
    Map,
    PersonToPortal,
    CircleQuestion,
    Gear,
  },
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
        <TopNavDropdown right id="1" title="Resources">
          <TopNavDropdownItem id="api" to="/settings/main/account">
            <template #icon> <Signal/> </template>
            API Status
          </TopNavDropdownItem>
          <TopNavDropdownItem id="help" to="/settings/main/account">
            <template #icon> <Map/> </template>
            Help Center
          </TopNavDropdownItem>
          <TopNavDropdownItem id="support" to="/settings/main/account">
            <template #icon> <CircleQuestion/> </template>
            Support
          </TopNavDropdownItem>
        </TopNavDropdown>

        <TopNavDropdown right id="2" title="Username">
          <TopNavDropdownItem id="settings" to="/settings/main/account">
            <template #icon> <Gear/> </template>
            Settings
          </TopNavDropdownItem>
          <TopNavDropdownItem id="signout" to="/settings/main/account">
          <template #icon> <PersonToPortal /> </template>
          Sign Out
          </TopNavDropdownItem>
        </TopNavDropdown>
      </div>
      </div>
    </TopNavbar>
  `,
});

export const Primary = Template.bind({});
Primary.args = {};
