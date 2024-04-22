import { Meta, StoryObj } from '@storybook/vue3';
import mdx from './Overlay.mdx';
import Button from '../Button/Button.vue';
import Overlay from './Overlay.vue';
import routeDecorator, {
  routeTemplate
} from '../../../.storybook/routeDecorator';
import { ref } from 'vue';

const meta: Meta<typeof Overlay> = {
  title: 'Components/Overlay',
  component: Overlay,
  decorators: [
    routeDecorator('/', [
      {
        path: '/internal',
        name: 'InternalLink',
        component: {
          template: routeTemplate('internal')
        }
      }
    ])
  ],
  parameters: {
    docs: {
      page: mdx
    }
  }
};

export default meta;

export const Primary: StoryObj<typeof Overlay> = {
  render: (args) => ({
    components: { Button, Overlay },
    setup: () => {
      const overlay = ref();
      return { args, overlay };
    },
    template: `
      <Button @click="overlay?.toggle">Toggle Overlay</Button>
      <Overlay v-bind="args" ref="overlay">
        <p>Example Overlay content</p>
        <p>Some more Overlay content</p>
      </Overlay>
    `
  })
};
