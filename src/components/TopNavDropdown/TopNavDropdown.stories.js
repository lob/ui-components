import routeDecorator, { routeTemplate } from '../../../.storybook/routeDecorator';
import TopNavDropdown from './TopNavDropdown.vue';
import TopNavDropdownItem from './TopNavDropdownItem.vue';
import mdx from './TopNavDropdown.mdx';

export default {
  title: 'Components/Top Nav Dropdown',
  component: TopNavDropdown,
  subcomponents: { TopNavDropdownItem },
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
  components: { TopNavDropdown, TopNavDropdownItem },
  setup: () => ({ args }),
  template: `
    <TopNavDropdown v-bind="args">
      <TopNavDropdownItem id="1" to="/settings/main/account" :imageSource="$getConst('lobAssetsUrl')+'/dashboard/navbar/settings.svg'" small>
        And some text
      </TopNavDropdownItem>
    </TopNavDropdown>
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
  components: { TopNavDropdownItem },
  setup: () => ({ args }),
  template: `
    <TopNavDropdownItem v-bind="args" :imageSource="$getConst('lobAssetsUrl')+'/dashboard/navbar/settings.svg'">
      Some text
    </TopNavDropdownItem>
    `
});

export const Item = ItemTemplate.bind({});
Item.args = {
  to: '/settings/main/account',
  small: true
};
