import LobLabel from './LobLabel.vue';
import TextInput from '../TextInput/TextInput.vue';
import mdx from './LobLabel.mdx';

export default {
  title: 'Components/LobLabel',
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

const WithTextInputTemplate = (args, { argTypes }) => ({
  props: Object.keys(argTypes),
  components: { LobLabel, TextInput },
  setup: () => ({ args }),
  template: `
    <lob-label v-bind="args"/>
    <text-input id="1" placeholder="Name" label="Name" srOnlyLabel/>
  `
});

export const WithTextInput = WithTextInputTemplate.bind({});
WithTextInput.args = {
  label: 'Name',
  labelFor: 'Name',
  required: true
};

const WithNestedInputTemplate = (args, { argTypes }) => ({
  props: Object.keys(argTypes),
  components: { LobLabel, TextInput },
  setup: () => ({ args }),
  template: `
    <lob-label v-bind="args">
    <text-input id="1" placeholder="Name" label="Name" srOnlyLabel/>
    </lob-label>
  `
});

export const WithNestedInput = WithNestedInputTemplate.bind({});
WithNestedInput.args = {
  label: 'Name',
  labelFor: 'Name',
  required: true
};
