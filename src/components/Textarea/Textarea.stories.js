import Textarea from './Textarea.vue';
import mdx from './Textarea.mdx';

import { Close } from '@/components/Icons';

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

const Template = (args, { argTypes }) => ({
  props: Object.keys(argTypes),
  components: {  Textarea },
  setup: () => ({ args }),
  template: '<Textarea v-bind="args"></Textarea>'
});

export const Primary = Template.bind({});
Primary.args = {
  id: 'textarea',
  label: 'Interesting text area',
  placeholder: 'Enter a fun fact'
};

const LabelIconTemplate = (args, { argTypes }) => ({
  props: Object.keys(argTypes),
  components: { Textarea, Close },
  setup: () => ({ args }),
  template: `
    <Textarea v-bind="args">
        <template v-slot:labelIcon>
          <close class="w-5 h-5" />
        </template>
    </Textarea>
  `,
});

export const LabelIcon = LabelIconTemplate.bind({});
LabelIcon.args = {
  id: "textarea",
  label: "Cat nicknames",
  placeholder: "Please list at least 8 of your cat's most interesting nicknames",
 };
