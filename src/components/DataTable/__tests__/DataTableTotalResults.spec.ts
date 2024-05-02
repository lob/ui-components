import '@testing-library/jest-dom';
import { render, within } from '@testing-library/vue';

import DataTableTotalResults from '../DataTableTotalResults.vue';

describe('DataTableTotalResults', () => {
  it('renders', () => {
    const { getByTestId } = render(DataTableTotalResults, {
      props: { total: 10 }
    });

    const totalResults = getByTestId('uic-datatable-total-results');
    expect(totalResults).toBeVisible();

    const { getByText: totalResultsGetByText } = within(totalResults);
    expect(totalResultsGetByText('10 results')).toBeVisible();
  });

  it('renders empty', () => {
    const { getByTestId } = render(DataTableTotalResults);

    const totalResults = getByTestId('uic-datatable-total-results');
    const { getByText: totalResultsGetByText } = within(totalResults);
    expect(totalResultsGetByText('- results')).toBeVisible();
  });

  it('renders loading', () => {
    const { getByTestId } = render(DataTableTotalResults, {
      props: { loading: true }
    });
    expect(getByTestId('uic-datatable-total-results-loading')).toBeVisible();
  });
});
