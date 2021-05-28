import routeDecorator from '../../../.storybook/routeDecorator';

import MainNavigation from './MainNavigation.vue';
import MainNavigationItem from './MainNavigationItem.vue';
import MainNavigationChildItem from './MainNavigationChildItem.vue';
import mdx from './MainNavigation.mdx';
import iconOverview from '../../assets/images/iconOverview.svg';

export default {
  title: 'Components/Main Navigation',
  component: MainNavigation,
  decorators: [
    () => ({ template: '<div class="block bg-offWhite"><story /></div>' }),
    routeDecorator()
  ],
  parameters: {
    docs: {
      page: mdx
    }
  },
  argTypes: {
    iconSrc: {
      table: {
        disable: true
      },
      control: {
        disable: true
      }
    }
  }
};

const Template = (args, { argTypes }) => ({
  props: Object.keys(argTypes),
  components: { MainNavigation, MainNavigationChildItem, MainNavigationItem },
  template: `
    <main-navigation v-bind="$props">
      <template v-slot="slotProps">
        <main-navigation-item title="Navigation Item 1" iconSrc="${args.iconSrc}" iconAltText="Overview icon" to="/item-1" :slidOut="slotProps.slidOut" :sliding="slotProps.sliding" />
        <main-navigation-item title="Navigation Item 2" iconSrc="${args.iconSrc}" iconAltText="Overview icon" to="/item-2" :slidOut="slotProps.slidOut" :sliding="slotProps.sliding" />
        <main-navigation-item title="Navigation Item 3" iconSrc="${args.iconSrc}" iconAltText="Overview icon" :collapsed="false" :slidOut="slotProps.slidOut" :sliding="slotProps.sliding">
          <main-navigation-child-item title="Child Item 1" to="/child-1" />
          <main-navigation-child-item title="Child Item 2" to="/child-2" />
        </main-navigation-item>
        <main-navigation-item title="Navigation Item 4" iconSrc="${args.iconSrc}" iconAltText="Overview icon" :collapsed="false" :slidOut="slotProps.slidOut" :sliding="slotProps.sliding">
          <main-navigation-child-item title="Child Item 1" to="/child-3" />
          <main-navigation-child-item title="Child Item 2" to="/child-4" />
        </main-navigation-item>
      </template>
    </main-navigation>
  `
});

export const Primary = Template.bind({});
Primary.args = {
  iconSrc: iconOverview
};
