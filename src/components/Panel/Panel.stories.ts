import { Meta, StoryFn } from '@storybook/vue3';
import mdx from './Panel.mdx';
// @ts-ignore No types from Vue file
import Panel from './Panel.vue';

const meta: Meta<typeof Panel> = {
  title: 'Components/Panel',
  component: Panel,
  parameters: {
    docs: {
      page: mdx
    }
  }
};

export default meta;

const Template: StoryFn = (args, { argTypes }) => ({
  components: { Panel },
  setup: () => ({ args }),
  template: `
    <div style="width: 500px;">
      <Panel v-bind="args">
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
