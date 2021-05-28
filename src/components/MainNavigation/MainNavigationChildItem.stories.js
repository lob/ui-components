import routeDecorator from '../../../.storybook/routeDecorator';

import MainNavigationItem from './MainNavigationItem.vue';
import MainNavigationChildItem from './MainNavigationChildItem.vue';
import mdx from './MainNavigationChildItem.mdx';
import iconOverview from '../../assets/images/iconOverview.svg';

export default {
  title: 'Components/Main Navigation/Child Item',
  component: MainNavigationChildItem,
  decorators: [(_storyFn, context) => {
    const { args } = context;
    return {
      components: { MainNavigationItem },
      template: `
        <ul style="width: 222px;" class="bg-offWhite">
          <main-navigation-item :collapsed="false" title="Navigation Item" iconSrc="/${args.iconSrc}" iconAltText="Overview icon">
            <story />
          </main-navigation-item>
        </ul>
      `
    };
  }],
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
  components: { MainNavigationChildItem, MainNavigationItem },
  template: '<main-navigation-child-item v-bind="$props" />'
});

export const Primary = Template.bind({});
Primary.args = {
  title: 'Child item one',
  to: '/overview/child',
  iconSrc: iconOverview
};
Primary.decorators = [routeDecorator('/')];

export const PrimaryActive = Template.bind({});
PrimaryActive.args = {
  title: 'Child item one',
  to: '/overview/child',
  iconSrc: iconOverview
};
PrimaryActive.decorators = [routeDecorator('/overview/child')];

