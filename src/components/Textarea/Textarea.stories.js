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

const WithTooltipTemplate = (args, { argTypes }) => ({
  props: Object.keys(argTypes),
  components: { Textarea, Info, LobLabel, Tooltip },
  setup: () => ({ args }),
  template: `
    <LobLabel
      label="Cat nicknames"
      labelFor="textarea"
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
    <Textarea v-bind="args" />
  `
});

export const WithTooltip = WithTooltipTemplate.bind({});
WithTooltip.args = {
  id: 'textarea',
  placeholder: 'Please list at least 8 of your cat\'s most interesting nicknames'
};
