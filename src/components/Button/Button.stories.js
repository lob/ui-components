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
      options: [
        'primary',
        'upgrade',
        'secondary',
        'danger',
        'danger-secondary',
        'quiet',
        'ghost',
        'link'
      ],
      control: {
        type: 'select'
      }
    },
    size: {
      options: ['small', 'medium', 'large', 'xl'],
      control: {
        type: 'select'
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

export const Primary = Template.bind({});
Primary.args = {
  content: 'Primary button'
};

export const Upgrade = Template.bind({});
Upgrade.args = {
  content: 'Upgrade button',
  variant: 'upgrade'
};

export const Secondary = Template.bind({});
Secondary.args = {
  content: 'Secondary button',
  variant: 'secondary'
};

export const Danger = Template.bind({});
Danger.args = {
  content: 'Danger button',
  variant: 'danger'
};

export const DangerSecondary = Template.bind({});
DangerSecondary.args = {
  content: 'Danger secondary button',
  variant: 'danger-secondary'
};

export const Quiet = Template.bind({});
Quiet.args = {
  content: 'Quiet button',
  variant: 'quiet'
};

export const Ghost = Template.bind({});
Ghost.args = {
  content: 'Ghost button',
  variant: 'ghost'
};

export const StyledAsLink = Template.bind({});
StyledAsLink.args = {
  content: 'Styled as link',
  variant: 'link'
};

const WithIconsTemplate = (args, { argTypes }) => ({
  props: Object.keys(argTypes),
  components: { LobButton, Download, Plus },
  setup: () => ({ args }),
  template: `<lob-button v-bind="args"> 
              <Download style="margin-right:10px;"/>
              {{ args.content }} 
              <Plus style="margin-left:10px;"/>
            </lob-button>`
});

export const WithIcons = WithIconsTemplate.bind({});
WithIcons.args = {
  content: 'This is a button'
};
