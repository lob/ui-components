import TopNavbar from './TopNavbar.vue';
import mdx from './TopNavbar.mdx';
import routeDecorator from '../../../.storybook/routeDecorator';

export default {
  title: 'Components/TopNavbar',
  component: TopNavbar,
  parameters: {
    docs: {
      page: mdx
    }
  },
  decorators: [
    routeDecorator()
  ],
  argTypes: {
    content: {
      control: {
        type: 'text',
      },
      defaultValue: 'I am a top navbar.',
      description: 'Content to display inside of the navbar',
      table: {
        type: {
          summary: 'html or component'
        }
      }
    }
  },
};

const Template = (args, {argTypes}) => ({
  props: Object.keys(argTypes),
  components: { TopNavbar },
  template: `<topNavbar
      v-bind="$props"
  >Something</topNavbar>`,
});

export const Primary = Template.bind({});
Primary.args = {
}
