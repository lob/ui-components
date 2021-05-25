import FontSizes from './FontSizes.vue';
import mdx from './FontSizes.mdx';

export default {
  title: 'Theme/FontSizes',
  component: FontSizes,
  parameters: {
    docs: {
      page: mdx
    }
  }
};

const Template = (args, { argTypes }) => ({
  props: Object.keys(argTypes),
  components: { FontSizes },
  template: '<font-sizes></font-sizes>'
});

export const Primary = Template.bind({});
