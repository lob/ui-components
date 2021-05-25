import FontSize from './FontSize.vue';
import mdx from './FontSize.mdx';

export default {
  title: 'Theme (Dev Only)/FontSize',
  component: FontSize,
  parameters: {
    docs: {
      page: mdx
    }
  }
};

const Template = (args, { argTypes }) => ({
  props: Object.keys(argTypes),
  components: { FontSize },
  template: '<font-size></font-size>'
});

export const Primary = Template.bind({});
