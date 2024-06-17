import { Meta, StoryFn } from '@storybook/vue3';
import mdx from './Skeleton.mdx';
// @ts-ignore No types from Vue file
import Skeleton from './Skeleton.vue';

const meta: Meta<typeof Skeleton> = {
  title: 'Components/Skeleton',
  component: Skeleton,
  parameters: {
    docs: {
      page: mdx
    }
  }
};

export default meta;

const Template: StoryFn = (args, { argTypes }) => ({
  components: { Skeleton },
  setup: () => ({ args }),
  template: `
    <div style="width: 500px;">
      <Skeleton v-bind="args">
        <template #header>Metadata</template>
        <template #default>
          <ul>
            <li>City: Chicago</li>
            <li>State: Illinois</li>
            <li>Country: United States</li>
          </ul>
        </template>
      </Panel>
    </div>
  `
});

export const Primary = Template.bind({});
