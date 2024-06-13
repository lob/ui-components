import { Meta, StoryObj } from '@storybook/vue3';
import mdx from './KeyValueInput.mdx';
// @ts-ignore No types from Vue file
import KeyValueInput from './KeyValueInput.vue';

const meta: Meta<typeof KeyValueInput> = {
  title: 'Components/KeyValueInput',
  component: KeyValueInput,
  parameters: {
    docs: {
      page: mdx
    }
  }
};

export default meta;

const keyValueModel: [string, string][] = [];

export const Primary: StoryObj<typeof KeyValueInput> = {
  args: {
    label: 'Key Value Input'
  },
  render: (args) => ({
    components: { KeyValueInput },
    data: () => ({ keyValueModel }),
    setup: () => ({ args }),
    template: `<KeyValueInput v-bind="args" v-model="keyValueModel" style="width: 30rem;" />`
  })
};
