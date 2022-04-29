import MegaButton from './MegaButton.vue';
import mdx from './MegaButton.mdx';

export default {
  title: 'Components/Mega Button',
  component: MegaButton,
  parameters: {
    docs: {
      page: mdx
    }
  }
};

const Template = (args, { argTypes }) => ({
  props: Object.keys(argTypes),
  components: { MegaButton },
  setup: () => ({ args }),
  template: '<MegaButton v-bind="args"></MegaButton>'
});

export const Primary = Template.bind({});
Primary.args = {
  name: 'cat-type',
  id: 'calico',
  label: 'Calico',
  value: 'calico',
  disabled: false,
  disabledBanner: null,
  text: null
};

export const WithText = Template.bind({});
WithText.args = {
  name: 'cat-type',
  id: 'ginger',
  value: 'ginger',
  label: 'Ginger',
  disabled: false,
  disabledBanner: null,
  text: 'The himbos of the cat world'
};

export const Disabled = Template.bind({});
Disabled.args = {
  name: 'cat-type',
  id: 'void',
  value: 'void',
  label: 'Voidcat',
  disabled: true,
  disabledBanner: 'Hiding in closet!',
  text: 'Like a loveable little black hole that sheds on your white jeans'
};

export const WithImage = Template.bind({});
WithImage.args = {
  name: 'cat-type',
  id: 'floof',
  value: 'floof',
  label: 'Floofcat',
  disabled: false,
  disabledBanner: null,
  text: 'Probably a pillow',
  imageSource: 'https://upload.wikimedia.org/wikipedia/commons/e/e4/Cymric_-_Norwegian_forest_cat_presentation_show_Kotka_2009-02-01_IMG_0687.JPG'
};

