import Textarea from './Textarea.vue';
import mdx from './Textarea.mdx';
import { TextareaColor } from './constants';

export default {
  title: 'Components/Textarea',
  component: Textarea,
  parameters: {
    docs: {
      page: mdx
    }
  },
  argTypes: {
    color: {
      options: Object.values(TextareaColor),
      control: {
        type: 'select'
      },
      table: {
        type: {
          summary: Object.values(TextareaColor).join(' | ')
        }
      }
    },
    cols: {
      control: {
        type: 'number'
      }
    },
    disabled: {
      control: {
        type: 'boolean'
      }
    },
    id: {
      control: {
        type: 'text'
      }
    },
    label: {
      control: {
        type: 'text'
      }
    },
    maxlength: {
      control: {
        type: 'number'
      }
    },
    minlength: {
      control: {
        type: 'number'
      }
    },
    name: {
      control: {
        type: 'text'
      }
    },
    placeholder: {
      control: {
        type: 'text'
      }
    },
    readonly: {
      control: {
        type: 'boolean'
      }
    },
    required: {
      control: {
        type: 'boolean'
      }
    },
    rows: {
      control: {
        type: 'number'
      }
    },
    spellcheck: {
      control: {
        type: 'boolean'
      }
    }
  }
};

const textareaVModel = '';

const Template = (args, { argTypes }) => ({
  props: Object.keys(argTypes),
  components: { Textarea },
  setup: () => ({ args }),
  data: () => ({ textareaVModel }),
  template: `<div style="width: 400px;">
              <Textarea v-bind="args" v-model="textareaVModel"/>
            </div>`
});

export const Primary = Template.bind({});
Primary.args = {
  id: 'description',
  label: 'Description',
  placeholder: 'Add a description'
};

export const WithTooltip = Primary.bind({});
WithTooltip.args = {
  id: 'description',
  label: 'Description',
  placeholder: 'Add a description',
  tooltip: 'Add a description for your campaign'
};

export const WithHelperText = Primary.bind({});
WithHelperText.args = {
  id: 'description',
  label: 'Description',
  placeholder: 'Add a description',
  helper: 'Add a description for your campaign'
};
