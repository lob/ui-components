import TyporgaphyClasses from './TyporgaphyClasses.vue';
import mdx from './TyporgaphyClasses.mdx';

export default {
  title: 'Theme (Dev Only)/Typorgaphy Classes',
  component: TyporgaphyClasses,
  parameters: {
    docs: {
      page: mdx
    }
  }
};

const Template = () => ({
  components: { TyporgaphyClasses },
  template: '<TyporgaphyClasses/>'
});

export const Primary = Template.bind({});
