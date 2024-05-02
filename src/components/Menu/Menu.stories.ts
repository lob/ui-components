import { Meta, StoryObj } from '@storybook/vue3';
import mdx from './Menu.mdx';
import routeDecorator, {
  routeTemplate
} from '../../../.storybook/routeDecorator';
import { IconName } from '../Icon';
import Button from '../Button/Button.vue';
import Menu from './Menu.vue';
import { ref } from 'vue';

const meta: Meta<typeof Menu> = {
  title: 'Components/Menu',
  component: Menu,
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
  },
  argTypes: {
    items: {
      table: {
        type: {
          summary: 'MenuItem[]'
        }
      }
    }
  }
};

export default meta;

export const Primary: StoryObj<typeof Menu> = {
  render: (args) => ({
    components: { Button, Menu },
    setup: () => {
      const menu = ref();
      return { args, menu };
    },
    template: `
      <Button @click="menu?.toggle">Toggle Menu</Button>
      <Menu v-bind="args" ref="menu" />
    `
  }),
  args: {
    items: [
      {
        label: 'Create (External Link)',
        to: 'https://google.com',
        target: '_blank',
        key: 'test1',
        icon: IconName.PLUS
      },
      {
        label: 'Duplicate',
        clickHandler: () => console.log('Duplicated'),
        key: 'test1',
        icon: IconName.DUPLICATE
      },
      {
        label: 'Edit',
        clickHandler: () => console.log('Edited'),
        key: 'test2',
        icon: IconName.EDIT
      },
      {
        label: 'Delete',
        clickHandler: () => console.log('Deleted'),
        key: 'test3',
        icon: IconName.DELETE,
        disabled: true
      }
    ]
  }
};
