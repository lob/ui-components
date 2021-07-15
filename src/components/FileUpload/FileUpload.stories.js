import FileUpload from './FileUpload.vue';
// import mdx from './FileUpload.mdx';

export default {
  title: 'Components/FileUpload',
  component: FileUpload
  // parameters: {
  //   docs: {
  //     page: mdx
  //   }
  // },
};

const Template = (args, { argTypes }) => ({
  props: Object.keys(argTypes),
  components: { FileUpload },
  setup: () => ({ args }),
  template: '<FileUpload v-bind="args">Choose File</FileUpload>'
});

export const Primary = Template.bind({});
Primary.args = {
  id: 'file-upload',
  label: 'Choose File',
  accept: '.pdf'
};
