import '@testing-library/jest-dom';
import { render } from '@testing-library/vue';
import PrimeVue from 'primevue/config';

import DataTable from '../DataTable.vue';

describe('DataTable', () => {
  it('renders', () => {
    const { getByTestId } = render(DataTable, {
      global: {
        plugins: [PrimeVue]
      },
      props: {
        data: [],
        dataKey: 'id'
      }
    });

    expect(getByTestId('uic-datatable')).toBeVisible();
  });
});
