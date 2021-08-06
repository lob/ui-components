import LobLabel from './LobLabel.vue';
import mdx from './LobLabel.mdx';

export default {
  title: 'Components/Label',
  component: LobLabel,
  parameters: {
    docs: {
      page: mdx
    }
  },
  argTypes: {
    label: {
      control: {
        type: 'text'
      }
    }
  }
};

const WithInputTemplate = (args, { argTypes }) => ({
  props: Object.keys(argTypes),
  components: { LobLabel },
  setup: () => ({ args }),
  template: `
    <lob-label v-bind="args"/>
    <input class="border rounded p-2 text-gray-500" />
  `
});

export const WithInput = WithInputTemplate.bind({});
WithInput.args = {
  label: 'Name',
  labelFor: 'Name',
  required: true
};

const WithNestedInputTemplate = (args, { argTypes }) => ({
  props: Object.keys(argTypes),
  components: { LobLabel },
  setup: () => ({ args }),
  template: `
    <lob-label v-bind="args">
    <input class="border rounded p-2 text-gray-500" />
    </lob-label>
  `
});

export const WithNestedInput = WithNestedInputTemplate.bind({});
WithNestedInput.args = {
  label: 'Name',
  labelFor: 'Name',
  required: true
};
