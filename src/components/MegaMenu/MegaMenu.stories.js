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

const Template = (args, { argTypes }) => ({
  props: Object.keys(argTypes),
  components: { MegaMenuItem },
  template: `
  <MegaMenuItem v-bind="$props">
    Some text
  </MegaMenuItem>`
});

export const Primary = Template.bind({});
Primary.args = {
  to: '/settings/main/account',
  imageSource: `${constants.lobAssetsUrl}/dashboard/navbar/settings.svg`,
  small: true
};
