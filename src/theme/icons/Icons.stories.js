import Icons from './Icons.vue';
import mdx from './Icons.mdx';

export default {
  title: 'Theme (Dev Only)/Icons',
  component: Icons,
  parameters: {
    docs: {
      page: mdx
    }
  },
  argTypes: {
    size: {
      options: ['xxl', 'xl', 'l', 'm', 's'],
      control: {
        type: 'select'
      }
    },
    storyOnlyColorClass: {
      options: ['black', 'gray-500', 'blue-500', 'purple-500', 'red-500', 'orange-500', 'yellow-500', 'green-500'],
      control: {
        type: 'select'
      }
    }
  }
};

const Template = (args, { argTypes }) => ({
  props: Object.keys(argTypes),
  components: { Icons },
  setup: () => ({ args }),
  template: '<div style="width:80vw;"><Icons :size="args.size" :storyOnlyColorClass="args.storyOnlyColorClass"/></div>'
});

export const Primary = Template.bind({});
Primary.args = {
  size: 'm',
  storyOnlyColorClass: 'black'
};
