import routeDecorator from '../../../.storybook/routeDecorator';
import { constants } from '../../config';
import MegaMenu from './MegaMenu.vue';
import MegaMenuItem from './MegaMenuItem.vue';
import mdx from './MegaMenu.mdx';

export default {
  title: 'Components/MegaMenu',
  component: MegaMenu,
  subcomponents: { MegaMenuItem },
  decorators: [
    routeDecorator()
  ],
  parameters: {
    docs: {
      page: mdx
    }
  },
  argTypes: {
    content: {
    }
  }
};

const templateStr = `
  <MegaMenu v-bind="$props">
    <MegaMenuItem to="/settings/main/account" imageSource="${constants.lobAssetsUrl}/dashboard/navbar/settings.svg" small>
      Some text
    </MegaMenuItem>
  </MegaMenu>
`;
const Template = (args, { argTypes }) => ({
  props: Object.keys(argTypes),
  components: { MegaMenu, MegaMenuItem },
  template: templateStr
});

export const Primary = Template.bind({});
Primary.args = {
  title: 'Products',
  snug: true,
  navKey: '',
  mobileNavs: {}
};
Primary.parameters = {
  docs: {
    source: {
      code: templateStr
    }
  }
};

const itemTemplateStr = `
  <MegaMenuItem v-bind="$props">
    Some text
  </MegaMenuItem>
`;
const ItemTemplate = (args, { argTypes }) => ({
  props: Object.keys(argTypes),
  components: { MegaMenuItem },
  template: itemTemplateStr
});

export const Item = ItemTemplate.bind({});
Item.args = {
  to: '/settings/main/account',
  imageSource: `${constants.lobAssetsUrl}/dashboard/navbar/settings.svg`,
  small: true
};
Item.parameters = {
  docs: {
    source: {
      code: itemTemplateStr
    }
  }
};

