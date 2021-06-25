import Icons from './Icons.vue';
import mdx from './Icons.mdx';

export default {
  title: 'Theme (Dev Only)/Icons',
  component: Icons,
  parameters: {
    docs: {
      page: mdx
    }
  }
};

const Template = (args, { argTypes }) => ({
  props: Object.keys(argTypes),
  components: { Icons },
  template: '<icons></icons>'
});

export const Primary = Template.bind({});
