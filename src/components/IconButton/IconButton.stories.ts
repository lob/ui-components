import { Meta, StoryFn, StoryObj } from '@storybook/vue3';
import {
  IconButtonColor,
  IconButtonSize,
  IconButtonVariant
} from './constants';
import mdx from './IconButton.mdx';
// @ts-ignore No types from Vue file
import IconButton from './IconButton.vue';
import { IconName } from '../Icon/types';
import routeDecorator, {
  routeTemplate
} from '../../../.storybook/routeDecorator';

const meta: Meta<typeof IconButton> = {
  title: 'Components/IconButton',
  component: IconButton,
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
    color: {
      options: Object.values(IconButtonColor),
      control: {
        type: 'select'
      },
      table: {
        type: {
          summary: Object.values(IconButtonColor).join(' | ')
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
    variant: {
      options: Object.values(IconButtonVariant),
      control: {
        type: 'select'
      },
      table: {
        type: {
          summary: Object.values(IconButtonVariant).join(' | ')
        }
      }
    },
    size: {
      options: Object.values(IconButtonSize),
      control: {
        type: 'select'
      },
      table: {
        type: {
          summary: Object.values(IconButtonSize).join(' | ')
        }
      }
    },
    click: {
      table: {
        type: 'null'
      }
    }
  }
};

export default meta;

export const Primary: StoryObj<typeof IconButton> = {
  args: {
    icon: IconName.ENVELOPE
  }
};

export const AllIconButtons: StoryFn<typeof IconButton> = () => ({
  components: { IconButton },
  template: `<div class="flex flex-col gap-4 items-center">
    ${Object.values(IconButtonVariant)
      .map(
        (variant) =>
          `<div class="flex gap-2">
        ${Object.values(IconButtonColor)
          .map(
            (color) =>
              `<div class="flex flex-col gap-2 items-center">
            ${Object.values(IconButtonSize)
              .map(
                (size) =>
                  `<IconButton icon="Envelope" variant="${variant}" color="${color}" size="${size}" />`
              )
              .join('')}
          </div>`
          )
          .join('')}
      </div>`
      )
      .join('')}
  </div>`
});
