import { IconName } from '../Icon/types';
import Badge from './Badge.vue';
import mdx from './Badge.mdx';
import { BadgeColor, BadgeSize, BadgeVariant } from './constants';

export default {
  title: 'Components/Badge',
  component: Badge,
  parameters: {
    docs: {
      page: mdx
    }
  },
  argTypes: {
    color: {
      options: Object.values(BadgeColor),
      control: {
        type: 'select'
      },
      table: {
        type: {
          summary: Object.values(BadgeColor).join(' | ')
        }
      }
    },
    content: {
      control: {
        type: 'text'
      },
      description: 'Slot content',
      table: {
        type: {
          summary: 'string | Vue.Component'
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
      options: Object.values(BadgeVariant),
      control: {
        type: 'select'
      },
      table: {
        type: {
          summary: Object.values(BadgeVariant).join(' | ')
        }
      }
    },
    size: {
      options: Object.values(BadgeSize),
      control: {
        type: 'select'
      },
      table: {
        type: {
          summary: Object.values(BadgeSize).join(' | ')
        }
      }
    }
  }
};

const Template = (args, { argTypes }) => ({
  props: Object.keys(argTypes),
  components: { Badge },
  setup: () => ({ args }),
  template: '<Badge v-slot v-bind="args">{{ args.content }}</Badge>'
});

export const Primary = Template.bind({});
Primary.args = {
  content: 'Badge'
};

const AllBadgesTemplate = (args) => ({
  components: { Badge },
  setup: () => ({ args }),
  template: `<div class="flex flex-col gap-4 items-center">
    ${Object.values(BadgeVariant)
      .map(
        (variant) =>
          `<div class="flex gap-2">
        ${Object.values(BadgeColor)
          .map(
            (color) =>
              `<div class="flex flex-col gap-2 items-center">
            ${Object.values(BadgeSize)
              .map(
                (size) =>
                  `<Badge variant="${variant}" color="${color}" size="${size}">Badge</Badge>`
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
export const AllBadges = AllBadgesTemplate.bind({});
AllBadges.args = {
  content: 'Badge text.'
};
