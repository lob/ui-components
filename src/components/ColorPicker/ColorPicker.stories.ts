import type { Meta, StoryObj } from '@storybook/vue3';
import ColorPickerType from '@/components/ColorPicker/ColorPicker';
import ColorPicker from '@/components/ColorPicker/ColorPicker.vue';
import mdx from './ColorPicker.mdx';

const meta: Meta<typeof ColorPickerType> = {
  title: 'Components/Color Picker',
  component: ColorPicker,
  parameters: {
    docs: {
      page: mdx
    }
  }
};

export default meta;

type Story = StoryObj<typeof ColorPickerType>;

export const Default: Story = {
  args: {
    inputId: 'colorpicker-demo',
    defaultColor: '#000000'
  }
};

export const NoHexInput: Story = {
  args: {
    inputId: 'colorpicker-demo--no-hex-input',
    defaultColor: '#000000',
    showHexInput: false
  }
};

export const Inline: Story = {
  args: {
    inputId: 'colorpicker-demo--inline',
    defaultColor: '#000000',
    inline: true
  }
};

export const InlineNoHexInput: Story = {
  args: {
    inputId: 'colorpicker-demo--inline',
    defaultColor: '#000000',
    inline: true,
    showHexInput: false
  }
};
