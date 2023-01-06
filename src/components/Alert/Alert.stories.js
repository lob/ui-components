import Alert from './Alert.vue';
import LobLink from '../Link/Link.vue';
import mdx from './Alert.mdx';

export default {
  title: 'Components/Alert',
  component: Alert,
  parameters: {
    docs: {
      page: mdx
    }
  },
  argTypes: {
    content: {
      control: {
        type: 'text'
      },
      description: 'Content to display inside of the card',
      table: {
        defaultValue: 'I am a card.',
        type: {
          summary: 'html or component'
        }
      }
    },
    variant: {
      options: ['info', 'success', 'warning', 'error'],
      control: {
        type: 'select'
      }
    }
  }
};

const Template = (args, { argTypes }) => ({
  props: Object.keys(argTypes),
  components: { Alert, LobLink },
  setup: () => ({ args }),
  template: `
    <alert v-bind="args">
      <template v-slot:default>
        {{ args.content }} 
        <br> This is an extra line of random text.
        </template>
    </alert>
  `
});
const content = 'You are in LIVE mode, all verifications will be charged according to your chosen plan.';

export const Primary = Template.bind({});
Primary.args = { content };

const TemplateWithHeading = (args, { argTypes }) => ({
  props: Object.keys(argTypes),
  components: { Alert, LobLink },
  setup: () => ({ args }),
  template: `
    <alert v-bind="args">
      <template v-slot:heading> Alert title! </template>
      <template v-slot:default>
        {{ args.content }} 
        <br> This is an extra line of random text.
      </template>
    </alert>
  `
});
export const WithHeading = TemplateWithHeading.bind({});
WithHeading.args = { content };

const TemplateHeadingOnly = (args, { argTypes }) => ({
  props: Object.keys(argTypes),
  components: { Alert, LobLink },
  setup: () => ({ args }),
  template: `
  <div style="width: 500px">
    <alert v-bind="args">
      <template v-slot:heading> Alert title! </template>
    </alert>
  </div>
  `
});

export const WithLink = TemplateHeadingOnly.bind({});
WithLink.args = {
  linkSrc: 'https://www.lob.com/'
};

export const WithCloseButton = TemplateWithHeading.bind({});
WithCloseButton.args = {
  content,
  showCloseButton: true
};

export const WithCloseAndLink = TemplateWithHeading.bind({});
WithCloseAndLink.args = {
  content,
  showCloseButton: true,
  linkSrc: 'https://www.lob.com/'
};
