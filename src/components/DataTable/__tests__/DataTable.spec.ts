import '@testing-library/jest-dom';
import { RenderOptions, render, waitFor, within } from '@testing-library/vue';
import Column from 'primevue/column';
import PrimeVue from 'primevue/config';

import DataTable from '../DataTable.vue';
import userEvent from '@testing-library/user-event';

const DEFAULT_SLOTS = {
  default: `<Column field="firstName" header="First Name" />`
} as const;

const DEFAULT_PROPS = {
  data: [{ firstName: 'John' }],
  dataKey: 'id'
} as const;

const renderDataTable = (options: RenderOptions = {}) =>
  render(DataTable, {
    global: {
      plugins: [PrimeVue],
      components: { Column }
    },
    slots: DEFAULT_SLOTS,
    props: DEFAULT_PROPS,
    ...options
  });

describe('DataTable', () => {
  it('renders', () => {
    const { getByTestId } = renderDataTable();

    expect(getByTestId('uic-datatable')).toBeVisible();
    const { getByText: tableGetByText } = within(getByTestId('uic-datatable'));
    expect(tableGetByText('First Name')).toBeVisible();
    expect(tableGetByText('John')).toBeVisible();
    expect(tableGetByText('1 result')).toBeVisible();
  });

  it('emits `rowClick` when `clickable`', async () => {
    const { emitted, getByTestId } = renderDataTable({
      props: { ...DEFAULT_PROPS, clickable: true }
    });
    const { getByText: tableGetByText } = within(getByTestId('uic-datatable'));
    userEvent.click(tableGetByText('John'));
    await waitFor(() => expect(emitted()).toHaveProperty('rowClick'));
  });

  it('emits `next` and `previous` when `list`', async () => {
    const { emitted, getByTestId } = renderDataTable({
      props: { ...DEFAULT_PROPS, list: true, next: 'test', previous: 'test' }
    });

    const nextButton = getByTestId('uic-datatable-list-next');
    expect(nextButton).toBeVisible();
    expect(nextButton).toBeEnabled();
    userEvent.click(nextButton);
    await waitFor(() => expect(emitted()).toHaveProperty('next'));

    const previousButton = getByTestId('uic-datatable-list-previous');
    expect(previousButton).toBeVisible();
    expect(previousButton).toBeEnabled();
    userEvent.click(previousButton);
    await waitFor(() => expect(emitted()).toHaveProperty('previous'));
  });
});
