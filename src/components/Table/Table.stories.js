import LobTable from './Table.vue';
import TableHeader from './TableHeader.vue';
import TableBody from './TableBody.vue';
import TableRow from './TableRow.vue';
import LobButton from '../Button/Button.vue';
import mdx from './Table.mdx';

export default {
  title: 'Components/Table',
  component: LobTable,
  subcomponents: { TableHeader, TableRow, TableBody, LobButton },
  decorators: [
    () => ({ template: '<div style="width: 700px"><story /></div>' })
  ],
  parameters: {
    docs: {
      page: mdx
    }
  },
  argTypes: {
    space: {
      options: ['sm', 'md', 'lg'],
      control: {
        type: 'select'
      }
    }
  }
};

const SimpleTableTemplate = (args, { argTypes }) => ({
  props: Object.keys(argTypes),
  components: { LobTable, TableHeader, TableRow, TableBody },
  setup: () => ({ args }),
  template: `
    <lob-table class="min-w-full divide-y divide-gray-200" :space="args.space">
      <TableHeader>
        <div class="text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Name</div>
        <div class="text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Description</div>
      </TableHeader>
      <TableBody>
        <TableRow v-for="item in args.items">
          <div class="whitespace-nowrap">{{item.name}}</div>
          <div class="whitespace-nowrap">{{item.description}}</div>
        </TableRow>
      </TableBody>
    </lob-table>
  `
});

export const SimpleTable = SimpleTableTemplate.bind({});
SimpleTable.args = {
  items: [
    {
      name: 'Jane Cooper',
      description: 'Regional Paradigm Technician'
    },
    {
      name: 'Cody Fisher',
      description: 'Product Directives Officer'
    }
  ]
};

const TableWithActionTemplate = (args, { argTypes }) => ({
  props: Object.keys(argTypes),
  components: { LobTable, TableHeader, TableRow, TableBody, LobButton },
  setup: () => ({ args }),
  template: `
    <lob-table class="min-w-full divide-y divide-gray-200" :space="args.space">
      <TableHeader>
        <div class="text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Name</div>
        <div class="text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Description</div>
        <div class="sr-only">Edit</div>
      </TableHeader>
      <TableBody>
        <TableRow v-for="item in args.items">
          <div class="whitespace-nowrap">{{item.name}}</div>
          <div class="whitespace-nowrap">{{item.description}}</div>
          <div class="text-right"><lob-button size="small">Edit</lob-button></div>
        </TableRow>
      </TableBody>
    </lob-table>
  `
});

export const TableWithAction = TableWithActionTemplate.bind({});
TableWithAction.args = {
  items: [
    {
      name: 'Jane Cooper',
      description: 'Regional Paradigm Technician'
    },
    {
      name: 'Cody Fisher',
      description: 'Product Directives Officer'
    }
  ],
  space: 'md'
};

const TableWithRowHoverEffectTemplate = (args, { argTypes }) => ({
  props: Object.keys(argTypes),
  components: { LobTable, TableHeader, TableRow, TableBody },
  setup: () => ({ args }),
  template: `
    <lob-table class="min-w-full divide-y divide-gray-200" :space="args.space">
      <TableHeader>
        <div class="text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Name</div>
        <div class="text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Description</div>
        <div class="sr-only">Edit</div>
      </TableHeader>
      <TableBody>
        <TableRow v-for="item in args.items" class="hover:shadow rounded-md cursor-pointer">
          <div class="whitespace-nowrap">{{item.name}}</div>
          <div class="whitespace-nowrap">{{item.description}}</div>
          <div class="text-right text-xl">></div>
        </TableRow>
      </TableBody>
    </lob-table>
  `
});

export const TableWithRowHoverEffect = TableWithRowHoverEffectTemplate.bind({});
TableWithRowHoverEffect.args = {
  items: [
    {
      name: 'Jane Cooper',
      description: 'Regional Paradigm Technician'
    },
    {
      name: 'Cody Fisher',
      description: 'Product Directives Officer'
    }
  ],
  space: 'lg'
};
