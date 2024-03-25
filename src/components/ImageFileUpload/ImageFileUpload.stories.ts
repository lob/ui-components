import type { Meta, StoryObj } from '@storybook/vue3';
import ImageFileUpload from './ImageFileUpload.vue';
import mdx from './ImageFileUpload.mdx';

const meta: Meta<typeof ImageFileUpload> = {
  title: 'Components/Image File Upload',
  component: ImageFileUpload,
  parameters: {
    docs: {
      page: mdx
    }
  }
};

export default meta;

type Story = StoryObj<typeof ImageFileUpload>;

export const Default: Story = {
  args: {
    name: 'demo'
  }
};

export const FileSizeError: Story = {
  args: {
    name: 'demo-filesize-error',
    maxFileSize: 1
  }
};
