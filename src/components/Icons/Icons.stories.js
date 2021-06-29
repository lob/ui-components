import * as allIcons from './index.js';
import mdx from './Icons.mdx';

export default {
  title: 'Components/Icons',
  parameters: {
    docs: {
      page: mdx
    }
  }
};

const Template = (args, { argTypes }) => ({
  props: Object.keys(argTypes),
  data: () => ({ allIcons }),
  setup: () => ({ args }),
  template: `
  <div v-for="icon in allIcons" class="h-24 w-28 inline-block border border-black">
    <p class="text-center py-1">{{ icon.name }} </p>
    <component :is="icon" class="h-12 w-12 block m-auto">
      Icon: {{ icon.name }}
    </component>
  </div>
  `
});

export const Primary = Template.bind({});
