import Textarea from './Textarea.vue';
import mdx from './Textarea.mdx';

export default {
  title: 'Components/Textarea',
  component: Textarea,
  parameters: {
    docs: {
      page: mdx
    }
  },
  argTypes: {
    'v-model': {
      control: {
        type: null
      }
    }
  }
};

const textareaVModel = '';

const Template = (args, { argTypes }) => ({
  props: Object.keys(argTypes),
  components: {  Textarea },
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
  tooltipContent: 'Add a description for your campaign'
};
