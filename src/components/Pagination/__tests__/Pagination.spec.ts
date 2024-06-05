import '@testing-library/jest-dom';
import { render } from '@testing-library/vue';

import Pagination from '../Pagination.vue';

describe('Pagination', () => {
  it('renders', () => {
    const { getByTestId, queryByTestId } = render(Pagination);
    expect(getByTestId('uic-pagination')).toBeVisible();
    expect(getByTestId('uic-pagination-total')).toBeVisible();
    expect(getByTestId('uic-pagination-previous')).toBeVisible();
    expect(getByTestId('uic-pagination-next')).toBeVisible();
    expect(queryByTestId('uic-pagination-total-loading')).toBeFalsy();
  });

  it('loads', () => {
    const { getByTestId } = render(Pagination, { props: { loading: true } });
    expect(getByTestId('uic-pagination-total-loading')).toBeVisible();
    expect(getByTestId('uic-pagination-previous')).toBeDisabled();
    expect(getByTestId('uic-pagination-next')).toBeDisabled();
  });

  it('emits `next`', () => {
    const { emitted, getByTestId } = render(Pagination, {
      props: { next: 'test' }
    });
    getByTestId('uic-pagination-next').click();
    expect(emitted()).toHaveProperty('next');
  });

  it('emits `previous`', () => {
    const { emitted, getByTestId } = render(Pagination, {
      props: { previous: 'test' }
    });
    getByTestId('uic-pagination-previous').click();
    expect(emitted()).toHaveProperty('previous');
  });

  it.each([
    { total: 0, expected: '0 results' },
    { total: 1, expected: '1 result' },
    { total: 1000, expected: '1,000 results' },
    { total: 9999, expected: '9,999 results' },
    { total: 10000, expected: '10,000+ results' },
    { total: 10001, expected: '10,001 results' }
  ])('renders `total` as `` when ``', ({ total, expected }) => {
    const { getByTestId } = render(Pagination, { props: { total } });
    expect(getByTestId('uic-pagination-total')).toHaveTextContent(expected);
  });
});
