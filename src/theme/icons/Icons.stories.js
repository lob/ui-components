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

const Template = () => ({
  components: { Icons },
  template: '<Icons/>'
});

export const Primary = Template.bind({});
