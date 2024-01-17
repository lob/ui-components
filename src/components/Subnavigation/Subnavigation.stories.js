import routeDecorator, {
  routeTemplate,
} from "../../../.storybook/routeDecorator";
import Subnavigation from "./Subnavigation.vue";
import SubnavigationItem from "./SubnavigationItem.vue";
import { Gear } from "../Icons";

export default {
  title: "Components/Subnavigation ",
  component: Subnavigation,
  subcomponents: { SubnavigationItem },
  decorators: [
    routeDecorator("/account", [
      {
        path: "/account",
        component: {
          template: routeTemplate("account"),
        },
      },
      {
        path: "/user",
        component: {
          template: routeTemplate("user"),
        },
      },
      {
        path: "/api-keys",
        component: {
          template: routeTemplate("api-keys"),
        },
      },
      {
        path: "/payment",
        component: {
          template: routeTemplate("payment"),
        },
      },
    ]),
  ],
};

const Template = (args, { argTypes }) => ({
  props: Object.keys(argTypes),
  components: { Subnavigation, SubnavigationItem },
  setup: () => ({ args }),
  template: `
  <Subnavigation>
    <SubnavigationItem title="Account" to="/account" />
    <SubnavigationItem title="User" to="/user" />
    <SubnavigationItem title="API Keys" to="/api-keys" />
    <SubnavigationItem title="Payment" to="/payment" />
  </Subnavigation>
`,
});

export const Primary = Template.bind({});

const TemplateUsingSlot = (args, { argTypes }) => ({
  props: Object.keys(argTypes),
  components: { Subnavigation, SubnavigationItem, Gear },
  setup: () => ({ args }),
  template: `
  <Subnavigation>
    <SubnavigationItem to="/account">
      <Gear class="mr-1"/> Account
    </SubnavigationItem>
    <SubnavigationItem to="/user">
      <Gear class="mr-1"/>User
    </SubnavigationItem>
    <SubnavigationItem disabled to="/api-keys">
      <Gear class="mr-1"/>API Keys 
    </SubnavigationItem>
    <SubnavigationItem to="/payment">
      <Gear class="mr-1"/>Payment
    </SubnavigationItem>
  </Subnavigation>
`,
});

export const WithIcons = TemplateUsingSlot.bind({});
