import routeDecorator, {
  routeTemplate
} from '../../../.storybook/routeDecorator';
import TopNavDropdown from './TopNavDropdown.vue';
import TopNavDropdownItem from './TopNavDropdownItem.vue';
import mdx from './TopNavDropdown.mdx';
import { Signal, Map, CircleQuestion } from '../Icons';

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
  components: {
    TopNavDropdown,
    TopNavDropdownItem,
    Signal,
    Map,
    CircleQuestion
  },
  setup: () => ({ args }),
  template: `
    <TopNavDropdown v-bind="args">
      <TopNavDropdownItem id="api" to="/settings/main/account">
        <template #icon> <Signal/> </template>
        API Status
      </TopNavDropdownItem>
      <TopNavDropdownItem id="help" to="/settings/main/account">
        <template #icon> <Map/> </template>
        Help Center
      </TopNavDropdownItem>
      <TopNavDropdownItem disabled id="support" to="/settings/main/account">
        <template #icon> <CircleQuestion/> </template>
        Support & FAQ
      </TopNavDropdownItem>
    </TopNavDropdown>
    `
});

export const Primary = Template.bind({});
Primary.args = {
  title: 'Resources',
  id: '1',
  open: false
};

const WithoutIcons = (args, { argTypes }) => ({
  props: Object.keys(argTypes),
  components: {
    TopNavDropdown,
    TopNavDropdownItem,
    Signal,
    Map,
    CircleQuestion
  },
  setup: () => ({ args }),
  template: `
    <TopNavDropdown v-bind="args" navKey="">
      <TopNavDropdownItem id="api" to="/settings/main/account">
        API Status
      </TopNavDropdownItem>
      <TopNavDropdownItem id="help" to="/settings/main/account">
        Help Center
      </TopNavDropdownItem>
      <TopNavDropdownItem disabled id="support" to="/settings/main/account">
        Support & FAQ
      </TopNavDropdownItem>
    </TopNavDropdown>
    `
});

export const WithoutItemIcons = WithoutIcons.bind({});
WithoutItemIcons.args = {
  title: 'Resources',
  id: '1',
  open: false
};

const IconDropdownTemplate = (args, { argTypes }) => ({
  props: Object.keys(argTypes),
  components: {
    TopNavDropdown,
    TopNavDropdownItem,
    Signal,
    Map,
    CircleQuestion
  },
  setup: () => ({ args }),
  template: `
    <TopNavDropdown v-bind="args" navKey="">
      <TopNavDropdownItem id="api" to="/settings/main/account">
        API Status
      </TopNavDropdownItem>
      <TopNavDropdownItem id="help" to="/settings/main/account">
        Help Center
      </TopNavDropdownItem>
      <TopNavDropdownItem disabled id="support" to="/settings/main/account">
        Support & FAQ
      </TopNavDropdownItem>
    </TopNavDropdown>
    `
});

export const IconDropdown = IconDropdownTemplate.bind({});
IconDropdown.args = {
  id: '1',
  icon: Signal,
  iconProps: {
    size: 'xl'
  },
  showChevron: false,
  open: false
};

const ItemTemplate = (args, { argTypes }) => ({
  props: Object.keys(argTypes),
  components: { TopNavDropdownItem, Signal },
  setup: () => ({ args }),
  template: `
    <TopNavDropdownItem id="1" to="/settings/main/account" navKey="">
      <template #icon> <Signal/> </template>
      API Status
    </TopNavDropdownItem>
  `
});

export const Item = ItemTemplate.bind({});
Item.args = {
  to: '/settings/main/account',
  small: true
};
