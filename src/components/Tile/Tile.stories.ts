import { Meta, StoryFn, StoryObj } from '@storybook/vue3';
import mdx from './Tile.mdx';
// @ts-ignore No types from Vue file
import Tile from './Tile.vue';
// @ts-ignore No types from Vue file
import TileGroup from './TileGroup.vue';
import { TileColor } from './constants';
import { TileSize } from './constants';

const meta: Meta<typeof Tile> = {
  title: 'Components/Tile',
  component: Tile,
  parameters: {
    docs: {
      page: mdx
    }
  },
  argTypes: {
    color: {
      options: Object.values(TileColor),
      control: {
        type: 'select'
      },
      table: {
        type: {
          summary: Object.values(TileColor).join(' | ')
        }
      }
    },
    size: {
      options: Object.values(TileSize),
      control: {
        type: 'select'
      },
      table: {
        type: {
          summary: Object.values(TileSize).join(' | ')
        }
      }
    }
  }
};

export default meta;

export const Primary: StoryObj<typeof Tile> = {
  render: (args) => ({
    components: { Tile },
    setup: () => ({ args }),
    template: `
      <Tile v-bind="args">
        <template #header>Total Volume</template>
        <template #default>193,038,282</template>
      </Tile>
    `
  })
};

export const AllTiles: StoryFn<typeof Tile> = () => ({
  components: { Tile },
  template: `<div class="flex flex-row gap-4 items-center">
  ${Object.values(TileColor)
    .map(
      (color) =>
        `<div class="flex flex-col gap-2 items-center">
      ${Object.values(TileSize)
        .map(
          (size) =>
            `<Tile color="${color}" size="${size}">
              <template #header>Total Volume</template>
              <template #default>193,038,282</template>
            </Tile>`
        )
        .join('')}
    </div>`
    )
    .join('')}
  </div>`
});

export const Group: StoryObj<typeof Tile> = {
  render: (args) => ({
    components: { Tile, TileGroup },
    setup: () => ({ args }),
    template: `
      <TileGroup>
        <Tile v-bind="args">
          <template #header>Total Volume</template>
          <template #default>193,038,282</template>
        </Tile>
        <Tile v-bind="args">
          <template #header>Total Spend</template>
          <template #default>$2,294.82</template>
        </Tile>
        <Tile v-bind="args">
          <template #header>Total Addresses</template>
          <template #default>89,284</template>
        </Tile>
      </TileGroup>
    `
  })
};
