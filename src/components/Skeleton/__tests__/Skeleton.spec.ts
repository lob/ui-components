import '@testing-library/jest-dom';
import { render } from '@testing-library/vue';
import Skeleton from '../Skeleton.vue';

describe('Skeleton', () => {
  it('renders', () => {
    const { getByTestId } = render(Skeleton);
    expect(getByTestId('uic-skeleton')).toBeVisible();
  });
});
