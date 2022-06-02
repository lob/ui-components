import Textarea from './Textarea.vue';
import mdx from './Textarea.mdx';

import { Info } from '@/components/Icons';
import LobLabel from '@/components/LobLabel/LobLabel.vue';
import Tooltip from '@/components/Tooltip/Tooltip.vue';

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
  template: '<Textarea v-bind="args" v-model="textareaVModel"></Textarea>'
});

export const Primary = Template.bind({});
Primary.args = {
  id: 'textarea',
  label: 'Interesting text area',
  placeholder: 'Enter a fun fact'
};

const WithTooltipTemplate = (args, { argTypes }) => ({
  props: Object.keys(argTypes),
  components: { Textarea, Info, LobLabel, Tooltip },
  setup: () => ({ args }),
  data: () => ({ textareaVModel }),
  template: `
    <LobLabel
      label="Cat nicknames"
      labelFor="textarea"
      tooltipContent="This is another tooltip"
    >
      <template v-slot:tooltip>
        <Tooltip>
          <template #trigger>
            <Info class="w-5 h-5" />
          </template>
          <template #content>
            Cat
          </template>      
        </Tooltip>
      </template>
    </LobLabel>
    <Textarea v-bind="args" v-model="textareaVModel" />
  `
});

export const WithTooltip = WithTooltipTemplate.bind({});
WithTooltip.args = {
  id: 'textarea',
  placeholder: 'Please list at least 8 of your cat\'s most interesting nicknames'
};
