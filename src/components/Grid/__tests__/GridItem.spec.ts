import '@testing-library/jest-dom';
import GridItem from '../GridItem.vue';
import { render, within } from '@testing-library/vue';

describe('GridItem', () => {
  it('renders', () => {
    const { getByTestId, getByText } = render(GridItem, {
      props: {
        title: 'Grid item title',
        subtitle: 'Grid item subtitle',
        alt: 'Grid item alt'
      }
    });
    expect(getByTestId('uic-grid-item')).toBeVisible();
    expect(getByText('Grid item title')).toBeVisible();
    expect(getByText('Grid item subtitle')).toBeVisible();
  });

  it('clicks when clickable', () => {
    const { emitted, getByTestId } = render(GridItem, {
      props: {
        title: 'Grid item title',
        subtitle: 'Grid item subtitle',
        alt: 'Grid item alt',
        onClick: () => undefined
      }
    });
    within(getByTestId('uic-grid-item')).getByRole('button').click();
    expect(emitted()).toHaveProperty('click');
  });
});
