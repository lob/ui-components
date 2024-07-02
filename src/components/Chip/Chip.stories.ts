import Chip from './Chip.vue';
import mdx from './Chip.mdx';
import { IconName } from '@/components/Icon';
import { StoryFn } from '@storybook/vue3';
import { ChipColor, ChipSize, ChipVariant } from './constants';

export default {
  title: 'Components/Chip',
  component: Chip,
  parameters: {
    docs: {
      page: mdx
    }
  },
  argTypes: {
    color: {
      options: Object.values(ChipColor),
      control: {
        type: 'select'
      },
      table: {
        type: {
          summary: Object.values(ChipColor).join(' | ')
        }
      }
    },
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
    size: {
      options: Object.values(ChipSize),
      control: {
        type: 'select'
      },
      table: {
        type: {
          summary: Object.values(ChipSize).join(' | ')
        }
      }
    },
    variant: {
      options: Object.values(ChipVariant),
      control: {
        type: 'select'
      },
      table: {
        type: {
          summary: Object.values(ChipVariant).join(' | ')
        }
      }
    }
  }
};

const AllChipsTemplate: StoryFn = (args, { argTypes }) => ({
  props: Object.keys(argTypes),
  components: { Chip },
  setup: () => ({
    colors: Object.values(ChipColor),
    sizes: Object.values(ChipSize),
    variants: Object.values(ChipVariant)
  }),
  template: `
    <div v-for="(variant, variantIndex) in variants" class="flex flex-col gap-2 items-center justify-center">
      <div v-for="(color, colorIndex) in colors" class="flex flex-row gap-2 items-center justify-center">
        <div v-for="(size, sizeIndex) in sizes" class="flex items-center justify-center">
          <Chip :color :key="\`chip-\${variant}-\${size}-\${color}\`" :size :variant icon="Envelope" />
        </template>
      </template>
    </template>
  `
});

export const AllChips = AllChipsTemplate.bind({});

const Template: StoryFn = (args, { argTypes }) => ({
  props: Object.keys(argTypes),
  components: { Chip },
  setup: () => ({ args }),
  template: '<Chip v-bind="args" />'
});

export const Primary = Template.bind({});
Primary.args = {
  icon: IconName.ENVELOPE
};
