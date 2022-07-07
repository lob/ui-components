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

const Template = () => ({
  components: { Colors },
  template: '<Colors/>'
});

export const Primary = Template.bind({});
