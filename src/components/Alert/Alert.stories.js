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
      <template v-slot:default="{linkColor}">
        {{ args.content }}
        <span :class="linkColor">
          <LobLink bold inherit-text-color class="inline-flex">{{ args.link }}</LobLink>.
        </span>
      </template>
    </alert>
  `
});

export const Primary = Template.bind({});
Primary.args = {
  content:
    'You are in LIVE mode, all verifications will be charged according to your ',
  link: ' chosen plan',
  variant: 'info'
};
