import routeDecorator from "../../../.storybook/routeDecorator";

import Breadcrumb from "./Breadcrumb.vue";
import mdx from "./Breadcrumb.mdx";
import iconOverview from "../../assets/images/iconOverview.svg";

export default {
  title: "Components/Breadcrumb",
  component: Breadcrumb,
  decorators: [
    routeDecorator("envelopes/create", {
      routes: [
        {
          path: "/envelopes",
          name: "Envelopes",
          component: {
            template: "<div>envelopes</div>",
          },
          children: [
            {
              path: "create",
              component: {
                template: "<div>create</div>",
              },
            },
          ],
        },
      ],
    }),
  ],
  parameters: {
    docs: {
      page: mdx,
    },
  },
};

const templateStr = '<breadcrumb v-bind="args"></breadcrumb>';
const Template = (args, { argTypes }) => ({
  props: Object.keys(argTypes),
  components: { Breadcrumb },
  setup: () => ({ args }),
  template: templateStr,
});

export const Primary = Template.bind({});
Primary.args = {
  startName: "Dashboard",
  iconSrc: `/${iconOverview}`,
};
Primary.parameters = {
  docs: {
    source: {
      code: templateStr,
    },
  },
};
