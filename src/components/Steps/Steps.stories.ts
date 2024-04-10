import { Meta, StoryObj } from '@storybook/vue3';
import mdx from './Steps.mdx';
// @ts-ignore No types from Vue file
import Steps from './Steps.vue';

const meta: Meta<typeof Steps> = {
  title: 'Components/Steps',
  component: Steps,
  parameters: {
    docs: {
      page: mdx
    }
  }
};

export default meta;

export const Primary: StoryObj<typeof Steps> = {
  args: {
    items: [
      { label: 'Step 1', status: 'success' },
      { label: 'Step 2' },
      { label: 'Step 3' }
    ]
  }
};
