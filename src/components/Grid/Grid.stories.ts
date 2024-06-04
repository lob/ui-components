import { Meta, StoryObj } from '@storybook/vue3';
import mdx from './Grid.mdx';
import Grid from './Grid.vue';
import GridItem from './GridItem.vue';
import routeDecorator, {
  routeTemplate
} from '../../../.storybook/routeDecorator';

const meta: Meta<typeof Grid> = {
  title: 'Components/Grid',
  component: Grid,
  subcomponents: { GridItem },
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

export const Primary: StoryObj<typeof Grid> = {
  render: (args) => ({
    components: { Grid, GridItem },
    setup: () => ({ args }),
    template: `
      <Grid>
        <GridItem
          v-for="_ in 7"
          src="https://images.squarespace-cdn.com/content/v1/5a28871dd74cff3b8aa5aa79/1570786491502-28VIIWBJ7OVHTN8IA46B/African+Sunset+4x3+web.jpg"
          alt="African Sunset"
          title="African Sunset"
          subtitle="Postcard 6x9"
          @click="console.log('click')"
        />
      </Grid>
    `
  })
};

export const Item: StoryObj<typeof GridItem> = {
  render: (args) => ({
    components: { GridItem },
    setup: () => ({ args }),
    template: `
      <GridItem
        src="https://images.squarespace-cdn.com/content/v1/5a28871dd74cff3b8aa5aa79/1570786491502-28VIIWBJ7OVHTN8IA46B/African+Sunset+4x3+web.jpg"
        alt="African Sunset"
        title="African Sunset"
        subtitle="Postcard 6x9"
        @click="console.log('click')"
      />
    `
  })
};
