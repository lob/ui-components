import TypeClasses from './TypeClasses.vue';
import mdx from './TypeClasses.mdx';

export default {
  title: 'Theme (Dev Only)/Type Classes',
  component: TypeClasses,
  parameters: {
    docs: {
      page: mdx
    }
  }
};

const Template = () => ({
  components: { TypeClasses },
  template: '<TypeClasses/>'
});

export const Primary = Template.bind({});
