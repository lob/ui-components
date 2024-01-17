import FontSize from './FontSize.vue';
import mdx from './FontSize.mdx';

export default {
  title: 'Theme (Dev Only)/Font Size',
  component: FontSize,
  parameters: {
    docs: {
      page: mdx
    }
  }
};

const Template = () => ({
  components: { FontSize },
  template: '<FontSize/>'
});

export const Primary = Template.bind({});
