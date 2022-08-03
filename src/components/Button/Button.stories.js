import LobButton from './Button.vue';
import mdx from './Button.mdx';
import { Plus, Download } from '@/components/Icons';

export default {
  title: 'Components/Button',
  component: LobButton,
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
      description: 'Content to display inside of the button',
      table: {
        defaultValue: 'This is a button',
        type: {
          summary: 'html or component'
        }
      }
    },
    variant: {
      options: ['primary', 'secondary', 'link', 'subtle'],
      control: {
        type: 'select'
      }
    },
    warning: {
      control: {
        type: 'boolean'
      }
    },
    small: {
      control: {
        type: 'boolean'
      }
    }
  }
};

const Template = (args, { argTypes }) => ({
  props: Object.keys(argTypes),
  components: { LobButton },
  setup: () => ({ args }),
  template: '<lob-button v-bind="args" v-slot>{{ args.content }}</lob-button>'
});

export const Default = Template.bind({});
Default.args = {
  content: 'This is a button'
};

const WithIconsTemplate = (args, { argTypes }) => ({
  props: Object.keys(argTypes),
  components: { LobButton, Download, Plus },
  setup: () => ({ args }),
  template: `<lob-button v-bind="args"> 
              <Download class="w-6 h-6" style="margin-right:10px;"/>
              {{ args.content }} 
              <Plus class="w-6 h-6" style="margin-left:10px;"/>
            </lob-button>`
});

export const WithIcons = WithIconsTemplate.bind({});
WithIcons.args = {
  content: 'This is a button'
};
