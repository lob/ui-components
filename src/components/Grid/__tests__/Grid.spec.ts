import '@testing-library/jest-dom';
import { render } from '@testing-library/vue';

import Grid from '../Grid.vue';

describe('Grid', () => {
  it('renders', () => {
    const { getByTestId, queryByTestId } = render(Grid);
    expect(getByTestId('uic-grid')).toBeVisible();
    expect(queryByTestId('uic-grid-pagination')).toBeFalsy();
  });

  it('emits `next`', async () => {
    const { emitted, getByTestId } = render(Grid, {
      props: { list: true, next: 'test' }
    });
    getByTestId('uic-grid-pagination-next').click();
    expect(emitted()).toHaveProperty('next');
  });

  it('emits `previous`', async () => {
    const { emitted, getByTestId } = render(Grid, {
      props: { list: true, previous: 'test' }
    });
    getByTestId('uic-grid-pagination-previous').click();
    expect(emitted()).toHaveProperty('previous');
  });
});
