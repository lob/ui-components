import Icon from './Icon.vue';
// @ts-expect-error No types.
import mdx from './Icon.mdx';
import { IconName, IconSize } from '../Icon/types';

export default {
  title: 'Components/Icon',
  component: Icon,
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
      }
    },
    size: {
      options: Object.keys(IconSize),
      control: {
        type: 'select'
      }
    }
  }
};

const PrimaryTemplate = (args, { argTypes }) => ({
  props: Object.keys(argTypes),
  components: { Icon },
  setup: () => ({ args }),
  template: `<Icon :icon="args.icon" :size="args.size" :sizeOverride="args.sizeOverride" />`
});

export const Primary = PrimaryTemplate.bind({});
Primary.args = {
  icon: IconName.MONEY_BILL,
  size: 'xxl',
  sizeOverride: undefined
};

const AllIconsTemplate = (args, { argTypes }) => ({
  props: Object.keys(argTypes),
  components: { Icon },
  setup: () => ({ args }),
  template: `
  <div style="display: grid; grid-template-columns: repeat(15, 1fr); gap: 1rem; justify-content: center; align-items: center;">
    ${Object.values(IconName)
      .sort((a, b) => a - b)
      .map(
        (icon) =>
          `<div class="flex flex-col justify-center items-center gap-2"><Icon icon="${icon}" :size="args.size" :sizeOverride="args.sizeOverride" /><p class="text-xs">${icon}</p></div>`
      )
      .join('')}
  </div>`
});
export const AllIcons = AllIconsTemplate.bind({});
AllIcons.args = {
  size: 'xxl',
  sizeOverride: 24
};
