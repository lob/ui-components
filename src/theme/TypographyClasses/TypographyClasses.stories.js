import TypographyClasses from './TypographyClasses.vue';
import mdx from './TypographyClasses.mdx';

export default {
  title: 'Theme (Dev Only)/Typography Classes',
  component: TypographyClasses,
  parameters: {
    docs: {
      page: mdx
    }
  }
};

const Template = () => ({
  components: { TypographyClasses },
  template: '<TypographyClasses/>'
});

export const Primary = Template.bind({});
