import routeDecorator, { routeTemplate } from '../../../.storybook/routeDecorator';
import MegaMenu from './MegaMenu.vue';
import MegaMenuItem from './MegaMenuItem.vue';
import MegaMenuSubtitle from './MegaMenuSubtitle.vue';
import mdx from './MegaMenu.mdx';

export default {
  title: 'Components/Mega Menu',
  component: MegaMenu,
  subcomponents: { MegaMenuItem, MegaMenuSubtitle },
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
  components: { MegaMenu, MegaMenuItem, MegaMenuSubtitle },
  setup: () => ({ args }),
  template: `
    <MegaMenu v-bind="args">
      <MegaMenuSubtitle>A subtitle</MegaMenuSubtitle>
      <MegaMenuItem id="1" to="/settings/main/account" :imageSource="$getConst('lobAssetsUrl')+'/dashboard/navbar/settings.svg'" small>
        And some text
      </MegaMenuItem>
    </MegaMenu>
    `
});

export const Primary = Template.bind({});
Primary.args = {
  title: 'Products',
  id: '1',
  open: false
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
