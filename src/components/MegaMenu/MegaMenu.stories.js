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
  argTypes: {}
};

const Template = (args, { argTypes }) => ({
  props: Object.keys(argTypes),
  components: { MegaMenu, MegaMenuItem },
  setup: () => ({ args }),
  template: `
    <MegaMenu v-bind="args">
      <MegaMenuItem id="1" to="/settings/main/account" :imageSource="$getConst('lobAssetsUrl')+'/dashboard/navbar/settings.svg'" small>
        Some text
      </MegaMenuItem>
    </MegaMenu>
    `
});

export const Primary = Template.bind({});
Primary.args = {
  title: 'Products',
  smaller: true,
  navKey: '',
  mobileNavs: {},
  id: '1'
};

const ItemTemplate = (args, { argTypes }) => ({
  props: Object.keys(argTypes),
  components: { MegaMenuItem },
  setup: () => ({ args }),
  template: `
    <MegaMenuItem v-bind="args" :imageSource="$getConst('lobAssetsUrl')+'/dashboard/navbar/settings.svg'">
      Some text
    </MegaMenuItem>
    `
});

export const Item = ItemTemplate.bind({});
Item.args = {
  to: '/settings/main/account',
  small: true
};
