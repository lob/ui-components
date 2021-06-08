import routeDecorator, { routeTemplate } from '../../../.storybook/routeDecorator';
import MegaMenu from './MegaMenu.vue';
import MegaMenuItem from './MegaMenuItem.vue';
import mdx from './MegaMenu.mdx';

export default {
  title: 'Components/MegaMenu',
  component: MegaMenu,
  subcomponents: { MegaMenuItem },
  decorators: [
    routeDecorator('/', [
      {
        path: '/settings/main/account',
        component: {
          template: routeTemplate('account')
        }
      }
    ])
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
<MegaMenu v-bind="args">
  <MegaMenuItem to="/settings/main/account" :imageSource="$getConst('lobAssetsUrl')+'/dashboard/navbar/settings.svg'" small>
    Some text
  </MegaMenuItem>
</MegaMenu>
`;
const Template = (args, { argTypes }) => ({
  props: Object.keys(argTypes),
  components: { MegaMenu, MegaMenuItem },
  setup: () => ({ args }),
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
<MegaMenuItem v-bind="args" :imageSource="$getConst('lobAssetsUrl')+'/dashboard/navbar/settings.svg'">
  Some text
</MegaMenuItem>
`;
const ItemTemplate = (args, { argTypes }) => ({
  props: Object.keys(argTypes),
  components: { MegaMenuItem },
  setup: () => ({ args }),
  template: itemTemplateStr
});

export const Item = ItemTemplate.bind({});
Item.args = {
  to: '/settings/main/account',
  small: true
};
Item.parameters = {
  docs: {
    source: {
      code: itemTemplateStr
    }
  }
};

