import Colors from './Colors.vue';
import mdx from './Colors.mdx';

export default {
  title: 'Theme (Dev Only)/Colors',
  component: Colors,
  parameters: {
    docs: {
      page: mdx
    }
  }
};

const Template = (args, { argTypes }) => ({
  props: Object.keys(argTypes),
  components: { Colors },
  template: '<colors></colors>'
});

export const Primary = Template.bind({});
