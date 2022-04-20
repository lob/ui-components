import NewButton from './NewButton.vue';
import mdx from './NewButton.mdx';
import { Plus, Download } from '@/components/Icons';

export default {
  title: 'Components/NewButton',
  component: NewButton,
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
      options: ['primary', 'secondary'],
      control: {
        type: 'select'
      }
    },
    warning: {
      control: {
        type: 'boolean'
      }
    }
  }
};

const Template = (args, { argTypes }) => ({
  props: Object.keys(argTypes),
  components: { NewButton },
  setup: () => ({ args }),
  template: '<new-button v-bind="args" v-slot>{{ args.content }}</new-button>'
});

export const Default = Template.bind({});
Default.args = {
  content: 'This is a button'
};

const WithIconsTemplate = (args, { argTypes }) => ({
  props: Object.keys(argTypes),
  components: { NewButton, Download, Plus },
  setup: () => ({ args }),
  template: `<new-button v-bind="args"> 
              <Download class="w-6 h-6 text-white" style="margin-right:10px;"/>
              {{ args.content }} 
              <Plus class="w-6 h-6 text-white" style="margin-left:10px;"/>
            </new-button>`
});

export const WithIcons = WithIconsTemplate.bind({});
WithIcons.args = {
  content: 'This is a button'
};
