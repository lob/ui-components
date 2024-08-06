import Chip from '../Chip/Chip.vue';
import RadioButton from './RadioButton.vue';
import RadioButtonGroup from './RadioButtonGroup.vue';
import mdx from './RadioButton.mdx';
import { RadioButtonVariant } from './constants';
import { IconName } from '../Icon';

export default {
  title: 'Components/Radio Button',
  component: RadioButton,
  parameters: {
    docs: {
      page: mdx
    }
  },
  argTypes: {
    icon: {
      options: Object.values(IconName),
      control: {
        type: 'select'
      },
      table: {
        type: {
          summary: Object.values(IconName).join(' | ')
        }
      }
    },
    variant: {
      options: Object.values(RadioButtonVariant),
      control: {
        type: 'select'
      },
      table: {
        type: {
          summary: Object.values(RadioButtonVariant).join(' | ')
        }
      }
    }
  }
};

const vModel = '';

const Template = (args, { argTypes }) => ({
  props: Object.keys(argTypes),
  components: { RadioButton },
  data: () => ({ vModel }),
  setup: () => ({ args }),
  template:
    '<RadioButton v-bind="args" v-model="vModel"><template #content>Some random text content for card</template></RadioButton>'
});

export const Primary = Template.bind({});
Primary.args = {
  name: 'postcard-size',
  src: 'https://via.placeholder.com/150',
  id: '4x6',
  label: '4x6',
  value: '4x6'
};

export const WithHelperText = Template.bind({});
WithHelperText.args = {
  name: 'postcard-size',
  id: '4x6',
  label: '4x6',
  value: '4x6',
  helperText: 'Standard Postcard Size and a second line of text'
};

export const WithIcon = Template.bind({});
WithIcon.args = {
  name: 'postcard-size',
  icon: 'Envelope',
  id: '4x6',
  label: '4x6',
  value: '4x6',
  variant: 'outlined'
};

const ChipTemplate = (args, { argTypes }) => ({
  props: Object.keys(argTypes),
  components: { Chip, RadioButton },
  data: () => ({ vModel }),
  setup: () => ({ args }),
  template:
    '<RadioButton v-bind="args" v-model="vModel"><template #content>Some random text content for card</template><template #chips><Chip icon="Envelope" color="upgrade" /></template></RadioButton>'
});

export const WithChip = ChipTemplate.bind({});
WithChip.args = {
  name: 'postcard-size',
  id: '4x6',
  label: '4x6',
  value: '4x6',
  variant: 'outlined'
};

const GroupTemplate = (args, { argTypes }) => ({
  props: Object.keys(argTypes),
  components: { RadioButton, RadioButtonGroup },
  data: () => ({ vModel }),
  setup: () => ({ args }),
  template: `<RadioButtonGroup v-bind="args.group">
      <RadioButton v-bind="args.input1" v-model="vModel"/>
      <RadioButton v-bind="args.input2" v-model="vModel" />
      <RadioButton v-bind="args.input3" v-model="vModel" />
    </RadioButtonGroup>`
});
export const Group = GroupTemplate.bind({});
Group.args = {
  group: {
    label: 'Postcard Size',
    description: 'Select a size for your postcard in the radio buttons below'
  },
  input1: {
    name: 'postcard-size',
    id: '4x6',
    label: '4x6',
    value: '4x6'
  },
  input2: {
    name: 'postcard-size-2',
    id: '5x7',
    label: '5x7',
    value: '5x7'
  },
  input3: {
    name: 'postcard-size-3',
    id: '6x9',
    label: '6x9',
    value: '6x9'
  }
};
export const OutlinedGroup = GroupTemplate.bind({});
OutlinedGroup.args = {
  group: {
    label: 'Postcard Size',
    description: 'Select a size for your postcard in the radio buttons below'
  },
  input1: {
    name: 'postcard-size',
    id: '4x6',
    label: '4x6',
    value: '4x6',
    variant: 'outlined'
  },
  input2: {
    name: 'postcard-size-2',
    id: '5x7',
    label: '5x7',
    value: '5x7',
    variant: 'outlined'
  },
  input3: {
    name: 'postcard-size-3',
    id: '6x9',
    label: '6x9',
    value: '6x9',
    variant: 'outlined'
  }
};
