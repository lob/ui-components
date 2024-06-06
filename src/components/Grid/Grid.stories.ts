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
          v-for="_ in 1"
          src="https://images.squarespace-cdn.com/content/v1/5a28871dd74cff3b8aa5aa79/1570786491502-28VIIWBJ7OVHTN8IA46B/African+Sunset+4x3+web.jpg"
          alt="African Sunset"
          title="African Sunset"
          subtitle="Postcard 6x9"
          @click="console.log('click')"
        />
        <GridItem
          v-for="_ in 1"
          src="https://images.squarespace-cdn.com/content/57ee12e62e69cf04febf10cf/1557736466257-MFXHWE3M9ZQDRHYUD7EP/Nberg24-2.jpg?format=1500w&content-type=image%2Fjpeg"
          alt="African Sunset"
          title="African Sunset"
          subtitle="Postcard 6x9"
          @click="console.log('click')"
        />
        <GridItem
          v-for="_ in 1"
          src="https://s3.amazonaws.com/designs.purpletrail.com/pt5/system/352301/simple-lined-template-recipe-pages-8.5x11_352301_2_large.jpg"
          alt="African Sunset"
          title="African Sunset"
          subtitle="Postcard 6x9"
          @click="console.log('click')"
        />
        <GridItem
          v-for="_ in 1"
          src="https://images.pexels.com/photos/255419/pexels-photo-255419.jpeg?cs=srgb&dl=pexels-pixabay-255419.jpg&fm=jpg"
          alt="African Sunset"
          title="African Sunset"
          subtitle="Postcard 6x9"
          @click="console.log('click')"
        />
        <GridItem
          v-for="_ in 1"
          src="https://static1.squarespace.com/static/57ee12e62e69cf04febf10cf/57f239c9ebbd1aa018d061da/5cd92be2e4966b2f9bf477a4/1629722316402/Nberg24-2.jpg?format=1500w"
          alt="African Sunset"
          title="African Sunset"
          subtitle="Postcard 6x9"
          @click="console.log('click')"
        />
        <GridItem
          v-for="_ in 1"
          src="bad link"
          alt="African Sunset"
          title="African Sunset"
          subtitle="Postcard 6x9"
          @click="console.log('click')"
        />
        <GridItem
          v-for="_ in 1"
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
