import { Meta, StoryObj } from '@storybook/vue3';
import Column from 'primevue/column';
import DataTable from './DataTable.vue';
import mdx from './DataTable.mdx';

const meta: Meta<typeof DataTable> = {
  title: 'Components/DataTable',
  component: DataTable,
  parameters: {
    docs: {
      page: mdx
    }
  }
};

export default meta;

export const Primary: StoryObj<typeof DataTable> = {
  render: (args) => ({
    components: { Column, DataTable },
    setup: () => ({ args }),
    template: `
      <DataTable v-bind="args">
        <Column field="firstName" header="First Name" />
        <Column field="lastName" header="Last Name" />
        <Column field="favoriteColor" header="Favorite Color" />
      </DataTable>
    `
  }),
  args: {
    dataKey: 'id',
    data: [
      {
        id: 1,
        firstName: 'John',
        lastName: 'Doe',
        favoriteColor: 'Blue'
      },
      {
        id: 2,
        firstName: 'Jane',
        lastName: 'Doe',
        favoriteColor: 'Green'
      },
      {
        id: 3,
        firstName: 'Jack',
        lastName: 'Doe',
        favoriteColor: 'Red'
      },
      {
        id: 4,
        firstName: 'Jill',
        lastName: 'Doe',
        favoriteColor: 'Yellow'
      },
      {
        id: 5,
        firstName: 'Jim',
        lastName: 'Doe',
        favoriteColor: 'Purple'
      },
      {
        id: 6,
        firstName: 'Jenny',
        lastName: 'Doe',
        favoriteColor: 'Orange'
      },
      {
        id: 7,
        firstName: 'Joe',
        lastName: 'Doe',
        favoriteColor: 'Black'
      },
      {
        id: 8,
        firstName: 'Jill',
        lastName: 'Doe',
        favoriteColor: 'White'
      },
      {
        id: 9,
        firstName: 'Jack',
        lastName: 'Doe',
        favoriteColor: 'Gray'
      },
      {
        id: 10,
        firstName: 'Jill',
        lastName: 'Doe',
        favoriteColor: 'Brown'
      },
      {
        id: 11,
        firstName: 'Jill',
        lastName: 'Doe',
        favoriteColor: 'Pink'
      }
    ]
  }
};
