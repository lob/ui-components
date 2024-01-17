import ComponentClasses from './ComponentClasses.vue';
import mdx from './ComponentClasses.mdx';

export default {
  title: 'Theme (Dev Only)/Component Classes',
  component: ComponentClasses,
  parameters: {
    docs: {
      page: mdx
    }
  }
};

const Template = () => ({
  components: { ComponentClasses },
  template: '<ComponentClasses/>'
});

export const Primary = Template.bind({});
