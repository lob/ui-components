import '@testing-library/jest-dom';
import Tile from '../Tile.vue';
import { render } from '@testing-library/vue';

describe('Tile', () => {
  it('renders', () => {
    const { getByTestId, getByText } = render(Tile, {
      slots: {
        header: 'Tile Header',
        default: 'Tile Content',
        subtext: 'Tile Subtext'
      }
    });
    expect(getByTestId('uic-tile')).toBeVisible();
    expect(getByText('Tile Header')).toBeVisible();
    expect(getByText('Tile Content')).toBeVisible();
    expect(getByText('Tile Subtext')).toBeVisible();
  });

  it('clicks when clickable', () => {
    const { emitted, getByTestId } = render(Tile, {
      props: { clickable: true }
    });
    getByTestId('uic-tile').click();
    expect(emitted()).toHaveProperty('click');
  });

  it('does not click when not clickable', () => {
    const { emitted, getByTestId } = render(Tile, {
      props: { clickable: false }
    });
    getByTestId('uic-tile').click();
    expect(emitted()).not.toHaveProperty('click');
  });
});
