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
    routeDecorator('/')
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
        <main-navigation-item title="Navigation Item 1" iconSrc="${args.iconSrc}" iconAltText="Overview icon" :slidOut="slotProps.slidOut" :sliding="slotProps.sliding" />
        <main-navigation-item title="Navigation Item 2" iconSrc="${args.iconSrc}" iconAltText="Overview icon" :collapsed="false" :slidOut="slotProps.slidOut" :sliding="slotProps.sliding">
          <main-navigation-child-item title="Child Item 1" to="/us-verifications" />
          <main-navigation-child-item title="Child Item 2" to="/intl-verifications" />
        </main-navigation-item>
      </template>
    </main-navigation>
  `
});

export const Primary = Template.bind({});
Primary.args = {
  iconSrc: iconOverview
};
